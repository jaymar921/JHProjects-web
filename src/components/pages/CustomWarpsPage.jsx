import { useEffect, useState } from "react";
import { PluginInformation } from "../contants/legacy/CustomWarpsConstants";
import { CustomWarps_Logs } from "../contants/legacy/CustomWarpsConstants_Logs";
import { RedirectTo } from "../utils/PageUtility";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import Changelog from "../page_components/Changelog";
import ChangelogBrowser from "../page_components/ChangelogBrowser";
import LegacyCommandTable from "../page_components/LegacyCommandTable";
import {
  Body,
  Chip,
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
import CW_LOGO from "../../assets/legacy/custom_warps/icon.jpg";

/**
 * Custom Warps, archived.
 *
 * The page runs violet where CE3 runs lime and Kumandra's Economy runs
 * emerald, and it swaps their scanline-over-grid hero for a beam of light
 * through a portal, because the plugin was about going somewhere. The one
 * piece of interactivity is the slot grid below: the plugin's whole idea was
 * that the GUI was addressed by slot number from in game, so the page lets you
 * click a slot and see the command that would have configured it.
 */

const pageStyles = `
  .cw-beams {
    background-image: repeating-linear-gradient(
      115deg,
      rgba(167, 139, 250, 0.07) 0px,
      rgba(167, 139, 250, 0.07) 1px,
      transparent 1px,
      transparent 14px
    );
  }
  .cw-grid {
    background-image:
      linear-gradient(rgba(167, 139, 250, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(167, 139, 250, 0.07) 1px, transparent 1px);
    background-size: 54px 54px;
  }
  @keyframes cw-pulse {
    0%, 100% { transform: scale(1); opacity: 0.55; }
    50% { transform: scale(1.12); opacity: 0.9; }
  }
  .cw-pulse { animation: cw-pulse 5s ease-in-out infinite; }
  @keyframes cw-hover {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  .cw-hover { animation: cw-hover 6s ease-in-out infinite; }
  @keyframes cw-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .cw-blink { animation: cw-blink 1.6s steps(2, end) infinite; }
`;

/**
 * A sample of the menu as it was actually built, so the slot demo has
 * something in it. Three rows of nine, which is what config.yml's row count
 * controlled. Slot numbers are Minecraft's own, left to right, top to bottom.
 */
const SAMPLE_SLOTS = [
  { slot: 10, icon: "fa-solid fa-house", name: "Spawn", color: "GOLD" },
  { slot: 12, icon: "fa-solid fa-store", name: "Market", color: "YELLOW" },
  { slot: 13, icon: "fa-solid fa-mountain", name: "Mines", color: "GRAY" },
  { slot: 14, icon: "fa-solid fa-tree", name: "Forest", color: "DARK_GREEN" },
  { slot: 16, icon: "fa-solid fa-fire", name: "Nether Portal", color: "DARK_RED" },
  { slot: 20, icon: "fa-solid fa-fish", name: "Docks", color: "AQUA" },
  { slot: 22, icon: "fa-solid fa-khanda", name: "Arena", color: "RED" },
  { slot: 24, icon: "fa-solid fa-gem", name: "End Gate", color: "DARK_PURPLE" },
];

function WarpSlotGrid() {
  const [selected, setSelected] = useState(13);
  const filled = new Map(SAMPLE_SLOTS.map((warp) => [warp.slot, warp]));
  const active = filled.get(selected);

  return (
    <div className="lg:flex lg:gap-6">
      <div className="w-full lg:w-auto">
        <Panel accent="violet" className="p-3 md:p-4">
          <p className="pixel-font pb-3 text-[8px] tracking-widest text-violet-300 md:text-[10px]">
            /WARP DISPLAY
          </p>
          <div className="grid grid-cols-9 gap-1 md:gap-1.5">
            {Array.from({ length: 27 }, (_, index) => {
              const warp = filled.get(index);
              const isSelected = index === selected;
              return (
                <button
                  key={index}
                  onClick={() => setSelected(index)}
                  aria-label={
                    warp ? `Slot ${index}, ${warp.name}` : `Slot ${index}, empty`
                  }
                  aria-pressed={isSelected}
                  className={`relative aspect-square rounded-none border p-0 transition-all ${
                    isSelected
                      ? "border-violet-300 bg-violet-500/25 shadow-[0_0_16px_rgba(167,139,250,0.45)]"
                      : warp
                        ? "border-violet-400/40 bg-violet-400/10 hover:border-violet-300"
                        : "border-slate-700/70 bg-[rgba(0,0,0,0.45)] hover:border-slate-500"
                  }`}
                >
                  {warp ? (
                    <i
                      className={`${warp.icon} text-[9px] text-violet-200 md:text-xs`}
                    ></i>
                  ) : (
                    <span className="pixel-font text-[6px] text-slate-600 md:text-[8px]">
                      {index}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="pt-3 text-[10px] text-slate-500 md:text-xs">
            Three rows of nine, the way a menu was laid out. Pick a slot.
          </p>
        </Panel>
      </div>

      <div className="w-full pt-5 lg:w-1/2 lg:grow lg:pt-0">
        <Terminal title={`CustomWarps / slot ${selected}`}>
          <pre>
            <code className="text-[10px] md:text-sm">
              <TerminalLabel accent="violet">
                {active ? `[SLOT ${selected}] ${active.name}` : `[SLOT ${selected}] EMPTY`}
              </TerminalLabel>
              {active
                ? `
/warp modify slot ${selected} item
  > icon set from the item in your hand

/warp modify slot ${selected} name ${active.color} ${active.name}
  > renamed, coloured ${active.color}

/warp modify slot ${selected} location set
  > destination is where you are standing

/warp save
  > written to disk
`
                : `
Nothing configured here. To claim it:

/warp modify slot ${selected} item
/warp modify slot ${selected} name AQUA My Warp
/warp modify slot ${selected} location set
/warp save
`}
            </code>
          </pre>
        </Terminal>
        <div className="pt-4">
          <Note accent="violet" icon="fa-solid fa-floppy-disk">
            Every one of these was typed in game, standing where the warp was
            meant to land. The config file never had a warp in it, only the row
            count, the menu title, its colour and the delay.
          </Note>
        </div>
      </div>
    </div>
  );
}

function CustomWarpsPage() {
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in custom-warps.html, so a crawler that
    // renders the page does not see a different title to the served one.
    document.title = "Custom Warps | Archived Minecraft warp plugin";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = CW_LOGO;
  }, []);

  const closeWindow = () => setSubcontent("none");

  const subContentWindow = () => {
    if (subcontent === "none") return null;
    return (
      <WindowWrap
        close={closeWindow}
        title={subcontent}
        accent="violet"
        icon="fa-solid fa-compass"
      >
        <ChangelogBrowser
          logs={CustomWarps_Logs}
          accent="violet"
          title="Custom Warps releases"
          subtitle="Four releases across six weeks in 2021, then nothing. Click a version to open it."
        />
      </WindowWrap>
    );
  };

  const finalRelease = CustomWarps_Logs[0];

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0b0a12]">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.28)_0%,rgba(24,16,48,0.85)_45%,rgba(11,10,18,1)_100%)]" />
        <div className="cw-beams pointer-events-none absolute inset-0 opacity-80" />
        <div className="cw-pulse pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.28)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0a12] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <div className="relative mx-auto h-20 w-20 md:h-28 md:w-28">
            <span className="absolute inset-0 rounded-full border border-violet-400/40" />
            <span className="cw-pulse absolute -inset-3 rounded-full border border-violet-400/20" />
            <img
              src={CW_LOGO}
              alt="Custom Warps icon"
              className="cw-hover absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-md object-cover drop-shadow-[0_0_28px_rgba(167,139,250,0.6)]"
            />
          </div>

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.65)] px-3 py-1">
            <i className="fa-solid fa-trophy text-[9px] text-amber-300"></i>
            <span className="pixel-font text-[8px] tracking-widest text-amber-300 md:text-[10px]">
              ARCHIVED PROJECT, 2021
            </span>
            <span className="cw-blink h-2 w-2 bg-amber-400"></span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.3em] leading-relaxed font-bold text-violet-300 md:text-[2.6em] [text-shadow:0_0_26px_rgba(167,139,250,0.6),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-300 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-violet-300 hover:text-violet-200"
              href={PluginInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {PluginInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[280px] rounded-none border-2 border-violet-400/70 bg-violet-500/15 py-3 text-[10px] tracking-widest text-violet-200 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-500/30 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(PluginInformation.downloadLink)}
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
              icon="fa-solid fa-location-dot"
              value={PluginInformation.maxWarps}
              label="Warp slots"
              accent="violet"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={PluginInformation.commands.length}
              label="Commands"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-palette"
              value={PluginInformation.colors.length}
              label="Colours"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={PluginInformation.supportedVersions}
              label="Supported"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-tag"
              value="Free"
              label="Always was"
              accent="teal"
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------- ARCHIVE NOTICE */}
      <section className="cw-grid relative w-full py-10">
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
                    {PluginInformation.supportedVersions}
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

      {/* --------------------------------------------------------- ABOUT */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="What it did"
            subtitle={PluginInformation.tagline}
            accent="violet"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Body className="text-justify">
                {PluginInformation.description}
              </Body>
              {PluginInformation.descriptionMore.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="pt-4 text-justify text-xs leading-relaxed text-slate-400 md:text-sm"
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

      {/* ----------------------------------------------------- SLOT DEMO */}
      <section className="cw-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-table-cells"
            title="The menu was the config"
            subtitle="Click a slot to see the commands that would have built it."
            accent="purple"
          />
          <div className="mt-7">
            <WarpSlotGrid />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ HOW TO USE */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-list-ol"
            title="Setting up a warp"
            subtitle="Five steps, all of them in game, none of them in a file."
            accent="violet"
          />
          <Panel accent="violet" className="mt-6 p-5">
            <Steps>
              {PluginInformation.setup.map((step, index) => (
                <Step key={step} n={index + 1} accent="violet">
                  {step}
                </Step>
              ))}
            </Steps>
          </Panel>
          <div className="pt-5">
            <SectionHeading
              icon="fa-solid fa-palette"
              title="Name colours"
              subtitle="Fifteen of them, taken straight from Minecraft's own list."
              accent="amber"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {PluginInformation.colors.map((color) => (
                <Chip key={color} accent="purple">
                  {color}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ COMMANDS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Commands"
            subtitle={`${PluginInformation.commands.length} of them. One for players, the rest for whoever built the menu.`}
            accent="violet"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <PixelButton
                icon="fa-solid fa-chevron-down"
                accent="violet"
                onClick={() => setShowCommand(true)}
              >
                SHOW COMMANDS
              </PixelButton>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="violet" className="overflow-x-auto p-3 md:p-4">
                <LegacyCommandTable
                  commands={PluginInformation.commands}
                  accent="violet"
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

      {/* ---------------------------------------------------- SCREENSHOTS */}
      <section className="cw-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-camera-retro"
            title="From the listing"
            subtitle="The screenshots that shipped with the plugin in 2021."
            accent="purple"
          />
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {PluginInformation.screenshots.map((shot) => (
              <Shot
                key={shot.alt}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                accent="violet"
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
            accent="violet"
          />
          <div className="mt-6 space-y-3">
            <Changelog
              log={finalRelease}
              isLatest
              latestLabel="FINAL"
              accent="violet"
            />
          </div>
          <div className="pt-5 text-center">
            <PixelButton
              icon="fa-solid fa-clock-rotate-left"
              accent="purple"
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
          <Panel accent="violet" className="p-6 text-center md:p-8">
            <SectionHeading
              icon="fa-solid fa-compass"
              title="Where the work went"
              subtitle="This one is finished. The ones that are not are a click away."
              accent="violet"
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

export default CustomWarpsPage;
