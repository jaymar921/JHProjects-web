/**
 * The release history for Custom Warps, newest first.
 *
 * Same shape as KumandraConstants_Logs.js, with one deliberate difference:
 * there is no entry without a release_date. The plugin is archived, so there
 * is nothing in development, and inventing an "IN DEV" row would be a lie.
 *
 * Every line below comes from the update posts on the Spigot listing.
 */

export const CustomWarps_Logs = [
  {
    update_version: "1.16 - 1.17",
    release_date: "08/17/2021",
    changes: [
      {
        update: "The last release",
        sublist: [
          "Support for Minecraft 1.16, alongside the existing 1.17 build",
          "This is the jar on the Spigot listing today, and the final one",
        ],
      },
    ],
    note: "Nothing shipped after this. The source code is gone, so this is where the history ends.",
  },
  {
    update_version: "1.2",
    release_date: "07/05/2021",
    changes: [
      {
        update: "Saving and permissions",
        sublist: [
          "Fixed warp saving, so a configured menu survived a restart properly",
          "Added a permission node, so warp administration no longer required op",
        ],
      },
    ],
  },
  {
    update_version: "1.1",
    release_date: "07/05/2021",
    changes: [
      {
        update: "Menu polish",
        sublist: [
          "Warp icons can now be shown with the enchanted glint",
          "Added /warp reset slot [slot_number], to clear a slot's icon and location in one go",
          "Added the BOLD style for the server name at the top of the menu",
        ],
      },
    ],
  },
  {
    update_version: "1.0",
    release_date: "07/04/2021",
    changes: [
      {
        update: "First release",
        sublist: [
          "A warp menu for single world servers, opened by every player with /warps",
          "Up to 40 warp slots, each with its own item icon, coloured name and location",
          "The whole menu configured from in game commands, with /warp display showing the slot numbers",
          "Warp delays, row count, menu title and colour set in config.yml",
        ],
      },
    ],
  },
];
