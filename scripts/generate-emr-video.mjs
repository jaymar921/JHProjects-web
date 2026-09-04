/**
 * Renders the Epic Mobs Rework trailer, one screenshot per frame.
 *
 *   node scripts/generate-emr-video.mjs
 *   node scripts/generate-emr-video.mjs --preview    a still from each shot
 *   node scripts/generate-emr-video.mjs --probe      model sizes, no capture
 *
 * How it works, and why it works this way:
 *
 * scripts/emr-video/scene.html draws exactly one frame of a three.js scene,
 * with the copy overlaid as ordinary HTML. Nothing in it animates on its own,
 * because window.__renderFrame(n) computes every position, colour and opacity
 * from the frame number alone. This script launches headless Chrome, calls that
 * function once per frame, screenshots the result, and hands the numbered
 * frames to ffmpeg.
 *
 * Doing it that way rather than recording the tab means the render is never
 * racing a wall clock: a frame that takes 400ms to draw is still 1/30th of a
 * second of video, so the output is identical on a fast machine and a slow one,
 * and re-running the script produces a byte-similar file rather than a
 * different take.
 *
 * The set is dressed with Creative Commons Attribution models from
 * scripts/emr-video/assets/models, credited on the last card of the video and
 * in assets/CREDITS.txt. The bed music is assets/ad_music.mp3, trimmed to the
 * length of the picture with a fade at each end.
 *
 * Needs on PATH:
 *   ffmpeg     stitches the frames, lays the music under them, writes a poster
 *   Chrome     found automatically in the usual Windows and POSIX locations,
 *              or set CHROME_PATH
 *
 * Writes:
 *   src/assets/epic_mobs_rework/video/epic-mobs-rework.mp4
 *   src/assets/epic_mobs_rework/video/epic-mobs-rework-poster.jpg
 */

import { spawn, spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SCENE_DIR = join(ROOT, "scripts", "emr-video");
const VENDOR = join(SCENE_DIR, "vendor");
const OUT_DIR = join(ROOT, "src", "assets", "epic_mobs_rework", "video");

const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
const DEBUG_PORT = Number(process.env.EMR_CDP_PORT ?? 9333);
const PREVIEW = process.argv.includes("--preview");
const PROBE = process.argv.includes("--probe");

/** The bed music, and how long it takes to come up and go away again. */
const MUSIC = join(SCENE_DIR, "assets", "ad_music.mp3");
const MUSIC_FADE_IN = 1.2;
const MUSIC_FADE_OUT = 2.5;
/** Well under the copy, because the copy is the point and the music is not. */
const MUSIC_GAIN = 0.5;

/* ------------------------------------------------------------ the tools */

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    join(
      process.env.LOCALAPPDATA ?? "",
      "Google/Chrome/Application/chrome.exe",
    ),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];

  for (const path of candidates) {
    if (path && existsSync(path)) return path;
  }

  throw new Error(
    "Could not find Chrome. Set CHROME_PATH to the executable and run again.",
  );
}

function requireFfmpeg() {
  const probe = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  if (probe.error) {
    throw new Error("ffmpeg is not on PATH. Install it and run again.");
  }
}

/**
 * three.js is fetched once into scripts/emr-video/vendor/ rather than loaded
 * from a CDN inside the page, so a capture run does not depend on the network
 * being up, and two runs a year apart use the same build of the library.
 */
async function ensureVendor() {
  mkdirSync(VENDOR, { recursive: true });

  const three = join(VENDOR, "three.min.js");
  if (!existsSync(three)) {
    process.stdout.write("fetching three.js ... ");
    const response = await fetch(THREE_URL);
    if (!response.ok) {
      throw new Error(`three.js download failed: ${response.status}`);
    }
    writeFileSync(three, Buffer.from(await response.arrayBuffer()));
    console.log("done");
  }

  // The pixel face and the logo mark, copied in so the page can load them
  // over file:// without reaching outside its own folder.
  const font = join(ROOT, "src/assets/fonts/joystixmonospace.otf");
  const mark = join(ROOT, "src/assets/epic_mobs_rework/branding/mark.png");
  if (existsSync(font)) copyFileSync(font, join(VENDOR, "joystixmonospace.otf"));
  if (existsSync(mark)) copyFileSync(mark, join(VENDOR, "mark.png"));
}

