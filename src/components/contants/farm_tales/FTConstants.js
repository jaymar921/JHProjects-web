/**
 * Everything the Farm Tales page reads.
 *
 * Same shape as EMRConstants.js: one PluginInformation object for the copy
 * and the links, then a named export per list the page renders.
 *
 * The plugin is closed source and the repository is private, so this page
 * is its only public documentation. Nothing below is paraphrased from
 * memory. It is read out of the plugin repository at
 * F:/important stuff/Programming/JAVA/Farm_Tales, in this order:
 *
 *   docs/installation.md       the first start, updating, the resource pack
 *   docs/commands.md           every subcommand and what it refuses
 *   docs/permissions.md        the two nodes
 *   docs/build/editions.md     "What Lite restricts", the authority for
 *                              EditionMatrix below
 *   releases/1.0.0-release.md  the numbers, and the known limits
 *   marketing/advertising.md   the six system blocks
 *   docs/placeholders.md       the PlaceholderAPI table
 *   docs/compatibility.md      the 1.16.5 skip list
 *
 * The full catalog is in FTCatalog.js, generated from the shipped
 * catalog/*.yml by scripts/generate-farm-tales-catalog.mjs so it cannot
 * drift.
 *
 * SPIGOT IDS: 1.0.0 went live on 11 September 2026. Lite is resource 138717
 * and Premium is 138718. Every link on the page reads from the SPIGOT
 * object, so that is the only place the links change if a listing moves.
 */

import * as FeatureArt from "../../../assets/farm_tales/features";
import * as Screens from "../../../assets/farm_tales/screenshots";
import icon from "../../../assets/farm_tales/branding/icon.png";
import iconLite from "../../../assets/farm_tales/branding/icon-lite.png";
import spigotImg from "../../../assets/custom_enchants_3/spigot.png";
// Same payee as Custom Enchantments 3 and Epic Mobs Rework, so the same logo
// and the same QR. One Wise account sits behind every page.
import wiseImg from "../../../assets/custom_enchants_3/wise.png";
import wisePaymentQr from "../../../assets/custom_enchants_3/wise-payment-qr.png";

/**
 * Both listings, in one place, because everything links to them.
 *
 * `pending` is read by the page: while it was true the buttons said the
 * listing was on its way instead of pretending to be a download. It stays
 * as a field so the same page can carry a future edition before its listing
 * exists, but for 1.0.0 both resources are live.
 */
const SPIGOT = {
  pending: false,
  premiumId: 138718,
  liteId: 138717,
  premium: "https://www.spigotmc.org/resources/138718/",
  lite: "https://www.spigotmc.org/resources/138717/",
  premiumDiscussion: "https://www.spigotmc.org/resources/138718/",
  liteDiscussion: "https://www.spigotmc.org/resources/138717/",
};

/** Where the resource packs live. One zip per Minecraft version per edition. */
const PACKS_URL =
  "https://github.com/JnH-Projects/plugin-resources/tree/main/FarmTales/ResourcePacks";

