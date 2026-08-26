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
import * as FeatureArt from "../../../assets/kumandras_economy/features";

const TASKS = ["KILL_*", "FEED_*", "MINE_*", "CRAFT_*"];

function KE_Quests() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-scroll"
          title="Quests from villagers and animals"
          subtitle="A reason to go somewhere, on a timer, for a reward you choose."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Every few minutes the plugin rolls for a quest. When it lands, a quest
          giver appears with a task and a countdown. Finish in time and the
          reward is paid out in items, money or experience. Miss it and it
          expires, with a warning first.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.quests}
          alt="A Kumandra's Economy quest, its task, its timer and the three reward types"
          accent="amber"
          caption="One quest as a player sees it, and the three keys that decide how often quests appear"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">TWO KINDS OF GIVER</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                <span className="text-slate-200">VILLAGER</span> quests come
                from a villager with a visual effect on it, so players can spot
                one across a settlement.
              </Bullet>
              <Bullet accent="amber">
                <span className="text-slate-200">ANIMAL</span> quests come from
                the farm animals already wandering your world.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">THREE KINDS OF REWARD</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                <span className="text-slate-200">ITEM</span> pays out any
                ItemStack you write into the quest.
              </Bullet>
              <Bullet accent="emerald">
                <span className="text-slate-200">MONEY</span> pays out in Kd,
                straight into their balance.
              </Bullet>
              <Bullet accent="emerald">
                <span className="text-slate-200">EXP</span> pays out
                experience.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">TASK TYPES</SubHeading>
        <Body className="pt-3">
          A task is a verb and a target, so{" "}
          <Cmd accent="sky">KILL_ZOMBIE</Cmd> or{" "}
          <Cmd accent="sky">FEED_COW</Cmd>. CRAFT checks the player&apos;s
          inventory for the item rather than watching the bench, which means it
          doubles as a cooking or gathering task.
        </Body>
        <div className="flex flex-wrap gap-2 pt-4">
          {TASKS.map((task) => (
            <Chip key={task} accent="sky">
              {task}
            </Chip>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="emerald">HOW OFTEN THEY APPEAR</SubHeading>
        <Body className="pt-3 text-justify">
          Three keys, and one of them turns the whole system off. The default is
          a 15% roll every five minutes, which works out to a handful of quests
          across a normal evening rather than a constant stream.
        </Body>
        <Terminal title="KumandrasEconomy / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="emerald">[QUEST EVENT]</TerminalLabel>
              {`
AllowQuest: true
# 0.15 = a 15% chance per interval
QuestChance: 0.15
# minutes between rolls
QuestInterval: 5
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Panel accent="teal" className="p-5">
          <SubHeading accent="teal">WRITING YOUR OWN</SubHeading>
          <Body className="pt-3 text-justify">
            Quests live in <Cmd accent="teal">Data/Quest.yml</Cmd>, and the file
            ships with the format documented in its own comments. A quest is a
            type, a title, the chat lines the giver says, a duration in seconds,
            a task, a count and a reward.
          </Body>
          <Terminal title="KumandrasEconomy / Data / Quest.yml" className="mt-4">
            <pre>
              <code className="text-[10px] md:text-sm" lang="yaml">
                {`
- ==: me.jaymar921.kumandraseconomy.datahandlers.QuestData
  Type: VILLAGER
  Title: Kill Zombie
  Message:
    - Kill 5 zombies for a diamond sword
  Duration: 320
  Task: KILL_ZOMBIE
  Count: 5
  RewardType: ITEM
  ItemReward:
    ==: org.bukkit.inventory.ItemStack
    v: 2730
    type: DIAMOND_SWORD
  ExpReward: 0
                `}
              </code>
            </pre>
          </Terminal>
          <div className="pt-4">
            <Note accent="rose" icon="fa-solid fa-ruler-horizontal">
              The indentation has to match the rest of the list exactly, which
              is the one awkward part of this file. Authoring quests from in
              game, the way shops are built, is on the list for the next
              version.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-clock">
          Players get a warning before a quest runs out, so an expiry is never a
          surprise. Set <Cmd accent="sky">AllowQuest: false</Cmd> if you would
          rather your server had none of this.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Quests;
