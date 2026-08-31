/**
 * Everything the Custom Warps page reads.
 *
 * Same shape as KumandraConstants.js: one PluginInformation object for the
 * copy and the links, then a named export per list the page renders.
 *
 * This one is different in a single important way. Custom Warps is archived:
 * the source code is gone, so nothing here is a promise about a future
 * release. Every number and command below is taken from the Spigot listing as
 * it stood when the plugin was last updated, in August 2021.
 */

import icon from "../../../assets/legacy/custom_warps/icon.jpg";
import configShot from "../../../assets/legacy/custom_warps/config.jpeg";
import guiShot from "../../../assets/legacy/custom_warps/gui.jpeg";
import delayShot from "../../../assets/legacy/custom_warps/delays.png";

export const PluginInformation = {
  title: "Custom Warps",
  subtitle: "Forty warps, one GUI, no config file to hand edit.",
  tagline: "The warp menu that was built entirely from in-game commands.",

  icon,
  version: "1.16 - 1.18 build",
  versionReleaseDate: "08/17/2021",
  firstReleaseDate: "07/04/2021",
  supportedVersions: "1.16 - 1.18",
  spigotResourceId: 93878,
  maxWarps: 40,
  releaseCount: 4,
  price: 0,
  free: true,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  downloadLink:
    "https://www.spigotmc.org/resources/%E2%9C%AFcustom-warps-1-16-1-18-%E2%9C%AF.93878/",
  discussionLink: "https://www.spigotmc.org/resources/93878/",

  /**
   * The honest position on this plugin, shown at the top of the page. It is
   * archived, not paused: the source is gone and there is no build in progress.
   */
  archived: {
    headline: "Archived. Still on Spigot, no longer maintained.",
    body: "Custom Warps was last updated on 17 August 2021, for Minecraft 1.16 through 1.18. The jar is still on the Spigot listing and still installs on a server of that era, but the source code for it is gone, so there is no patch coming and no port to a newer version. It is kept here as a record of what it did and how it worked.",
    rebuild:
      "If it is ever rebuilt it will be from scratch rather than recovered, and that is not planned for now. The design below is the part worth keeping: an admin GUI that was configured entirely from in-game commands, at a time when almost every warp plugin of its size wanted you to edit a YAML file by hand.",
  },

  description:
    "Custom Warps gave a single-world server a warp menu that anyone could open with one command, and that an admin could build without ever opening a config file. Up to forty destinations, each one an item you were holding, named in the colour you chose, pointing at the exact spot you were standing on when you set it.",
  descriptionMore: [
    "The trick was that the GUI was the config. You opened the developer view, saw the slot number of every space in the inventory, and then addressed those slots directly: put the item you are holding into slot 12, rename it, set its location to where you are standing, save. No indentation to get wrong, no reload to fumble, and no restart to see whether it worked.",
    "Warp delays were part of it too, so a server could make travel cost time rather than nothing at all, and the row count, menu title and colour were the only things you ever needed the config.yml for.",
    "It was written for single-world servers on purpose. That kept the location handling simple and the plugin small, which is why it was free and why it never grew past the one job it did.",
  ],

  /** What the plugin actually shipped, as feature panels. */
  highlights: [
    {
      key: "gui",
      title: "One command for players",
      icon: "fa-solid fa-compass",
      accent: "violet",
      description:
        "Everyone on the server got /warps. It opened the menu, they clicked a destination, they travelled. There was nothing else for a player to learn.",
    },
    {
      key: "slots",
      title: "Forty warp slots",
      icon: "fa-solid fa-table-cells",
      accent: "purple",
      description:
        "Up to forty destinations depending on how many rows you gave the menu. Each slot held its own icon, its own name and its own location.",
    },
    {
      key: "in-game",
      title: "Built from in-game commands",
      icon: "fa-solid fa-terminal",
      accent: "sky",
      description:
        "Every warp was set with a command while standing in the world. /warp display showed you the slot numbers, and the rest was addressing those slots.",
    },
    {
      key: "icons",
      title: "Any item as an icon",
      icon: "fa-solid fa-cube",
      accent: "amber",
      description:
        "Hold a block, assign it to a slot, and that block became the button. Later releases added the enchanted glint so a warp could stand out.",
    },
    {
      key: "colours",
      title: "Coloured, bold names",
      icon: "fa-solid fa-palette",
      accent: "rose",
      description:
        "Fifteen Minecraft colours to name a warp in, and a BOLD style for the server name at the top of the menu.",
    },
    {
      key: "delays",
      title: "Warp delays",
      icon: "fa-solid fa-hourglass-half",
      accent: "teal",
      description:
        "A countdown before the teleport fires, set in config.yml, so travel cost something. Useful on a PvP server where instant escape is the problem.",
    },
  ],

  /** The full command list, as documented on the listing. */
  commands: [
    {
      command: "/warps",
      description: "Open the warp menu. Every player on the server can use it.",
      requireOp: false,
    },
    {
      command: "/warp display",
      description:
        "Turn on the developer view, which labels every inventory space with its slot number. Resets on reload or restart.",
      requireOp: true,
    },
    {
      command: "/warp modify slot [slot] item",
      description:
        "Set the icon of a slot to the item currently in your hand.",
      requireOp: true,
    },
    {
      command: "/warp modify slot [slot] name [color] [name]",
      description:
        "Rename a warp icon, in any of the fifteen supported Minecraft colours.",
      requireOp: true,
    },
    {
      command: "/warp modify slot [slot] location set",
      description:
        "Point a slot at the exact spot you are standing on right now.",
      requireOp: true,
    },
    {
      command: "/warp modify slot [slot] location remove",
      description: "Clear the destination from a slot, leaving the icon.",
      requireOp: true,
    },
    {
      command: "/warp reset slot [slot]",
      description: "Wipe a slot completely, both its icon and its location.",
      requireOp: true,
    },
    {
      command: "/warp save",
      description:
        "Write every change to disk. Nothing survived a restart without it.",
      requireOp: true,
    },
  ],

  /** The colours a warp name could be given. Straight from the listing. */
  colors: [
    "AQUA",
    "BLACK",
    "BLUE",
    "DARK_AQUA",
    "DARK_BLUE",
    "DARK_GRAY",
    "DARK_GREEN",
    "DARK_PURPLE",
    "DARK_RED",
    "GOLD",
    "GRAY",
    "LIGHT_PURPLE",
    "RED",
    "WHITE",
    "YELLOW",
  ],

  /** The four-step setup, the way it was actually done in game. */
  setup: [
    "Run /warp display to see the slot number of every space in the menu.",
    "Hold the block you want as the button, then /warp modify slot [slot] item.",
    "Name it with /warp modify slot [slot] name [color] [name].",
    "Stand where the warp should land and run /warp modify slot [slot] location set.",
    "Run /warp save. Skip this one and the whole session is lost on restart.",
  ],

  screenshots: [
    {
      src: configShot,
      alt: "The Custom Warps config.yml",
      caption: "config.yml held the row count, menu title, colour and delays. Nothing else.",
    },
    {
      src: guiShot,
      alt: "A Custom Warps menu built in game",
      caption: "The menu itself, built slot by slot without touching a file.",
    },
    {
      src: delayShot,
      alt: "Warp delay countdown",
      caption: "A delay before the teleport fired, so travel was not free.",
    },
  ],
};
