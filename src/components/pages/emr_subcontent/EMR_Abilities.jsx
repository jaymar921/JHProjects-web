import { AbilityTriggers } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  IconBadge,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import * as StoreArt from "../../../assets/epic_mobs_rework/marketing";

function EMR_Abilities() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-wand-sparkles"
          title="Abilities, not bigger numbers"
          subtitle="The warning is the feature. Everything else is detail."
          accent="purple"
        />
        <Body className="pt-5 text-justify">
          Every ability has a trigger, a radius, a cooldown and a telegraph. The
          telegraph is the part that matters: a particle and a sound land a
          moment before the effect does, so a player can move, block or run.
          That is the difference between a boss fight and a tax on your health
          bar.
        </Body>
        <Body className="pt-4 text-justify">
          The old plugin had sixteen behaviours, all firing on one shared timer
          at a fixed twenty block radius, so every mob with the same behaviour
          fought exactly like every other one. This is the rewrite of that.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.abilities}
          alt="Ability triggers, per-ability radius and cooldown, and the telegraph"
          accent="purple"
          caption="Lead time, then the effect. Every trigger, and what is tunable per ability"
        />
      </Section>

      <Section>
        <SubHeading accent="sky">WHEN AN ABILITY FIRES</SubHeading>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {AbilityTriggers.map((trigger) => (
            <Panel key={trigger.name} accent={trigger.accent} className="p-5">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={trigger.icon} accent={trigger.accent} />
                <p className="pixel-font text-[9px] tracking-wide text-slate-200 md:text-[11px]">
                  {trigger.name}
                </p>
              </div>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {trigger.note}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="purple">WHAT ONE LOOKS LIKE</SubHeading>
        <Body className="pt-3 text-justify">
          An ability is a list of effects rather than one hard-coded action, so
          a single ability can damage, apply a potion and knock back. Numbers
          can be written as expressions against the mob&apos;s own stats or the
          number of players standing in front of it, and an ability can carry a
          condition that decides whether it fires at all.
        </Body>
        <Terminal title="EpicMobsRework / abilities.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="purple">[ONE ABILITY]</TerminalLabel>
              {`
abilities:
  frost_nova:
    trigger: INTERVAL
    interval: 8s
    radius: 12
    targets: PLAYERS
    cooldown: 8s
    telegraph:
      particle: SNOWFLAKE
      sound: BLOCK_GLASS_BREAK
      lead: 1s
    effects:
      - type: DAMAGE
        amount: "0.4 * mob.damage"
      - type: POTION
        effect: SLOWNESS
        level: 2
        duration: 4s
    if: "world.isNight"
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">IN THE BOX</SubHeading>
            <Body className="pt-3">
              20+ abilities are written and ready to use, including the sixteen
              the old plugin shipped, ported over so an upgrading server keeps
              the behaviour it had and can then edit it.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                Damage, poison, burn, frostbite, confusion, root, levitate and
                lightning, as they always were.
              </Bullet>
              <Bullet accent="amber">
                Knockback, pull, lifesteal, dispel, shield, blindness and a
                projectile volley.
              </Bullet>
              <Bullet accent="amber">
                Disarm, which moves the held item to another slot rather than
                deleting it. The old version deleted it.
              </Bullet>
              <Bullet accent="amber">
                Silence, which blocks Custom Enchantments 3 wand casts for a
                duration, if you run CE3.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">WHAT YOU CAN TUNE</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Radius, cooldown, interval and target filter, per ability
                rather than globally.
              </Bullet>
              <Bullet accent="emerald">
                Telegraph particle, sound and lead time, or{" "}
                <Cmd accent="emerald">telegraph.enabled: false</Cmd> if you
                genuinely want the old feel back.
              </Bullet>
              <Bullet accent="emerald">
                A global <Cmd accent="emerald">power-multiplier</Cmd>, so you
                can soften every mob on the server without editing forty files.
              </Bullet>
              <Bullet accent="emerald">
                Which abilities a mob carries, and in the full build, which
                ones it picks up as a boss drops through its phases.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <Shot
          src={StoreArt.mobs}
          alt="Abilities grouped by trigger, and how boss phases hang off them"
          accent="rose"
          caption="The three trigger groups, and the phase system that hangs off the last one"
        />
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          The free build gets the built-in library, two abilities per mob.
          Writing your own in <Cmd accent="amber">abilities.yml</Cmd>, chaining
          effects, and per-ability radius and cooldown are in the full build.
          Two built-ins is still enough to make a mob feel like a mob, which is
          why it is two rather than one.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Abilities;
