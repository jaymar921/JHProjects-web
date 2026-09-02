/**
 * The release history for Kumandra's Economy, newest first.
 *
 * Same shape as CE3Constants_Logs.js. An entry with no `release_date` is still
 * in development and renders with the IN DEV badge instead of a date.
 *
 * The entries below are taken from the plugin source own version history, so
 * nothing here claims a change that was not actually made.
 */

export const Kumandra_Logs = [
  {
    update_version: "2.1",
    release_date: "09/02/2026",
    changes: [
      {
        update: "Read this first",
        sublist: [
          "A smaller release than 2.0. This is the Custom Enchantments 3 one",
          "If you run both plugins, CE3 1.6.0 already talks to Kumandra's Economy 2.0 and works. Nothing here is a repair of that. What 2.1 does is finish the job from this side",
          "If you do not run Custom Enchantments 3, the only thing here that affects you is the transaction list, which works on its own",
          "Drop the new jar in. There is no config change and no data migration, and every method from 1.x and 2.0 keeps its exact signature and return values",
          "New lang.yml keys fall back to English, so your existing lang.yml renders the new lines correctly rather than showing the word null. Add them if you translate",
        ],
      },
      {
        update: "Two currencies, one balance screen",
        sublist: [
          "A player on a server running both plugins has two wallets and has had one balance screen. /kumandra balance listed Custom Enchantments as a supported plugin: the name, and not the number, which is the less useful half of that information",
          "The CE3 balance now sits directly under the Kumandra one, with CE3's own configured currency sign, so a renamed currency shows up renamed",
          "With CE3 not installed the line is simply not there, and the screen looks exactly as it did in 2.0",
        ],
      },
      {
        update: "/kumandra convert [amount]",
        sublist: [
          "Buys Custom Enchantments currency with Kumandra currency. The amount is named in CE3's currency, the same way CE3's own exchange screen asks for it, so you always end up with a whole number of coins rather than whatever your Kd divides into",
          "It does not do its own arithmetic. It calls the conversion inside Custom Enchantments 3, so the rate, the fee, the supply cap and the refund when a purchase fails all stay in CE3's config. Converting through this command and converting through CE3's screen are the same code path, and cannot drift apart when you change a number",
          "If CE3 is not installed, the command says so. If you have switched conversion off in CE3's config, the command says that instead of failing silently",
          "New permission node kumandraseconomy.kumandra.convert, default true",
        ],
      },
      {
        update: "Where did my money go",
        sublist: [
          "Money that left an account through the API left it smaller and left nothing behind to say why. If another plugin charged your players, you could see the balance drop and that was it",
          "/kumandra balance has a Recent Movements panel now, showing the last six movements on your account, what each was for, and how long ago it happened",
          "Callers that do not say what they were doing are named anyway. Every integration written against the 2.0 API calls a two-argument withdraw and has no way to pass a reason, CE3 1.6.0 included, so the plugin works out which plugin is on the other end of the call and files the movement under that plugin's name. Attribution works today rather than after every integration ships an update",
          "Plugins can do better than that if they want to. There are new overloads that take a reason string, and it is shown instead of the plugin name",
          "What is in the list: everything through KumandrasAPI, everything through Vault, and /kumandra pay and /kumandra economy. What is deliberately not: job wages, because they land a few coins at a time on every block you break and six of them would push everything worth reading off the list before you got back from mining",
          "The list holds twenty movements per account, lives in memory, and starts empty after a restart. It answers where your money just went, which needs the last handful and nothing older. It is not an audit log and it is not trying to be one",
        ],
      },
      {
        update: "For plugin developers",
        sublist: [
          "getApiVersion() returns 2. Check it once instead of probing for methods, and treat its absence as 1.x, before the UUID overloads existed. It returns 2 for both 2.0 and 2.1 because the contract did not change shape",
          "deposit(UUID, double, String) and withdraw(UUID, double, String) behave exactly as the two-argument forms and additionally say what the movement was for",
          "getRecentTransactions(UUID) reads the list back, as an unmodifiable snapshot that is never null",
          "getCustomEnchantmentsBalance(Player) and getCustomEnchantmentsCurrencySign() read CE3's currency for display, and return null when CE3 is absent",
          "The developer guide has a new section on the CE3 integration: which nine methods CE3 resolves reflectively and why changing any of them would silently switch the integration off, that CE3 calls on the main thread, and why CE3 never turns Kumandra money into its own currency out of nothing",
        ],
      },
      {
        update: "Notes",
        sublist: [
          "CE3's currency stays in CE3. It is capped at 1,250,000 with a price curve driven by circulation. This plugin reads that balance for display and asks CE3 to move it. It never holds a copy, because a cap that two plugins both enforce is a cap that neither enforces",
          "Nothing here can break your startup. Every CE3 lookup resolves by name, once, through CE3's own class loader, and is allowed to fail. A future CE3 that renames something costs you a line on the balance screen and a message from the command, not an exception on a screen a player just opened",
          "Both plugins are still standalone. Neither depends on the other, and neither has a type from the other in its jar. That is deliberate on both sides",
          "Still one jar for 1.16 through 26.2, still Java 8 bytecode, still no hard dependency on anything",
        ],
      },
    ],
  },
  {
    update_version: "2.0",
    release_date: "08/26/2026",
    changes: [
      {
        update: "One jar, 1.16 through 26.2",
        sublist: [
          "Version detection now parses the version as numbers and compares them. The old check asked whether the version text contained \"1.16\", \"1.17\" or \"1.18\", which a 1.19 server matches none of, so on anything newer the plugin decided it was older than 1.16",
          "That silent misdetection had switched off the entire quest system, nether logs for the Lumberjack and the Fisherman's rare catches, with nothing in the console to say so. If you were on 1.19 or newer, expect quests to start appearing after the upgrade",
          "Java 8 and up, so a 1.16 server on Java 8 and a 26.2 server on Java 25 both load the same file",
          "Tested on Spigot 26.2 standalone, with Vault and no other economy, with Vault and Kumandra registered as primary, and with Custom Enchantments 3 installed. The same sources are compile-verified against the 1.16.5 API on every release build",
        ],
      },
      {
        update: "Vault is optional",
        sublist: [
          "Vault moved from a hard dependency to an optional one. With it installed nothing changes; without it everything works except cross-economy exchange, which needs a second economy to exchange with anyway",
          "If Separate_Economy is true but nothing has registered a primary economy, the plugin says so in the console and runs as primary for that session instead of half-working in silence",
        ],
      },
      {
        update: "The Vault provider was rewritten",
        sublist: [
          "format() returned null, so shop plugins printed prices as the word \"null\". It returns a formatted string with your currency suffix now",
          "createPlayerAccount() always returned false, so plugins that create an account and then pay concluded the economy had refused the player",
          "Bank methods returned null instead of a not-supported response, which is a crash in any plugin that reads the result",
          "Balance lookups by world returned zero when the player stood in a different world. Balances here are server-wide, so money appeared to vanish through a nether portal",
          "Player lookup by name used a Java assert for its null check. Assertions are off on a live server, so an offline or misspelled name threw into whichever plugin had called Vault",
        ],
      },
      {
        update: "Jobs",
        sublist: [
          "Ore income never worked. The default ore list was being appended to the mining-block list, so the ore list started empty and every ore paid the plain-block rate",
          "Builder income read the wrong config key and could silently be zero",
          "VillagerRadius had been in config.yml all along and was never read. Guardian always used a hard-coded 20 blocks",
          "Every job timer was running seven times over, because the timers started from a constructor all seven job listeners call. The action bar was written seven times a tick and income expired seven times faster than intended",
          "Job listeners no longer crash for a player whose record has not loaded yet, such as a first join on a database-backed server or a mid-session reload",
        ],
      },
      {
        update: "Custom Enchantments 3 integration",
        sublist: [
          "CE3 is detected at startup and listed as an integration on the balance screen",
          "The Custom Enchantments quest pack that has always shipped inside the jar finally loads, but only when CE is actually installed, so quests can hand out CE gear again",
          "Not one line of CE code is imported, so a CE update cannot break this plugin's startup",
        ],
      },
      {
        update: "Storage and data safety",
        sublist: [
          "MySQL Connector/J updated to 26.7.0, bundled in the jar and relocated into the plugin's own package so it cannot collide with another plugin's copy",
          "Connections are closed on every path, values go through prepared statements instead of concatenated SQL, and saves are one batched write instead of a round trip per player",
          "A failed database save now reports failure and falls back to local storage. Before, it could be reported as successful and the data went nowhere",
          "A whole-number balance in playerData.yml used to throw a type error and take every player's record with it. Both 500 and 500.0 are read now",
          "Config upgrades read from the plugin's real data folder instead of a hard-coded path, index your settings by key, carry list settings across as whole blocks, and keep the comments in the shipped config intact",
        ],
      },
      {
        update: "Trading, delivery and the rest",
        sublist: [
          "Trade sessions leaked. Expiry cleared one map and closing the window cleared a different one, so the trade inventory, the participant list and both sides' trade data stayed in memory for the server's whole uptime. It is all torn down together now",
          "Delivery cleanup on shutdown stopped at the first courier whose chunk had unloaded, leaving every courier after it standing in the world as a named animal with no AI. Shutdown steps are independent now, so a problem saving shop data no longer skips entity cleanup and the Vault unhook",
          "/kumandra economy runs from the console",
          "Player lookup no longer walks every player who has ever joined the server, and no longer crashes on an unresolved entry",
          "Missing translation keys show readable English instead of the word \"null\"",
          "Deposits and withdrawals refuse negative and non-finite amounts, and the update checker has proper timeouts",
          "Material names in the config are matched properly, and a name your server does not have is named in the log instead of being dropped silently",
        ],
      },
      {
        update: "Developer API",
        sublist: [
          "Every 1.x method keeps its signature and return values. Code compiled against 1.7 links against 2.0 unchanged",
          "getJobs(Player) no longer throws for a player with no record, or for a job name it does not recognise",
          "New: offline-capable UUID balance methods, an all-or-nothing transfer, setBalance, hasAccount, createAccount, hasJob, and accessors for the currency prefix, the exchange rate, the foreign economy name and the detected server version",
          "A full guide now lives in the repository at docs/developer-api-guide.md",
        ],
      },
    ],
    note: "Upgrading is a jar swap and a restart. config.yml is upgraded in place and backed up as old_config.yml first; playerData.yml and shop data are unchanged in format.",
  },
  {
    update_version: "1.7",
    release_date: "06/26/2022",
    changes: [
      {
        update: "The last of the 1.x line",
        sublist: [
          "The final release of the 1.16 to 1.19 line, and what every server ran until 2.0",
          "Balances, Vault exchange, trading, deliveries, jobs, quests, public shops and MySQL storage were all in this build. What 2.0 changed is how much of it actually ran on a modern server",
        ],
      },
    ],
  },
  {
    update_version: "1.6",
    release_date: "06/23/2022",
    changes: [
      {
        update: "Maintenance release",
        sublist: [
          "Fixes and tidying ahead of 1.7, three days later",
        ],
      },
    ],
  },
  {
    update_version: "1.5",
    release_date: "03/31/2022",
    changes: [
      {
        update: "1.18 support",
        sublist: [
          "Quests were enabled for Minecraft 1.18",
          "The Custom Enchantments quest set was taken back out, so the plugin no longer expects another plugin to be installed for its quests to work",
        ],
      },
      {
        update: "Command registration",
        sublist: [
          "registerCommands was reworked in December 2021, which is what the March release was built on",
        ],
      },
    ],
  },
  {
    update_version: "1.4",
    release_date: "11/26/2021",
    changes: [
      {
        update: "The API grew",
        sublist: [
          "primaryEconomy() was added, so a plugin can ask whether Kumandra's Economy is the server's main currency before it does anything",
          "getJobs(Player) was added, returning the jobs a player currently holds",
        ],
      },
      {
        update: "Language files",
        sublist: [
          "Lang.yml landed, moving player facing text out of the code",
          "A Turkish translation was added alongside English",
        ],
      },
      {
        update: "Build",
        sublist: ["The POM was reworked over several passes during November"],
      },
    ],
  },
  {
    update_version: "1.2",
    release_date: "10/04/2021",
    changes: [
      {
        update: "Fixes",
        sublist: [
          "Disabling quests actually disabled them. AllowQuest: false was being ignored",
          "config.yml gained an auto update, so a new key added by a release appears in your existing file instead of quietly using its default",
        ],
      },
    ],
  },
  {
    update_version: "1.1",
    release_date: "09/30/2021",
    changes: [
      {
        update: "MySQL",
        sublist: [
          "Database storage was implemented, using MySQL Connector/J. The plugin creates its own database and player_data table on first connect",
          "Local YAML remains the default and the fallback, so nothing breaks if the database is unreachable",
        ],
      },
      {
        update: "Content",
        sublist: ["Five more quests were added"],
      },
    ],
  },
  {
    update_version: "1.0",
    release_date: "09/12/2021",
    changes: [
      {
        update: "The systems release",
        sublist: [
          "Public shops were added, with the keeper entity, the cloned chest layout and the chat driven pricing flow",
          "Quests were added, both the villager and the animal kind, with item, money and XP rewards",
          "Jobs were added: Farmer, Lumberjack, Miner, Hunter, Guardian, Builder and Fisherman",
          "An update checker and a version checker were added, so the console says when a newer build is on Spigot",
          "The trading GUI was reworked and the villager entity added",
        ],
      },
    ],
  },
  {
    update_version: "0.9",
    release_date: "08/25/2021",
    changes: [
      {
        update: "Delivery and trading went live",
        sublist: [
          "The delivery handler became fully functional, with four courier entities carrying parcels between players",
          "The trading handler became fully functional, with its own listener and tab completion",
          "Vault support was reworked and config.yml took its current shape",
        ],
      },
    ],
  },
  {
    update_version: "0.1",
    release_date: "08/19/2021",
    changes: [
      {
        update: "The first build",
        sublist: [
          "The plugin skeleton, the data handler and the first version of the API",
        ],
      },
    ],
  },
];
