import { RaidAnchors } from "../../contants/epic_mobs_rework/EMRConstants";
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
import * as Screens from "../../../assets/epic_mobs_rework/screenshots";

function EMR_Raids() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-tower-observation"
          title="Raids, arenas and packs"
          subtitle="A wave is a share of the kill goal, not a tick of a clock."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          The old raid spawned mobs around every online player anywhere in the
          world, five attempts per mob per player every thirty seconds, with no
          cap on how many were alive at once. It could only be won or manually
          stopped. All three of those are gone, and most of what replaced them
          was rewritten again for 1.0-RC1 after somebody actually played one.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.raids}
          alt="Raid pacing, the five anchor modes, and what else fights in waves"
          accent="rose"
          caption="The kill goal split across the waves, the five places a raid can be, and the rest of the wave machinery"
        />
      </Section>

      <Section>
        <SubHeading accent="rose">THE PACING, AND WHY IT CHANGED</SubHeading>
        <Body className="pt-3 text-justify">
          The shipped raid used to reach wave 4 of 4 about two minutes in with
          seven of its eighty kills done, then stop spawning entirely. Nothing
          threw, nothing logged, and the bar and the timer both looked healthy.
          Two independent faults, both worth knowing about because both changed
          how a raid is built.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">A WAVE IS A SHARE OF THE GOAL</SubHeading>
            <Body className="pt-3">
              A wave used to advance on a thirty second clock while the kill
              goal was counted separately, and nothing connected the two. The
              goal is divided across the waves now: eighty kills over four waves
              is twenty each, and wave two does not begin until the first twenty
              are dead.
            </Body>
            <Body className="pt-3">
              A share of the goal stands in front of the players at a time and
              is topped back up as it thins out, never beyond what the current
              wave still owes. The wave clock is a backstop rather than the
              thing you feel.
            </Body>
          </Panel>

          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">STRAYS DO NOT HOLD THE CAP</SubHeading>
            <Body className="pt-3">
              Raid mobs hold a slot of the concurrent cap for as long as they
              are alive, and one that pathed off a cliff and kept walking is
              alive, in a loaded chunk, with nobody able to reach it. Enough of
              those and the cap is full of mobs nobody can kill.
            </Body>
            <Body className="pt-3">
              They are swept and replaced now, rather than teleported back: a
              raid mob that blinks into the middle of the fight is worse than
              one that quietly did not make it.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">AND THEY COME TO YOU</SubHeading>
        <Body className="pt-3 text-justify">
          Mobs used to arrive one at a time, hundreds of blocks apart, which
          meant defending your base involved leaving it. Four changes fixed
          that, and all four are settings under{" "}
          <Cmd accent="sky">raids.waves</Cmd>.
        </Body>
        <Panel accent="sky" className="mt-5 p-5">
          <Bullets>
            <Bullet accent="sky">
              They arrive in clusters. One point is searched properly and the
              rest are offset around it, each finding the ground of its own
              column, so nothing spawns buried in the slope next door.
            </Bullet>
            <Bullet accent="sky">
              A kill brings its replacement to where the last one died, so the
              fight keeps its shape as players cut through it. It never makes a
              raid worth more kills.
            </Bullet>
            <Bullet accent="sky">
              A raid with no fixed anchor spawns around a per-player epicentre
              rather than around a moving player. Walk far enough from it and it
              follows you, because running is a real answer and losing a raid by
              walking is not.
            </Bullet>
            <Bullet accent="sky">
              Each wave arrives from its own side: west, then east, then north,
              then south, then the diagonals. A wave from every direction at
              once is a ring, and a ring reads as ambient spawning with a boss
              bar over it. The announcement says which way to look.
            </Bullet>
            <Bullet accent="sky">
              A particle trail points at raid mobs you have never hit, drawn for
              you alone, so something behind a hill can still be found. It stops
              pointing at anything you have already fought.
            </Bullet>
          </Bullets>
        </Panel>
      </Section>

      <Section>
        <Shot
          className="emr-shot"
          src={Screens.infestedRaid}
          alt="A World Infestation wave arriving as a cluster"
          accent="purple"
          caption="World Infestation in progress: an Infested Broodmother and two Crawlers arriving together rather than one at a time across half a world"
        />
      </Section>

      <Section>
        <SubHeading accent="amber">FIVE PLACES A RAID CAN BE</SubHeading>
        <Body className="pt-3 text-justify">
          The anchor is the single decision that says what kind of event a raid
          is. Four of the five did not exist in the old plugin, which only ever
          had the first one.
        </Body>
        <div className="mt-5 grid gap-3">
          {RaidAnchors.map((anchor) => (
            <div
              key={anchor.mode}
              className="flex flex-wrap place-items-baseline gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
            >
              <Chip accent={anchor.accent}>{anchor.mode}</Chip>
              <span className="grow text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {anchor.note}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Note accent="purple" icon="fa-solid fa-globe">
            <span className="text-purple-300">World Infestation</span> is the
            shipped raid built on <Cmd accent="purple">GLOBAL</Cmd>: 120 kills
            over four waves, thirty minutes, and a Hive Colossus that the kill
            goal summons. Waves are dealt out around the participants in turn,
            so a server of ten gets ten fights rather than one fight and nine
            spectators.
          </Note>
        </div>
      </Section>

      <Section>
        <SubHeading accent="rose">HOW A RAID IS WRITTEN</SubHeading>
        <Terminal
          title="EpicMobsRework / raids / world-infestation.yml"
          className="mt-5"
        >
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="rose">[A WHOLE RAID]</TerminalLabel>
              {`
name: "World Infestation"
title: "&2The World Infestation"
lore: "It is not coming from anywhere. It is already here"
kill-goal: 120

anchor:
  at: GLOBAL

time-limit: 30m

# 120 kills over 4 waves is 30 per wave.
wave-count: 4

# What a wave draws from when it tops the field up
# beyond what the wave itself names.
mobs:
  - "Infested Crawler"
  - "Infested Husk"
  - "Spore Warden"
  - "Infested Broodmother"

waves:
  - mobs:
      - { mob: "Infested Crawler", count: 6-9 }
      - { mob: "Infested Husk", count: 3-5 }
    announce: "&2The ground is moving. All of it."

  - mobs:
      - { mob: "Infested Husk", count: 5-8 }
      - { mob: "Spore Warden", count: 1-2 }
    announce: "&2Wardens. Do not stand in the cloud."

# [Full build] Reaching the kill goal does not win
# the raid, it summons this, wherever the most
# defenders are standing. The raid is won when it dies.
boss: "Hive Colossus"

rewards:
  top-damage:
    xp-levels: 14
    currencies:
      - { type: KUMANDRA, amount: 1100-1700 }
  most-kills:
    xp-levels: 12
  participation:
    xp-levels: 5
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="amber">OR BUILD ONE IN A GUI</SubHeading>
        <Body className="pt-3 text-justify">
          <Cmd accent="amber">/ep editor raid</Cmd> is the mob editor&apos;s
          design applied to a raid, deliberately down to the last detail: same
          session per admin, same draft-as-YAML rule, same deferred open. Each
          of those is a bug that was found and fixed once, and a second editor
          answering those questions its own way would grow them back.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Shot
            className="emr-shot"
            src={Screens.editorRaidList}
            alt="The raid editor's list, with a raid's summary on the tooltip"
            accent="amber"
            caption="The tooltip is the whole raid at a glance: the goal, the wave split, the anchor, the time limit and the file it writes"
          />
          <Shot
            className="emr-shot"
            src={Screens.editorRaidEdit}
            alt="Inside the raid editor, with the Test start button"
            accent="amber"
            caption="Test start saves the draft and runs the raid on the server immediately, so you find out what you wrote"
          />
        </div>
        <Panel accent="amber" className="mt-5 p-5">
          <Bullets>
            <Bullet accent="amber">
              Pages for the kill goal and wave split, the anchor with a{" "}
              <span className="text-amber-300">
                Set to where I am standing
              </span>{" "}
              button, the waves and the mobs in each, the fallback pool, the
              boss and the three prize tiers.
            </Bullet>
            <Bullet accent="amber">
              A live preview of what the file will do, with every loader warning
              shown against the draft while you are looking at it.
            </Bullet>
            <Bullet accent="amber">
              Blocks it has no page for, currency payouts included, are carried
              through untouched rather than dropped on save.
            </Bullet>
          </Bullets>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="sky">AN ARENA</SubHeading>
        <Body className="pt-3 text-justify">
          A room, a party and an ordered list of waves. It starts on its own
          when enough people are standing in it, so most players never type an
          arena command. A sidebar shows the wave and what is left of it, a
          per-player lockout stops a party farming it, and a wipe or an
          abandoned room resets it and takes its mobs with it.
        </Body>
        <Body className="pt-4 text-justify">
          An arena wave is a <span className="text-sky-300">raid</span> wave
          rather than a third group format, which is why{" "}
          <Cmd accent="sky">delay: 20s</Cmd>,{" "}
          <Cmd accent="sky">delay: after_previous_cleared</Cmd> and{" "}
          <Cmd accent="sky">boss:</Cmd> were added to a wave and raids gained
          them at the same time.
        </Body>
        <Panel accent="sky" className="mt-5 p-5">
          <SubHeading accent="sky">BUILDING ONE, START TO FINISH</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="sky">Build the room.</Bullet>
            <Bullet accent="sky">
              Stand in one bottom corner and run{" "}
              <Cmd accent="sky">/ep arena pos1</Cmd>.
            </Bullet>
            <Bullet accent="sky">
              Stand in the opposite top corner and run{" "}
              <Cmd accent="sky">/ep arena pos2</Cmd>.
            </Bullet>
            <Bullet accent="sky">
              Run <Cmd accent="sky">/ep arena create [name]</Cmd>. That writes
              the file with the region already correct, your position as the
              entry point, a party size of 1 to 4 and two example waves, so it
              runs immediately.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
              Do not write the coordinates by hand. The Y range is what people
              get wrong, and a region whose height does not cover the block
              players stand on is an arena that reports{" "}
              <Cmd accent="rose">standing: 0</Cmd> to somebody standing in the
              middle of it. <Cmd accent="rose">/ep arena info [name]</Cmd> says
              whether you are inside it.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="lime">A PACK</SubHeading>
        <Body className="pt-3 text-justify">
          A group that spawns together with a leader, a formation and a buff the
          leader gives the rest. What makes it worth having is one line: kill
          the alpha and the pack scatters, or enrages, or disbands, or promotes
          a new one. Killing six identical wolves is not memorable. That is.
        </Body>
        <Terminal
          title="EpicMobsRework / packs / frost-wolf-pack.yml"
          className="mt-5"
        >
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="lime">[A PACK]</TerminalLabel>
              {`
name: "Frost Wolf Pack"

# Must be a defined mob. If the leader cannot be
# spawned, no members are placed either: a leaderless
# pack is just loose mobs.
leader: "Alpha Frost Wolf"

members:
  - { mob: "Frost Wolf", count: 3-5 }

# SCATTER, CIRCLE, LINE or GUARD.
formation: CIRCLE
spread: 4

leader-buff:
  speed: 1.15
  damage: 1.2
  health: 1.4

# FLEE, ENRAGE, DISBAND or PROMOTE.
on-leader-death: FLEE

# Optional. With this block the pack spawns on its own,
# on the same interval and the same density cap as
# ordinary natural spawning.
spawn:
  environment: NORMAL_NIGHT
  biomes: [ SNOWY_TAIGA, GROVE, FROZEN_PEAKS ]
  chance: 0.08
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
          fifth of what its own comment claimed it was. A wave that names a pack
          uses the pack instead and ignores these.
        </Body>
        <Terminal title="EpicMobsRework / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="rose">[WAVE PACING]</TerminalLabel>
              {`
raids:
  waves:
    # How many ways the kill goal is divided.
    count: 4
    # How much of it stands in front of you at once.
    field-share: 0.2
    # How thin that gets before the next lot arrive.
    top-up-at: 0.35
    # How many arrive together, and how far apart.
    cluster-size: 3
    cluster-spread: 6
    # Replacements per kill, placed where it died.
    per-kill: 1
    # Written off past this multiple of the anchor's
    # participation radius, then replaced.
    stray-distance: 1.5
    rotate-direction: true

    interval: 30s          # a backstop, not the beat
    max-concurrent: 40     # alive at once, server wide
    attempts-per-wave: 12  # per wave, not per player
              `}
              <TerminalLabel accent="amber">[TIER GATES]</TerminalLabel>
              {`
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
          Lite runs one raid definition, and it is a whole raid: an anchor with
          a participation radius, an ordered wave list, a kill goal, a boss bar,
          a time limit it can be lost on and the three tiered prizes. It does
          not run a raid boss as the final wave, so the kill goal ends the raid
          rather than summoning anything, and it has no scheduling windows. A
          wave that names a pack falls back to its own mob list rather than
          being skipped, so a Lite server gets a wave rather than a hole where
          one used to be. Packs and arenas are the full build. Triggers are in
          both, capped at three in Lite.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Raids;
