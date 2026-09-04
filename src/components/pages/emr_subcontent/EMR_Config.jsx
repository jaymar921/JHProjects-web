import { FileLayout } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
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

function EMR_Config() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-gears"
          title="Set up in config.yml"
          subtitle="Nothing worth changing is a constant in the source."
          accent="lime"
        />
        <Body className="pt-5 text-justify">
          The old plugin had twenty keys in its config, read once at enable, and
          a dozen values that ought to have been settings sitting as constants
          in the code: the ability radius, the mob density limit, the chunk
          restore distance, the lag reducer interval, the raid tier rates, the
          spawner radius, the regen interval. <Cmd accent="lime">/ep reload</Cmd>{" "}
          did not touch any of them. That is the thing this rework is most
          directly a response to.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.config}
          alt="The plugin's files, what a validation warning looks like, and the in-game commands"
          accent="lime"
          caption="The files it writes, what a bad value gets you, and the three commands that matter"
        />
      </Section>

      <Section>
        <SubHeading accent="ember">THE FILES IT WRITES</SubHeading>
        <div className="mt-4 grid gap-2">
          {FileLayout.map((entry) => (
            <div
              key={entry.path}
              className="flex flex-wrap place-items-baseline gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
            >
              <Chip accent={entry.accent}>{entry.path}</Chip>
              <span className="grow text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {entry.note}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">BAD VALUES ARE NAMED</SubHeading>
            <Body className="pt-3">
              Every value is checked on load. An out-of-range or unparseable one
              logs a warning naming the key, the value you wrote and the default
              it fell back to. It never silently becomes zero, and the file
              around it still loads.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                A chance outside 0.0 to 1.0 is caught. In the old plugin,{" "}
                <Cmd accent="rose">1.5</Cmd> meant every roll passed.
              </Bullet>
              <Bullet accent="rose">
                A zero or negative interval is caught. Bukkit turns a period of
                zero into a task that runs once and never again.
              </Bullet>
              <Bullet accent="rose">
                A misspelled biome is caught. The old loader substring-matched
                the name, so a typo silently matched nothing.
              </Bullet>
              <Bullet accent="rose">
                A mob pointing at an ability, entity or summon that does not
                exist is named on boot rather than failing quietly the first
                time it tries to spawn.
              </Bullet>
              <Bullet accent="rose">
                An unknown key is warned about, because the old behaviour was
                that a typo in a key name silently did nothing.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">AND IT STAYS YOURS</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                <Cmd accent="sky">/ep reload</Cmd> reloads everything, config
                included, and reports what changed and what failed.
              </Bullet>
              <Bullet accent="sky">
                Intervals are read when they are used rather than baked into a
                scheduled task, so changing one does not need a restart.
              </Bullet>
              <Bullet accent="sky">
                An update rewrites <Cmd accent="sky">config.yml</Cmd> with any
                new keys, keeps every value you had set, and saves the previous
                file as <Cmd accent="sky">config.yml.old</Cmd>.
              </Bullet>
              <Bullet accent="sky">
                Durations are written the way people think:{" "}
                <Cmd accent="sky">90s</Cmd>, <Cmd accent="sky">5m</Cmd>,{" "}
                <Cmd accent="sky">2h</Cmd>, <Cmd accent="sky">20t</Cmd> for
                ticks. A bare number is seconds.
              </Bullet>
              <Bullet accent="sky">
                <Cmd accent="sky">/ep timings</Cmd> shows where the plugin is
                spending its tick, and <Cmd accent="sky">/ep debug</Cmd> turns
                on verbose logging for one area rather than all of them.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="lime">THE SETTINGS THAT MATTER MOST</SubHeading>
        <Body className="pt-3 text-justify">
          The whole file is long. These are the ones to look at on the first
          evening, in the order they will bite you.
        </Body>
        <Terminal title="EpicMobsRework / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="lime">[START HERE]</TerminalLabel>
              {`
general:
  # Leave empty to run everywhere.
  worlds: [ world ]
  # ACTION_BAR, SUBTITLE, BOSS_BAR or NONE
  health-display: ACTION_BAR

performance:
  max-mobs-per-world: 200
  max-mobs-per-chunk: 6
  # The single most important line in this file.
  spawn-search-budget-ms: 2
              `}
              <TerminalLabel accent="amber">[THEN THESE]</TerminalLabel>
              {`
combat:
  # ATTRIBUTE lets other plugins see real damage numbers.
  # POOL is the old behaviour and breaks CE3 combat.
  damage-model: ATTRIBUTE

loot:
  # Share of a mob's health a player must deal to qualify.
  # 0 restores the old last-hit behaviour.
  min-damage-share: 0.1

rewards:
  provider-order: [ KUMANDRA, CE3_RACO, VAULT ]
  payout-mode: FIRST_AVAILABLE

diagnostics:
  # spawn, combat, loot, raid, integration, performance
  debug: []
  validate-on-boot: true
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-boxes-packing">
          Mob definitions moved out of a serialized blob into one readable file
          per mob under <Cmd accent="emerald">mobs/</Cmd>. If you are upgrading,
          a migrator reads the old files on first start, writes the new ones,
          and renames the originals rather than deleting them. It also logs
          every mob whose despawn behaviour changed, because the old plugin read
          that flag backwards.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Config;
