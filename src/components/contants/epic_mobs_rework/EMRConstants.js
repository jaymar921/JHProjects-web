/**
 * Everything the Epic Mobs Rework page reads.
 *
 * Same shape as KumandraConstants.js: one PluginInformation object for the
 * copy and the links, then a named export per list the page renders.
 *
 * This page used to be for a plugin that had not shipped. It has now, on
 * 6 September 2026 as **1.0-RC1** and on 11 September 2026 as **1.0-RC2**,
 * and that distinction is the rule the whole file obeys:
 *
 *   1. The page says release candidate everywhere it says a version. An RC is
 *      a published build with every 1.0 feature in it, and it is not 1.0. An
 *      owner deciding whether to put it on a live server has to be able to
 *      read that in the first screen rather than work it out from a suffix.
 *   2. Nothing here claims a date for 1.0 proper, because there is not one.
 *      1.0 lands when the RC stops turning things up.
 *   3. The known gaps are on the page, not buried in a changelog. They are in
 *      KnownGaps below and the page renders them next to the download button.
 *
 * The numbers below come out of the plugin's own specification in
 * F:/important stuff/Programming/JAVA/Epic_Mobs_Rework/documents. The Lite
 * ceilings in particular have to match lite-features/1.0-limitations.md, which
 * is the authority for them, and the constants in EditionPolicy.java, which is
 * what actually runs. Change one and change all three. The commands and the
 * permissions come from documents/commands.md, which is the wiki page, and the
 * developer API section from documents/api/developer-api-guide.md.
 */

import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import * as Screens from "../../../assets/epic_mobs_rework/screenshots";
import icon from "../../../assets/epic_mobs_rework/branding/icon.png";
import iconLite from "../../../assets/epic_mobs_rework/branding/icon-lite.png";
import spigotImg from "../../../assets/custom_enchants_3/spigot.png";
// Same payee as Custom Enchantments 3, so the same logo and the same QR. There
// is one Wise account behind both pages and duplicating the PNG would only
// give it two places to go stale.
import wiseImg from "../../../assets/custom_enchants_3/wise.png";
import wisePaymentQr from "../../../assets/custom_enchants_3/wise-payment-qr.png";

/**
 * Both listings, in one place, because six things link to them.
 *
 * The full build moved to resource 97476 when 1.0-RC2 went public. Lite
 * stayed where it was. If either changes again this is the only place to
 * edit.
 *
 * `liteDownload` is the jar, not the listing: Spigot's Download Now button
 * carries a version id that changes with every upload, so when a new Lite
 * build goes up, read the button off the listing and put the new id here.
 * The premium jar needs a logged-in buyer, so its button stays on the listing.
 */
const SPIGOT = {
  premiumId: 97476,
  liteId: 138550,
  premium:
    "https://www.spigotmc.org/resources/%E2%9C%AF-epic-mobs-rework-%E2%9C%AF-1-16.97476/",
  lite: "https://www.spigotmc.org/resources/%E2%9C%AF-epic-mobs-rework-lite-%E2%9C%AF-1-16.138550/",
  liteDownload:
    "https://www.spigotmc.org/resources/%E2%9C%AF-epic-mobs-rework-lite-%E2%9C%AF-1-16.138550/download?version=651977",
  premiumDiscussion: "https://www.spigotmc.org/resources/97476/",
  liteDiscussion: "https://www.spigotmc.org/resources/138550/",
};

