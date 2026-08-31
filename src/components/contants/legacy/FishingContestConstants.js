/**
 * Everything the Fishing Contest page reads.
 *
 * Same shape as CustomWarpsConstants.js. This plugin is archived too: the
 * source code is gone, so nothing below describes work in progress. Every
 * number and command is taken from the Spigot listing as it stood at the last
 * update, in August 2021.
 */

import icon from "../../../assets/legacy/fishing_contest/icon.jpg";
import eventShot from "../../../assets/legacy/fishing_contest/event.png";
import sellShot from "../../../assets/legacy/fishing_contest/sell.png";
import configShot from "../../../assets/legacy/fishing_contest/config.png";

export const PluginInformation = {
  title: "Fishing Contest",
  subtitle: "A server-wide fishing event that ran itself.",
  tagline: "Cast, catch, climb the board, sell the haul.",

  icon,
  version: "1.5",
  versionReleaseDate: "08/27/2021",
  firstReleaseDate: "04/26/2021",
  supportedVersions: "1.16 - 1.18",
  spigotResourceId: 90951,
  languageCount: 4,
  releaseCount: 6,
  price: 0,
  free: true,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",

  downloadLink:
    "https://www.spigotmc.org/resources/%E2%98%85fishing-contest-1-16-1-18-%E2%98%85.90951/",
  discussionLink: "https://www.spigotmc.org/resources/90951/",

  archived: {
    headline: "Archived. Still on Spigot, no longer maintained.",
    body: "Fishing Contest reached version 1.5 on 27 August 2021, for Minecraft 1.16 through 1.18. The jar is still on the Spigot listing and still runs on a server of that era, but the source code for it is gone. There is no fix coming and no port to a newer version, and the page below is kept as a record of what it was.",
    rebuild:
      "It could be rebuilt, and it would not be a hard rebuild. It is simply not the project being worked on right now. What is worth remembering is the shape of it: an event that needed no host, no command from staff and no scheduling plugin, on a server where most events needed all three.",
  },

  description:
    "Fishing Contest turned an idle activity into a server event. On a timer you set, everyone fishing at the same moment was suddenly competing: catches counted, a leaderboard tracked who was ahead, the player in front got told when someone passed them, and when it ended you sold the haul for real money through Vault.",
  descriptionMore: [
    "The whole point was that it ran without a host. The first event fired ten minutes after a restart and the rest followed on the day interval in the config, so a server could have a recurring event without anyone remembering to start one. Staff could still trigger one by hand with /fishstart when they wanted to.",
    "Catches showed up as a subtitle rather than in chat, which sounds like a small thing and was not. An earlier build put every catch in the chat log, and on a busy dock it buried every conversation on the server. Selling was compressed the same way, from eight lines down to one.",
    "It shipped in four languages. English, Spanish, Japanese and Filipino, all set from one line in config.yml. The translations were honest about themselves on the listing: not perfect, but enough for a player to follow their own event in their own language, which for a free plugin in 2021 was more than most offered.",
    "It leaned on Vault and EssentialsX for the money side rather than inventing an economy, so whatever your server already paid players in was what a fish was worth.",
  ],

  highlights: [
    {
      key: "event",
      title: "Scheduled contests",
      icon: "fa-solid fa-stopwatch",
      accent: "cyan",
      description:
        "The first event ran ten minutes after a restart, then on the day interval you set. Nobody had to be online to host one.",
    },
    {
      key: "leaderboard",
      title: "Live leaderboard",
      icon: "fa-solid fa-ranking-star",
      accent: "sky",
      description:
        "/fishtop showed the standings during an event, and from 1.4 the player in the lead was told the moment somebody overtook them.",
    },
    {
      key: "sell",
      title: "Sell your catch",
      icon: "fa-solid fa-sack-dollar",
      accent: "amber",
      description:
        "/fishsell paid out through Vault at prices you set in config.yml, so the catch was worth your server's own currency.",
    },
    {
      key: "language",
      title: "Four languages",
      icon: "fa-solid fa-language",
      accent: "teal",
      description:
        "English, Spanish, Japanese and Filipino, picked with one config line. Not perfect translations, and the listing said so.",
    },
    {
      key: "config",
      title: "Readable config",
      icon: "fa-solid fa-gears",
      accent: "violet",
      description:
        "/fishconfig printed the live settings in game, so you could check the event period and prices without opening the file.",
    },
    {
      key: "quiet",
      title: "Built to stay quiet",
      icon: "fa-solid fa-volume-low",
      accent: "rose",
      description:
        "Catches moved to a subtitle and selling shrank to one line, because the first build buried the chat on a busy server.",
    },
  ],

  commands: [
    {
      command: "/fishtop",
      description:
        "Show the standings for the contest currently running.",
      requireOp: false,
    },
    {
      command: "/fishsell",
      description:
        "Sell the fish you caught during the event, paid through Vault.",
      requireOp: false,
    },
    {
      command: "/fishconfig",
      description:
        "Print the plugin's live configuration, including the event period and the sell prices.",
      requireOp: false,
    },
    {
      command: "/fishstart",
      description:
        "Start a contest by hand, rather than waiting for the timer. Needs the permission node.",
      requireOp: true,
    },
  ],

  languages: [
    { name: "English", native: "English" },
    { name: "Spanish", native: "Española" },
    { name: "Japanese", native: "日本語" },
    { name: "Filipino", native: "Tagalog" },
  ],

  dependencies: [
    {
      name: "Vault",
      version: "1.7.3-b131",
      note: "Required. The payout for a sold catch goes through it.",
    },
    {
      name: "EssentialsX",
      version: "2.18.2.0",
      note: "Required. The economy behind Vault during development.",
    },
  ],

  setup: [
    "Drop the jar in your plugins folder, with Vault and EssentialsX already installed.",
    "Restart the server. The plugin writes its own config.yml on first boot.",
    "Set the event interval and the sell prices in config.yml, or leave the defaults.",
    "Pick a language with the language key, if English is not what you want.",
    "The first contest fires ten minutes after the restart. After that it is on the timer.",
  ],

  screenshots: [
    {
      src: eventShot,
      alt: "A Fishing Contest event running in game",
      caption: "An event in progress, with the catch count on screen.",
    },
    {
      src: sellShot,
      alt: "Selling a haul of fish",
      caption: "/fishsell, compressed to one line so it did not flood chat.",
    },
    {
      src: configShot,
      alt: "The Fishing Contest configuration printed in game",
      caption: "/fishconfig printed the live settings without opening a file.",
    },
  ],
};
