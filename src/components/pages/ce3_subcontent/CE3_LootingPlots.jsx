import { lootPlots as PLOT_ART } from "../../../assets/custom_enchants_3/features";
import {
  Body,
  Chip,
  Cmd,
  Media,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
} from "../../page_components/PixelUIKit";

const LOOT_PLOT_VIDEO =
  "https://media.githubusercontent.com/media/jaymar921/JHProjects-web/refs/heads/main/src/assets/custom_enchants_3/video/ce_lootingplot.mp4";

const LOOT_ITEMS_REPO =
  "https://github.com/JnH-Projects/Custom-Enchantments-3/tree/main/loot_items";

const PLACEMENTS = ["Surface", "Underground", "Ocean Above", "Ocean Below"];

function CE3_LootingPlots() {
  return (
    <div className="w-full pb-6">
      <Section>
        <div className="flex justify-center pb-4">
          <Chip accent="sky">ADDED IN v1.0.7</Chip>
        </div>
        <Shot
          src={PLOT_ART}
          alt="A recorded loot plot structure and the rarity tiers its chests roll from"
          accent="sky"
          caption="Record a structure once, and the plugin rebuilds it near your players"
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-city"
          title="Structures that build themselves"
          accent="sky"
        />
        <div className="mt-6 gap-6 lg:flex">
          <div className="w-full lg:w-1/2">
            <Media accent="sky" caption="A loot plot generating in the world">
              <video
                src={LOOT_PLOT_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                title="A loot plot generating in the world"
              ></video>
            </Media>
          </div>
          <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
            <Body className="text-justify">
              Loot plots are structures you build yourself and hand to the
              plugin. Turn <Cmd accent="sky">GenerateLootPlots</Cmd> on and it
              rebuilds your saved plots near players as they explore, then fills
              the chests inside from your loot table.
            </Body>
            <div className="pt-5">
              <SubHeading accent="sky">WHERE THEY CAN SPAWN</SubHeading>
              <div className="flex flex-wrap gap-2 pt-3">
                {PLACEMENTS.map((place) => (
                  <Chip key={place} accent="sky">
                    {place}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="pt-5">
              <Note accent="rose" icon="fa-solid fa-skull">
                Since 1.5.0 the chest is not the only thing waiting for you. A
                bandit camp of 2 to 5 sits dormant on a generated plot until you
                walk within 15 blocks of it, and one of them leads. Set{" "}
                <Cmd accent="rose">Enabled: false</Cmd> in{" "}
                <Cmd accent="rose">bandits.yml</Cmd> if you want the old quiet
                plots back.
              </Note>
            </div>
            <div className="pt-5">
              <Note accent="lime" icon="fa-solid fa-gauge-high">
                Version 1.4.0 moved the plot scan off the main thread and fixed
                a bedrock check that was quietly stopping most plots from ever
                spawning. If you are on an older build, this is the update to
                take.
              </Note>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Media accent="sky" caption="Recording and saving your first loot plot">
          <iframe
            src="https://www.youtube.com/embed/fMuJxkC2Ebc?si=iqve_mUQgclx9n-f"
            title="Custom Enchantments 3 loot plot walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Media>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-ruler-combined"
          title="Record a plot"
          accent="amber"
        />
        <Panel accent="amber" className="mt-6 p-5">
          <Steps>
            <Step n="1" accent="amber">
              Run <Cmd accent="amber">/ce settings lootingPlot generate</Cmd> to
              drop a highlighted box in the world.
            </Step>
            <Step n="2" accent="amber">
              Build your structure inside that box. Anything outside it is
              ignored.
            </Step>
            <Step n="3" accent="amber">
              Type <Cmd accent="amber">save name,Surface</Cmd> in chat, swapping
              in the placement you want.
            </Step>
            <Step n="4" accent="amber">
              The plot is written to{" "}
              <Cmd accent="amber">PluginData/LootPlots.yml</Cmd> and joins the
              rotation.
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-box-open"
          title="Fill the chests"
          subtitle="Loot items are yours to write. Give them stats and a rarity, then let the plots hand them out."
          accent="lime"
        />
        <Panel accent="lime" className="mt-6 p-5">
          <Steps>
            <Step n="1" accent="lime">
              Stop the server first, so nothing is writing to the file while you
              edit it.
            </Step>
            <Step n="2" accent="lime">
              Open <Cmd>LootItems.yml</Cmd> in{" "}
              <Cmd>CustomEnchantments3/PluginData</Cmd>.
            </Step>
            <Step n="3" accent="lime">
              Add a line per item:{" "}
              <Cmd>name,MATERIAL,damage,penetration,TYPE,RARITY</Cmd>
            </Step>
            <Step n="4" accent="lime">
              Start the server. The new file loads on boot.
            </Step>
          </Steps>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={LOOT_ITEMS_REPO}
              accent="lime"
              icon="fa-brands fa-github"
            >
              GRAB A READY MADE LOOT FILE
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default CE3_LootingPlots;
