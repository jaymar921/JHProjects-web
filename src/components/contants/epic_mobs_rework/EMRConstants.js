/**
 * Everything the Epic Mobs Rework page reads.
 *
 * Same shape as KumandraConstants.js: one PluginInformation object for the
 * copy and the links, then a named export per list the page renders.
 *
 * This is the one page on the site for a plugin that has not shipped. Two
 * rules follow from that and both are load bearing:
 *
 *   1. Nothing here claims a release date, because there is not one. Not
 *      "soon", not "later this year", not a quarter. The page says unreleased
 *      and says it in the first screen, so nobody plans a season around it.
 *   2. Nothing here has a price attached to a buy button, because there is
 *      nothing to buy yet. The price is stated once, labelled as the intended
 *      one rather than as a live one.
 *
 * The numbers below come out of the plugin's own specification in
 * F:/important stuff/Programming/JAVA/Epic_Mobs_Rework/documents. The Lite
 * ceilings in particular have to match lite-features/1.0-limitations.md, which
 * is the authority for them, and the constants in EditionPolicy.java, which is
 * what actually runs. Change one and change all three.
 */

import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import icon from "../../../assets/epic_mobs_rework/branding/icon.png";
import iconLite from "../../../assets/epic_mobs_rework/branding/icon-lite.png";

export const PluginInformation = {
  title: "Epic Mobs Rework",
  subtitle: "Your server's mobs should be worth fighting.",
  tagline:
    "Build the mob. Give it abilities. Decide where it lives and what it leaves behind.",

  /**
   * The version is the one being built, not one that shipped. The page never
   * prints it next to a date, because there is no date.
   */
  version: "1.0",
  status: "unreleased",
  statusLabel: "IN DEVELOPMENT, NOT RELEASED YET",

  supportedVersions: "1.16.5 and up",
  serverSoftware: "Spigot and Paper",
  javaSupport: "Java 21 to build, runs on Java 8 and up",
  apiVersion: "1.21",

  icon,
  iconLite,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",
  contactEmail: "jaymarplugins@gmail.com",

  /**
   * Deliberately absent: downloadLink, liteDownloadLink and discussionLink.
   * Neither listing exists yet, and a button that leads to a 404 is worse than
   * no button. The page checks for these before drawing anything that links
   * out, so adding them here is all it takes to turn the buttons on.
   */

  /** What it will cost. One number, because there is one number. */
  price: {
    currency: "GBP",
    symbol: "£",
    amount: "15.49",
    note: "The intended price. One payment, and every update after it.",
  },

  /** The predecessor, which this page has to be honest about. */
  predecessor: {
    title: "Epic Mobs",
    href: "/epic-mobs",
    body: "The original Epic Mobs was a premium plugin that ran from October 2021 to April 2023 and then stopped when a full time job left no evenings for it. It is on the shelf, not for sale, and not supported. This is the rebuild, not a patch.",
  },

  description:
    "Epic Mobs Rework is the rebuilt version of Epic Mobs. Same idea, rewritten from the ground up: you take any vanilla entity, give it a name, stats, gear, abilities and a loot table, then tell the plugin where in the world it belongs. It handles the rest.",
  descriptionMore: [
    "The old plugin worked, and then it did not get updated. This one is written for the problems that killed it. There is no NMS anywhere in it, so a Minecraft release does not need a new jar. Every number the plugin uses lives in a file rather than in the source. Bad values are caught on load and named, with the default they fell back to, instead of silently becoming zero. And the spawn system runs on a budget, so it cannot spend a long tick looking for somewhere to put a wolf.",
    "Every mob is a readable file under mobs/, one per mob, so you can edit one in a text editor, hand it to somebody, or track it in git. The old format was a serialized blob nobody could open. If you are coming from the old plugin, your mob definitions, raids, spawners and loot are converted on first start and nothing is deleted.",
    "It is standalone. Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI are all optional, all detected on their own, and none of them is shaded into the jar. Missing one and that integration stays off. Nothing breaks and nothing throws.",
    "It ships as two jars from one source tree. Lite is free and is a complete monster plugin with limits on how much you can build. Full lifts every limit and adds companions, boss phases, packs, arenas, the ability editor and the admin GUI. Nothing expires in either one, because the split is at compile time and there is no timer, no licence check and nothing that phones home.",
  ],

  /**
   * The four things a server owner asks before they read any further. Shown
   * as the trait row under the trailer.
   */
  traits: [
    {
      title: "NO NMS",
      accent: "amber",
      body: "Plain Spigot API, resolved by feature detection at enable. One jar covers 1.16.5 and every release after it.",
    },
    {
      title: "NO DEPENDENCIES",
      accent: "sky",
      body: "Nothing required. Five optional integrations, each detected on its own and each skipped silently when it is absent.",
    },
    {
      title: "ONE PAYMENT",
      accent: "ember",
      body: "When it does go on sale it is bought once, with every update after it included. There is no subscription and there never will be.",
    },
    {
      title: "TRY IT FIRST",
      accent: "emerald",
      body: "A free Lite build ships alongside it. Same code, limits on how much you can build, and it never expires.",
    },
  ],
};

