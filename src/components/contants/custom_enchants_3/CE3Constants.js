import {
  Currency,
  DamageType,
  EnchantType,
  ResistanceType,
} from "../CE3_Enums";

import spigotImg from "../../../assets/custom_enchants_3/spigot.png";

export const PluginInformation = {
  title: "Custom Enchantments 3",
  subtitle: "Elevate your server with Epic RPG Gameplay!",
  price: 15.89,
  author: "JayMar921",
  authorSocial: "https://www.youtube.com/jaymar921",
  description:
    "Take your server to the next level with Custom Enchantments 3! Unlock powerful enchantments, dive into an immersive RPG experience, and choose your path as a Warrior, Archer, or Mage, each with unique abilities and playstyles. But that's not all! Venture into custom-built structures, uncover exclusive loot, and enjoy fully customizable features tailored to your world. Bring adventure, strategy, and limitless customization to your players today!",
  trialLink:
    "https://www.spigotmc.org/resources/%E2%9C%AFcustom-enchantments-3-1-16-free-%E2%9C%AF.89793/download?version=593302",
  trialTitle: "v1.2.0-lite-r.2",
  buyLink: "https://www.spigotmc.org/resources/102275/",
  paypalPaymentLink: "https://www.paypal.com/paypalme/JayMar921",
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
    // {
    //   title: "Pi Network",
    //   onClick: (setSubcontent) => {
    //     setSubcontent?.("donate pi");
    //   },
    //   logo: PiNetworkImg,
    // },
  ],
  buyLink: [
    {
      title: "Spigot",
      link: "https://www.spigotmc.org/resources/102275/",
      logo: spigotImg,
    },
    {
      title: "PayPal",
      onClick: (setSubcontent) => {
        setSubcontent?.("buy through paypal");
      },
      icon: "fa-brands fa-paypal text-blue-400",
    },
  ],
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

export const CommandList = [
  {
    command: "/ce skills",
    description:
      "Open the select Skills UI (on level 10, you can select classes)",
    requireOp: false,
  },
  {
    command: "/ce skills add [player] [amount]",
    description: "Add level to player by amount",
    requireOp: true,
  },
  {
    command: "/ce skills reset [player]",
    description: "Reset player skill level back to 0",
    requireOp: true,
  },
  {
    command: "/ce shop",
    description:
      "Shows the list of shops and it's location within the world. Opens the shop UI if `EnableShopCommand` setting is enabled in config.yml",
    requireOp: false,
  },
  {
    command: "/ce shop add [mobType] [shopType] [shopName]",
    description: "Create a shop at the player's location",
    requireOp: true,
  },
  {
    command: "/ce shop remove [shopName]",
    description: "Remove a shop",
    requireOp: true,
  },
  {
    command: "/ce quest",
    description:
      "Shows the list of quests and it's location within the world. If player is on quest, it shows the active quest details",
    requireOp: false,
  },
  {
    command: "/ce quest add",
    description: "Create a new Quest",
    requireOp: true,
  },
  {
    command: "/ce quest remove",
    description: "Remove an exisiting quest",
    requireOp: true,
  },
  {
    command: "/ce quest list",
    description: "Shows the list of created quests",
    requireOp: true,
  },
  {
    command: "/ce quest modifyEntity",
    description: "Replace the associated quests on a Quest Entity",
    requireOp: true,
  },
  {
    command: "/ce rank",
    description: "Shows the top 10 player rank",
    requireOp: false,
  },
  {
    command: "/ce allies",
    description: "Shows the list of allied players",
    requireOp: false,
  },
  {
    command: "/ce allies add [playerName]",
    description:
      "Add a player into the ally list [Make sure that the player is online]",
    requireOp: false,
  },
  {
    command: "/ce allies remove [playerName]",
    description: "Remove a player from the ally list",
    requireOp: false,
  },
  {
    command: "/ce help",
    description: "Shows the plugin Help UI",
    requireOp: false,
  },
  {
    command: "/ce info",
    description: "Shows the plugin settings information",
    requireOp: false,
  },
  {
    command: "/ce setting",
    description: "Modify plugin settings | may require admin access",
    requireOp: false,
  },
  {
    command: "/ce reload",
    description: "Soft reload plugin",
    requireOp: true,
  },
  {
    command: "/ce ___reset___",
    description: "[TEST COMMAND] Reset yourself back to skill level 0",
    requireOp: true,
  },
  {
    command: "/ce ___test___",
    description: "[TEST COMMAND] Grant max skill level (200)",
    requireOp: true,
  },
  {
    command: "/ce ___lootplot___",
    description: "[TEST COMMAND] Generate a looting plot nearby",
    requireOp: true,
  },
  {
    command: "/ce ___treasure___",
    description: "[TEST COMMAND] Retrieve all Treasure Items",
    requireOp: true,
  },
  {
    command: "/ce ___ceItem___",
    description: "[TEST COMMAND] Retrieve a custom CE Item",
    requireOp: true,
  },
  {
    command: "/ce ___itemData___",
    description: "[TEST COMMAND] Get information about the MainHand item",
    requireOp: true,
  },
];

