/**
 * Everything the Epic Mobs page reads.
 *
 * Epic Mobs was a premium plugin that stopped. The repository is private and
 * there is no public Spigot listing, so this page carries no download link and
 * no source link on purpose: a button that leads to a 404 is worse than no
 * button. Every number, command, enum and dependency below comes out of the
 * plugin's own source and plugin.yml, so the page is a record of what the
 * thing actually was rather than a memory of it.
 *
 * If the repo is ever made public, or a listing goes back up, add `repoLink`
 * or `storeLink` here and the page will grow the button by itself.
 */

import * as FeatureArt from "../../../assets/epic_mobs/features";
import icon from "../../../assets/epic_mobs/logo.png";

export const ProjectInformation = {
  title: "Epic Mobs",
  subtitle: "Build your own mobs, tier them, and raid with them.",
  tagline: "A mob builder that ran for eighteen months and then ran out of evenings.",

  version: "1.4.13",
  versionReleaseDate: "04/17/2023",
  firstCommit: "10/01/2021",
  years: "Oct 2021 - Apr 2023",
  releaseCount: 13,
  supportedVersions: "1.16 - 1.19",
  javaSupport: "Java 15",
  apiVersion: "1.16",
  status: "archived",
  statusLabel: "ABANDONED, WAS PREMIUM",
  /** Sits beside the status label in the hero, so the rebuild is on the first screen. */
  reworkLabel: "REWORK IN DEVELOPMENT",
  wasPremium: true,
  icon,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  /**
   * Deliberately absent: repoLink and storeLink. The source is private and the
   * plugin was never on the public Spigot listing, so there is nothing honest
   * to point at. The page checks for these before drawing any button.
   */

  status_note: {
    headline: "Stopped in April 2023, and not coming back in this form.",
    body: "Epic Mobs was a premium plugin and it worked. Version 1.4.13 went out in April 2023 and that was the last one: a full time job left no evenings for it, so it stopped rather than rotting slowly in public. It is not sold, not supported, and there is no download here. This page is on the site because the work happened, not because you should be looking for the jar.",
    rework: "The idea did not stop, though. Epic Mobs Rework is being built right now, as a rewrite rather than a patch, and it has its own page. There is still no release date for it.",
  },

  successor: {
    headline: "It is being rebuilt, and the rebuild has its own page.",
    body: "This used to say a successor was planned and that there was nothing to show. There is now. Epic Mobs Rework is a rewrite rather than a patch: the same idea, built again for the things that killed this one. It still has no release date, but it has a design, a build, and a page that says what is finished and what is not.",
    href: "/epic-mobs-rework",
    linkLabel: "EPIC MOBS REWORK",
  },

  description:
    "Epic Mobs let a server owner build their own mobs and then do something with them. You picked a vanilla entity, gave it a name, a tier, health, resistance, gear, a drop table and the biomes it belonged in, and the plugin took it from there. No config editing: /ep create walked you through it in chat and a GUI, and the mob was saved out to the plugin's own data files.",
  descriptionMore: [
    "Four environments decided where a mob showed up. SUMMON mobs existed only for raids and for /ep summon. BOSS mobs got a boss bar visible to everyone online. NORMAL_DAY and NORMAL_NIGHT spawned in the overworld on their own schedule. That one field is what separated a boss you fought once from a mob you kept running into.",
    "Raids were built out of the same mobs. A raid was a named list of mobs and a boss, started with /ep raid start and stopped with /ep raid stop, or fired by a trigger. It inherited the idea from Custom Enchantments and then made it configurable, so raid waves and their loot were the server owner's to write rather than the plugin author's.",
    "Around that sat six tiers, five buffs, fourteen particle trails and sixteen area of effect abilities, from plain damage through poison, burn, frostbite, confusion, root, levitate and lightning. Mobs could be handed out as spawn eggs, placed as spawners, gated to a WorldGuard region, and paid out through Vault or Kumandra's Economy on kill. All five soft dependencies were optional, and the plugin ran fine without any of them.",
  ],
};