/* ------------------------------------------------- the debugging protocol */

/** A minimal CDP client. One socket, one id counter, one map of waiters. */
class CDP {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.id !== undefined) {
        const waiter = this.pending.get(message.id);
        if (!waiter) return;
        this.pending.delete(message.id);
        if (message.error) waiter.reject(new Error(message.error.message));
        else waiter.resolve(message.result);
        return;
      }

      const handlers = this.events.get(message.method);
      if (handlers) {
        for (const handler of handlers) handler(message.params);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, handler) {
    if (!this.events.has(method)) this.events.set(method, []);
    this.events.get(method).push(handler);
  }

  close() {
    this.socket.close();
  }
}

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((done, fail) => {
    socket.addEventListener("open", done, { once: true });
    socket.addEventListener("error", fail, { once: true });
  });
  return new CDP(socket);
}

/** Chrome takes a moment to open its debugging port. Ask until it answers. */
async function waitForTarget(deadlineMs = 20000) {
  const started = Date.now();

  while (Date.now() - started < deadlineMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
      const targets = await response.json();
      const page = targets.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // Not listening yet.
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  throw new Error("Chrome never opened its debugging port.");
}

/** Runs an expression in the page and returns its value. */
async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });

  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description ??
        result.exceptionDetails.text,
    );
  }

  return result.result.value;
}

/* ------------------------------------------------------------------ main */

