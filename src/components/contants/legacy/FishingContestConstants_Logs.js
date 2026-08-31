/**
 * The release history for Fishing Contest, newest first.
 *
 * Same shape as CustomWarpsConstants_Logs.js, and for the same reason there is
 * no undated entry at the top: the plugin is archived, so nothing is in
 * development. Every line comes from the update posts on the Spigot listing.
 */

export const FishingContest_Logs = [
  {
    update_version: "1.5",
    release_date: "08/27/2021",
    changes: [
      {
        update: "The last release",
        sublist: [
          "Fixed a dependency issue that stopped the plugin loading against some economy plugins",
          "This is the jar on the Spigot listing today, and the final one",
        ],
      },
    ],
    note: "Nothing shipped after this. The source code is gone, so this is where the history ends.",
  },
  {
    update_version: "1.4",
    release_date: "08/23/2021",
    changes: [
      {
        update: "Event control",
        sublist: [
          "Server owners can now set the fishing event period themselves",
          "Added a message when a fish is caught during a contest",
        ],
      },
    ],
  },
  {
    update_version: "1.3",
    release_date: "08/18/2021",
    changes: [
      {
        update: "1.17 support",
        sublist: [
          "Updated for Minecraft 1.17",
          "The player in the lead is now notified when somebody overtakes them",
        ],
      },
    ],
  },
  {
    update_version: "1.2",
    release_date: "04/27/2021",
    changes: [
      {
        update: "Language support",
        sublist: [
          "Added language support, picked with a single key in config.yml",
          "Spanish (Española)",
          "Japanese (日本語)",
          "Filipino (Tagalog)",
        ],
      },
    ],
    note: "The translations were never claimed to be perfect, only good enough for a player to follow their own event. Coming from 1.1 meant backing up config.yml and letting the plugin write a new one.",
  },
  {
    update_version: "1.1",
    release_date: "04/26/2021",
    changes: [
      {
        update: "Manual events and quieter chat",
        sublist: [
          "Added /fishstart, so an event could be started by hand instead of waiting for the timer",
          "Sell prices for fish moved into config.yml",
          "Catch messages moved from chat to a subtitle, because on a busy dock they buried every conversation on the server",
          "Selling cut from up to eight lines of chat down to one",
        ],
      },
      {
        update: "Built against",
        sublist: ["Vault 1.7.3-b131", "EssentialsX 2.18.2.0"],
      },
    ],
    note: "Coming from 1.0 meant backing up config.yml and deleting it, so the plugin could write the new format on the next start.",
  },
  {
    update_version: "1.0",
    release_date: "04/26/2021",
    changes: [
      {
        update: "First release",
        sublist: [
          "A server wide fishing contest on a timer, with the first event ten minutes after a restart",
          "/fishtop for the standings and /fishsell to cash in a haul through Vault",
          "/fishconfig to print the live settings in game",
        ],
      },
    ],
  },
];