/** The feature panels, each with its own drawing. */
export const Features = [
  {
    key: "mobs",
    title: "THE MOB BUILDER",
    icon: "fa-solid fa-skull",
    accent: "sky",
    image: FeatureArt.mobs,
    description:
      "Pick an entity, name it, tier it, set its health, gear, drops and biomes. Four environments decide when and where it turns up.",
  },
  {
    key: "raids",
    title: "RAIDS & BOSSES",
    icon: "fa-solid fa-dragon",
    accent: "rose",
    image: FeatureArt.raids,
    description:
      "A raid is a list of your own mobs and a boss. Start it, stop it, or let a trigger fire it. Bosses carry a bar every player online can see.",
  },
  {
    key: "spawners",
    title: "SPAWNERS & LOOT",
    icon: "fa-solid fa-egg",
    accent: "emerald",
    image: FeatureArt.spawners,
    description:
      "Spawn eggs, placeable spawners, shared loot tables and a cash reward on kill. Five optional integrations, none of them required.",
  },
  {
    key: "status",
    title: "WHY IT STOPPED",
    icon: "fa-solid fa-circle-pause",
    accent: "amber",
    image: FeatureArt.status,
    description:
      "Eighteen months, thirteen releases, and then a full time job. What it got to, and where the rework stands now that it is being built.",
  },
];

/** The four environments, from the Environments enum. */
export const Environments = [
  {
    name: "SUMMON",
    accent: "amber",
    icon: "fa-solid fa-hand-sparkles",
    note: "Never spawns on its own. Only /ep summon, or a raid calling for it.",
  },
  {
    name: "BOSS",
    accent: "rose",
    icon: "fa-solid fa-dragon",
    note: "Carries a boss bar showing its health to every player on the server.",
  },
  {
    name: "NORMAL_DAY",
    accent: "sky",
    icon: "fa-solid fa-sun",
    note: "Spawns in the overworld during the day, in the biomes you listed.",
  },
  {
    name: "NORMAL_NIGHT",
    accent: "violet",
    icon: "fa-solid fa-moon",
    note: "The same, after dark.",
  },
];

/** What a mob carried, from MobData. */
export const MobAttributes = [
  { key: "Entity", value: "Any vanilla mob type" },
  { key: "Name", value: "Shown above its head" },
  { key: "Tier", value: "TIER_1 through TIER_6" },
  { key: "Health", value: "Flat value, replaces vanilla" },
  { key: "Resistance", value: "Flat damage reduction" },
  { key: "Equipment", value: "Worn, and dropped if you say so" },
  { key: "Drops", value: "Your own item list" },
  { key: "Effects", value: "Potion effects it keeps" },
  { key: "AreaOfEffects", value: "16 abilities, on a timer" },
  { key: "Biome", value: "Where it is allowed to spawn" },
  { key: "State", value: "NORMAL, or NOAI for a statue" },
  { key: "Eco", value: "Money paid out when it dies" },
];

/** The 16 area of effect abilities, from the AreaOfEffect enum. */
export const AreaOfEffects = [
  { code: "DPPT", effect: "Damage the player", accent: "rose" },
  { code: "DAPT", effect: "Damage every entity nearby", accent: "rose" },
  { code: "PPPT", effect: "Poison the player", accent: "lime" },
  { code: "PAPT", effect: "Poison every entity nearby", accent: "lime" },
  { code: "BPPT", effect: "Set the player alight", accent: "amber" },
  { code: "BAPT", effect: "Set everything nearby alight", accent: "amber" },
  { code: "FPPT", effect: "Frostbite the player", accent: "cyan" },
  { code: "FAPT", effect: "Frostbite everything nearby", accent: "cyan" },
  { code: "CPPT", effect: "Confuse the player", accent: "violet" },
  { code: "RPPT", effect: "Root the player in place", accent: "violet" },
  { code: "SLPPT", effect: "Strike the player with lightning", accent: "sky" },
  { code: "SLAPT", effect: "Strike everything nearby", accent: "sky" },
  { code: "LPPT", effect: "Levitate the player", accent: "teal" },
  { code: "LAPT", effect: "Levitate everything nearby", accent: "teal" },
  { code: "RTPT", effect: "Take one item out of their inventory", accent: "rose" },
  { code: "TRPT", effect: "Teleport the player a short way off", accent: "emerald" },
];

