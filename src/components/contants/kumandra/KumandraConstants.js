/**
 * Everything the Kumandra's Economy page reads.
 *
 * Same shape as CE3Constants.js: one PluginInformation object for the copy and
 * the links, then a named export per list the page renders. Numbers here come
 * out of the plugin's own config.yml and plugin.yml, so a server owner reading
 * this page sees the same defaults they will get in the jar.
 */

import wiseImg from "../../../assets/custom_enchants_3/wise.png";
import spigotImg from "../../../assets/custom_enchants_3/spigot.png";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

export const PluginInformation = {
  title: "Kumandra's Economy",
  subtitle: "A whole server economy in one free jar.",
  tagline: "Give your players money worth earning, and something to spend it on.",

  version: "1.7",
  versionReleaseDate: "06/26/2022",
  supportedVersions: "1.16 - 1.19",
  spigotResourceId: 96466,
  jobCount: 7,
  deliveryTierCount: 4,
  price: 0,
  free: true,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  downloadLink:
    "https://www.spigotmc.org/resources/%E2%9C%AFkumandras-economy-1-16-1-19-%E2%9C%AF.96466",
  discussionLink: "https://www.spigotmc.org/resources/96466/",
  contactEmail: "jaymarplugins@gmail.com",

  /**
   * The honest position on this build. 1.7 is the last release and it is a
   * 2022 plugin, so the page says so up front rather than letting a server
   * owner find out after the download.
   */
  legacy: {
    headline: "This is the legacy build, and it still works.",
    body: "Version 1.7 shipped on 26 June 2022 and targets Spigot and Paper 1.16 through 1.19. It has been running on servers ever since, because it was built on the plain Spigot API with no NMS, no packet work and no reflection into server internals. That is also why the next build is a port and not a rewrite.",
    supported: "1.16 - 1.19",
    plannedSupport: "1.20 and newer",
  },

  description:
    "Kumandra's Economy is a full economy for your server in a single free jar. Not just a balance and a /pay command: your players take jobs and earn money for the work they already do, trade face to face in a window that holds both sides until both confirm, post parcels to each other by courier, run public shops, and take quests from villagers and animals for money, XP or items.",
  descriptionMore: [
    "It works two ways. Leave Separate_Economy on and Kumandra's Economy runs as a second currency beside whatever you already use, exchanging through Vault at a rate you set. Turn it off and it becomes the server's main economy on its own. Either way it is one config line, not a migration.",
    "Seven jobs come built in. Farmer, Lumberjack, Miner, Hunter, Guardian, Builder and Fisherman, each paying per action on values you control, from harvesting a crop to landing a rare catch. Players hold two at a time by default and join or leave from a GUI, so nobody needs a command list to get started.",
    "Storage is your call too. Out of the box it keeps everything in flat YAML and asks nothing of you. Point it at a MySQL database instead and it creates the schema itself on first connect, and if that database ever goes down it logs the error, falls back to the local files and keeps the server running.",
    "It is free, it always has been, and it needs nothing but Vault. There is a developer API if you want your own plugin to read balances, and there is a donation link at the bottom of this page if you would like the next version to arrive sooner.",
  ],

  /**
   * Shown in the "What is coming" section. Deliberately undated: these are the
   * things being worked on, not promises with a release attached.
   */
  roadmap: [
    {
      title: "Modern version support",
      accent: "emerald",
      icon: "fa-solid fa-cube",
      body: "The port to 1.20 and up. Because there is no NMS anywhere in the plugin, this is mostly material lists and API deprecations rather than a rewrite, which is exactly why it was built that way in the first place.",
    },
    {
      title: "Sturdier trade and delivery sessions",
      accent: "amber",
      icon: "fa-solid fa-handshake",
      body: "Trade requests and in-flight parcels are tracked in memory today, so an ill-timed reload can leave a stale session or a courier behind. Both are moving to state that survives a restart.",
    },
    {
      title: "Shops that do not rely on a name tag",
      accent: "teal",
      icon: "fa-solid fa-shop",
      body: "A shop is currently found by looking for a nearby entity with a matching custom name. Two shops built close together, or a keeper that wanders, can confuse it. Shops are getting real identifiers.",
    },
    {
      title: "Quest authoring in game",
      accent: "sky",
      icon: "fa-solid fa-scroll",
      body: "Quests are written by hand in Data/Quest.yml right now, spacing and all. The plan is the chat-driven flow the shops already use, so a quest can be built without leaving the server.",
    },
    {
      title: "Balance safety rails",
      accent: "rose",
      icon: "fa-solid fa-shield-halved",
      body: "One place that validates every balance change, instead of the arithmetic being repeated across commands. Negative amounts, missing accounts and duplicate payouts all get caught in one spot.",
    },
    {
      title: "More languages",
      accent: "emerald",
      icon: "fa-solid fa-language",
      body: "Every player-facing string already goes through lang.yml, and Turkish ships alongside English. Any language anyone contributes is a file drop, not a code change.",
    },
  ],

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

  downloadOn: [
    {
      title: "Spigot",
      link: "https://www.spigotmc.org/resources/96466/",
      logo: spigotImg,
    },
  ],
};

