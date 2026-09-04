/*
 * The Epic Mobs Rework trailer, one frame at a time.
 *
 * The whole scene is deterministic. window.__renderFrame(n) computes every
 * position, colour and opacity from n alone, renders, and returns. There is no
 * requestAnimationFrame loop and no Date.now() anywhere, so frame 431 looks the
 * same on every run and the capture script can take as long as it likes over
 * each one. Model animations are driven with mixer.setTime(t) rather than
 * mixer.update(delta) for exactly the same reason.
 *
 * The set is a Minecraft park with real mob models standing on it. Every one of
 * them is Creative Commons Attribution work by somebody else, credited on the
 * last card of the video and in assets/CREDITS.txt. What the plugin does on top
 * of that set, telegraph rings, spawn columns, loot, is drawn as glowing
 * geometry, because that is the part being explained rather than the part being
 * shown.
 *
 * The copy is taken from marketing/spigot-description.md in the plugin repo,
 * which is written to be evergreen. Nothing on screen carries a version
 * number, a release date, or a count that moves between releases.
 */

/* global THREE */

const FPS = 30;
const WIDTH = 1280;
const HEIGHT = 720;

const COLOR = {
  bg: 0x0b0d11,
  ember: 0xf97316,
  amber: 0xfbbf24,
  rose: 0xfb7185,
  sky: 0x38bdf8,
  purple: 0xc084fc,
  lime: 0xa3e635,
  emerald: 0x34d399,
  bone: 0xe2e8f0,
};

const CSS = {
  ember: "#f97316",
  amber: "#fbbf24",
  rose: "#fb7185",
  sky: "#38bdf8",
  purple: "#c084fc",
  lime: "#a3e635",
  emerald: "#34d399",
  muted: "#64748b",
};

/** Deterministic noise. Same index, same number, every run. */
function rnd(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const smooth = (t) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};
const mix = (a, b, t) => a + (b - a) * t;

/**
 * Which way a model has to be turned to face the camera.
 *
 * The camera stands on the stage's +z side, and every model in the set was
 * exported facing its own -z, so everything on stage gets turned half a circle
 * before any per-shot rotation is applied.
 */
const FRONT = Math.PI;

/* ------------------------------------------------------------- the shots */

/**
 * Each shot is a length in seconds, the copy that sits over it, and where the
 * camera starts and ends. The camera never sits still: every shot is a slow
 * push, pull or dolly, which is what stops a set of static models from reading
 * as a photograph of some static models.
 *
 * lookFrom and lookTo are optional. Without them the camera holds on one point;
 * with them it tracks a moving one, which is what the mob row needs.
 */