export const PluginInformation = {
  title: "Epic Mobs Rework",
  subtitle: "Your server's mobs should be worth fighting.",
  tagline:
    "Build the mob. Give it abilities. Decide where it lives and what it leaves behind.",

  /**
   * The version that is published. The RC suffix is part of it everywhere it
   * is printed, because a release candidate that reads as 1.0 on a web page is
   * a release candidate nobody treats as one.
   */
  version: "1.0-RC2",
  status: "release candidate",
  statusLabel: "1.0-RC2 IS OUT, RELEASE CANDIDATE",
  releaseDate: "2026-09-11",
  releaseDateLabel: "11 September 2026",

  supportedVersions: "1.16.5 and up",
  serverSoftware: "Spigot and Paper",
  javaSupport: "Java 21 to build, runs on Java 8 and up",
  apiVersion: "1.21",
  testedOn: "Minecraft 26.2 and 1.21.5, checked against the 1.16.5 API",

  icon,
  iconLite,
  spigotLogo: spigotImg,

  /** Both listings. Lite went up first so the premium page could link to it. */
  spigot: SPIGOT,
  downloadLink: SPIGOT.premium,
  liteDownloadLink: SPIGOT.liteDownload,
  discussionLink: SPIGOT.premiumDiscussion,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",
  contactEmail: "jaymarplugins@gmail.com",

  /**
   * Two numbers while the plugin is a release candidate: `amount` is what you
   * pay today, `regularAmount` is what it goes back to when 1.0 ships. The
   * sale is the whole of the discount. PayPal and Wise carry their own
   * percentage off on Custom Enchantments 3 and deliberately do not here,
   * because stacking a payment-method discount on a pre-release price would
   * take the same jar below what it costs to keep supporting.
   *
   * When 1.0 lands: set `onSale` to false and `amount` to `regularAmount`.
   * Everything that renders a price reads `amount`, so that is the only edit.
   */
  price: {
    currency: "GBP",
    symbol: "£",
    amount: "7.99",
    regularAmount: "15.99",
    onSale: true,
    saleLabel: "PRE-RELEASE SALE",
    saleNote:
      "£7.99 is the pre-release price and it holds while the plugin is a release candidate. When 1.0 ships it goes to £15.99. Buying now buys the plugin, so 1.0 and everything after it is the same purchase at the price you paid today.",
    note: "One payment, and every update after it. Bought through Spigot, PayPal or Wise.",
  },

  /**
   * The two off-Spigot ways to pay, mirroring Custom Enchantments 3 step for
   * step: send the exact amount, screenshot the receipt, email it with your
   * Spigot username, and the resource is granted by hand.
   *
   * `discountPercent` is 0 on both and that is on purpose rather than an
   * oversight. The pre-release price is already the discount. The field stays
   * because the buy panels read it, so putting a number back is one edit in
   * one place if that ever changes.
   */
  payment: {
    contactEmail: "jaymarplugins@gmail.com",
    paymentSubject: "Epic Mobs Rework Plugin Payment",
    spigotAccountRequirement:
      "You must have a Spigot account before paying. Your Spigot username is required to receive the plugin.",
    exactPaymentNotice:
      "Pay the exact amount shown. There is no return or refund policy for payments that are less or more than the required amount.",
    noDiscountNotice:
      "There is no payment method discount while the plugin is on its pre-release price. Every route below costs the same.",
    paypal: {
      link: "https://www.paypal.com/paypalme/JayMar921",
      discountPercent: 0,
      currencySymbol: "£",
    },
    wise: {
      link: "https://wise.com/pay/me/jayharronmara",
      qr: wisePaymentQr,
      discountPercent: 0,
      currencySymbol: "£",
    },
    wiseLogo: wiseImg,
  },

  /**
   * The three ways to pay, rendered as tiles in the buy panel. Same shape as
   * Custom Enchantments 3: a link goes straight out, an onClick opens another
   * panel instead. Spigot is first because it is the one that hands over the
   * jar without anybody waiting on an email.
   */
  buyLink: [
    {
      title: "Spigot",
      link: SPIGOT.premium,
      logo: spigotImg,
    },
    {
      title: "PayPal",
      onClick: (setSubcontent) => {
        setSubcontent?.("buy through paypal");
      },
      icon: "fa-brands fa-paypal text-blue-400",
    },
    {
      title: "Wise",
      onClick: (setSubcontent) => {
        setSubcontent?.("buy through wise");
      },
      logo: wiseImg,
    },
  ],

  /** Donations, which are not a purchase and do not unlock the full build. */
  supportLink: [
    {
      title: "Buy JayMar a coffee",
      link: "https://buymeacoffee.com/jaymar921",
      icon: "fa-solid fa-mug-hot text-yellow-500",
    },
    {
      title: "PayPal",
      link: "https://www.paypal.com/paypalme/JayMar921",
      icon: "fa-brands fa-paypal text-blue-400",
    },
    {
      title: "Donate via Wise",
      link: "https://wise.com/pay/me/jayharronmara",
      logo: wiseImg,
    },
  ],

  /** The predecessor, which this page has to be honest about. */
  predecessor: {
    title: "Epic Mobs",
    href: "/epic-mobs",
    body: "The original Epic Mobs was a premium plugin that ran from October 2021 to April 2023 and then stopped when a full time job left no evenings for it. It is on the shelf, not for sale, and not supported. This is the rebuild, not a patch.",
  },

  description:
    "Epic Mobs Rework is the rebuilt version of Epic Mobs. Same idea, rewritten from the ground up: you take any vanilla entity, give it a name, stats, gear, abilities and a loot table, then tell the plugin where in the world it belongs. It handles the rest. Twenty mobs, the World Infestation raid, a pack and an arena are written for you on the first start, and the full build adds twenty more mobs and three more raids on top, two of them in the Nether and the End. There is something to fight before you have built anything.",
  descriptionMore: [
    "The old plugin worked, and then it did not get updated. This one is written for the problems that killed it. There is no NMS anywhere in it, so a Minecraft release does not need a new jar. Every number the plugin uses lives in a file rather than in the source. Bad values are caught on load and named, with the default they fell back to, instead of silently becoming zero. And the spawn system runs on a budget, so it cannot spend a long tick looking for somewhere to put a wolf.",
    "Every mob is a readable file under mobs/, one per mob, so you can edit one in a text editor, hand it to somebody, or track it in git. The old format was a serialized blob nobody could open. If you are coming from the old plugin, your mob definitions, raids, spawners and loot are converted on first start and nothing is deleted.",
    "It is standalone. Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI are all optional, all detected on their own, and none of them is shaded into the jar. Missing one and that integration stays off. Nothing breaks and nothing throws.",
    "It ships as two jars from one source tree. Lite is free and is a complete monster plugin: the same twenty mobs, with limits on how much of your own you can build on top. Full lifts every limit and adds companions, boss phases, packs, arenas, custom ability authoring and the admin GUI. Nothing expires in either one, because the split is at compile time and there is no timer, no licence check and nothing that phones home.",
    "It is closed source, which is why the developer API is its own published artifact rather than an invitation to read the code. EpicMobsRework-api.jar is a handful of interfaces, ten queries and eleven events, attached to every release, and it is a contract: nothing in that package names anything internal, so what you compile against does not move underneath you when the plugin does.",
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
      body: "£7.99 while it is a release candidate, £15.99 once 1.0 ships. Bought once, every update after it included, no subscription.",
    },
    {
      title: "TRY IT FIRST",
      accent: "emerald",
      body: "The free Lite build is on Spigot now. Same code, same twenty mobs, limits on how much you build, and it never expires.",
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
      "Waves paced by the kill goal, five anchor modes including one that happens everywhere at once, raids that wait for dark or happen in the Nether and the End, arenas you mark out in two commands, and packs with a leader worth killing.",
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
    key: "setup",
    title: "SETUP & COMMANDS",
    icon: "fa-solid fa-screwdriver-wrench",
    accent: "sky",
    image: FeatureArt.setup,
    description:
      "The whole first evening in order, then the command reference: who may run what, what needs a player, and what to do when nothing spawns.",
    button: "Setup",
  },
  {
    key: "api",
    title: "DEVELOPER API",
    icon: "fa-solid fa-code",
    accent: "purple",
    image: FeatureArt.api,
    description:
      "It is closed source, so this is the contract instead: a published api jar, four views, ten queries and eleven events, and nothing in it that can move under you.",
    button: "Dev API",
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
    note: "Hand out an egg, or place a spawner and leave it there. It does not need a vanilla spawner under it.",
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

/**
 * The five anchor modes a raid can use, from documents/commands.md.
 *
 * This list is on the page because the anchor is the single decision that
 * decides what kind of event a raid is, and four of the five did not exist in
 * the old plugin at all.
 */
export const RaidAnchors = [
  {
    mode: "PLAYERS",
    accent: "slate",
    note: "Around whoever is online, wherever they are. The oldest behaviour, and the only one the old plugin had.",
  },
  {
    mode: "GLOBAL",
    accent: "purple",
    note: "Everywhere at once. No defender, no participation radius, everybody on the server is in it. World Infestation is the shipped raid built on it.",
  },
  {
    mode: "WORLD_SPAWN",
    accent: "sky",
    note: "At the spawn point of a named world. The raid everybody knows where to find.",
  },
  {
    mode: "LOCATION",
    accent: "emerald",
    note: "One fixed point, written world,x,y,z. A place on your map that gets attacked.",
  },
  {
    mode: "PLAYER",
    accent: "rose",
    note: "Pinned to the ground under one player, picked when the raid starts. Defend your base. It does not move after that, which is the point.",
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
      "Drop CE3 treasures by rarity, or specific enchantment books, straight off a mob, from the 1.0 release. The release candidates read and roll those entries and then drop nothing, because asking CE3 for one item by name was not possible until CE3 1.7.0 added the call",
      "Pay kill rewards in RACO, drawn out of CE3's own capped supply rather than minted",
      "CE3 protected boundaries keep Epic Mobs out of your spawn and your builds",
      "One honest limit while it is a release candidate: a mob's CE3 enchantments deal their damage through CE3's own magic damage path rather than each behaving individually. Bleed hurts, but it does not bleed. The entry point that fixes it shipped in CE3 1.7.0, and this side calls it in the 1.0 release, so an RC build behaves the same whichever CE3 is underneath it",
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
      "33 placeholders: live mob counts, the boss and its phase, raid state, dimension and time left, the player's kills, codex progress, companion and level, the arena they are standing in, and their personal best against a named boss",
      "Every raid placeholder answers about the raid the viewing player is actually in, so a scoreboard in the Nether reads the fight in front of them rather than one in another dimension",
      "Registered reflectively, so PlaceholderAPI stays optional",
    ],
  },
];

/**
 * The Lite and Full split. Every row here has to match
 * documents/lite-features/1.0-limitations.md in the plugin repo, which is the
 * authority, and the constants in EditionPolicy.java, which is what runs.
 *
 * The first row is the one that changed for RC1 and it is the one worth
 * reading twice: Lite used to allow ten mob definitions in total, which meant
 * a Lite owner's first act was deleting most of what the plugin came with. The
 * twenty built-in mobs are now exempt from the ceiling, and the other half of
 * that bargain is that Lite cannot delete them.
 */
export const EditionMatrix = [
  {
    feature: "Mob definitions",
    lite: "20 built in, plus 10 of your own",
    full: "Unlimited",
  },
  { feature: "Deleting the built-in mobs", lite: false, full: true },
  { feature: "Abilities per mob", lite: "2, built-in only", full: "Unlimited" },
  { feature: "Custom ability authoring", lite: false, full: true },
  { feature: "Boss bars", lite: true, full: true },
  { feature: "Boss phases", lite: false, full: true },
  { feature: "Companions, mounts, escorts", lite: false, full: true },
  { feature: "Companion wheel and tokens", lite: false, full: true },
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
  {
    feature: "Raid place, waves, time limit, prizes",
    lite: true,
    full: true,
  },
  { feature: "Raid boss wave", lite: false, full: true },
  { feature: "Raid wave that spawns a pack", lite: false, full: true },
  { feature: "Raid scheduling windows", lite: false, full: true },
  { feature: "Raid dimension and day-night gate", lite: true, full: true },
  {
    feature: "Nether and End raids, and the 20 mobs in them",
    lite: false,
    full: true,
  },
  { feature: "Per-wave delay: and boss:", lite: true, full: true },
  { feature: "Packs, leaders, formations", lite: false, full: true },
  { feature: "Arenas and waves", lite: false, full: true },
  { feature: "Spawn triggers", lite: "3", full: "Unlimited" },
  { feature: "Player-count scaling", lite: false, full: true },
  { feature: "Mob codex", lite: false, full: true },
  { feature: "Kill counts and boss best times", lite: true, full: true },
  { feature: "Admin GUI editor, mobs and raids", lite: false, full: true },
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
    body: "Go over a limit and the extra entries are skipped with a warning naming each one. A file written on the full build loads on Lite with the full-build parts reported as limits, not as errors, and it is never rewritten.",
  },
  {
    title: "IT WILL NOT EAT YOUR DATA",
    accent: "amber",
    icon: "fa-solid fa-hard-drive",
    body: "Move from the full version down to this one and every file stays intact. Move back up and you get everything back, including every kill your players already made, because the codex counters are recorded in both builds.",
  },
  {
    title: "IT WILL NOT BOTHER YOUR PLAYERS",
    accent: "lime",
    icon: "fa-solid fa-user-shield",
    body: "There is one support prompt and only server operators ever see it. Non-ops never get anything.",
  },
];

