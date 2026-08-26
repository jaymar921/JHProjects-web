import CE3ShopImg from "../../../assets/custom_enchants_3/ce_shops.png";
import CE3QuestLoadImg from "../../../assets/custom_enchants_3/ce_quest_load.png";
import CE3QuestDoneImg from "../../../assets/custom_enchants_3/ce_quest_done.png";
import { shopsQuests as SHOP_ART } from "../../../assets/custom_enchants_3/features";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  Media,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
} from "../../page_components/CE3_UIKit";

const MOB_TYPES = ["HORSE", "PIGLIN", "PILLAGER", "SHEEP", "VILLAGER", "WOLF"];

const SHOP_TYPES = [
  { name: "Sword" },
  { name: "Bow" },
  { name: "Magic", note: "includes generic enchants" },
  { name: "Tool" },
  { name: "Armor" },
  { name: "Shield" },
  { name: "Trident" },
  { name: "Dummy", note: "a punching bag that reports your damage" },
  { name: "Quest", note: "needs at least one quest to exist" },
  { name: "Raco Exchange" },
  { name: "Raco Shop" },
  { name: "Disenchant" },
  { name: "Animal Armor" },
  { name: "Mace", note: "1.2.1" },
  { name: "Spear", note: "1.2.1" },
];

function CE3_Shops() {
  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={SHOP_ART}
          alt="A shop entity, its GUI and an active quest tracker"
          accent="lime"
          caption="Shops are real entities. Right click one to open its GUI."
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-shop"
          title="Place a shop anywhere"
          accent="lime"
        />
        <div className="mt-6 gap-6 lg:flex">
          <div className="w-full lg:w-1/2">
            <Panel accent="lime" className="p-1">
              <img
                className="h-[220px] w-full object-cover md:h-[300px]"
                src={CE3ShopImg}
                alt="Shop entities standing in a Minecraft world"
                loading="lazy"
              />
            </Panel>
          </div>
          <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
            <Body className="text-justify">
              You can drop a shop or a quest entity anywhere in the world.{" "}
              <Cmd>/ce shop</Cmd> opens the shop GUI when{" "}
              <Cmd accent="sky">EnableShopCommand</Cmd> is{" "}
              <Cmd accent="lime">true</Cmd> in config.yml. Turn it off and the
              same command lists every shop coordinate in the world instead.
            </Body>
            <Body className="pt-4 text-justify">
              <Cmd>/ce quest</Cmd> works the same way. It shows where the quest
              entities are, or the details of the quest you are currently on.
            </Body>
            <div className="pt-5">
              <Note accent="lime" icon="fa-solid fa-shield-halved">
                A background task keeps shop entities alive, teleports them back
                if they wander, and removes boats that players try to steal them
                with.
              </Note>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Media accent="lime" caption="Setting up a shop from scratch">
          <iframe
            src="https://www.youtube.com/embed/Me7zZfF8e1s?si=OW_q1mlAPnSL8zxJ"
            title="Custom Enchantments 3 shop setup walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Media>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-hammer"
          title="Create your shop"
          accent="amber"
        />
        <div className="mt-6 gap-4 lg:flex">
          <Panel accent="amber" className="w-full p-5 lg:w-1/2">
            <Steps>
              <Step n="1" accent="amber">
                Stand where you want the shop, facing the direction it should
                look.
              </Step>
              <Step n="2" accent="amber">
                Run{" "}
                <Cmd accent="amber">
                  /ce shop add [mobType] [shopType] [shopName]
                </Cmd>
              </Step>
              <Step n="3" accent="amber">
                The shop spawns at your position, pointing the way you were
                facing.
              </Step>
            </Steps>
            <div className="pt-4">
              <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
                Both [mobType] and [shopType] are case sensitive. Type them
                exactly as they appear below.
              </Note>
            </div>
          </Panel>

          <div className="w-full pt-4 lg:w-1/2 lg:pt-0">
            <Panel accent="sky" className="p-5">
              <SubHeading accent="sky">MOB TYPES</SubHeading>
              <div className="flex flex-wrap gap-2 pt-3">
                {MOB_TYPES.map((mob) => (
                  <Chip key={mob} accent="sky">
                    {mob}
                  </Chip>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-list"
          title="Shop types"
          subtitle="One shop sells one item class. Build as many as your world needs."
          accent="purple"
        />
        <Panel accent="purple" className="mt-6 p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_TYPES.map((shop) => (
              <div
                key={shop.name}
                className="flex place-items-center gap-3 border-l-2 border-purple-400/40 py-1 pl-3"
              >
                <span className="text-xs text-slate-200 md:text-sm">
                  {shop.name}
                </span>
                {shop.note && (
                  <span className="text-[10px] text-slate-500">
                    {shop.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-scroll"
          title="Create your quests"
          subtitle="Customisable objectives and rewards, written straight from in game chat."
          accent="amber"
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Shot
            src={CE3QuestLoadImg}
            alt="A quest being handed out by a quest entity"
            accent="amber"
            caption="Taking a quest from a quest giver"
          />
          <Shot
            src={CE3QuestDoneImg}
            alt="A completed quest handing over its reward"
            accent="lime"
            caption="Returning to the same shop to collect the reward"
          />
        </div>

        <Panel accent="amber" className="mt-6 p-5">
          <SubHeading accent="amber">HOW A QUEST WORKS</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Build the quest conversationally with{" "}
              <Cmd accent="amber">/ce quest add</Cmd>, then bind it to a quest
              shop using <Cmd accent="amber">/ce quest modifyEntity</Cmd> while
              standing next to it.
            </Bullet>
            <Bullet accent="amber">
              Objectives come in five flavours: KILL, PLANT, PLACE, MINE and
              CONSUME. Each has a _NEAR variant that also wants a named entity
              within 8 blocks.
            </Bullet>
            <Bullet accent="amber">
              Finish the count, walk back to the shop that issued it, and
              collect RACO, an item and XP.
            </Bullet>
            <Bullet accent="amber">
              Turning a quest down puts it on cooldown for as long as
              SelectQuestCoolDown says.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="lime" icon="fa-solid fa-scroll">
              You do not have to write any of this yourself to get started. From
              1.5.0 a fresh server is seeded with 25 quests on first start, so
              spawning the entity is enough. They are ordinary quests, identical
              to what <Cmd accent="lime">/ce quest add</Cmd> produces, and they
              are only written when the quest list is empty, so a server that
              already has quests is never touched.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Media accent="amber" caption="Writing a quest from start to finish">
          <iframe
            src="https://www.youtube.com/embed/8Ojqnw-8Mnc?si=yt0FDYUMAaVbQG1e"
            title="Custom Enchantments 3 quest creation walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Media>
      </Section>
    </div>
  );
}

export default CE3_Shops;