const SHOTS = [
  {
    id: "title",
    len: 5.4,
    accent: CSS.ember,
    kicker: "MONSTERS WORTH FIGHTING",
    headline: "Your server's mobs\nshould be worth fighting.",
    sub: "Take any vanilla entity. Give it a name, stats, gear, abilities and a loot table. Tell the plugin where in the world it belongs. It handles the rest.",
    from: [-7.5, 3.4, 8.5],
    to: [-3.0, 2.6, 5.6],
    look: [0, 1.7, 0],
  },
  {
    id: "mobs",
    len: 5.6,
    accent: CSS.ember,
    kicker: "MOBS YOU ACTUALLY DESIGN",
    headline: "A mob is a set of decisions,\nnot a health number.",
    sub: "Six tiers that set the shape of a fight. Health, damage and resistance tracked by the plugin, so a zombie can carry ten thousand hit points without touching an attribute.",
    rail: [
      ["Any vanilla entity", "bee to warden", CSS.ember],
      ["Six tiers", "1 to 6", CSS.amber],
      ["Equipment", "worn and used", CSS.sky],
      ["Potions, auras, trails", "before it reaches you", CSS.purple],
      ["Summons", "on a timer, or on death", CSS.rose],
    ],
    // A dolly along the row, so each tier passes through frame at a readable
    // size rather than all six sitting in the distance at once.
    from: [-11.5, 2.3, 4.6],
    to: [11.5, 2.3, 4.6],
    lookFrom: [-10.5, 1.1, 0],
    lookTo: [10.5, 1.1, 0],
  },
  {
    id: "abilities",
    len: 5.8,
    accent: CSS.purple,
    kicker: "ABILITIES, NOT BIGGER NUMBERS",
    headline: "The warning lands\nbefore the damage does.",
    sub: "Every ability has a trigger, a radius, a cooldown and a telegraph. A particle and a sound arrive a moment early, so a player can move, block or run.",
    rail: [
      ["On interval", "the steady pressure", CSS.sky],
      ["On hit, on hurt", "the reaction", CSS.rose],
      ["On low health", "the turn", CSS.amber],
      ["20+ ready to use", "write your own too", CSS.purple],
    ],
    from: [-6.5, 3.8, 7.0],
    to: [-2.0, 2.4, 5.4],
    look: [0, 1.0, 0],
  },
  {
    id: "boss",
    len: 5.6,
    accent: CSS.rose,
    kicker: "BOSSES CHANGE AS THEY DIE",
    headline: "Phases, an entrance,\nand a bar that changes colour.",
    sub: "Set phase thresholds and a boss picks up new abilities on the way down, gets a moment of immunity while it transitions, and the whole server sees it happen.",
    boss: true,
    from: [4.8, 3.4, 8.6],
    to: [-1.7, 2.2, 5.0],
    look: [0, 2.0, 0],
  },
  {
    id: "companions",
    len: 5.2,
    accent: CSS.emerald,
    kicker: "COMPANIONS THAT FIGHT FOR YOU",
    headline: "Any Epic Mob can be built\nas a friend instead.",
    sub: "It follows you, fights what you fight, never hits you or your allies, and levels up as you play. Give it a saddle and it becomes a mount.",
    rail: [
      ["Follows and fights", "never hits you", CSS.emerald],
      ["Levels up", "unlocks abilities", CSS.amber],
      ["Death", "a cooldown, not a loss", CSS.rose],
      ["Guardians and escorts", "same machinery", CSS.sky],
    ],
    from: [4.8, 2.3, 4.8],
    to: [2.0, 1.7, 3.4],
    look: [1.1, 0.85, 0.2],
  },
  {
    id: "world",
    len: 5.8,
    accent: CSS.sky,
    kicker: "DECIDE WHERE THEY LIVE",
    headline: "Six ways a mob\nreaches the world.",
    sub: "Natural spawning, eggs and spawner blocks, timed triggers, raid and arena waves, replacing a vanilla mob as it spawns, and the API. All on a spawn budget.",
    rail: [
      ["Height, light, weather", "and moon phase", CSS.sky],
      ["Distance from spawn", "and max nearby", CSS.lime],
      ["Per player cooldown", "no repeat ambush", CSS.amber],
      ["A hard ceiling", "per world, per chunk", CSS.rose],
    ],
    // The one shot that pulls back far enough to see the whole set.
    from: [-6, 13.0, 18],
    to: [12, 10.5, 15],
    look: [0, 0.8, 0],
  },
  {
    id: "loot",
    len: 5.2,
    accent: CSS.amber,
    kicker: "LOOT WORTH THE FIGHT",
    headline: "Weighted tables,\nnot a list of coin flips.",
    sub: "Guaranteed drops, weighted entries, a roll count and amount ranges. Rewards are shared by damage dealt, not handed to whoever landed the last hit.",
    rail: [
      ["Guaranteed drops", "every time", CSS.emerald],
      ["Weighted entries", "real rarity", CSS.lime],
      ["Shared by damage", "not by last hit", CSS.amber],
      ["XP, money, or both", "several currencies", CSS.rose],
    ],
    from: [-4.2, 2.7, 5.0],
    to: [2.6, 2.1, 4.0],
    look: [0, 1.2, 0],
  },
  {
    id: "integrations",
    len: 5.2,
    accent: CSS.lime,
    kicker: "PLAYS WELL WITH OTHERS",
    headline: "Standalone first.\nEvery hook optional.",
    sub: "Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI are all detected on their own. Missing one and the integration simply stays off.",
    rail: [
      ["Custom Enchantments 3", "mobs use your enchants", CSS.lime],
      ["Kumandra's Economy", "paid into the Kd wallet", CSS.emerald],
      ["Vault, WorldGuard, PAPI", "if you run them", CSS.sky],
      ["None of them", "nothing changes", CSS.muted],
    ],
    from: [-7.5, 4.2, 10.0],
    to: [3.2, 3.6, 8.5],
    look: [0, 2.2, 0],
  },
  {
    id: "outro",
    len: 5.2,
    accent: CSS.ember,
    outro: true,
    from: [-3.5, 3.8, 10.5],
    to: [3.5, 3.4, 9.0],
    look: [0, 1.8, 0],
  },
  {
    id: "credits",
    len: 6.0,
    accent: CSS.ember,
    credits: true,
    from: [0, 8.0, 18],
    to: [0, 7.6, 16],
    look: [0, 2.0, 0],
  },
];

let clock = 0;
for (const shot of SHOTS) {
  shot.at = clock;
  clock += shot.len;
}
const TOTAL_FRAMES = Math.round(clock * FPS);