export const PluginInformation = {
  title: "Farm Tales",
  subtitle: "Grow it well, and it is worth more.",
  tagline:
    "A farming plugin where how you tend a crop decides what you harvest.",

  /**
   * 1.0.0 shipped on 11 September 2026, tested on both ends of the version
   * range. `releaseDate` matches the `release_date` of the newest entry in
   * FTConstants_Logs; keep the two in step when the next version lands.
   */
  version: "1.0.0",
  status: "released",
  statusLabel: "1.0.0 IS OUT. LITE IS FREE, PREMIUM IS £13.89",
  releaseDate: "2026-09-11",
  releaseDateLabel: "11 September 2026",

  supportedVersions: "1.16.5 to 26.2",
  serverSoftware: "Spigot and Paper",
  javaSupport: "Java 11 or newer",
  testedOn: "Spigot 1.16.5 and 26.2, the same jar on both",

  icon,
  iconLite,
  spigotLogo: spigotImg,

  spigot: SPIGOT,
  downloadLink: SPIGOT.premium,
  liteDownloadLink: SPIGOT.lite,
  discussionLink: SPIGOT.premiumDiscussion,
  packsLink: PACKS_URL,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",
  contactEmail: "jaymarplugins@gmail.com",

  /**
   * One price, no sale. `onSale` and `regularAmount` are here so the shared
   * buy panels and the home page card read the same shape as Epic Mobs
   * Rework, and so a launch sale later is a two-field edit rather than a
   * rewrite.
   */
  price: {
    currency: "GBP",
    symbol: "£",
    amount: "13.89",
    regularAmount: "13.89",
    onSale: false,
    saleLabel: "",
    saleNote: "",
    note: "One payment, and every update after it. Bought through Spigot, PayPal or Wise.",
  },

  /**
   * The two off-Spigot ways to pay, mirroring Custom Enchantments 3 and Epic
   * Mobs Rework step for step: send the exact amount, screenshot the receipt,
   * email it with your Spigot username, and the resource is granted by hand.
   *
   * `discountPercent` is 0 on both for now. The field stays because the buy
   * panels read it, so putting a number back is one edit in one place.
   */
  payment: {
    contactEmail: "jaymarplugins@gmail.com",
    paymentSubject: "Farm Tales Plugin Payment",
    spigotAccountRequirement:
      "You must have a Spigot account before paying. Your Spigot username is required to receive the plugin.",
    exactPaymentNotice:
      "Pay the exact amount shown. There is no return or refund policy for payments that are less or more than the required amount.",
    noDiscountNotice:
      "There is no payment method discount for now. Every route below costs the same.",
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

  description:
    "Farm Tales is a farming plugin where how you tend a crop decides what you harvest. 134 crops, fruits and meats, five animals with 30 meat grades, a nutrition system with 12 tags that decides what a diet is worth, and six quality grades from Spoiled to Exquisite that come from the water, the fertilizer and the attention a plant actually got. Nothing is random that could be earned.",
  descriptionMore: [
    "It is one plugin, it needs nothing else installed, and the same jar runs on Spigot and Paper from 1.16.5 to 26.2. Every crop rides a vanilla item, so it works with no resource pack at all; with the pack, every one of them has its own sprite. There is no NMS anywhere in it, so a Minecraft release does not need a new jar.",
    "Plant a seed on farmland and it grows on real elapsed time, not ticks. It needs water, fertilizer speeds it up, and at harvest the plugin looks at the whole life of that plant and rolls a grade. The grade is on the item, in its name, its lore and its data, and it changes what eating it is worth. Dishes take the grade of their worst ingredient, cooking keeps the grade, meat rots or dry-ages in a chest, and fruit and grain ferment into wine and beer that improve with age only if they were good to begin with.",
    "It ships as two jars from one source tree. Lite is free and is the same plugin with a smaller catalog: 34 of the 134 entries, two of the six grades, two of the five animals, watering but no fertilizer, and no rot, aging or fermentation. What it does not have is listed in its own codex, greyed out, so you can see exactly what you would be buying before you buy it.",
    "Every number is in config.yml with a comment above it. Every message is in language.yml. Every crop is a block of YAML in catalog/, and a file you add there is read like the shipped ones, so your own crops get seeds, grades, nutrition, a codex page and a texture in the generated pack without touching code.",
  ],

  /** The four things a server owner asks before they read any further. */
  traits: [
    {
      title: "NO NMS",
      accent: "amber",
      body: "Plain Spigot API. One jar covers 1.16.5 through 26.2, tested at both ends. Nothing needs a new build when Minecraft updates.",
    },
    {
      title: "NO DEPENDENCIES",
      accent: "sky",
      body: "No database, no other plugin, no resource pack unless you want one. PlaceholderAPI is optional and detected on its own.",
    },
    {
      title: "ONE PAYMENT",
      accent: "green",
      body: "£13.89 for Premium, once. Every update after it is included. No subscription, no licence server, nothing that phones home.",
    },
    {
      title: "TRY IT FIRST",
      accent: "emerald",
      body: "The free Lite build is the same plugin with a smaller catalog, and it never expires. Run it on your own server before you pay for anything.",
    },
  ],
};

/**
 * The six feature panels. `key` is what the page passes to setSubcontent,
 * so it has to match the switch in FarmTalesPage.
 */
export const Features = [
  {
    key: "crops",
    title: "CROPS THAT REMEMBER",
    icon: "fa-solid fa-seedling",
    accent: "green",
    image: FeatureArt.crops,
    description:
      "Plant it, water it, feed it, pick it on time. At harvest the plugin looks at how the whole plant was kept and rolls a grade from Spoiled to Exquisite.",
    button: "Crops",
  },
  {
    key: "nutrition",
    title: "EAT WELL OR GET ILL",
    icon: "fa-solid fa-heart-pulse",
    accent: "rose",
    image: FeatureArt.nutrition,
    description:
      "Twelve nutrition tags on every item. Eating fills them, time drains them, and living on one thing makes you ill in three stages. A proper meal clears it.",
    button: "Nutrition",
  },
  {
    key: "animals",
    title: "ANIMALS WORTH KEEPING",
    icon: "fa-solid fa-cow",
    accent: "amber",
    image: FeatureArt.animals,
    description:
      "Cows, pigs, sheep, chickens and rabbits are tracked from the moment you feed one. Feed it well and on time and its meat grades up. Thirty meat entries.",
    button: "Animals",
  },
  {
    key: "storage",
    title: "STORE IT, AGE IT, FERMENT IT",
    icon: "fa-solid fa-wine-bottle",
    accent: "purple",
    image: FeatureArt.storage,
    description:
      "Meat rots in a chest, a snowball holds it off, blue ice dry-ages it. Fruit becomes wine and grain becomes beer, and time only amplifies the grade they started with.",
    button: "Storage",
  },
  {
    key: "codex",
    title: "CODEX, RECIPES, ADMIN MENU",
    icon: "fa-solid fa-book-open",
    accent: "sky",
    image: FeatureArt.codex,
    description:
      "The whole catalog in game with what you have found filled in, every recipe and how to make it, and on Premium a chest menu that edits every number in the config.",
    button: "Menus",
  },
  {
    key: "config",
    title: "YOURS TO CHANGE",
    icon: "fa-solid fa-gears",
    accent: "lime",
    image: FeatureArt.config,
    description:
      "Every number in config.yml with a comment, every message in language.yml, every crop in catalog/. Add a file there and your own crops load like the shipped ones.",
    button: "Config",
  },
];

/** The six grades, in order, with the colour the page draws them in. */
export const QualityGrades = [
  { name: "Spoiled", accent: "slate", note: "Ignored. Dry, overfed, or left ripe far too long." },
  { name: "Tough", accent: "rose", note: "Kept badly, but not abandoned." },
  { name: "Common", accent: "green", note: "The baseline. What a wild animal drops." },
  { name: "Good", accent: "lime", note: "Watered and picked roughly on time. The Lite ceiling." },
  { name: "Prime", accent: "sky", note: "Kept properly, start to finish." },
  { name: "Exquisite", accent: "amber", note: "Kept perfectly, and the roll went your way." },
];

/** The twelve nutrition tags shipped in nutrition-tags.yml. */
export const NutritionTags = [
  "Protein",
  "Carbohydrate",
  "Fat",
  "Fiber",
  "Iron",
  "Calcium",
  "Potassium",
  "Vitamin A",
  "Vitamin B",
  "Vitamin C",
  "Vitamin D",
  "Antioxidant",
];

/**
 * What Lite restricts, from docs/build/editions.md and
 * releases/_lite-limitations.md. Every row is a compile-time fact about the
 * Lite jar, never a setting, and the plugin says each one in game rather
 * than hiding it. Do not soften them here.
 */
export const EditionMatrix = [
  {
    feature: "Catalog entries",
    lite: "34 of 134: 15 vegetables, 15 fruits, 4 meats",
    full: "All 134",
  },
  { feature: "Quality grades", lite: "Common and Good", full: "All six, Spoiled to Exquisite" },
  { feature: "Tracked animals", lite: "Cow and chicken", full: "Cow, pig, sheep, chicken, rabbit" },
  { feature: "Three plant forms: crop, potted, tree", lite: true, full: true },
  { feature: "Seeds drop from grass, ferns and leaves", lite: true, full: true },
  { feature: "Water Spray, rain and nearby water", lite: true, full: true },
  { feature: "Fertilizer", lite: false, full: "Three tiers" },
  { feature: "Nutrition tracked and shown", lite: true, full: true },
  { feature: "Illness from deficiency", lite: false, full: "Three stages" },
  { feature: "Dishes, cooking, smoothies", lite: true, full: true },
  { feature: "Cultivator's Hoe and Herder's Shears", lite: true, full: true },
  { feature: "Meat rots in storage", lite: false, full: true },
  { feature: "Snowball preservation, blue ice dry-aging", lite: false, full: "Three aging tiers" },
  { feature: "Wine and beer", lite: false, full: "Three ferment tiers" },
  { feature: "Codex with discovery", lite: "All 134 listed, 100 greyed", full: true },
  { feature: "Recipe browser", lite: true, full: "Plus the three processes" },
  { feature: "Admin menu, /ft admin", lite: false, full: true },
  { feature: "Config editing", lite: "YAML by hand", full: "YAML, or the menu" },
  { feature: "Resource pack", lite: "Lite pack, 102 textures", full: "Full pack, 435 textures" },
  { feature: "PlaceholderAPI", lite: true, full: true },
  { feature: "Your own catalog/custom.yml", lite: true, full: true },
  { feature: "Author advert popup and /ft plugins", lite: true, full: false },
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
    title: "IT WILL NOT HIDE WHAT IT LACKS",
    accent: "sky",
    icon: "fa-solid fa-eye",
    body: "The Lite codex lists all 134 entries with the 100 premium ones greyed and marked. /ft give on a premium entry says it is Premium rather than unknown. You can see the whole paid edition before anybody pays for it.",
  },
  {
    title: "IT WILL NOT EAT YOUR WORLD",
    accent: "amber",
    icon: "fa-solid fa-hard-drive",
    body: "Both jars read the same plugins/FarmTales/ folder. A Premium world that becomes Lite keeps its premium crops in the ground: they stop growing and drop nothing, and resume exactly where they stopped if the world goes back to Premium.",
  },
  {
    title: "IT WILL NOT NAG MUCH",
    accent: "lime",
    icon: "fa-solid fa-user-shield",
    body: "One popup per session, 45 minutes in, listing the author's other plugins, and a /ft plugins command that does the same. That is the whole of it, and Premium has neither.",
  },
];

