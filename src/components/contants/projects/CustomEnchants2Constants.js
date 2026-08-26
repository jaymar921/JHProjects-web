/**
 * Everything the Custom Enchantments 2 page reads.
 *
 * CE2 is finished and open source. The enchantment count and the command and
 * permission lists come from the plugin's own source and plugin.yml, and the
 * release notes come from the Spigot update history, so the page is a record
 * of what shipped rather than a sales pitch for something you cannot get
 * support for.
 */

import * as FeatureArt from "../../../assets/custom_enchants_2/features";
import icon from "../../../assets/custom_enchants_2/icon.jpg";

export const ProjectInformation = {
  title: "Custom Enchantments 2",
  subtitle: "50+ custom enchants, lucky loots, RPG feels and more, its free!",
  tagline: "The plugin Custom Enchantments 3 grew out of.",

  version: "2.1.7e",
  versionReleaseDate: "07/10/2022",
  discontinued: "12/2021",
  supportedVersions: "1.16 - 1.18",
  enchantCount: 78,
  status: "archived",
  statusLabel: "DISCONTINUED, OPEN SOURCE",
  price: 0,
  free: true,
  icon,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  repoLink: "https://github.com/JnH-Projects/Custom-Enchantments-2",
  spigotLink:
    "https://www.spigotmc.org/resources/%E2%9C%AF-custom-enchantments-3-rpg-%E2%9C%AF-1-16-26-2-%E2%9C%AF.89793",
  successorLink: "/customenchantments3",

  status_note: {
    headline: "Discontinued in December 2021, and open source since.",
    body: "CE2 was put down while Custom Enchantments 3 was being written, and 3 is a different plugin rather than a new version of this one. A few community patches landed after that, the last in July 2022, and then the source went public. It is here because it ran on a lot of servers and because the code is still worth reading, not because you should install it on a new one.",
  },

  description:
    "Custom Enchantments 2 added 78 enchantments to ordinary Minecraft gear, and then kept going: bosses, lucky loot, custom structures, an enchanted tree, an advanced enchanting table and an anvil that combined enchanted items properly. It was the plugin that turned a survival server into something with a bit of RPG in it, and it was free the whole time it was alive.",
  descriptionMore: [
    "The enchantments split across swords, bows, armour, tools and magic. Telepathy dropped what you mined straight into your inventory, LifeSteal fed you back what you dealt, Phoenix brought you back once, Storm called lightning down on anyone not on your ally list, and Second Life did roughly what the name says. Every one of them was a config entry you could turn off.",
    "It sat beside PvPManager and WorldGuard when they were installed and shrugged when they were not, and it loaded before Kumandra's Economy so its shop could use that currency. None of those were required to run it.",
    "This page exists because the plugin is public now. The source is on GitHub, unmaintained, with no support attached. If you want the maintained version of this idea, that is Custom Enchantments 3, which was rebuilt from scratch and shares the same Spigot listing.",
  ],
};

/** The feature panels, each with its own drawing. */
export const Features = [
  {
    key: "enchants",
    title: "78 ENCHANTMENTS",
    icon: "fa-solid fa-wand-sparkles",
    accent: "purple",
    image: FeatureArt.enchants,
    description:
      "Sword, bow, armour, tool and magic enchantments, all applied to ordinary gear, all switchable in the config.",
  },
  {
    key: "rpg",
    title: "THE RPG LAYER",
    icon: "fa-solid fa-dragon",
    accent: "amber",
    image: FeatureArt.rpg,
    description:
      "Bosses and raids, lucky treasure out of broken blocks, a castle structure, an enchanted tree and an advanced enchanting table.",
  },
  {
    key: "opensource",
    title: "OPEN SOURCE NOW",
    icon: "fa-brands fa-github",
    accent: "emerald",
    image: FeatureArt.opensource,
    description:
      "Discontinued in 2021, last patched in 2022, and published so it does not simply vanish. Forks are welcome, support is not offered.",
  },
];

