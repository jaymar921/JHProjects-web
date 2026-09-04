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
                always the end of it.
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
              <TerminalLabel accent="ember">[A WHOLE MOB]</TerminalLabel>
              {`
name: "Frost Wolf"
entity: WOLF
tier: 3

stats:
  health: 750
  damage: 45
  resistance: 20

equipment:
  main-hand: { material: IRON_SWORD, ce3: { BLEED: 2 } }
  helmet:    { material: LEATHER_HELMET, colour: "#7dd3fc" }

abilities: [ frost_nova, chilling_howl ]

state:
  ai: true
  faction: HOSTILE
  despawns: true

cosmetics:
  particle: BLUE_CIRCLE
  aura: CHILLING

potion-effects:
  SPEED: 2

summons:
  - mob: "Frost Pup"
    trigger: ON_DEATH
    count: 2
              `}
            </code>
          </pre>
        </Terminal>
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