/**
 * The plugin's commands, from docs/commands.md. One command, /farmtales,
 * alias /ft. `lite: false` means Premium only. `playerOnly` means the console
 * cannot run it.
 */
export const CommandList = [
  {
    command: "/ft info",
    description:
      "Which edition and version is installed, what server it is on, how many catalog entries loaded and how many were skipped for this version, and the capability lines from the boot banner. The first thing to paste into a bug report. /ft on its own is the same command.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ft codex [id]",
    description:
      "Opens the codex: every crop, fruit and meat grade, with what you have discovered filled in and the rest greyed. With an id, opens that entry's page. On Lite the premium entries are listed and marked rather than hidden.",
    requireOp: false,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ft recipes [id]",
    description:
      "Everything Farm Tales makes craftable and how: the Water Spray, the fertilizers, the two tools, the dishes and the drinks, plus on Premium the three processes that are not recipes, dry-aging, wine and beer. With an id, opens that recipe.",
    requireOp: false,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ft help",
    description: "The list, filtered to what you may run.",
    requireOp: false,
    lite: true,
  },
  {
    command: "/ft plugins",
    description: "Lite only. The author's other plugins. Premium does not have this subcommand.",
    requireOp: false,
    lite: true,
    liteOnly: true,
  },
  {
    command: "/ft reload",
    description:
      "Re-reads config.yml, language.yml, nutrition-tags.yml and every file in catalog/ without a restart, and says what changed. A reload that fails validation leaves the running configuration in place and prints what broke and where. Recipes and PlaceholderAPISupport take a restart, and both say so in their comment.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft catalog [kind|id]",
    description:
      "Lists what loaded: id, kind, model number and base item, one line each. vegetable, fruit or meat filters by kind. An id prints that entry in full, including where its seed comes from and what it grows as. On Lite the list is the 34 obtainable entries.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft give <id> [seed|produce] [count] [grade]",
    description:
      "Hands out a Farm Tales item. This is how a server sets up its shop, its kits or its first field. The id is a catalog entry or one of water_spray, animal_feed, a fertilizer tier (basic, rich, prime) or a tool (farming_hoe, herding_shears). seed is the default; produce is the harvested item at COMMON unless a grade is given. Count is 1 to 2304. A premium entry on Lite is refused with a message saying it is Premium.",
    requireOp: true,
    lite: true,
    playerOnly: true,
  },
  {
    command: "/ft nutrition <player> [feed <tag> <amount>|set <tag> <amount>|cure]",
    description:
      "Reads or drives a player's nutrition. With no action it prints every tag's current level and, on Premium, the illness section. feed adds to a tag as eating would, set writes a level, cure clears every active disease effect. On Lite there is no illness section and nothing to cure, and the command says so.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft pack",
    description:
      "Which resource pack this server wants. Prints the pack format this server declares and the Minecraft version that is, which of the two profiles covers it, where resource-pack.url says players get it, and whether joining players are offered it.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft admin",
    description:
      "Premium. Opens the admin menu: every number in config.yml and every field on every catalog entry, edited from a chest window and written back to the file with every comment intact. Every edit is logged to admin-edits.log with who made it and the old value. On Lite the subcommand says the menu is Premium and names the files to edit by hand.",
    requireOp: true,
    lite: false,
    playerOnly: true,
  },
  {
    command: "/ft store status",
    description:
      "One line per saved store and one each for the farming and husbandry systems: what is loaded and what is pending. The store subcommands are diagnostic tools rather than something a server needs day to day.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft store show",
    description:
      "The crop record under the block you are looking at: entry, growth, water, fertilizer, the maintenance score with each of its three terms, and the grade the crop is heading for. From the console, show <world> <x> <y> <z>. The only way to see whether your water settings or your grace window is the thing that wants tuning.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft store animals [world]",
    description:
      "Every tracked animal in the world: what it is, its feed score, whether the entity is present, and the grade it is heading for.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft store flush | sweep | watch [stop]",
    description:
      "flush writes every dirty shard now. sweep drops animal records whose animal cannot be found and whose last sighting is older than persistence.entity-record-max-age-hours. watch measures tick times until stopped and reports average, worst and how many went over 100ms.",
    requireOp: true,
    lite: true,
  },
  {
    command: "/ft store stress <count> [world]",
    description:
      "Plants up to 20,000 crops through the real planting path and reports how long it took. stress clear harvests them back out. The load generator behind the numbers in the plugin's configuration docs. Do this on a test server.",
    requireOp: true,
    lite: true,
  },
];