/**
 * Who made the models in the trailer.
 *
 * The trailer is built out of Creative Commons Attribution work, so the credit
 * is not optional and it is not enough for it to be in the video only: the
 * video is embedded on a page, and somebody reading the page should be able to
 * see whose work they are looking at without watching to the end.
 *
 * The same list is the last card of the video and
 * scripts/emr-video/assets/CREDITS.txt. Change one, change all three.
 */
export const ModelCredits = {
  licence: "Creative Commons Attribution",
  note: "The trailer is drawn rather than filmed. The set and the mobs in it are other people's models, used under CC Attribution. Neither they nor their authors are affiliated with this plugin.",
  models: [
    { name: "minecraft_park", author: "rhoce", url: "https://sketchfab.com/rhoce" },
    {
      name: "minecraft_zombie",
      author: "JohnElkes",
      url: "https://sketchfab.com/JohnElkes",
    },
    {
      name: "minecraft_calico_cat",
      author: "JohnElkes",
      url: "https://sketchfab.com/JohnElkes",
    },
    {
      name: "minecraft_better_spider",
      author: "JohnElkes",
      url: "https://sketchfab.com/JohnElkes",
    },
    {
      name: "minecraft_warden",
      author: "BeckBroEYTube",
      url: "https://sketchfab.com/BeckBroEYTube",
    },
    {
      name: "player model",
      author: "nogard.dev skin renderer",
      url: "https://nogard.dev/tools/minecraft-skin-renderer",
    },
  ],
};

/**
 * The feature panels. `key` is what the page passes to setSubcontent, so it
 * has to match the switch in EpicMobsReworkPage.
 */
