import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/farm_tales/features";
import * as Screens from "../../../assets/farm_tales/screenshots";
import { Placeholders } from "../../contants/farm_tales/FTConstants";

/** The codex, the recipe browser, the admin menu, and PlaceholderAPI. */
function FT_Codex() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-book-open"
          title="A codex, a recipe browser, and an admin menu"
          subtitle="The whole catalog in game, every recipe and how to make it, and a config editor in a chest."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          <Cmd accent="sky">/ft codex</Cmd> lists every crop, fruit and meat
          grade, fills in what a player has discovered, and says where a seed
          comes from and how the plant grows. <Cmd accent="sky">/ft recipes</Cmd>{" "}
          shows everything craftable and, on Premium, the three processes that
          are not recipes. <Cmd accent="sky">/ft admin</Cmd> edits every number
          in the config and every field on every catalog entry from a chest
          menu, writes it back with every comment intact, and logs who changed
          what.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.codex}
          alt="The codex grid, the recipe browser, and the admin menu"
          accent="sky"
          caption="The three menus. Grey in the codex means not discovered yet, or on Lite, Premium"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">THE CODEX</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                Built from the registry every time it opens, so a crop you
                added in catalog/custom.yml is in it on the next reload with no
                further work.
              </Bullet>
              <Bullet accent="sky">
                An entry&apos;s page says how it grows, where the seed comes
                from, what it rides on, whether it can go in a dish, and
                whether you have harvested it.
              </Bullet>
              <Bullet accent="sky">
                Harvesting marks an entry as discovered, and it survives a
                restart. Progress is a placeholder:{" "}
                <Cmd accent="sky">%farmtales_codex_progress%</Cmd>.
              </Bullet>
              <Bullet accent="sky">
                On Lite all 134 are listed, with the 100 premium ones greyed
                and marked. Clicking one says it is Premium and carries the
                link. That is the upsell, and it is the whole of it.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="lime" className="p-5">
            <SubHeading accent="lime">THE RECIPE BROWSER</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="lime">
                Reads the server&apos;s own recipe book rather than keeping a
                list, so it shows every recipe Farm Tales registered, including
                ones added after the browser was written.
              </Bullet>
              <Bullet accent="lime">
                The Water Spray, the fertilizer tiers, the two tools, the dish
                rule, the smoothie, and the animal feed, each with its shape in
                the grid and lore generated from the config.
              </Bullet>
              <Bullet accent="lime">
                On Premium, three process pages that are not recipes:
                dry-aging, wine and beer, described from the config.
              </Bullet>
              <Bullet accent="lime">
                Clicking an ingredient does not close the window. That was a
                bug a person found in the first hour, and it is fixed.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Shot
            className="ft-shot"
            src={Screens.codexVegetables}
            alt="The vegetables page of the codex"
            accent="green"
            caption="Vegetables, with the pack on"
          />
          <Shot
            className="ft-shot"
            src={Screens.codexMeat}
            alt="The meat grades page of the codex"
            accent="rose"
            caption="Thirty meat grades on one page"
          />
          <Shot
            className="ft-shot"
            src={Screens.recipes}
            alt="The recipe browser"
            accent="lime"
            caption="/ft recipes"
          />
        </div>
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">THE ADMIN MENU (PREMIUM)</SubHeading>
          <Body className="pt-3 text-justify">
            <Cmd accent="amber">/ft admin</Cmd> is a config editor with a
            chest window in front of it. Every click ends in the same YAML a
            text editor writes, checked by the same loader a startup runs, and
            put into force by the same reload. There is no second source of
            truth: a hand edit and a menu edit never disagree about which wins
            because there is only one writer and it writes the file.
          </Body>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Numbers are clicked up and down, switches toggled, materials and
              nutrition tags picked from a list. An entry&apos;s display name
              is typed in chat after a click.
            </Bullet>
            <Bullet accent="amber">
              The candidate file is validated by the loader before it exists
              on disk. A value the loader refuses is refused in the menu, with
              the loader&apos;s own message, and the file is untouched.
            </Bullet>
            <Bullet accent="amber">
              The first edit in a server run saves a .bak beside the file.
              Every comment, every blank line and every key you did not touch
              survives byte for byte.
            </Bullet>
            <Bullet accent="amber">
              Every write goes to admin-edits.log: who, when, which file, which
              key, the old value and the new one.
            </Bullet>
            <Bullet accent="amber">
              It does not edit ids or model numbers, because changing one
              reskins every copy of that item already in a world. Those are
              shown read-only with the reason in their lore.
            </Bullet>
          </Bullets>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Shot
              className="ft-shot"
              src={Screens.adminMain}
              alt="The admin menu root"
              accent="amber"
              caption="The root: three catalog doors and the global settings"
            />
            <Shot
              className="ft-shot"
              src={Screens.adminGlobal}
              alt="The admin menu global settings"
              accent="amber"
              caption="Every config section, one door each"
            />
          </div>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="green">PLACEHOLDERAPI, BOTH EDITIONS</SubHeading>
        <Body className="pt-3">
          The expansion ships inside the plugin under the identifier{" "}
          <Cmd accent="green">farmtales</Cmd>. Nothing to download from the
          ecloud. Without PlaceholderAPI the plugin logs one line and behaves
          identically.
        </Body>
        <Panel accent="green" className="mt-4 overflow-x-auto p-3 md:p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                  Placeholder
                </th>
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Placeholders.map((row) => (
                <tr key={row.name} className="border-b border-slate-800">
                  <td className="px-2 py-2 align-top text-[10px] text-green-300 md:text-xs">
                    {row.name}
                  </td>
                  <td className="px-2 py-2 align-top text-[10px] text-slate-400 md:text-xs">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-circle-info">
            Add a thirteenth tag to nutrition-tags.yml and its placeholder
            exists on the next reload. Ask for a tag your server has not
            defined and you get the raw text back, because that is a typo and
            hiding it does nobody any favours.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default FT_Codex;
