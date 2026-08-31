/**
 * Everything the 2D Graphics Utils page reads.
 *
 * Same shape as the plugin constants files. The numbers and method names here
 * come out of the package README and its changelog, so the page and the docs
 * do not drift apart.
 *
 * This is the one project on the site that is still being worked on, and the
 * copy says so rather than leaving people to guess from a release date.
 */

import * as FeatureArt from "../../../assets/graphics_utils/features";
import icon from "../../../assets/graphics_utils/icon.webp";

export const ProjectInformation = {
  title: "2D Graphics Utils",
  package: "@jaymar921/2dgraphic-utils",
  subtitle: "A canvas, sprites and a render loop you do not have to write.",
  tagline:
    "Wrap the canvas element once, register sprites, and let it draw them.",

  version: "1.3.0",
  status: "maintained",
  statusLabel: "ACTIVELY MAINTAINED",
  license: "Open source",
  icon,

  npmLink: "https://www.npmjs.com/package/@jaymar921/2dgraphic-utils",
  repoLink: "https://github.com/JnH-Projects/2dgraphic-utils",
  demoLink: "https://jaymar921-2dgraphic-demo.vercel.app/",
  installCommand: "npm install @jaymar921/2dgraphic-utils",

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  description:
    "2D Graphics Utils is a small JavaScript library for drawing to a canvas without hand rolling the parts every 2D project needs. You give it a canvas id, it gives you a screen that owns the render loop, the camera, the input handling and the draw order. Everything you want on screen is a Sprite you register once, and the screen takes it from there.",
  descriptionMore: [
    "The idea is that the boring half is already done. Panning, zooming, click detection that still lands on the right sprite after you have zoomed, animation frames, depth sorting for top-down scenes, culling for anything off screen. None of that is interesting to write for the fourth time, and all of it is easy to get subtly wrong.",
    "Sprite positions are always in world space. The camera offset and the global scale are applied when the sprite is drawn, so you never adjust a position to compensate for a pan or a zoom. Click events come back in world space too, which means you can compare them straight against a sprite's own coordinates.",
    "It works with plain JavaScript, and it works with React through a small hook. There is no peer dependency and nothing to configure. The demo linked above is the whole thing running in a page, if you would rather look at it than read about it.",
  ],

  /** The npm-facing headline numbers, for the hero chips. */
  stats: [
    { icon: "fa-solid fa-code-branch", value: "1.3.0", label: "Version" },
    { icon: "fa-solid fa-box-open", value: "npm", label: "Published" },
    { icon: "fa-solid fa-layer-group", value: "9", label: "Sprite types" },
    { icon: "fa-solid fa-gauge-high", value: "60", label: "FPS cap" },
  ],
};

/** The feature panels, each with its own drawing. */
export const Features = [
  {
    key: "canvas",
    title: "THE CANVAS SCREEN",
    icon: "fa-solid fa-display",
    accent: "cyan",
    image: FeatureArt.canvas,
    description:
      "One wrapper around the canvas element. It owns the render loop, the camera, the registered sprites and the input, and it culls anything off screen for you.",
  },
  {
    key: "sprites",
    title: "SPRITES & ANIMATION",
    icon: "fa-solid fa-ghost",
    accent: "violet",
    image: FeatureArt.sprites,
    description:
      "A sprite is an image, a position and optionally a set of named animations. Register it once and it is drawn every frame after that, frame timing included.",
  },
  {
    key: "ysort",
    title: "Y-SORT DEPTH",
    icon: "fa-solid fa-layer-group",
    accent: "emerald",
    image: FeatureArt.ysort,
    description:
      "Top-down depth ordering, sorted by bottom edge every frame. Walk behind a tree and the tree fades enough that you can still see yourself under it.",
  },
  {
    key: "input",
    title: "INPUT & CAMERA",
    icon: "fa-solid fa-arrows-up-down-left-right",
    accent: "amber",
    image: FeatureArt.input,
    description:
      "Drag to pan, scroll to zoom, click to hit test. All three stay correct at any zoom level, and a tap is never mistaken for a drag.",
  },
  {
    key: "install",
    title: "GETTING STARTED",
    icon: "fa-solid fa-box-open",
    accent: "cyan",
    image: FeatureArt.install,
    description:
      "One install, one import, about ten lines to a sprite on screen. Plain JavaScript or React, both are in the README.",
  },
];

