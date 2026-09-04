import { useEffect, useState } from "react";
import {
  BuildProgress,
  CommandList,
  EditionMatrix,
  Features,
  ModelCredits,
  Permissions,
  PluginInformation,
  SetupSteps,
  SetupTests,
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
import EMR_Config from "./emr_subcontent/EMR_Config";
import EMR_Editions from "./emr_subcontent/EMR_Editions";
import EMR_BugReport from "./emr_subcontent/EMR_BugReport";
import EMR_ChangeLogs from "./emr_subcontent/EMR_ChangeLogs";
import {
  ActionCard,
  Cmd,
  IconBadge,
  Media,
  Note,
  Panel,
  SectionHeading,
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
`;

/** The three states a line of BuildProgress can be in. */
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

function EpicMobsReworkPage() {
  usePageView(PROJECTS.EPIC_MOBS_REWORK);
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

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
      case "config":
        return <EMR_Config />;
      case "editions":
        return <EMR_Editions />;
      case "bug report":
        return <EMR_BugReport />;
      case "change logs":
        return <EMR_ChangeLogs />;
      default:
        return null;
    }
  };

  const subContentWindow = () => {
    if (subcontent === "none") return null;
    return (
      <WindowWrap
        close={closeWindow}
        title={subcontent}
        accent="ember"
        icon="fa-solid fa-skull"
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

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <a
              href="#trailer"
              className="pixel-font inline-flex w-full max-w-[260px] place-items-center justify-center gap-2 rounded-none border-2 border-orange-400/70 bg-orange-500/15 py-3 text-[10px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-play"></i>
              WATCH THE TRAILER
            </a>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
              onClick={() => setSubcontent("editions")}
            >
              <i className="fa-solid fa-scale-balanced pr-2"></i>
              LITE VS FULL
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-layer-group"
              value="6"
              label="Tiers"
              accent="ember"
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

      {/* ------------------------------------------------- THE HONEST BIT */}
      {/*
        This is the first thing under the hero on purpose. A page for an
        unreleased plugin that buries the word unreleased is how somebody ends
        up planning a season around a jar that does not exist.
      */}
      <section className="emr-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="lg:flex lg:place-items-center lg:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-amber-400/60 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                    NOT RELEASED
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    no release date
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                  There is no download here yet, and no date for one.
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  Epic Mobs Rework is being built. The two-jar build, the
                  release pipeline, the configuration surface and the defect
                  backlog are finished; the source rework is where the work is.
                  When there is a build to download, the link goes on this page
                  before it goes anywhere else. Until then this page is the
                  design, in full, so you can decide whether it is worth waiting
                  for rather than guessing.
                </p>
                <p className="pt-3 text-[11px] leading-relaxed text-orange-300/90 md:text-xs">
                  <i className="fa-solid fa-tag pr-2"></i>
                  {price.symbol}
                  {price.amount} {price.currency} for the full build, bought
                  once. A free Lite build ships alongside it.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-circle-check"
                    value={
                      BuildProgress.filter((row) => row.state === "done").length
                    }
                    label="Done"
                    accent="emerald"
                  />
                  <StatChip
                    icon="fa-solid fa-hammer"
                    value={
                      BuildProgress.filter((row) => row.state === "in progress")
                        .length
                    }
                    label="In progress"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-calendar-xmark"
                    value="None"
                    label="Release date"
                    accent="rose"
                  />
                  <StatChip
                    icon="fa-solid fa-gift"
                    value="Free"
                    label="Lite build"
                    accent="lime"
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 pt-5 lg:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-amber-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 lg:w-auto lg:text-[10px]"
                  onClick={() => setShowProgress((shown) => !shown)}
                  aria-expanded={showProgress}
                  aria-controls="emr-progress"
                >
                  <i
                    className={`fa-solid pr-2 ${
                      showProgress ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                  {showProgress ? "HIDE THE LIST" : "WHAT IS FINISHED"}
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-orange-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-orange-200 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-500/20 lg:w-auto lg:text-[10px]"
                  onClick={() => setSubcontent("change logs")}
                >
                  <i className="fa-solid fa-clipboard-list pr-2"></i>
                  THE FULL WRITE-UP
                </button>
              </div>
            </div>
          </Panel>

          {showProgress && (
            <div id="emr-progress" className="mt-6 grid gap-3">
              {BuildProgress.map((row) => {
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
        </div>
      </section>

      {/* ------------------------------------------------ ABOUT + TRAILER */}
      <section id="trailer" className="w-full py-6">
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
                  Drawn rather than filmed. There is no build to record yet,
                  so the trailer shows what the plugin is designed to do
                  instead of pretending to be gameplay footage.

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
                Drawn, not filmed. There is no build to record yet, so this
                shows the design rather than gameplay.
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
      <section className="emr-grid w-full py-12">
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

      {/* --------------------------------------------------------- PRICING */}
      {/*
        No buy button, because there is nothing to buy. What this section can
        honestly do is set the expectation: one payment, a free build to try
        first, and no subscription ever.
      */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-tag"
            title="What it will cost"
            subtitle="One payment, free updates for life. There is no subscription and there never will be."
            accent="amber"
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Panel accent="ember" className="p-5 lg:col-span-2">
              <div className="flex flex-wrap place-items-center gap-3">
                <IconBadge icon="fa-solid fa-crown" accent="ember" />
                <p className="pixel-font text-[10px] tracking-wide text-orange-300 md:text-xs">
                  THE FULL BUILD
                </p>
                <span className="pixel-font ml-auto border border-orange-400/50 bg-orange-500/15 px-3 py-1.5 text-[10px] tracking-widest text-orange-200 md:text-xs">
                  {price.symbol}
                  {price.amount} {price.currency}
                </span>
              </div>
              <p className="pt-4 text-xs leading-relaxed text-slate-300 md:text-sm">
                {price.note} You buy it once and every update after it is
                included, the same way Custom Enchantments 3 has worked since it
                went on sale. A monthly plugin bill on a server that already
                costs you money to run is not a thing this developer is going to
                add to.
              </p>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                It is not on sale yet, so nothing on this page takes your money
                and there is nothing to pre-order. The price is here so you can
                decide whether it is worth waiting for, and it is what the
                listing will say when there is a listing.
              </p>
              <div className="flex flex-col gap-3 pt-5 sm:flex-row">
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
                Nothing in it expires, nothing phones home, and every
                integration works in it. Try that first. That is what it is for.
              </p>
              <div className="pt-5">
                <Note accent="rose" icon="fa-solid fa-circle-exclamation">
                  There will be no refunds once the full build is bought, which
                  is exactly why the free one exists and why it is a complete
                  plugin rather than a demo.
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

      {/* ---------------------------------------------------- REQUIREMENTS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-server"
            title="Server requirements"
            subtitle={`${PluginInformation.serverSoftware}, ${PluginInformation.supportedVersions}, and nothing else required.`}
            accent="sky"
          />
          <Terminal title="EpicMobsRework / server-check.log" className="mt-6">
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                <TerminalLabel accent="ember">
                  [SUPPORTED SERVER SOFTWARE]
                </TerminalLabel>
                {`
- SPIGOT [1.16.5 and upward]
- PAPER  [1.16.5 and upward]

api-version: 1.21

There is no NMS anywhere in the plugin and no
version-locked build. One jar covers every
supported version, and a Minecraft release that
did not exist when the jar was built is handled
by feature detection rather than by parsing a
version string.

Not available on Aternos.
                `}
                <TerminalLabel accent="ember">[DEPENDENCIES]</TerminalLabel>
                {`
REQUIRED
- nothing

OPTIONAL, detected if present
- Custom Enchantments 3, for mob enchantments,
  CE3 loot, RACO rewards and protected boundaries
- Kumandra's Economy, for Kd rewards tagged into
  the player's own transaction history
- Vault, with whatever economy sits behind it
- WorldGuard, for region protection. Without it
  the plugin has its own regions
- PlaceholderAPI, for live counts on a scoreboard

None of these is compiled against and none is
shaded into the jar. /ep info says which ones
hooked.
                `}
              </code>
            </pre>
          </Terminal>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
              Java 21 is what the plugin is built with, because that is what
              current Spigot needs. The jar itself still runs on the older
              servers in the supported range, on whatever Java they are on.
            </Note>
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
      <section className="emr-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-screwdriver-wrench"
            title="Setup guide"
            subtitle="Never run this plugin before? This is the whole of a first evening, in order."
            accent="ember"
          />

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
Loaded 0 mob definitions, 0 raids, 0 triggers

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
            <SubHeading accent="amber">TRY EACH SYSTEM ONCE</SubHeading>
            <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
              Six things to check, in the order that needs least setup first.
              Work down the list on a fresh server and you will have seen the
              whole plugin in an evening.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
      <section className="w-full py-10">
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

      {/* ----------------------------------------------------- PERMISSIONS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-key"
            title="Permissions"
            subtitle="Sensible out of the box. Players get the player things, ops get the rest."
            accent="amber"
          />
          <p className="pt-5 text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
            Every node is declared in the plugin&apos;s own plugin.yml, so any
            permissions plugin can read them. You only need to touch them if you
            want to hand mob building to staff who are not opped, or hand the
            loot multiplier to a rank.
          </p>
          <div className="mt-6 grid gap-2">
            {Permissions.map((permission) => (
              <div
                key={permission.node}
                className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
              >
                <span className="pixel-font text-[8px] text-slate-200 md:text-[10px]">
                  {permission.node}
                </span>
                <span className="grow text-[11px] text-slate-400 md:text-xs">
                  {permission.grants}
                </span>
                <span
                  className={`pixel-font border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${
                    permission.fallback === "op"
                      ? "border-rose-400/40 bg-rose-400/10 text-rose-300"
                      : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  {permission.fallback.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- CHANGELOG */}
      <section className="emr-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release history"
            subtitle="One entry so far, and it has no date on it. It says what exists rather than what is planned."
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
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-headset"
            title="Developer support"
            subtitle="Want something in it, or want to know what happened to the old one?"
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              accent="rose"
              icon="fa-solid fa-bug"
              title="REQUESTS & BUGS"
              description="Nothing has shipped, so a feature request is worth more than a bug report right now. Both go to the same inbox."
              buttonIcon="fa-solid fa-paper-plane"
              buttonLabel="Send one"
              onClick={() => setSubcontent("bug report")}
            />
            <ActionCard
              accent="ember"
              icon="fa-solid fa-clipboard-list"
              title="WHAT IS DONE"
              description="The full write-up of what is finished, what is being built, and what the rework is fixing from the old plugin."
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