export const Features = [
  {
    key: "mobs",
    title: "THE MOB BUILDER",
    icon: "fa-solid fa-skull",
    accent: "ember",
    image: FeatureArt.mobs,
    description:
      "Any vanilla entity as the base, six tiers, gear it actually wears, and one readable file per mob you can open in a text editor.",
    button: "Mobs",
  },
  {
    key: "abilities",
    title: "ABILITIES",
    icon: "fa-solid fa-wand-sparkles",
    accent: "purple",
    image: FeatureArt.abilities,
    description:
      "Triggers, radius, cooldown and a telegraph that lands before the damage does. 20+ written, and you can write your own.",
    button: "Abilities",
  },
  {
    key: "bosses",
    title: "BOSS PHASES",
    icon: "fa-solid fa-dragon",
    accent: "rose",
    image: FeatureArt.bosses,
    description:
      "A boss picks up new abilities on the way down, gets an entrance, a moment of immunity, and a bar that changes colour.",
    button: "Bosses",
  },
  {
    key: "companions",
    title: "COMPANIONS",
    icon: "fa-solid fa-paw",
    accent: "emerald",
    image: FeatureArt.companions,
    description:
      "Any Epic Mob built as a friend instead. It follows, fights, levels up, and with a saddle it becomes a mount.",
    button: "Companions",
  },
  {
    key: "world",
    title: "SPAWNING",
    icon: "fa-solid fa-earth-americas",
    accent: "sky",
    image: FeatureArt.world,
    description:
      "Six ways a mob reaches the world, conditions well past biome and time of day, and a hard spawn budget behind all of it.",
    button: "Spawning",
  },
  {
    key: "raids",
    title: "RAIDS & ARENAS",
    icon: "fa-solid fa-tower-observation",
    accent: "rose",
    image: FeatureArt.raids,
    description:
      "A raid with a place, escalating waves and a boss on the last one. Arenas you record, and packs with a leader worth killing.",
    button: "Raids",
  },
  {
    key: "loot",
    title: "LOOT & REWARDS",
    icon: "fa-solid fa-sack-dollar",
    accent: "amber",
    image: FeatureArt.loot,
    description:
      "Weighted tables with guaranteed drops and roll counts. Rewards shared by damage dealt, in XP, money, or both.",
    button: "Loot",
  },
  {
    key: "integrations",
    title: "INTEGRATIONS",
    icon: "fa-solid fa-plug",
    accent: "lime",
    image: FeatureArt.integrations,
    description:
      "Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI. All optional, all automatic.",
    button: "Integrations",
  },
  {
    key: "config",
    title: "CONFIGURATION",
    icon: "fa-solid fa-gears",
    accent: "lime",
    image: FeatureArt.config,
    description:
      "Every number in a file, validated on load, reloadable in game. An update keeps your values and saves the old file.",
    button: "Config",
  },
  {
    key: "editions",
    title: "LITE AND FULL",
    icon: "fa-solid fa-scale-balanced",
    accent: "amber",
    image: FeatureArt.editions,
    description:
      "What the free build gives you, in full, with every number. Nothing hidden, nothing that expires, and no nag screen.",
    button: "Editions",
  },
];

/** The four things that make a fight rather than a health bar. */
export const AbilityTriggers = [
  {
    name: "INTERVAL",
    accent: "sky",
    icon: "fa-solid fa-repeat",
    note: "The steady pressure. Frost novas, expanding rings of fire, stacking slows.",
  },
  {
    name: "ON_HIT / ON_HURT",
    accent: "rose",
    icon: "fa-solid fa-hand-fist",
    note: "The reaction. Reflecting damage, healing off what it deals, knocking a weapon out of a hand.",
  },
  {
    name: "ON_LOW_HEALTH",
    accent: "amber",
    icon: "fa-solid fa-heart-crack",
    note: "The turn. Enrage, call the pack in, open the last phase.",
  },
  {
    name: "ON_SPAWN / ON_DEATH / ON_KILL",
    accent: "lime",
    icon: "fa-solid fa-skull-crossbones",
    note: "Everything else, including on target acquired, so an ambush can announce itself.",
  },
];

/** The six ways a mob gets into the world, from the spawn rule engine. */
export const SpawnPaths = [
  {
    name: "Natural spawning",
    accent: "emerald",
    icon: "fa-solid fa-tree",
    note: "Near players, on conditions you set, inside the spawn budget.",
  },
  {
    name: "Eggs and spawner blocks",
    accent: "sky",
    icon: "fa-solid fa-egg",
    note: "Hand out an egg, or place a spawner and leave it there.",
  },
  {
    name: "Timed triggers",
    accent: "purple",
    icon: "fa-solid fa-stopwatch",
    note: "At a location, firing only while somebody is close enough to see it.",
  },
  {
    name: "Raid and arena waves",
    accent: "rose",
    icon: "fa-solid fa-tower-observation",
    note: "Scripted, with a composition per wave rather than a spawn spree.",
  },
  {
    name: "Replacing a vanilla mob",
    accent: "amber",
    icon: "fa-solid fa-shuffle",
    note: "The cheapest path. It respects the vanilla cap and spreads naturally.",
  },
  {
    name: "Commands and the API",
    accent: "lime",
    icon: "fa-solid fa-terminal",
    note: "/ep summon, and the developer API for your own plugin.",
  },
];

