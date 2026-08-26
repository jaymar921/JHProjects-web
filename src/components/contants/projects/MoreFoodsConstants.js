/**
 * Everything the More Foods & Crops page reads.
 *
 * This one is unfinished and parked, and the copy says so at the top rather
 * than at the bottom. It is on the site because the source is public and
 * because somebody may want to take it further, not because it is a download
 * anyone is being sold on.
 */

import * as FeatureArt from "../../../assets/more_foods_crops/features";
import icon from "../../../assets/more_foods_crops/icon.png";

export const ProjectInformation = {
  title: "More Foods & Crops",
  subtitle: "New crops to grow and new things to cook, on Bedrock.",
  tagline: "An addon that got most of the way there.",

  platform: "Minecraft Bedrock",
  supportedVersions: "Bedrock 1.20.80",
  kind: "Addon, not a plugin",
  status: "parked",
  statusLabel: "UNFINISHED, NO PLANS TO CONTINUE",
  price: 0,
  free: true,
  icon,

  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",
  repoLink:
    "https://github.com/jaymar921/More-Foods-and-Crops-Minecraft-Addon",

  contributors: [
    {
      name: "JayMar921",
      role: "Software developer",
      avatar: "https://avatars.githubusercontent.com/u/72720429?v=4",
      accent: "emerald",
    },
    {
      name: "MikaPiaChu921",
      role: "Artist and QA tester",
      avatar: "https://avatars.githubusercontent.com/u/91781090?s=100&v=4",
      accent: "rose",
    },
  ],

  status_note: {
    headline: "This one was never finished, and it is not being picked back up.",
    body: "It works and it is playable, but it stopped part way and there is no plan to return to it. The repository is public, so if you want to take it further, pull a crop out of it, or just see how a Bedrock addon is put together, help yourself. There is no support and no roadmap attached to any of that.",
  },

  description:
    "More Foods & Crops is a Minecraft Bedrock addon that adds crops to grow and ingredients to cook with. The loop is the one Bedrock already has, plant, water, wait, harvest, with more on the end of it, so a farm is worth building for something other than bread.",
  descriptionMore: [
    "It was built by two people. JayMar921 wrote it, MikaPiaChu921 did the art and the testing, which is most of the reason it looks like a set rather than a pile of separate items.",
    "It targets Bedrock 1.20.80. Being an addon rather than a plugin, it goes into a world's behaviour and resource packs rather than into a server's plugins folder, which also means it works in single player.",
  ],
};

/** The two panels this project has. There is not more to say about it. */
export const Features = [
  {
    key: "crops",
    title: "CROPS & COOKING",
    icon: "fa-solid fa-seedling",
    accent: "lime",
    image: FeatureArt.crops,
    description:
      "New crops with proper growth stages, and new recipes that give a harvest somewhere to go beyond filling the hunger bar.",
  },
  {
    key: "unfinished",
    title: "WHERE IT STOPPED",
    icon: "fa-solid fa-circle-pause",
    accent: "amber",
    image: FeatureArt.unfinished,
    description:
      "Playable, incomplete, and public. What got built, who built it, and what you are free to do with it.",
  },
];
