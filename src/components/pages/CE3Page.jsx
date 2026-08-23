import { useEffect, useState } from "react";
import { PluginInformation } from "../contants";
import {
  CommandList,
  Enchantments,
} from "../contants/custom_enchants_3/CE3Constants";
import { RedirectTo } from "../utils/PageUtility";
import CE3_Classes from "./ce3_subcontent/CE3_Classes";
import WindowWrap from "../modals/windowWrap";
import CE3_Enchants from "./ce3_subcontent/CE3_Enchants";
import CE3_CommandTableComponent from "../page_components/CE3_CommandTableComponent";
import CE3_Support from "../page_components/CE3_Support";
import CE3_Shops from "./ce3_subcontent/CE3_Shops";
import PageFooter from "../page_components/PageFooter";
import CE3_Settings from "./ce3_subcontent/CE3_Settings";
import CE3_LOGO from "../../assets/custom_enchants_3/ce3-logo.png";
import CE3_BANNER from "../../assets/custom_enchants_3/banner.jpg";
import CE3_LootingPlots from "./ce3_subcontent/CE3_LootingPlots";
import CE3_CustomItems from "./ce3_subcontent/CE3_CustomItems";
import CE3_DonatePi from "./ce3_subcontent/CE3_DonatePi";
import CE3_BugReport from "./ce3_subcontent/CE3_BugReport";
import CE3_BuyPlugin from "../page_components/CE3_BuyPlugin";
import CE3_BUY_PayPal from "./ce3_subcontent/CE3_BUY_PayPal";
import CE3_BUY_Wise from "./ce3_subcontent/CE3_BUY_Wise";
import CE3_ChangeLogs from "./ce3_subcontent/CE3_ChangeLogs";
import CE3_BuyEnchantment from "./ce3_subcontent/CE3_BuyEnchantment";
import {
  ActionCard,
  Panel,
  SectionHeading,
  StatChip,
  Terminal,
  TerminalLabel,
} from "../page_components/CE3_UIKit";
import * as FeatureArt from "../../assets/custom_enchants_3/features";

const pageStyles = `
  .ce3-pixelated { image-rendering: pixelated; }
  .ce3-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .ce3-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes ce3-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .ce3-float { animation: ce3-float 4s ease-in-out infinite; }
  @keyframes ce3-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .ce3-blink { animation: ce3-blink 1.4s steps(2, end) infinite; }
`;

