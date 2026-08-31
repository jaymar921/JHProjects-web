/**
 * Textures lifted straight out of the plugin's own resource pack
 * (marketing/resource_packs/CustomEnchantments 3 [1.21]).
 *
 * Treasure names come from pairing each vanilla item override in the pack with
 * the Material that TreasureData.java gives that treasure, so the icon shown
 * here is the icon a player sees in game.
 */

import treasure1 from "./treasure/1.png";
import treasure2 from "./treasure/2.png";
import treasure3 from "./treasure/3.png";
import treasure4 from "./treasure/4.png";
import treasure6 from "./treasure/6.png";
import treasure7 from "./treasure/7.png";
import treasure8 from "./treasure/8.png";
import treasure9 from "./treasure/9.png";
import treasure10 from "./treasure/10.png";
import treasure11 from "./treasure/11.png";
import treasure12 from "./treasure/12.png";
import treasure14 from "./treasure/14.png";
import lostClock from "./treasure/lost_clock.png";

import agility from "./skill/agility.png";
import strength from "./skill/strength.png";
import berserk from "./skill/berserk.png";
import penetration from "./skill/penetration.png";
import swordMastery from "./skill/sword_mastery.png";
import bowMastery from "./skill/bow_mastery.png";
import unswervingShot from "./skill/unswerving_shot.png";
import swiftEscape from "./skill/swift_escape.png";
import hourGlass from "./skill/hour_glass.png";
import wizardMastery from "./skill/wizard_mastery.png";
import manaCharge from "./skill/mana_charge.png";

import bookArmor from "./book/101001.png";
import bookBow from "./book/102001.png";
import bookGeneric from "./book/103001.png";
import bookMagic from "./book/104001.png";
import bookShield from "./book/105001.png";
import bookSword from "./book/106001.png";
import bookTool from "./book/107001.png";
import bookTrident from "./book/108001.png";
import bookMace from "./book/201001.png";
import bookSpear from "./book/202001.png";

import magicWand from "./item/magic_wand.png";
import manaPotion from "./item/mana_potion.png";
import resetElixir from "./item/reset_elixir.png";

/**
 * Treasure artifacts, with the vanilla item each one replaces.
 *
 * Only treasures the pack models as `item/handheld` are listed. Rainbow Lotus
 * and Zakraf Shield are deliberately left out: the pack renders those two as
 * 3D models, so their flat texture sheet does not read as an inventory icon.
 */
export const TREASURES = [
  { name: "Lost Crown", material: "Golden Helmet", src: treasure12 },
  { name: "Berries of Life", material: "Sweet Berries", src: treasure10 },
  { name: "Fruit of Wisdom", material: "Glow Berries", src: treasure11 },
  {
    name: "Yggdrasil's Divine Fruit",
    material: "Enchanted Golden Apple",
    src: treasure14,
  },
  { name: "Sharpened Shears", material: "Shears", src: treasure8 },
  { name: "Goblin Sword", material: "Wooden Sword", src: treasure9 },
  { name: "Rotten Corpse", material: "Rotten Flesh", src: treasure4 },
  { name: "Shell of the Sea", material: "Nautilus Shell", src: treasure6 },
  { name: "Shell of the Dark Sea", material: "Nautilus Shell", src: treasure7 },
  { name: "Villager Coin", material: "Emerald", src: treasure2 },
  { name: "Pirate Coin", material: "Gold Nugget", src: treasure3 },
  { name: "Lucky Treasure", material: "Gold Nugget", src: treasure1 },
  { name: "Lost Clock", material: "Clock", src: lostClock },
];

/** Skill tree icons, keyed by the name the plugin shows in the GUI. */
export const SKILL_ICONS = {
  STRENGTH: strength,
  AGILITY: agility,
  "SWORD MASTERY": swordMastery,
  BERSERK: berserk,
  PENETRATION: penetration,
  "BOW MASTERY": bowMastery,
  "UNSWERVING SHOT": unswervingShot,
  "SWIFT ESCAPE": swiftEscape,
  HOURGLASS: hourGlass,
  "WIZARD MASTERY": wizardMastery,
  "MANA CHARGE": manaCharge,
};

/** Enchantment book art, one per item class (see TextureModelling.java). */
export const BOOKS = [
  { label: "Sword", src: bookSword },
  { label: "Bow", src: bookBow },
  { label: "Magic", src: bookMagic },
  { label: "Armor", src: bookArmor },
  { label: "Shield", src: bookShield },
  { label: "Trident", src: bookTrident },
  { label: "Tool", src: bookTool },
  { label: "Mace", src: bookMace },
  { label: "Spear", src: bookSpear },
  { label: "Generic", src: bookGeneric },
];

export const ITEMS = { magicWand, manaPotion, resetElixir };