/** The optional integrations, in the order the page lists them. */
export const Integrations = [
  {
    name: "Custom Enchantments 3",
    accent: "lime",
    icon: "fa-solid fa-wand-magic-sparkles",
    href: "/customenchantments3",
    required: false,
    points: [
      "Mobs trigger the CE3 enchantments on their own gear. Bleed, Light Spirit, Execute, Wind Strike, Dragon Breath, and armor ones like Tank and Poisonous Thorns",
      "You choose which enchantments a mob may use and how hard they land, because a mob with a maxed Soul Eater is not a fight",
      "Your CE3 weapons, wands and bows work against an Epic Mob exactly as they do against anything else",
      "Drop CE3 treasures by rarity, or specific enchantment books, straight off a mob",
      "Pay kill rewards in RACO, drawn out of CE3's own capped supply rather than minted",
      "CE3 protected boundaries keep Epic Mobs out of your spawn and your builds",
    ],
  },
  {
    name: "Kumandra's Economy",
    accent: "emerald",
    icon: "fa-solid fa-coins",
    href: "/kumandras-economy",
    required: false,
    points: [
      "Kill rewards go straight into the Kd wallet, tagged so they read correctly in the player's transaction history instead of appearing from nowhere",
      "A player who logs out halfway through a boss fight still gets paid",
      "A mob can name more than one currency, so you can pay Kd, pay RACO, pay both, or let each player pick with /ep wallet",
      "Falls back cleanly on an older Kumandra, using the untagged call rather than refusing to hook",
    ],
  },
  {
    name: "Vault",
    accent: "sky",
    icon: "fa-solid fa-vault",
    required: false,
    points: [
      "Supported as a third provider, with whatever economy sits behind it",
      "The provider order is yours to set, so Vault installed without a provider cannot block the others",
    ],
  },
  {
    name: "WorldGuard",
    accent: "purple",
    icon: "fa-solid fa-shield-halved",
    required: false,
    points: [
      "Regions keep Epic Mobs out, and a registered epicmobs-spawn flag lets you allow them back in where you want them",
      "No WorldGuard? The plugin has its own cuboid regions in regions.yml, so protection works with nothing else installed",
    ],
  },
  {
    name: "PlaceholderAPI",
    accent: "amber",
    icon: "fa-solid fa-code",
    required: false,
    points: [
      "Live mob counts, boss name and health, raid state and progress, personal kill counts and companion level",
      "Registered reflectively, so PlaceholderAPI stays optional",
    ],
  },
];

/**
 * The Lite and Full split. Every row here has to match
 * documents/lite-features/1.0-limitations.md in the plugin repo, which is the
 * authority, and the constants in EditionPolicy.java, which is what runs.
 */
export const EditionMatrix = [
  { feature: "Mob definitions", lite: "10", full: "Unlimited" },
  { feature: "Abilities per mob", lite: "2, built-in only", full: "Unlimited" },
  { feature: "Custom ability authoring", lite: false, full: true },
  { feature: "Boss bars", lite: true, full: true },
  { feature: "Boss phases", lite: false, full: true },
  { feature: "Companions, mounts, escorts", lite: false, full: true },
  { feature: "Friendly and guardian factions", lite: false, full: true },
  { feature: "Loot table entries per mob", lite: "5", full: "Unlimited" },
  { feature: "CE3 treasure and book drops", lite: false, full: true },
  { feature: "Loot shared by damage dealt", lite: true, full: true },
  {
    feature: "Spawn conditions",
    lite: "World, biome, time, chance",
    full: "Plus height, light, weather, moon, distance, cooldown, tags",
  },
  { feature: "Replacing a vanilla mob", lite: false, full: true },
  { feature: "Spawn budget and per-world caps", lite: true, full: true },
  { feature: "Raid definitions", lite: "1", full: "Unlimited" },
  { feature: "Raid boss wave", lite: false, full: true },
  { feature: "Raid scheduling windows", lite: false, full: true },
  { feature: "Packs, leaders, formations", lite: false, full: true },
  { feature: "Arenas and waves", lite: false, full: true },
  { feature: "Spawn triggers", lite: "3", full: "Unlimited" },
  { feature: "Player-count scaling", lite: false, full: true },
  { feature: "Mob codex", lite: false, full: true },
  { feature: "Admin GUI editor", lite: false, full: true },
  { feature: "Chat wizard and commands", lite: true, full: true },
  {
    feature: "Reward currencies per mob",
    lite: "1",
    full: "Several, with ALL and PLAYER_CHOICE",
  },
  { feature: "Vault, Kumandra, CE3 RACO", lite: true, full: true },
  { feature: "CE3 mob enchantments", lite: true, full: true },
  { feature: "CE3 and WorldGuard protection", lite: true, full: true },
  { feature: "PlaceholderAPI", lite: true, full: true },
  { feature: "API events and queries", lite: true, full: true },
  { feature: "API mutation", lite: false, full: true },
  { feature: "Diagnostics and /ep timings", lite: true, full: true },
  { feature: "Support prompt for ops", lite: true, full: false },
];

