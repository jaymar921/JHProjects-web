import { useEffect, useState } from "react";
import { PluginInformation } from "../contants/legacy/FishingContestConstants";
import { FishingContest_Logs } from "../contants/legacy/FishingContestConstants_Logs";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import Changelog from "../page_components/Changelog";
import ChangelogBrowser from "../page_components/ChangelogBrowser";
import LegacyCommandTable from "../page_components/LegacyCommandTable";
import {
  Body,
  IconBadge,
  Note,
  Panel,
  PixelButton,
  SectionHeading,
  Shot,
  StatChip,
  Step,
  Steps,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";
import FC_LOGO from "../../assets/legacy/fishing_contest/icon.jpg";
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackedRedirect,
  usePageView,
} from "../../lib/analytics";

/**
 * Fishing Contest, archived.
 *
 * Cyan, and built to feel like water rather than like a HUD: the hero is a
 * gradient from surface light down into the dark, with two slow wave bands and
 * a drifting bubble field over it, and the sections below sit on a horizon
 * rule instead of the grid the other pages use.
 *
 * The signature piece is the contest board. The plugin's whole appeal was that
 * a leaderboard moved on its own while people fished, so the board here does
 * the same thing: it advances a scripted contest on a timer, which is the one
 * thing a screenshot of this plugin could never show.
 */

const pageStyles = `
  .fc-waves {
    background-image:
      repeating-linear-gradient(
        to bottom,
        rgba(34, 211, 238, 0.05) 0px,
        rgba(34, 211, 238, 0.05) 2px,
        transparent 2px,
        transparent 9px
      );
  }
  .fc-horizon {
    background-image: linear-gradient(
      to bottom,
      rgba(34, 211, 238, 0.05) 0%,
      transparent 35%
    );
  }
  @keyframes fc-swell {
    0%, 100% { transform: translateX(-4%) translateY(0); }
    50% { transform: translateX(4%) translateY(-14px); }
  }
  .fc-swell { animation: fc-swell 11s ease-in-out infinite; }
  .fc-swell-slow { animation: fc-swell 17s ease-in-out infinite reverse; }
  @keyframes fc-rise {
    0% { transform: translateY(0) scale(0.7); opacity: 0; }
    15% { opacity: 0.7; }
    100% { transform: translateY(-320px) scale(1.15); opacity: 0; }
  }
  .fc-bubble { animation: fc-rise 9s linear infinite; }
  @keyframes fc-bob {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-9px) rotate(3deg); }
  }
  .fc-bob { animation: fc-bob 4.5s ease-in-out infinite; }
  @keyframes fc-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  .fc-blink { animation: fc-blink 1.3s steps(2, end) infinite; }
`;

/** Drifting bubbles behind the hero. Position and timing are fixed, so the
 *  field looks scattered without re-randomising on every render. */
const BUBBLES = [
  { left: "8%", size: 6, delay: "0s", duration: "9s" },
  { left: "18%", size: 10, delay: "2.4s", duration: "12s" },
  { left: "31%", size: 4, delay: "5.1s", duration: "8s" },
  { left: "44%", size: 8, delay: "1.2s", duration: "11s" },
  { left: "57%", size: 5, delay: "6.3s", duration: "9.5s" },
  { left: "69%", size: 11, delay: "3.7s", duration: "13s" },
  { left: "81%", size: 6, delay: "0.9s", duration: "10s" },
  { left: "92%", size: 8, delay: "4.6s", duration: "12.5s" },
];

/**
 * A scripted contest, replayed on the page. Each frame is one moment of a
 * running event: who has what, and the line the plugin would have put on
 * screen at that point.
 */