/** The two permission nodes, from docs/permissions.md. */
export const Permissions = [
  {
    node: "farmtales.use",
    default: "everyone",
    grants:
      "/farmtales and its player subcommands: info, codex, recipes, help, and plugins on Lite.",
  },
  {
    node: "farmtales.admin",
    default: "op",
    grants:
      "The rest: reload, catalog, give, nutrition, pack, store and, on Premium, admin. It does not imply farmtales.use, so a permissions plugin that removes the default from farmtales.use has to grant both to an admin.",
  },
];

/** What lives where in plugins/FarmTales/, from docs/installation.md. */
export const FileLayout = [
  {
    path: "config.yml",
    what: "Every tuning number, commented. Twenty sections from growth and water to fermentation and disease.",
    accent: "lime",
  },
  { path: "language.yml", what: "Every message the plugin sends. Colour codes work.", accent: "sky" },
  {
    path: "nutrition-tags.yml",
    what: "The twelve nutrition tags. Add a thirteenth and it exists everywhere on the next reload.",
    accent: "rose",
  },
  {
    path: "catalog/*.yml",
    what: "The crops, fruits and meats. Every .yml in the folder is read, so custom.yml is yours and is never touched by an update.",
    accent: "green",
  },
  {
    path: "data/",
    what: "The saved world: what is planted where, and every tracked animal. Not configuration. Back it up with the world.",
    accent: "amber",
  },
  {
    path: "admin-edits.log",
    what: "Premium. Every edit made through /ft admin, one line each: who, when, which file, which key, old value, new value.",
    accent: "purple",
  },
];

