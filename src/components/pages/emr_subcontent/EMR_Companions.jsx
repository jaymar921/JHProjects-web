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
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";

const FACTIONS = [
  {
    name: "HOSTILE",
    accent: "rose",
    note: "The default, and what every mob in the old plugin was. It attacks players.",
  },
  {
    name: "NEUTRAL",
    accent: "amber",
    note: "Fights back but never starts it. Good for anything that should be dangerous to annoy rather than dangerous to meet.",
  },
  {
    name: "FRIENDLY",
    accent: "emerald",
    note: "Never targets a player. This is what a companion, a mount or an escort is built on.",
  },
  {
    name: "GUARDIAN",
    accent: "sky",
    note: "Hunts hostile mobs, Epic and vanilla, and ignores players entirely. Post real defenders around a town without writing a single new spawn rule.",
  },
];

function EMR_Companions() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-paw"
          title="Companions that fight for you"
          subtitle="Any Epic Mob can be built as a friend instead of an enemy."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          A player claims one and it is theirs. It follows them, fights what
          they fight, never hits them or their allies, and levels up as they
          play, unlocking abilities as it goes. Death puts it on a cooldown
          rather than deleting it, unless you want the hardcore version, in
          which case you can have that too. Give it a saddle and it becomes a
          mount.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.companions}
          alt="A companion's behaviour, the four factions, and what else runs on the same machinery"
          accent="emerald"
          caption="One companion per player, four factions, and the same machinery behind all of them"
        />
      </Section>

      <Section>
        <SubHeading accent="sky">FOUR FACTIONS</SubHeading>
        <Body className="pt-3 text-justify">
          One field on a mob definition decides which side it is on. Everything
          in this panel falls out of that field plus the behaviour attached to
          it, which is why guardians and escorts cost nothing extra once
          companions exist.
        </Body>
        <div className="mt-5 grid gap-3">
          {FACTIONS.map((faction) => (
            <div
              key={faction.name}
              className="flex flex-wrap place-items-baseline gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
            >
              <Chip accent={faction.accent}>{faction.name}</Chip>
              <span className="grow text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {faction.note}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">HOW A COMPANION BEHAVES</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Bound with a token item, or by claiming a tamed mob. One active
                companion per player out of the box, and that number is a
                config key.
              </Bullet>
              <Bullet accent="emerald">
                Teleports to its owner past a leash distance, despawns when
                they log out, and comes back at their feet when they return.
              </Bullet>
              <Bullet accent="emerald">
                Attacks whatever its owner attacked most recently, and never
                damages the owner or the owner&apos;s allies. With Custom
                Enchantments 3 installed, ally lists are read from CE3.
              </Bullet>
              <Bullet accent="emerald">
                Gains experience when its owner kills something nearby. Levels
                raise health and damage and unlock abilities from the mob
                definition&apos;s own list.
              </Bullet>
              <Bullet accent="emerald">
                Carries the equipment from its mob definition, so a companion
                holding a CE3 enchanted sword triggers what is on it.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">COMMANDING IT</SubHeading>
            <Body className="pt-3">
              <Cmd accent="sky">/ep companion</Cmd> opens a small wheel:
              follow, stay, passive, aggressive, dismiss and rename. Everything
              is stored per player, keyed by UUID, and survives a restart.
            </Body>
            <div className="pt-4">
              <SubHeading accent="amber">AND TWO OTHER THINGS</SubHeading>
              <Bullets className="pt-3">
                <Bullet accent="amber">
                  <span className="text-amber-300">Guardians</span> hunt hostile
                  mobs and ignore players, so a town can have defenders that do
                  not turn on the people living in it.
                </Bullet>
                <Bullet accent="amber">
                  <span className="text-amber-300">Escorts</span> are friendly
                  mobs with somewhere to be, that players have to keep alive.
                  Point one at a destination and that is an escort quest with no
                  quest system involved.
                </Bullet>
              </Bullets>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          This whole panel is the full build. In Lite every mob is HOSTILE, the
          faction field is accepted in a file and warned about on load rather
          than rejected, and no companion, mount, escort or guardian code is
          compiled into the jar at all. It is the largest single feature in the
          rework, so it is the one the paid build is anchored on.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Companions;
