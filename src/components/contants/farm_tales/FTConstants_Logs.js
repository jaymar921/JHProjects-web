/**
 * The release history for Farm Tales, newest first.
 *
 * Same shape as EMRConstants_Logs.js, and the Changelog component reads it
 * the same way: an entry with no `release_date` is still in development and
 * renders with the IN DEV badge instead of a date.
 *
 * One entry, 1.0.0, and it is long because it is the whole plugin. The
 * plugin's CHANGELOG.md was written phase by phase as it was built and runs
 * to sixty kilobytes; what is here is the "In one paragraph" summary at the
 * top of that entry, then one line per bullet, grouped the way the file
 * groups them. The wording is the file's own, shortened, never rephrased.
 *
 * 1.0.0 went live on Spigot on 11 September 2026, Lite as resource 138717
 * and Premium as 138718. The `release_date` below is that day.
 *
 * Source of truth: CHANGELOG.md and releases/1.0.0-release.md in the plugin
 * repository. When 1.0.1 ships, add an entry above this one.
 */

export const FT_Logs = [
  {
    update_version: "1.0.0",
    release_date: "2026-09-11",
    changes: [
      {
        update: "In one paragraph",
        sublist: [
          "A farming plugin where how you tend a crop decides what you harvest. 134 catalog entries, 54 vegetables, 50 fruits and 30 meats, every one a vanilla item underneath with its own name, lore, nutrition, codex page and sprite",
          "Crops grow on real time in three forms, a crop on farmland, a bush in a pot, and a tree the plugin builds. They need water, take fertilizer, and are graded at harvest from Spoiled to Exquisite on how they were actually kept",
          "Twelve nutrition tags are filled by eating and drained by time, and going deficient makes a player ill. Five animals are tracked from the first feeding and drop meat at the grade they earned",
          "Dishes take the grade of their worst ingredient, cooking keeps the grade, meat rots or dry-ages in a chest, and fruit and grain ferment into wine and beer that improve with age only if they were good to begin with",
          "A codex, a recipe browser, a chest-menu config editor, PlaceholderAPI, a resource pack generated from the catalog, and a free Lite edition that shows everything the paid one has and greys what it lacks. Every number is in config.yml",
          "Two editions, FarmTales.jar and FarmTales-lite.jar. Spigot 1.16.5 to 26.2 on one jar, Java 11 or newer",
        ],
      },
      {
        update: "Read this first",
        sublist: [
          "Two jars, one in plugins/. They read the same plugins/FarmTales/ folder, so you can swap between them and keep everything. Never put both in",
          "The resource pack is optional and never pushed unless you turn it on. Every item rides a vanilla item and works without it. Run /ft pack and it names the zip you want",
          "Nothing is hardcoded. Every number is in config.yml with a comment, every message in language.yml, every crop in catalog/. /ft reload picks all of it up without a restart, apart from recipes",
          "Tested on Spigot 1.16.5 and 26.2. On 1.16.5, five entries are skipped because their base item did not exist yet, and the console names them",
        ],
      },
      {
        update: "Added: crops, water and grades",
        sublist: [
          "Custom crops can be planted, grown and harvested. Right-click farmland with a Farm Tales seed. Breaking a fully grown crop drops that entry's own produce, tagged with its id, its grade and its nutrition. An eggplant field yields eggplant, not beetroot",
          "Growth runs on elapsed time, not ticks. A server that is running behind grows its crops at the speed you configured",
          "A status label floats above every crop somebody is standing near: the crop, how far along it is, how long is left. TextDisplay on 1.19.4 and newer, an invisible armour stand on older servers",
          "Crops need water, and there is an item for it. The Water Spray is a craftable glass bottle with five charges, refilled free at any water or cauldron. Rain and nearby water count too, and both can be turned off for a server where tending should matter",
          "Water decays, and a dry crop grows slowly. At or below water.dry-threshold it grows at water.dry-growth-multiplier, which can be zero",
          "Fertilizer, in three tiers (Premium). Each speeds a crop up and biases the quality roll. Reapplying refreshes rather than stacks. Fertilizer on a dry crop works, and the dry penalty still applies",
          "Produce is graded on how well it was actually looked after: what fraction of its life it was watered, what fraction it was under fertilizer, and how promptly it was picked once ripe. The score biases the crop's own quality table rather than replacing it, so a naturally poor crop stays poor when perfectly kept",
          "Quality is visible. A dropped item plays its grade's particle, and a growing crop that is heading somewhere poor puffs a quiet warning near a player",
          "Seeds drop from breaking grass, ferns and leaves, at a rate you set once per block rather than once per crop, so adding crops never makes a grass block rain seeds",
          "Three plant forms. Fruit that grows on trees now grows on trees the plugin builds, trunk and canopy, harvested by breaking a leaf that grows straight back. Six berries grow in flower pots. Trees and potted plants are harvested over and over without being replanted",
          "A ripe plant looks ripe from across the field, and a crop's grade is measured per fruiting cycle rather than over the plant's whole life",
        ],
      },
      {
        update: "Added: nutrition and illness",
        sublist: [
          "Eating tracked food feeds a per-player nutrition record across twelve tags. Vanilla food pays nutrition.vanilla-food-profile, which is deliberately not zero: a server where bread counts for nothing should be your decision",
          "Nutrition decays at a rate, not on a timer, so how often the plugin checks does not change the answer. Time spent logged out is charged the same way and capped at three days by default",
          "A player the server has never seen starts fed, at nutrition.starting-amount on every tag",
          "Sustained deficiency makes a player ill (Premium). Mild, moderate, severe, on the windows you configure, ended when the nutrient is back above the clear threshold. Only one illness runs at a time",
          "The debuff is a real vanilla potion effect, and the plugin knows which ones are its own. A weakness potion you drank on purpose is never touched. Effects show under vanilla names, so the explanation is a message in language.yml",
          "Only the nutrients you list in disease.tracked-tags can make anybody ill. It ships with three of the twelve, and the vanilla food profile covers exactly those three, so a player who eats nothing but bread never falls ill on default configuration",
          "Per-nutrient threshold overrides under disease.per-tag, and /ft nutrition <player> to read or drive any of it",
        ],
      },
      {
        update: "Added: animals and meat",
        sublist: [
          "Animals are kept, and their meat is graded. Cow, pig, sheep, chicken and rabbit are tracked from the moment you feed one. What you feed it, how often, and how long it goes hungry each measure different behaviour",
          "What you farm is what you feed: Animal Feed is crafted from Farm Tales produce, and the Herder's Shears make feeding count for more",
          "The grade is a property of the animal, not of who killed it. A Fire Aspect kill drops it cooked at the same grade. Wild animals drop graded meat too, at Common",
          "Eating graded meat does something: meat.tier-effects per grade, in config.yml",
          "Wool, leather, feathers and eggs are untouched",
        ],
      },
      {
        update: "Added: tools, dishes and cooking",
        sublist: [
          "Two crafted tools, the Cultivator's Hoe and the Herder's Shears. Tools are content, not code: their effects and their lore come from config.yml, and a vanilla tool renamed to match is never mistaken for one",
          "Food combining. Two to four ingredients and a bowl in a crafting grid make a dish that names itself from what went in, sums the nutrition, and is graded by its worst ingredient. A vanilla ingredient refuses the craft rather than shortchanging you",
          "Combining will not shadow a vanilla recipe, and the console says which ones it stepped around",
          "Cooking keeps a graded item's identity. A furnace, smoker or campfire cooks graded meat into cooked graded meat, and refuses to smelt a graded crop into dye",
          "Smoothies: one fruit, a glass bottle and a snowball. Both editions",
          "/ft recipes lists everything Farm Tales makes craftable and shows how, read from the server's own recipe book",
        ],
      },
      {
        update: "Added: storage and fermentation (Premium)",
        sublist: [
          "Food left in a container changes over time. Meat rots on a clock you set. A snowball in the chest holds that off. A block of blue ice turns rot into dry-aging, three tiers over twenty days",
          "Four new crops: barley, oats, malt and hops, the brewing grains. brewing: true on any entry, including your own, makes it usable in a wort",
          "Fermentation: two fruit and a water bottle make a must, two brewing grains make a wort, and sugar in the same container turns them into wine and beer, young, then mature, then vintage",
          "Time never changes the grade; it scales the effects the grade fires. A well-made wine improves with age and a badly made one gets worse, and nothing in the config decides which",
          "/ft recipes now shows dry-aging, wine and beer as process pages, and the drinks have their own names and sprites rather than three identical Honey Bottle entries",
        ],
      },
      {
        update: "Added: codex, pack, placeholders, admin menu",
        sublist: [
          "/ft codex is the whole catalog as a book you can read in game, built from the registry every time it opens. An entry's page says how it grows, where the seed comes from, and whether it can go in a dish. Harvesting marks an entry as discovered, and it survives a restart",
          "A resource pack, built from the catalog rather than written by hand, one zip per Minecraft version per edition. The Lite pack contains only what Lite has. Two profiles, legacy and modern, and /ft pack tells you which one your server needs",
          "Every entry has a placeholder texture with the right colour and shape, so the pack works before drawn art exists. A catalog entry can say what colour it is and what shape it is",
          "PlaceholderAPI support on both editions, %farmtales_<name>%, with three lifetime tallies per player: planted, harvested, animals tracked",
          "An admin UI on Premium, /ft admin. Every number in config.yml and every field on every catalog entry from a chest window, validated by the loader before it touches disk, written back with every comment intact, and logged to admin-edits.log",
          "The free edition says what it withholds. Every this-is-Premium message carries the upgrade link, and catalog entries gained a lite key so the split is a fact on the entry rather than a list in code",
        ],
      },
      {
        update: "Fixed, from live servers",
        sublist: [
          "Produce could be planted, and planted anywhere. Only seeds plant now, and only on farmland",
          "A must could never be crafted: the wort recipe was eating every must",
          "The free edition's advert popup almost never appeared, and the free build could hand out entries it says are premium",
          "The back button on the codex status page did nothing",
          "Sounds could stop the plugin loading at all on 1.16.5",
          "Colour codes in a message's placeholders are rendered instead of printed raw, and tab completion works for anything that is not lower case",
          "Bone meal on a Farm Tales crop now actually says so",
          "A tree or a potted plant no longer uproots itself when the ground under it changes",
          "A smoothie made of one fruit crashed every crafting grid",
        ],
      },
      {
        update: "Known limits, stated up front",
        sublist: [
          "The item art is generated placeholder art: the right colour and the right silhouette per entry. It will be replaced by drawn art in a later release without any id changing",
          "On 1.16.5, five entries are skipped because their base item did not exist yet. The console names them",
          "The crafting and fermentation numbers are a first guess. Everything is in config.yml",
        ],
      },
    ],
    note: "Back up plugins/FarmTales/ before any update, and paste /ft info into any bug report.",
  },
];