/**
 * The first evening, in the order it actually happens. From
 * docs/installation.md "First start".
 */
export const SetupSteps = [
  {
    n: 1,
    title: "PICK ONE JAR",
    body: "FarmTales.jar is Premium, FarmTales-lite.jar is the free one. Put one of them in plugins/. Never both: they register the same plugin name and Spigot will refuse the second. Java 11 or newer.",
  },
  {
    n: 2,
    title: "START THE SERVER",
    body: "The plugin writes plugins/FarmTales/config.yml, language.yml, nutrition-tags.yml and catalog/ with three files in it. None of these is ever overwritten by an update.",
  },
  {
    n: 3,
    title: "READ THE BANNER",
    cmd: "/ft info",
    body: "It says which edition booted, [PREMIUM] or [LITE], how many entries loaded, how many were skipped for this server version, and what the server can and cannot do. Check that line rather than the file name.",
  },
  {
    n: 4,
    title: "GET A SEED",
    cmd: "/ft give tomato seed",
    body: "Ops have farmtales.admin. Give yourself something to plant, or break grass until a seed drops. /ft catalog lists every id and tab completion offers them.",
  },
  {
    n: 5,
    title: "PLANT, WATER, WAIT",
    cmd: "/ft recipes",
    body: "Right-click farmland with the seed. Craft a Water Spray (the recipe browser shows how) and right-click the crop to water it. A label floats above it saying how far along it is and how much water it has.",
  },
  {
    n: 6,
    title: "HARVEST AND READ THE GRADE",
    cmd: "/ft store show",
    body: "Break the ripe crop. The produce carries its grade in its name and lore. Before you break it, /ft store show while looking at the block tells you the maintenance score and which grade it is heading for.",
  },
  {
    n: 7,
    title: "THE PACK IS OPTIONAL",
    cmd: "/ft pack",
    body: "Everything works with no resource pack; an eggplant is a beetroot with the right name and behaviour. When you want the sprites, there is a zip for 1.16.5, 1.20.4, 1.21.1, 1.21.5 and 26.2 on GitHub, and /ft pack names the one your version needs and where players get it.",
  },
];

/**
 * One check per system, in the order that needs least setup first. Work
 * down the list on a fresh server and you have seen the whole plugin.
 */