/* ------------------------------------------------------------ the scene */

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(1);
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0c0805, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
document.getElementById("stage").prepend(renderer.domElement);

const scene = new THREE.Scene();
/*
 * Close fog, and the reason for it.
 *
 * The park is a bright, busy model and the subject is one mob standing in
 * front of it. Lit evenly, the set wins: a pale building eight units behind a
 * zombie reads as a wall the zombie is stuck to. Pulling the fog in to a few
 * units past the subject drops everything behind it into the dark, which is
 * what makes the mob the thing the eye lands on, and it is also just what a
 * park at night looks like.
 */
scene.fog = new THREE.Fog(0x0c0805, 4.5, 17);

const camera = new THREE.PerspectiveCamera(46, WIDTH / HEIGHT, 0.1, 400);

/*
 * Warm key from high and behind, cool fill from the other side, and a
 * flickering ember point light low in the middle of the set. The last one is
 * what makes the whole thing read as firelit rather than as a daylit render of
 * some blocks.
 */
scene.add(new THREE.HemisphereLight(0x8fbcff, 0x3a2416, 0.26));

const key = new THREE.DirectionalLight(0xffd7a8, 0.55);
key.position.set(9, 16, 7);
scene.add(key);

const fill = new THREE.DirectionalLight(0x6ea8ff, 0.3);
fill.position.set(-11, 6, -9);
scene.add(fill);

/**
 * The stage.
 *
 * The park is a diorama, not a backdrop: its ground plane sits at about y=0.7
 * and its buildings climb past y=22 through the middle of it. Standing anything
 * at the world origin buries it in a roof.
 *
 * So there is a stage: an empty group parked on the flat plaza at z=-12 and
 * turned to face the buildings, with everything the trailer puts on screen
 * inside it. The shot list is written in stage coordinates, subject on the
 * origin, camera in front of it, and localToWorld does the rest. That keeps
 * the shot list readable and means moving the whole production to a different
 * spot on the set is one line rather than forty.
 */
const stage = new THREE.Group();
// Turned a little off square, so the camera looks along the park and past the
// corner of the building behind the subject rather than flat into its face.
stage.rotation.y = 0.42;
scene.add(stage);

/**
 * Measured off the set in build(), once the park is loaded.
 *
 * The stage sits on the long open lawn inside the park, with the camera also
 * inside it and a building behind the subject as a backdrop. The obvious spot,
 * the lawn at the near edge, does not work: the camera ends up outside the
 * park's perimeter wall and shoots the whole trailer through it. Worth knowing
 * before anyone tries to move this.
 */
let GROUND = 0.7;
const STAGE_X = 0;
const STAGE_Z = -9;

const fire = new THREE.PointLight(COLOR.ember, 2.6, 15, 1.8);
fire.position.set(0, 2.4, 3.0);
stage.add(fire);

/**
 * A soft light on the stage itself, from roughly where the camera stands.
 *
 * Without it a mob standing in a park lit from above falls into its own shadow
 * and reads as a silhouette, which is a fine look for a horror trailer and a
 * bad one for a video whose whole job is showing you what the mobs look like.
 */
const subjectLight = new THREE.PointLight(0xffe6c4, 3.0, 9.5, 1.5);
subjectLight.position.set(0, 3.2, 6.0);
stage.add(subjectLight);

/**
 * Bloom, which is what makes the glowing parts read as glowing.
 *
 * The threshold is the setting that matters and it has to sit above 1.0. A
 * Minecraft park is full of bright white and pale green blocks, and any
 * threshold low enough to catch those turns the whole frame into fog. Only the
 * emissive materials in glow() push past 1.0, so only they bloom.
 */
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));
const bloom = new THREE.UnrealBloomPass(
  new THREE.Vector2(WIDTH, HEIGHT),
  0.55, // strength
  0.45, // radius
  1.05, // threshold
);
composer.addPass(bloom);

const BOX = new THREE.BoxGeometry(1, 1, 1);

function glow(color, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.7,
    roughness: 0.4,
    metalness: 0,
    transparent: true,
    opacity,
  });
}

/* ----------------------------------------------------------- the models */

/**
 * Every model is normalised the same way: measured, scaled so its height (or
 * for the set, its footprint) matches a target, then recentred so its base sits
 * on y=0 and its middle is over the origin. Nothing here depends on how a
 * particular artist happened to export their file, which is the only way six
 * models from four people end up standing on the same ground.
 */
