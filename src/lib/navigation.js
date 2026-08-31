/**
 * Leaving the site.
 *
 * This used to live in components/utils/PageUtility.js, which still re-exports
 * it so nothing had to be rewritten. It moved here because the tracking layer
 * needs it, and a module under lib should not have to reach up into components
 * to find out how a link is opened.
 */

/**
 * Opens a URL, by default in a new tab.
 *
 * noopener is the part that matters. Without it the page being opened gets a
 * handle on this one through window.opener and can navigate it somewhere else,
 * which is a real problem when the destination is a payment link.
 */
export const RedirectTo = (url, target = "_blank") => {
  if (!url) return;
  window.open(url, target, target === "_blank" ? "noopener,noreferrer" : "");
};

/** Same tab navigation, for the back buttons and the internal links. */
export const goTo = (path) => {
  window.location.href = path;
};

export default RedirectTo;