/**
 * The plugin's commands, from documents/commands.md.
 *
 * `lite: false` means the full build only. `playerOnly` means the console
 * cannot run it, which is always because the command needs either a location
 * or an inventory and the console has neither.
 */
export const CommandList = [
  {
    command: "/ep info",
    description:
      "The plugin's state on one screen: version, whether a newer one is published, edition and its limits, what loaded, how many Epic Mobs are alive, which integrations resolved and what the running raid is doing. The first thing to run when something looks wrong, and the first thing to paste into a support thread.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep info [mob]",
    description:
      "One mob's stat sheet: health, damage, resistance, tier, abilities, where it spawns, what it drops and what it pays. A player sees the public half, an admin sees everything.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep list",
    description: "Every defined mob, raid, pack and arena, by name.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep help",
    description:
      "Only the lines you may actually run, so a player without the admin permission sees five rather than forty.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ep codex",
    description:
      "Every Epic Mob you have personally killed. The entry unlocks on your first kill, its abilities and phases at codex.abilities-at, its drops at codex.loot-at, and a boss entry carries your best fight against it.",
    requireOp: false,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep companion",
    description:
      "The command wheel for your companion: follow, stay, attack and passive. Claim one with /ep companion claim next to a mob whose file allows it, or with a companion token.",
    requireOp: false,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep companion token [mob]",
    description:
      "A token that claims that mob as a companion. This is the one to hand out as a reward or sell in a shop.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep wallet [currency]",
    description:
      "Choose which currency your kill rewards are paid in, when a mob offers more than one and the payout mode is PLAYER_CHOICE. Run it bare to see the options. Your choice survives a restart.",
    requireOp: false,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep summon [mob] [world x y z]",
    description:
      "Spawn one, next to you or at a point you name. It bypasses the mob's own spawn conditions and its chance roll, because an admin asking for a mob has decided it belongs there. Protection layers still apply.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep spawneggs",
    description:
      "The spawn egg menu, one egg per defined mob. Take one, right click the ground. The eggs work in any game mode and can be given to anybody.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep spawners",
    description:
      "The spawner menu. Place one and it spawns that mob on its own interval. A player-placed Epic Mobs spawner does not need a vanilla spawner under it.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep create mob",
    description:
      "The chat wizard. Fourteen questions answered in chat. Slower than the editor, but it is in both builds and it works over RCON.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep create raid [name] [goal] [mob,mob]",
    description: "Define a raid: its place, its waves, its kill goal and its boss.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep create trigger [delay] [radius] [mob]",
    description:
      "A timed spawn point at your feet. Every delay it spawns that mob within that radius, and only while a player is close enough to see it. The lightweight alternative to an arena. Lite allows three.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep create remove_trigger [mob]",
    description: "Delete the trigger for that mob.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep editor [mob]",
    description:
      "The mob editor. A searchable list, a live preview, click-to-adjust stats, a real inventory you drop equipment into, plus Test spawn, Duplicate and Save. It shows every loader warning against the draft while you are looking at it, and carries blocks it has no page for through untouched.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep editor raid [raid]",
    description:
      "The raid editor, the same shape as the mob editor: goal and wave split, the anchor with a Set to where I am standing button plus the dimension and whether it waits for day or night, the waves and their mobs, the fallback pool, the boss and the three prize tiers. Test start saves and runs it.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep modify edit [mob]",
    description: "Reopen the chat wizard on an existing mob.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ep modify delete [mob]",
    description:
      "Delete a mob definition file. On Lite this refuses for the twenty built-in mobs: they do not count against your ten, and the other half of that bargain is that they stay.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep raid list",
    description:
      "Every defined raid, with its kill goal, where it happens, which dimension it belongs to, whether it waits for day or night, its time limit and its boss.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep raid start [name]",
    description:
      "Start one. With more than one raid defined, name the one you want: running it bare prints the list rather than picking at random. It runs on its own dimension's scheduler, so a Nether raid is not refused because the overworld is mid-siege, and it ignores time-of-day the same way it ignores the chance roll: somebody testing a night raid at noon is testing the raid. A raid needs at least one player in its dimension to do anything at all.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep raid stop",
    description:
      "End every running raid and remove its mobs. Nothing is paid out.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep arena pos1 | pos2",
    description:
      "Mark the two opposite corners of an arena where you are standing. Do not write the coordinates by hand: the Y range is what people get wrong, and a region that does not cover the block players stand on never spawns anything.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep arena create [name]",
    description:
      "Write arenas/[name].yml from the two corners you marked, with your position as the entry point, a party size of 1 to 4 and two example waves, so it is runnable immediately.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep arena info [name]",
    description:
      "Its region, party size, waves, lockout and prizes, and whether you are currently standing inside it. That last line is the one to check first when an arena will not start.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep arena list | start | stop | reset | delete",
    description:
      "Drive an arena by hand. Start skips the minimum party size and clears the lockout, stop and reset both end a run and clear its mobs, and delete refuses while that arena is running.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep arena entry [name]",
    description:
      "Set where a finished or wiped party is put, to wherever you are standing.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ep pack list",
    description:
      "Every defined pack: its leader, its members, its formation and what happens when the leader dies.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep pack spawn [name] [world x y z]",
    description:
      "Spawn a whole pack, here or at a point. The leader is placed first and the members form up around it.",
    requireOp: true,
    lite: false,
  },
  {
    command: "/ep timings [reset]",
    description:
      "Where the plugin's tick time went, broken down by subsystem. Reset clears the counters so you can measure one thing.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep debug [category]",
    description:
      "Toggle one debug category: spawn, combat, loot, raid, integration or performance. /ep debug spawn prints the reason every single spawn attempt was refused, which is almost always the answer.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep reload",
    description:
      "Reload config.yml, Lang.yml, abilities.yml and every mob, raid, pack and arena file, then report what changed and anything wrong with it. Nothing caches a config value across ticks, so a reload really does take effect everywhere.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ep clear",
    description:
      "Remove every live Epic Mob from the world. It does not touch vanilla mobs and it deletes no definitions.",
    requireOp: true,
    lite: true,
  },
];

