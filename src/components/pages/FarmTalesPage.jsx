import { useEffect, useState } from "react";
import {
  CommandList,
  EditionMatrix,
  Features,
  KnownLimits,
  Permissions,
  PluginInformation,
  PremiumReasons,
  QualityGrades,
  Screenshots,
  SetupSteps,
  SetupTests,
} from "../contants/farm_tales/FTConstants";
import { FTCatalogCounts } from "../contants/farm_tales/FTCatalog";
import { FT_Logs } from "../contants/farm_tales/FTConstants_Logs";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import Changelog from "../page_components/Changelog";
import FT_Crops from "./ft_subcontent/FT_Crops";
import FT_Nutrition from "./ft_subcontent/FT_Nutrition";
import FT_Animals from "./ft_subcontent/FT_Animals";
import FT_Storage from "./ft_subcontent/FT_Storage";
import FT_Codex from "./ft_subcontent/FT_Codex";
import FT_Config from "./ft_subcontent/FT_Config";
import FT_Catalog from "./ft_subcontent/FT_Catalog";
import FT_Setup from "./ft_subcontent/FT_Setup";
import FT_Editions from "./ft_subcontent/FT_Editions";
import FT_BugReport from "./ft_subcontent/FT_BugReport";
import FT_ChangeLogs from "./ft_subcontent/FT_ChangeLogs";
import FT_Gallery from "./ft_subcontent/FT_Gallery";
import FT_BUY_PayPal from "./ft_subcontent/FT_BUY_PayPal";
import FT_BUY_Wise from "./ft_subcontent/FT_BUY_Wise";
import FT_BuyPlugin from "./ft_subcontent/FT_BuyPlugin";
import FT_Support from "./ft_subcontent/FT_Support";
import FT_TrialGate from "./ft_subcontent/FT_TrialGate";
import {
  ActionCard,
  Cmd,
  Collapsible,
  IconBadge,
  Note,
  Panel,
  SectionHeading,
  Shot,
  StatChip,
  Step,
  Steps,
  SubHeading,
} from "../page_components/PixelUIKit";
import FT_ICON from "../../assets/farm_tales/branding/icon.png";
import FT_ICON_LITE from "../../assets/farm_tales/branding/icon-lite.png";
import FT_BANNER from "../../assets/farm_tales/banner.svg";
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackClick,
  usePageView,
} from "../../lib/analytics";

const pageStyles = `
  .ft-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .ft-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes ft-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .ft-float { animation: ft-float 4s ease-in-out infinite; }
  @keyframes ft-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .ft-blink { animation: ft-blink 1.4s steps(2, end) infinite; }

  /*
    Real screenshots are nearest-neighbour Minecraft textures. Scaled up by the
    browser's default smoothing they turn to mush. The class is global rather
    than scoped to this section because the feature panels use the same
    screenshots inside the modal, which renders outside this subtree. The two
    JPEG field shots are photographs of a world and are excluded, because
    pixelated scaling on a JPEG makes the compression visible.
  */
  .ft-shot img:not([src$=".jpg"]) {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
`;

const GRADE_TEXT = {
  slate: "text-slate-400",
  rose: "text-rose-300",
  green: "text-green-300",
  lime: "text-lime-300",
  sky: "text-sky-300",
  amber: "text-amber-300",
};

/** How many rows of the edition table the teaser shows before the window. */
const EDITION_PREVIEW = EditionMatrix.slice(0, 8);

/**
 * The jump bar under the hero. The page is long because the plugin is
 * large, and the fix for a long page is to make the length navigable.
 */
const SECTIONS = [
  { id: "about", label: "ABOUT", icon: "fa-solid fa-book-open" },
  { id: "features", label: "FEATURES", icon: "fa-solid fa-seedling" },
  { id: "shots", label: "SCREENSHOTS", icon: "fa-solid fa-camera" },
  { id: "editions", label: "LITE VS PREMIUM", icon: "fa-solid fa-scale-balanced" },
  { id: "pricing", label: "PRICE", icon: "fa-solid fa-tag" },
  { id: "setup", label: "SETUP", icon: "fa-solid fa-screwdriver-wrench" },
  { id: "commands", label: "COMMANDS", icon: "fa-solid fa-terminal" },
  { id: "changelog", label: "CHANGES", icon: "fa-solid fa-clock-rotate-left" },
  { id: "support", label: "SUPPORT", icon: "fa-solid fa-headset" },
];