export const SetupTests = [
  {
    name: "GRADES",
    icon: "fa-solid fa-star",
    accent: "amber",
    cmd: "/ft give tomato produce 1 EXQUISITE",
    body: "Hold it. The name is coloured by grade and the lore quotes the nutrition the grade scaled. On Lite the grade is clamped to Good, silently, by design.",
  },
  {
    name: "NUTRITION",
    icon: "fa-solid fa-heart-pulse",
    accent: "rose",
    cmd: "/ft nutrition <you>",
    body: "Every tag's level. Eat the tomato and run it again. On Premium, set a tag to 0 with set and wait for the onset message to see illness work.",
  },
  {
    name: "ANIMALS",
    icon: "fa-solid fa-cow",
    accent: "amber",
    cmd: "/ft give animal_feed 8",
    body: "Feed a cow, then /ft store animals. It is tracked from that first feeding, with a feed score and the grade it is heading for.",
  },
  {
    name: "DISHES",
    icon: "fa-solid fa-bowl-food",
    accent: "green",
    cmd: "/ft recipes",
    body: "Two to four Farm Tales ingredients and a bowl in a crafting grid. The dish names itself from what went in and takes the grade of its worst ingredient.",
  },
  {
    name: "TREES",
    icon: "fa-solid fa-tree",
    accent: "lime",
    cmd: "/ft give lemon seed",
    body: "Plant it and the plugin builds the tree, trunk and canopy. Harvest by breaking a leaf; it grows straight back. Never replanted.",
  },
  {
    name: "STORAGE (PREMIUM)",
    icon: "fa-solid fa-box-open",
    accent: "purple",
    cmd: "/ft give good_beef produce 4",
    body: "Put beef in a chest alone, beef with a snowball, and beef with blue ice, and come back. One rots, one is held, one dry-ages.",
  },
];

/** What goes wrong on the first evening, and the answer. */
export const Troubleshooting = [
  {
    q: "The console says Ambiguous plugin name",
    a: "Both jars are in plugins/. Remove one. Both read the same folder, so nothing is lost by swapping.",
    accent: "rose",
  },
  {
    q: "UnsupportedClassVersionError at load",
    a: "The jar is Java 11 bytecode. A 1.16.5 server on Java 8 refuses it. Run that server on Java 11 or 16. Java 17 and newer need nothing.",
    accent: "amber",
  },
  {
    q: "Five entries were skipped on 1.16.5",
    a: "Correct, and nothing is wrong. daikon, okra, squash_blossom, moonberry and mangrove_plum ride items that arrived after 1.16.5. The console names each one. A 26.2 server loads all 134.",
    accent: "sky",
  },
  {
    q: "My seed will not plant",
    a: "Seeds made before 1.0.0's planting fix do not plant. Give fresh ones. Produce does not plant either, only seeds, and only on farmland.",
    accent: "green",
  },
  {
    q: "Bone meal does nothing",
    a: "Bone meal is refused on a Farm Tales crop, and it says so. Water it and fertilize it (Premium) instead.",
    accent: "lime",
  },
  {
    q: "I cannot brew beer",
    a: "An old catalog/ copy from before fermentation has no barley, oats, malt or hops. Delete catalog/ on a major update and it is regenerated. Your own custom.yml is untouched.",
    accent: "purple",
  },
  {
    q: "Recipes did not change after /ft reload",
    a: "Bukkit cannot replace a registered recipe in place. Any recipe: block and PlaceholderAPISupport take a restart. Everything else reloads.",
    accent: "amber",
  },
];

/** The PlaceholderAPI table, from docs/placeholders.md. Both editions. */
export const Placeholders = [
  { name: "%farmtales_edition%", value: "Premium or Lite" },
  { name: "%farmtales_version%", value: "The plugin version" },
  { name: "%farmtales_nutrition_status%", value: "healthy, low, deficient or severely deficient" },
  { name: "%farmtales_nutrition_<tag>%", value: "One nutrient's current amount, any tag id from nutrition-tags.yml" },
  { name: "%farmtales_disease%", value: "The active illness, or the none label" },
  { name: "%farmtales_disease_severity%", value: "Its severity, or 0" },
  { name: "%farmtales_crops_planted%", value: "Crops this player has ever planted" },
  { name: "%farmtales_crops_harvested%", value: "Crops this player has ever harvested" },
  { name: "%farmtales_animals_tracked%", value: "Animals this player has brought into tracking" },
  { name: "%farmtales_codex_progress%", value: "Completion percentage, rounded down" },
  { name: "%farmtales_codex_discovered%", value: "Entries discovered" },
  { name: "%farmtales_codex_total%", value: "Entries that count in this edition" },
];

/**
 * The resource pack zips, one per Minecraft version per edition, from the
 * pack formats table in docs/resource-pack.md. The format is read out of
 * that version's own version.json, and /ft pack reads the same file off the
 * running server to say which zip it wants.
 */
export const PackBuckets = [
  { bucket: "1.16.5", format: "6", profile: "legacy" },
  { bucket: "1.20.4", format: "22", profile: "legacy" },
  { bucket: "1.21.1", format: "34", profile: "legacy" },
  { bucket: "1.21.5", format: "55", profile: "modern" },
  { bucket: "26.2", format: "88.0", profile: "modern" },
];

/**
 * Known limits, stated up front, from releases/1.0.0-release.md. Every one
 * is a decision on this side.
 */