const CONTEST_FRAMES = [
  {
    clock: "04:12",
    board: [
      { name: "Rhea", catches: 14 },
      { name: "Tomas", catches: 11 },
      { name: "You", catches: 9 },
    ],
    line: "You caught a Cod. That is 9.",
  },
  {
    clock: "03:03",
    board: [
      { name: "Rhea", catches: 15 },
      { name: "You", catches: 13 },
      { name: "Tomas", catches: 12 },
    ],
    line: "You caught a Salmon. That is 13.",
  },
  {
    clock: "01:47",
    board: [
      { name: "You", catches: 17 },
      { name: "Rhea", catches: 16 },
      { name: "Tomas", catches: 12 },
    ],
    line: "Rhea has been overtaken. You are in the lead.",
  },
  {
    clock: "00:00",
    board: [
      { name: "You", catches: 19 },
      { name: "Rhea", catches: 18 },
      { name: "Tomas", catches: 14 },
    ],
    line: "The contest is over. Run /fishsell to cash in.",
  },
];

function ContestBoard() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setFrameIndex((index) => (index + 1) % CONTEST_FRAMES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [running]);

  const frame = CONTEST_FRAMES[frameIndex];
  const leader = Math.max(...frame.board.map((player) => player.catches));

  return (
    <Panel accent="cyan" className="p-4 md:p-6">
      <div className="flex flex-wrap place-items-center gap-3">
        <span className="pixel-font border border-cyan-400/50 bg-cyan-500/15 px-2 py-1 text-[8px] tracking-widest text-cyan-300">
          /FISHTOP
        </span>
        <span className="pixel-font text-[10px] text-slate-300 md:text-xs">
          {frame.clock === "00:00" ? "CONTEST ENDED" : `ENDS IN ${frame.clock}`}
        </span>
        {frame.clock !== "00:00" && (
          <span className="fc-blink h-2 w-2 bg-cyan-400"></span>
        )}
        <button
          className="pixel-font ml-auto rounded-none border border-slate-600/60 bg-transparent px-3 py-1 text-[8px] tracking-widest text-slate-400 transition-colors hover:border-cyan-400/70 hover:text-cyan-300 md:text-[9px]"
          onClick={() => setRunning((on) => !on)}
          aria-pressed={!running}
        >
          <i
            className={`fa-solid pr-2 ${running ? "fa-pause" : "fa-play"}`}
          ></i>
          {running ? "PAUSE" : "PLAY"}
        </button>
      </div>

      <div className="mt-5 space-y-2">
        {frame.board.map((player, position) => {
          const isYou = player.name === "You";
          return (
            <div
              key={player.name}
              className={`flex place-items-center gap-3 border px-3 py-2 transition-all duration-500 ${
                isYou
                  ? "border-cyan-400/60 bg-cyan-500/10"
                  : "border-slate-700/70 bg-[rgba(0,0,0,0.4)]"
              }`}
            >
              <span
                className={`pixel-font w-5 shrink-0 text-[9px] md:text-[11px] ${
                  position === 0 ? "text-amber-300" : "text-slate-500"
                }`}
              >
                {position + 1}
              </span>
              <span
                className={`pixel-font w-20 shrink-0 text-[9px] md:text-[11px] ${
                  isYou ? "text-cyan-200" : "text-slate-300"
                }`}
              >
                {player.name}
              </span>
              <span className="h-2 grow bg-[rgba(255,255,255,0.05)]">
                <span
                  className={`block h-full transition-all duration-700 ${
                    isYou ? "bg-cyan-400/80" : "bg-slate-500/60"
                  }`}
                  style={{ width: `${(player.catches / leader) * 100}%` }}
                />
              </span>
              <span className="pixel-font w-8 shrink-0 text-right text-[9px] text-slate-400 md:text-[11px]">
                {player.catches}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 border-l-2 border-cyan-400/60 bg-[rgba(0,0,0,0.4)] p-3 text-[11px] leading-relaxed text-cyan-100 md:text-xs">
        <i className="fa-solid fa-fish pr-2 text-cyan-400"></i>
        {frame.line}
      </p>
      <p className="pt-3 text-[10px] text-slate-500 md:text-xs">
        Lines like that one went out as a subtitle, not into chat. On a busy
        dock the earlier build buried every conversation on the server.
      </p>
    </Panel>
  );
}

function FishingContestPage() {
  usePageView(PROJECTS.FISHING_CONTEST);
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in fishing-contest.html, so a crawler that
    // renders the page does not see a different title to the served one.
    document.title = "Fishing Contest | Archived Minecraft event plugin";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = FC_LOGO;
  }, []);

  const closeWindow = () => setSubcontent("none");

  const subContentWindow = () => {
    if (subcontent === "none") return null;
    return (
      <WindowWrap
        close={closeWindow}
        title={subcontent}
        accent="cyan"
        icon="fa-solid fa-fish"
      >
        <ChangelogBrowser
          logs={FishingContest_Logs}
          accent="cyan"
          title="Fishing Contest releases"
          subtitle="Six releases across four months in 2021, then nothing. Click a version to open it."
        />
      </WindowWrap>
    );
  };

  const finalRelease = FishingContest_Logs[0];

  return (
    <div className="relative w-full overflow-x-hidden bg-[#04121a]">
      <style>{pageStyles}</style>
      <style>{`.back-btn{position:absolute;top:10px;left:10px;z-index:60} @media (max-width:640px){.back-btn{top:5px;left:5px}}`}</style>

      {!isPageOnly && (
        <button
          className="back-btn pixel-font rounded border border-slate-600 bg-[rgba(0,0,0,0.6)] px-2 py-1 text-xs text-slate-200 hover:bg-[rgba(255,255,255,0.03)] sm:text-sm"
          onClick={() => (window.location.href = "/")}
          aria-label="Back to home"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back
        </button>
      )}

      {/* ---------------------------------------------------------- HERO */}
      <header className="relative flex min-h-[560px] w-full place-items-center justify-center overflow-hidden md:min-h-[620px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a3d54_0%,#07293a_35%,#051c29_65%,#04121a_100%)]" />
        <div className="fc-waves pointer-events-none absolute inset-0 opacity-70" />
        <div className="fc-swell pointer-events-none absolute -inset-x-10 top-0 h-52 bg-[radial-gradient(ellipse_at_top,rgba(103,232,249,0.28)_0%,transparent_70%)]" />
        <div className="fc-swell-slow pointer-events-none absolute -inset-x-10 top-16 h-64 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14)_0%,transparent_70%)]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {BUBBLES.map((bubble) => (
            <span
              key={bubble.left}
              className="fc-bubble absolute bottom-0 rounded-full border border-cyan-200/40 bg-cyan-200/10"
              style={{
                left: bubble.left,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDelay: bubble.delay,
                animationDuration: bubble.duration,
              }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04121a] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={FC_LOGO}
            alt="Fishing Contest icon"
            className="fc-bob mx-auto h-16 w-16 rounded-lg object-cover md:h-24 md:w-24 drop-shadow-[0_0_28px_rgba(34,211,238,0.6)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.65)] px-3 py-1">
            <i className="fa-solid fa-trophy text-[9px] text-amber-300"></i>
            <span className="pixel-font text-[8px] tracking-widest text-amber-300 md:text-[10px]">
              ARCHIVED PROJECT, 2021
            </span>
            <span className="fc-blink h-2 w-2 bg-amber-400"></span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.3em] leading-relaxed font-bold text-cyan-300 md:text-[2.6em] [text-shadow:0_0_26px_rgba(34,211,238,0.6),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-300 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-cyan-300 hover:text-cyan-200"
              href={PluginInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {PluginInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[280px] rounded-none border-2 border-cyan-400/70 bg-cyan-500/15 py-3 text-[10px] tracking-widest text-cyan-200 transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/30 md:w-auto md:px-6 md:text-xs"
              onClick={trackedRedirect(PROJECTS.FISHING_CONTEST, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "VIEW ON SPIGOT",
                target: PluginInformation.downloadLink,
              })}
            >
              <i className="fa-solid fa-box-archive pr-2"></i>
              VIEW ON SPIGOT
            </button>
            <button
              className="pixel-font w-full max-w-[280px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
              onClick={() => setSubcontent("release history")}
            >
              <i className="fa-solid fa-clock-rotate-left pr-2"></i>
              RELEASE HISTORY
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-ranking-star"
              value="Auto"
              label="Event host"
              accent="cyan"
            />
            <StatChip
              icon="fa-solid fa-language"
              value={PluginInformation.languageCount}
              label="Languages"
              accent="teal"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={PluginInformation.commands.length}
              label="Commands"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={PluginInformation.supportedVersions}
              label="Supported"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-tag"
              value="Free"
              label="Always was"
              accent="emerald"
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------- ARCHIVE NOTICE */}
      <section className="fc-horizon relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[68%]">
          <Panel accent="amber" className="p-5 md:p-7">
            <div className="md:flex md:gap-6">
              <div className="shrink-0 pb-4 text-center md:pb-0">
                <span className="inline-flex h-16 w-16 place-items-center justify-center border-2 border-amber-400/50 bg-amber-400/10 text-2xl text-amber-300">
                  <i className="fa-solid fa-trophy"></i>
                </span>
              </div>
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                    ARCHIVED
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    last updated {PluginInformation.versionReleaseDate}
                  </span>
                </div>
                <p className="pixel-font pt-4 text-[10px] leading-relaxed text-amber-300 md:text-xs">
                  {PluginInformation.archived.headline}
                </p>
                <Body className="pt-4">{PluginInformation.archived.body}</Body>
                <Body className="pt-4 text-slate-400">
                  {PluginInformation.archived.rebuild}
                </Body>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* -------------------------------------------------- CONTEST BOARD */}
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-ranking-star"
            title="A contest, replayed"
            subtitle="The board moved on its own while people fished. A screenshot could never show that, so here it is running."
            accent="cyan"
          />
          <div className="mt-7 gap-6 lg:flex">
            <div className="w-full lg:w-3/5">
              <ContestBoard />
            </div>
            <div className="w-full pt-6 lg:w-2/5 lg:pt-0">
              <Body className="text-justify">
                {PluginInformation.description}
              </Body>
              <div className="pt-5">
                <Note accent="cyan" icon="fa-solid fa-clock">
                  The first contest fired ten minutes after a restart, and every
                  one after that came off the day interval in config.yml. Staff
                  could still start one by hand with /fishstart, but nobody had
                  to be awake for the event to happen.
                </Note>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- ABOUT */}
      <section className="fc-horizon w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="What it did"
            subtitle={PluginInformation.tagline}
            accent="teal"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              {PluginInformation.descriptionMore.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="pt-4 text-justify text-xs leading-relaxed text-slate-400 first:pt-0 md:text-sm"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                {PluginInformation.highlights.map((highlight) => (
                  <Panel
                    key={highlight.key}
                    accent={highlight.accent}
                    className="p-4"
                  >
                    <div className="flex place-items-center gap-3">
                      <IconBadge
                        icon={highlight.icon}
                        accent={highlight.accent}
                      />
                      <p className="pixel-font text-[9px] leading-normal tracking-wide text-slate-200 md:text-[11px]">
                        {highlight.title}
                      </p>
                    </div>
                    <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      {highlight.description}
                    </p>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- LANGUAGES */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-language"
            title="Four languages"
            subtitle="One key in config.yml switched every player-facing string."
            accent="teal"
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PluginInformation.languages.map((language) => (
              <Panel key={language.name} accent="teal" className="p-4">
                <p className="pixel-font text-[10px] tracking-wide text-teal-300 md:text-xs">
                  {language.name}
                </p>
                <p className="pt-2 text-xs text-slate-400 md:text-sm">
                  {language.native}
                </p>
              </Panel>
            ))}
          </div>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
              The listing never claimed these were perfect translations, and
              neither does this page. They were good enough for a player to
              follow their own event in their own language, which in a free 2021
              plugin was more than most offered.
            </Note>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ COMMANDS */}
      <section className="fc-horizon w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Commands"
            subtitle={`${PluginInformation.commands.length} of them. Three for everyone, one for staff.`}
            accent="cyan"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <PixelButton
                icon="fa-solid fa-chevron-down"
                accent="cyan"
                onClick={() => setShowCommand(true)}
              >
                SHOW COMMANDS
              </PixelButton>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="cyan" className="overflow-x-auto p-3 md:p-4">
                <LegacyCommandTable
                  commands={PluginInformation.commands}
                  accent="cyan"
                />
              </Panel>
              <div className="pt-4 text-center">
                <PixelButton
                  icon="fa-solid fa-chevron-up"
                  accent="slate"
                  onClick={() => setShowCommand(false)}
                >
                  HIDE COMMANDS
                </PixelButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------- INSTALLATION */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-server"
            title="What it needed"
            subtitle="Two dependencies, both of them ordinary, and about two minutes."
            accent="sky"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="cyan" className="p-5">
                <Steps>
                  {PluginInformation.setup.map((step, index) => (
                    <Step key={step} n={index + 1} accent="cyan">
                      {step}
                    </Step>
                  ))}
                </Steps>
              </Panel>
            </div>
            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <Terminal title="FishingContest / dependencies.log">
                <pre>
                  <code className="text-[10px] md:text-sm">
                    <TerminalLabel accent="cyan">[REQUIRED]</TerminalLabel>
                    {PluginInformation.dependencies
                      .map(
                        (dependency) =>
                          `\n- ${dependency.name} [${dependency.version}]\n  ${dependency.note}\n`,
                      )
                      .join("")}
                    <TerminalLabel accent="cyan">[SERVER]</TerminalLabel>
                    {`
- SPIGOT [${PluginInformation.supportedVersions}]
- PAPER  [${PluginInformation.supportedVersions}]

Anything newer than 1.18 was never supported by
this build, and never will be.
`}
                  </code>
                </pre>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- SCREENSHOTS */}
      <section className="fc-horizon w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-camera-retro"
            title="From the listing"
            subtitle="The screenshots that shipped with the plugin in 2021."
            accent="sky"
          />
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {PluginInformation.screenshots.map((shot) => (
              <Shot
                key={shot.alt}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                accent="cyan"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ RELEASE HISTORY */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release history"
            subtitle={`${PluginInformation.releaseCount} releases between ${PluginInformation.firstReleaseDate} and ${PluginInformation.versionReleaseDate}. Then it stopped.`}
            accent="cyan"
          />
          <div className="mt-6 space-y-3">
            <Changelog
              log={finalRelease}
              isLatest
              latestLabel="FINAL"
              accent="cyan"
            />
          </div>
          <div className="pt-5 text-center">
            <PixelButton
              icon="fa-solid fa-clock-rotate-left"
              accent="teal"
              onClick={() => setSubcontent("release history")}
            >
              SEE EVERY RELEASE
            </PixelButton>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- WHERE NOW */}
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="cyan" className="p-6 text-center md:p-8">
            <SectionHeading
              icon="fa-solid fa-anchor"
              title="Where the work went"
              subtitle="This one is finished. The ones that are not are a click away."
              accent="cyan"
              align="center"
            />
            <div className="mt-6 flex flex-col place-items-center justify-center gap-3 md:flex-row">
              <PixelButton
                accent="lime"
                icon="fa-solid fa-wand-magic-sparkles"
                onClick={() => (window.location.href = "/customenchantments3")}
              >
                CUSTOM ENCHANTMENTS 3
              </PixelButton>
              <PixelButton
                accent="emerald"
                icon="fa-solid fa-coins"
                onClick={() => (window.location.href = "/kumandras-economy")}
              >
                KUMANDRA&apos;S ECONOMY
              </PixelButton>
            </div>
          </Panel>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <PageFooter />
    </div>
  );
}

export default FishingContestPage;