function normalise(object, fit) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());

  const scale = fit.height
    ? fit.height / size.y
    : fit.width / Math.max(size.x, size.z);

  object.scale.multiplyScalar(scale);
  object.position.sub(centre.multiplyScalar(scale));
  object.position.y += (size.y * scale) / 2;

  // Minecraft textures are 16 pixel squares. Smoothing them turns a crisp mob
  // into a blurred one, so every map goes to nearest neighbour.
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.frustumCulled = false;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    for (const material of materials) {
      if (!material) continue;
      for (const slot of ["map", "emissiveMap"]) {
        const texture = material[slot];
        if (texture) {
          texture.magFilter = THREE.NearestFilter;
          texture.minFilter = THREE.NearestMipmapLinearFilter;
          texture.anisotropy = 4;
          texture.needsUpdate = true;
        }
      }
      material.side = THREE.DoubleSide;
      if (material.roughness !== undefined) material.roughness = 0.85;
      if (material.metalness !== undefined) material.metalness = 0;
    }
  });

  return object;
}

const MODEL_FILES = {
  park: "minecraft_park.glb",
  warden: "minecraft_warden.glb",
  zombie: "minecraft_zombie.glb",
  spider: "minecraft_better_spider.glb",
  cat: "minecraft_calico_cat.glb",
  player: "player-model-cheer-pose-jaymar921.glb",
};

const loader = new THREE.GLTFLoader();
const buffers = {};
const mixers = [];

/** One fetch per file, then one parse per instance, so clones are independent. */
async function loadBuffers() {
  await Promise.all(
    Object.entries(MODEL_FILES).map(async ([name, file]) => {
      const response = await fetch("./assets/models/" + file);
      buffers[name] = await response.arrayBuffer();
    }),
  );
}

function parse(name) {
  return new Promise((done, fail) => {
    loader.parse(buffers[name].slice(0), "", done, fail);
  });
}

/**
 * An instance is the normalised model wrapped in a plain group, so the shot
 * code can move and turn it without disturbing the normalisation underneath.
 */
async function instance(name, fit) {
  const gltf = await parse(name);
  const group = new THREE.Group();
  group.add(normalise(gltf.scene, fit));

  if (gltf.animations && gltf.animations.length) {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[0]).play();
    mixers.push(mixer);
  }

  stage.add(group);
  return group;
}

/**
 * Where the set's surface is at a given spot.
 *
 * The park is a diorama rather than a flat plate: it is 46 across and over 20
 * tall, so y=0 is the bottom of its deepest hole and not the ground anybody
 * stands on. Every mob is placed by firing a ray straight down onto it and
 * standing on whatever it hits, which means the placement code never has to
 * know anything about how this particular model is built.
 */
const downward = new THREE.Raycaster();
const DOWN = new THREE.Vector3(0, -1, 0);
const scratch = new THREE.Vector3();

/** The surface height in world space, straight down from (x, z). */
function worldGroundAt(x, z, fallback = 0) {
  if (!park) return fallback;
  // Matrices are only refreshed by a render, and a raycast against a stale one
  // silently reports the wrong height, which is the sort of bug that shows up
  // as a mob buried to the waist forty minutes into a capture.
  scene.updateMatrixWorld(true);
  downward.set(new THREE.Vector3(x, 60, z), DOWN);
  const hits = downward.intersectObject(park, true);
  return hits.length ? hits[0].point.y : fallback;
}

/** The same thing in stage coordinates, which is what the shot code uses. */
function groundAt(x, z) {
  // localToWorld reads stage.matrixWorld, which is stale until something
  // refreshes it. Placement runs before the first render, so refresh it here.
  scene.updateMatrixWorld(true);
  const world = stage.localToWorld(scratch.set(x, 0, z));
  return worldGroundAt(world.x, world.z, GROUND) - GROUND;
}

/** Stands a group on the set at stage (x, z), facing wherever it was facing. */
function standAt(group, x, z) {
  group.position.set(x, groundAt(x, z), z);
  return group.position.y;
}

/* Filled in by build(). Declared here so the shot code can name them. */
let park;
let wardenHero;
let player;
let catCompanion;
let zombieLoot;
const tierRow = [];

/** Where the middle of the set actually is, measured once after it loads. */
let heroGroundY = 0;
let companionGroundY = 0;

/* --------------------------------------------------------- drawn effects */

/** The telegraph: a ring that grows to its radius, then the effect landing. */
const telegraph = new THREE.Group();
stage.add(telegraph);

const ringBlocks = Array.from({ length: 48 }, (_, i) => {
  const m = new THREE.Mesh(BOX, glow(COLOR.purple));
  telegraph.add(m);
  return { mesh: m, angle: (i / 48) * Math.PI * 2 };
});

const burstBlocks = Array.from({ length: 34 }, (_, i) => {
  const m = new THREE.Mesh(BOX, glow(COLOR.rose));
  telegraph.add(m);
  return { mesh: m, seed: i };
});