/** A sample of the enchantment list, by category. */
export const EnchantGroups = [
  {
    group: "Sword",
    accent: "rose",
    icon: "fa-solid fa-khanda",
    names: [
      "LifeSteal",
      "Death Angel",
      "Soul Eater",
      "Critical",
      "Bleed",
      "Omnivamp",
      "Sudden Blow",
      "Burning",
    ],
  },
  {
    group: "Bow",
    accent: "cyan",
    icon: "fa-solid fa-bullseye",
    names: [
      "Frost Arrow",
      "Blinding Arrow",
      "Focus Fire",
      "Wind Strike",
      "Implant",
    ],
  },
  {
    group: "Armour",
    accent: "sky",
    icon: "fa-solid fa-shield-halved",
    names: [
      "Phoenix",
      "Second Life",
      "Force Shield",
      "Obsidian Plate",
      "Tank",
      "Guarded",
      "Barrier",
      "Emergency Defence",
    ],
  },
  {
    group: "Tool",
    accent: "emerald",
    icon: "fa-solid fa-gem",
    names: [
      "Telepathy",
      "Auto Smelt",
      "Vein",
      "Deforestation",
      "Miner Radar",
      "Auto Farm",
      "Auto Repair",
      "Lucky Treasure",
    ],
  },
  {
    group: "Magic",
    accent: "violet",
    icon: "fa-solid fa-hat-wizard",
    names: [
      "Storm",
      "Stella",
      "Hail Storm",
      "Light Spirit",
      "Illusion",
      "Grimoire",
      "Freeze",
      "Molten",
    ],
  },
];

/** The commands it registered, from plugin.yml. */
export const CommandList = [
  {
    command: "/ce",
    description:
      "The main command. Gives enchantment books, reloads the config, and opens the rest of the plugin's tooling.",
    requireOp: false,
  },
  {
    command: "/es",
    description:
      "Opens the enchantment shop, where enchants were bought with the server's currency.",
    requireOp: false,
  },
  {
    command: "/ce give [player] [enchant]",
    description: "Hands a player an enchantment book.",
    requireOp: true,
  },
  {
    command: "/ce reload",
    description: "Rereads config.yml without a restart.",
    requireOp: true,
  },
  {
    command: "/ce particle",
    description: "Turns the enchantment particle effects on or off for you.",
    requireOp: false,
  },
  {
    command: "/raid",
    description: "Starts a raid event. /raidstop ends one.",
    requireOp: true,
  },
  {
    command: "/storm_ally [player]",
    description:
      "Adds a player to your Storm ally list, so your lightning does not land on them.",
    requireOp: false,
  },
  {
    command: "/storm_ally_list",
    description: "Shows who is on that list. /remove_storm_ally takes one off.",
    requireOp: false,
  },
];

/** The release history, from the Spigot update posts. */
export const CustomEnchants2_Logs = [
  {
    update_version: "2.1.7e",
    release_date: "07/10/2022",
    changes: [
      {
        update: "Community patch, by Corxl",
        sublist: [
          "Disabling the Tank enchantment now also disables the player health checks that went with it",
          "The last release of CE2. Nothing has shipped since",
        ],
      },
    ],
  },
  {
    update_version: "2.1.7c",
    release_date: "04/24/2022",
    changes: [
      {
        update: "Community patch, by Corxl",
        sublist: [
          "Hearts from Tank are applied properly",
          "The enchantment limit when combining was hardcoded to 8 instead of reading the config value",
          "Combining items in an anvil applied the wrong damage values, which often stripped most of an item's damage and randomised its stats",
          "Added a config option to turn the custom crafting items on or off",
        ],
      },
    ],
  },
  {
    update_version: "2.1.6c",
    release_date: "04/16/2022",
    changes: [
      {
        update: "Community patch, by Corxl",
        sublist: [
          "Telepathy no longer duplicates blocks when breaking a claimed block",
          "Anvil combination can be turned on and off in the config",
          "Fixed incompatible enchantments being applied together",
          "Players could enchant from a book without the book being consumed",
        ],
      },
    ],
  },
  {
    update_version: "2.1.5c",
    release_date: "12/05/2021",
    changes: [
      {
        update: "Minor fixes",
        sublist: [
          "Fixed a console error",
          "Modified the PvPManager event dependency",
        ],
      },
    ],
  },
  {
    update_version: "2.1.5b",
    release_date: "12/03/2021",
    changes: [
      {
        update: "The last feature release",
        sublist: [
          "Modified buying from the Kumandra equipment shop",
          "Enchantments can be applied to player heads",
          "Chunk cooldown text moved from chat to the action bar",
          "The supporters screen moved to /ce credits",
          "SecondLife was reworked",
          "Switched from the Paper API to the Spigot 1.18 API",
        ],
      },
    ],
  },
  {
    update_version: "2.1.5a",
    release_date: "11/30/2021",
    changes: [
      {
        update: "Minor fixes",
        sublist: [
          "Fixed the Barrier buff error on Spigot servers",
          "Fixed the Steal enchantment not being disableable",
        ],
      },
    ],
  },
  {
    update_version: "2.1.5",
    release_date: "11/2021",
    changes: [
      {
        update: "Stable release",
        sublist: [
          "Added a LightSpirit damage multiplier to the config",
          "Added an option to hide the Enchantments lore line",
          "New enchantment: Guarded",
        ],
      },
    ],
  },
];
