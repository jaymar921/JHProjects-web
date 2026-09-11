import {
  EditionMatrix,
  LiteGuarantees,
  PluginInformation,
} from "../../contants/farm_tales/FTConstants";
import {
  Body,
  IconBadge,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
} from "../../page_components/PixelUIKit";

/**
 * Every row of the edition table, plus the four Lite promises.
 *
 * The table is the plugin's own "What Lite restricts" table from
 * docs/build/editions.md, in plainer words. Every limit is compiled into the
 * Lite jar and none of them reads config.yml, so there is no setting to flip
 * and nothing here to soften.
 */
function Cell({ value, accent }) {
  if (value === true)
    return <i className={`fa-solid fa-circle-check text-xs ${accent}`}></i>;
  if (value === false)
    return <i className="fa-solid fa-minus text-xs text-slate-600"></i>;
  return value;
}

function FT_Editions({ setSubcontent }) {
  const { price } = PluginInformation;
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-scale-balanced"
          title="Lite and Premium, every row"
          subtitle={`${EditionMatrix.length} rows. Every limit is a fact about which jar you have, never a setting.`}
          accent="amber"
        />
        <Panel accent="amber" className="mt-6 overflow-x-auto p-3 md:p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                  Feature
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
                  Lite, free
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-green-300 md:text-[10px]">
                  Premium, {price.symbol}
                  {price.amount}
                </th>
              </tr>
            </thead>
            <tbody>
              {EditionMatrix.map((entry) => (
                <tr
                  key={entry.feature}
                  className="border-b border-slate-800 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <td className="px-2 py-2.5 align-top text-[11px] text-slate-300 md:text-xs">
                    {entry.feature}
                  </td>
                  <td className="px-2 py-2.5 text-center align-top text-[10px] text-slate-300 md:text-[11px]">
                    <Cell value={entry.lite} accent="text-emerald-400" />
                  </td>
                  <td className="px-2 py-2.5 text-center align-top text-[10px] text-slate-300 md:text-[11px]">
                    <Cell value={entry.full} accent="text-green-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-eye">
            Everything the free edition leaves out is still visible in it. The
            Lite codex lists all 134 entries with the premium ones greyed and
            marked, /ft give on a premium entry says it is Premium rather than
            unknown, and every one of those messages carries the upgrade link.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-gift"
          title="What Lite promises"
          accent="emerald"
        />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {LiteGuarantees.map((guarantee) => (
            <Panel key={guarantee.title} accent={guarantee.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={guarantee.icon} accent={guarantee.accent} />
                <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                  {guarantee.title}
                </p>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {guarantee.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Panel accent="green" className="p-5">
          <Body>
            Premium is {price.symbol}
            {price.amount} {price.currency}, once. Every update after it is
            included. Both jars read the same plugins/FarmTales/ folder, so
            upgrading is replacing one file and restarting: every config edit,
            every planted crop and every tracked animal carries over.
          </Body>
          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <PixelButton
              accent="green"
              icon="fa-solid fa-cart-shopping"
              onClick={() => setSubcontent("buy plugin")}
            >
              GET PREMIUM
            </PixelButton>
            <PixelButton
              accent="emerald"
              icon="fa-solid fa-file-arrow-down"
              onClick={() => setSubcontent("free lite")}
            >
              TRY LITE FIRST
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default FT_Editions;
