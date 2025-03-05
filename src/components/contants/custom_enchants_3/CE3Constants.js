export const PluginInformation = {
  title: "Custom Enchantments 3",
  subtitle: "Elevate your server with Epic RPG Gameplay!",
  author: "JayMar921",
  authorSocial: "https://jayharronabejar.vercel.app/",
  description:
    "Take your server to the next level with Custom Enchantments 3! Unlock powerful enchantments, dive into an immersive RPG experience, and choose your path as a Warrior, Archer, or Mage, each with unique abilities and playstyles. But that's not all! Venture into custom-built structures, uncover exclusive loot, and enjoy fully customizable features tailored to your world. Bring adventure, strategy, and limitless customization to your players today!",
  trialLink:
    "https://www.spigotmc.org/resources/%E2%9C%AFcustom-enchantments-2-1-16-1-21-4-%E2%9C%AF.89793/download?version=579656",
  buyLink: "https://www.spigotmc.org/resources/102275/",
  supportLink: "https://buymeacoffee.com/jaymar921",
  classes: {
    description:
      "Shape your adventure with three powerful classes: Warrior, Archer, and Mage! Each path unlocks unique skills, buffs, and playstyles, bringing an epic RPG experience to your server. Dominate battles, master magic, or strike from the shadows, the choice is yours!",
    command: "/ce skills",
    class: [
      {
        title: "Warrior",
        icon: "fa-solid fa-shield-halved",
        color: "text-red-500",
        description:
          "Settle in the southern area of the Taiga Biomes. They have the best in attacking ability and endurance, but they're slow in speed and is inaccurate.",
        subdescription: "(You'll be able to use Sword Enchantments)",
        main_attribute: "Strength",
        attributes: [
          "Increase Physical Damage by 0.13",
          "Increase Physical Defense by 0.25",
          "Increase Health Regen by 0.015",
        ],
        skills: [
          {
            title: "SWORD MASTERY",
            description: "Increase sword damage",
          },
          {
            title: "BERSERK",
            description: "Get bonus damage for 0.2 for every hp lost",
          },
          {
            title: "PENETRATION",
            description: "Ignore enemy Damage Resistance by 0.5%",
          },
        ],
      },
      {
        title: "Archer",
        icon: "fa-solid fa-shoe-prints",
        color: "text-green-500",
        description:
          "Inhibit in the northern land of jungle biomes. They shun the use of heavy equipment as it restricts their mobility and agility. They are considered as the quickest and fastest of all the classes.",
        subdescription: "(You'll be able to use Bow Enchantments)",
        main_attribute: "Agility",
        attributes: [
          "Increase Movement Speed by 0.025",
          "Increase Critical Chance by 2%",
          "Increase Physical Damage by 0.125",
        ],
        skills: [
          {
            title: "BOW MASTERY",
            description: "Increase bow damage",
          },
          {
            title: "UNSWERVING SHOT",
            description: "Increase bow range",
          },
          {
            title: "SWIFT ESCAPE",
            description: "Increases Chance to Evade/Ignore Damage",
          },
        ],
      },
      ,
      {
        title: "Mage",
        icon: "fa-solid fa-hat-wizard",
        color: "text-blue-500",
        description:
          "Occupies the lands of Snowy Plain. They manifest less physical ability than the other classes but has the strongest magical powers.",
        subdescription: "(You'll be able to use Magic Enchantments)",
        main_attribute: "Intelligence",
        attributes: [
          "Increase Mana Regeneration",
          "Increase Magic Damage",
          "Increase Magic Resistance",
        ],
        skills: [
          {
            title: "WIZARD MASTERY",
            description: "Increase cassting range / spell radius by 0.2 blocks",
          },
          {
            title: "HOURGLASS",
            description: "Decrease magic enchantments cooldown",
          },
          {
            title: "MANA CHARGE",
            description: "Increases Mana Regeneration by 0.125",
          },
        ],
      },
    ],
  },
};
