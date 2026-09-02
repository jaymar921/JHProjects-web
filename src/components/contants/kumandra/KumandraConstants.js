/**
 * Everything the Kumandra's Economy page reads.
 *
 * Same shape as CE3Constants.js: one PluginInformation object for the copy and
 * the links, then a named export per list the page renders. Numbers here come
 * out of the plugin's own config.yml and plugin.yml, so a server owner reading
 * this page sees the same defaults they will get in the jar.
 *
 * Updated for 2.1, the Custom Enchantments 3 release: two currencies on one
 * balance screen, a convert command, and a transaction list that says what
 * took your money. 2.0 is still the release that made one jar cover 1.16
 * through 26.2 and dropped Vault from the required dependencies.
 */

import wiseImg from "../../../assets/custom_enchants_3/wise.png";
import spigotImg from "../../../assets/custom_enchants_3/spigot.png";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

export const PluginInformation = {
  title: "Kumandra's Economy",
  subtitle: "A whole server economy in one free jar.",
  tagline: "Give your players money worth earning, and something to spend it on.",

  version: "2.1",
  versionReleaseDate: "09/02/2026",
  previousVersion: "2.0",
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
   * The banner panel at the top of the page. 2.1 is a smaller release than 2.0
   * and this says so, because overselling a point release is how you teach
   * people to stop reading the update notes.
   */
  release: {
    headline: "2.1 is out. This is the Custom Enchantments 3 release.",
    body: "A smaller one than 2.0. If you run Custom Enchantments 3 as well, your players have two wallets and have had one balance screen that named CE3 and left out the number. The CE3 balance sits under the Kumandra one now, /kumandra convert buys CE3 currency with Kd, and the conversion is CE3's own code rather than a copy of it, so the two cannot drift apart when you change a number. If you do not run CE3, the one thing here that still affects you is the transaction list: money another plugin takes now says which plugin took it.",
    supported: "1.16 - 26.2",
    upgrade:
      "Drop the new jar in. There is no config change and no data migration, and every method from 1.x and 2.0 keeps its signature.",
  },

  description:
    "Kumandra's Economy is a full economy for your server in a single free jar. Not just a balance and a /pay command: your players take jobs and earn money for the work they already do, trade face to face in a window that holds both sides until both confirm, post parcels to each other by courier across worlds, run public shops, and take quests from villagers and animals for money, XP or items.",
  descriptionMore: [
    "Since 2.1 it also talks to Custom Enchantments 3, if you run that too. Both currencies show on one balance screen, /kumandra convert buys CE3 coins with Kd, and the balance screen keeps a list of your recent movements so money leaving your account says what took it. Neither plugin depends on the other, and neither has a type from the other in its jar.",
    "It runs three ways. As your server's main currency, where every Vault-aware plugin sees Kd as the money. Beside an existing economy as a second currency, with an in-game exchange screen that converts between the two at a rate you set. Or with no Vault installed at all, which is new in 2.0 and works exactly the same except for cross-economy exchange.",
    "Seven jobs come built in. Farmer, Lumberjack, Miner, Hunter, Guardian, Builder and Fisherman, each paying per action on values you control, from harvesting a crop to landing a rare catch. Players hold two at a time by default and join or leave from a GUI, so nobody needs a command list to get started.",
    "Storage is your call too. Out of the box it keeps everything in flat YAML and asks nothing of you. Turn on MySQL instead and the driver is already bundled and relocated inside the jar, the schema is created on first connect, and a save that fails now reports the failure and falls back to the local files rather than reporting success and losing the write.",
    "It is free, it always has been, and it needs nothing installed alongside it. There is a developer API documented on this page, every 1.x method keeps its signature, and there is a donation link at the bottom if the plugin earns your server something.",
  ],

  /**
   * The "What is new in 2.1" grid. Six panels rather than the nine 2.0 had,
   * because it is a smaller release and padding it out to match would be
   * dishonest as well as tiring to read.
   */
  whatsNew: [
    {
      title: "Two currencies, one balance screen",
      accent: "amber",
      icon: "fa-solid fa-wallet",
      body: "A player on a server running both plugins has two wallets and one balance screen. It listed Custom Enchantments as an integration by name and left out the number, which is the less useful half. The CE3 balance now sits under the Kumandra one, with CE3's own configured currency sign, so a renamed currency shows up renamed. Without CE3 the line is simply not there.",
    },
    {
      title: "/kumandra convert <amount>",
      accent: "teal",
      icon: "fa-solid fa-right-left",
      body: "Buys Custom Enchantments currency with Kumandra currency. The amount is named in CE3's units, the same way CE3's own exchange screen asks for it, so a player always ends up with a whole number of coins rather than whatever their Kd happened to divide into.",
    },
    {
      title: "The conversion is CE3's, not a copy",
      accent: "rose",
      icon: "fa-solid fa-code-branch",
      body: "The command calls the conversion inside Custom Enchantments 3. The rate, the fee, the supply cap and the refund on a failed purchase all live in CE3's config. A second implementation here would agree with CE3 exactly until the first time you changed a number, and then disagree quietly forever.",
    },
    {
      title: "Where did my money go",
      accent: "emerald",
      icon: "fa-solid fa-list-ul",
      body: "Money charged by another plugin used to leave the balance smaller with nothing anywhere to say what took it. The balance screen shows the last six movements, what each was for and how long ago it happened. This one works whether or not you have CE3 installed.",
    },
    {
      title: "Callers that say nothing are named anyway",
      accent: "sky",
      icon: "fa-solid fa-tag",
      body: "Anything written against the 2.0 API calls a two-argument withdraw and cannot pass a reason. Rather than wait for every integration to ship an update, the plugin works out which plugin is on the other end of the call and files the movement under its name. Plugins that want to do better can pass a reason string, and it is shown instead.",
    },
    {
      title: "Additive, and allowed to fail",
      accent: "teal",
      icon: "fa-solid fa-shield-halved",
      body: "getApiVersion() returns 2, so an integrator reads one integer instead of probing eight methods. Every CE3 lookup resolves by name, once, through CE3's own class loader, and is allowed to fail: a CE3 release that renames something costs a line on the balance screen, not an exception on a screen a player just opened.",
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
    title: "WHAT'S NEW IN 2.1",
    icon: "fa-solid fa-rocket",
    accent: "rose",
    image: FeatureArt.whatsnew,
    description:
      "The Custom Enchantments 3 release. Both currencies on one balance screen, a convert command, and a list of where your money went.",
    button: "What's new",
  },
  {
    key: "movements",
    title: "MOVEMENTS & CE3",
    icon: "fa-solid fa-list-ul",
    accent: "amber",
    image: FeatureArt.movements,
    description:
      "The last six movements on your account, what each was for, and the two-way bridge to Custom Enchantments 3.",
    button: "Movements",
  },
  {
    key: "balance",
    title: "BALANCE",
    icon: "fa-solid fa-wallet",
    accent: "emerald",
    image: FeatureArt.economy,
    description:
      "Accounts create themselves on first join. Check it, pay it, see where it went, and let admins top it up or wipe it from the console.",
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
      "Read and move a player's balance from your own plugin in about five lines. Offline-capable, all-or-nothing, and attributed in 2.1.",
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
    command: "/kumandra convert [amount]",
    description:
      "Buy Custom Enchantments 3 currency with your Kumandra currency. The amount is in CE3's units. Added in 2.1, and it says so when CE3 is absent or conversion is switched off.",
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
    node: "kumandraseconomy.kumandra.convert",
    grants:
      "Convert Kumandra currency into Custom Enchantments 3 currency. Added in 2.1.",
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
 * arrived in that release; everything else keeps its exact 1.x signature and
 * returns.
 */