import {
  Body,
  Bullet,
  Bullets,
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

function EMR_Bosses() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-dragon"
          title="Bosses that change as they die"
          subtitle="A boss that fights the same at 100% and at 2% is a damage sponge."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          A boss in the old plugin was a mob with a boss bar. It hit exactly as
          hard at the end of the fight as at the start, which is the reason boss
          fights read as a chore rather than an event. Phases fix that, and they
          do it in a way the whole server can see.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.bosses}
          alt="Three boss phases, their thresholds, their abilities and their bar colours"
          accent="rose"
          caption="Each phase adds abilities, an entrance and a bar colour"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">WHAT A PHASE CAN DO</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                Add abilities. A boss picks up new ones on the way down rather
                than having all of them from the first hit.
              </Bullet>
              <Bullet accent="rose">
                Broadcast an entrance line, so people who are not in the fight
                still know it turned.
              </Bullet>
              <Bullet accent="rose">
                Fire an ability once on entry, which is how you get a knockback
                burst or a shield as the transition.
              </Bullet>
              <Bullet accent="rose">
                Hold immunity for a moment while it transitions, so the phase
                change is not skipped by a party burst.
              </Bullet>
              <Bullet accent="rose">
                Change the boss bar colour and title, which is free feedback
                for every player online.
              </Bullet>
              <Bullet accent="rose">
                Change its speed, so a boss that was a wall becomes a chase.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">THE RULES IT FOLLOWS</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                A phase entry fires once, on the way down only. A boss that
                heals does not replay its entrance.
              </Bullet>
              <Bullet accent="amber">
                Player-count scaling is recomputed on a phase change rather
                than every tick, so a fight that starts as a duel and becomes a
                server event adjusts once.
              </Bullet>
              <Bullet accent="amber">
                Rewards are shared by damage dealt across everyone who fought,
                including anyone who logged out before it died.
              </Bullet>
              <Bullet accent="amber">
                The boss announcement radius, the lightning, the blindness and
                the sound are all config keys rather than constants.
              </Bullet>
            </Bullets>
            <div className="pt-4">
              <Note accent="sky" icon="fa-solid fa-flask">
                Set your thresholds close together while you are testing. You
                do not want to fight your own boss for ten minutes to find out
                the third phase has a typo in it.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="rose">HOW IT IS WRITTEN</SubHeading>
        <Terminal
          title="EpicMobsRework / mobs / crypt-warden.yml"
          className="mt-5"
        >
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="rose">[THE SHIPPED BOSS]</TerminalLabel>
              {`
name: "Crypt Warden"
entity: WITHER_SKELETON
tier: TIER_6

stats:
  health: 3200
  damage: 38
  resistance: 22

equipment:
  main-hand: { item: NETHERITE_SWORD, name: "&5Wardens Cleaver" }
  helmet:    { item: NETHERITE_HELMET }
  chestplate: { item: NETHERITE_CHESTPLATE }

abilities:
  - cleave
  - last_stand
              `}
              <TerminalLabel accent="purple">[AND ITS PHASES]</TerminalLabel>
              {`
# A phase that names abilities replaces the list above
# for as long as it lasts. A phase that names none
# keeps them, so a phase can change only the colour.
phases:
  - at: 1.0
    abilities: [ cleave, last_stand ]
    bar-colour: RED

  - at: 0.6
    abilities: [ cleave, root_players, lightning_players ]
    bar-colour: PURPLE
    on-enter:
      broadcast: "&5{mob} sheds its armour and the crypt goes cold."
      ability: knockback_burst
      immune-for: 2s

  - at: 0.25
    abilities: [ cleave, lightning_all, disarm_players ]
    bar-colour: WHITE
    on-enter:
      broadcast: "&f{mob} has nothing left to lose."
      ability: lightning_all
      immune-for: 2s
      speed-multiplier: 1.35
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Shot
          className="emr-shot"
          src={Screens.cryptWarden}
          alt="The Crypt Warden in game with its boss bar and two summoned servants"
          accent="rose"
          caption="The Crypt Warden, its bar across the top of every player's screen, two Crypt Servants it summoned, and the announcement naming its power and where it woke up"
        />
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-heart-pulse">
          A boss with less health than its file asks for is not a bug: the
          server caps maximum health at 2048, so a file asking for more gets
          2048 and the plugin says so on load. The Crypt Warden above asks for
          3200 and the fight is still long, because resistance does the rest.
          If you want a longer fight, that is the number to reach for.
        </Note>
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          Boss bars are in both builds. Phases are in the full build only: a
          Lite boss is a mob with a bar, a health pool and its two abilities,
          which is a real fight, just not a changing one. Phases are a whole
          subsystem and they are visible to every player on the server, so they
          are on the paid side.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Bosses;
