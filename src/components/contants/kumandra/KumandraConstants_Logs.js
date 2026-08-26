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
    update_version: "Next",
    release_date: null,
    changes: [
      {
        update: "What is being worked on",
        sublist: [
          "Support for Minecraft 1.20 and newer. The plugin was written on the plain Spigot API with no NMS, no packet work and no reflection into server internals, so bringing it forward is mostly material lists and deprecated API calls rather than a rewrite",
          "Trade sessions and in-flight deliveries that survive a reload. Both are held in memory today, so a badly timed restart can leave a stale request or an abandoned courier behind",
          "Shops identified by a real id instead of by looking for a nearby entity with a matching name. Two shops built close together, or a keeper that gets moved, can currently confuse the lookup",
          "Quest authoring from in game, using the same chat driven flow the shops already use, instead of hand editing Data/Quest.yml with exact indentation",
          "One place that validates every balance change, so negative amounts, missing accounts and duplicate payouts are caught in a single spot rather than in each command",
          "More languages. Every player facing string already runs through lang.yml and Turkish ships alongside English, so a new language is a file, not a code change",
        ],
      },
    ],
    note: "No release date yet. This list is what is being worked on, not a promise of what lands together.",
  },
  {
    update_version: "1.7",
    release_date: "06/26/2022",
    changes: [
      {
        update: "The current build",
        sublist: [
          "The last release of the 1.16 to 1.19 line, and the one on the Spigot listing today",
          "Everything the plugin does now is in this build: balances, Vault exchange, trading, deliveries, jobs, quests, public shops and MySQL storage",
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
