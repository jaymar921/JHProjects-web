import { useEffect } from "react";
import {
  CommandList,
  CustomEnchants2_Logs,
  EnchantGroups,
  Features,
  ProjectInformation,
} from "../contants/projects/CustomEnchants2Constants";
import { RedirectTo } from "../utils/PageUtility";
import PageFooter from "../page_components/PageFooter";
import Changelog from "../page_components/Changelog";
import {
  ActionCard,
  Body,
  Chip,
  Cmd,
  IconBadge,
  Note,
  Panel,
  SectionHeading,
  StatChip,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";

/**
 * The Custom Enchantments 2 page.
 *
 * CE2 is finished, so this reads as a record rather than a listing: what it
 * did, what shipped last, where the source is, and where the maintained
 * version of the idea went. Purple and amber, the enchanting table palette,
 * which is also what separates it from CE3's lime at a glance.
 */
const pageStyles = `
  .ce2-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .ce2-grid {
    background-image:
      linear-gradient(rgba(192, 132, 252, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(192, 132, 252, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes ce2-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .ce2-float { animation: ce2-float 4s ease-in-out infinite; }
  @keyframes ce2-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .ce2-blink { animation: ce2-blink 1.4s steps(2, end) infinite; }
`;

function CustomEnchants2Page() {
  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    document.title = "Custom Enchantments 2 | Archived Minecraft plugin";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = ProjectInformation.icon;
  }, []);

  const latest = CustomEnchants2_Logs[0];

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0e1014]">
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
      <header className="relative flex min-h-[520px] w-full place-items-center justify-center overflow-hidden md:min-h-[600px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.16)_0%,rgba(0,0,0,0.85)_55%,rgba(14,16,20,1)_100%)]" />
        <div className="ce2-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="ce2-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={ProjectInformation.icon}
            alt="Custom Enchantments 2 logo"
            className="ce2-float mx-auto h-16 w-16 rounded-lg object-cover drop-shadow-[0_0_25px_rgba(192,132,252,0.55)] md:h-24 md:w-24"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="ce2-blink h-2 w-2 bg-amber-400"></span>
            <span className="pixel-font text-[8px] tracking-widest text-amber-300 md:text-[10px]">
              {ProjectInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-purple-400 [text-shadow:0_0_24px_rgba(192,132,252,0.55),4px_4px_0_rgba(0,0,0,0.85)] md:text-[2.4em]">
            {ProjectInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 [text-shadow:2px_2px_0_rgba(0,0,0,0.9)] md:text-lg">
            {ProjectInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-purple-300 hover:text-purple-200"
              href={ProjectInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {ProjectInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-purple-400/70 bg-purple-500/15 py-3 text-[10px] tracking-widest text-purple-200 transition-all hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-500/30 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(ProjectInformation.repoLink)}
            >
              <i className="fa-brands fa-github pr-2"></i>
              READ THE SOURCE
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-lime-400/60 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/20 md:w-auto md:px-6 md:text-xs"
              onClick={() =>
                (window.location.href = ProjectInformation.successorLink)
              }
            >
              <i className="fa-solid fa-arrow-right pr-2"></i>
              SEE CE3 INSTEAD
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-wand-sparkles"
              value={ProjectInformation.enchantCount}
              label="Enchants"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-tag"
              value="Free"
              label="Always was"
              accent="emerald"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={ProjectInformation.supportedVersions}
              label="Supported"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-code-branch"
              value={ProjectInformation.version}
              label="Last build"
              accent="sky"
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------- THE STATUS */}
      <section className="ce2-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                    <i className="fa-solid fa-box-archive pr-1"></i>
                    ARCHIVED
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{ProjectInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    last patched {ProjectInformation.versionReleaseDate}
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                  {ProjectInformation.status_note.headline}
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  {ProjectInformation.status_note.body}
                </p>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-amber-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 md:w-auto md:text-[10px]"
                  onClick={() => RedirectTo(ProjectInformation.spigotLink)}
                >
                  <i className="fa-solid fa-download pr-2"></i>
                  THE OLD LISTING
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section className="w-full py-6">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="What it was"
            subtitle={ProjectInformation.tagline}
            accent="purple"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <p className="text-justify text-xs leading-relaxed text-slate-300 md:text-sm">
                {ProjectInformation.description}
              </p>
              {ProjectInformation.descriptionMore.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="pt-4 text-justify text-xs leading-relaxed text-slate-400 md:text-sm"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <Terminal title="CustomEnchantments / plugin.yml">
                <pre>
                  <code className="text-[10px] md:text-sm" lang="yaml">
                    <TerminalLabel accent="purple">[THE JAR]</TerminalLabel>
                    {`
name: CustomEnchantments
author: JayMar921
api-version: 1.16

softdepend: [PvPManager, WorldGuard]
loadbefore: [KumandrasEconomy, GoldenCrates]
                    `}
                    <TerminalLabel accent="amber">[STATUS]</TerminalLabel>
                    {`
discontinued : December 2021
last patch   : 2.1.7e, July 2022
source       : public, unmaintained
successor    : Custom Enchantments 3
                    `}
                  </code>
                </pre>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section className="ce2-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-wand-sparkles"
            title="What was in it"
            subtitle="Three panels, because a plugin nobody can support any more does not need nine."
            accent="purple"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in Custom Enchantments 2`}
                description={feature.description}
                buttonIcon="fa-brands fa-github"
                buttonLabel="Source"
                onClick={() => RedirectTo(ProjectInformation.repoLink)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- ENCHANTMENTS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-khanda"
            title="The enchantments"
            subtitle={`${ProjectInformation.enchantCount} registered on startup. A sample of each category is below.`}
            accent="violet"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {EnchantGroups.map((group) => (
              <Panel key={group.group} accent={group.accent} className="p-5">
                <div className="flex place-items-center gap-3">
                  <IconBadge icon={group.icon} accent={group.accent} />
                  <SubHeading accent={group.accent}>
                    {group.group.toUpperCase()}
                  </SubHeading>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {group.names.map((name) => (
                    <Chip key={name} accent={group.accent}>
                      {name}
                    </Chip>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
          <div className="pt-5">
            <Note accent="purple" icon="fa-solid fa-circle-info">
              Every enchantment was a config entry, so a server could turn any
              of them off. Magic enchantments dealt three times physical damage,
              which is the one balance decision worth knowing about before you
              read the source.
            </Note>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- COMMANDS */}
      <section className="ce2-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Commands"
            subtitle="From the plugin's own plugin.yml."
            accent="amber"
          />
          <div className="mt-6 grid gap-2">
            {CommandList.map((command) => (
              <div
                key={command.command}
                className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
              >
                <span className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                  {command.command}
                </span>
                <span className="grow text-[11px] text-slate-400 md:text-xs">
                  {command.description}
                </span>
                <span
                  className={`pixel-font border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${
                    command.requireOp
                      ? "border-rose-400/40 bg-rose-400/10 text-rose-300"
                      : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  {command.requireOp ? "OP" : "EVERYONE"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CHANGELOG */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="How it ended"
            subtitle="The last releases, including the three that came from the community after it was put down."
            accent="violet"
          />
          <div className="mt-6 space-y-3">
            {CustomEnchants2_Logs.map((log) => (
              <Changelog
                key={log.update_version}
                log={log}
                isLatest={log.update_version === latest.update_version}
                accent="violet"
              />
            ))}
          </div>
          <div className="pt-5">
            <Note accent="emerald" icon="fa-solid fa-user-group">
              The last three patches were written by Corxl, not by me. CE2 was
              already discontinued by then, and somebody kept fixing it anyway,
              which is the nicest thing that can happen to a plugin you have
              stopped working on.
            </Note>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- SUCCESSOR */}
      <section className="ce2-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="lime" className="p-6 text-center md:p-8">
            <SectionHeading
              icon="fa-solid fa-arrow-right"
              title="Looking for the maintained one?"
              subtitle="Custom Enchantments 3 is where this went, and it is a different plugin rather than a newer version."
              accent="lime"
              align="center"
            />
            <Body className="pt-4">
              CE3 was rebuilt from scratch with player classes, a skill system,
              quests and its own economy. Saves and items from CE2 do not carry
              across, which is the trade for it not being weighed down by this
              one. It shares the same Spigot listing, so the download history of
              both lives in the same place.
            </Body>
            <div className="mt-6 flex flex-col place-items-center justify-center gap-3 md:flex-row">
              <button
                className="pixel-font w-full max-w-[260px] rounded-none border-2 border-lime-400/70 bg-lime-500/15 py-3 text-[10px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/30 md:w-auto md:px-6 md:text-xs"
                onClick={() =>
                  (window.location.href = ProjectInformation.successorLink)
                }
              >
                <i className="fa-solid fa-wand-magic-sparkles pr-2"></i>
                CUSTOM ENCHANTMENTS 3
              </button>
              <button
                className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 md:w-auto md:px-6 md:text-xs"
                onClick={() => RedirectTo(ProjectInformation.repoLink)}
              >
                <i className="fa-brands fa-github pr-2"></i>
                CE2 ON GITHUB
              </button>
            </div>
          </Panel>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
              If you want the CE2 jar specifically, it is on the Spigot listing
              under the older releases, from <Cmd accent="amber">2.1.7e</Cmd>{" "}
              downwards. Anything above that on the page is CE3.
            </Note>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

export default CustomEnchants2Page;