/** The four promises the Lite build makes, which are the reason to try it. */
export const LiteGuarantees = [
  {
    title: "IT WILL NOT EXPIRE",
    accent: "emerald",
    icon: "fa-solid fa-infinity",
    body: "No timer, no trial period, no licence check. The two builds are separate jars compiled from separate source, so there is nothing to check and nothing to run out.",
  },
  {
    title: "IT WILL NOT REFUSE YOUR FILES",
    accent: "sky",
    icon: "fa-solid fa-file-circle-check",
    body: "Go over a limit and the extra entries are skipped with a warning naming each one. The plugin still starts.",
  },
  {
    title: "IT WILL NOT EAT YOUR DATA",
    accent: "amber",
    icon: "fa-solid fa-hard-drive",
    body: "Move from the full version down to this one and every file stays intact. Move back up and you get everything back.",
  },
  {
    title: "IT WILL NOT BOTHER YOUR PLAYERS",
    accent: "lime",
    icon: "fa-solid fa-user-shield",
    body: "There is one support prompt and only server operators ever see it. Non-ops never get anything.",
  },
];

/** The plugin's commands. `lite: false` means the full build only. */
export const CommandList = [
  {
    command: "/ep create mob",
    description:
      "Build a new Epic Mob through the chat wizard. Entity, name, tier, stats, gear, abilities, loot and spawn rules, one prompt at a time.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep create raid",
    description: "Build a raid: its place, its waves, its kill goal and its boss.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep create trigger [delay] [radius] [mob]",
    description:
      "Place a timed spawn trigger where you are standing. It only fires while a player is close enough to see it.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep create remove_trigger [mob]",
    description: "Remove a trigger you placed.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep editor",
    description:
      "Open the mob editor: a searchable list, a live preview, click-to-adjust stats, a real inventory for equipment, and a test button that spawns the mob beside you before you save.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep modify edit [mob]",
    description: "Change a mob in chat rather than in the editor.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep modify delete [mob]",
    description: "Remove a mob definition.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep summon [mob]",
    description: "Spawn one where you are standing. The quickest way to look at what you just built.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep spawneggs",
    description: "Open the spawn egg menu and take an egg for any of your mobs.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep spawners",
    description: "Open the spawner menu. Place one and it keeps spawning on the rules you gave it.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep raid start|stop|list",
    description:
      "Drive a raid by hand. Start names the one you want rather than picking at random.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep arena list|start|reset",
    description: "Drive an arena, and reset one that a party left half finished.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep companion",
    description:
      "Claim and command your companion. Follow, stay, passive, aggressive, dismiss and rename, from a small GUI.",
    requireOp: false,
    lite: false,
  },
  {
    command: "/ep codex",
    description:
      "Your own record of what you have killed. First kill unlocks the entry, ten reveal the abilities, fifty reveal the loot table.",
    requireOp: false,
    lite: false,
  },
  {
    command: "/ep wallet",
    description: "Pick which currency your kill rewards are paid in.",
    requireOp: false,
    lite: false,
  },
  {
    command: "/ep info",
    description:
      "The plugin's settings, which edition is running, the active limits, and which integrations are hooked. The first thing to run when something looks wrong.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep info [mob]",
    description: "What is publicly known about a mob. Not the admin stat dump.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep timings",
    description:
      "Where the plugin is spending its tick: spawn searches, ability ticks and event handlers over the last minute.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep debug [category]",
    description:
      "Verbose logging for one area at a time: spawn, combat, loot, raid, integration or performance.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep reload",
    description:
      "Reload every config, config.yml included, and report what changed and what failed.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep clear",
    description: "Remove every Epic Mob currently in the world.",
    requireOp: true,
    lite: true,
  },
];

