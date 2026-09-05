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

function EMR_Loot() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-sack-dollar"
          title="Loot worth the fight"
          subtitle="Weighted tables, not a list of coin flips."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          The old drop system was two flat lists, each item rolled independently
          against one global chance. You could not guarantee a drop, you could
          not make one item rarer than another, and you could not say &quot;two
          of these six things&quot;. All three are now the normal case.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.loot}
          alt="A weighted loot table, damage share attribution, and the payout"
          accent="amber"
          caption="Guaranteed drops, weights, rolls, and rewards split by damage dealt"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">THE TABLE</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                <span className="text-amber-300">Guaranteed drops</span> that
                land every time, with an amount range. This was simply not
                possible before.
              </Bullet>
              <Bullet accent="amber">
                <span className="text-amber-300">Weighted entries</span>, so a
                diamond at weight 10 really is six times rarer than iron at 60.
              </Bullet>
              <Bullet accent="amber">
                A <span className="text-amber-300">roll count</span>, so a mob
                drops two of the six things on its table rather than each of
                them being an independent coin flip.
              </Bullet>
              <Bullet accent="amber">
                A permission multiplier, for a VIP rank that should get better
                odds without getting a different table.
              </Bullet>
              <Bullet accent="amber">
                A minimum damage share, so somebody who hit the boss once does
                not roll on it.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">WHO GETS PAID</SubHeading>
            <Body className="pt-3">
              Rewards are distributed by damage dealt. The old plugin paid only
              whoever landed the last hit on a normal mob, and paid every
              recorded participant the full amount on a boss. Neither of those
              is fair and the second one is an economy exploit.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                XP levels, money, or both, on the same kill.
              </Bullet>
              <Bullet accent="emerald">
                A mob can pay out in more than one currency at once, or let each
                player choose which one they want.
              </Bullet>
              <Bullet accent="emerald">
                A payout reaches a player who logged out mid fight, when the
                economy behind it supports offline deposits.
              </Bullet>
              <Bullet accent="emerald">
                <Cmd accent="emerald">loot.min-damage-share: 0</Cmd> restores
                the old last-hit behaviour, if you want it.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">HOW IT IS WRITTEN</SubHeading>
        <Terminal title="EpicMobsRework / mobs / frost-wolf.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="amber">[LOOT AND REWARDS]</TerminalLabel>
              {`
loot:
  guaranteed:
    - { item: BONE, amount: 2-5 }
  rolls: 2
  table:
    - { weight: 60, item: IRON_INGOT, amount: 1-3 }
    - { weight: 25, item: PACKED_ICE, amount: 4-8 }
    - { weight: 10, item: DIAMOND }
    - { weight: 5,  ce3_treasure: RARE }
  conditions:
    - killer_has_permission: epicmobs.loot.vip
      multiplier: 1.25
    - damage_share: 0.25

rewards:
  xp-levels: 3
  currencies:
    - { type: CE3_RACO,  amount: 40-80 }
    - { type: KUMANDRA,  amount: 15, chance: 0.3 }
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-magnifying-glass">
          <Cmd accent="sky">/ep debug loot</Cmd> prints every roll and which
          entry won it. That is how you find out whether a weight of 5 against a
          weight of 60 is as rare as you meant it to be, without killing the
          same mob two hundred times and guessing.
        </Note>
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-scale-balanced">
          Lite tables hold five weighted entries plus their guaranteed drops,
          and pay one currency per mob out of the same list of providers the
          full build has. Weights, roll counts, amount ranges and damage-share
          attribution all work, because paying the wrong player is a bug and not
          a feature. Dropping CE3 treasures and enchantment books directly is
          the full build.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Loot;