/** Spawn columns, for the shot about where mobs come from. */
const beams = new THREE.Group();
stage.add(beams);
const SPAWN_TINT = [
  COLOR.emerald,
  COLOR.sky,
  COLOR.purple,
  COLOR.rose,
  COLOR.amber,
  COLOR.bone,
];
const beamSet = Array.from({ length: 22 }, (_, i) => {
  const tint = SPAWN_TINT[i % SPAWN_TINT.length];
  const m = new THREE.Mesh(BOX, glow(tint, 0.85));
  const a = rnd(i * 5.3) * Math.PI * 2;
  const r = 3.0 + rnd(i * 9.1) * 8.5;
  m.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
  beams.add(m);
  return { mesh: m, seed: i, delay: rnd(i * 3.7) };
});

/** Loot, rising off a corpse and turning over. */
const lootGroup = new THREE.Group();
stage.add(lootGroup);
const LOOT_TINT = [
  COLOR.emerald,
  COLOR.emerald,
  COLOR.lime,
  COLOR.lime,
  COLOR.sky,
  COLOR.amber,
  COLOR.purple,
];
const lootCubes = Array.from({ length: 24 }, (_, i) => {
  const m = new THREE.Mesh(BOX, glow(LOOT_TINT[i % LOOT_TINT.length], 0.95));
  lootGroup.add(m);
  return { mesh: m, seed: i };
});

/** Three stacks for the integrations shot, one per plugin family. */
const slabs = new THREE.Group();
stage.add(slabs);
const slabSet = [COLOR.lime, COLOR.emerald, COLOR.sky].map((tint, i) => {
  const group = new THREE.Group();
  const material = glow(tint, 0.42);
  for (let b = 0; b < 6; b++) {
    const m = new THREE.Mesh(BOX, material);
    m.position.set(0, 0.6 + b * 0.78, 0);
    m.scale.set(1.4, 0.6, 1.4);
    group.add(m);
  }
  group.position.set(-4.6 + i * 4.6, 0, 0);
  slabs.add(group);
  return { group, material, seed: i };
});

/* ------------------------------------------------------------ the overlay */

const hud = document.getElementById("hud");
const elKicker = document.getElementById("kicker");
const elHeadline = document.getElementById("headline");
const elSub = document.getElementById("sub");
const elCopy = document.getElementById("copy");
const elRail = document.getElementById("rail");
const elBossbar = document.getElementById("bossbar");
const elBossFill = document.getElementById("boss-fill");
const elBossName = document.getElementById("boss-name");
const elOutro = document.getElementById("outro");
const elCredits = document.getElementById("credits");
const elMark = document.getElementById("outro-mark");
elMark.src = "./vendor/mark.png";

const track = document.getElementById("boss-track");
for (let i = 1; i < 12; i++) {
  const seg = document.createElement("span");
  seg.className = "seg";
  seg.style.left = (100 / 12) * i + "%";
  track.appendChild(seg);
}

// Fade to black between shots, so a cut reads as a cut rather than as a jump.
const elFade = document.createElement("div");
elFade.style.cssText =
  "position:absolute;inset:0;background:#000;opacity:0;pointer-events:none";
hud.appendChild(elFade);

let renderedShot = -1;

function paintCopy(shot) {
  elKicker.textContent = shot.kicker || "";
  elKicker.style.color = shot.accent;
  elKicker.style.borderColor = shot.accent;
  elKicker.style.display = shot.kicker ? "inline-block" : "none";

  elHeadline.textContent = shot.headline || "";
  elHeadline.style.color = shot.accent;
  elHeadline.style.whiteSpace = "pre-line";

  elSub.textContent = shot.sub || "";

  elRail.innerHTML = (shot.rail || [])
    .map(
      (row) =>
        '<div class="rail-row" style="border-color:' +
        row[2] +
        '"><span class="k">' +
        row[0] +
        '</span><span class="v" style="color:' +
        row[2] +
        '">' +
        row[1] +
        "</span></div>",
    )
    .join("");
}

/* --------------------------------------------------------------- the frame */