function FarmTalesPage() {
  usePageView(PROJECTS.FARM_TALES);
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in farm-tales.html, so a crawler that
    // renders the page does not see a different title to the served one.
    document.title = "Farm Tales | A farming plugin for Spigot and Paper";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = FT_ICON;
  }, []);

  const closeWindow = () => setSubcontent("none");

  /*
    Opening one of the buy cards is the click worth counting: it is where
    somebody decides they want the plugin. The outbound link inside each
    panel is counted separately, under its own label.
  */
  const openTracked = (panel, action, label) => () => {
    trackClick(PROJECTS.FARM_TALES, { action, label });
    setSubcontent(panel);
  };

  const subContent = () => {
    switch (subcontent) {
      case "crops":
        return <FT_Crops />;
      case "nutrition":
        return <FT_Nutrition />;
      case "animals":
        return <FT_Animals />;
      case "storage":
        return <FT_Storage />;
      case "codex":
        return <FT_Codex />;
      case "config":
        return <FT_Config />;
      case "catalog":
        return <FT_Catalog />;
      case "setup":
        return <FT_Setup />;
      case "editions":
        return <FT_Editions setSubcontent={setSubcontent} />;
      case "bug report":
        return <FT_BugReport />;
      case "change logs":
        return <FT_ChangeLogs />;
      case "gallery":
        return <FT_Gallery />;
      case "buy plugin":
        return <FT_BuyPlugin setSubcontent={setSubcontent} />;
      case "free lite":
        return <FT_TrialGate setSubcontent={setSubcontent} />;
      case "support":
        return <FT_Support setSubcontent={setSubcontent} />;
      case "buy through paypal":
        return <FT_BUY_PayPal />;
      case "buy through wise":
        return <FT_BUY_Wise />;
      default:
        return null;
    }
  };

  const WINDOW_TITLES = {
    crops: "Crops, water and grades",
    nutrition: "Nutrition, illness and dishes",
    animals: "Animals and meat",
    storage: "Storage and fermentation",
    codex: "Codex, recipes and the admin menu",
    config: "Configuration",
    catalog: "The whole catalog",
    setup: "Setup, permissions and commands",
    editions: "Lite vs Premium",
    gallery: "Screenshots",
    "bug report": "Report something",
    "change logs": "Release history",
    "buy plugin": "Get Premium",
    "free lite": "Before you grab the free build",
    support: "Support the developer",
    "buy through paypal": "Buy through PayPal",
    "buy through wise": "Buy through Wise",
  };

  const WINDOW_ICONS = {
    crops: "fa-solid fa-seedling",
    nutrition: "fa-solid fa-heart-pulse",
    animals: "fa-solid fa-cow",
    storage: "fa-solid fa-wine-bottle",
    codex: "fa-solid fa-book-open",
    config: "fa-solid fa-gears",
    catalog: "fa-solid fa-list",
    setup: "fa-solid fa-screwdriver-wrench",
    editions: "fa-solid fa-scale-balanced",
    gallery: "fa-solid fa-camera",
    "bug report": "fa-solid fa-bug",
    "change logs": "fa-solid fa-clipboard-list",
    "buy plugin": "fa-solid fa-cart-shopping",
    "free lite": "fa-solid fa-gift",
    support: "fa-solid fa-heart",
    "buy through paypal": "fa-brands fa-paypal",
    "buy through wise": "fa-solid fa-qrcode",
  };

  const subContentWindow = () => {
    if (subcontent === "none") return null;
    return (
      <WindowWrap
        close={closeWindow}
        title={WINDOW_TITLES[subcontent] ?? subcontent}
        accent="green"
        icon={WINDOW_ICONS[subcontent] ?? "fa-solid fa-seedling"}
      >
        {subContent()}
      </WindowWrap>
    );
  };

  const latest = FT_Logs[0];
  const { price, spigot } = PluginInformation;

  /*
    The two download buttons. If a listing is ever pending again they still
    go somewhere real and say so in their label rather than pretending to be
    a download.
  */
  const liteLabel = spigot.pending ? "LITE, FREE, COMING TO SPIGOT" : "GET LITE, FREE";
  const premiumLabel = spigot.pending
    ? `PREMIUM, ${price.symbol}${price.amount}, COMING SOON`
    : `PREMIUM, ${price.symbol}${price.amount}`;

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
          style={{ backgroundImage: `url(${FT_BANNER})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.72)_60%,rgba(14,16,20,1)_100%)]" />
        <div className="ft-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={FT_ICON}
            alt="Farm Tales logo"
            className="ft-float mx-auto h-20 w-20 rounded-xl object-cover md:h-28 md:w-28 drop-shadow-[0_0_25px_rgba(74,222,128,0.55)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="ft-blink h-2 w-2 bg-amber-400"></span>
            <span className="pixel-font text-[8px] md:text-[10px] tracking-widest text-amber-300">
              {PluginInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-green-400 md:text-[2.4em] [text-shadow:0_0_24px_rgba(74,222,128,0.55),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-green-300 hover:text-green-200"
              href={PluginInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {PluginInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              onClick={openTracked("free lite", CLICK_ACTIONS.DOWNLOAD, "Lite (hero)")}
              className="pixel-font inline-flex w-full max-w-[300px] place-items-center justify-center gap-2 rounded-none border-2 border-emerald-400/70 bg-emerald-500/15 py-3 text-[10px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-download"></i>
              {liteLabel}
            </button>
            <button
              onClick={openTracked("buy plugin", CLICK_ACTIONS.BUY, "Premium (hero)")}
              className="pixel-font inline-flex w-full max-w-[300px] place-items-center justify-center gap-2 rounded-none border-2 border-green-400/70 bg-green-500/15 py-3 text-[10px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-crown"></i>
              {premiumLabel}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip icon="fa-solid fa-carrot" value={FTCatalogCounts.vegetables} label="Vegetables" accent="green" />
            <StatChip icon="fa-solid fa-apple-whole" value={FTCatalogCounts.fruits} label="Fruits" accent="amber" />
            <StatChip icon="fa-solid fa-drumstick-bite" value={FTCatalogCounts.meats} label="Meat grades" accent="rose" />
            <StatChip icon="fa-solid fa-star" value="6" label="Quality grades" accent="sky" />
            <StatChip icon="fa-solid fa-heart-pulse" value="12" label="Nutrition tags" accent="purple" />
            <StatChip icon="fa-solid fa-cow" value="5" label="Animals" accent="lime" />
            <StatChip icon="fa-solid fa-scale-balanced" value="2" label="Editions" accent="emerald" />
            <StatChip icon="fa-solid fa-cube" value={PluginInformation.supportedVersions} label="Spigot" accent="amber" />
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- NAV */}
      <nav
        aria-label="Sections of this page"
        className="sticky top-0 z-40 border-b border-slate-800 bg-[rgba(11,13,17,0.94)] backdrop-blur-sm"
      >
        <div className="mx-auto flex w-[94%] gap-1 overflow-x-auto py-2 md:w-[80%] lg:w-[70%]">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="pixel-font shrink-0 border border-transparent px-2.5 py-2 text-[7px] tracking-widest whitespace-nowrap text-slate-400 transition-colors hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-200 md:text-[9px]"
            >
              <i className={`${section.icon} pr-1.5 opacity-70`}></i>
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ------------------------------------------------- STATUS BANNER */}
      {/*
        First thing under the hero. Before the listings went up this said the
        build was done and not for sale yet; now it says 1.0.0 is out and
        points at the two listings. The pending branch stays so the page can
        carry a future edition before its listing exists.
      */}
      <section className="ft-grid w-full py-8">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <Panel accent={spigot.pending ? "amber" : "green"} className="p-5 md:p-6">
            <div className="lg:flex lg:place-items-start lg:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  {spigot.pending ? (
                    <span className="pixel-font border border-amber-400/60 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                      COMING SOON
                    </span>
                  ) : (
                    <span className="pixel-font border border-green-400/60 bg-green-500/15 px-2 py-1 text-[8px] tracking-widest text-green-300">
                      OUT NOW
                    </span>
                  )}
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    {spigot.pending
                      ? "no release date yet"
                      : `released ${PluginInformation.releaseDateLabel}`}
                  </span>
                </div>
                {spigot.pending ? (
                  <>
                    <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                      The plugin is built and tested. The Spigot listings are
                      not up yet.
                    </p>
                    <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                      Everything on this page describes the{" "}
                      {PluginInformation.version} jar as it stands:{" "}
                      {FTCatalogCounts.total} catalog entries, tested on Spigot
                      1.16.5 and 26.2 with the same jar. When the two listings
                      go live the buttons on this page start pointing at them.
                      Until then they open the developer&apos;s Spigot profile,
                      where both will appear, and the price stays{" "}
                      {price.symbol}
                      {price.amount} {price.currency}.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="pixel-font pt-3 text-[10px] text-green-300 md:text-xs">
                      Farm Tales {PluginInformation.version} is on Spigot. Lite
                      is free, Premium is {price.symbol}
                      {price.amount} once.
                    </p>
                    <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                      Both listings are live. Lite is the full plugin with
                      part of the catalog and two of the grades, and it never
                      expires, so run it on your own server first. When you
                      want all {FTCatalogCounts.total} entries, six grades,
                      five animals, fertilizer, storage, wine and beer and the
                      admin menu, Premium is one payment of {price.symbol}
                      {price.amount} {price.currency} and every update after
                      it is included. No subscription, and the same jar runs
                      on Spigot and Paper from 1.16.5 to 26.2.
                    </p>
                  </>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-3 pt-5 lg:w-[240px] lg:pt-0">
                {spigot.pending ? (
                  <>
                    <button
                      className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-green-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/20 lg:text-[10px]"
                      onClick={() => setSubcontent("catalog")}
                    >
                      <i className="fa-solid fa-list"></i>
                      THE WHOLE CATALOG
                    </button>
                    <button
                      className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-sky-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 lg:text-[10px]"
                      onClick={() => setSubcontent("change logs")}
                    >
                      <i className="fa-solid fa-clipboard-list"></i>
                      WHAT IS IN {PluginInformation.version}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-green-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/20 lg:text-[10px]"
                      onClick={openTracked("buy plugin", CLICK_ACTIONS.BUY, "Premium (banner)")}
                    >
                      <i className="fa-solid fa-crown"></i>
                      BUY PREMIUM, {price.symbol}
                      {price.amount}
                    </button>
                    <button
                      className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-emerald-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 lg:text-[10px]"
                      onClick={openTracked("free lite", CLICK_ACTIONS.DOWNLOAD, "Lite (banner)")}
                    >
                      <i className="fa-solid fa-download"></i>
                      GET LITE, FREE
                    </button>
                    <button
                      className="pixel-font inline-flex w-full place-items-center justify-center gap-2 rounded-none border-2 border-sky-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 lg:text-[10px]"
                      onClick={() => setSubcontent("change logs")}
                    >
                      <i className="fa-solid fa-clipboard-list"></i>
                      WHAT IS IN {PluginInformation.version}
                    </button>
                  </>
                )}
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ----------------------------------------------------------- ABOUT */}
      <section id="about" className="w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="What it is"
            subtitle={PluginInformation.tagline}
            accent="green"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Shot
                className="ft-shot"
                src={Screenshots[0].src}
                alt={Screenshots[0].caption}
                accent="green"
                caption="A real field on a real server. The labels above the crops are the plugin's"
              />

              <div className="mt-5 grid grid-cols-2 gap-3">
                {PluginInformation.traits.map((trait) => (
                  <div
                    key={trait.title}
                    className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3"
                  >
                    <p
                      className={`pixel-font text-[9px] tracking-widest ${
                        {
                          green: "text-green-300",
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
            </div>
          </div>

          {/*
            The whole loop in one row, for somebody who wants to know what
            the game is before reading six panels about it.
          */}
          <div className="mt-8">
            <SubHeading accent="amber">THE LOOP, IN ONE LINE</SubHeading>
            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: "fa-solid fa-seedling", text: "Plant a seed", accent: "green" },
                { icon: "fa-solid fa-droplet", text: "Water it, feed it", accent: "sky" },
                { icon: "fa-solid fa-clock", text: "Pick it on time", accent: "amber" },
                { icon: "fa-solid fa-star", text: "Get a grade", accent: "lime" },
                { icon: "fa-solid fa-bowl-food", text: "Cook it, eat it", accent: "rose" },
                { icon: "fa-solid fa-wine-bottle", text: "Or age it, or brew it", accent: "purple" },
              ].map((step, index) => (
                <div
                  key={step.text}
                  className="flex place-items-center gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
                >
                  <IconBadge icon={step.icon} accent={step.accent} />
                  <span className="text-[11px] leading-snug text-slate-300 md:text-xs">
                    <span className="pixel-font pr-1 text-[7px] text-slate-600">
                      {index + 1}
                    </span>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section id="features" className="ft-grid w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-seedling"
            title="What it does"
            subtitle={`${Features.length} systems. Pick one to see what is inside it, with screenshots.`}
            accent="green"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in Farm Tales`}
                description={feature.description}
                buttonIcon={feature.icon}
                buttonLabel={feature.button}
                onClick={() => setSubcontent(feature.key)}
              />
            ))}
          </div>

          {/* The grade ladder, because it is the plugin's whole idea. */}
          <div className="mt-8">
            <SubHeading accent="amber">THE SIX GRADES</SubHeading>
            <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Every crop and every piece of meat carries one. It comes from how
              the thing was actually kept, it is written on the item, and it
              changes what eating it is worth. Lite stops at Good.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {QualityGrades.map((grade, index) => (
                <div
                  key={grade.name}
                  className="border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
                >
                  <p className={`pixel-font text-[8px] tracking-widest md:text-[9px] ${GRADE_TEXT[grade.accent]}`}>
                    {index + 1}. {grade.name.toUpperCase()}
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-500 md:text-[11px]">
                    {grade.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 text-center">
            <button
              className="pixel-font rounded-none border-2 border-green-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/20 md:text-[11px]"
              onClick={() => setSubcontent("catalog")}
            >
              <i className="fa-solid fa-list pr-2"></i>
              ALL {FTCatalogCounts.total} CATALOG ENTRIES, SEARCHABLE
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- SCREENSHOTS */}
      <section id="shots" className="w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-camera"
            title="What it looks like running"
            subtitle={`Photographs, not art. Taken on a server running ${PluginInformation.version}.`}
            accent="sky"
          />

          <div className="mt-8 grid gap-6">
            {Screenshots.filter((shot) => shot.wide).map((shot) => (
              <div key={shot.key}>
                <p className="pixel-font pb-3 text-[9px] tracking-widest text-slate-300 md:text-[11px]">
                  <i className="fa-solid fa-angle-right pr-2 text-green-400"></i>
                  {shot.title}
                </p>
                <Shot
                  className="ft-shot"
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
              ALL {Screenshots.length} SCREENSHOTS, ITEMS AND MENUS
            </button>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- EDITIONS */}
      <section id="editions" className="ft-grid w-full scroll-mt-14 py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-scale-balanced"
            title="Lite and Premium, side by side"
            subtitle="Lite is free and is the same plugin with a smaller catalog. Premium is the whole thing."
            accent="amber"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Panel accent="emerald" className="p-5">
              <div className="flex place-items-center gap-3">
                <img src={FT_ICON_LITE} alt="Farm Tales Lite icon" className="h-12 w-12 rounded-lg" />
                <div>
                  <p className="pixel-font text-[10px] tracking-widest text-emerald-300 md:text-xs">LITE</p>
                  <p className="pixel-font pt-1 text-[8px] tracking-widest text-slate-400">FREE, FOREVER</p>
                </div>
              </div>
              <p className="pt-4 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                15 vegetables, 15 fruits, cow and chicken at Common and Good.
                Water, seeds from grass, trees, dishes, cooking, smoothies, the
                codex, the recipe browser, PlaceholderAPI. No fertilizer, no
                illness, no rot or aging, no wine or beer, no admin menu. Every
                one of those is listed in its own codex, greyed, so you can see
                what Premium adds before you pay for it.
              </p>
            </Panel>
            <Panel accent="green" className="p-5">
              <div className="flex place-items-center gap-3">
                <img src={FT_ICON} alt="Farm Tales icon" className="h-12 w-12 rounded-lg" />
                <div>
                  <p className="pixel-font text-[10px] tracking-widest text-green-300 md:text-xs">PREMIUM</p>
                  <p className="pixel-font pt-1 text-[8px] tracking-widest text-amber-300">
                    {price.symbol}{price.amount} {price.currency}, ONCE
                  </p>
                </div>
              </div>
              <p className="pt-4 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                All {FTCatalogCounts.total} entries, all six grades, all five
                animals, three fertilizer tiers, illness in three stages, meat
                that rots or dry-ages, wine and beer that improve with age if
                they were good to begin with, and a chest menu that edits every
                number in the config. One payment, every update after it.
              </p>
            </Panel>
          </div>

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
                  <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-green-300 md:text-[10px]">
                    Premium
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
                        <i className="fa-solid fa-circle-check text-xs text-green-400"></i>
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

      {/* --------------------------------------------------------- PRICING */}
      <section id="pricing" className="w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-tag"
            title="Get your copy"
            subtitle={`${price.symbol}${price.amount} ${price.currency}, one time. Free updates for life. No subscription.`}
            accent="amber"
          />

          {/* Why Premium, in six cards, before the buy buttons. */}
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PremiumReasons.map((reason) => (
              <Panel key={reason.title} accent={reason.accent} className="p-4">
                <div className="flex place-items-center gap-3">
                  <IconBadge icon={reason.icon} accent={reason.accent} />
                  <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                    {reason.title}
                  </p>
                </div>
                <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                  {reason.body}
                </p>
              </Panel>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ActionCard
              accent="green"
              icon="fa-solid fa-crown"
              title="PREMIUM"
              badge={`${price.symbol}${price.amount}`}
              description="Every limit lifted. All 134 entries, six grades, five animals, fertilizer, illness, storage, wine and beer, and the admin menu. Buy once, keep it forever."
              buttonIcon="fa-solid fa-cart-shopping"
              buttonLabel="Buy Plugin"
              hint={spigot.pending ? "Spigot listing coming soon" : "One time payment"}
              onClick={openTracked("buy plugin", CLICK_ACTIONS.BUY, "Buy Plugin (card)")}
            />
            <ActionCard
              accent="emerald"
              icon="fa-solid fa-gift"
              title="FREE LITE"
              badge="FREE"
              description="Not a trial. The same plugin with 34 of the 134 entries, two grades and two animals. Nothing in it expires."
              buttonIcon="fa-solid fa-file-arrow-down"
              buttonLabel="Try Plugin"
              hint="Run it on your own server first"
              onClick={openTracked("free lite", CLICK_ACTIONS.DOWNLOAD, "Try Plugin (card)")}
            />
            <ActionCard
              accent="rose"
              icon="fa-solid fa-shield-heart"
              title="SUPPORT DEV"
              description="Already running it? A donation keeps the updates coming."
              buttonIcon="fa-solid fa-heart"
              buttonLabel="Support"
              hint="Thank you"
              onClick={() => setSubcontent("support")}
            />
          </div>

          <div className="pt-6">
            <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
              Before purchasing, please try the Lite version. There is no
              refund once the plugin is bought: the free edition exists so you
              can find out exactly how it behaves before you spend anything.
              If Lite does what you hoped, Premium is the same plugin with
              every limit lifted, for one payment. The plugin is not
              available on Aternos. DM the developer any time if you have an
              issue.
            </Note>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ SETUP GUIDE */}
      <section id="setup" className="ft-grid w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-screwdriver-wrench"
            title="Setting it up"
            subtitle="Never run this plugin before? This is the whole of a first evening, in order."
            accent="green"
          />

          <div className="pt-5">
            <Note accent="sky" icon="fa-solid fa-book">
              Short version below. For the resource pack, the two permission
              nodes, every command, and what to do when something is not
              behaving, open the{" "}
              <button
                className="text-sky-300 underline"
                onClick={() => setSubcontent("setup")}
              >
                full setup guide
              </button>
              . For adding your own crops and what every file does, open{" "}
              <button
                className="text-sky-300 underline"
                onClick={() => setSubcontent("config")}
              >
                configuration
              </button>
              .
            </Note>
          </div>

          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="green" className="p-5">
                <SubHeading accent="green">FIRST RUN</SubHeading>
                <Steps className="pt-2">
                  {SetupSteps.map((step) => (
                    <Step key={step.n} n={step.n} accent="green">
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
              <Panel accent="amber" className="p-5">
                <SubHeading accent="amber">WILL IT RUN ON YOUR SERVER?</SubHeading>
                <div className="mt-3 grid gap-2">
                  {[
                    ["Server", `${PluginInformation.serverSoftware}, ${PluginInformation.supportedVersions}`],
                    ["Tested on", PluginInformation.testedOn],
                    ["Java", PluginInformation.javaSupport],
                    ["Depends on", "Nothing. PlaceholderAPI is optional"],
                    ["NMS", "None. Version differences are asked of the server at enable"],
                    ["Database", "None. Flat files under plugins/FarmTales/data/"],
                    ["Aternos", "Not available"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex flex-wrap gap-2 border-b border-slate-800/80 py-1.5">
                      <span className="pixel-font w-24 shrink-0 text-[7px] tracking-widest text-slate-500 md:text-[8px]">
                        {label.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-300 md:text-xs">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <SubHeading accent="amber">PERMISSIONS</SubHeading>
                  <div className="mt-2 grid gap-2">
                    {Permissions.map((perm) => (
                      <div key={perm.node} className="border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3">
                        <div className="flex flex-wrap place-items-center gap-2">
                          <Cmd accent="amber">{perm.node}</Cmd>
                          <span className="pixel-font text-[7px] tracking-widest text-slate-500">
                            DEFAULT: {perm.default.toUpperCase()}
                          </span>
                        </div>
                        <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-[11px]">
                          {perm.grants}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>

              <div className="pt-5">
                <Note accent="sky" icon="fa-solid fa-flask">
                  Do all of this on a test server, not on the live one. Nothing
                  here needs a second player, and{" "}
                  <Cmd accent="sky">/ft store stress clear</Cmd> harvests out
                  anything a load test planted.
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

          <div className="pt-6">
            <Collapsible
              accent="rose"
              icon="fa-solid fa-triangle-exclamation"
              title="KNOWN LIMITS, STATED UP FRONT"
              hint="Three things the first release says plainly about itself. All three are decisions on this side."
              count={KnownLimits.length}
            >
              <div className="grid gap-3 md:grid-cols-3">
                {KnownLimits.map((limit) => (
                  <Panel key={limit.title} accent={limit.accent} className="p-4">
                    <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                      {limit.title}
                    </p>
                    <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      {limit.body}
                    </p>
                  </Panel>
                ))}
              </div>
            </Collapsible>
          </div>

          <div className="flex flex-col place-items-center justify-center gap-3 pt-6 sm:flex-row">
            <button
              className="pixel-font w-full rounded-none border-2 border-sky-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/20 sm:w-auto md:text-[11px]"
              onClick={() => setSubcontent("setup")}
            >
              <i className="fa-solid fa-screwdriver-wrench pr-2"></i>
              THE FULL SETUP GUIDE
            </button>
            <button
              className="pixel-font w-full rounded-none border-2 border-lime-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 sm:w-auto md:text-[11px]"
              onClick={() => setSubcontent("config")}
            >
              <i className="fa-solid fa-gears pr-2"></i>
              CONFIGURATION
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- COMMANDS */}
      <section id="commands" className="w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Plugin commands"
            subtitle={`One command, /farmtales, alias /ft, with ${CommandList.length} subcommands and tab completion. Admin only ones are marked, and so is anything the free build does not have.`}
            accent="green"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <button
                className="pixel-font rounded-none border-2 border-green-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/20 md:text-[11px]"
                onClick={() => setShowCommand(true)}
              >
                <i className="fa-solid fa-chevron-down pr-2"></i>
                SHOW COMMANDS
              </button>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="green" className="overflow-x-auto p-3 md:p-4">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="pixel-font px-2 py-2 text-[8px] tracking-wider whitespace-nowrap text-slate-300 md:text-[10px]">
                        Command
                      </th>
                      <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                        What it does
                      </th>
                      <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider whitespace-nowrap text-slate-300 md:text-[10px]">
                        Who
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CommandList.map((cmd) => (
                      <tr key={cmd.command} className="border-b border-slate-800 align-top">
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <Cmd accent={cmd.lite === false ? "amber" : "green"}>
                            {cmd.command}
                          </Cmd>
                        </td>
                        <td className="px-2 py-2.5 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                          {cmd.description}
                        </td>
                        <td className="px-2 py-2.5 text-center">
                          <div className="flex flex-col place-items-center gap-1">
                            <span
                              className={`pixel-font border px-1.5 py-0.5 text-[6px] tracking-widest md:text-[7px] ${
                                cmd.requireOp
                                  ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                                  : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                              }`}
                            >
                              {cmd.requireOp ? "ADMIN" : "EVERYONE"}
                            </span>
                            {cmd.lite === false && (
                              <span className="pixel-font border border-green-400/40 bg-green-400/10 px-1.5 py-0.5 text-[6px] tracking-widest text-green-300 md:text-[7px]">
                                PREMIUM
                              </span>
                            )}
                            {cmd.liteOnly && (
                              <span className="pixel-font border border-slate-500/40 bg-slate-500/10 px-1.5 py-0.5 text-[6px] tracking-widest text-slate-400 md:text-[7px]">
                                LITE ONLY
                              </span>
                            )}
                            {cmd.playerOnly && (
                              <span className="pixel-font border border-sky-400/40 bg-sky-400/10 px-1.5 py-0.5 text-[6px] tracking-widest text-sky-300 md:text-[7px]">
                                NOT CONSOLE
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      <section id="changelog" className="ft-grid w-full scroll-mt-14 py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release history"
            subtitle={
              latest.release_date
                ? `Latest: v${latest.update_version}, published ${latest.release_date}.`
                : `One entry so far: v${latest.update_version}, built and not yet listed. It is the whole plugin, so the first block is the one-paragraph version.`
            }
            accent="green"
          />
          <div className="mt-6 space-y-3">
            {FT_Logs.map((log, index) => (
              <Changelog
                key={log.update_version}
                log={log}
                isLatest={index === 0}
                accent="green"
              />
            ))}
          </div>
          <div className="pt-5 text-center">
            <button
              className="pixel-font rounded-none border-2 border-green-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-green-200 transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-500/20 md:text-[11px]"
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
            subtitle="Something broke, something is missing, or you want to see what changed."
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              accent="rose"
              icon="fa-solid fa-bug"
              title="REQUESTS & BUGS"
              description="Paste /ft info whole, say which edition and Minecraft version, and include the console lines from the boot. The form sends it straight to the developer by email."
              buttonIcon="fa-solid fa-paper-plane"
              buttonLabel="Send one"
              onClick={() => setSubcontent("bug report")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-screwdriver-wrench"
              title="SETUP GUIDE"
              description="Install, the first boot, the resource pack and which zip you want, the two permission nodes, every command, and the seven things that go wrong on the first evening."
              buttonIcon="fa-solid fa-list-check"
              buttonLabel="Read it"
              onClick={() => setSubcontent("setup")}
            />
            <ActionCard
              accent="green"
              icon="fa-solid fa-clipboard-list"
              title="WHAT CHANGED"
              description="The 1.0.0 write-up: what is in the plugin, what it fixed on live servers before release, and the three limits it states up front."
              buttonIcon="fa-solid fa-clipboard-list"
              buttonLabel="Read it"
              onClick={() => setSubcontent("change logs")}
            />
            <ActionCard
              accent="amber"
              icon="fa-solid fa-scale-balanced"
              title="LITE VS PREMIUM"
              description={`All ${EditionMatrix.length} rows, every Lite limit as a number, and the four things the free build promises.`}
              buttonIcon="fa-solid fa-table-list"
              buttonLabel="Compare"
              onClick={() => setSubcontent("editions")}
            />
          </div>
          <div className="pt-6">
            <Note accent="green" icon="fa-solid fa-comments">
              Bug reports and questions also work as a DM on Spigot, or in the
              discussion tab of either listing. Either way, include /ft info
              pasted whole, which edition, which Minecraft version, and the
              console lines from the boot.
            </Note>
          </div>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <PageFooter />
    </div>
  );
}

export default FarmTalesPage;
