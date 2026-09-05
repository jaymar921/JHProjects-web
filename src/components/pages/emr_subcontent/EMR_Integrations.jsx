import { Integrations } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  IconBadge,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import * as StoreArt from "../../../assets/epic_mobs_rework/marketing";

function EMR_Integrations() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-plug"
          title="Plays well with others"
          subtitle="Standalone first. Every one of these is optional and every one is found on its own."
          accent="lime"
        />
        <Body className="pt-5 text-justify">
          Epic Mobs Rework needs nothing installed alongside it and behaves the
          same with all of these absent. Install one and it lights up. Miss one,
          or run an older version of it, and that integration simply stays off:
          nothing breaks, nothing throws, and{" "}
          <Cmd accent="lime">/ep info</Cmd> tells you exactly which ones hooked.
        </Body>
        <Body className="pt-4 text-justify">
          None of them is a compile-time dependency and none of them is shaded
          into the jar. Every call into another plugin is resolved by name, once,
          at enable. That is what stops a release of theirs from taking this one
          down with it.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.integrations}
          alt="Custom Enchantments 3, Kumandra's Economy, and the rest"
          accent="lime"
          caption="Two deep integrations, three shallow ones, and none of them required"
        />
      </Section>

      <Section>
        <div className="grid gap-4">
          {Integrations.map((integration) => (
            <Panel
              key={integration.name}
              accent={integration.accent}
              className="p-5"
            >
              <div className="flex flex-wrap place-items-center gap-3">
                <IconBadge
                  icon={integration.icon}
                  accent={integration.accent}
                />
                <p className="pixel-font text-[10px] tracking-wide text-slate-200 md:text-xs">
                  {integration.name}
                </p>
                <span className="pixel-font ml-auto border border-slate-600/60 bg-[rgba(0,0,0,0.5)] px-2 py-1 text-[7px] tracking-widest text-slate-400 md:text-[8px]">
                  OPTIONAL
                </span>
              </div>
              <Bullets className="pt-3">
                {integration.points.map((point) => (
                  <Bullet key={point} accent={integration.accent}>
                    {point}
                  </Bullet>
                ))}
              </Bullets>
              {integration.href && (
                <div className="pt-4">
                  <PixelButton
                    as="a"
                    href={integration.href}
                    accent={integration.accent}
                    icon="fa-solid fa-arrow-right"
                  >
                    SEE THE PLUGIN
                  </PixelButton>
                </div>
              )}
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Shot
          src={StoreArt.integration}
          alt="What Custom Enchantments 3 and Kumandra's Economy add, and the usual suspects"
          accent="purple"
          caption="The two that go deep, and the four that are simply there when you need them"
        />
      </Section>

      <Section>
        <SubHeading accent="lime">KEEPING A MOB&apos;S ENCHANTS SANE</SubHeading>
        <Body className="pt-3 text-justify">
          If you run Custom Enchantments 3, an Epic Mob triggers whatever is on
          the gear you gave it. That is a good feature and an easy way to build
          something nobody can kill, so there is an allow-list and a clamp. A
          mob holding a maxed Soul Eater is not a fight, it is a bug report.
        </Body>
        <Terminal title="EpicMobsRework / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="lime">[MOB ENCHANTMENTS]</TerminalLabel>
              {`
integrations:
  custom-enchantments-3:
    enabled: true
    mob-enchantments:
      enabled: true
      max-level: 5     # clamped, whatever the item says
      scale: 0.7       # 70% of player strength
      allowed:
        - LIFE_STEAL
        - BLEED
        - EXECUTE
        - LIGHT_SPIRIT
        - WIND_STRIKE
        - TANK
        - POISONOUS_THORNS
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-gift">
          Every integration works in the free build too, with the full API
          surface. That is the opposite of what most free builds do, and it is
          deliberate: Epic Mobs, Custom Enchantments 3 and Kumandra&apos;s
          Economy are all the same developer&apos;s work, and somebody weighing
          up the set has to be able to watch them work together before spending
          anything.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Integrations;