/** The files the plugin writes, and what each is for. */
export const FileLayout = [
  {
    path: "config.yml",
    accent: "lime",
    note: "Every number the plugin uses. Spawn rates, intervals, ranges, drop chances, ability radii, the raid tier table, the despawn sweep.",
  },
  {
    path: "Lang.yml",
    accent: "sky",
    note: "Every player-facing string, so the plugin can speak whatever your server speaks.",
  },
  {
    path: "abilities.yml",
    accent: "purple",
    note: "The ability library. Read in the full build only; Lite uses the built-in set.",
  },
  {
    path: "regions.yml",
    accent: "rose",
    note: "The plugin's own no-spawn cuboids, so region protection works with nothing else installed.",
  },
  {
    path: "mobs/",
    accent: "ember",
    note: "One readable file per mob. Edit one in a text editor, share it, or put it in git.",
  },
  {
    path: "raids/",
    accent: "amber",
    note: "One file per raid definition.",
  },
  {
    path: "packs/  arenas/",
    accent: "emerald",
    note: "Pack and arena definitions. Full build only.",
  },
  {
    path: "data/",
    accent: "slate",
    note: "What the server made rather than what you wrote: placed spawners, mobs waiting on a chunk, and per-player wallet, codex and companion state.",
  },
];

/** The first run, in order, for somebody who has just downloaded the jar. */
export const SetupSteps = [
  {
    n: "1",
    title: "DROP THE JAR IN",
    body: "Stop the server, put the jar in the plugins folder, start it again. There is nothing to install alongside it. Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI are all optional and each is detected only if it happens to be there. The plugins/EpicMobsRework folder and everything in it is written on that first start.",
  },
  {
    n: "2",
    title: "CHECK WHICH JAR YOU HAVE",
    cmd: "/ep info",
    body: "The console banner prints an Edition line on boot, and /ep info prints the same in game along with every active limit and which integrations hooked. The two jars look identical in the plugins folder apart from the file name, so check this before you spend an evening wondering why a command is missing.",
  },
  {
    n: "3",
    title: "PICK YOUR WORLDS",
    cmd: "general.worlds",
    body: "One line in config.yml. Name the worlds the plugin is allowed to act in, or leave the list empty to run everywhere. Do this before anything spawns, not after.",
  },
  {
    n: "4",
    title: "BUILD ONE MOB",
    cmd: "/ep create mob",
    body: "The chat wizard walks you through it: entity, name, tier, health, damage, resistance, gear, abilities, loot and where it belongs. On the full build /ep editor does the same thing with a GUI and a test button. Either way it saves out to mobs/ as a file you can open.",
  },
  {
    n: "5",
    title: "LOOK AT IT",
    cmd: "/ep summon [mob]",
    body: "Spawn it next to you and fight it. This is the loop: summon, watch, change a number in the file, /ep reload, summon again. You are not waiting on natural spawning to find out whether a mob is any good.",
  },
  {
    n: "6",
    title: "TURN SPAWNING ON",
    cmd: "spawning.natural",
    body: "Once a mob reads the way you want, give it spawn rules and let the world do the rest. Start with a low chance and watch /ep timings for a few minutes. The spawn budget stops it running away, but the budget is a ceiling, not a plan.",
  },
];

/**
 * One card per system, with the command that exercises it and what should
 * happen. Ordered by how little setup each needs, so a new owner can work
 * through it top to bottom on a fresh server.
 */