/**
 * Permission nodes, from the plugin's own plugin.yml by way of
 * documents/commands.md.
 *
 * There are five, and only the first is an administrative one. The other four
 * default to everyone on purpose: a player looking up a mob they just fought,
 * or choosing which currency their kills pay out in, is not an administrative
 * act, and a server that disagrees can negate them.
 */
export const Permissions = [
  {
    node: "epicmobs.epicmob",
    grants:
      "Every admin command: creating, editing and deleting mobs, raids, arenas, packs and triggers, summoning, the editors, reload, clear, debug and timings. This is the one that matters.",
    fallback: "op",
  },
  {
    node: "epicmobs.info",
    grants: "/ep info, /ep info on a mob, and /ep list.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.codex",
    grants: "Open the personal mob codex. Full build only.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.companion",
    grants: "Claim a companion and open the command wheel. Full build only.",
    fallback: "everyone",
  },
  {
    node: "epicmobs.wallet",
    grants:
      "Choose which currency kill rewards are paid in. Full build only.",
    fallback: "everyone",
  },
];

/** The files the plugin writes, and what each is for. */
export const FileLayout = [
  {
    path: "config.yml",
    accent: "lime",
    note: "Every number the plugin uses. Spawn rates, intervals, ranges, drop chances, ability radii, the raid tier table, the raid wave pacing, the despawn sweep.",
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
    note: "One readable file per mob, twenty of them written on the first start, forty on the full build. Edit one in a text editor, share it, or put it in git.",
  },
  {
    path: "raids/",
    accent: "amber",
    note: "One file per raid definition. World Infestation ships in here on both builds; the full build adds the Hollow Siege, the Nether Legion and the End Incursion.",
  },
  {
    path: "packs/  arenas/",
    accent: "emerald",
    note: "Pack and arena definitions, one file each. Full build only.",
  },
  {
    path: "data/",
    accent: "slate",
    note: "What the server made rather than what you wrote: placed spawners, mobs waiting on a chunk, and per-player wallet, codex and companion state in players.yml.",
  },
];