async function main() {
  requireFfmpeg();
  await ensureVendor();

  const chrome = findChrome();
  const profile = mkdtempSync(join(tmpdir(), "emr-chrome-"));
  const frames = mkdtempSync(join(tmpdir(), "emr-frames-"));

  console.log(`chrome  ${chrome}`);
  console.log(`frames  ${frames}`);

  const child = spawn(
    chrome,
    [
      "--headless=new",
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${profile}`,
      "--window-size=1280,720",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-background-networking",
      "--allow-file-access-from-files",
      // Software WebGL. There is no GPU in a headless capture run and the
      // scene is a few thousand triangles, so SwiftShader keeps up easily.
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--force-device-scale-factor=1",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let cdp;
  try {
    cdp = await connect(await waitForTarget());

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const loaded = new Promise((done) =>
      cdp.on("Page.loadEventFired", () => done()),
    );
    await cdp.send("Page.navigate", {
      url: pathToFileURL(join(SCENE_DIR, "scene.html")).href,
    });
    await loaded;

    // The page reports itself ready once the pixel font and the logo are in.
    const readyBy = Date.now() + 30000;
    for (;;) {
      if (await evaluate(cdp, "window.__ready === true")) break;
      if (Date.now() > readyBy) throw new Error("scene.html never became ready");
      await new Promise((r) => setTimeout(r, 150));
    }

    const sceneError = await evaluate(cdp, "window.__error || null");
    if (sceneError) throw new Error(`scene.html failed:
${sceneError}`);

    if (PROBE) {
      console.log(
        JSON.stringify(await evaluate(cdp, "window.__probe()"), null, 2),
      );
      return;
    }

    const total = await evaluate(cdp, "window.__totalFrames");
    const fps = await evaluate(cdp, "window.__fps");
    console.log(`scene   ${total} frames at ${fps} fps (${(total / fps).toFixed(1)}s)`);

    // One still from the middle of each shot, for checking the framing
    // without sitting through a full capture.
    const midFrames = await evaluate(cdp, "window.__shotMidFrames");
    const wanted = PREVIEW
      ? midFrames
      : Array.from({ length: total }, (_, i) => i);

    const started = Date.now();
    for (let i = 0; i < wanted.length; i++) {
      await evaluate(cdp, `window.__renderFrame(${wanted[i]})`);

      const shot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        optimizeForSpeed: true,
      });

      writeFileSync(
        join(frames, `f${String(i).padStart(5, "0")}.png`),
        Buffer.from(shot.data, "base64"),
      );

      if (i % 60 === 0 || i === wanted.length - 1) {
        const done = i + 1;
        const rate = done / ((Date.now() - started) / 1000);
        const left = Math.round((wanted.length - done) / Math.max(rate, 0.01));
        process.stdout.write(
          `\r  ${done}/${wanted.length} frames  ${rate.toFixed(1)}/s  ${left}s left   `,
        );
      }
    }
    process.stdout.write("\n");

    mkdirSync(OUT_DIR, { recursive: true });

    if (PREVIEW) {
      const contact = join(SCENE_DIR, "preview.png");
      const columns = wanted.length > 9 ? 5 : 3;
      const rows = Math.ceil(wanted.length / columns);
      run("ffmpeg", [
        "-y",
        "-i",
        join(frames, "f%05d.png"),
        "-filter_complex",
        `tile=${columns}x${rows}:padding=8:color=#1e293b,scale=1800:-1`,
        "-frames:v",
        "1",
        contact,
      ]);
      console.log(`wrote ${contact}`);
      return;
    }

    const mp4 = join(OUT_DIR, "epic-mobs-rework.mp4");
    const seconds = total / fps;
    const hasMusic = existsSync(MUSIC);

    if (!hasMusic) {
      console.warn(`no music at ${MUSIC}, encoding silent`);
    }

    run("ffmpeg", [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      join(frames, "f%05d.png"),
      ...(hasMusic ? ["-i", MUSIC] : []),
      ...(hasMusic
        ? [
            // Trimmed to the picture, brought up over the first shot and taken
            // away under the credits card, so it never just stops.
            "-filter:a",
            [
              `volume=${MUSIC_GAIN}`,
              `afade=t=in:st=0:d=${MUSIC_FADE_IN}`,
              `afade=t=out:st=${(seconds - MUSIC_FADE_OUT).toFixed(2)}:d=${MUSIC_FADE_OUT}`,
            ].join(","),
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-shortest",
          ]
        : []),
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      // 22 looks lovely and lands a 24MB file for under a minute of video,
      // because a Minecraft park is a wall of fine texture detail and h264
      // spends its whole budget on it. This is a page embed that lives in the
      // repository, so 28 is the right trade: the difference is invisible at
      // 720p behind a scanline overlay, and the file is a third of the size.
      "-crf",
      "28",
      "-pix_fmt",
      "yuv420p",
      // Browsers start playing sooner when the index is at the front.
      "-movflags",
      "+faststart",
      mp4,
    ]);

    // A poster, so the player is not a black rectangle before it plays.
    const poster = join(OUT_DIR, "epic-mobs-rework-poster.jpg");
    run("ffmpeg", [
      "-y",
      "-i",
      join(frames, `f${String(Math.round(total * 0.16)).padStart(5, "0")}.png`),
      "-q:v",
      "4",
      poster,
    ]);

    console.log(`wrote ${mp4}`);
    console.log(`wrote ${poster}`);
  } finally {
    try {
      cdp?.close();
    } catch {
      // The socket is already gone. Nothing to do.
    }
    child.kill();
    rmSync(frames, { recursive: true, force: true });

    // Chrome holds its profile open for a moment after the kill, and on
    // Windows a locked file makes rmSync throw. The directory is under the
    // system temp folder, so leaving it is harmless.
    try {
      rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      // Chrome still has it. It will be cleaned up with the rest of temp.
    }
  }
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: ["ignore", "ignore", "pipe"] });
  if (result.status !== 0) {
    throw new Error(
      `${command} failed (${result.status}):\n${result.stderr?.toString().slice(-2000)}`,
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
