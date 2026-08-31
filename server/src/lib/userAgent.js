/**
 * A small User-Agent reader, kept deliberately narrow.
 *
 * The site only needs to answer three questions: was this a phone, a tablet or
 * a desktop, roughly what operating system, and roughly what browser. A full
 * UA database would answer a hundred more and pull in a dependency that needs
 * updating every time a vendor changes a string, so the rules below cover the
 * traffic this site actually gets and fall back to "unknown" for the rest.
 *
 * Parsing happens on the server rather than in the browser because a client
 * can send whatever it likes, and because a request with no JavaScript at all
 * still carries a UA header.
 */

export const DEVICE_TYPES = Object.freeze({
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop",
  BOT: "bot",
  UNKNOWN: "unknown",
});

/**
 * Crawlers, preview fetchers and the AI agents robots.txt already welcomes.
 * They are recorded with type "bot" and left out of the counters, so a link
 * preview does not read as a visit.
 */
const BOT_PATTERNS = [
  /bot\b/i,
  /crawler/i,
  /spider/i,
  /slurp/i,
  /facebookexternalhit/i,
  /embedly/i,
  /quora link preview/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterest/i,
  /redditbot/i,
  /skypeuripreview/i,
  /vkshare/i,
  /applebot/i,
  /gptbot/i,
  /claudebot/i,
  /claude-web/i,
  /anthropic-ai/i,
  /perplexitybot/i,
  /ccbot/i,
  /google-extended/i,
  /bytespider/i,
  /amazonbot/i,
  /headlesschrome/i,
  /phantomjs/i,
  /python-requests/i,
  /curl\//i,
  /wget\//i,
  /axios\//i,
  /node-fetch/i,
  /go-http-client/i,
  /lighthouse/i,
];

/** Order matters. The first match wins, so the specific rules sit first. */
const OS_RULES = [
  { name: "Android", test: /android/i },
  // iPadOS 13 and up report as a Mac, so the iPad check runs before macOS and
  // leans on the touch hint the browser sends alongside.
  { name: "iOS", test: /iphone|ipod/i },
  { name: "iPadOS", test: /ipad/i },
  { name: "Windows", test: /windows nt|win64|win32/i },
  { name: "ChromeOS", test: /cros/i },
  { name: "macOS", test: /mac os x|macintosh/i },
  { name: "Linux", test: /linux|x11|ubuntu|fedora|debian/i },
  { name: "PlayStation", test: /playstation/i },
  { name: "Xbox", test: /xbox/i },
];

/**
 * Every Chromium browser still says "Chrome", and every one of them says
 * "Safari" too, so the branded ones have to be checked before the generic.
 */
const BROWSER_RULES = [
  { name: "Edge", test: /\bedg(?:e|a|ios)?\//i },
  { name: "Opera", test: /\bopr\/|\bopera\b/i },
  { name: "Samsung Internet", test: /samsungbrowser/i },
  { name: "Vivaldi", test: /vivaldi/i },
  { name: "Brave", test: /\bbrave\//i },
  { name: "Yandex", test: /yabrowser/i },
  { name: "UC Browser", test: /\bucbrowser/i },
  { name: "Firefox", test: /firefox\/|\bfxios\//i },
  { name: "Chrome", test: /\bchrome\/|\bcrios\/|\bchromium\//i },
  { name: "Safari", test: /safari\//i },
  { name: "Internet Explorer", test: /msie |trident\//i },
];

const TABLET_PATTERNS = [/ipad/i, /tablet/i, /playbook/i, /silk/i, /kindle/i];

/** Android without "Mobile" in the string is a tablet, with it is a phone. */
const ANDROID_TABLET = /android(?!.*mobile)/i;

const MOBILE_PATTERNS = [
  /mobile/i,
  /iphone/i,
  /ipod/i,
  /android/i,
  /blackberry/i,
  /windows phone/i,
  /iemobile/i,
  /opera mini/i,
  /webos/i,
];

function firstMatch(rules, ua) {
  for (const rule of rules) {
    if (rule.test.test(ua)) return rule.name;
  }
  return "Unknown";
}

/**
 * The browser version, when the string offers one in a shape worth trusting.
 * Only the major number is kept, since anything finer is noise for a stats
 * page and makes the counters sparse.
 */
function readMajorVersion(ua, browser) {
  const patterns = {
    Edge: /\bedg(?:e|a|ios)?\/(\d+)/i,
    Opera: /\bopr\/(\d+)/i,
    "Samsung Internet": /samsungbrowser\/(\d+)/i,
    Vivaldi: /vivaldi\/(\d+)/i,
    Brave: /\bbrave\/(\d+)/i,
    Yandex: /yabrowser\/(\d+)/i,
    "UC Browser": /ucbrowser\/(\d+)/i,
    Firefox: /(?:firefox|fxios)\/(\d+)/i,
    Chrome: /(?:chrome|crios|chromium)\/(\d+)/i,
    Safari: /version\/(\d+)/i,
    "Internet Explorer": /(?:msie |rv:)(\d+)/i,
  };

  const pattern = patterns[browser];
  if (!pattern) return null;

  const match = ua.match(pattern);
  return match ? match[1] : null;
}

/**
 * Reads a UA string into the handful of fields the site records.
 *
 * `hints` carries the Sec-CH-UA-Mobile and Sec-CH-UA-Platform client hints
 * when the browser sent them. They are more reliable than the UA string on
 * Chromium, so they win where they disagree.
 */
export function parseUserAgent(userAgent, hints = {}) {
  const ua = typeof userAgent === "string" ? userAgent : "";

  if (ua.trim() === "") {
    return {
      deviceType: DEVICE_TYPES.UNKNOWN,
      os: "Unknown",
      browser: "Unknown",
      browserVersion: null,
      isBot: false,
    };
  }

  const isBot = BOT_PATTERNS.some((pattern) => pattern.test(ua));

  if (isBot) {
    return {
      deviceType: DEVICE_TYPES.BOT,
      os: firstMatch(OS_RULES, ua),
      browser: "Bot",
      browserVersion: null,
      isBot: true,
    };
  }

  const browser = firstMatch(BROWSER_RULES, ua);
  const os = firstMatch(OS_RULES, ua);

  return {
    deviceType: readDeviceType(ua, os, hints),
    os,
    browser,
    browserVersion: readMajorVersion(ua, browser),
    isBot: false,
  };
}

function readDeviceType(ua, os, hints) {
  const isTablet =
    TABLET_PATTERNS.some((pattern) => pattern.test(ua)) ||
    ANDROID_TABLET.test(ua) ||
    // An iPad on iPadOS 13+ pretends to be a Mac, and the only clue in the
    // headers is the platform hint plus a touch capable screen.
    (os === "macOS" && hints.touch === true);

  if (isTablet) return DEVICE_TYPES.TABLET;

  // The mobile client hint is a plain yes or no from the browser itself, so it
  // beats guessing from the string when it is present.
  if (hints.mobile === true) return DEVICE_TYPES.MOBILE;
  if (MOBILE_PATTERNS.some((pattern) => pattern.test(ua))) {
    return DEVICE_TYPES.MOBILE;
  }
  if (hints.mobile === false) return DEVICE_TYPES.DESKTOP;

  return DEVICE_TYPES.DESKTOP;
}

export default parseUserAgent;