/** The panels on the features grid. `key` is what the page opens on click. */
export const Features = [
  {
    key: "balance",
    title: "BALANCE",
    icon: "fa-solid fa-wallet",
    accent: "emerald",
    image: FeatureArt.economy,
    description:
      "Accounts create themselves on first join. Check it, pay it, and let admins top it up or wipe it, all from one screen.",
    button: "Balance",
  },
  {
    key: "exchange",
    title: "VAULT EXCHANGE",
    icon: "fa-solid fa-right-left",
    accent: "teal",
    image: FeatureArt.exchange,
    description:
      "Run it as your main currency, or as a second one that exchanges into the economy plugin you already have.",
    button: "Exchange",
  },
  {
    key: "trading",
    title: "TRADING",
    icon: "fa-solid fa-handshake",
    accent: "amber",
    image: FeatureArt.trading,
    description:
      "Player to player trading in a real window. Items on one side, a price on the other, and nothing moves until both confirm.",
    button: "Trading",
  },
  {
    key: "delivery",
    title: "DELIVERY",
    icon: "fa-solid fa-truck-fast",
    accent: "sky",
    image: FeatureArt.delivery,
    description:
      "Post a parcel to anyone on the server. A courier flies it over, on one of four speeds you price yourself.",
    button: "Delivery",
  },
  {
    key: "jobs",
    title: "JOBS",
    icon: "fa-solid fa-helmet-safety",
    accent: "emerald",
    image: FeatureArt.jobs,
    description:
      "Seven jobs that pay for the mining, farming, building and fishing your players were doing anyway.",
    button: "Jobs",
  },
  {
    key: "quests",
    title: "QUESTS",
    icon: "fa-solid fa-scroll",
    accent: "amber",
    image: FeatureArt.quests,
    description:
      "Villagers and animals hand out timed tasks. Pay them out in items, money or XP, on odds you set.",
    button: "Quests",
  },
  {
    key: "shops",
    title: "PUBLIC SHOPS",
    icon: "fa-solid fa-shop",
    accent: "teal",
    image: FeatureArt.shops,
    description:
      "Build the chest you want, clone it into a shop, price it in chat. Stock and prices survive a restart.",
    button: "Shops",
  },
  {
    key: "database",
    title: "STORAGE",
    icon: "fa-solid fa-database",
    accent: "sky",
    image: FeatureArt.database,
    description:
      "Flat files by default, MySQL when you want it, and an automatic fall back to the files if the database drops.",
    button: "Storage",
  },
  {
    key: "api",
    title: "DEVELOPER API",
    icon: "fa-solid fa-code",
    accent: "emerald",
    image: FeatureArt.api,
    description:
      "Read and move a player's balance from your own plugin in about five lines. No NMS, no reflection.",
    button: "API",
  },
];

/** The seven built in jobs and what each pays, straight out of config.yml. */
export const Jobs = [
  {
    name: "Farmer",
    icon: "fa-solid fa-wheat-awn",
    accent: "amber",
    earns: "Harvesting crops and breeding animals",
    rates: [
      { key: "CropsHarvesting", value: "0.25" },
      { key: "BreedingAnimals", value: "0.53" },
    ],
  },
  {
    name: "Lumberjack",
    icon: "fa-solid fa-tree",
    accent: "emerald",
    earns: "Breaking logs and planting trees",
    rates: [
      { key: "BreakingLogs", value: "0.22" },
      { key: "PlantingTrees", value: "0.34" },
    ],
  },
  {
    name: "Miner",
    icon: "fa-solid fa-gem",
    accent: "sky",
    earns: "Mining the block list, and ores at a better rate",
    rates: [
      { key: "MiningBlocks", value: "0.21" },
      { key: "MiningOres", value: "0.32" },
    ],
  },
  {
    name: "Hunter",
    icon: "fa-solid fa-crosshairs",
    accent: "rose",
    earns: "Killing hostile mobs",
    rates: [{ key: "Hunter", value: "0.32" }],
  },
  {
    name: "Guardian",
    icon: "fa-solid fa-shield-halved",
    accent: "teal",
    earns: "Killing hostiles within 20 blocks of a villager",
    rates: [
      { key: "Guardian", value: "0.35" },
      { key: "VillagerRadius", value: "20" },
    ],
  },
  {
    name: "Builder",
    icon: "fa-solid fa-trowel-bricks",
    accent: "amber",
    earns: "Placing blocks, every block by default",
    rates: [{ key: "Builder", value: "0.15" }],
  },
  {
    name: "Fisherman",
    icon: "fa-solid fa-fish",
    accent: "sky",
    earns: "Fishing, and more for a treasure catch",
    rates: [
      { key: "Fisherman", value: "0.23" },
      { key: "LuckyFisherman", value: "0.35" },
    ],
  },
];

