import { useEffect, useState } from "react";
import { PluginInformation } from "../contants";
import {
  CommandList,
  Enchantments,
  SetupSteps,
  TestCommands,
} from "../contants/custom_enchants_3/CE3Constants";
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
import CE3_TrialGate from "./ce3_subcontent/CE3_TrialGate";
import CE3_BuyPlugin from "../page_components/CE3_BuyPlugin";
import CE3_BUY_PayPal from "./ce3_subcontent/CE3_BUY_PayPal";
import CE3_BUY_Wise from "./ce3_subcontent/CE3_BUY_Wise";
import CE3_ChangeLogs from "./ce3_subcontent/CE3_ChangeLogs";
import CE3_BuyEnchantment from "./ce3_subcontent/CE3_BuyEnchantment";
import {
  ActionCard,
  Cmd,
  IconBadge,
  Note,
  Panel,
  SectionHeading,
  Shot,
  StatChip,
  Step,
  Steps,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";
import * as FeatureArt from "../../assets/custom_enchants_3/features";
import * as ReleaseArt from "../../assets/custom_enchants_3/marketing_1_6_0";
// The 1.6.0 set has no "systems" draw. The 1.5.0 one is still accurate, so the
// features section keeps using it rather than a re-cut that would say the same.
import { systems as SystemsShot } from "../../assets/custom_enchants_3/marketing_1_5_0";
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackClick,
  trackedRedirect,
  usePageView,
} from "../../lib/analytics";

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
  usePageView(PROJECTS.CE3);
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
    document.title = "Custom Enchantments 3 | 159 Enchantments, 149 Treasures";

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

  /**
   * Opens a panel and records the click that opened it.
   *
   * The buy and download buttons on this page do not leave the site, they open
   * a panel with the payment options or the lite build in it. That click is
   * still the one worth counting: it is where someone decides they want the
   * plugin. The outbound link inside the panel is counted separately, under its
   * own label, so the two can be compared and the drop off is visible.
   */
  const openTracked = (panel, action, label) => () => {
    trackClick(PROJECTS.CE3, { action, label });
    setSubcontent(panel);
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
      case "free trial":
        return (
          <CE3_TrialGate setSubcontent={setSubcontent} downloads={downloads} />
        );
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
              onClick={openTracked(
                "buy plugin",
                CLICK_ACTIONS.BUY,
                "GET PREMIUM (hero)",
              )}
            >
              <i className="fa-solid fa-cart-shopping pr-2"></i>
              GET PREMIUM
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
              onClick={openTracked(
                "free trial",
                CLICK_ACTIONS.DOWNLOAD,
                "PLAY FREE (hero)",
              )}
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

      {/* ------------------------------------------------ WHAT IS NEW 1.6.0 */}
      {/*
        1.5.0 had a release banner and a separate "what is new" section, and the
        two said much the same thing one after the other. They are one section
        now: the banner is the summary, and everything else sits behind the
        toggle for the people who want it.
      */}
      <section className="ce3-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <Panel accent="rose" className="p-5 md:p-6">
            <div className="lg:flex lg:place-items-center lg:gap-6">
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
                <p className="pixel-font pt-3 text-[10px] text-rose-300 md:text-xs">
                  The economy release.
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  {PluginInformation.versionHighlight}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-wand-magic-sparkles"
                    value="+25"
                    label="Enchants"
                    accent="purple"
                  />
                  <StatChip
                    icon="fa-solid fa-gem"
                    value="+15"
                    label="Treasures"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-right-left"
                    value="Kd"
                    label="Now spends"
                    accent="lime"
                  />
                  <StatChip
                    icon="fa-solid fa-lock"
                    value="1.25M"
                    label="Still capped"
                    accent="sky"
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 pt-5 lg:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-lime-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 lg:w-auto lg:text-[10px]"
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
                <button
                  className="pixel-font w-full rounded-none border-2 border-rose-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-rose-200 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-500/20 lg:w-auto lg:text-[10px]"
                  onClick={() => setSubcontent("change logs")}
                >
                  <i className="fa-solid fa-clipboard-list pr-2"></i>
                  PATCH NOTES
                </button>
              </div>
            </div>
          </Panel>

          {showWhatIsNew && (
            <div id="ce3-what-is-new">
              <Shot
                className="mt-6"
                src={ReleaseArt.hero}
                alt="Custom Enchantments 3 version 1.6.0, 159 enchantments and 149 treasures"
                accent="lime"
                caption="Enchantments go from 134 to 159. Treasure items go from 134 to 149."
              />

              <Shot
                className="mt-6"
                src={ReleaseArt.economy}
                alt="How Custom Enchantments 3 spends Kumandra currency without minting RACO"
                accent="amber"
                caption="Pay in Kd, the plugin buys the RACO out of circulating supply, the seller is paid in RACO"
              />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Panel accent="amber" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-amber-300 md:text-xs">
                    TWO ECONOMIES, ONE RULE
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    Run Kumandra&apos;s Economy alongside this and your players
                    can settle a RACO price in Kd, or swap between the two in
                    the exchange screen. Kd never becomes RACO out of thin air:
                    the plugin buys the RACO out of circulating supply first, so
                    the 1.25 million cap still means what it always meant. Run
                    out of supply and the payment is refused and the Kd handed
                    back.
                  </p>
                </Panel>
                <Panel accent="lime" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-lime-300 md:text-xs">
                    STILL COMPLETELY STANDALONE
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    You do not need Kumandra&apos;s Economy. Without it the
                    plugin runs exactly as 1.5.0 did, and the six new config
                    keys do nothing at all. With it installed and{" "}
                    <span className="pixel-font">
                      KumandraEconomySupport: false
                    </span>{" "}
                    you get 1.5.0 behaviour back on one line. A player holding
                    enough RACO always spends the RACO.
                  </p>
                </Panel>
                <Panel accent="purple" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-purple-300 md:text-xs">
                    25 NEW ENCHANTS
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    7 weapon, 2 trident, 3 bow, 4 wand, 6 armor, 3 tool.
                    Cofferguard spends a coin to soak a heavy hit, the first
                    defensive enchantment with a running cost. Coinvein,
                    Titherow and Dredgeline pay you as you mine, harvest and
                    fish, out of the same supply rather than out of nothing.
                  </p>
                </Panel>
                <Panel accent="rose" className="p-5">
                  <p className="pixel-font text-[10px] tracking-widest text-rose-300 md:text-xs">
                    15 NEW TREASURES, AND FOUR FIXES
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    Pirate named, each with its own sprite, flavour line and
                    stat block, on the same weighted table. Fixed: you can take
                    your own RACO shop listing back down again, and the trident,
                    spear, bow and animal armor shop screens all draw their books
                    inside the frame now instead of over it.
                  </p>
                </Panel>
              </div>

              <div className="mt-8 gap-6 lg:flex">
                <Shot
                  className="w-full lg:w-1/2"
                  src={ReleaseArt.enchants}
                  alt="A sample of the 25 new enchantments across weapons, bows, wands, armor and tools"
                  accent="purple"
                  caption="A dozen of the 25, across weapons, bows, wands, armor and tools"
                />
                <Shot
                  className="w-full pt-6 lg:w-1/2 lg:pt-0"
                  src={ReleaseArt.update}
                  alt="What was added and fixed in Custom Enchantments 3 version 1.6.0"
                  accent="lime"
                  caption="Everything the release touched, and what it left alone"
                />
              </div>

              <div className="pt-6">
                <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
                  Your config carries over. On the first start after updating,
                  the plugin rewrites{" "}
                  <span className="pixel-font">config.yml</span> with the new
                  keys and keeps every value you had set, saving the old file as{" "}
                  <span className="pixel-font">config.yml.old</span>. Back up{" "}
                  <span className="pixel-font">
                    plugins/CustomEnchantments3
                  </span>{" "}
                  first, as always. And re-download the resource pack, or the 15
                  new treasures show as plain gold nuggets and coal.
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
              onClick={openTracked(
                "buy plugin",
                CLICK_ACTIONS.BUY,
                "Buy Plugin (card)",
              )}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-flask"
              title="FREE TRIAL"
              description="Not sure yet? Take the lite build for a spin on your server before you commit."
              buttonIcon="fa-solid fa-file-arrow-down"
              buttonLabel="Try Plugin"
              hint={`v${downloads.liteVersion}, ${formatDownloads(downloads.lite)} downloads`}
              onClick={openTracked(
                "free trial",
                CLICK_ACTIONS.DOWNLOAD,
                "Try Plugin (card)",
              )}
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

Latest build 1.6.0 was tested on Minecraft 26.2.
Version 1.3.3 added support for the new numbered
release scheme (26, 27, 28, 29).

No other plugins are required. Kumandra's Economy
2.0 or newer is optional: install it and the two
currencies can be spent on each other, leave it
out and nothing changes.
                `}
              </code>
            </pre>
          </Terminal>
        </div>
      </section>

      {/* ------------------------------------------------------ SETUP GUIDE */}
      {/*
        The wiki has the long form guides. This section is the short one: get
        the jar loaded, prove which edition is running, then use the op only
        test commands to see the whole plugin in an evening rather than a
        playthrough. The permissions section below is step 3 in full.
      */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-screwdriver-wrench"
            title="Setup guide"
            subtitle="Just downloaded it? Six steps from the jar to a level 200 test character."
            accent="lime"
          />

          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="lime" className="p-5">
                <SubHeading accent="lime">FIRST RUN</SubHeading>
                <Steps className="pt-2">
                  {SetupSteps.map((step) => (
                    <Step key={step.n} n={step.n} accent="lime">
                      <span className="pixel-font block text-[9px] tracking-wider text-slate-200 md:text-[10px]">
                        {step.title}
                      </span>
                      {step.cmd && (
                        <span className="mt-2 block">
                          <Cmd accent="purple">{step.cmd}</Cmd>
                        </span>
                      )}
                      <span className="mt-2 block">{step.body}</span>
                    </Step>
                  ))}
                </Steps>
              </Panel>
            </div>

            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <Terminal title="CustomEnchantments3 / first-boot.log">
                <pre>
                  <code className="text-[10px] md:text-sm" lang="md">
                    <TerminalLabel>[ON ENABLE]</TerminalLabel>
                    {`
Registered [159] custom enchantments
DataHolder Loaded
Loaded [0] Player Data.
Loaded Authorization.yml

World Guard Loaded

That last line only appears if you run WorldGuard.
It is optional, and its regions are respected when
it is there.
                    `}
                    <TerminalLabel accent="purple">
                      [THE BANNER, A FEW SECONDS LATER]
                    </TerminalLabel>
                    {`
      Current Version: 1.6.0
      Update Version:  1.6.0
      License: PREMIUM

The banner rides along with the update check, so it
prints shortly after boot rather than in the middle
of startup. License says LITE on the free build.
                    `}
                    <TerminalLabel accent="sky">
                      [WITH KUMANDRA&apos;S ECONOMY INSTALLED]
                    </TerminalLabel>
                    {`
Kumandra's Economy 2.1 hooked

Without it, the line reads "This plugin supports
Kumandra's Economy" instead, which is an advert and
not a warning. Nothing here is required.
                    `}
                  </code>
                </pre>
              </Terminal>

              <div className="pt-5">
                <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
                  The test commands are gated on OP, not on the admin
                  permission, and they are named with underscores so nobody
                  types one by accident. They are meant for a test server. Take
                  OP back off the accounts that have it before you open to
                  players.
                </Note>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <SubHeading accent="purple">THE TEST COMMANDS</SubHeading>
            <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
              Six op only commands that exist for exactly this: seeing what the
              plugin does without playing to level 200 to get there. They are in
              the command table further down too, marked as test commands.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {TestCommands.map((test) => (
                <Panel key={test.cmd} accent={test.accent} className="p-5">
                  <div className="flex place-items-center gap-3">
                    <IconBadge icon={test.icon} accent={test.accent} />
                    <span className="pixel-font text-[8px] leading-normal break-all text-slate-200 md:text-[10px]">
                      {test.cmd}
                    </span>
                  </div>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    {test.body}
                  </p>
                </Panel>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <Note accent="lime" icon="fa-solid fa-broom">
              Before the server opens, put the test accounts back:{" "}
              <span className="text-lime-300">/ce ___reset___</span> clears the
              account it is run on, or stop the server and delete
              PluginData/PlayerData.yml to clear everyone at once. Shops, quests
              and loot plots each live in their own file in the same folder and
              can go the same way.
            </Note>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- PERMISSIONS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-key"
            title="Setup permissions"
            subtitle="Step 3 of the guide above, in full."
            accent="amber"
          />
          <p className="pt-5 text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
            Custom Enchantments 3 - RPG plugin is an independent plugin and does
            not rely on a 3rd-party permissions plugin. It has its own built-in
            permissions file.
            <br />
            <br />
            While you are testing, the shipped{" "}
            <span className="font-bold text-amber-300">
              EnableAuthorizationYML: false
            </span>{" "}
            means being OP is enough for everything. Set it to true before you
            open the server and OP stops being enough on its own: creating shops
            and quests, handing out levels or currency, and the test commands
            all become limited to the names listed in{" "}
            <span className="font-bold text-amber-300">
              Authorization.yml
            </span>
            , which is the file below. Bedrock players through Geyser or
            Floodgate keep the leading dot their names arrive with.
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
            src={SystemsShot}
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
              description="How players buy enchantments with levels, with RACO, or in 1.6.0 with Kumandra currency."
              buttonIcon="fa-solid fa-dollar-sign"
              buttonLabel="Buying"
              badge="NEW"
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
              description="Four fixes in 1.6.0 came from reports like yours. Keep them coming."
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
              onClick={trackedRedirect(PROJECTS.CE3, {
                action: CLICK_ACTIONS.EXTERNAL,
                label: "Open Wiki",
                target: "https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/",
              })}
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