export const KnownLimits = [
  {
    title: "The item art is placeholder art",
    accent: "amber",
    body: "Generated: the right colour and the right silhouette per entry, and it will be replaced by drawn art in a later release without any id changing. Items in chests will simply look better after the update.",
  },
  {
    title: "Five entries are skipped on 1.16.5",
    accent: "sky",
    body: "daikon, okra, squash_blossom, moonberry and mangrove_plum ride base items that did not exist yet. The console names them. Nothing else is lost on an old server.",
  },
  {
    title: "The crafting and fermentation numbers are a first guess",
    accent: "purple",
    body: "Everything is in config.yml with a comment. If a wine ages too fast or a dish pays too much on your server, the number is yours to move.",
  },
];

/** The reasons to buy Premium over Lite, in the order they matter. */
export const PremiumReasons = [
  {
    icon: "fa-solid fa-layer-group",
    accent: "green",
    title: "FOUR TIMES THE CATALOG",
    body: "All 134 entries instead of 34. Every tree fruit, every berry, every root, and thirty meat grades across five animals. On Lite the other 100 sit greyed in the codex.",
  },
  {
    icon: "fa-solid fa-star",
    accent: "amber",
    title: "THE WHOLE GRADE LADDER",
    body: "Lite caps at Good. Premium runs Spoiled, Tough, Common, Good, Prime and Exquisite, and it is the top two that make tending a field worth the effort.",
  },
  {
    icon: "fa-solid fa-flask",
    accent: "lime",
    title: "FERTILIZER",
    body: "Three tiers. Each speeds a crop up and biases the quality roll toward the top. Reapplying refreshes rather than stacks, and a higher tier replaces a lower one.",
  },
  {
    icon: "fa-solid fa-heart-pulse",
    accent: "rose",
    title: "ILLNESS",
    body: "Nutrition means something. Go deficient and you fall ill in three stages, with the effects you choose per stage, cleared by a proper meal.",
  },
  {
    icon: "fa-solid fa-wine-bottle",
    accent: "purple",
    title: "ROT, AGING, WINE AND BEER",
    body: "Meat rots in a chest, a snowball holds it, blue ice dry-ages it over twenty days. Fruit and grain ferment into young, mature and vintage drinks.",
  },
  {
    icon: "fa-solid fa-sliders",
    accent: "sky",
    title: "THE ADMIN MENU",
    body: "Every number in config.yml and every field on every catalog entry from a chest window, written back with every comment intact, every edit logged.",
  },
];

