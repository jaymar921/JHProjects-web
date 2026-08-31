/**
 * Everything the Kumandra's Economy page reads.
 *
 * Same shape as CE3Constants.js: one PluginInformation object for the copy and
 * the links, then a named export per list the page renders. Numbers here come
 * out of the plugin's own config.yml and plugin.yml, so a server owner reading
 * this page sees the same defaults they will get in the jar.
 *
 * Updated for 2.0, the release that made one jar cover 1.16 through 26.2 and
 * dropped Vault from the required dependencies.
 */

import wiseImg from "../../../assets/custom_enchants_3/wise.png";
import spigotImg from "../../../assets/custom_enchants_3/spigot.png";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

export const PluginInformation = {
  title: "Kumandra's Economy",
  subtitle: "A whole server economy in one free jar.",
  tagline: "Give your players money worth earning, and something to spend it on.",

  version: "2.0",
  versionReleaseDate: "08/26/2026",
  previousVersion: "1.7",
  supportedVersions: "1.16 - 26.2",
  javaSupport: "Java 8+",
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
   * The banner panel at the top of the page. 2.0 is the current build, so this
   * says what changed and why it matters, rather than apologising for the age
   * of the jar the way the 1.7 copy had to.
   */
  release: {
    headline: "2.0 is out, and one jar now covers 1.16 through 26.2.",
    body: "The old build worked out your server version by checking whether the version text contained \"1.16\", \"1.17\" or \"1.18\". A 1.19 server matches none of those, so on anything newer the plugin decided it was older than 1.16 and quietly switched off the quest system, nether logs for the Lumberjack and the Fisherman's rare catches, with nothing in the console to say so. 2.0 parses the version as numbers and compares them, which is what makes the whole range work from one file. Vault is optional now, the Vault provider was rewritten, three job settings that were costing you money are fixed, and Custom Enchantments 3 is detected as an integration.",
    supported: "1.16 - 26.2",
    upgrade:
      "Replace the jar and restart. Your config is upgraded in place and backed up as old_config.yml first, and playerData.yml and shop data are unchanged in format.",
  },

  description:
    "Kumandra's Economy is a full economy for your server in a single free jar. Not just a balance and a /pay command: your players take jobs and earn money for the work they already do, trade face to face in a window that holds both sides until both confirm, post parcels to each other by courier across worlds, run public shops, and take quests from villagers and animals for money, XP or items.",
  descriptionMore: [
    "It runs three ways. As your server's main currency, where every Vault-aware plugin sees Kd as the money. Beside an existing economy as a second currency, with an in-game exchange screen that converts between the two at a rate you set. Or with no Vault installed at all, which is new in 2.0 and works exactly the same except for cross-economy exchange.",
    "Seven jobs come built in. Farmer, Lumberjack, Miner, Hunter, Guardian, Builder and Fisherman, each paying per action on values you control, from harvesting a crop to landing a rare catch. Players hold two at a time by default and join or leave from a GUI, so nobody needs a command list to get started.",
    "Storage is your call too. Out of the box it keeps everything in flat YAML and asks nothing of you. Turn on MySQL instead and the driver is already bundled and relocated inside the jar, the schema is created on first connect, and a save that fails now reports the failure and falls back to the local files rather than reporting success and losing the write.",
    "It is free, it always has been, and 2.0 needs nothing installed alongside it. There is a developer API with a full guide in the repository, every 1.x method keeps its signature, and there is a donation link at the bottom of this page if the plugin earns your server something.",
  ],

  /**
   * The "What is new in 2.0" grid. This replaced the old roadmap: the roadmap's
   * headline item was modern version support, and that is what shipped.
   */
  whatsNew: [
    {
      title: "It knows what server it is on",
      accent: "emerald",
      icon: "fa-solid fa-cube",
      body: "Version detection parses the numbers and compares them, instead of matching the version string against \"1.16\", \"1.17\" and \"1.18\". That is what makes one jar cover 1.16 to 26.2, and it is what switched quests, nether logs and rare catches back on for every server newer than 1.18.",
    },
    {
      title: "Vault is optional",
      accent: "teal",
      icon: "fa-solid fa-plug",
      body: "It used to be a hard dependency, which meant installing a second plugin just to use Kumandra's own currency on a server with no other economy. With Vault it behaves exactly as before. Without it everything works except cross-economy exchange, which needs a second economy anyway.",
    },
    {
      title: "The Vault provider was rewritten",
      accent: "rose",
      icon: "fa-solid fa-screwdriver-wrench",
      body: "format() returned null, so shop plugins printed prices as the word \"null\". createPlayerAccount() always returned false. Bank methods returned null instead of a not-supported response. Balance lookups by world returned zero from any other world, so money appeared to vanish through a nether portal. All fixed.",
    },
    {
      title: "Three job settings that cost you money",
      accent: "amber",
      icon: "fa-solid fa-helmet-safety",
      body: "Ore income never worked: the ore list was being appended to the mining-block list, so it started empty and every ore paid the plain-block rate. Builder income read the wrong config key and could silently be zero. VillagerRadius sat in config.yml and was never read, so Guardian always used a hard-coded 20 blocks.",
    },
    {
      title: "Custom Enchantments 3 integration",
      accent: "sky",
      icon: "fa-solid fa-wand-sparkles",
      body: "CE3 is detected at startup and listed as an integration on the balance screen, and the CE quest pack that has always shipped inside the jar finally loads, but only when CE is actually installed. Not one line of CE code is imported, so a CE update cannot break startup.",
    },
    {
      title: "MySQL is easier and safer",
      accent: "teal",
      icon: "fa-solid fa-database",
      body: "Connector/J 26.7.0 is bundled and relocated into the plugin's own package, so it cannot collide with another plugin's copy. Prepared statements instead of concatenated SQL, one batched write instead of a round trip per player, connections closed on every path, and a failed save now reports failure and falls back to local storage.",
    },
    {
      title: "Leaks and stranded couriers",
      accent: "rose",
      icon: "fa-solid fa-broom",
      body: "Every job timer was running seven times over, so the action bar was written seven times a tick and income expired seven times too fast. Trade sessions never released their inventory or either player. Shutdown cleanup stopped at the first courier in an unloaded chunk and left every courier after it standing in your world.",
    },
    {
      title: "Data that survives being edited",
      accent: "emerald",
      icon: "fa-solid fa-shield-halved",
      body: "Writing balance: 500 instead of 500.0 in playerData.yml used to throw a type error and take every player's record down with it. Both forms are read now. Config upgrades read from the plugin's real data folder, index your settings by key, carry list settings across as whole blocks, and keep the shipped comments intact.",
    },
    {
      title: "A bigger, still-compatible API",
      accent: "sky",
      icon: "fa-solid fa-code",
      body: "Every 1.x method keeps its signature and return values, and code compiled against 1.7 links against 2.0 unchanged. New: offline-capable UUID balance methods, an all-or-nothing transfer, setBalance, hasAccount, createAccount, hasJob, and accessors for the currency prefix, exchange rate, foreign economy name and detected server version.",
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
    key: "whats new",
    title: "WHAT'S NEW IN 2.0",
    icon: "fa-solid fa-rocket",
    accent: "rose",
    image: FeatureArt.whatsnew,
    description:
      "One jar from 1.16 to 26.2, Vault made optional, the Vault provider rewritten, and the job settings that were quietly paying nothing.",
    button: "What's new",
  },
  {
    key: "balance",
    title: "BALANCE",
    icon: "fa-solid fa-wallet",
    accent: "emerald",
    image: FeatureArt.economy,
    description:
      "Accounts create themselves on first join. Check it, pay it, and let admins top it up or wipe it, from a command that works on the console too.",
    button: "Balance",
  },
  {
    key: "exchange",
    title: "VAULT EXCHANGE",
    icon: "fa-solid fa-right-left",
    accent: "teal",
    image: FeatureArt.exchange,
    description:
      "Main currency, second currency, or no Vault at all. Three ways to run it, one line of config between them.",
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
      "Post a parcel to anyone on the server, across worlds. A courier flies it over, on one of four speeds you price yourself.",
    button: "Delivery",
  },
  {
    key: "jobs",
    title: "JOBS",
    icon: "fa-solid fa-helmet-safety",
    accent: "emerald",
    image: FeatureArt.jobs,
    description:
      "Seven jobs that pay for the mining, farming, building and fishing your players were doing anyway. Ore rates actually work now.",
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
      "Flat files by default, MySQL when you want it with the driver bundled, and a failed save that says so instead of losing the write.",
    button: "Storage",
  },
  {
    key: "api",
    title: "DEVELOPER API",
    icon: "fa-solid fa-code",
    accent: "emerald",
    image: FeatureArt.api,
    description:
      "Read and move a player's balance from your own plugin in about five lines. Offline-capable and all-or-nothing in 2.0.",
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
    earns: "Breaking logs, nether stems included, and planting trees",
    rates: [
      { key: "BreakingLogs", value: "0.22" },
      { key: "PlantingTrees", value: "0.34" },
    ],
  },
  {
    name: "Miner",
    icon: "fa-solid fa-gem",
    accent: "sky",
    earns: "Mining the block list, and ores at their own rate",
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
    earns: "Killing hostiles within VillagerRadius of a villager",
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

/**
 * The three job settings 2.0 fixed. Shown next to the job cards, because a
 * server owner upgrading wants to know which of their numbers start working.
 */
export const JobFixes = [
  {
    key: "MiningOres",
    was: "Every ore paid the plain-block rate",
    now: "The default ore list was being appended to the mining-block list, so the ore list started empty. Ores pay the ore rate now.",
  },
  {
    key: "Builder",
    was: "Builder income could silently be zero",
    now: "The check that reads the Builder value was looking at the wrong config key.",
  },
  {
    key: "VillagerRadius",
    was: "Ignored entirely",
    now: "Guardian used a hard-coded 20 blocks whatever you had set. Your value is read now.",
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
      "Open the player's account screen, with the currency exchange and the detected integrations in it. Aliased to /kd.",
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
      "Open the delivery screen for a recipient and pick a delivery speed. Works between worlds.",
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
    description:
      "Add money to a player's account. Runs from the console in 2.0.",
    requireOp: true,
  },
  {
    command: "/kumandra economy [player] deduct [amount]",
    description:
      "Take money out of a player's account. Runs from the console in 2.0.",
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
        note: "True runs it beside your existing economy. False makes it the server's main one. If it is true but nothing has registered a primary economy, 2.0 says so in the console and runs as primary for that session.",
      },
      {
        key: "Currency",
        value: "0.12",
        note: "The exchange rate. One coin of your main economy buys this much Kd.",
      },
      {
        key: "Currency_Prefix",
        value: "Kd",
        note: "What the money is called everywhere it is shown, including through Vault's format().",
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
        note: "Seconds before an unanswered trade request lapses. The whole session is torn down on expiry in 2.0, instead of one map being cleared and the rest left behind.",
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
        note: "Which blocks pay a Miner at the plain block rate.",
      },
      {
        key: "ConsideredMiningOres",
        value: "list",
        note: "Which blocks pay the ore rate. Before 2.0 this list was being filled into the block list, so it started empty and no ore ever paid the ore rate.",
      },
      {
        key: "ConsideredBlocksForBuilding",
        value: "DEFAULT",
        note: "Which blocks pay a Builder. DEFAULT means every block.",
      },
      {
        key: "VillagerRadius",
        value: "20",
        note: "How close to a villager a Guardian must kill to be paid. Read for the first time in 2.0.",
      },
    ],
  },
  {
    title: "Quests",
    accent: "amber",
    icon: "fa-solid fa-scroll",
    intro:
      "How often a quest is offered, and whether they run at all. Quests need Minecraft 1.17 or newer.",
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
        note: "Your MySQL host. The schema is created on first connect, and Connector/J is bundled in the jar.",
      },
      {
        key: "Database",
        value: "kumandra_database",
        note: "The database name. Rename it to whatever you like.",
      },
    ],
  },
];

/**
 * The KumandrasAPI surface, for the developer panel. Anything with a `since`
 * is new in 2.0; everything else keeps its exact 1.x signature and returns.
 */