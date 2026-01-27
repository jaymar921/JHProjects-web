import React, { useState } from "react";
import { Enchantments } from "../../contants/custom_enchants_3/CE3Constants";
import CE3_EnchantComponent from "../../page_components/CE3_EnchantComponent";
import { EnchantType } from "../../contants/CE3_Enums";

function CE3_Enchants() {
  const [enchantType, setEnchantType] = useState("all");
  const [enchantments, setEnchantments] = useState(
    Enchantments.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    })
  );

  const onChange = ({ target }) => {
    const type = target.value;
    setEnchantType(type);

    let arr = Enchantments;

    if (type !== "all") {
      switch (type) {
        case EnchantType.GENERAL:
          arr = Enchantments.filter((e) =>
            e.type.includes(EnchantType.GENERAL)
          );
          break;
        case EnchantType.WEAPONS:
          arr = Enchantments.filter(
            (e) =>
              e.type.includes(EnchantType.SWORD) ||
              e.type.includes(EnchantType.BOW) ||
              e.type.includes(EnchantType.MAGIC_WAND)
          );
          break;
        case EnchantType.ARMORS:
          arr = Enchantments.filter(
            (e) =>
              e.type.includes(EnchantType.HELMET) ||
              e.type.includes(EnchantType.CHESTPLATE) ||
              e.type.includes(EnchantType.LEGGINGS) ||
              e.type.includes(EnchantType.BOOTS)
          );
          break;
        default:
          arr = Enchantments.filter((e) => e.type.includes(type));
      }
    }

    setEnchantments(
      arr.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      })
    );
  };
  return (
    <div>
      <p className="p-2 text-center">Explore all Custom Enchantments</p>
      <div className="text-center p-2">
        <select
          value={enchantType}
          onChange={onChange}
          className="py-2 px-4 bg-gray-800 rounded-lg text-[11px] md:text-lg"
        >
          <option value="all">All Enchants</option>
          <option value={EnchantType.SWORD}>Sword Enchants</option>
          <option value={EnchantType.BOW}>Bow Enchants</option>
          <option value={EnchantType.MAGIC_WAND}>Magic Enchants</option>
          <option value={EnchantType.SHIELD}>Shield Enchants</option>
          <option value={EnchantType.TRIDENT}>Trident Enchants</option>
          <option value={EnchantType.HELMET}>Helmet Enchants</option>
          <option value={EnchantType.CHESTPLATE}>Chestplate Enchants</option>
          <option value={EnchantType.LEGGINGS}>Leggings Enchants</option>
          <option value={EnchantType.BOOTS}>Boots Enchants</option>
          <option value={EnchantType.GENERAL}>General Enchants</option>
          <option value={EnchantType.ANIMAL_ARMOR}>
            Animal Armor Enchants
          </option>
          <option value={EnchantType.WEAPONS}>Weapons Enchants</option>
          <option value={EnchantType.ARMORS}>Armor Enchants</option>
          <option value={EnchantType.TOOLS}>Tools Enchants</option>
          <option value={EnchantType.AXE}>Axe Enchants</option>
          <option value={EnchantType.PICKAXE}>Pickaxe Enchants</option>
          <option value={EnchantType.SHOVEL}>Shovel Enchants</option>
          <option value={EnchantType.HOE}>Hoe Enchants</option>
          <option value={EnchantType.FISHING_ROD}>Fishing Rod Enchants</option>
          <option value={EnchantType.ANIMAL_ARMOR}>
            Animal Armor Enchants
          </option>
          <option value={EnchantType.MACE}>Mace Enchants</option>
        </select>
      </div>
      <div className="p-2">
        <p>Shown: {enchantments.length}</p>
      </div>
      <div className="w-full grid md:grid-cols-3 xl:grid-cols-5 gap-4 p-2 select-none">
        {enchantments.map((enchantment, index) => (
          <CE3_EnchantComponent
            key={`ENC-${index * Math.random()}`}
            enchantment={enchantment}
          />
        ))}
      </div>
    </div>
  );
}

export default CE3_Enchants;
