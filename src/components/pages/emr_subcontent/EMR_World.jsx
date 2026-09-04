import { SpawnPaths } from "../../contants/epic_mobs_rework/EMRConstants";
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

function EMR_World() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-earth-americas"
          title="Decide where they live"
          subtitle="Six ways in, and a budget that stops any of them becoming the reason your server lags."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          The old plugin had four conditions for the entire plugin: the right
          day or night bucket, a listed world, a matching biome, and one global
          dice roll. Everything below is what replaced that.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.world}
          alt="Spawn conditions, the six spawn paths, and the spawn budget"
          accent="sky"
          caption="The conditions, the six ways in, and the ceiling that sits over all of them"
        />
      </Section>

      <Section>
        <SubHeading accent="amber">SIX WAYS A MOB REACHES THE WORLD</SubHeading>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SpawnPaths.map((path) => (
            <Panel key={path.name} accent={path.accent} className="p-5">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={path.icon} accent={path.accent} />
                <p className="pixel-font text-[9px] tracking-wide text-slate-200 md:text-[10px]">
                  {path.name}
                </p>
              </div>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {path.note}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">THE CONDITIONS</SubHeading>
        <Body className="pt-3 text-justify">
          Conditions go well past biome and time of day. A per-player cooldown
          is the one worth pointing at: without it, the same player walks into
          the same ambush twice in a row and the mob stops being a surprise.
        </Body>
        <Terminal title="EpicMobsRework / mobs / frost-wolf.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="sky">[SPAWN RULES]</TerminalLabel>
              {`
spawn:
  worlds: [ world, world_nether ]
  environments: [ NORMAL ]
  biomes: [ SNOWY_TAIGA, GROVE, "#is_cold" ]
  y: 62-140
  light: 0-7
  time: NIGHT
  weather: [ RAIN, THUNDER ]
  moon_phase: [ FULL ]
  min_distance_from_spawn: 200
  max_nearby: 4
  requires_sky_access: false
  group: 2-4
  chance: 0.15
  cooldown: 300s
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">THE SPAWN BUDGET</SubHeading>
            <Body className="pt-3">
              This is the part that protects your server, and it is in both
              builds, because a performance protection is never a paid feature.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                A hard ceiling on Epic Mobs per world and per chunk. Nothing in
                the plugin is allowed past it.
              </Bullet>
              <Bullet accent="rose">
                A millisecond budget for the spawn location search itself. The
                old plugin could spend a very long tick looking for somewhere
                to put a wolf. This one cannot, by construction.
              </Bullet>
              <Bullet accent="rose">
                A cap on candidate locations tried before an attempt gives up.
              </Bullet>
              <Bullet accent="rose">
                Candidates in unloaded chunks are skipped rather than forcing
                the chunk in.
              </Bullet>
            </Bullets>
            <div className="pt-4">
              <Note accent="amber" icon="fa-solid fa-gauge-high">
                Run <Cmd accent="amber">/ep timings</Cmd> after ten minutes of
                spawning. If the spawn search figure is climbing, lower the
                budget rather than turning spawning off.
              </Note>
            </div>
          </Panel>

          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">STAYING OUT OF YOUR BUILDS</SubHeading>
            <Body className="pt-3">
              Every spawn path asks the same guard before an entity exists, not
              after. Each layer is independently switchable and each one is
              skipped silently when the plugin behind it is not installed.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                The plugin&apos;s own world list and per-world rules.
              </Bullet>
              <Bullet accent="emerald">
                Its own cuboid regions in{" "}
                <Cmd accent="emerald">regions.yml</Cmd>, so this works with
                nothing else installed.
              </Bullet>
              <Bullet accent="emerald">
                WorldGuard, when present, honouring a registered{" "}
                <Cmd accent="emerald">epicmobs-spawn</Cmd> flag so you can let
                them back in where you want them.
              </Bullet>
              <Bullet accent="emerald">
                Custom Enchantments 3 protected boundaries, when present.
              </Bullet>
              <Bullet accent="emerald">
                A minimum distance from world spawn and from any player bed
                spawn.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <Shot
          src={StoreArt.world}
          alt="Spawn conditions, the six ways in, weighted loot and raids"
          accent="sky"
          caption="Where they come from, and what happens when one dies"
        />
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          Lite gets the classic condition set: world, environment, biome, time
          of day, chance and group size, plus the whole spawn budget. Height
          band, light level, weather, moon phase, distance from spawn, nearby
          count, sky access, biome tags and replacing a vanilla mob are the full
          build. Nothing an existing Epic Mobs user relied on is behind the
          paywall.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_World;
