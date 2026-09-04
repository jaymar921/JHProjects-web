import {
  EditionMatrix,
  LiteGuarantees,
  PluginInformation,
} from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Cmd,
  IconBadge,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import * as StoreArt from "../../../assets/epic_mobs_rework/marketing";

/**
 * A cell in the comparison table: a tick, a dash, or a number.
 *
 * Written as a function rather than a component on purpose. A second component
 * in this file would be a second export, which breaks fast refresh for the
 * panel itself, and it earns nothing: this returns one element and takes no
 * children.
 */
function cell(value, tickClass) {
  if (value === true) {
    return (
      <i className={`fa-solid fa-circle-check text-xs ${tickClass}`} title="Yes"></i>
    );
  }
  if (value === false) {
    return <i className="fa-solid fa-minus text-xs text-slate-600" title="No"></i>;
  }
  return (
    <span className="text-[10px] leading-snug text-slate-300 md:text-[11px]">
      {value}
    </span>
  );
}

function EMR_Editions() {
  const { price } = PluginInformation;

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-scale-balanced"
          title="Lite and full"
          subtitle="Two jars from one source tree. Neither of them expires."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Lite is a complete, working monster plugin, not a demo. A small server
          should be able to run it permanently and be happy with it. Every
          headline system is in there: you define mobs, they spawn, they fight,
          they have abilities, they drop loot, they pay rewards, bosses have
          bars, raids happen, and every integration works.
        </Body>
        <Body className="pt-4 text-justify">
          What Lite does not give you is scale and authoring depth. The limits
          are on how many of a thing you may have and how far you may tune it,
          not on whether the thing exists at all. You hit the ceiling doing
          something you were already enjoying, rather than being stopped at the
          door.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.editions}
          alt="The Lite ceilings and what the full build adds"
          accent="amber"
          caption="Every Lite limit as a number, and what the full build lifts"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <div className="flex place-items-center gap-3">
              <img
                src={PluginInformation.iconLite}
                alt="Epic Mobs Rework Lite icon"
                loading="lazy"
                className="h-12 w-12 rounded-md border border-slate-700/70"
              />
              <div>
                <p className="pixel-font text-[10px] tracking-wide text-emerald-300 md:text-xs">
                  LITE
                </p>
                <p className="pt-1 text-[11px] text-slate-400 md:text-xs">
                  Free, forever, no strings
                </p>
              </div>
            </div>
            <Body className="pt-4">
              The same code with limits on how much you can build. Nothing
              expires, nothing phones home, nothing counts down, and your
              players never see a nag screen.
            </Body>
          </Panel>

          <Panel accent="ember" className="p-5">
            <div className="flex place-items-center gap-3">
              <img
                src={PluginInformation.icon}
                alt="Epic Mobs Rework icon"
                loading="lazy"
                className="h-12 w-12 rounded-md border border-slate-700/70"
              />
              <div>
                <p className="pixel-font text-[10px] tracking-wide text-orange-300 md:text-xs">
                  FULL
                </p>
                <p className="pt-1 text-[11px] text-slate-400 md:text-xs">
                  {price.symbol}
                  {price.amount} {price.currency}, bought once
                </p>
              </div>
            </div>
            <Body className="pt-4">
              Every limit lifted, plus companions, boss phases, packs, arenas,
              custom ability authoring, player-count scaling, the codex and the
              admin editor. One payment, and every update after it.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">EVERY DIFFERENCE, IN FULL</SubHeading>
        <Body className="pt-3 text-justify">
          No asterisks and nothing left off. <Cmd accent="amber">/ep info</Cmd>{" "}
          prints this same list in game, so an owner can see the ceiling before
          they hit it rather than after.
        </Body>
        <Panel accent="amber" className="mt-5 overflow-x-auto p-3 md:p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                  Feature
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
                  Lite
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-orange-300 md:text-[10px]">
                  Full
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
                  <td className="px-2 py-2.5 text-center align-top">
                    {cell(entry.lite, "text-emerald-400")}
                  </td>
                  <td className="px-2 py-2.5 text-center align-top">
                    {cell(entry.full, "text-orange-400")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="emerald">WHAT THE FREE BUILD WILL NEVER DO</SubHeading>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {LiteGuarantees.map((guarantee) => (
            <Panel
              key={guarantee.title}
              accent={guarantee.accent}
              className="p-5"
            >
              <div className="flex place-items-center gap-3">
                <IconBadge
                  icon={guarantee.icon}
                  accent={guarantee.accent}
                />
                <p className="pixel-font text-[9px] tracking-wide text-slate-200 md:text-[10px]">
                  {guarantee.title}
                </p>
              </div>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {guarantee.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Shot
          src={StoreArt.liteScope}
          alt="The Lite build's limits, printed in full"
          accent="emerald"
          caption="The free build's ceiling, drawn the same way it is printed in game"
        />
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-lock-open">
          The split is at compile time, not at run time. A full-build class is
          absent from the Lite jar rather than switched off in it, so there is
          no config key to flip, no flag to patch and no timer to wait out. The
          old Epic Mobs wrote a trial expiry into the world folder and disabled
          itself six days after install, on servers that had paid for it. That
          is exactly what this design exists to make impossible.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Editions;
