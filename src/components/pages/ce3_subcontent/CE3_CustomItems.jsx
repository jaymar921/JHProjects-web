import CE3CustomItemImg from "../../../assets/custom_enchants_3/ce3-custom-items.png";
import {
  treasures as TREASURE_ART,
  crafting as CRAFTING_ART,
} from "../../../assets/custom_enchants_3/features";
import { TREASURES } from "../../../assets/custom_enchants_3/textures";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  StatChip,
  SubHeading,
} from "../../page_components/CE3_UIKit";

const LOOT_ITEMS_YML =
  "https://github.com/JnH-Projects/Custom-Enchantments-3/blob/main/loot_items/default/LootItems.yml";

function CE3_CustomItems() {
  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={TREASURE_ART}
          alt="Treasure items and the passive bonuses they hand out"
          accent="rose"
          caption="Treasures work while they sit in your inventory. Nothing to equip."
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-cube"
          title="Custom items"
          accent="amber"
        />
        <div className="mt-6 gap-6 lg:flex">
          <div className="w-full lg:w-1/2">
            <Panel accent="amber" className="p-3">
              <img
                className="mx-auto w-[70%] lg:w-full"
                src={CE3CustomItemImg}
                alt="The in game item list, showing Berries of Life and its passive abilities"
                loading="lazy"
              />
            </Panel>
          </div>
          <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
            <Body className="text-justify">
              Custom items live in <Cmd accent="amber">LootItems.yml</Cmd>, so
              you get to decide what exists on your server. Each line sets a
              name, a material, damage, penetration, a damage type and a rarity.
              How often they turn up is down to the rarity chances in
              config.yml.
            </Body>
            <Body className="pt-4 text-justify">
              They show up in chests inside loot plots, villages, mineshafts and
              near mob spawners.
            </Body>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatChip
                icon="fa-solid fa-file-code"
                value="YAML"
                label="Editable"
                accent="amber"
              />
              <StatChip
                icon="fa-solid fa-gem"
                value="6"
                label="Rarities"
                accent="purple"
              />
              <StatChip
                icon="fa-solid fa-burst"
                value="3"
                label="Damage types"
                accent="rose"
              />
            </div>
            <div className="pt-5">
              <PixelButton
                as="a"
                href={LOOT_ITEMS_YML}
                accent="amber"
                icon="fa-brands fa-github"
              >
                VIEW LootItems.yml
              </PixelButton>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-gem"
          title="Treasure artifacts"
          subtitle="134 named items, each carrying its own passive bonus. 100 of them are new in 1.5.0."
          accent="rose"
        />
        <Panel accent="rose" className="mt-6 p-5">
          <Bullets>
            <Bullet accent="rose">
              Treasures are built into the plugin. You cannot craft them and you
              cannot edit them, so every server sees the same set.
            </Bullet>
            <Bullet accent="rose">
              Carrying one is enough. A task retallies your inventory every five
              seconds and applies whatever you are holding.
            </Bullet>
            <Bullet accent="rose">
              Bonuses cover mana regen, cooldown reduction, magic and physical
              defence, damage, health regen, XP multiplier and RACO reward
              chance.
            </Bullet>
            <Bullet accent="rose">
              Find them in the same places as custom loot: loot plots, villages,
              mineshafts and mob spawners.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-scale-balanced">
              Defence and the XP multiplier are averaged across everything you
              carry rather than added up, so stuffing your bag with treasures
              will not stack those two.
            </Note>
          </div>
          <div className="pt-5">
            <Body>
              Want the full list with its passive abilities? Run{" "}
              <Cmd accent="rose">/ce help</Cmd> in game and open the treasure
              pages.
            </Body>
          </div>
        </Panel>

        <Panel accent="purple" className="mt-4 p-5">
          <SubHeading accent="purple">A FEW OF THEM</SubHeading>
          <p className="pt-2 text-[11px] text-slate-500 md:text-xs">
            Sprites below come from the plugin's own resource pack, so this is
            what they look like in your inventory.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4 sm:grid-cols-4 lg:grid-cols-5">
            {TREASURES.map((treasure) => (
              <div
                key={treasure.name}
                className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3 text-center"
              >
                <img
                  src={treasure.src}
                  alt={treasure.name}
                  loading="lazy"
                  className="mx-auto h-10 w-10 [image-rendering:pixelated]"
                />
                <p className="pt-2 text-[10px] leading-tight text-slate-300">
                  {treasure.name}
                </p>
                <p className="pt-1 text-[9px] text-slate-600">
                  {treasure.material}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-mortar-pestle"
          title="Craftable items"
          subtitle="Six shapeless recipes, all registered when the plugin starts."
          accent="lime"
        />
        <Shot
          className="mt-6"
          src={CRAFTING_ART}
          alt="The magic wand recipe and the plugin's potion recipes"
          accent="lime"
          caption="A stick and a lapis lazuli make a wand that belongs to you alone"
        />
      </Section>
    </div>
  );
}

export default CE3_CustomItems;