function CE3Page() {
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    document.title = "Custom Enchantments 3";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = CE3_LOGO;
  }, []);

  const closeWindow = () => {
    setSubcontent("none");
  };

  const subContent = () => {
    switch (subcontent) {
      case "classes":
        return <CE3_Classes />;
      case "enchants":
        return <CE3_Enchants />;
      case "support":
        return <CE3_Support setSubcontent={setSubcontent} />;
      case "buy plugin":
        return <CE3_BuyPlugin setSubcontent={setSubcontent} />;
      case "buy through paypal":
        return <CE3_BUY_PayPal setSubcontent={setSubcontent} />;
      case "buy through wise":
        return <CE3_BUY_Wise setSubcontent={setSubcontent} />;
      case "donate pi":
        return <CE3_DonatePi setSubcontent={setSubcontent} />;
      case "shops or quests":
        return <CE3_Shops />;
      case "settings":
        return <CE3_Settings />;
      case "looting plots":
        return <CE3_LootingPlots />;
      case "custom items":
        return <CE3_CustomItems />;
      case "bug report":
        return <CE3_BugReport />;
      case "change logs":
        return <CE3_ChangeLogs />;
      case "buy enchantments":
        return <CE3_BuyEnchantment />;
      default:
        return (
          <>
            <div className="text-center w-full py-20 text-xs">
              <h3 className="pb-8">... Ongoing development ...</h3>
              <a
                href="https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/"
                target="_blank"
                className="p-2 border-2 text-[10px] md:text-sm"
              >
                View Plugin Info (Old site)
              </a>
            </div>
          </>
        );
    }
  };

  const subContentWindow = () => {
    if (subcontent !== "none")
      return (
        <WindowWrap close={closeWindow} title={subcontent}>
          {subContent()}
        </WindowWrap>
      );
    else <></>;
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0e1014]">
      <style>{pageStyles}</style>

      {/* ---------------------------------------------------------- HERO */}
      <header className="relative flex min-h-[560px] w-full place-items-center justify-center overflow-hidden md:min-h-[640px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CE3_BANNER})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.8)_60%,rgba(14,16,20,1)_100%)]" />
        <div className="ce3-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={CE3_LOGO}
            alt="Custom Enchantments 3 logo"
            className="ce3-pixelated ce3-float mx-auto h-16 w-16 md:h-24 md:w-24 drop-shadow-[0_0_25px_rgba(163,230,53,0.55)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-lime-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="ce3-blink h-2 w-2 bg-lime-400"></span>
            <span className="pixel-font text-[8px] md:text-[10px] tracking-widest text-lime-300">
              v{PluginInformation.version} LIVE NOW
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-lime-400 md:text-[2.4em] [text-shadow:0_0_24px_rgba(163,230,53,0.55),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-purple-300 hover:text-purple-200"
              href={PluginInformation.authorSocial}
              target="_blank"
            >
              {PluginInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-lime-400/70 bg-lime-500/15 py-3 text-[10px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:bg-lime-500/30 hover:border-lime-300 md:w-auto md:px-6 md:text-xs"
              onClick={() => setSubcontent("buy plugin")}
            >
              <i className="fa-solid fa-cart-shopping pr-2"></i>
              GET PREMIUM
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(PluginInformation.trialLink)}
            >
              <i className="fa-solid fa-file-arrow-down pr-2"></i>
              PLAY FREE
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-wand-magic-sparkles"
              value={`${Enchantments.length}+`}
              label="Enchants"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-hat-wizard"
              value="3"
              label="Classes"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={`${CommandList.length}`}
              label="Commands"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={PluginInformation.supportedVersions}
              label="Supported"
              accent="lime"
            />
          </div>
        </div>
      </header>

      {/* --------------------------------------------------- LATEST BUILD */}
      <section className="ce3-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="rose" className="p-5 md:p-6">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-rose-400/50 bg-rose-500/15 px-2 py-1 text-[8px] tracking-widest text-rose-300">
                    NEW BUILD
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    released {PluginInformation.versionReleaseDate}
                  </span>
                </div>
                <p className="pt-3 text-xs text-slate-300 md:text-sm">
                  {PluginInformation.versionHighlight}
                </p>
                <p className="pt-2 text-[10px] text-amber-400/90 md:text-xs">
                  <i className="fa-solid fa-triangle-exclamation pr-1"></i>
                  Heads up: if you use{" "}
                  <span className="pixel-font">/ce reload</span>, player RACO
                  balances were being wiped on every reload. That is fixed here,
                  so update as soon as you can.
                </p>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-rose-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-rose-200 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-500/20 md:w-auto md:text-[10px]"
                  onClick={() => setSubcontent("change logs")}
                >
                  <i className="fa-solid fa-clipboard-list pr-2"></i>
                  READ THE PATCH NOTES
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT + TRAILER */}
      <section className="w-full py-6">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="About the plugin"
            accent="purple"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="purple" className="p-1">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/0A0tKMnEpIA?si=--DmxZQMp0GW-q4J"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Panel>
            </div>
            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <p className="text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
                {PluginInformation.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- PRICING */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-tag"
            title="Get your copy now"
            subtitle="One time payment, free updates for life. No subscription."
            accent="amber"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ActionCard
              accent="lime"
              icon="fa-solid fa-crown"
              title="PREMIUM"
              badge={`${PluginInformation.currency_symbol}${PluginInformation.price}`}
              description="Every feature unlocked, all future updates included. Buy once, keep it forever."
              buttonIcon="fa-solid fa-cart-shopping"
              buttonLabel="Buy Plugin"
              hint="One time payment"
              onClick={() => setSubcontent("buy plugin")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-flask"
              title="FREE TRIAL"
              description="Not sure yet? Take the lite build for a spin on your server before you commit."
              buttonIcon="fa-solid fa-file-arrow-down"
              buttonLabel="Try Plugin"
              hint={PluginInformation.trialTitle}
              onClick={() => RedirectTo(PluginInformation.trialLink)}
            />
            <ActionCard
              accent="rose"
              icon="fa-solid fa-shield-heart"
              title="SUPPORT DEV"
              description="Already have the plugin? A donation keeps the updates coming."
              buttonIcon="fa-solid fa-heart"
              buttonLabel="Support"
              hint="Thank you"
              onClick={() => setSubcontent("support")}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- REQUIREMENTS */}
      <section className="ce3-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-server"
            title="Server requirements"
            subtitle={`Runs on Spigot and Paper, ${PluginInformation.supportedVersions}.`}
            accent="sky"
          />
          <Terminal
            title="CustomEnchantments3 / server-check.log"
            className="mt-6"
          >
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                <TerminalLabel>[Minimum Server Requirement]</TerminalLabel>
                {`
- CPU:     1Ghz | At least 2 Cores
- RAM:     At least 2GB
- STORAGE: At least 1GB
- NETWORK: At least 3mbps

Note: [PREMIUM VERSION] is not available in Aternos.
      You are required to have a dedicated server if
      you want to use the full feature of this plugin.
                `}
                <TerminalLabel>[Supported Server Softwares]</TerminalLabel>
                {`
- SPIGOT [1.16.4 - 26.2] (Recommended)
- PAPER  [1.16.4 - 26.2]

Latest build 1.4.0 was tested on Minecraft 26.2.
Version 1.3.3 added support for the new numbered
release scheme (26, 27, 28, 29).
                `}
              </code>
            </pre>
          </Terminal>
        </div>
      </section>

      {/* -------------------------------------------------------- COMMANDS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Plugin commands"
            subtitle={`${CommandList.length} commands, admin only ones are marked in the table.`}
            accent="lime"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <button
                className="pixel-font rounded-none border-2 border-lime-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 md:text-[11px]"
                onClick={() => setShowCommand(true)}
              >
                <i className="fa-solid fa-chevron-down pr-2"></i>
                SHOW COMMANDS
              </button>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="lime" className="overflow-x-auto p-3 md:p-4">
                <CE3_CommandTableComponent />
              </Panel>
              <div className="pt-4 text-center">
                <button
                  className="pixel-font rounded-none border-2 border-slate-500/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-300 md:text-[11px]"
                  onClick={() => setShowCommand(false)}
                >
                  <i className="fa-solid fa-chevron-up pr-2"></i>
                  HIDE COMMANDS
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------- PERMISSIONS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-key"
            title="Setup permissions"
            accent="amber"
          />
          <p className="pt-5 text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
            Custom Enchantments 3 - RPG plugin is an independent plugin and does
            not rely on a 3rd-party permissions plugin. It has its own built-in
            permissions file.
            <br />
            <br />
            In order for you to have full access to the plugin commands such as
            create shops or quests, give player levels or currency, and do the
            test plugin commands. You are required to modify the{" "}
            <span className="font-bold text-amber-300">
              Authorization.yml
            </span>{" "}
            file, see example below.
          </p>
          <Terminal
            title="CustomEnchantments3 / PluginData / Authorization.yml"
            className="mt-6"
          >
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                {`
# Aside from OPed players that has access to
# the plugin's admin commands, you can also list
# players by their 'names' to allow them using the
# command.
plugin_admin_access:
  - JayMar921
  - MikaPiaChu921
  - Sekai47
# For bedrock players [using geyser/floodgate]
  - .JhonoBrine
  - .JezTerBahYout
  - .EliteLeonidas
                `}
              </code>
            </pre>
          </Terminal>
        </div>
      </section>

      {/* --------------------------------------------------------- FEATURES */}
      <section className="ce3-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-dice-d20"
            title="Plugin features"
            subtitle="Pick a panel to see what is inside."
            accent="purple"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ActionCard
              accent="amber"
              icon="fa-solid fa-hat-wizard"
              title="CLASSES"
              image={FeatureArt.classes}
              description="Warrior, Archer and Mage. Player roles and class paths with their own skills and passives."
              buttonIcon="fa-solid fa-hat-wizard"
              buttonLabel="Classes"
              onClick={() => setSubcontent("classes")}
            />
            <ActionCard
              accent="lime"
              icon="fa-solid fa-shop"
              title="SHOPS &amp; QUESTS"
              image={FeatureArt.shopsQuests}
              description="Build shops, training dummies and quest givers straight from in game commands."
              buttonIcon="fa-solid fa-shop"
              buttonLabel="Shops"
              onClick={() => setSubcontent("shops or quests")}
            />
            <ActionCard
              accent="purple"
              icon="fa-solid fa-wand-magic-sparkles"
              title="ENCHANTS"
              image={FeatureArt.enchantments}
              description={`The full list of ${Enchantments.length}+ custom enchantments, their damage types, mana costs and levels.`}
              buttonIcon="fa-solid fa-wand-magic-sparkles"
              buttonLabel="Enchants"
              onClick={() => setSubcontent("enchants")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-city"
              title="LOOTING PLOTS"
              image={FeatureArt.lootPlots}
              description="Custom structures that generate in your world, loaded with loot worth hunting for."
              buttonIcon="fa-solid fa-city"
              buttonLabel="Plots"
              onClick={() => setSubcontent("looting plots")}
            />
            <ActionCard
              accent="rose"
              icon="fa-solid fa-cube"
              title="CUSTOM ITEMS"
              image={FeatureArt.treasures}
              description="Treasures, abilities and craftables that only exist inside Custom Enchantments 3."
              buttonIcon="fa-solid fa-cube"
              buttonLabel="Items"
              onClick={() => setSubcontent("custom items")}
            />
            <ActionCard
              accent="lime"
              icon="fa-solid fa-coins"
              title="BUYING"
              image={FeatureArt.racoEconomy}
              description="How players buy enchantments with levels or with RACO, the built-in currency."
              buttonIcon="fa-solid fa-dollar-sign"
              buttonLabel="Buying"
              onClick={() => setSubcontent("buy enchantments")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-gears"
              title="SETTINGS"
              image={FeatureArt.configuration}
              description="Every option in config.yml explained, from world restrictions to loot plot spawn rates."
              buttonIcon="fa-solid fa-gears"
              buttonLabel="Settings"
              onClick={() => setSubcontent("settings")}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- SUPPORT / UPDATES */}
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-headset"
            title="Developer support"
            subtitle="Found something broken, or just want to see what changed? Start here."
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ActionCard
              accent="rose"
              icon="fa-solid fa-bug"
              title="REPORT BUGS"
              description="1.4.0 shipped 16 bug fixes that came from reports like yours. Keep them coming."
              buttonIcon="fa-solid fa-bug"
              buttonLabel="Report"
              onClick={() => setSubcontent("bug report")}
            />
            <ActionCard
              accent="amber"
              icon="fa-solid fa-clipboard-list"
              title="PATCH NOTES"
              description={`Full update history, latest is v${PluginInformation.version} from ${PluginInformation.versionReleaseDate}.`}
              buttonIcon="fa-solid fa-clipboard-list"
              buttonLabel="Logs"
              badge="NEW"
              onClick={() => setSubcontent("change logs")}
            />
            <ActionCard
              accent="purple"
              icon="fa-solid fa-book"
              title="WIKI"
              description="The older documentation site, still handy for step by step setup guides."
              buttonIcon="fa-solid fa-up-right-from-square"
              buttonLabel="Open Wiki"
              onClick={() =>
                RedirectTo(
                  "https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/",
                )
              }
            />
          </div>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <PageFooter />
    </div>
  );
}

export default CE3Page;
