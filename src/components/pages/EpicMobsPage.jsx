import { useEffect } from "react";
import {
  AreaOfEffects,
  CommandList,
  EpicMobs_Logs,
  Environments,
  Features,
  Integrations,
  MobAttributes,
  ProjectInformation,
} from "../contants/projects/EpicMobsConstants";
import PageFooter from "../page_components/PageFooter";
import Changelog from "../page_components/Changelog";
import LegacyCommandTable from "../page_components/LegacyCommandTable";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  IconBadge,
  Note,
  Panel,
  PixelButton,
  SectionHeading,
  Shot,
  StatChip,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";
import { PROJECTS, usePageView } from "../../lib/analytics";

/**
 * The Epic Mobs page.
 *
 * An archive page with no outbound links, which is unusual here and
 * deliberate: the repository is private and the plugin was never on the public
 * Spigot listing, so there is nothing to send anyone to. Every other archive
 * page ends in a button; this one ends in a sentence about Epic Mobs 2, which
 * is the honest version of the same thing.
 *
 * Sky and amber, taken off the plugin's own logo, so it does not read as
 * another Custom Enchantments page.
 */
const pageStyles = `
  .em-pixelated { image-rendering: pixelated; }
  .em-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .em-grid {
    background-image:
      linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes em-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .em-float { animation: em-float 4s ease-in-out infinite; }
  @keyframes em-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .em-blink { animation: em-blink 1.4s steps(2, end) infinite; }
`;

