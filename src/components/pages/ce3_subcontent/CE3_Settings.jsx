import { configuration as CONFIG_ART } from "../../../assets/custom_enchants_3/features";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";

const REPO = "https://github.com/JnH-Projects/Custom-Enchantments-3";

const FILES = [
  ["config.yml", "Prices, mana costs, cooldowns, drop rates and every toggle"],
  ["lang.yml", "Every line of text your players will read"],
  ["PlayerData.yml", "Skills, allies and RACO balances"],
  ["ShopConfig.yml", "The shop entities you have placed"],
  [
    "QuestConfig.yml",
    "Quests and which shop hands them out, 25 seeded on a fresh server",
  ],
  [
    "bandits.yml",
    "Bandit camps: crew size, difficulty, drops and their 100 names",
  ],
  ["ExpConfig.yml", "XP per mob type and per block type"],
  ["LootItems.yml", "Your custom loot item definitions"],
  ["LootPlots.yml", "Saved loot plot structures"],
  ["TradeData.yml", "RACO supply, price and trade history"],
  ["WorldData.yml", "Protected boundaries"],
  ["Authorization.yml", "Players allowed to run admin commands"],
];

function CE3_Settings() {
  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={CONFIG_ART}
          alt="The plugin's configuration files and the toggles in config.yml"
          accent="sky"
          caption="Everything the plugin does is driven by plain YAML you can edit"
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-gears"
          title="Tune it to your server"
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          Custom Enchantments 3 keeps its settings in ordinary YAML files. There
          is no database to set up and no external plugin to install. Change a
          value, run <Cmd accent="sky">/ce reload</Cmd>, and you are done.
        </Body>
        <div className="pt-5">
          <Note accent="amber" icon="fa-solid fa-rotate">
            When you update the plugin, config.yml is rewritten from the new
            default and your existing values are carried across. The old file is
            kept next to it as config.yml.old in case you want to compare.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-folder-tree"
          title="What lives where"
          accent="purple"
        />
        <Panel accent="purple" className="mt-6 p-5">
          <div className="grid gap-3 md:grid-cols-2">
            {FILES.map(([file, what]) => (
              <div
                key={file}
                className="border-l-2 border-purple-400/40 py-1 pl-3"
              >
                <p className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                  {file}
                </p>
                <p className="pt-1 text-[11px] text-slate-400 md:text-xs">
                  {what}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-toggle-on"
          title="The toggles worth knowing"
          accent="lime"
        />
        <Terminal title="CustomEnchantments3 / config.yml" className="mt-6">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel>[World and access]</TerminalLabel>
              {`
CustomEnchantsWorld: []       # empty means every world
EnableAuthorizationYML: false # true reads Authorization.yml
EnableShopCommand: false      # true lets /ce shop open the GUI
`}
              <TerminalLabel>[Gameplay]</TerminalLabel>
              {`
AllowUseAllEnchantDenyClass: false # true lifts class restrictions
AllowOneActiveSkill: true          # one active enchant per weapon
EnchantLimit: 5                    # custom enchants per item
ShowActionBar: true                # health, speed and mana readout
`}
              <TerminalLabel>[World generation]</TerminalLabel>
              {`
GenerateLootPlots: true      # rebuild saved plots near players
CustomLootingAllowed: true   # inject LootItems.yml into chests
`}
              <TerminalLabel>[Treasures, new in 1.5.0]</TerminalLabel>
              {`
TreasureItemChance: 0.05        # chance a chest slot gives a treasure
TreasurePhysicalDamageCap: 6.0  # 0 keeps physical_dmg decorative
TreasureMagicalDamageCap: 6.0   # 0 restores the old uncapped total
TreasurePhysicalDefenseScale: 0.25
MagicWandNoEnchantOnCraft: false # true crafts a blank wand
`}
            </code>
          </pre>
        </Terminal>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-circle-info">
            The snippet above is a shortened view of the keys people ask about
            most. Your config.yml holds a lot more, including a price line for
            every single enchantment.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-shield-halved"
          title="Protected boundaries"
          accent="amber"
        />
        <Panel accent="amber" className="mt-6 p-5">
          <SubHeading accent="amber">/ce settings protection add</SubHeading>
          <Body className="pt-3 text-justify">
            Draw a box around anything you want left alone. Inside it the plugin
            blocks the following:
          </Body>
          <Bullets className="pt-3">
            <Bullet accent="amber">Breaking and placing blocks</Bullet>
            <Bullet accent="amber">Explosions</Bullet>
            <Bullet accent="amber">Hostile mob spawns</Bullet>
            <Bullet accent="amber">Arrow impacts</Bullet>
            <Bullet accent="amber">Custom enchantments and spells</Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="lime" icon="fa-solid fa-map">
              Anyone with customenchants.admin can still build inside a
              protected box. WorldGuard regions are respected too, if you have
              WorldGuard installed.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Panel accent="lime" className="p-6 text-center">
          <SubHeading accent="lime">DEFAULT AND COMMUNITY CONFIGS</SubHeading>
          <Body className="mx-auto max-w-xl pt-3">
            Grab a fresh copy of the default settings, or share the setup you
            have tuned so other server owners can start from it.
          </Body>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={REPO}
              accent="lime"
              icon="fa-brands fa-github"
            >
              OPEN THE GITHUB REPO
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default CE3_Settings;