export const SetupTests = [
  {
    name: "A MOB",
    icon: "fa-solid fa-skull",
    accent: "ember",
    cmd: "/ep summon [mob]",
    body: "Spawn what you built. Hit it and watch the health display, then let it hit you. If the numbers feel wrong, change them in mobs/<name>.yml and /ep reload rather than rebuilding it.",
  },
  {
    name: "AN ABILITY",
    icon: "fa-solid fa-wand-sparkles",
    accent: "purple",
    cmd: "abilities: [ ... ]",
    body: "Give the mob one ability and stand in front of it. You should see and hear the telegraph before anything lands. If you do not, telegraph.enabled is off in config.yml, and it is the single setting that most changes how a fight reads.",
  },
  {
    name: "A BOSS",
    icon: "fa-solid fa-dragon",
    accent: "rose",
    cmd: "tier: 6  +  phases",
    body: "A boss carries a bar every player online can see. On the full build add phase thresholds and watch the bar change colour as it drops. Set the thresholds close together while testing so you do not have to fight it for ten minutes.",
  },
  {
    name: "LOOT",
    icon: "fa-solid fa-sack-dollar",
    accent: "amber",
    cmd: "/ep debug loot",
    body: "Kill it a few times. Debug prints each roll and which entry won, which is how you find out that a weight of 5 against a weight of 60 really is that rare. Guaranteed drops should land every single time.",
  },
  {
    name: "A REWARD",
    icon: "fa-solid fa-coins",
    accent: "emerald",
    cmd: "/ep info",
    body: "Check which economy hooked before you wonder why nobody is being paid. With Kumandra's Economy installed the payout shows up in the player's own transaction list with the mob's name on it.",
  },
  {
    name: "THE COST OF IT",
    icon: "fa-solid fa-gauge-high",
    accent: "sky",
    cmd: "/ep timings",
    body: "Run this after ten minutes of spawning, not before. It reports time spent in spawn searches, ability ticks and event handlers. If spawn search is climbing, lower spawn-search-budget-ms rather than turning spawning off.",
  },
];

/** Permission nodes, from the plugin's own plugin.yml. */
export const Permissions = [
  {
    node: "epicmobs.use",
    grants: "The parent node for the player-facing commands. Everything below inherits from it.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.info",
    grants: "Run /ep info, and /ep info on a mob.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.companion",
    grants: "Claim and command a companion. Full build only.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.codex",
    grants: "Open the personal mob codex. Full build only.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.wallet",
    grants: "Choose which currency kill rewards are paid in. Full build only.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.loot.vip",
    grants: "The loot multiplier a table can name in its conditions. Granted to nobody by default.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin",
    grants: "The parent node for everything below. Creating, editing and deleting mobs, raids, arenas and triggers.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin.editor",
    grants: "Open the admin GUI editor. Full build only.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin.summon",
    grants: "Spawn a mob by name, and hand out spawn eggs and spawners.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin.raid",
    grants: "Start, stop and list raids and arenas by hand.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin.diagnostics",
    grants: "Run /ep timings and /ep debug.",
    fallback: "op",
  },
  {
    node: "epicmobs.admin.reload",
    grants: "Reload every config, and clear every Epic Mob in the world.",
    fallback: "op",
  },
];

/**
 * What is finished and what is not. This is the honest half of the page and
 * it is the section a returning visitor comes back to, so it is a list rather
 * than a paragraph.
 */
export const BuildProgress = [
  {
    area: "The two-jar build",
    state: "done",
    note: "Premium and Lite from one source tree, split at compile time. A premium-only class is absent from the Lite jar rather than disabled in it, and the release workflow fails the build if one leaks.",
  },
  {
    area: "The release pipeline",
    state: "done",
    note: "Both jars built and verified on a tag, checked for leaked premium classes and for shaded plugin APIs, and published together.",
  },
  {
    area: "The configuration surface",
    state: "done",
    note: "Every key specified, with validation, unit-suffixed durations, and the rule that nothing worth changing is a constant in the source.",
  },
  {
    area: "The defect backlog",
    state: "done",
    note: "Forty numbered defects in the old plugin, written up with the order to fix them in. That list is what the rework is actually working through.",
  },
  {
    area: "The source rework",
    state: "in progress",
    note: "The old source targets the 1.19 API and does not compile against the current one. Making it build is step one and it is where the work is.",
  },
  {
    area: "The ability system",
    state: "in progress",
    note: "The rewrite from sixteen hard-coded behaviours on one shared timer to definitions with triggers, telegraphs and effect lists.",
  },
  {
    area: "A release date",
    state: "not yet",
    note: "There is not one, and there will not be a guess at one. When there is a date it goes on this page before it goes anywhere else.",
  },
];