/** The four delivery speeds, with their default timer and price. */
export const DeliveryTiers = [
  {
    name: "Cheap",
    accent: "teal",
    timer: "180s",
    price: "Kd 25",
    note: "Three minutes. For anything that is not urgent.",
  },
  {
    name: "Regular",
    accent: "sky",
    timer: "130s",
    price: "Kd 40",
    note: "The middle option, and the one most players pick.",
  },
  {
    name: "Fast",
    accent: "amber",
    timer: "70s",
    price: "Kd 75",
    note: "About a minute, for when someone is waiting.",
  },
  {
    name: "Priority",
    accent: "emerald",
    timer: "30s",
    price: "Kd 100",
    note: "Half a minute. Expensive on purpose.",
  },
];

/** Every command the plugin registers, from plugin.yml and the executors. */
export const CommandList = [
  {
    command: "/kumandra balance",
    description:
      "Open the player's account screen, with the currency exchange in it. Aliased to /kd.",
    requireOp: false,
  },
  {
    command: "/kumandra pay [player] [amount]",
    description: "Send money from your balance to another player's account.",
    requireOp: false,
  },
  {
    command: "/kumandra trade [player]",
    description:
      "Send a trade request. The other player has the request expiry to answer it.",
    requireOp: false,
  },
  {
    command: "/kumandra deliver [player]",
    description:
      "Open the delivery screen for a recipient and pick a delivery speed.",
    requireOp: false,
  },
  {
    command: "/kumandra jobs",
    description: "Open the jobs screen to join or leave a job.",
    requireOp: false,
  },
  {
    command: "/kumandra shops",
    description: "List the shops near you and where they are in the world.",
    requireOp: false,
  },
  {
    command: "/ktrade accept",
    description: "Accept the trade request you were sent and open the window.",
    requireOp: false,
  },
  {
    command: "/ktrade deny",
    description: "Turn down the trade request you were sent.",
    requireOp: false,
  },
  {
    command: "/kumandra economy [player] deposit [amount]",
    description: "Add money to a player's account.",
    requireOp: true,
  },
  {
    command: "/kumandra economy [player] deduct [amount]",
    description: "Take money out of a player's account.",
    requireOp: true,
  },
  {
    command: "/kumandra economy [player] reset",
    description: "Set a player's balance back to zero.",
    requireOp: true,
  },
  {
    command: "/kumandra shops create [name]",
    description:
      "Create a shop where you are standing and spawn its keeper entity.",
    requireOp: true,
  },
  {
    command: "/kumandra shops modify ShopUI clone",
    description:
      "Copy a chest or double chest you built into the nearest shop as its stock.",
    requireOp: true,
  },
  {
    command: "/kumandra shops modify ShopUI price",
    description:
      "Set the price of each item in the nearest shop, through the chat prompts.",
    requireOp: true,
  },
  {
    command: "/kumandra shops delete [name]",
    description: "Delete a shop and remove its keeper.",
    requireOp: true,
  },
];

/** The permission nodes from plugin.yml, and what each one is worth. */
export const Permissions = [
  {
    node: "kumandraseconomy.kumandra",
    grants: "The parent node. Everything below inherits from it.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.balance",
    grants: "Open the account and exchange screen.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.pay",
    grants: "Send money to another player.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.trade",
    grants: "Send and accept trade requests.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.deliver",
    grants: "Post parcels to other players.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.job",
    grants: "Join and leave jobs.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.shop",
    grants: "See and buy from public shops.",
    fallback: "everyone",
  },
  {
    node: "kumandraseconomy.kumandra.economy",
    grants: "Deposit, deduct and reset any player's balance.",
    fallback: "op",
  },
  {
    node: "kumandraseconomy.kumandra.shopAdmin",
    grants: "Create, stock, price and delete shops.",
    fallback: "op",
  },
];

