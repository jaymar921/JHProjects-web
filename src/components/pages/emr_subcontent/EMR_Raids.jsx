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
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";

function EMR_Raids() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-tower-observation"
          title="Raids, arenas and packs"
          subtitle="A raid is an event with a place, not a kill counter with a boss bar."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          The old raid spawned mobs around every online player anywhere in the
          world, five attempts per mob per player every thirty seconds, with no
          cap on how many were alive at once. It could only be won or manually
          stopped. All three of those are gone.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.raids}
          alt="Raid progress, tiered rewards, and pack behaviour"
          accent="rose"
          caption="Waves that escalate with progress, rewards split three ways, and a leader worth killing"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">A RAID</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                Has a place. Players travel to it or defend against it, rather
                than mobs appearing wherever everybody happened to be standing.
              </Bullet>
              <Bullet accent="rose">
                Runs in waves with a defined composition, and higher tiers
                unlock as the kill goal fills.
              </Bullet>
              <Bullet accent="rose">
                Ends on a boss, with phases, in the full build.
              </Bullet>
              <Bullet accent="rose">
                Can be lost. A timer or an objective that can be destroyed
                gives it stakes.
              </Bullet>
              <Bullet accent="rose">
                Pays out three ways: top damage, most kills, and everybody who
                turned up.
              </Bullet>
              <Bullet accent="rose">
                Can be scheduled into windows, so raids happen at your peak
                hours and not at four in the morning.
              </Bullet>
              <Bullet accent="rose">
                Starts by name. <Cmd accent="rose">/ep raid start</Cmd> in the
                old plugin picked one at random and there was no way to run a
                specific one.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">AN ARENA</SubHeading>
            <Body className="pt-3">
              A region you record, a list of waves, and a lockout so the same
              party cannot farm it. Build the room, tell the plugin where it is,
              and it runs: a sidebar shows the wave and the count remaining, and
              the whole thing resets when everybody dies or leaves.
            </Body>
            <div className="pt-5">
              <SubHeading accent="amber">A PACK</SubHeading>
              <Body className="pt-3">
                A group that spawns together with a leader, a formation, and a
                buff the leader gives the rest. What makes it worth having is
                one line: kill the alpha and the pack scatters, or enrages, or
                disbands, or promotes a new one. Your call. Killing six
                identical wolves is not memorable. That is.
              </Body>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">HOW A PACK IS WRITTEN</SubHeading>
        <Terminal title="EpicMobsRework / packs / wolf-pack.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="amber">[A PACK]</TerminalLabel>
              {`
leader: Alpha Wolf
members:
  - mob: Frost Wolf
    count: 3-6
formation: SCATTER          # or CIRCLE, LINE, GUARD
leader_buff:
  speed: 1.15
  damage: 1.2
on_leader_death: FLEE       # or ENRAGE, DISBAND, PROMOTE
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="rose">THE TIER TABLE</SubHeading>
        <Body className="pt-3 text-justify">
          Which tiers a raid may send, and how far through the raid each one
          unlocks, is a table in <Cmd accent="rose">config.yml</Cmd>. In the old
          plugin it was hard-coded, and every rate above tier one was roughly a
          fifth of what its own comment claimed it was.
        </Body>
        <Terminal title="EpicMobsRework / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="rose">[RAID TIERS]</TerminalLabel>
              {`
raids:
  waves:
    interval: 30s
    max-concurrent: 40        # alive at once, server wide
    attempts-per-wave: 12     # per wave, not per player

  tiers:
    TIER_1: { chance: 0.50, unlocks-at: 0.0 }
    TIER_2: { chance: 0.40, unlocks-at: 0.2 }
    TIER_3: { chance: 0.35, unlocks-at: 0.4 }
    TIER_4: { chance: 0.30, unlocks-at: 0.6 }
    TIER_5: { chance: 0.20, unlocks-at: 0.7 }
    TIER_6: { chance: 0.15, unlocks-at: 0.8 }
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          Lite runs one raid definition, with waves, a kill goal, a boss bar and
          rewards, which is enough to see the system work. It does not run a
          phased raid boss as the last wave and has no scheduling windows. Packs
          and arenas are the full build. Triggers are in both, capped at three
          in Lite, because they are useful and small.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Raids;