/** The first run, in order, for somebody who has just downloaded the jar. */
export const SetupSteps = [
  {
    n: "1",
    title: "DROP THE JAR IN",
    body: "Stop the server, put the jar in the plugins folder, start it again. There is nothing to install alongside it. Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI are all optional and each is detected only if it happens to be there. The plugins/EpicMobsRework folder is written on that first start, with twenty mobs, the World Infestation raid, a pack and an arena already in it, and forty mobs and four raids on the full build. Upgrading from an older build? Back the folder up first. Your config and your raid files are never overwritten, and new built-in content is written once, ever, so what you deleted stays deleted.",
  },
  {
    n: "2",
    title: "CHECK WHICH JAR YOU HAVE",
    cmd: "/ep info",
    body: "The console banner prints an Edition line on boot, and /ep info prints the same in game along with every active limit and which integrations hooked. The two jars look identical in the plugins folder apart from the file name, so check this before you spend an evening wondering why a command is missing.",
  },
  {
    n: "3",
    title: "SEE WHAT YOU GOT",
    cmd: "/ep list",
    body: "Twenty mobs across four lines: the Hollow siege, the frost wilds, the desert, and the five infested mobs the World Infestation raid is made of. Everything is balanced on an iron-armour baseline, so a player in full iron with an iron sword beats a tier one to three mob one on one with effort, and tier four upward wants diamond, potions or a group.",
  },
  {
    n: "4",
    title: "PICK YOUR WORLDS",
    cmd: "general.worlds",
    body: "One line in config.yml. Name the worlds the plugin is allowed to act in, or leave the list empty to run everywhere. A fresh install lists world, world_nether and world_the_end, because raids can happen in the Nether and the End and a raid whose dimension is not on this list can never start. An upgrade keeps whatever its own config.yml had, and the boot summary names the line to edit. Do this before anything spawns, not after.",
  },
  {
    n: "5",
    title: "LOOK AT ONE",
    cmd: "/ep summon Frost Wolf",
    body: "Spawn it next to you and fight it, then open /ep spawneggs and hand yourself an egg for the rest. This is the loop: summon, watch, change a number in the file, /ep reload, summon again. You are not waiting on natural spawning to find out whether a mob is any good.",
  },
  {
    n: "6",
    title: "BUILD ONE OF YOUR OWN",
    cmd: "/ep create mob",
    body: "The chat wizard walks you through fourteen questions: entity, name, tier, health, damage, resistance, gear, abilities, loot and where it belongs. On the full build /ep editor does the same thing as a GUI with a test button. Either way it saves out to mobs/ as a file you can open, and copying an existing file is a perfectly good third way.",
  },
  {
    n: "7",
    title: "TURN SPAWNING ON",
    cmd: "spawning.natural",
    body: "Once a mob reads the way you want, give it spawn rules and let the world do the rest. Start with a low chance and watch /ep timings for a few minutes. The spawn budget stops it running away, but the budget is a ceiling, not a plan.",
  },
  {
    n: "8",
    title: "RUN A RAID BEFORE ANYONE ELSE IS ON",
    cmd: "raids.ignore-min-players: true",
    body: "Set that, /ep reload, then /ep raid start World Infestation. That is the raid both editions ship. It starts with whoever is online, and a command start ignores time-of-day the same way it ignores the chance roll, so you do not have to wait for dusk. /ep info says min players ignored (testing) the whole time it is on, so you cannot forget you left it there. Turn it back off before the server opens.",
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
    cmd: "/ep summon Alpha Frost Wolf",
    body: "Spawn what shipped, or what you built. Hit it and watch the health display, then let it hit you. If the numbers feel wrong, change them in mobs/<name>.yml and /ep reload rather than rebuilding it.",
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
    cmd: "/ep summon Crypt Warden",
    body: "A boss carries a bar every player online can see and announces itself. On the full build add phase thresholds and watch the bar change colour as it drops. Set the thresholds close together while testing so you do not fight it for ten minutes.",
  },
  {
    name: "A RAID",
    icon: "fa-solid fa-tower-observation",
    accent: "amber",
    cmd: "/ep raid start World Infestation",
    body: "Set raids.ignore-min-players: true first. Watch the wave counter: a wave is a share of the kill goal, so wave two should not begin until the first share is dead. Each wave arrives from its own side and the announcement says which way to look. On the full build, /ep raid start The Nether Legion with nobody in the Nether starts it with its clock paused, and /ep info says so until somebody walks through a portal.",
  },
  {
    name: "AN ARENA",
    icon: "fa-solid fa-shield-halved",
    accent: "sky",
    cmd: "/ep arena pos1 → pos2 → create",
    body: "Build a room, mark the two opposite corners, name it, then stand in it. If nothing spawns, /ep arena info <name> tells you whether you are actually inside the region. Full build only.",
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
    accent: "lime",
    cmd: "/ep timings",
    body: "Run this after ten minutes of spawning, not before. It reports time spent in spawn searches, ability ticks and event handlers. If spawn search is climbing, lower spawn-search-budget-ms rather than turning spawning off.",
  },
];

/**
 * The four questions that account for most of what goes wrong on a first
 * evening, with the command that answers each one.
 *
 * From the "When something does not work" section of documents/commands.md.
 * The whole point of the list is that three of the four are answered by a
 * command rather than by a support thread.
 */
export const Troubleshooting = [
  {
    symptom: "Nothing spawns",
    accent: "rose",
    cmd: "/ep debug spawn",
    body: "Then wait. It prints the reason for every single refusal. The usual answers are a protection layer, the world not being listed in general.worlds, or a spawn condition that cannot be met where you are standing.",
  },
  {
    symptom: "A raid is running but nothing appears",
    accent: "amber",
    cmd: "/ep debug spawn",
    body: "Same command. A raid also says so in the console after three placements that put nothing down, and names the likely causes. That log line exists because this failure used to be completely silent.",
  },
  {
    symptom: "An arena says standing: 0 while you are in it",
    accent: "sky",
    cmd: "/ep arena info [name]",
    body: "It will tell you whether you are inside the region. If it says outside, the region's Y range does not cover the block you are on. Re-mark it with /ep arena pos1 and pos2 rather than editing the numbers.",
  },
  {
    symptom: "A boss has less health than its file says",
    accent: "purple",
    cmd: "server limit, not a bug",
    body: "The server caps maximum health at 2048. A file asking for more gets 2048, and the plugin says so on load. Use resistance rather than a bigger health number if you want a longer fight.",
  },
  {
    symptom: "Something says it is Premium",
    accent: "emerald",
    cmd: "/ep info",
    body: "Lite reports these as limits rather than errors, naming the file and the block, and it never changes your files. A file written on the full build loads on Lite with the full-build parts ignored, and gets them back on upgrade.",
  },
];

