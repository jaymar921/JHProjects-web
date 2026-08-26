import { ConfigGroups } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Cmd,
  IconBadge,
  Note,
  Panel,
  Section,
  SectionHeading,
  SubHeading,
} from "../../page_components/PixelUIKit";

function KE_Settings() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-gears"
          title="Settings"
          subtitle="Two files. Neither of them is long, and you can ignore both to start."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          Everything below lives in{" "}
          <Cmd accent="emerald">plugins/KumandrasEconomy/config.yml</Cmd>,
          except the database keys, which are in{" "}
          <Cmd accent="teal">Database.yml</Cmd> next to it. The defaults are a
          working economy on their own, so treat this as a list of dials rather
          than a setup checklist.
        </Body>
      </Section>

      {ConfigGroups.map((group) => (
        <Section key={group.title}>
          <Panel accent={group.accent} className="p-5">
            <div className="flex place-items-center gap-3">
              <IconBadge icon={group.icon} accent={group.accent} />
              <SubHeading accent={group.accent}>
                {group.title.toUpperCase()}
              </SubHeading>
            </div>
            <Body className="pt-3">{group.intro}</Body>
            <div className="mt-4 grid gap-2">
              {group.keys.map((entry) => (
                <div
                  key={entry.key}
                  className="border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
                >
                  <div className="flex flex-wrap place-items-baseline justify-between gap-2">
                    <span className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                      {entry.key}
                    </span>
                    <span className="pixel-font text-[8px] text-amber-300 md:text-[10px]">
                      {entry.value}
                    </span>
                  </div>
                  <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                    {entry.note}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </Section>
      ))}

      <Section>
        <Note accent="emerald" icon="fa-solid fa-arrows-rotate">
          config.yml updates itself. Since version 1.2, a key added by a new
          release appears in your existing file instead of quietly running on
          its default, so upgrading does not mean diffing the config by hand.
        </Note>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-language">
          Player facing text lives in <Cmd accent="sky">lang.yml</Cmd>, with
          extra translations in the <Cmd accent="sky">Languages</Cmd> folder.
          Turkish ships alongside English, and adding another language is a file
          drop rather than a code change.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Settings;