function EpicMobsPage() {
  usePageView(PROJECTS.EPIC_MOBS);
  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    document.title = "Epic Mobs | Abandoned Minecraft custom mob plugin";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = ProjectInformation.icon;
  }, []);

  const latest = EpicMobs_Logs[0];

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
      <header className="relative flex min-h-[500px] w-full place-items-center justify-center overflow-hidden md:min-h-[560px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.16)_0%,rgba(0,0,0,0.85)_55%,rgba(14,16,20,1)_100%)]" />
        <div className="em-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="em-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={ProjectInformation.icon}
            alt="Epic Mobs logo"
            className="em-pixelated em-float mx-auto h-16 w-16 rounded-lg object-cover drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] md:h-24 md:w-24"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="em-blink h-2 w-2 bg-amber-400"></span>
            <span className="pixel-font text-[8px] tracking-widest text-amber-300 md:text-[10px]">
              {ProjectInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-sky-400 [text-shadow:0_0_24px_rgba(56,189,248,0.5),4px_4px_0_rgba(0,0,0,0.85)] md:text-[2.4em]">
            {ProjectInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 [text-shadow:2px_2px_0_rgba(0,0,0,0.9)] md:text-lg">
            {ProjectInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-sky-300 hover:text-sky-200"
              href={ProjectInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {ProjectInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-skull"
              value="6"
              label="Tiers"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-wind"
              value="16"
              label="AoE abilities"
              accent="rose"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={CommandList.length}
              label="Commands"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-code-branch"
              value={`v${ProjectInformation.version}`}
              label="Last build"
              accent="emerald"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={ProjectInformation.supportedVersions}
              label="Supported"
              accent="violet"
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------- THE STATUS */}
      <section className="em-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="flex flex-wrap place-items-center gap-2">
              <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                <i className="fa-solid fa-circle-pause pr-1"></i>
                ABANDONED
              </span>
              <span className="pixel-font text-xs text-slate-200 md:text-sm">
                v{ProjectInformation.version}
              </span>
              <span className="text-[10px] text-slate-500 md:text-xs">
                last shipped {ProjectInformation.versionReleaseDate}
              </span>
            </div>
            <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
              {ProjectInformation.status_note.headline}
            </p>
            <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
              {ProjectInformation.status_note.body}
            </p>
          </Panel>
        </div>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section className="w-full py-6">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-skull"
            title="What it did"
            subtitle={ProjectInformation.tagline}
            accent="sky"
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
              <Terminal title="EpicMobs / plugin.yml">
                <pre>
                  <code className="text-[10px] md:text-sm" lang="md">
                    <TerminalLabel accent="sky">[BUILD]</TerminalLabel>
                    {`
name        : EpicMobs
version     : 1.4.13
api-version : 1.16
built for   : Spigot 1.16 - 1.19
java        : 15
command     : /epicmobs, aliased to /ep
                    `}
                    <TerminalLabel accent="amber">[SOFTDEPEND]</TerminalLabel>
                    {`
CustomEnchantments3, Vault, WorldGuard,
KumandrasEconomy, EssentialsX

Every one of them optional. The plugin
ran on its own without any of them.
                    `}
                  </code>
                </pre>
              </Terminal>
              <div className="pt-5">
                <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
                  There is no download on this page and no link to the source.
                  The repository is private and the plugin was never on the
                  public listing, so there is nothing honest to point at.
                </Note>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section className="em-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-dice-d20"
            title="What got built"
            subtitle="Four panels. The plugin was small, and it did these four things properly."
            accent="sky"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Features.map((feature) => (
              <Panel
                key={feature.key}
                accent={feature.accent}
                className="overflow-hidden p-0"
              >
                <img
                  src={feature.image}
                  alt={`${feature.title} in Epic Mobs`}
                  loading="lazy"
                  className="w-full object-contain"
                />
                <div className="p-5">
                  <div className="flex place-items-center gap-3">
                    <IconBadge icon={feature.icon} accent={feature.accent} />
                    <SubHeading accent={feature.accent}>
                      {feature.title}
                    </SubHeading>
                  </div>
                  <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- THE MOB ITSELF */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-sliders"
            title="What a mob carried"
            subtitle="Twelve fields, and none of them needed a text editor to set."
            accent="sky"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <Panel accent="sky" className="p-5">
                <SubHeading accent="sky">MOB ATTRIBUTES</SubHeading>
                <div className="mt-3 grid gap-2">
                  {MobAttributes.map((attribute) => (
                    <div
                      key={attribute.key}
                      className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] px-3 py-2"
                    >
                      <span className="pixel-font text-[8px] text-slate-200 md:text-[10px]">
                        {attribute.key}
                      </span>
                      <span className="text-[11px] text-slate-400 md:text-xs">
                        {attribute.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
              <SubHeading accent="amber">
                FOUR ENVIRONMENTS, ONE FIELD
              </SubHeading>
              <Body className="pt-3 text-justify">
                This was the field that mattered most. It decided whether a mob
                was something you fought once or something you kept running
                into, and it was one dropdown.
              </Body>
              <div className="mt-4 grid gap-3">
                {Environments.map((environment) => (
                  <Panel
                    key={environment.name}
                    accent={environment.accent}
                    className="p-4"
                  >
                    <div className="flex place-items-center gap-3">
                      <IconBadge
                        icon={environment.icon}
                        accent={environment.accent}
                      />
                      <SubHeading accent={environment.accent}>
                        {environment.name}
                      </SubHeading>
                    </div>
                    <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                      {environment.note}
                    </p>
                  </Panel>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ AREA OF EFFECT */}
      <section className="em-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-wind"
            title="16 area of effect abilities"
            subtitle="Put on a timer, and aimed at either the player or everything nearby."
            accent="rose"
          />
          <div className="mt-6 grid gap-2 md:grid-cols-2">
            {AreaOfEffects.map((ability) => (
              <div
                key={ability.code}
                className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] px-3 py-2"
              >
                <Chip accent={ability.accent}>{ability.code}</Chip>
                <span className="grow text-[11px] text-slate-400 md:text-xs">
                  {ability.effect}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Note accent="rose" icon="fa-solid fa-circle-info">
              The codes are the raw enum names, which is what they looked like
              in the creation prompt too. The last letters say who it hit: PT
              for the player, APT for every entity in range.
            </Note>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- COMMANDS */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="Commands"
            subtitle={`${CommandList.length} of them, all under /ep. Admin ones are marked.`}
            accent="sky"
          />
          <Panel accent="sky" className="mt-6 overflow-x-auto p-3 md:p-4">
            <LegacyCommandTable commands={CommandList} accent="sky" />
          </Panel>
          <div className="pt-5">
            <Note accent="sky" icon="fa-solid fa-comment">
              <Cmd accent="sky">/ep create</Cmd> was the whole point. It walked
              an admin through building a mob in chat and a GUI, and wrote the
              result out to the plugin&apos;s data files. Nobody ever had to
              open a YAML file to add a mob, which for 2021 was most of the
              reason anyone bought it.
            </Note>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- INTEGRATIONS */}
      <section className="em-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-plug"
            title="Five optional integrations"
            subtitle="All soft dependencies. Nothing here was required to run the plugin."
            accent="violet"
          />
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Integrations.map((integration) => (
              <Panel
                key={integration.name}
                accent={integration.accent}
                className="p-5"
              >
                <SubHeading accent={integration.accent}>
                  {integration.name}
                </SubHeading>
                <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                  {integration.note}
                </p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CHANGELOG */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="How it went, and how it stopped"
            subtitle={`${ProjectInformation.years}. Eighteen months, and the gaps get longer as you read down.`}
            accent="sky"
          />
          <div className="mt-6 space-y-3">
            {EpicMobs_Logs.map((log) => (
              <Changelog
                key={log.update_version}
                log={log}
                isLatest={log.update_version === latest.update_version}
                accent="sky"
              />
            ))}
          </div>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-clock">
              These are taken from the repository&apos;s own commit log rather
              than release notes, because there were never any release notes.
              Four builds in one week in November 2021, then two in 2022, then
              two in 2023. That shape is the honest version of what happened.
            </Note>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ EPIC MOBS 2 */}
      <section className="em-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="emerald" className="p-6 md:p-8">
            <SectionHeading
              icon="fa-solid fa-seedling"
              title="What replaced it"
              subtitle="This section used to be one paragraph saying there was nothing to show."
              accent="emerald"
            />
            <p className="pixel-font pt-4 text-[10px] text-emerald-300 md:text-xs">
              {ProjectInformation.successor.headline}
            </p>
            <Body className="pt-4">{ProjectInformation.successor.body}</Body>
            <Bullets className="pt-4">
              <Bullet accent="emerald">
                Still no release date, and still no estimate of one.
              </Bullet>
              <Bullet accent="emerald">
                It is a rewrite, not an update. Nothing here gets patched.
              </Bullet>
              <Bullet accent="emerald">
                Your old mob definitions, raids, spawners and loot are converted
                on its first start, so the work you did here is not wasted.
              </Bullet>
              <Bullet accent="emerald">
                Still not a reason to wait. If you need a mob plugin today, go
                and find one that is being maintained today.
              </Bullet>
            </Bullets>
            <div className="pt-6">
              <PixelButton
                accent="emerald"
                icon="fa-solid fa-arrow-right"
                onClick={() =>
                  (window.location.href = ProjectInformation.successor.href)
                }
              >
                {ProjectInformation.successor.linkLabel}
              </PixelButton>
            </div>
          </Panel>
          <div className="pt-5">
            <Shot
              src={Features[3].image}
              alt="Where Epic Mobs stopped, and where Epic Mobs 2 stands"
              accent="amber"
              caption="Eighteen months, thirteen releases, and a sentence about what comes next"
            />
          </div>
          <div className="pt-5">
            <Note accent="sky" icon="fa-solid fa-box-archive">
              This page exists so the work is on the record. It is not a
              download page, there is no install guide, and there is no support
              to ask for. Kept on the shelf rather than deleted.
            </Note>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

export default EpicMobsPage;