/**
 * The developer API, from documents/api/developer-api-guide.md.
 *
 * This section is longer than it would be for an open source plugin, and
 * deliberately so. Epic Mobs Rework is closed source: nobody can read the
 * implementation to find out what a call does or whether it is safe to hold
 * onto something, so the page has to say it. Every rule below is one that
 * cannot be discovered any other way.
 */
export const DeveloperApi = {
  artifact: "EpicMobsRework-api.jar",
  packageName: "me.jaymar921.epicmobs.api",
  eventPackage: "me.jaymar921.epicmobs.api.event",
  guide:
    "The full guide ships in the plugin's documents folder as developer-api-guide.md.",

  /** Why there is an API at all when the source is not published. */
  premise: [
    "The plugin is closed source. That is a decision about the implementation, not about whether other plugins can build on it, and those two things get confused often enough to be worth separating on this page.",
    "What is published instead is a contract. me.jaymar921.epicmobs.api is a package of interfaces, and nothing in it names a class outside it apart from Bukkit and the JDK. It ships as its own jar, EpicMobsRework-api.jar, attached to every release, so you compile against a handful of interfaces rather than against the plugin.",
    "That constraint is enforced by the build rather than by discipline: the api artifact is assembled from that package alone, so the moment an API class reaches for something internal, the artifact stops compiling. A consumer's build breaks at the point the contract would have widened, instead of six months later when the internal thing moves.",
    "The practical consequence for you is the one worth stating plainly. Nothing you compile against here can be refactored out from under you by a plugin update, because the plugin cannot change these shapes without bumping apiVersion() and saying so.",
  ],

  /** The four things you can hold, and how long each is good for. */
  views: [
    {
      name: "EpicMobsAPI",
      accent: "purple",
      what: "The entry point. Resolve it once in onEnable and keep it.",
      lifetime: "The whole session",
    },
    {
      name: "EpicMobHandle",
      accent: "ember",
      what: "One mob in the world. A live view, not a snapshot: health() answers what its health is when you ask.",
      lifetime: "Safe to keep. It keeps answering after the mob dies, with alive() false",
    },
    {
      name: "EpicMobDefinitionView",
      accent: "amber",
      what: "One mob file's numbers.",
      lifetime: "Do not cache across /ep reload. A reload builds new definitions",
    },
    {
      name: "RaidView",
      accent: "rose",
      what: "The running raid, live.",
      lifetime: "Valid while that raid is running",
    },
  ],

  /** Ten queries, grouped the way you would actually reach for them. */
  queries: [
    {
      group: "Mobs in the world",
      accent: "ember",
      calls: [
        "api.isEpicMob(entity): one hash lookup, safe in a hot listener",
        "api.getEpicMob(entity): Optional<EpicMobHandle>",
        "api.getEpicMobs(): every live Epic Mob",
        "api.getEpicMobs(\"frost wolf\"): every live one of that definition",
      ],
    },
    {
      group: "Definitions",
      accent: "amber",
      calls: [
        "api.getDefinitions(): every loaded mob file",
        "api.getDefinition(\"Frost Wolf\"): one of them",
      ],
    },
    {
      group: "Events in progress",
      accent: "rose",
      calls: [
        "api.getActiveRaid(): Optional<RaidView>",
        "api.getRunningArenas(): the arena names currently running",
      ],
    },
    {
      group: "Player records",
      accent: "emerald",
      calls: [
        "api.getKillCount(uuid, \"crypt warden\")",
        "api.getDiscoveredCount(uuid): how much of the codex they have",
      ],
    },
  ],

  /** Eleven events, all on the main thread. */
  events: [
    { name: "EpicMobPreSpawnEvent", cancellable: true, when: "Before the entity exists. The location is mutable, so you can move a spawn rather than refuse it" },
    { name: "EpicMobSpawnEvent", cancellable: false, when: "After it is tagged, equipped and registered" },
    { name: "EpicMobDamageEvent", cancellable: true, when: "After resistance, before the pool moves. The amount is the amount that will really be dealt" },
    { name: "EpicMobDeathEvent", cancellable: false, when: "After the registry, before loot and rewards" },
    { name: "EpicMobAbilityEvent", cancellable: true, when: "After the telegraph, with the final target list already filtered by faction and allies" },
    { name: "EpicMobLootDropEvent", cancellable: true, when: "After the roll, before it hits the ground. The list is live and it is everything the mob will drop" },
    { name: "RaidStartEvent", cancellable: false, when: "After the bar exists" },
    { name: "RaidWaveEvent", cancellable: false, when: "After a wave's mobs are in the world" },
    { name: "RaidEndEvent", cancellable: false, when: "Before the prizes are paid" },
    { name: "CompanionSummonEvent", cancellable: false, when: "After a companion is bound and out" },
    { name: "CompanionDeathEvent", cancellable: false, when: "Alongside EpicMobDeathEvent" },
  ],

  /** The four mutating calls, and what Lite does with them. */
  mutation: [
    "api.spawn(\"crypt warden\", location): bypasses the spawn guard, the same way /ep summon does",
    "api.remove(entity): takes it out of the world without killing it: no death event, no loot, no rewards, no raid credit",
    "api.startRaid(\"Hollow Siege\")",
    "api.stopRaid()",
  ],

  /**
   * The rules that cannot be worked out by reading the source, because the
   * source is not there to read. This is the part of the section that earns
   * its place.
   */
  rules: [
    {
      title: "MAIN THREAD ONLY",
      accent: "rose",
      body: "Epic Mobs holds no locks and does no work off the server thread, which is what lets the whole plugin run on one repeating task. Calling in from an async task is undefined and will eventually corrupt the registry. There is no lock to take that would make it safe.",
    },
    {
      title: "RESOLVE IN onEnable, NOT IN A STATIC BLOCK",
      accent: "amber",
      body: "The provider is installed during Epic Mobs' own enable. Use EpicMobsProvider.find() for an Optional if your plugin works either way, or get() to throw if it genuinely does not: a silent null surfaces a hundred lines later as something else.",
    },
    {
      title: "DO NOT CACHE ACROSS A RELOAD",
      accent: "sky",
      body: "/ep reload rebuilds every definition and library. Handles to live mobs stay valid; views of definitions describe the old ones and will quietly disagree with the server.",
    },
    {
      title: "CANCEL, DO NOT ZERO",
      accent: "purple",
      body: "To stop a hit, cancel the damage event rather than setting the amount to zero. A zero damage event still sets the victim's last attacker, and the mob will retaliate against it.",
    },
    {
      title: "A THROWN HANDLER IS CAUGHT, NOT FREE",
      accent: "ember",
      body: "Every event the plugin fires is wrapped and what threw is logged, so a badly written listener cannot take the plugin down. It still costs that one death, spawn or drop whatever your listener was going to do.",
    },
    {
      title: "FOUR CALLS ARE PREMIUM",
      accent: "emerald",
      body: "spawn, remove, startRaid and stopRaid return empty or false on Lite and log once per session naming the edition. Nothing throws and nothing is silent. Check api.canMutate() if you would rather ask than be refused. Every query and every event works on Lite, so you can develop and test against the free build.",
    },
    {
      title: "TWO THINGS ARE DELIBERATELY NOT EXPOSED",
      accent: "slate",
      body: "The plugin's own EpicMob and MobDefinition, because they reference the loader, the phase engine, the ability clock and the boss bar, and anything compiled against them would be pinned to a shape that changes every release. And the loot table, because it is the one part of a definition an owner has a reason to keep from their players, and an API that hands it to every plugin on the server hands it to the first one that prints it in chat.",
    },
    {
      title: "VERSIONS MOVE FOR DIFFERENT REASONS",
      accent: "lime",
      body: "api.version() is the plugin version and moves for every release. api.apiVersion() moves only when something in the api package changes shape. Branch on the second one.",
    },
  ],
};