/** The config.yml keys worth knowing about, grouped the way the file is. */
export const ConfigGroups = [
  {
    title: "Economy",
    accent: "emerald",
    icon: "fa-solid fa-coins",
    intro:
      "Whether Kumandra's Economy is your currency or a second one, and what a coin is worth.",
    keys: [
      {
        key: "Separate_Economy",
        value: "true",
        note: "True runs it beside your existing economy. False makes it the server's main one.",
      },
      {
        key: "Currency",
        value: "0.12",
        note: "The exchange rate. One coin of your main economy buys this much Kd.",
      },
      {
        key: "Currency_Prefix",
        value: "Kd",
        note: "What the money is called everywhere it is shown.",
      },
    ],
  },
  {
    title: "Delivery",
    accent: "sky",
    icon: "fa-solid fa-truck-fast",
    intro: "Four speeds, each with a timer in seconds and a price.",
    keys: [
      { key: "Cheap_Delivery_Timer", value: "180", note: "Price: 25" },
      { key: "Regular_Delivery_Timer", value: "130", note: "Price: 40" },
      { key: "Fast_Delivery_Timer", value: "70", note: "Price: 75" },
      { key: "Priority_Delivery_Timer", value: "30", note: "Price: 100" },
    ],
  },
  {
    title: "Trading",
    accent: "amber",
    icon: "fa-solid fa-handshake",
    intro: "How long a request stands, and how fast the price buttons move.",
    keys: [
      {
        key: "RequestTradingSessionExpiry",
        value: "20",
        note: "Seconds before an unanswered trade request lapses.",
      },
      {
        key: "TradingIncreaseValue",
        value: "1",
        note: "The step the price buttons move in during a trade.",
      },
    ],
  },
  {
    title: "Jobs",
    accent: "emerald",
    icon: "fa-solid fa-helmet-safety",
    intro:
      "How many jobs a player may hold, and the pay per action for each one.",
    keys: [
      {
        key: "Jobs",
        value: "2",
        note: "The number of jobs one player can hold at a time.",
      },
      {
        key: "ConsideredMiningBlocks",
        value: "list",
        note: "Which blocks pay a Miner. 1.17 blocks were left out for 1.16 compatibility.",
      },
      {
        key: "ConsideredBlocksForBuilding",
        value: "DEFAULT",
        note: "Which blocks pay a Builder. DEFAULT means every block.",
      },
      {
        key: "VillagerRadius",
        value: "20",
        note: "How close to a villager a Guardian must kill to be paid.",
      },
    ],
  },
  {
    title: "Quests",
    accent: "amber",
    icon: "fa-solid fa-scroll",
    intro: "How often a quest is offered, and whether they run at all.",
    keys: [
      { key: "AllowQuest", value: "true", note: "Turns the quest system off." },
      {
        key: "QuestChance",
        value: "0.15",
        note: "A 15% chance per interval that a quest is offered.",
      },
      {
        key: "QuestInterval",
        value: "5",
        note: "Minutes between quest rolls.",
      },
    ],
  },
  {
    title: "Database",
    accent: "teal",
    icon: "fa-solid fa-database",
    intro: "Lives in Database.yml. Off by default, and safe to leave that way.",
    keys: [
      {
        key: "EnableDatabase",
        value: "false",
        note: "Off means player data stays in local YAML.",
      },
      {
        key: "URL",
        value: "jdbc:mysql://localhost:3307/",
        note: "Your MySQL host. The schema is created on first connect.",
      },
      {
        key: "Database",
        value: "kumandra_database",
        note: "The database name. Rename it to whatever you like.",
      },
    ],
  },
];

/** The KumandrasAPI surface, for the developer panel. */
export const ApiMethods = [
  {
    signature: "getBalance(Player)",
    returns: "Double",
    note: "The player's balance, or -1.0 if there is no account loaded for them.",
  },
  {
    signature: "deposit(Player, double)",
    returns: "boolean",
    note: "Adds to the balance. False if the player has no account loaded.",
  },
  {
    signature: "withdraw(Player, double)",
    returns: "boolean",
    note: "Takes from the balance. False if they cannot cover it.",
  },
  {
    signature: "RegisterPlugin(String)",
    returns: "boolean",
    note: "Registers your plugin with the economy so it can take part.",
  },
  {
    signature: "primaryEconomy()",
    returns: "boolean",
    note: "True when the server has this set as its main economy.",
  },
  {
    signature: "getJobs(Player)",
    returns: "JobList[]",
    note: "The jobs the player currently holds.",
  },
];