function renderFrame(frameIndex) {
  const t = frameIndex / FPS;

  let index = SHOTS.length - 1;
  for (let i = 0; i < SHOTS.length; i++) {
    if (t >= SHOTS[i].at && t < SHOTS[i].at + SHOTS[i].len) {
      index = i;
      break;
    }
  }
  const shot = SHOTS[index];
  const lt = t - shot.at;
  const p = clamp(lt / shot.len);
  const e = smooth(p);

  if (index !== renderedShot) {
    paintCopy(shot);
    renderedShot = index;
  }

  /* ------------------------------------------------------------- camera */

  // The shot list is written in stage coordinates. Both ends of it go through
  // the same transform, so the camera and what it is aimed at can never end up
  // in different spaces.
  camera.position.copy(
    stage.localToWorld(
      scratch.set(
        mix(shot.from[0], shot.to[0], e),
        mix(shot.from[1], shot.to[1], e),
        mix(shot.from[2], shot.to[2], e),
      ),
    ),
  );

  const lookFrom = shot.lookFrom || shot.look;
  const lookTo = shot.lookTo || shot.look;
  camera.lookAt(
    stage.localToWorld(
      scratch.set(
        mix(lookFrom[0], lookTo[0], e),
        mix(lookFrom[1], lookTo[1], e),
        mix(lookFrom[2], lookTo[2], e),
      ),
    ),
  );

  /* ---------------------------------------------------------- animation */

  // setTime rather than update(delta), so a frame that took a second to draw
  // still advances the animation by exactly one frame of video.
  for (const mixer of mixers) mixer.setTime(t);

  /* -------------------------------------------------------- the lighting */

  // The wide shot is the one that is about the set rather than about a mob, so
  // the fog opens up for it and closes again afterwards.
  const wide = shot.id === "world" || shot.id === "outro";
  scene.fog.near = wide ? 12 : 4.5;
  scene.fog.far = wide ? 46 : 17;

  const flicker = 0.86 + Math.sin(t * 11.3) * 0.08 + Math.sin(t * 27.7) * 0.05;
  fire.intensity = 2.6 * flicker;
  fire.color.set(shot.id === "boss" ? COLOR.rose : COLOR.ember);
  bloom.strength = shot.id === "boss" ? 0.75 : 0.55;

  /* ------------------------------------------------------- what is on set */

  const on = (id) => shot.id === id;

  if (park) park.visible = !on("credits");

  if (wardenHero) {
    wardenHero.visible =
      on("title") || on("abilities") || on("boss") || on("outro");
    wardenHero.rotation.y = FRONT - 0.35 + Math.sin(t * 0.32) * 0.4;
    if (on("boss")) {
      wardenHero.scale.setScalar(mix(1.3, 1.6, e));
      wardenHero.position.y = heroGroundY + Math.sin(t * 1.5) * 0.09;
    } else {
      wardenHero.scale.setScalar(1);
      wardenHero.position.y = heroGroundY;
    }
  }

  for (const entry of tierRow) {
    entry.group.visible = on("mobs");
    entry.group.rotation.y = entry.facing + Math.sin(t * 0.5 + entry.seed) * 0.3;
    entry.group.position.y = entry.groundY + Math.sin(t * 1.7 + entry.seed * 1.3) * 0.04;
  }

  if (player) player.visible = on("companions");
  if (catCompanion) catCompanion.visible = on("companions");
  if (zombieLoot) {
    zombieLoot.visible = on("loot");
    zombieLoot.rotation.y = FRONT - 0.5 + Math.sin(t * 0.6) * 0.35;
  }

  telegraph.visible = on("abilities");
  beams.visible = on("world");
  lootGroup.visible = on("loot");
  slabs.visible = on("integrations");

  /* --------------------------------------------------------- the telegraph */

  if (telegraph.visible) {
    // Two beats inside the shot: the ring grows, then the effect lands.
    const beat = (lt % 2.9) / 2.9;
    const grow = smooth(clamp(beat / 0.62));
    const landed = clamp((beat - 0.62) / 0.2);
    const radius = mix(0.7, 5.8, grow);

    for (const r of ringBlocks) {
      r.mesh.position.set(
        Math.cos(r.angle) * radius,
        heroGroundY + 0.22,
        Math.sin(r.angle) * radius,
      );
      r.mesh.scale.set(0.24, 0.1, 0.24);
      r.mesh.rotation.y = r.angle;
      r.mesh.material.opacity = (1 - landed) * (0.35 + grow * 0.65);
    }

    for (const b of burstBlocks) {
      const a = rnd(b.seed * 3.1) * Math.PI * 2;
      const dist = mix(0.4, 6.0, landed) * (0.5 + rnd(b.seed * 7.7) * 0.5);
      b.mesh.position.set(
        Math.cos(a) * dist,
        heroGroundY + 0.4 + landed * (1.8 + rnd(b.seed * 2.3) * 2.4),
        Math.sin(a) * dist,
      );
      const s = 0.34 * (1 - landed * 0.55);
      b.mesh.scale.set(s, s, s);
      b.mesh.rotation.set(landed * 3, landed * 4, 0);
      b.mesh.material.opacity = landed * (1 - landed) * 3.4;
    }
  }

  /* ------------------------------------------------------------ the beams */

  if (beams.visible) {
    for (const b of beamSet) {
      // Each column arrives at its own moment and stays, so the set fills up
      // across the shot rather than appearing all at once.
      const local = clamp((p - b.delay * 0.6) / 0.3);
      const h = smooth(local) * (3.0 + rnd(b.seed * 11) * 4.4);
      b.mesh.scale.set(0.55, Math.max(0.01, h), 0.55);
      b.mesh.position.y = b.groundY + h / 2;
      b.mesh.material.opacity = smooth(local) * 0.85;
    }
  }

  /* ------------------------------------------------------------- the loot */

  if (lootGroup.visible) {
    for (const c of lootCubes) {
      const a = rnd(c.seed * 4.7) * Math.PI * 2 + t * 0.5;
      const r = 1.2 + rnd(c.seed * 8.3) * 2.8;
      const rise = clamp((p - rnd(c.seed * 2.9) * 0.4) / 0.5);
      c.mesh.position.set(
        Math.cos(a) * r,
        heroGroundY +
          0.7 +
          smooth(rise) * (1.4 + rnd(c.seed * 6.1) * 2.2) +
          Math.sin(t * 2 + c.seed) * 0.1,
        Math.sin(a) * r,
      );
      c.mesh.rotation.set(t * 0.8 + c.seed, t * 0.6 + c.seed, 0);
      const s = 0.24 + rnd(c.seed * 5.5) * 0.18;
      c.mesh.scale.set(s, s, s);
      c.mesh.material.opacity = smooth(rise) * 0.95;
    }
  }

  /* ----------------------------------------------------- the integrations */

  if (slabs.visible) {
    for (const s of slabSet) {
      const arrive = clamp((p - s.seed * 0.14) / 0.36);
      s.group.position.y = mix(heroGroundY - 7, heroGroundY, smooth(arrive));
      s.group.rotation.y = t * 0.3 + s.seed;
      s.material.opacity = smooth(arrive) * 0.45;
    }
  }

  /* ------------------------------------------------------- the companion */

  if (player && catCompanion && on("companions")) {
    // It keeps station off its owner's shoulder and lags a beat behind the
    // turn, which is what following looks like from the outside.
    const swing = Math.sin(t * 0.55);
    player.rotation.y = FRONT - 0.4 + swing * 0.4;
    catCompanion.position.set(
      player.position.x + 1.35 + swing * 0.35,
      companionGroundY,
      player.position.z - 0.75 + Math.cos(t * 0.7) * 0.3,
    );
    catCompanion.rotation.y = FRONT - 0.3 + Math.sin(t * 0.55 + 0.6) * 0.4;
  }

  /* --------------------------------------------------------- the overlay */

  const copyIn = clamp(lt / 0.55);
  const copyOut = clamp((shot.len - lt) / 0.45);
  const copyOpacity = Math.min(smooth(copyIn), smooth(copyOut));

  const isCard = Boolean(shot.outro || shot.credits);
  elCopy.style.opacity = isCard ? 0 : copyOpacity;
  elRail.style.opacity = isCard ? 0 : copyOpacity;
  elOutro.style.opacity = shot.outro ? copyOpacity : 0;
  elCredits.style.opacity = shot.credits ? copyOpacity : 0;

  if (shot.boss) {
    // Three phases, and the bar changes colour on each one, which is the thing
    // the feature is actually selling.
    const health = clamp(1 - p * 1.05);
    const phase = health > 0.6 ? 0 : health > 0.25 ? 1 : 2;
    const phaseColor = [CSS.rose, CSS.purple, "#f8fafc"][phase];
    elBossbar.style.opacity = copyOpacity;
    elBossFill.style.width = "calc(" + health * 100 + "% - 2px)";
    elBossFill.style.background = phaseColor;
    elBossName.style.color = phaseColor;
    elBossName.textContent = "CRYPT WARDEN   -   PHASE " + (phase + 1);
  } else {
    elBossbar.style.opacity = 0;
  }

  const toCut = Math.min(lt, shot.len - lt);
  elFade.style.opacity =
    index === 0 && lt < 0.6
      ? 1 - smooth(lt / 0.6)
      : clamp(1 - toCut / 0.16) * 0.9;

  composer.render();
}

