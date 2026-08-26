import { bandits as BANDIT_ART } from "../../../assets/custom_enchants_3/features";
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
  StatChip,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/CE3_UIKit";

/** A sample of the 100 names shipped in bandits.yml. */
const SAMPLE_NAMES = [
  "Blackjaw Morgan",
  "Salt Tom Rourke",
  "One Eyed Peg",
  "Gutter Kate",
  "Barnacle Bell",
  "Iron Molly",
  "Nine Toes Nash",
  "Widow Marsh",
];

const CREW_TYPES = ["Zombie", "Skeleton", "Wither Skeleton", "Witch"];

const ABILITIES = ["Light Spirit", "Death Ray", "Fireball", "Frost", "Nebula"];

function CE3_Bandits() {
  return (
    <div className="w-full pb-6">
      <Section>
        <div className="flex justify-center pb-4">
          <Chip accent="rose">ADDED IN v1.5.0</Chip>
        </div>
        <Shot
          src={BANDIT_ART}
          alt="A dormant bandit camp on a loot plot, its crew, its drops and its abilities"
          accent="rose"
          caption="A camp sleeps on the plot until someone walks into it"
        />
      </Section>

      <Section>
        <Panel accent="rose" className="p-5 md:p-6">
          <Body className="text-justify">
            Loot plots used to be a chest and a walk home. There is something
            guarding them now.
          </Body>
          <Body className="pt-4 text-justify">
            A camp sits dormant on a generated loot plot until a player comes
            within 15 blocks. Then a crew of 2 to 5 spawns, and one of them is
            the leader. If notifications are on, the chat line names the leader
            you are about to meet.
          </Body>
          <div className="flex flex-wrap gap-2 pt-5">
            <StatChip
              icon="fa-solid fa-users"
              value="2-5"
              label="Crew size"
              accent="rose"
            />
            <StatChip
              icon="fa-solid fa-eye"
              value="15"
              label="Spawn radius"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-clock"
              value="900s"
              label="Camp cooldown"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-signature"
              value="100"
              label="Names"
              accent="lime"
            />
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-skull"
          title="They are a fight, not free loot"
          accent="rose"
        />
        <Panel accent="rose" className="mt-6 p-5">
          <Bullets>
            <Bullet accent="rose">
              An ordinary bandit carries 1.6x a vanilla mob&apos;s health and an
              extra point of damage. A leader carries 3x and an extra 3.5.
            </Bullet>
            <Bullet accent="rose">
              They put on a show with effects borrowed from the wand spells, on
              a chance roll every few seconds.
            </Bullet>
            <Bullet accent="rose">
              They wear helmets, so a camp that generated on the surface is
              still standing when you arrive in daylight. Their gear never
              drops.
            </Bullet>
            <Bullet accent="rose">
              Walk more than 80 blocks away and the crew despawns. The camp goes
              quiet for 15 minutes before it can arm again.
            </Bullet>
          </Bullets>
          <div className="pt-5">
            <SubHeading accent="rose">WHO SHOWS UP</SubHeading>
            <div className="flex flex-wrap gap-2 pt-3">
              {CREW_TYPES.map((type) => (
                <Chip key={type} accent="rose">
                  {type}
                </Chip>
              ))}
            </div>
            <p className="pt-3 text-[10px] text-slate-500 md:text-xs">
              Wither skeletons and witches are the two that can lead a camp.
              Both lists are yours to change.
            </p>
          </div>
          <div className="pt-5">
            <SubHeading accent="purple">WHAT THEY THROW AT YOU</SubHeading>
            <div className="flex flex-wrap gap-2 pt-3">
              {ABILITIES.map((ability) => (
                <Chip key={ability} accent="purple">
                  {ability}
                </Chip>
              ))}
            </div>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-sack-dollar"
          title="What they drop"
          accent="amber"
        />
        <Panel accent="amber" className="mt-6 p-5">
          <Body className="text-justify">
            A bandit never carries or drops a custom enchantment. The abilities
            are presentation, not loot. What they do drop is RACO, and a
            treasure item on a roll.
          </Body>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-[10px] md:text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-500">
                  <th className="py-2 pr-4 font-normal tracking-widest uppercase">
                    Kill
                  </th>
                  <th className="py-2 pr-4 font-normal tracking-widest uppercase">
                    RACO
                  </th>
                  <th className="py-2 font-normal tracking-widest uppercase">
                    Treasure chance
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-2 pr-4">Bandit</td>
                  <td className="py-2 pr-4 text-amber-300">2</td>
                  <td className="py-2 text-rose-300">6%</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Leader</td>
                  <td className="py-2 pr-4 text-amber-300">12</td>
                  <td className="py-2 text-rose-300">30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pt-5">
            <Note accent="sky" icon="fa-solid fa-dice">
              The treasure roll pulls from the same weighted table chest loot
              uses, so rare stays rare. A bandit is not a shortcut to a
              legendary.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-signature"
          title="Every bandit has a name"
          subtitle="100 of them ship in bandits.yml, and the list is yours to rewrite."
          accent="lime"
        />
        <Panel accent="lime" className="mt-6 p-5">
          <div className="flex flex-wrap gap-2">
            {SAMPLE_NAMES.map((name) => (
              <Chip key={name} accent="lime">
                CE3-{name}
              </Chip>
            ))}
          </div>
          <Body className="pt-5 text-justify">
            Every spawned bandit is named <Cmd accent="lime">CE3-</Cmd> plus one
            of the names in the list. The prefix is how the plugin knows its own
            mobs, so leave it in place if you write your own names.
          </Body>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-gears"
          title="All of it is config"
          subtitle="bandits.yml lives in CustomEnchantments3/PluginData."
          accent="sky"
        />
        <Terminal
          title="CustomEnchantments3 / PluginData / bandits.yml"
          className="mt-6"
        >
          <pre>
            <code className="text-[10px] md:text-sm" lang="yml">
              <TerminalLabel>[Camp]</TerminalLabel>
              {`
Enabled: true
MinBandits: 2
MaxBandits: 5
SpawnRadius: 15
DespawnRadius: 80
CampCooldownSeconds: 900
MaxTrackedCamps: 60
Notify: true
              `}
              <TerminalLabel>[How hard they hit]</TerminalLabel>
              {`
BanditHealthMultiplier: 1.6
LeaderHealthMultiplier: 3.0
BanditDamageBonus: 1.0
LeaderDamageBonus: 3.5
EquipHelmets: true
AbilitiesEnabled: true
AbilityChance: 0.18
AbilityCooldownSeconds: 7
              `}
              <TerminalLabel>[What you get for it]</TerminalLabel>
              {`
TreasureDropChance: 0.06
LeaderTreasureDropChance: 0.30
RacoPerBandit: 2
RacoPerLeader: 12
              `}
            </code>
          </pre>
        </Terminal>
        <div className="pt-5">
          <Note accent="amber" icon="fa-solid fa-power-off">
            Not for your server? Set <Cmd accent="amber">Enabled: false</Cmd> at
            the top of the file and loot plots go back to being quiet.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default CE3_Bandits;