/**
 * What shipping 1.0-RC1 actually means, and what it does not.
 *
 * This replaces the old BuildProgress list, which tracked a plugin that had
 * not shipped. The states are the same three the page already knows how to
 * draw, so nothing in PROGRESS_STYLE has to change.
 */
export const ReleaseState = [
  {
    area: "Every feature on the 1.0 list",
    state: "done",
    note: "Abilities, boss phases, companions and mounts, loot tables, the spawn rule engine, all five integrations, layered protection, the admin GUI, packs, arenas, the raid rework, player-count scaling, the developer API, PlaceholderAPI, the mob codex, full config coverage and diagnostics. Nothing on the list is deferred.",
  },
  {
    area: "Content out of the box",
    state: "done",
    note: "Twenty mobs on an iron-armour baseline across four lines, the World Infestation raid, a pack and an arena, all written on the first start. The full build adds twenty more mobs and three more raids, the Hollow Siege, the Nether Legion and the End Incursion, and since RC2 new built-in content reaches an existing install rather than only a fresh one. Seven shipped before RC1 and they were tuned for a different game.",
  },
  {
    area: "Both editions, published",
    state: "done",
    note: "Lite and Full are on Spigot as separate listings. The split is at compile time: a full-build class is absent from the Lite jar rather than switched off in it, and the release workflow fails rather than shipping if one leaks.",
  },
  {
    area: "Tests, and the compatibility check",
    state: "done",
    note: "366 tests in the Premium build and 341 in the Lite one, where the old plugin had none, plus a bytecode check that every Bukkit call the jar makes exists on 1.16.5 as well as on 26.2. That check caught a break neither the tests nor a clean boot showed, and every regression test in RC2 was confirmed to fail with its fix reverted.",
  },
  {
    area: "Servers that are not the author's",
    state: "in progress",
    note: "This is the whole reason the release candidates exist. Two rounds of playing RC1 found bugs that nothing else was going to, and a third round, playing the new Nether raid for RC2, found four more in an evening. Every round found the same kind: a subsystem reporting progress it was not making. The next round wants other people's servers.",
  },
  {
    area: "Three paths nobody has finished",
    state: "in progress",
    note: "A raid fought by more than one person, an arena run through to its prizes, and a companion claimed, levelled and killed. Each has been started and none has been seen through, and all three want somebody who is not the author.",
  },
  {
    area: "1.0 proper",
    state: "not yet",
    note: "There is no date and there will not be a guess at one. 1.0 is what the release candidate becomes when the reports stop turning things up, and the version number stops moving on the day that is true rather than on a day picked in advance.",
  },
];

/**
 * The things the release candidate most needs from somebody else's server, in
 * the order they are worth. Straight out of releases/1.0-RC1-release.md, and
 * RC2 closes with the same three, because none of them has happened yet.
 */
export const TestingAsks = [
  {
    title: "A RAID WITH MORE THAN ONE PERSON IN IT",
    accent: "rose",
    icon: "fa-solid fa-users",
    body: "The server-wide call for help, somebody running in from outside and finding they are in the raid, their kills counting, the leaderboard, and the payout at the end. Every part of that needs two players and has never had them. One player can check everything except the half that makes it an event.",
  },
  {
    title: "AN ARENA, FINISHED",
    accent: "sky",
    icon: "fa-solid fa-shield-halved",
    body: "Build a room, mark it with pos1 and pos2, create it, and stand in it with a friend. A wave landing, the sidebar drawing and then clearing, after_previous_cleared firing promptly, the lockout applying, a wipe resetting the room, and the prizes paying. Everything up to the first spawn is known to work and everything after it is still only reasoned about.",
  },
  {
    title: "A COMPANION CLAIMED, LEVELLED AND KILLED",
    accent: "emerald",
    icon: "fa-solid fa-paw",
    body: "Mounting and the command wheel have been driven. Claiming, following, levelling and dying have not. Worth watching for specifically: a companion catching up after a fall rather than standing where it was left, and a companion refusing to hit its owner or a CE3 ally.",
  },
  {
    title: "AN OLDER MINECRAFT VERSION",
    accent: "amber",
    icon: "fa-solid fa-clock-rotate-left",
    body: "It is built for 1.16.5 upward and every Bukkit call in the jar is checked against the 1.16.5 API, but 26.2 and 1.21.5 are the only two versions it has actually run on. A boot on anything older than that is worth reporting even when it works.",
  },
];