/** Real screenshots. `wide` ones go on the page, the rest in the gallery. */
export const Screenshots = [
  {
    key: "crop-ready",
    src: Screens.cropReady,
    accent: "green",
    title: "A FIELD, READY",
    caption:
      "Arugula and broccoli on farmland beside a river. The label above each crop says how far along it is, how long is left, and its water level out of five. The arugula is ready to pick.",
    wide: true,
  },
  {
    key: "planting",
    src: Screens.plantingCrops,
    accent: "lime",
    title: "PLANTING",
    caption:
      "Right-click farmland with a Farm Tales seed. The crop rides a vanilla crop block for its shape; what is actually planted there is tracked by the plugin.",
    wide: true,
  },
  {
    key: "deficiency",
    src: Screens.proteinDeficiency,
    accent: "rose",
    title: "GOING HUNGRY",
    caption:
      "/ft nutrition with four tags deficient, and the onset message: mild Protein deficiency. The debuff shows in the vanilla effect list under a vanilla name, and the chat line explains it.",
    wide: true,
  },
  {
    key: "dish",
    src: Screens.craftingDish,
    accent: "amber",
    title: "A WELL BALANCED DISH",
    caption:
      "Blueberry, Mulberry and Shallot in a crafting grid. The dish names itself from what went in, sums the nutrition, takes the lowest grade among its ingredients, and this one earns the Well balanced bonus for covering five food groups.",
    wide: true,
  },
  {
    key: "harvested",
    src: Screens.harvestedExquisite,
    accent: "amber",
    title: "AN EXQUISITE HARVEST",
    caption: "The produce item in hand: name, grade colour, and the nutrition its lore quotes, already scaled by the grade.",
  },
  {
    key: "good-beef",
    src: Screens.goodBeef,
    accent: "amber",
    title: "GOOD BEEF",
    caption: "Dropped by a tracked cow. Grade colour, tier name, and the nutrition the grade scaled.",
  },
  {
    key: "animal-feed",
    src: Screens.animalFeed,
    accent: "lime",
    title: "ANIMAL FEED",
    caption: "Crafted from what you grew, with the feed quality its lore quotes. Feeding with it is what starts tracking an animal.",
  },
  {
    key: "aged-beef",
    src: Screens.agedBeef,
    accent: "purple",
    title: "DRY-AGED, 10 DAYS",
    caption: "Good Beef left in a chest with blue ice. Still Good, now Aged 10 Days, and worth more for it. Premium.",
  },
  {
    key: "rotten-beef",
    src: Screens.rottenBeef,
    accent: "rose",
    title: "ROTTEN",
    caption: "The same beef left in a chest with nothing. Meat rots on a clock you set. Premium.",
  },
  {
    key: "grilling",
    src: Screens.grillingBeef,
    accent: "amber",
    title: "GRILLING",
    caption: "Graded beef on a campfire. Cooking keeps the grade rather than destroying it; a furnace refuses to smelt a graded crop into dye.",
  },
  {
    key: "codex",
    src: Screens.codex,
    accent: "sky",
    title: "THE CODEX, THREE PAGES SIDE BY SIDE",
    caption:
      "Vegetables, fruits and meat grades from /ft codex, every entry drawn as its own item with the resource pack on. Fifty-four vegetables and fifty fruits over two pages each, thirty meat grades on one.",
    wide: true,
  },
  {
    key: "codex-menu",
    src: Screens.codexMenu,
    accent: "sky",
    title: "THE CODEX MENU",
    caption: "/ft codex. Vegetables, fruits, meat grades and recipes, with your discovery progress.",
  },
  {
    key: "dish-beef",
    src: Screens.craftingDishBeef,
    accent: "amber",
    title: "A DISH WITH MEAT IN IT",
    caption:
      "Eggplant and Good Beef in the same grid. The dish takes the grade of the beef, its worst ingredient, so a Spoiled cut would spoil the whole plate.",
  },
  {
    key: "codex-fruits",
    src: Screens.codexFruits,
    accent: "sky",
    title: "FRUITS, PAGE ONE",
    caption: "Fifty fruits over two pages, each drawn as its own item with the resource pack on. Hover for how it grows and where its seed comes from.",
  },
  {
    key: "codex-vegetables",
    src: Screens.codexVegetables,
    accent: "green",
    title: "VEGETABLES",
    caption: "Fifty-four vegetables. On Lite this same page shows all of them with the premium ones greyed and marked.",
  },
  {
    key: "codex-meat",
    src: Screens.codexMeat,
    accent: "rose",
    title: "MEAT GRADES",
    caption: "Thirty entries on one page. Six grades of one animal share a drawing; what separates Spoiled Chicken from Exquisite is the colour scale.",
  },
  {
    key: "recipes",
    src: Screens.recipes,
    accent: "lime",
    title: "THE RECIPE BROWSER",
    caption: "/ft recipes. Everything Farm Tales makes craftable, read from the server's own recipe book rather than a list.",
  },
  {
    key: "recipe-hoe",
    src: Screens.recipeHoe,
    accent: "lime",
    title: "THE CULTIVATOR'S HOE",
    caption: "The shape in the grid, the result, and lore generated from the tool's config: harvests faster, quality bias. It rides a real diamond hoe and keeps its durability.",
  },
  {
    key: "wine",
    src: Screens.wineRecipe,
    accent: "purple",
    title: "WINE",
    caption: "The process page in the recipe browser. The grade picks which effects you get, the tier picks how strong. A well-graded wine gets better with age; a badly graded one gets worse. Premium.",
  },
  {
    key: "beer",
    src: Screens.beerRecipe,
    accent: "amber",
    title: "BEER",
    caption: "Two brewing grains make a wort; sugar in the same container turns it into beer. Barley, oats, malt and hops are the brewing crops. Premium.",
  },
  {
    key: "wine-beer-process",
    src: Screens.wineAndBeerProcess,
    accent: "purple",
    title: "MUST TO WINE, WORT TO BEER",
    caption:
      "The same chest before and after. Banana Must, Good, unfermented; twenty days later, Vintage Fruit Wine, still Good. Barley Wort, Common; then Vintage Fruit Beer, still Common. The sugar in the first slot is what makes the chest a fermenter, the days decide the tier, and the grade you put in is the grade you get out. Premium.",
  },
  {
    key: "dry-aging",
    src: Screens.dryAgingRecipe,
    accent: "sky",
    title: "DRY-AGING",
    caption: "The third process page. Blue ice in the chest turns rot into aging, three tiers over twenty days. Premium.",
  },
  {
    key: "smoothie",
    src: Screens.bananaSmoothie,
    accent: "green",
    title: "A SMOOTHIE",
    caption: "One fruit, a glass bottle and a snowball. Smoothies are in both editions.",
  },
  {
    key: "admin-main",
    src: Screens.adminMain,
    accent: "amber",
    title: "THE ADMIN MENU",
    caption: "/ft admin on 26.2. The three catalog doors and the way into the global settings. Premium.",
  },
  {
    key: "admin-global",
    src: Screens.adminGlobal,
    accent: "amber",
    title: "GLOBAL SETTINGS",
    caption: "Every config section, one door each. Numbers are clicked up and down, switches toggled, and the file is written back with every comment intact.",
  },
];