export const Enchantments = [
  {
    title: "Life Steal",
    type: [EnchantType.SWORD],
    description: "Get a chance to steal your enemies health",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 55,
    currency: Currency.LEVEL,
  },
  {
    title: "Bleed",
    type: [EnchantType.SWORD],
    description: "Get a chance of bleeding the enemy",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 38,
    currency: Currency.LEVEL,
  },
  {
    title: "Critical",
    type: [EnchantType.SWORD],
    description: "Deal critical damage to enemy by chance",
    damageType: [DamageType.PHYSICAL_DMG_CRIT],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 85,
    currency: Currency.LEVEL,
  },
  {
    title: "Poison",
    type: [EnchantType.SWORD],
    description: "Apply poison effect to the enemy on hit",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 2,
    price: 18,
    currency: Currency.LEVEL,
  },
  {
    title: "Magic Resist",
    type: [EnchantType.CHESTPLATE],
    description: "Reduce Magic Damage taken",
    damageType: [],
    resistanceType: [],
    absorbType: [DamageType.MAGICAL_DMG, DamageType.MAGICAL_PEN],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 45,
    currency: Currency.LEVEL,
  },
  {
    title: "Mana Steal",
    type: [EnchantType.SWORD],
    description: "Steal mana from your enemy",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 35,
    currency: Currency.LEVEL,
  },
  {
    title: "Execute",
    type: [EnchantType.SWORD],
    description: "Deal more damage when your enemy is on low health",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 75,
    currency: Currency.LEVEL,
  },
  {
    title: "LIGHT SPIRIT",
    type: [EnchantType.SWORD],
    description: "Call of lightning! Deal huge magic damage to your enemy",
    damageType: [
      DamageType.PHYSICAL_DMG,
      DamageType.MAGICAL_DMG,
      DamageType.MAGICAL_PEN,
    ],
    resistanceType: [
      ResistanceType.PHYSICAL_RESIST,
      ResistanceType.MAGICAL_RESIST,
    ],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 55,
    currency: Currency.LEVEL,
  },
  {
    title: "SOUL EATER",
    type: [EnchantType.SWORD],
    description: "Capture your enemy's soul! Slowly stack your sword damage",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5000,
    price: 150,
    currency: Currency.LEVEL,
  },
  {
    title: "WIND STRIKE",
    type: [EnchantType.SWORD],
    description: "Dashes to enemy",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 40,
    currency: Currency.LEVEL,
  },
  {
    title: "SUDDEN BLOW",
    type: [EnchantType.TRIDENT],
    description: "Has chance to blind and stun the enemy",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 4,
    price: 35,
    currency: Currency.LEVEL,
  },
  {
    title: "HAIL STORM",
    type: [EnchantType.TRIDENT],
    description: "Cast a hail storm in the area",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 20,
    cooldown: 200,
    maxLevel: 3,
    price: 95,
    currency: Currency.LEVEL,
  },
  {
    title: "TANK",
    type: [EnchantType.ARMORS],
    description: "Gain physical damage resistance",
    damageType: [],
    resistanceType: [],
    absorbType: [DamageType.PHYSICAL_DMG, DamageType.PHYSICAL_DMG_CRIT],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 45,
    currency: Currency.LEVEL,
  },
  {
    title: "REGAIN",
    type: [EnchantType.CHESTPLATE],
    description: "Get a second life!",
    damageType: [],
    resistanceType: [],
    absorbType: [
      DamageType.PHYSICAL_DMG,
      DamageType.PHYSICAL_DMG_CRIT,
      DamageType.MAGICAL_DMG,
      DamageType.MAGICAL_PEN,
    ],
    manaCost: 0,
    cooldown: 200,
    maxLevel: 5,
    price: 70,
    currency: Currency.LEVEL,
  },
  {
    title: "POISONOUS THORNS",
    type: [EnchantType.CHESTPLATE],
    description: "Get a chance to poison the attacker",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 10,
    price: 33,
    currency: Currency.LEVEL,
  },
  {
    title: "FREEZE",
    type: [EnchantType.LEGGINGS],
    description: "Get a chance to freeze your attacker",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 10,
    price: 47,
    currency: Currency.LEVEL,
  },
  {
    title: "OMNIVAMP",
    type: [EnchantType.CHESTPLATE],
    description: "Get a chance to heal when attacked",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 52,
    currency: Currency.LEVEL,
  },
  {
    title: "BLINDNESS",
    type: [EnchantType.HELMET],
    description: "When attacked, blind the enemy by chance",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 1,
    price: 20,
    currency: Currency.LEVEL,
  },
  {
    title: "DOUBLE JUMP",
    type: [EnchantType.BOOTS],
    description: "Sneak while on air to jump",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 3,
    cooldown: 0,
    maxLevel: 1,
    price: 25,
    currency: Currency.LEVEL,
  },
  {
    title: "AUTO FARM",
    type: [EnchantType.HOE],
    description: "Get a chance to replant harvested crops",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 15,
    currency: Currency.LEVEL,
  },
  {
    title: "VEIN MINER",
    type: [EnchantType.PICKAXE],
    description: "Mine veins of ores",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 15,
    currency: Currency.LEVEL,
  },
  {
    title: "DEFORESTATION",
    type: [EnchantType.AXE],
    description: "Cut the whole vertical tree trunk",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 15,
    currency: Currency.LEVEL,
  },
  {
    title: "AUTO REPAIR",
    type: [EnchantType.GENERAL],
    description: "Slowly repair tool/weapon/armor over time",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 30,
    currency: Currency.LEVEL,
  },
  {
    title: "SUPER NOVA",
    type: [EnchantType.MAGIC_WAND],
    description: "Deal huge magic damage on surrounding area",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 15,
    cooldown: 40,
    maxLevel: 5,
    price: 75,
    currency: Currency.LEVEL,
  },
  {
    title: "LIGHTNING",
    type: [EnchantType.MAGIC_WAND],
    description: "Strike lightning on surrounding area",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 12.5,
    cooldown: 25,
    maxLevel: 5,
    price: 55,
    currency: Currency.LEVEL,
  },
  {
    title: "HEALING",
    type: [EnchantType.MAGIC_WAND],
    description: "Heal yourself and your allies on surrounding area",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 13.2,
    cooldown: 50,
    maxLevel: 3,
    price: 45,
    currency: Currency.LEVEL,
  },
  {
    title: "LEVITATE",
    type: [EnchantType.MAGIC_WAND],
    description: "Levitate Enemies and deal magic damage",
    damageType: [DamageType.MAGICAL_DMG, DamageType.PHYSICAL_DMG],
    resistanceType: [
      ResistanceType.MAGICAL_RESIST,
      ResistanceType.PHYSICAL_RESIST,
    ],
    absorbType: [],
    manaCost: 8.2,
    cooldown: 35,
    maxLevel: 3,
    price: 60,
    currency: Currency.LEVEL,
  },
  {
    title: "NEBULA",
    type: [EnchantType.MAGIC_WAND],
    description: "Nebula explosion!",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 17.3,
    cooldown: 45,
    maxLevel: 8,
    price: 150,
    currency: Currency.LEVEL,
  },
  {
    title: "SHARP ARROW",
    type: [EnchantType.BOW],
    description: "Deal more ranged damage",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 10,
    price: 35,
    currency: Currency.LEVEL,
  },
  {
    title: "STUN",
    type: [EnchantType.BOW],
    description: "Get a chance to stun the enemy",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 53,
    currency: Currency.LEVEL,
  },
  {
    title: "FROST ARROW",
    type: [EnchantType.BOW],
    description: "Slow your enemy by chance",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 43,
    currency: Currency.LEVEL,
  },
  {
    title: "FOCUS FIRE",
    type: [EnchantType.BOW],
    description:
      "Gain Quick Movement Speed and Invisibility on every success hit",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 58,
    currency: Currency.LEVEL,
  },
  {
    title: "DEATH ANGEL",
    type: [EnchantType.BOW],
    description: "Fall a meteorite to where the arrow landed",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 8,
    cooldown: 30,
    maxLevel: 5,
    price: 75,
    currency: Currency.LEVEL,
  },
  {
    title: "IMPLANT",
    type: [EnchantType.BOW],
    description: "The dark matter will give a strength to your bow",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 8,
    cooldown: 30,
    maxLevel: 5,
    price: 93,
    currency: Currency.LEVEL,
  },
  {
    title: "STORM",
    type: [EnchantType.MAGIC_WAND],
    description: "The power of wind and storm will bind your wand",
    damageType: [DamageType.MAGICAL_DMG, DamageType.MAGICAL_PEN],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 20,
    cooldown: 200,
    maxLevel: 15,
    price: 140,
    currency: Currency.LEVEL,
  },
  {
    title: "MANA SHIELD",
    type: [EnchantType.SHIELD],
    description: "Absorb full damage and consume it as mana",
    damageType: [],
    resistanceType: [
      ResistanceType.PHYSICAL_RESIST,
      ResistanceType.MAGICAL_RESIST,
    ],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 12,
    price: 48,
    currency: Currency.LEVEL,
  },
  {
    title: "MANA BURN",
    type: [EnchantType.MAGIC_WAND],
    description: "Burn players mana within the surrounding area",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 48,
    currency: Currency.LEVEL,
  },
  {
    title: "STURDY",
    type: [EnchantType.SHIELD],
    description: "Obtain physical resistance when equipped offhand",
    damageType: [],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 50,
    currency: Currency.LEVEL,
  },
  {
    title: "DEATH RAY",
    type: [EnchantType.BOW],
    description: "Shoot laser on target",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 85,
    currency: Currency.LEVEL,
  },
  {
    title: "BLINK",
    type: [EnchantType.BOOTS],
    description: "Shift + Right click on a target to blink on a short distance",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 35,
    currency: Currency.LEVEL,
  },
  {
    title: "JUGGERNAUT",
    type: [EnchantType.SWORD],
    description: "Deal armor penetration",
    damageType: [DamageType.PHYSICAL_DMG, DamageType.PHYSICAL_DMG_CRIT],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 8,
    price: 70,
    currency: Currency.LEVEL,
  },
  {
    title: "WIND SLASHER",
    type: [EnchantType.SWORD],
    description: "Summon tornado by chance at AGILITY 40+",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 55,
    currency: Currency.LEVEL,
  },
  {
    title: "FIREBALL",
    type: [EnchantType.MAGIC_WAND],
    description: "Shoot fireball on a target",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 5,
    cooldown: 0,
    maxLevel: 10,
    price: 20,
    currency: Currency.LEVEL,
  },
  {
    title: "STELLA",
    type: [EnchantType.BOW],
    description: "Ultimate bow enchantment",
    damageType: [DamageType.MAGICAL_DMG, DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST, DamageType.PHYSICAL_DMG],
    absorbType: [],
    manaCost: 0,
    cooldown: 300,
    maxLevel: 1,
    price: 125,
    currency: Currency.LEVEL,
  },
  {
    title: "FARMLAMD",
    type: [EnchantType.HOE],
    description: "Create a small chunk of farmland",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 2,
    price: 25,
    currency: Currency.LEVEL,
  },
  {
    title: "BLACK HOLE",
    type: [EnchantType.MAGIC_WAND],
    description: "Cast a black hole on your area, trapping players",
    damageType: [DamageType.MAGICAL_DMG],
    resistanceType: [ResistanceType.MAGICAL_RESIST],
    absorbType: [],
    manaCost: 25.2,
    cooldown: 450,
    maxLevel: 5,
    price: 750,
    currency: Currency.RACO,
  },
  {
    title: "TELEPATHY",
    type: [EnchantType.TOOLS],
    description:
      "Collect dropped item instantly from being mined (Incompatible with fortune enchantment)",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 1,
    price: 30,
    currency: Currency.LEVEL,
  },
  {
    title: "CONFUSION",
    type: [EnchantType.SWORD],
    description: "Confuse the enemy by chance",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 27,
    currency: Currency.LEVEL,
  },
  {
    title: "DRAGON BREATH",
    type: [EnchantType.SWORD],
    description: "Inflict your enemies on fire in a radius",
    damageType: [DamageType.PHYSICAL_DMG, DamageType.MAGICAL_DMG],
    resistanceType: [
      ResistanceType.PHYSICAL_RESIST,
      ResistanceType.PHYSICAL_RESIST,
    ],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 32,
    currency: Currency.LEVEL,
  },
  {
    title: "HEIST",
    type: [EnchantType.SWORD],
    description: "Get a chance to steal money from your enemy",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 300,
    currency: Currency.RACO,
  },
  {
    title: "ANTI HEIST",
    type: [EnchantType.CHESTPLATE],
    description: "Get a chance to block heist enchantment from attacker",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 3,
    price: 450,
    currency: Currency.RACO,
  },
  {
    title: "MAGNETIC",
    type: [EnchantType.GENERAL],
    description: "Attracts ground items nearby to pickup",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 2,
    price: 20,
    currency: Currency.RACO,
  },
  {
    title: "BRILLIANCE",
    type: [EnchantType.HELMET],
    description: "Grant mana regeneration",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 8,
    price: 125,
    currency: Currency.RACO,
  },
  {
    title: "GOOEY",
    type: [EnchantType.SWORD],
    description: "Get a chance to launch your enemy 8 blocks above",
    damageType: [DamageType.PHYSICAL_DMG],
    resistanceType: [ResistanceType.PHYSICAL_RESIST],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 8,
    price: 30,
    currency: Currency.LEVEL,
  },
  {
    title: "COMPANION HEALING",
    type: [EnchantType.ANIMAL_ARMOR],
    description:
      "Slowly heals your companion [Applies to horse and wolf armor]",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 5,
    currency: Currency.LEVEL,
  },
  {
    title: "COMPANION THORNS",
    type: [EnchantType.ANIMAL_ARMOR],
    description:
      "Applies thorns and slowness effect to the attacker [Applies to horse and wolf armor]",
    damageType: [],
    resistanceType: [],
    absorbType: [],
    manaCost: 0,
    cooldown: 0,
    maxLevel: 5,
    price: 10,
    currency: Currency.LEVEL,
  },
];
