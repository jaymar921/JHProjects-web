import { useEffect, useState } from "react";
import { PluginInformation } from "../contants";
import {
  CommandList,
  Enchantments,
} from "../contants/custom_enchants_3/CE3Constants";
import { RedirectTo } from "../utils/PageUtility";
import {
  formatDownloads,
  useSpigetDownloads,
} from "../utils/useSpigetDownloads";
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
import CE3_Bandits from "./ce3_subcontent/CE3_Bandits";
import CE3_BuyPlugin from "../page_components/CE3_BuyPlugin";
import CE3_BUY_PayPal from "./ce3_subcontent/CE3_BUY_PayPal";
import CE3_BUY_Wise from "./ce3_subcontent/CE3_BUY_Wise";
import CE3_ChangeLogs from "./ce3_subcontent/CE3_ChangeLogs";
import CE3_BuyEnchantment from "./ce3_subcontent/CE3_BuyEnchantment";
import {
  ActionCard,
  Note,
  Panel,
  SectionHeading,
  Shot,
  StatChip,
  Terminal,
  TerminalLabel,
} from "../page_components/CE3_UIKit";
import * as FeatureArt from "../../assets/custom_enchants_3/features";
import * as ReleaseArt from "../../assets/custom_enchants_3/marketing_1_5_0";

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
  const [showWhatIsNew, setShowWhatIsNew] = useState(false);
  const downloads = useSpigetDownloads();

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in customenchantments3.html, so a crawler
    // that renders the page does not see a different title to the served one.
    document.title = "Custom Enchantments 3 | 134 Enchantments, 134 Treasures";

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
      case "bandits":
        return <CE3_Bandits />;
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
      <style>{`.back-btn{position:absolute;top:10px;left:10px;z-index:60} @media (max-width:640px){.back-btn{top:5px;left:5px}}`}</style>

      {!isPageOnly && (
        <button
          className="back-btn pixel-font rounded border border-slate-600 bg-[rgba(0,0,0,0.6)] px-2 py-1 text-xs sm:text-sm text-slate-200 hover:bg-[rgba(255,255,255,0.03)]"
          onClick={() => (window.location.href = "/")}
          aria-label="Back to home"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back
        </button>
      )}

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
              value={Enchantments.length}
              label="Enchants"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-gem"
              value={PluginInformation.treasureCount}
              label="Treasures"
              accent="rose"
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
              icon="fa-solid fa-download"
              value={formatDownloads(downloads.premium + downloads.lite)}
              label="Downloads"
              accent="lime"
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
                  Heads up: your config carries over. On the first start after
                  updating the plugin rewrites{" "}
                  <span className="pixel-font">config.yml</span> with the new
                  keys and keeps every value you had set, saving the old file as{" "}
                  <span className="pixel-font">config.yml.old</span>. Back up{" "}
                  <span className="pixel-font">
                    plugins/CustomEnchantments3
                  </span>{" "}
                  first, as always.
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

      {/* -------------------------------------------------- WHAT IS NEW 1.5.0 */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-star"
            title={`What is new in ${PluginInformation.version}`}
            subtitle="1.4.0 made the plugin fast and added nothing. This one is the opposite."
            accent="lime"
          />

          <Panel accent="lime" className="mt-6 p-5">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                  76 new enchantments, 100 new treasure items, bandit camps
                  guarding the loot plots, 25 quests already written, and a
                  candlestick price chart in the currency screen.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-wand-magic-sparkles"
                    value="+76"
                    label="Enchants"
                    accent="purple"
                  />
                  <StatChip
                    icon="fa-solid fa-gem"
                    value="+100"
                    label="Treasures"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-skull"
                    value="2-5"
                    label="Bandits"
                    accent="rose"
                  />
                  <StatChip
                    icon="fa-solid fa-scroll"
                    value="25"
                    label="Quests"
                    accent="lime"
                  />
                  <StatChip
                    icon="fa-solid fa-chart-line"
                    value="24h"
                    label="Candles"
                    accent="sky"
                  />
                </div>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-lime-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 md:w-auto md:text-[10px]"
                  onClick={() => setShowWhatIsNew((shown) => !shown)}
                  aria-expanded={showWhatIsNew}
                  aria-controls="ce3-what-is-new"
                >
                  <i
                    className={`fa-solid pr-2 ${
                      showWhatIsNew ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                  {showWhatIsNew ? "HIDE THE DETAILS" : "SEE WHAT LANDED"}
                </button>
              </div>
            </div>
          </Panel>

          {showWhatIsNew && (
            <div id="ce3-what-is-new">
              <Shot
                className="mt-6"
                src={ReleaseArt.hero}
                alt="Custom Enchantments 3 version 1.5.0, 134 enchantments and 134 treasures"
                accent="lime"
                caption="Enchantments go from 58 to 134. Treasure items go from 34 to 134."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Panel accent="purple" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-purple-300 md:text-xs">
                    76 NEW ENCHANTS
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    23 for tools, 30 for weapons, 23 for armor, including eight
                    new wand spells. Shovels and fishing rods can carry
                    enchantments now. Every one of them is a config line, so set
                    a price to 0 and it disappears from your server.
                  </p>
                </Panel>
                <Panel accent="amber" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-amber-300 md:text-xs">
                    100 NEW TREASURES
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    Each one a 16x16 sprite drawn for this release, with its own
                    name, flavour line and stat block. No two share an effect.
                    Drops are weighted across five tiers you control from
                    config.
                  </p>
                </Panel>
                <Panel accent="rose" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-rose-300 md:text-xs">
                    BANDIT CAMPS
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    Loot plots used to be a chest and a walk home. A crew of 2
                    to 5 now sits dormant on the plot until you get within 15
                    blocks, and one of them leads. They drop RACO and,
                    occasionally, a treasure.
                  </p>
                </Panel>
                <Panel accent="lime" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-lime-300 md:text-xs">
                    25 QUESTS, ALREADY WRITTEN
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    A fresh server used to start with an empty quest list, so
                    the quest entity had nothing to hand out. 25 are seeded on
                    first start now. Spawning the entity is enough.
                  </p>
                </Panel>
                <Panel accent="sky" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-sky-300 md:text-xs">
                    THE RACO PRICE CHART
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    The plugin has been logging hourly candles since 1.3.0 and
                    never showed them to anyone. The currency screen has a chart
                    item now, drawn in block characters right there in the
                    tooltip.
                  </p>
                </Panel>
                <Panel accent="purple" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-purple-300 md:text-xs">
                    FIXED AND CHANGED
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    Treasure damage and defence stats finally do something. Shop
                    screens draw a frame instead of a wall of glass panes.{" "}
                    <span className="pixel-font">/ce reload</span> stops
                    stacking duplicate tutorial screens and rebuilds the
                    treasure pool.
                  </p>
                </Panel>
              </div>

              <div className="mt-8 gap-6 lg:flex">
                <Shot
                  className="w-full lg:w-1/2"
                  src={ReleaseArt.enchants}
                  alt="A sample of the 76 new enchantments across tools, weapons and armor"
                  accent="purple"
                  caption="A few of the 76, out of 23 tools, 30 weapons and 23 armor"
                />
                <Shot
                  className="w-full pt-6 lg:w-1/2 lg:pt-0"
                  src={ReleaseArt.treasures}
                  alt="The 100 new treasure item sprites and their five drop tiers"
                  accent="amber"
                  caption="All 100 new treasures, and the odds of pulling one out of a chest"
                />
              </div>

              <Shot
                className="mt-8"
                src={ReleaseArt.update}
                alt="What was added, fixed and changed in Custom Enchantments 3 version 1.5.0"
                accent="purple"
                caption="Everything the release touched, and what 1.4.0 left in place"
              />

              <div className="pt-6">
                <Note accent="amber" icon="fa-solid fa-scale-balanced">
                  Two treasure stats start doing something in this release.
                  physical_dmg and physical_def have been shown in treasure lore
                  since the feature shipped and nothing ever read them back, so
                  they reach the damage code now. Set TreasurePhysicalDamageCap
                  and TreasurePhysicalDefenseScale to 0 if you would rather they
                  stayed decorative.
                </Note>
              </div>

              <div className="flex flex-col place-items-center justify-center gap-3 pt-6 md:flex-row">
                <button
                  className="pixel-font w-full rounded-none border-2 border-lime-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 md:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("change logs")}
                >
                  <i className="fa-solid fa-clipboard-list pr-2"></i>
                  READ THE FULL PATCH NOTES
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-slate-500/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-300 md:w-auto md:text-[11px]"
                  onClick={() => setShowWhatIsNew(false)}
                >
                  <i className="fa-solid fa-chevron-up pr-2"></i>
                  MINIMIZE
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT + TRAILER */}
      <section className="w-full py-6">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="About the plugin"
            subtitle={PluginInformation.tagline}
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
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-lime-300">
                    NO NMS
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Plain Spigot API, so a Minecraft update does not take your
                    server down with it.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-amber-300">
                    NO DEPENDENCIES
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Its own permissions file, its own economy. Drop the jar in
                    and start.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-sky-300">
                    ONE PAYMENT
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Updates for life. There is no subscription and there never
                    will be.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-rose-300">
                    TRY IT FIRST
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    The lite build is free and has passed{" "}
                    {formatDownloads(downloads.lite)} downloads.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <p className="text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
                {PluginInformation.description}
              </p>
              {PluginInformation.descriptionMore.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="pt-4 text-justify text-xs leading-relaxed text-slate-400 md:text-sm"
                >
                  {paragraph}
                </p>
              ))}
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
              hint={`One time payment, ${formatDownloads(downloads.premium)} downloads`}
              onClick={() => setSubcontent("buy plugin")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-flask"
              title="FREE TRIAL"
              description="Not sure yet? Take the lite build for a spin on your server before you commit."
              buttonIcon="fa-solid fa-file-arrow-down"
              buttonLabel="Try Plugin"
              hint={`v${downloads.liteVersion}, ${formatDownloads(downloads.lite)} downloads`}
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

Latest build 1.5.0 was tested on Minecraft 26.2.
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
          <Shot
            className="mt-6"
            src={ReleaseArt.systems}
            alt="The systems that ship with Custom Enchantments 3 beyond the enchantments"
            accent="sky"
            caption="A skill tree, an economy with a live price, quests and loot plots"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              description={`The full list of ${Enchantments.length} custom enchantments, their damage types, mana costs and levels.`}
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
              icon="fa-solid fa-skull"
              title="BANDITS"
              image={FeatureArt.bandits}
              description="Camps of 2 to 5 that wake up when you walk onto a loot plot. One of them leads, and they hit back."
              buttonIcon="fa-solid fa-skull"
              buttonLabel="Bandits"
              badge="NEW"
              onClick={() => setSubcontent("bandits")}
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