/* ------------------------------------------------------------ the set-up */

async function build() {
  await loadBuffers();

  // The park is the set, and it is the one thing not on the stage: the stage
  // stands on it.
  park = await instance("park", { width: 46 });
  scene.add(park);

  // Plant the stage on the plaza and measure the plaza while we are there.
  GROUND = worldGroundAt(STAGE_X, STAGE_Z, 0.7);
  stage.position.set(STAGE_X, GROUND, STAGE_Z);

  wardenHero = await instance("warden", { height: 3.1 });
  heroGroundY = standAt(wardenHero, 0, 0);

  // The firelight and the drawn effects share the hero's footing, so a ring on
  // the ground is on the ground rather than buried in it or floating over it.
  fire.position.set(0, heroGroundY + 2.4, 3.0);
  for (const b of beamSet) {
    b.groundY = groundAt(b.mesh.position.x, b.mesh.position.z);
  }

  // The tier row: six creatures, smallest to largest, spread across the set.
  // The scale ramp is the point. A cat at one end and a warden at the other
  // says "six tiers" faster than any label could.
  const ROW = [
    ["cat", 0.55],
    ["spider", 1.0],
    ["zombie", 1.75],
    ["spider", 1.5],
    ["zombie", 2.3],
    ["warden", 3.2],
  ];

  for (let i = 0; i < ROW.length; i++) {
    const group = await instance(ROW[i][0], { height: ROW[i][1] });
    const x = -10.5 + i * 4.2;
    const z = -0.4 + rnd(i * 17) * 0.8;
    const groundY = standAt(group, x, z);
    tierRow.push({ group, seed: i, groundY, facing: FRONT + 0.25 - i * 0.08 });
  }

  player = await instance("player", { height: 1.85 });
  standAt(player, 0.4, 0.6);

  catCompanion = await instance("cat", { height: 0.62 });
  companionGroundY = groundAt(1.75, -0.15);

  zombieLoot = await instance("zombie", { height: 1.9 });
  standAt(zombieLoot, 0, 0);
}