/** The CanvasScreen surface, grouped the way you actually use it. */
export const CanvasApi = [
  {
    group: "Sprites",
    accent: "cyan",
    icon: "fa-solid fa-ghost",
    methods: [
      {
        signature: "registerObject(sprite)",
        note: "Adds a sprite to the screen. Registration order decides overlap when Y-sort is off.",
      },
      {
        signature: "unregisterObject(objID)",
        note: "Removes a sprite by its id.",
      },
      {
        signature: "getRegisteredObject(objID)",
        note: "Returns that sprite, or null. Mutating what you get back shows up on the next frame.",
      },
      {
        signature: "getAllRegisteredObjects()",
        note: "Every sprite currently on screen, by reference.",
      },
    ],
  },
  {
    group: "Camera",
    accent: "violet",
    icon: "fa-solid fa-video",
    methods: [
      {
        signature: "setCameraOffset(x, y)",
        note: "Moves the camera. Sprite positions stay in world space.",
      },
      {
        signature: "getCameraOffset()",
        note: "The current offset, which changes as you zoom.",
      },
      {
        signature: "getFixedCameraOffset()",
        note: "The same offset, unaffected by zoom.",
      },
      {
        signature: "setGlobalScale(value)",
        note: "Scales everything, and propagates the new scale to every sprite straight away.",
      },
    ],
  },
  {
    group: "Input",
    accent: "amber",
    icon: "fa-solid fa-hand-pointer",
    methods: [
      {
        signature: "enableScreenDrag(bool)",
        note: "Pan with mouse or touch. Pan speed is corrected for the current zoom.",
      },
      {
        signature: "enableScreenZoom(bool)",
        note: "Zoom on the mouse wheel, centred on the viewport.",
      },
      {
        signature: "setZoomSpeed(value)",
        note: "How much one scroll step moves the scale. Default 0.01.",
      },
      {
        signature: "handleScreenClickedEvent(fn)",
        note: "Fires with the top-most sprite, its type, the world-space mouse position and every sprite under the cursor.",
      },
      {
        signature: "handleScreenZoomEvent(fn)",
        note: "Fires with the new globalScale whenever the zoom changes.",
      },
    ],
  },
  {
    group: "Depth",
    accent: "emerald",
    icon: "fa-solid fa-layer-group",
    since: "1.3.0",
    methods: [
      {
        signature: "setYsort(bool)",
        note: "Sorts world sprites by their bottom edge each frame, so depth reads correctly in a top-down scene.",
      },
      {
        signature: "setBehindOpacity(value)",
        note: "How transparent an object goes when it draws on top of the player. Default 0.5.",
      },
      {
        signature: "setOverlapThreshold(value)",
        note: "How much the two have to overlap before that kicks in, as a fraction of the smaller box. Default 0.1.",
      },
    ],
  },
];

/** The SpriteType enum, and what each one is for. */
export const SpriteTypes = [
  { name: "PLAYER", note: "The player character.", accent: "violet" },
  { name: "OBJECT", note: "A general world object.", accent: "sky" },
  { name: "BLOCK", note: "Solid, not passable.", accent: "emerald" },
  { name: "ITEM", note: "Something collectible.", accent: "amber" },
  { name: "FLUID", note: "Water and the like.", accent: "cyan" },
  { name: "PASSABLE", note: "Walk straight through it.", accent: "teal" },
  { name: "AIR", note: "Empty space, the click fallback.", accent: "slate" },
  {
    name: "BACKGROUND",
    note: "Always drawn first, always behind.",
    accent: "slate",
  },
  {
    name: "STATIC",
    note: "Ignores the camera entirely. This is your HUD layer.",
    accent: "rose",
  },
];

/**
 * Release notes, newest first, from the package changelog. There are no
 * release dates because the package never tracked any; the page says so rather
 * than inventing them, and the git history is the real record.
 */
export const GraphicsUtils_Logs = [
  {
    update_version: "1.3.0",
    release_date: null,
    changes: [
      {
        update: "Y-sort for top-down scenes",
        sublist: [
          "setYsort(bool) sorts world-space sprites by their bottom edge every frame, so the player is behind what it stands above and in front of what it stands below",
          "setBehindOpacity(value) fades an object that draws on top of the player, so the player stays visible underneath it. Default 0.5",
          "setOverlapThreshold(value) sets how much the two have to overlap first, measured as intersecting area against the smaller bounding box. Default 0.1",
          "BACKGROUND sprites always render first and STATIC sprites always render last, whatever the sort says",
        ],
      },
      {
        update: "Render loop",
        sublist: [
          "The Y-sort loop reuses pre-allocated arrays cleared with length = 0 each frame, instead of allocating new ones, which keeps the garbage collector out of the frame budget",
          "Drag suppression uses a 4px movement threshold instead of a timeout, so a tap never registers as a drag and a click is never wrongly swallowed",
        ],
      },
    ],
  },
  {
    update_version: "1.2.0",
    release_date: null,
    changes: [
      {
        update: "Zoom correctness",
        sublist: [
          "Click coordinates are converted to world space properly, so hit detection lands on the right sprite at any zoom level",
          "InHitbox compares in pure world space. It had been applying globalScale a second time inside the check, which meant misses at any zoom other than 1",
          "Pan delta is divided by globalScale, so dragging feels the same however far in or out you are",
          "Zoom scale is clamped to four decimal places to stop floating point drift at extreme zoom",
          "Touch coordinates use getBoundingClientRect for their offset",
        ],
      },
      {
        update: "Render loop",
        sublist: [
          "World sprites entirely outside the viewport are skipped during rendering",
          "animate() iterates the world and static lists separately instead of spreading them into a new array every frame",
          "An orphaned context.restore() with no matching save() was removed before it underflowed the canvas state stack",
          "lastFrameTime starts at 0, so the first frame's FPS comparison is a number rather than NaN",
          "getRegisteredObject uses find() instead of filter()[0], so there is no temporary array",
          "setGlobalScale propagates to sprites immediately rather than on every frame inside the render loop",
        ],
      },
    ],
  },
];
