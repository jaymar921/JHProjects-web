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
import * as StoreArt from "../../../assets/epic_mobs_rework/marketing";
import * as Screens from "../../../assets/epic_mobs_rework/screenshots";

function EMR_Mobs() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-skull"
          title="The mob builder"
          subtitle="A mob is a set of decisions, not a health number with a fancy name."
          accent="ember"
        />
        <Body className="pt-5 text-justify">
          You pick a vanilla entity, anything from a bee to a warden, and then
          decide what it is. Health, damage and resistance are tracked by the
          plugin rather than by the entity, so a zombie can carry ten thousand
          hit points without you touching a single attribute and without other
          plugins seeing a monster with a broken health bar.
        </Body>
        <Body className="pt-4 text-justify">
          Twenty are written for you on the first start, across four lines: the
          Hollow siege, the frost wilds, the desert, and the five infested mobs
          the World Infestation raid is made of. They are balanced on an
          iron-armour baseline, so a player in full iron with an iron sword
          beats a tier one to three mob one on one with effort, and tier four
          upward wants diamond, potions or a group. Copying one of those files
          is the quickest way to your twenty-first.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.mobs}
          alt="One readable file per mob, the six tiers, and the two ways to build one"
          accent="ember"
          caption="One readable file per mob, six tiers, and two ways to build one"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="ember" className="p-5">
            <SubHeading accent="ember">WHAT YOU DECIDE</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="ember">
                The base entity, and a name your players will actually
                remember.
              </Bullet>
              <Bullet accent="ember">
                A tier from one to six. The tier sets the shape of a fight and
                gates what a raid is allowed to send at which point.
              </Bullet>
              <Bullet accent="ember">
                Health, damage and resistance. Resistance is capped, so a
                typo cannot quietly make something immortal.
              </Bullet>
              <Bullet accent="ember">
                Equipment the mob wears and uses, loaded straight out of a
                chest rather than typed in item by item.
              </Bullet>
              <Bullet accent="ember">
                Potion effects, an aura and a particle trail, so a mob reads as
                dangerous before it reaches anybody.
              </Bullet>
              <Bullet accent="ember">
                Summons, on a timer or on death, so killing one thing is not
                always the end of it, and codex flavour text for the entry a
                player unlocks by killing it.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">TWO WAYS TO BUILD ONE</SubHeading>
            <Body className="pt-3">
              <Cmd accent="sky">/ep create mob</Cmd> walks you through it in
              chat, one prompt at a time. It is in both builds and it is how
              the old plugin worked.
            </Body>
            <Body className="pt-3">
              <Cmd accent="amber">/ep editor</Cmd> opens the same thing as a
              GUI: a searchable mob list with a live preview, click to adjust
              stats, a real inventory to drop equipment into, the loot table
              with its weights drawn as bars, and a test button that spawns the
              mob beside you before you save it. That one is the full build.
            </Body>
            <div className="pt-4">
              <Note accent="sky" icon="fa-solid fa-lightbulb">
                Both write the same file. The editor changes nothing about what
                the plugin can do and everything about how long it takes you to
                do it.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">THE FILE IT WRITES</SubHeading>
        <Body className="pt-3 text-justify">
          One file per mob, under <Cmd accent="amber">mobs/</Cmd>. You can open
          it in a text editor, change a number, hand it to somebody else, or
          keep it in git. The old plugin kept every mob in one serialized blob
          that nobody could read, which is the single thing owners asked about
          most.
        </Body>
        <Terminal title="EpicMobsRework / mobs / frost-wolf.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="ember">[A WHOLE MOB, AS SHIPPED]</TerminalLabel>
              {`
name: "Frost Wolf"
entity: WOLF
tier: TIER_3

stats:
  health: 280
  damage: 16
  resistance: 10

equipment: {}

# Names from the built-in library, or from
# abilities.yml on the full build. Lite allows two.
abilities:
  - frostbite_players
  - poison_players

spawn:
  environment: NORMAL_NIGHT
  biomes: [ SNOWY_TAIGA, GROVE, FROZEN_PEAKS,
            SNOWY_PLAINS, SNOWY_SLOPES ]
  chance: 0.2
  group: 2-4

state:
  ai: true
  glowing: false
  faction: HOSTILE
  despawns: true

cosmetics:
  particle: AQUA_CIRCLE
  aura: CHILLING

potion-effects:
  SPEED: 2

loot:
  guaranteed:
    - { item: BONE, amount: 2-5 }
  rolls: 2
  table:
    - { weight: 60, item: IRON_INGOT, amount: 1-3 }
    - { weight: 25, item: PACKED_ICE, amount: 4-8 }
    - { weight: 10, item: DIAMOND }
    - { weight: 5, item: ENCHANTED_GOLDEN_APPLE }

rewards:
  xp-levels: 3
  currencies:
    - { type: KUMANDRA, amount: 15-40 }

# [Full build] What the codex shows a player who has
# killed one. The name, tier and kill count are filled
# in by the plugin; this is the flavour.
codex:
  flavour:
    - "Hunts in threes, and never at noon."
    - "Its breath frosts the ground it stands on."
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="sky">WHAT THAT FILE LOOKS LIKE IN GAME</SubHeading>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Shot
            className="emr-shot"
            src={Screens.frostWolf}
            alt="The Alpha Frost Wolf summoned in game"
            accent="sky"
            caption="The name plate, the frost trail from the cosmetics block, and the health readout on the action bar"
          />
          <Shot
            className="emr-shot"
            src={Screens.spawnEggs}
            alt="The spawn egg menu, with a mob's tooltip open"
            accent="lime"
            caption="/ep spawneggs. One egg per mob, with its tier, its base entity and its numbers on the tooltip"
          />
        </div>
      </Section>

      <Section>
        <Shot
          src={StoreArt.hero}
          alt="Epic Mobs Rework, what is in the box"
          accent="amber"
          caption="What a mob is made of, and what the plugin does with it"
        />
      </Section>

      <Section>
        <SubHeading accent="emerald">AND WHAT PLAYERS SEE OF IT</SubHeading>
        <Body className="pt-3 text-justify">
          <Cmd accent="emerald">/ep codex</Cmd> is every Epic Mob a player has
          personally killed. An entry is a silhouette until their first kill,
          then unlocks in stages: the mob and its flavour text first, its
          abilities and phases at <Cmd accent="emerald">codex.abilities-at</Cmd>{" "}
          kills, its drops at <Cmd accent="emerald">codex.loot-at</Cmd>. A boss
          entry also carries their best fight against it, recorded for everybody
          who landed a hit rather than only the killer.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Shot
            className="emr-shot"
            src={Screens.codex}
            alt="The codex, four of twenty discovered"
            accent="emerald"
            caption="Four of twenty discovered. The codex itself is the full build, but the kill counters behind it are recorded in both"
          />
          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">WHY THE COUNTERS ARE IN BOTH</SubHeading>
            <Body className="pt-3">
              A Lite server records every kill and every boss best time in{" "}
              <Cmd accent="sky">data/players.yml</Cmd> even though it cannot
              open the codex. That is deliberate.
            </Body>
            <Body className="pt-3">
              A server that upgrades finds every kill its players have already
              made waiting for them, rather than resetting the whole
              server&apos;s collection to zero on the day they paid for it.
            </Body>
            <div className="pt-4">
              <Note accent="amber" icon="fa-solid fa-circle-info">
                <Cmd accent="amber">/ep info [mob]</Cmd> is the public stat
                sheet and works in both builds. It is not the admin dump, which
                stays behind the permission.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-boxes-packing">
          Coming from the old Epic Mobs? Your mob definitions, raids, spawners
          and loot are read out of the old files and written into the new shape
          on first start. The migration is one way and it deletes nothing: the
          old files stay where they are, renamed, so you can go back.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Mobs;