/**
 * What the release candidate does not do. On the page, next to the download
 * button, rather than three clicks into a changelog.
 *
 * Only one of these cannot be fixed in this plugin at all, and saying which is
 * the difference between a gap and an excuse. The two CE3 ones are waiting on
 * this side now rather than on CE3: CE3 1.7.0 shipped what they were missing.
 * RC1 listed a fifth, new built-in content never reaching an existing
 * install, and RC2 closed it with installed-content.yml, so it is in the
 * changelog now rather than here.
 */
export const KnownGaps = [
  {
    title: "A restart ends a running event",
    accent: "amber",
    ours: true,
    body: "Pack membership, a running raid and a running arena do not survive a server restart. A raid's mobs are left standing in the world as ordinary Epic Mobs; an arena takes its own with it. This is a deliberate trade against keeping a second persistence format in step with the first, and it is the first thing to revisit if anyone reports it.",
  },
  {
    title: "CE3 enchantments on a mob deal damage but do not each behave, until 1.0",
    accent: "lime",
    ours: true,
    body: "A mob's Custom Enchantments 3 enchantments are read correctly and routed through CE3's own magic damage path, so Bleed on a mob's sword hurts, but it does not bleed. Epic Mobs will not reimplement CE3's effects: two implementations of Bleed drift apart within one release of either plugin, and the wrong one is the one players report. What was missing was an entry point on the CE3 side, and CE3 1.7.0 shipped it. Nothing has changed on this side yet, so RC2 behaves exactly as described here whichever CE3 version is under it, and the calls go in for the 1.0 release.",
  },
  {
    title: "CE3 treasures and books in a loot table drop nothing, until 1.0",
    accent: "amber",
    ours: true,
    body: "A ce3_treasure or ce3_book entry is read, validated and rolled like any other entry, and then produces no item. /ep debug loot says so rather than leaving you to work it out from an empty inventory. It is the same missing entry point as the one above: there was no way to ask CE3 for one treasure or one book by name until CE3 1.7.0 added it. Leave those entries in your tables, because the format is not changing, but do not count on them before 1.0. A book from a mob will be the same book the shop sells, custom model data and all.",
  },
  {
    title: "Biome #tag spawn conditions parse but cannot work",
    accent: "sky",
    ours: false,
    body: "A spawn rule may say #is_cold and the plugin carries it, but Spigot exposes no biome tag accessor at all, so the condition is ignored. /ep info reports the capability as unavailable rather than letting you find out from an empty tundra. Nothing to do on this side until Spigot adds one.",
  },
];

/**
 * The real screenshots, with what each one is actually showing.
 *
 * Everything else illustrating this page is drawn. These are not, and the
 * captions say what is on screen rather than what the feature is for, because
 * a caption that reads like marketing next to a real screenshot makes the
 * screenshot look staged.
 */
export const Screenshots = [
  {
    key: "frost-wolf",
    src: Screens.frostWolf,
    accent: "sky",
    title: "A MOB, SUMMONED",
    caption:
      "/ep summon on the Alpha Frost Wolf. The name plate, the frost particle trail from its cosmetics block, and the health readout on the action bar under it.",
    wide: true,
  },
  {
    key: "crypt-warden",
    src: Screens.cryptWarden,
    accent: "rose",
    title: "A BOSS, AND WHAT IT BROUGHT",
    caption:
      "The Crypt Warden taken out of the spawn egg menu, with its boss bar across the top of the screen, two Crypt Servants it summoned, and the announcement in chat naming its power and where it woke up.",
    wide: true,
  },
  {
    key: "infested-raid",
    src: Screens.infestedRaid,
    accent: "purple",
    title: "A RAID WAVE, ARRIVING",
    caption:
      "World Infestation in progress. An Infested Broodmother and two Infested Crawlers arriving as a cluster rather than one at a time hundreds of blocks apart, which is the change that made defending a base possible.",
    wide: true,
  },
  {
    key: "editor-list",
    src: Screens.editorList,
    accent: "ember",
    title: "THE MOB EDITOR",
    caption:
      "/ep editor. Every defined mob as its own spawn egg, paged, with the twenty built-in ones in it.",
  },
  {
    key: "editor-mob",
    src: Screens.editorMob,
    accent: "ember",
    title: "EDITING ONE",
    caption:
      "The Infested Broodmother open in the editor: stats, state, equipment, abilities, loot and spawn rules as their own pages, with a live preview and a test spawn.",
  },
  {
    key: "editor-raid-list",
    src: Screens.editorRaidList,
    accent: "amber",
    title: "THE RAID EDITOR",
    caption:
      "/ep editor raid. The tooltip is the whole raid at a glance: 120 kills over four waves, global so everybody defends, a 30 minute limit, and the file it will write.",
  },
  {
    key: "editor-raid-edit",
    src: Screens.editorRaidEdit,
    accent: "amber",
    title: "TEST START",
    caption:
      "Inside a raid. Test start saves the draft and runs the raid on the server immediately, so you find out what you wrote without waiting for a schedule.",
  },
  {
    key: "codex",
    src: Screens.codex,
    accent: "emerald",
    title: "THE CODEX",
    caption:
      "/ep codex, four of twenty discovered. An entry is a silhouette until the player's first kill, and unlocks its abilities and then its drops as the count goes up.",
  },
  {
    key: "spawneggs",
    src: Screens.spawnEggs,
    accent: "lime",
    title: "SPAWN EGGS",
    caption:
      "/ep spawneggs. One egg per defined mob, with its tier, its base entity and its numbers on the tooltip. The eggs work in any game mode and can be handed to anybody.",
  },
  {
    key: "spawners",
    src: Screens.spawners,
    accent: "sky",
    title: "SPAWNER BLOCKS",
    caption:
      "/ep spawners. Place one and it spawns that mob on its own interval. It does not need a vanilla spawner under it.",
  },
  {
    key: "chat-wizard",
    src: Screens.chatWizard,
    accent: "purple",
    title: "THE CHAT WIZARD",
    caption:
      "/ep modify edit on the Alpha Frost Wolf. Fourteen questions in chat, each one saying what a valid answer looks like. It is in both builds and it works over RCON.",
    wide: true,
  },
  {
    key: "help",
    src: Screens.helpCommand,
    accent: "amber",
    title: "THE HELP OUTPUT",
    caption:
      "/ep help prints only the lines you may actually run, so a player without the admin permission sees five rather than forty.",
    wide: true,
  },
];
