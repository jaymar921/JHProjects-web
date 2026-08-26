import { useMemo, useState } from "react";
import { Enchantments } from "../../contants/custom_enchants_3/CE3Constants";
import CE3_EnchantComponent from "../../page_components/CE3_EnchantComponent";
import { EnchantType } from "../../contants/CE3_Enums";
import { enchantments as ENCHANT_ART } from "../../../assets/custom_enchants_3/features";
import {
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  StatChip,
} from "../../page_components/CE3_UIKit";

const FILTERS = [
  { value: "all", label: "All Enchants" },
  { value: EnchantType.SWORD, label: "Sword" },
  { value: EnchantType.BOW, label: "Bow" },
  { value: EnchantType.MAGIC_WAND, label: "Magic" },
  { value: EnchantType.SHIELD, label: "Shield" },
  { value: EnchantType.TRIDENT, label: "Trident" },
  { value: EnchantType.HELMET, label: "Helmet" },
  { value: EnchantType.CHESTPLATE, label: "Chestplate" },
  { value: EnchantType.LEGGINGS, label: "Leggings" },
  { value: EnchantType.BOOTS, label: "Boots" },
  { value: EnchantType.GENERAL, label: "General" },
  { value: EnchantType.ANIMAL_ARMOR, label: "Animal Armor" },
  { value: EnchantType.WEAPONS, label: "All Weapons" },
  { value: EnchantType.ARMORS, label: "All Armor" },
  { value: EnchantType.TOOLS, label: "Tools" },
  { value: EnchantType.AXE, label: "Axe" },
  { value: EnchantType.PICKAXE, label: "Pickaxe" },
  { value: EnchantType.SHOVEL, label: "Shovel" },
  { value: EnchantType.HOE, label: "Hoe" },
  { value: EnchantType.FISHING_ROD, label: "Fishing Rod" },
  { value: EnchantType.MACE, label: "Mace" },
  { value: EnchantType.SPEAR, label: "Spear" },
];

const byTitle = (a, b) => a.title.localeCompare(b.title);

/** Grouped filters need more than a plain "type includes" check. */
function matches(enchantment, type) {
  switch (type) {
    case "all":
      return true;
    case EnchantType.WEAPONS:
      return (
        enchantment.type.includes(EnchantType.SWORD) ||
        enchantment.type.includes(EnchantType.BOW) ||
        enchantment.type.includes(EnchantType.MAGIC_WAND)
      );
    case EnchantType.ARMORS:
      return (
        enchantment.type.includes(EnchantType.HELMET) ||
        enchantment.type.includes(EnchantType.CHESTPLATE) ||
        enchantment.type.includes(EnchantType.LEGGINGS) ||
        enchantment.type.includes(EnchantType.BOOTS)
      );
    default:
      return enchantment.type.includes(type);
  }
}

function CE3_Enchants() {
  const [enchantType, setEnchantType] = useState("all");
  const [search, setSearch] = useState("");

  const shown = useMemo(() => {
    const term = search.trim().toLowerCase();
    return Enchantments.filter(
      (enchantment) =>
        matches(enchantment, enchantType) &&
        (!term || enchantment.title.toLowerCase().includes(term)),
    ).sort(byTitle);
  }, [enchantType, search]);

  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={ENCHANT_ART}
          alt="How a custom enchantment book is applied to an item"
          accent="purple"
          caption="Buy the book, right click it, then right click the item you want it on"
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-wand-magic-sparkles"
          title="Every enchantment"
          subtitle="Filter by the item class an enchantment can go on, or search it by name."
          accent="purple"
        />

        <Panel accent="purple" className="mt-6 p-4">
          <div className="gap-3 md:flex">
            <div className="relative w-full md:w-1/2">
              <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-slate-500"></i>
              <input
                placeholder="Search by name"
                aria-label="Search enchantments by name"
                className="w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] py-2 pr-3 pl-9 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-purple-400/60 md:text-sm"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="w-full pt-3 md:w-1/2 md:pt-0">
              <select
                value={enchantType}
                aria-label="Filter enchantments by item class"
                onChange={(event) => setEnchantType(event.target.value)}
                className="w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] px-3 py-2 text-xs text-slate-200 outline-none focus:border-purple-400/60 md:text-sm"
              >
                {FILTERS.map((filter) => (
                  <option key={filter.label} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <StatChip
              icon="fa-solid fa-list"
              value={shown.length}
              label="Shown"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-layer-group"
              value={Enchantments.length}
              label="Total"
              accent="sky"
            />
          </div>
        </Panel>

        {shown.length === 0 ? (
          <p className="py-16 text-center text-xs text-slate-500">
            Nothing matches that filter. Try clearing the search box.
          </p>
        ) : (
          <div className="mt-6 grid select-none gap-4 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((enchantment) => (
              <CE3_EnchantComponent
                key={enchantment.title}
                enchantment={enchantment}
              />
            ))}
          </div>
        )}

        <div className="pt-6">
          <Note accent="amber" icon="fa-solid fa-user-shield">
            Most offensive enchantments check your class before they fire. Set{" "}
            AllowUseAllEnchantDenyClass to true in config.yml if you would
            rather let everyone use everything.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default CE3_Enchants;