/** What the capture script asks for when it wants to check the set. */
window.__probe = () => {
  const report = {
    mixers: mixers.length,
    error: window.__error || null,
    heroGroundY: +heroGroundY.toFixed(2),
    // A cross section of the set's surface, so the camera heights in the shot
    // list can be chosen against something real.
    ground: +GROUND.toFixed(2),
    // Where the set is open. A dot is flat ground with nothing overhead, a
    // hash is something standing on it, and a colon is a canopy or a roof.
    // Read by hand to choose where the stage goes.
    openness: (() => {
      const up = new THREE.Raycaster();
      up.far = 9;
      const rows = [];
      for (let z = -22; z <= 22; z += 2) {
        let row = "";
        for (let x = -22; x <= 22; x += 2) {
          const h = worldGroundAt(x, z, NaN);
          if (!isFinite(h)) {
            row += " ";
            continue;
          }
          if (h > 2.5) {
            row += "#";
            continue;
          }
          up.set(new THREE.Vector3(x, h + 0.6, z), new THREE.Vector3(0, 1, 0));
          row += up.intersectObject(park, true).length ? ":" : ".";
        }
        rows.push(String(z).padStart(3) + " " + row);
      }
      return rows;
    })(),
    // A cross section of the stage, in stage coordinates, so the shot list can
    // be checked against something real. Zero is the plaza.
    surface: (() => {
      const rows = [];
      for (let z = -12; z <= 12; z += 6) {
        const row = [];
        for (let x = -12; x <= 12; x += 6) {
          row.push(groundAt(x, z).toFixed(1).padStart(6));
        }
        rows.push("z=" + String(z).padStart(3) + " |" + row.join(""));
      }
      return rows;
    })(),
    rowFooting: tierRow.map((entry) => entry.groundY.toFixed(1)),
  };
  const named = { park, wardenHero, player, catCompanion, zombieLoot };
  for (const name of Object.keys(named)) {
    const group = named[name];
    if (!group) continue;
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    report[name] = {
      size: [+size.x.toFixed(2), +size.y.toFixed(2), +size.z.toFixed(2)],
      minY: +box.min.y.toFixed(2),
    };
  }
  return report;
};

window.__renderFrame = renderFrame;
window.__totalFrames = TOTAL_FRAMES;
window.__fps = FPS;

/** The middle of each shot, which is what --preview contact sheets. */
window.__shotMidFrames = SHOTS.map((shot) =>
  Math.round((shot.at + shot.len / 2) * FPS),
);

Promise.all([
  document.fonts ? document.fonts.load('16px "joystix"') : Promise.resolve(),
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise((done) => {
    if (elMark.complete) return done();
    elMark.onload = done;
    elMark.onerror = done;
  }),
  build(),
])
  .then(() => {
    renderFrame(0);
    window.__ready = true;
  })
  .catch((error) => {
    window.__error = String(error && error.stack ? error.stack : error);
    window.__ready = true;
  });
