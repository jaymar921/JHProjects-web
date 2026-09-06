import { useEffect, useState } from "react";
import {
  CommandList,
  EditionMatrix,
  Features,
  KnownGaps,
  ModelCredits,
  Permissions,
  PluginInformation,
  ReleaseState,
  Screenshots,
  SetupSteps,
  SetupTests,
  TestingAsks,
} from "../contants/epic_mobs_rework/EMRConstants";
import { EMR_Logs } from "../contants/epic_mobs_rework/EMRConstants_Logs";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import EMR_CommandTableComponent from "../page_components/EMR_CommandTableComponent";
import Changelog from "../page_components/Changelog";
import EMR_Mobs from "./emr_subcontent/EMR_Mobs";
import EMR_Abilities from "./emr_subcontent/EMR_Abilities";
import EMR_Bosses from "./emr_subcontent/EMR_Bosses";
import EMR_Companions from "./emr_subcontent/EMR_Companions";
import EMR_World from "./emr_subcontent/EMR_World";
import EMR_Raids from "./emr_subcontent/EMR_Raids";
import EMR_Loot from "./emr_subcontent/EMR_Loot";
import EMR_Integrations from "./emr_subcontent/EMR_Integrations";
import EMR_Setup from "./emr_subcontent/EMR_Setup";
import EMR_DevApi from "./emr_subcontent/EMR_DevApi";
import EMR_Config from "./emr_subcontent/EMR_Config";
import EMR_Editions from "./emr_subcontent/EMR_Editions";
import EMR_BugReport from "./emr_subcontent/EMR_BugReport";
import EMR_ChangeLogs from "./emr_subcontent/EMR_ChangeLogs";
import EMR_Guides from "./emr_subcontent/EMR_Guides";
import EMR_Requirements from "./emr_subcontent/EMR_Requirements";
import EMR_Gallery from "./emr_subcontent/EMR_Gallery";
import EMR_BUY_PayPal from "./emr_subcontent/EMR_BUY_PayPal";
import EMR_BUY_Wise from "./emr_subcontent/EMR_BUY_Wise";
import { Walkthroughs } from "../contants/epic_mobs_rework/EMRConstants_Guides";
import {
  ActionCard,
  Cmd,
  Collapsible,
  IconBadge,
  Media,
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
import EMR_ICON from "../../assets/epic_mobs_rework/branding/icon.png";
import EMR_BANNER from "../../assets/epic_mobs_rework/banner.svg";
import EMR_TRAILER from "../../assets/epic_mobs_rework/video/epic-mobs-rework.mp4";
import EMR_POSTER from "../../assets/epic_mobs_rework/video/epic-mobs-rework-poster.jpg";
import { PROJECTS, usePageView } from "../../lib/analytics";

const pageStyles = `
  .emr-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .emr-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes emr-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .emr-float { animation: emr-float 4s ease-in-out infinite; }
  @keyframes emr-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .emr-blink { animation: emr-blink 1.4s steps(2, end) infinite; }

  /*
    Real screenshots are nearest-neighbour Minecraft textures. Scaled up by the
    browser's default smoothing they turn to mush, which is the same failure the
    trailer had before its textures were pinned to anisotropy 1. The class is
    global rather than scoped to this section because the feature panels use the
    same screenshots inside the modal, which renders outside this subtree.
  */
  .emr-shot img {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
`;

/** The three states a line of ReleaseState can be in. */
const PROGRESS_STYLE = {
  done: {
    accent: "emerald",
    icon: "fa-solid fa-circle-check",
    label: "DONE",
    chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  },
  "in progress": {
    accent: "amber",
    icon: "fa-solid fa-spinner",
    label: "IN PROGRESS",
    chip: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  },
  "not yet": {
    accent: "rose",
    icon: "fa-solid fa-circle-minus",
    label: "NOT YET",
    chip: "border-rose-400/40 bg-rose-400/10 text-rose-300",
  },
};

/** How many rows of the edition table the teaser shows before the window. */
const EDITION_PREVIEW = EditionMatrix.slice(0, 7);

/**
 * The jump bar under the hero.
 *
 * The page is long because the plugin is large, and the fix for a long page is
 * not to say less about it but to make the length navigable. Every section
 * below has an id, and the bar sticks to the top so the way back out of the
 * middle of the page is always one tap away rather than a scroll.
 */
const SECTIONS = [
  { id: "rc", label: "RC1", icon: "fa-solid fa-flask" },
  { id: "about", label: "ABOUT", icon: "fa-solid fa-book-open" },
  { id: "features", label: "FEATURES", icon: "fa-solid fa-dice-d20" },
  { id: "guides", label: "HOW TO", icon: "fa-solid fa-list-check" },
  { id: "shots", label: "SCREENSHOTS", icon: "fa-solid fa-camera" },
  { id: "pricing", label: "PRICE", icon: "fa-solid fa-tag" },
  { id: "setup", label: "SETUP", icon: "fa-solid fa-screwdriver-wrench" },
  { id: "commands", label: "COMMANDS", icon: "fa-solid fa-terminal" },
  { id: "changelog", label: "CHANGES", icon: "fa-solid fa-clock-rotate-left" },
  { id: "support", label: "SUPPORT", icon: "fa-solid fa-headset" },
];

/**
 * The four walkthroughs the page itself puts a card in front of. The rest are
 * one click further in, from the index inside the window: ten cards on the
 * page would be the same wall of text this section exists to replace.
 */
const GUIDE_CARDS = [
  "create-mob-chat",
  "create-mob-editor",
  "create-raid",
  "arena-setup",
];

function EpicMobsReworkPage() {
  usePageView(PROJECTS.EPIC_MOBS_REWORK);
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  /*
    Which walkthrough the guides window opens on. Every entry point into it
    names one, because a window that always opens on "create a mob" makes
    somebody who clicked "set up an arena" go and find it again.
  */
  const [guideKey, setGuideKey] = useState(Walkthroughs[0].key);

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in epic-mobs-rework.html, so a crawler
    // that renders the page does not see a different title to the served one.
    document.title =
      "Epic Mobs Rework | Custom mobs, bosses and raids for Spigot";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = EMR_ICON;
  }, []);

  const closeWindow = () => setSubcontent("none");

  const openGuide = (key) => {
    setGuideKey(key);
    setSubcontent("guides");
  };

  const subContent = () => {
    switch (subcontent) {
      case "mobs":
        return <EMR_Mobs />;
      case "abilities":
        return <EMR_Abilities />;
      case "bosses":
        return <EMR_Bosses />;
      case "companions":
        return <EMR_Companions />;
      case "world":
        return <EMR_World />;
      case "raids":
        return <EMR_Raids />;
      case "loot":
        return <EMR_Loot />;
      case "integrations":
        return <EMR_Integrations />;
      case "setup":
        return <EMR_Setup />;
      case "api":
        return <EMR_DevApi />;
      case "config":
        return <EMR_Config />;
      case "editions":
        return <EMR_Editions />;
      case "bug report":
        return <EMR_BugReport />;
      case "change logs":
        return <EMR_ChangeLogs />;
      case "guides":
        return <EMR_Guides initial={guideKey} />;
      case "requirements":
        return <EMR_Requirements />;
      case "gallery":
        return <EMR_Gallery />;
      case "buy through paypal":
        return <EMR_BUY_PayPal />;
      case "buy through wise":
        return <EMR_BUY_Wise />;
      default:
        return null;
    }
  };

  /* The window's own title bar, which reads better than the raw switch key. */
  const WINDOW_TITLES = {
    guides: "Step by step guides",
    requirements: "Requirements & permissions",
    gallery: "Screenshots",
    "bug report": "Report something",
    "change logs": "Release history",
    api: "Developer API",
    "buy through paypal": "Buy through PayPal",
    "buy through wise": "Buy through Wise",
  };

  const WINDOW_ICONS = {
    guides: "fa-solid fa-list-check",
    requirements: "fa-solid fa-server",
    gallery: "fa-solid fa-camera",
    "bug report": "fa-solid fa-bug",
    "change logs": "fa-solid fa-clipboard-list",
    api: "fa-solid fa-code",
    "buy through paypal": "fa-brands fa-paypal",
    "buy through wise": "fa-solid fa-qrcode",
  };

  const subContentWindow = () => {
    if (subcontent === "none") return null;
    return (
      <WindowWrap
        close={closeWindow}
        title={WINDOW_TITLES[subcontent] ?? subcontent}
        accent="ember"
        icon={WINDOW_ICONS[subcontent] ?? "fa-solid fa-skull"}
      >
        {subContent()}
      </WindowWrap>
    );
  };

  const inDevelopment = EMR_Logs.find((log) => !log.release_date);
  const latestRelease = EMR_Logs.find((log) => log.release_date);
  const { price } = PluginInformation;

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
          style={{ backgroundImage: `url(${EMR_BANNER})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.78)_60%,rgba(14,16,20,1)_100%)]" />
        <div className="emr-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={EMR_ICON}
            alt="Epic Mobs Rework logo"
            className="emr-float mx-auto h-16 w-16 rounded-lg object-cover md:h-24 md:w-24 drop-shadow-[0_0_25px_rgba(249,115,22,0.6)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="emr-blink h-2 w-2 bg-amber-400"></span>
            <span className="pixel-font text-[8px] md:text-[10px] tracking-widest text-amber-300">
              {PluginInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-orange-400 md:text-[2.4em] [text-shadow:0_0_24px_rgba(249,115,22,0.55),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-orange-300 hover:text-orange-200"
              href={PluginInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {PluginInformation.author}
            </a>
          </p>

          {/*
            Two download buttons rather than one, and the free one first. Lite
            is a complete plugin rather than a demo, so it is the honest thing
            to lead with, and a release candidate is worth trying before it is
            worth buying.
          */}
          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <a
              href={PluginInformation.liteDownloadLink}
              target="_blank"
              rel="noreferrer"
              className="pixel-font inline-flex w-full max-w-[280px] place-items-center justify-center gap-2 rounded-none border-2 border-emerald-400/70 bg-emerald-500/15 py-3 text-[10px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-download"></i>
              GET LITE, FREE
            </a>
            <a
              href={PluginInformation.downloadLink}
              target="_blank"
              rel="noreferrer"
              className="pixel-font inline-flex w-full max-w-[280px] place-items-center justify-center gap-2 rounded-none border-2 border-orange-400/70 bg-orange-500/15 py-3 text-[10px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-crown"></i>
              FULL, {price.symbol}
              {price.amount}
              {price.onSale && (
                <span className="text-orange-300/60 line-through">
                  {price.symbol}
                  {price.regularAmount}
                </span>
              )}
            </a>
            <a
              href="#trailer"
              className="pixel-font inline-flex w-full max-w-[280px] place-items-center justify-center gap-2 rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-play"></i>
              WATCH THE TRAILER
            </a>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-skull"
              value="20"
              label="Mobs in the box"
              accent="ember"
            />
            <StatChip
              icon="fa-solid fa-layer-group"
              value="6"
              label="Tiers"
              accent="rose"
            />
            <StatChip
              icon="fa-solid fa-wand-sparkles"
              value="20+"
              label="Abilities"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-door-open"
              value="6"
              label="Spawn paths"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-tower-observation"
              value="5"
              label="Raid anchors"
              accent="rose"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={CommandList.length}
              label="Commands"
              accent="lime"
            />
            <StatChip
              icon="fa-solid fa-scale-balanced"
              value="2"
              label="Editions"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={PluginInformation.supportedVersions}
              label="Supported"
              accent="emerald"
            />
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- NAV */}
      {/*
        Sticky, horizontally scrollable on a phone, and every target is a real
        anchor rather than a scroll handler, so a middle click opens the
        section in a new tab and the back button undoes a jump.
      */}
      <nav
        aria-label="Sections of this page"
        className="sticky top-0 z-40 border-b border-slate-800 bg-[rgba(11,13,17,0.94)] backdrop-blur-sm"
      >
        <div className="mx-auto flex w-[94%] gap-1 overflow-x-auto py-2 md:w-[80%] lg:w-[70%]">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="pixel-font shrink-0 border border-transparent px-2.5 py-2 text-[7px] tracking-widest whitespace-nowrap text-slate-400 transition-colors hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200 md:text-[9px]"
            >
              <i className={`${section.icon} pr-1.5 opacity-70`}></i>
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* --------------------------------------------- THE RELEASE CANDIDATE */}
      {/*
        First thing under the hero, and it says release candidate before it
        says anything else. RC1 has every 1.0 feature in it, which is exactly
        why it would be easy to read as 1.0, and an owner putting it on a live
        server has to know which one they have got. The known gaps are here
        rather than three clicks into a changelog for the same reason.
      */}
      <section id="rc" className="emr-grid relative w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="lg:flex lg:place-items-start lg:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-amber-400/60 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                    RELEASE CANDIDATE
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    {PluginInformation.releaseDateLabel}
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                  Everything on the 1.0 list is built. What it has not had is
                  your server.
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  This is a real build of the whole plugin, published so it can
                  be broken by somebody other than its author. Two rounds of
                  playing it found bugs that nothing else was ever going to,
                  and both rounds found the same kind: a subsystem reporting
                  progress it was not making. A raid drew its bar, counted its
                  waves and ran its timer while spawning nothing. An arena did
                  the same. Neither threw, neither logged a word, and both
                  looked fine right up until you counted the mobs.
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                  Those are fixed, and the plugin now says so in the console
                  when a raid or an arena places nothing three times running.
                  There is no date for 1.0 proper and there will not be a guess
                  at one: 1.0 is what this becomes when the reports stop
                  turning things up. Back up{" "}
                  <span className="text-slate-300">plugins/EpicMobs</span>{" "}
                  before you update.
                </p>
                <p className="pt-3 text-[11px] leading-relaxed text-orange-300/90 md:text-xs">
                  <i className="fa-solid fa-tag pr-2"></i>
                  {price.symbol}
                  {price.amount} {price.currency} for the full build while it is
                  a release candidate, up from there to {price.symbol}
                  {price.regularAmount} when 1.0 ships. Buy it now and 1.0 is
                  the same purchase. The Lite build is free and is a complete
                  plugin, not a trial.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-circle-check"
                    value={
                      ReleaseState.filter((row) => row.state === "done").length
                    }
                    label="Shipped"
                    accent="emerald"
                  />
                  <StatChip
                    icon="fa-solid fa-flask"
                    value={TestingAsks.length}
                    label="Needs testing"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-triangle-exclamation"
                    value={KnownGaps.length}
                    label="Known gaps"
                    accent="rose"
                  />
                  <StatChip
                    icon="fa-solid fa-code-branch"
                    value="1"
                    label="Payment, ever"
                    accent="sky"
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 pt-5 lg:w-[240px] lg:pt-0">
                <a
                  href={PluginInformation.liteDownloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-emerald-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 lg:text-[10px]"
                >
                  <i className="fa-solid fa-download"></i>
                  DOWNLOAD LITE
                </a>
                <a
                  href={PluginInformation.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-orange-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 lg:text-[10px]"
                >
                  <i className="fa-solid fa-crown"></i>
                  BUY THE FULL BUILD
                </a>
                <button
                  className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-rose-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-rose-200 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-500/20 lg:text-[10px]"
                  onClick={() => setSubcontent("bug report")}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  REPORT SOMETHING
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-amber-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 lg:text-[10px]"
                  onClick={() => setShowProgress((shown) => !shown)}
                  aria-expanded={showProgress}
                  aria-controls="emr-progress"
                >
                  <i
                    className={`fa-solid pr-2 ${
                      showProgress ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                  {showProgress ? "HIDE STATUS" : "1.0 STATUS"}
                </button>
              </div>
            </div>
          </Panel>

          {showProgress && (
            <div id="emr-progress" className="mt-6 grid gap-3">
              {ReleaseState.map((row) => {
                const style = PROGRESS_STYLE[row.state];
                return (
                  <div
                    key={row.area}
                    className="flex flex-wrap place-items-baseline gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
                  >
                    <span
                      className={`pixel-font shrink-0 border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${style.chip}`}
                    >
                      {style.label}
                    </span>
                    <span className="pixel-font shrink-0 text-[9px] text-slate-200 md:text-[10px]">
                      {row.area}
                    </span>
                    <span className="grow basis-full text-[11px] leading-relaxed text-slate-400 md:basis-0 md:text-xs">
                      {row.note}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/*
            What the RC is asking for, and what it cannot do. Both start closed.
            They are the two most important blocks on the page for somebody who
            has already decided to run the release candidate, and the two least
            important for somebody still working out what the plugin is, so the
            page offers them rather than spending eight panels of height on
            them before anyone has asked.
          */}
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Collapsible
              accent="rose"
              icon="fa-solid fa-hand-holding-heart"
              title="WHAT WOULD MOST HELP"
              hint="Four things, in the order they are worth. The first three need somebody who is not the author, and two of them need a second player."
              count={TestingAsks.length}
            >
              <div className="grid gap-3">
                {TestingAsks.map((ask) => (
                  <Panel key={ask.title} accent={ask.accent} className="p-4">
                    <div className="flex place-items-center gap-3">
                      <IconBadge icon={ask.icon} accent={ask.accent} />
                      <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                        {ask.title}
                      </p>
                    </div>
                    <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      {ask.body}
                    </p>
                  </Panel>
                ))}
              </div>
            </Collapsible>

            <Collapsible
              accent="amber"
              icon="fa-solid fa-triangle-exclamation"
              title="WHAT IT DOES NOT DO"
              hint="On the page rather than buried in a changelog. Saying which of them is a decision on this side and which is waiting on another project is the difference between a gap and an excuse."
              count={KnownGaps.length}
            >
              <div className="grid gap-3">
                {KnownGaps.map((gap) => (
                  <Panel key={gap.title} accent={gap.accent} className="p-4">
                    <div className="flex flex-wrap place-items-center gap-2">
                      <p className="pixel-font grow text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                        {gap.title}
                      </p>
                      <span
                        className={`pixel-font shrink-0 border px-2 py-1 text-[7px] tracking-widest ${
                          gap.ours
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                            : "border-slate-500/40 bg-slate-500/10 text-slate-400"
                        }`}
                        title={
                          gap.ours
                            ? "A decision on this side"
                            : "Waiting on something outside this developer's control"
                        }
                      >
                        {gap.ours ? "OUR CALL" : "NOT OURS TO FIX"}
                      </span>
                    </div>
                    <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      {gap.body}
                    </p>
                  </Panel>
                ))}
              </div>
            </Collapsible>
          </div>

          <div className="pt-6 text-center">
            <button
              className="pixel-font rounded-none border-2 border-orange-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 md:text-[11px]"
              onClick={() => setSubcontent("change logs")}
            >
              <i className="fa-solid fa-clipboard-list pr-2"></i>
              THE FULL WRITE-UP
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ ABOUT + TRAILER */}
      <section id="about" className="w-full scroll-mt-14 py-6">
        <span id="trailer" className="block" />
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="About the plugin"
            subtitle={PluginInformation.tagline}
            accent="ember"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Media accent="ember">
                {/*
                  Drawn rather than filmed. It was made before there was a
                  build to record, and it stays because it is a better piece of
                  film than a screen capture would be. The screenshots further
                  down are the real thing, and they are labelled as such so
                  neither one has to pretend to be the other.

                  It does not autoplay, so it is not muted either: it has a
                  music bed and somebody who presses play meant to press play.
                  It does not loop, because it ends on a credits card and
                  looping would cut the music off mid fade. preload is none so
                  the file is not fetched by anybody who never watches it.
                */}
                <video
                  src={EMR_TRAILER}
                  poster={EMR_POSTER}
                  controls
                  playsInline
                  preload="none"
                  aria-label="Epic Mobs Rework feature trailer"
                />
              </Media>
              <p className="pt-2 text-center text-[10px] tracking-wide text-slate-500 md:text-xs">
                Drawn, not filmed. It shows the design. For the plugin actually
                running, the screenshots below are from a 1.0-RC1 server.
              </p>

              {/*
                Credit for the models, on the page as well as on the last card
                of the video. The licence asks for attribution wherever the work
                appears, and the video appears here.
              */}
              <details className="mt-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3">
                <summary className="cursor-pointer text-[10px] tracking-wide text-slate-500 md:text-xs">
                  <i className="fa-solid fa-cube pr-2"></i>
                  3D models used, under {ModelCredits.licence}
                </summary>
                <p className="pt-3 text-[10px] leading-relaxed text-slate-500 md:text-xs">
                  {ModelCredits.note}
                </p>
                <ul className="list-none pt-3">
                  {ModelCredits.models.map((model) => (
                    <li
                      key={`${model.name}-${model.author}`}
                      className="flex flex-wrap justify-between gap-2 border-b border-slate-800/80 py-1.5 text-[10px] text-slate-400 md:text-[11px]"
                    >
                      <span className="text-slate-300">{model.name}</span>
                      {model.url ? (
                        <a
                          className="text-orange-300 hover:text-orange-200"
                          href={model.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {model.author}
                        </a>
                      ) : (
                        <span>{model.author}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </details>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {PluginInformation.traits.map((trait) => (
                  <div
                    key={trait.title}
                    className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3"
                  >
                    <p
                      className={`pixel-font text-[9px] tracking-widest ${
                        {
                          ember: "text-orange-300",
                          amber: "text-amber-300",
                          sky: "text-sky-300",
                          emerald: "text-emerald-300",
                        }[trait.accent]
                      }`}
                    >
                      {trait.title}
                    </p>
                    <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                      {trait.body}
                    </p>
                  </div>
                ))}
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

              <div className="pt-5">
                <Note accent="sky" icon="fa-solid fa-box-archive">
                  {PluginInformation.predecessor.body}{" "}
                  <a
                    className="text-sky-300 underline"
                    href={PluginInformation.predecessor.href}
                  >
                    The old page is still up
                  </a>
                  .
                </Note>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section id="features" className="emr-grid w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-dice-d20"
            title="What it does"
            subtitle={`${Features.length} panels. Pick one to see what is inside it.`}
            accent="ember"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in Epic Mobs Rework`}
                description={feature.description}
                buttonIcon={feature.icon}
                buttonLabel={feature.button}
                onClick={() => setSubcontent(feature.key)}
              />
            ))}
          </div>
        </div>
      </section>


      {/* --------------------------------------------------- STEP BY STEP */}
      <section id="guides" className="w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-list-check"
            title="How to actually do it"
            subtitle={`${Walkthroughs.length} walkthroughs: build a mob, delete one, run a raid, mark out an arena. Each one is the commands in order, with what should happen after each.`}
            accent="lime"
          />

          <div className="pt-5">
            <Note accent="lime" icon="fa-solid fa-book">
              The plugin is closed source, so anything you cannot work out by
              reading it is written down instead: the chat wizard&apos;s
              fourteen questions word for word, the editor&apos;s six pages, the
              order the raid scheduler refuses in, and the one thing about an
              arena region that everybody gets wrong.
            </Note>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {GUIDE_CARDS.map((key) => {
              const guide = Walkthroughs.find((entry) => entry.key === key);
              return (
                <ActionCard
                  key={guide.key}
                  accent={guide.accent}
                  icon={guide.icon}
                  title={guide.title}
                  badge={guide.edition === "full" ? "FULL" : undefined}
                  description={guide.blurb}
                  buttonIcon="fa-solid fa-list-ol"
                  buttonLabel={`${guide.steps.length} steps`}
                  onClick={() => openGuide(guide.key)}
                />
              );
            })}
          </div>

          {/*
            The rest of the walkthroughs as one row of links rather than ten
            more cards, which would be the same wall this section replaces.
          */}
          <div className="mt-6">
            <Collapsible
              accent="sky"
              icon="fa-solid fa-list-ul"
              title="EVERY WALKTHROUGH"
              hint="The other six, and the four above, in one list."
              count={Walkthroughs.length}
            >
              <div className="grid gap-2 md:grid-cols-2">
                {Walkthroughs.map((guide) => (
                  <button
                    key={guide.key}
                    onClick={() => openGuide(guide.key)}
                    className="flex w-full place-items-center gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3 text-left transition-colors hover:border-orange-400/50 hover:bg-orange-500/10"
                  >
                    <i
                      className={`${guide.icon} shrink-0 text-xs text-orange-400`}
                    ></i>
                    <span className="grow text-[11px] leading-relaxed text-slate-300 md:text-xs">
                      {guide.short}
                    </span>
                    <span className="pixel-font shrink-0 text-[7px] tracking-widest text-slate-600 md:text-[8px]">
                      {guide.group.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- SCREENSHOTS */}
      {/*
        Real screenshots, and the section says so, because everything else
        illustrating this page is drawn. Only the three wide ones are here now.
        The menus are in the gallery window: they are rendered at their natural
        size, which is small, and nine of them in a row is a scroll rather than
        a section.
      */}
      <section id="shots" className="w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-camera"
            title="What it looks like running"
            subtitle="Photographs, not art. Taken on a server running 1.0-RC1."
            accent="sky"
          />

          <div className="mt-8 grid gap-6">
            {Screenshots.filter((shot) => shot.wide).map((shot) => (
              <div key={shot.key}>
                <p className="pixel-font pb-3 text-[9px] tracking-widest text-slate-300 md:text-[11px]">
                  <i className="fa-solid fa-angle-right pr-2 text-orange-400"></i>
                  {shot.title}
                </p>
                <Shot
                  className="emr-shot"
                  src={shot.src}
                  alt={shot.caption}
                  accent={shot.accent}
                  caption={shot.caption}
                />
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <button
              className="pixel-font rounded-none border-2 border-sky-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 md:text-[11px]"
              onClick={() => setSubcontent("gallery")}
            >
              <i className="fa-solid fa-images pr-2"></i>
              ALL {Screenshots.length} SCREENSHOTS, AND THE MENUS
            </button>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- PRICING */}
      {/*
        Three ways to pay, the same three Custom Enchantments 3 offers: the
        Spigot listing, PayPal, or Wise. CE3 takes a few percent off for the
        two manual routes. This does not, because the price is already a
        pre-release one: £7.99 while the plugin is a release candidate, and
        £15.99 once 1.0 ships. One discount at a time, and the sale is it.
      */}
      <section id="pricing" className="w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-tag"
            title="What it costs"
            subtitle="On pre-release sale. One payment, free updates for life. There is no subscription and there never will be."
            accent="amber"
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Panel accent="ember" className="p-5 lg:col-span-2">
              <div className="flex flex-wrap place-items-center gap-3">
                <IconBadge icon="fa-solid fa-crown" accent="ember" />
                <p className="pixel-font text-[10px] tracking-wide text-orange-300 md:text-xs">
                  THE FULL BUILD
                </p>
                <span className="pixel-font ml-auto flex flex-wrap place-items-center gap-2 border border-orange-400/50 bg-orange-500/15 px-3 py-1.5 text-[10px] tracking-widest text-orange-200 md:text-xs">
                  {price.onSale && (
                    <span className="text-orange-300/60 line-through">
                      {price.symbol}
                      {price.regularAmount}
                    </span>
                  )}
                  {price.symbol}
                  {price.amount} {price.currency}
                </span>
              </div>
              {price.onSale && (
                <p className="pixel-font pt-4 text-[9px] tracking-widest text-amber-300 md:text-[11px]">
                  <i className="fa-solid fa-bolt pr-2"></i>
                  {price.saleLabel}
                </p>
              )}
              <p className="pt-4 text-xs leading-relaxed text-slate-300 md:text-sm">
                {price.note} You buy it once and every update after it is
                included, the same way Custom Enchantments 3 has worked since it
                went on sale. A monthly plugin bill on a server that already
                costs you money to run is not a thing this developer is going to
                add to.
              </p>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {price.saleNote}
              </p>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                Three ways to pay it. Spigot is the quick one: it takes the
                payment and hands you the jar. PayPal and Wise are handled by
                hand, so you send the exact amount, email the receipt with your
                Spigot username, and the resource is granted to your account.{" "}
                {PluginInformation.payment.noDiscountNotice}
              </p>
              <div className="flex flex-col gap-3 pt-5 sm:flex-row">
                <a
                  href={PluginInformation.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-orange-400/60 bg-orange-500/15 px-5 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/30 sm:w-auto md:text-[11px]"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  BUY ON SPIGOT
                </a>
                {/*
                  The two manual routes. They open the step by step panel
                  rather than the payment link, because the steps are the
                  point: pay the exact amount, then email the receipt with a
                  Spigot username or nothing can be granted.
                */}
                <button
                  className="pixel-font w-full rounded-none border-2 border-sky-400/60 bg-sky-500/10 px-5 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/25 sm:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("buy through paypal")}
                >
                  <i className="fa-brands fa-paypal pr-2"></i>
                  PAY WITH PAYPAL
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-lime-400/60 bg-lime-500/10 px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/25 sm:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("buy through wise")}
                >
                  <i className="fa-solid fa-qrcode pr-2"></i>
                  PAY WITH WISE
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-orange-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 sm:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("editions")}
                >
                  <i className="fa-solid fa-scale-balanced pr-2"></i>
                  WHAT YOU GET
                </button>
                <a
                  href="/customenchantments3"
                  className="pixel-font inline-flex w-full place-items-center justify-center rounded-none border-2 border-lime-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 sm:w-auto md:text-[11px]"
                >
                  <i className="fa-solid fa-arrow-right pr-2"></i>
                  SAME DEAL ON CE3
                </a>
              </div>
            </Panel>

            <Panel accent="emerald" className="p-5">
              <div className="flex place-items-center gap-3">
                <IconBadge icon="fa-solid fa-gift" accent="emerald" />
                <p className="pixel-font text-[10px] tracking-wide text-emerald-300 md:text-xs">
                  THE LITE BUILD
                </p>
              </div>
              <p className="pt-4 text-xs leading-relaxed text-slate-300 md:text-sm">
                Free, and not a trial. The same plugin with limits on how much
                you can build, so you can see exactly how it runs on your own
                server before you spend anything.
              </p>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                It carries the same twenty mobs, and they do not count against
                the ten definitions you may write. Nothing in it expires,
                nothing phones home, and every integration works in it. Try
                that first. That is what it is for.
              </p>
              <div className="pt-5">
                <a
                  href={PluginInformation.liteDownloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-emerald-400/60 bg-emerald-500/15 px-5 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/30 md:text-[11px]"
                >
                  <i className="fa-solid fa-download"></i>
                  DOWNLOAD LITE
                </a>
              </div>
              <div className="pt-5">
                <Note accent="rose" icon="fa-solid fa-circle-exclamation">
                  There are no refunds once the full build is bought, which is
                  exactly why the free one exists and why it is a complete
                  plugin rather than a demo. Run Lite on your own server first.
                </Note>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- EDITIONS */}
      <section className="emr-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-scale-balanced"
            title="Lite and full, side by side"
            subtitle={`The first ${EDITION_PREVIEW.length} rows of ${EditionMatrix.length}. The rest are one click away.`}
            accent="amber"
          />
          <Panel accent="amber" className="mt-6 overflow-x-auto p-3 md:p-4">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                    Feature
                  </th>
                  <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
                    Lite, free
                  </th>
                  <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-orange-300 md:text-[10px]">
                    Full
                  </th>
                </tr>
              </thead>
              <tbody>
                {EDITION_PREVIEW.map((entry) => (
                  <tr
                    key={entry.feature}
                    className="border-b border-slate-800 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                  >
                    <td className="px-2 py-2.5 align-top text-[11px] text-slate-300 md:text-xs">
                      {entry.feature}
                    </td>
                    <td className="px-2 py-2.5 text-center align-top text-[10px] text-slate-300 md:text-[11px]">
                      {entry.lite === true ? (
                        <i className="fa-solid fa-circle-check text-xs text-emerald-400"></i>
                      ) : entry.lite === false ? (
                        <i className="fa-solid fa-minus text-xs text-slate-600"></i>
                      ) : (
                        entry.lite
                      )}
                    </td>
                    <td className="px-2 py-2.5 text-center align-top text-[10px] text-slate-300 md:text-[11px]">
                      {entry.full === true ? (
                        <i className="fa-solid fa-circle-check text-xs text-orange-400"></i>
                      ) : entry.full === false ? (
                        <i className="fa-solid fa-minus text-xs text-slate-600"></i>
                      ) : (
                        entry.full
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
          <div className="pt-5 text-center">
            <button
              className="pixel-font rounded-none border-2 border-amber-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 md:text-[11px]"
              onClick={() => setSubcontent("editions")}
            >
              <i className="fa-solid fa-table-list pr-2"></i>
              SEE ALL {EditionMatrix.length} ROWS
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- REFERENCE */}
      {/*
        What used to be the server requirements section and the permissions
        section. Both are reference: an owner reads them once, while working
        out whether the plugin will run on what they have, and then never
        again. Two full-height sections in the middle of the page was the wrong
        price for that, so they are a row of cards and a window.
      */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-server"
            title="Will it run on your server?"
            subtitle={`${PluginInformation.serverSoftware}, ${PluginInformation.supportedVersions}. No required dependencies, no NMS, one jar for every supported version.`}
            accent="sky"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ActionCard
              accent="sky"
              icon="fa-solid fa-server"
              title="REQUIREMENTS"
              description="Supported server software and versions, the five optional integrations and what each one adds, and why there is no version-locked build."
              buttonIcon="fa-solid fa-list-check"
              buttonLabel="What it needs"
              onClick={() => setSubcontent("requirements")}
            />
            <ActionCard
              accent="amber"
              icon="fa-solid fa-key"
              title="PERMISSIONS"
              description={`All ${Permissions.length} nodes, declared in the plugin's own plugin.yml. Only the first is administrative; the rest default to everyone on purpose.`}
              buttonIcon="fa-solid fa-key"
              buttonLabel="See the nodes"
              onClick={() => setSubcontent("requirements")}
            />
            <ActionCard
              accent="lime"
              icon="fa-solid fa-gears"
              title="CONFIGURATION"
              description="Every number in a file, validated on load and reloadable in game. An update keeps your values and saves the old file next to it."
              buttonIcon="fa-solid fa-gears"
              buttonLabel="Config"
              onClick={() => setSubcontent("config")}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ SETUP GUIDE */}
      {/*
        Written for the first evening with the plugin, in the order it actually
        happens: get the jar loaded, find out which edition you have, build one
        mob, look at it, and only then let the world spawn anything. The config
        panel covers what every key does, so this section deliberately does not.
      */}
      <section id="setup" className="emr-grid w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-screwdriver-wrench"
            title="Setup guide"
            subtitle="Never run this plugin before? This is the whole of a first evening, in order."
            accent="ember"
          />

          <div className="pt-5">
            <Note accent="sky" icon="fa-solid fa-book">
              Short version below. For one job done start to finish, building a
              mob, running a raid, marking out an arena, use the{" "}
              <button
                className="text-sky-300 underline"
                onClick={() => openGuide("create-mob-chat")}
              >
                step by step guides
              </button>
              . For the command reference, the permission nodes, where each
              command may be run from and what to do when something is not
              behaving, use the{" "}
              <button
                className="text-sky-300 underline"
                onClick={() => setSubcontent("setup")}
              >
                setup &amp; commands panel
              </button>
              .
            </Note>
          </div>

          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="ember" className="p-5">
                <SubHeading accent="ember">FIRST RUN</SubHeading>
                <Steps className="pt-2">
                  {SetupSteps.map((step) => (
                    <Step key={step.n} n={step.n} accent="ember">
                      <span className="pixel-font block text-[9px] tracking-wider text-slate-200 md:text-[10px]">
                        {step.title}
                      </span>
                      {step.cmd && (
                        <span className="mt-2 block">
                          <Cmd accent="amber">{step.cmd}</Cmd>
                        </span>
                      )}
                      <span className="mt-2 block">{step.body}</span>
                    </Step>
                  ))}
                </Steps>
              </Panel>
            </div>

            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <Terminal title="EpicMobsRework / first-boot.log">
                <pre>
                  <code className="text-[10px] md:text-sm" lang="md">
                    <TerminalLabel accent="ember">
                      [FRESH SERVER, NOTHING ELSE INSTALLED]
                    </TerminalLabel>
                    {`
Edition: LITE
Detected server 1.21.4, feature set resolved
No optional integrations found. Running standalone.
Wrote 20 mob definitions, 2 raids, 1 pack, 1 arena
Loaded 20 mob definitions, 2 raids, 0 triggers

The Edition line is the one to read. The two jars
look identical in the plugins folder apart from
the file name.
                    `}
                    <TerminalLabel accent="amber">
                      [WITH A MOB THAT HAS A TYPO IN IT]
                    </TerminalLabel>
                    {`
mobs/frost-wolf.yml: biome 'SNOWY_TIAGA' is not a
  known biome. This mob will never spawn.
mobs/frost-wolf.yml: spawn.chance was 1.5, outside
  0.0 to 1.0. Using the default, 0.2.

Both are named on boot rather than failing quietly
the first time the mob tries to spawn, and the mob
still loads.
                    `}
                    <TerminalLabel accent="lime">
                      [WITH THE OPTIONAL PLUGINS INSTALLED]
                    </TerminalLabel>
                    {`
Custom Enchantments 3 hooked
Kumandra's Economy hooked
WorldGuard hooked, flag 'epicmobs-spawn' registered
PlaceholderAPI hooked

Anything absent is simply not listed. /ep info
prints the same set at any time.
                    `}
                  </code>
                </pre>
              </Terminal>

              <div className="pt-5">
                <Note accent="sky" icon="fa-solid fa-flask">
                  Do all of this on a test server, not on the live one. Nothing
                  here needs a second player, and{" "}
                  <Cmd accent="sky">/ep clear</Cmd> removes every Epic Mob in
                  the world when you are finished poking at it.
                </Note>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Collapsible
              accent="amber"
              icon="fa-solid fa-clipboard-check"
              title="TRY EACH SYSTEM ONCE"
              hint={`${SetupTests.length} things to check, in the order that needs least setup first. Work down the list on a fresh server and you will have seen the whole plugin in an evening.`}
              count={SetupTests.length}
            >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {SetupTests.map((test) => (
                <Panel key={test.name} accent={test.accent} className="p-5">
                  <div className="flex place-items-center gap-3">
                    <IconBadge icon={test.icon} accent={test.accent} />
                    <p className="pixel-font text-[10px] tracking-wide text-slate-200 md:text-xs">
                      {test.name}
                    </p>
                  </div>
                  <p className="pt-3">
                    <Cmd accent={test.accent}>{test.cmd}</Cmd>
                  </p>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    {test.body}
                  </p>
                </Panel>
              ))}
            </div>
            </Collapsible>
          </div>

          <div className="flex flex-col place-items-center justify-center gap-3 pt-6 sm:flex-row">
            <button
              className="pixel-font w-full rounded-none border-2 border-lime-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 sm:w-auto md:text-[11px]"
              onClick={() => openGuide("create-mob-chat")}
            >
              <i className="fa-solid fa-list-check pr-2"></i>
              STEP BY STEP GUIDES
            </button>
            <button
              className="pixel-font w-full rounded-none border-2 border-sky-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 sm:w-auto md:text-[11px]"
              onClick={() => setSubcontent("setup")}
            >
              <i className="fa-solid fa-screwdriver-wrench pr-2"></i>
              THE FULL SETUP GUIDE
            </button>
          </div>

          <div className="pt-6">
            <Note accent="emerald" icon="fa-solid fa-broom">
              Before the server opens, clear up after yourself.{" "}
              <Cmd accent="emerald">/ep clear</Cmd> removes every Epic Mob
              currently in the world, and anything you built while testing is a
              file under <Cmd accent="emerald">mobs/</Cmd> you can delete. Turn
              natural spawning back down to the rate you actually want before
              anyone else logs in, because the rate that is useful for testing
              is not the rate that is fun to play in.
            </Note>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- COMMANDS */}
      <section id="commands" className="w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Plugin commands"
            subtitle={`${CommandList.length} commands, with tab completion. Admin only ones are marked, and so is anything the free build does not have.`}
            accent="ember"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <button
                className="pixel-font rounded-none border-2 border-orange-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 md:text-[11px]"
                onClick={() => setShowCommand(true)}
              >
                <i className="fa-solid fa-chevron-down pr-2"></i>
                SHOW COMMANDS
              </button>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="ember" className="overflow-x-auto p-3 md:p-4">
                <EMR_CommandTableComponent />
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

      {/* -------------------------------------------------------- CHANGELOG */}
      <section id="changelog" className="emr-grid w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release history"
            subtitle={`One entry so far: v${PluginInformation.version}, published ${PluginInformation.releaseDateLabel}.`}
            accent="ember"
          />
          <div className="mt-6 space-y-3">
            {inDevelopment && (
              <Changelog key="in-development" log={inDevelopment} accent="ember" />
            )}
            {latestRelease && (
              <Changelog
                key={latestRelease.update_version}
                log={latestRelease}
                isLatest
                accent="ember"
                latestLabel="RELEASE CANDIDATE"
              />
            )}
          </div>
          <div className="pt-5 text-center">
            <button
              className="pixel-font rounded-none border-2 border-orange-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 md:text-[11px]"
              onClick={() => setSubcontent("change logs")}
            >
              <i className="fa-solid fa-clock-rotate-left pr-2"></i>
              OPEN THE HISTORY
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- SUPPORT / UPDATES */}
      <section id="support" className="w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-headset"
            title="Developer support"
            subtitle="Running the release candidate, or want to know what happened to the old one?"
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              accent="rose"
              icon="fa-solid fa-bug"
              title="REQUESTS & BUGS"
              description="A release candidate is published to be broken. Paste /ep info and /ep debug spawn with whatever you were doing, and the form sends it straight to the developer by email."
              buttonIcon="fa-solid fa-paper-plane"
              buttonLabel="Send one"
              onClick={() => setSubcontent("bug report")}
            />
            <ActionCard
              accent="lime"
              icon="fa-solid fa-list-check"
              title="STEP BY STEP"
              description={`${Walkthroughs.length} walkthroughs: build a mob by command or in the editor, delete one, run and schedule a raid, mark out an arena and see how a run ends.`}
              buttonIcon="fa-solid fa-list-ol"
              buttonLabel="How to"
              onClick={() => openGuide("create-mob-chat")}
            />
            <ActionCard
              accent="ember"
              icon="fa-solid fa-clipboard-list"
              title="WHAT CHANGED"
              description="The full 1.0-RC1 write-up: what shipped, what was rewritten after somebody played it, and the four things it still cannot do."
              buttonIcon="fa-solid fa-clipboard-list"
              buttonLabel="Read it"
              onClick={() => setSubcontent("change logs")}
            />
            <ActionCard
              accent="amber"
              icon="fa-solid fa-scale-balanced"
              title="LITE VS FULL"
              description={`All ${EditionMatrix.length} rows, every Lite ceiling as a number, and the four things the free build will never do.`}
              buttonIcon="fa-solid fa-table-list"
              buttonLabel="Compare"
              onClick={() => setSubcontent("editions")}
            />
            <ActionCard
              accent="purple"
              icon="fa-solid fa-code"
              title="BUILDING ON IT"
              description="The plugin is closed source, so the API is a published contract instead: four views, ten queries, eleven events, and the rules you cannot discover any other way."
              buttonIcon="fa-solid fa-code"
              buttonLabel="Dev API"
              onClick={() => setSubcontent("api")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-box-archive"
              title="THE OLD EPIC MOBS"
              description="Thirteen releases from 2021 to 2023, and why it stopped. Archived, not for sale, kept on the shelf."
              buttonIcon="fa-solid fa-arrow-right"
              buttonLabel="Epic Mobs"
              onClick={() =>
                (window.location.href = PluginInformation.predecessor.href)
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

export default EpicMobsReworkPage;