/** The commands it registered, from the command executor. */
export const CommandList = [
  {
    command: "/ep info [mob]",
    description:
      "Shows a mob's attributes. The one command in the plugin any player could run.",
    requireOp: false,
  },
  {
    command: "/ep create mob",
    description:
      "Builds a new mob, guided through chat and a GUI. Name, tier, health, damage, gear, drops and biomes.",
    requireOp: true,
  },
  {
    command: "/ep create raid",
    description: "Builds a raid out of mobs you have already made.",
    requireOp: true,
  },
  {
    command: "/ep create trigger",
    description:
      "Binds a raid to a trigger so something else can start it. /ep create remove_trigger takes one off.",
    requireOp: true,
  },
  {
    command: "/ep modify edit [mob]",
    description: "Changes an existing mob. /ep modify delete removes one.",
    requireOp: true,
  },
  {
    command: "/ep raid start [name]",
    description: "Starts a raid event. /ep raid stop ends one.",
    requireOp: true,
  },
  {
    command: "/ep summon [mob]",
    description: "Spawns a mob whose environment is SUMMON.",
    requireOp: true,
  },
  {
    command: "/ep SpawnEggs",
    description: "Opens the spawn egg screen and hands one out.",
    requireOp: true,
  },
  {
    command: "/ep Spawners",
    description: "Opens the spawner screen. A placed spawner keeps spawning.",
    requireOp: true,
  },
  {
    command: "/ep Reload",
    description: "Rereads the data files without a restart.",
    requireOp: true,
  },
  {
    command: "/ep Clear",
    description: "Clears the Epic Mobs currently in the world.",
    requireOp: true,
  },
];

/** The soft dependencies from plugin.yml. Every one of them optional. */
export const Integrations = [
  {
    name: "Custom Enchantments 3",
    accent: "lime",
    note: "Where the bosses and raids idea came from. Epic Mobs made it configurable and could run alongside it.",
  },
  {
    name: "Kumandra's Economy",
    accent: "emerald",
    note: "Paid the Eco reward out in Kd when a mob died.",
  },
  {
    name: "Vault",
    accent: "amber",
    note: "The same reward, through whatever economy the server already had.",
  },
  {
    name: "WorldGuard",
    accent: "sky",
    note: "Gated where a mob was allowed to spawn, by region.",
  },
  {
    name: "EssentialsX",
    accent: "violet",
    note: "Detected if present. Nothing broke without it.",
  },
];

/** The release history, from the repository's own commit log. */
export const EpicMobs_Logs = [
  {
    update_version: "1.4.13",
    release_date: "04/17/2023",
    changes: [
      {
        update: "The last release",
        sublist: [
          "Nothing has shipped since. The plugin was put down here rather than deprecated, so this build is the one that ran on servers",
        ],
      },
    ],
  },
  {
    update_version: "1.4.12",
    release_date: "01/22/2023",
    changes: [
      {
        update: "Maintenance",
        sublist: ["The second of the two 2023 builds"],
      },
    ],
  },
  {
    update_version: "1.4.11",
    release_date: "01/05/2023",
    changes: [
      {
        update: "Maintenance",
        sublist: ["First build after a six month gap, which was the warning sign"],
      },
    ],
  },
  {
    update_version: "1.4.10",
    release_date: "07/09/2022",
    changes: [
      {
        update: "Maintenance",
        sublist: ["Last release before the pace dropped off"],
      },
    ],
  },
  {
    update_version: "1.4.9",
    release_date: "06/30/2022",
    changes: [
      {
        update: "Maintenance",
        sublist: ["Built against the Spigot 1.19 API"],
      },
    ],
  },
  {
    update_version: "1.4.4 - 1.4.5",
    release_date: "03/20/2022",
    changes: [
      {
        update: "Two builds the same day",
        sublist: ["The usual shape of a fix that needed a second go"],
      },
    ],
  },
  {
    update_version: "1.4.1",
    release_date: "12/01/2021",
    changes: [
      {
        update: "Follow up to 1.4",
        sublist: ["Landed a few days after the 1.4 run"],
      },
    ],
  },
  {
    update_version: "1.4",
    release_date: "11/28/2021",
    changes: [
      {
        update: "The busiest week the plugin had",
        sublist: [
          "Four builds tagged 1.4 between 26 and 28 November 2021",
          "This is where spawners, spawn eggs and the extended loot tables settled into the shape they kept",
        ],
      },
    ],
  },
  {
    update_version: "1.3",
    release_date: "11/23/2021",
    changes: [
      {
        update: "Raids and triggers",
        sublist: ["Raid events became a configurable list rather than a fixed one"],
      },
    ],
  },
  {
    update_version: "1.1",
    release_date: "11/10/2021",
    changes: [
      {
        update: "Three builds across a fortnight",
        sublist: [
          "10, 17 and 21 November 2021",
          "Boss bars, tiers and the area of effect abilities came in through this run",
        ],
      },
    ],
  },
  {
    update_version: "1.0",
    release_date: "11/07/2021",
    changes: [
      {
        update: "First release",
        sublist: [
          "Five weeks after the first commit on 1 October 2021",
          "The mob builder, the four environments, and the chat listener that made /ep create work without config editing",
        ],
      },
    ],
  },
];
