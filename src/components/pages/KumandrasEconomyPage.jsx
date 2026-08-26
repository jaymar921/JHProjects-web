import { useEffect, useState } from "react";
import {
  CommandList,
  Features,
  Jobs,
  Permissions,
  PluginInformation,
} from "../contants/kumandra/KumandraConstants";
import { Kumandra_Logs } from "../contants/kumandra/KumandraConstants_Logs";
import { RedirectTo } from "../utils/PageUtility";
import {
  formatDownloads,
  KUMANDRA_FALLBACK,
  useSpigetResource,
} from "../utils/useSpigetDownloads";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import KE_CommandTableComponent from "../page_components/KE_CommandTableComponent";
import Changelog from "../page_components/Changelog";
import KE_Balance from "./kumandra_subcontent/KE_Balance";
import KE_Exchange from "./kumandra_subcontent/KE_Exchange";
import KE_Trading from "./kumandra_subcontent/KE_Trading";
import KE_Delivery from "./kumandra_subcontent/KE_Delivery";
import KE_Jobs from "./kumandra_subcontent/KE_Jobs";
import KE_Quests from "./kumandra_subcontent/KE_Quests";
import KE_Shops from "./kumandra_subcontent/KE_Shops";
import KE_Database from "./kumandra_subcontent/KE_Database";
import KE_API from "./kumandra_subcontent/KE_API";
import KE_Settings from "./kumandra_subcontent/KE_Settings";
import KE_Support from "./kumandra_subcontent/KE_Support";
import KE_BugReport from "./kumandra_subcontent/KE_BugReport";
import KE_ChangeLogs from "./kumandra_subcontent/KE_ChangeLogs";
import {
  ActionCard,
  IconBadge,
  Note,
  Panel,
  SectionHeading,
  StatChip,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";
import KE_LOGO from "../../assets/kumandras_economy/kumandra-icon.jpg";
import KE_BANNER from "../../assets/kumandras_economy/banner.svg";

const pageStyles = `
  .ke-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .ke-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes ke-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .ke-float { animation: ke-float 4s ease-in-out infinite; }
  @keyframes ke-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .ke-blink { animation: ke-blink 1.4s steps(2, end) infinite; }
`;

function KumandrasEconomyPage() {
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const resource = useSpigetResource(
    PluginInformation.spigotResourceId,
    KUMANDRA_FALLBACK,
  );

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    // Kept in step with the <title> in kumandras-economy.html, so a crawler
    // that renders the page does not see a different title to the served one.
    document.title = "Kumandra's Economy | Free Minecraft economy plugin";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = KE_LOGO;
  }, []);

  const closeWindow = () => setSubcontent("none");

  const subContent = () => {
    switch (subcontent) {
      case "balance":
        return <KE_Balance />;
      case "exchange":
        return <KE_Exchange />;
      case "trading":
        return <KE_Trading />;
      case "delivery":
        return <KE_Delivery />;
      case "jobs":
        return <KE_Jobs />;
      case "quests":
        return <KE_Quests />;
      case "shops":
        return <KE_Shops />;
      case "database":
        return <KE_Database />;
      case "api":
        return <KE_API />;
      case "settings":
        return <KE_Settings />;
      case "support":
        return <KE_Support />;
      case "bug report":
        return <KE_BugReport />;
      case "change logs":
        return <KE_ChangeLogs />;
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
        accent="emerald"
        icon="fa-solid fa-coins"
      >
        {subContent()}
      </WindowWrap>
    );
  };

  const latestRelease = Kumandra_Logs.find((log) => log.release_date);
  const inDevelopment = Kumandra_Logs.find((log) => !log.release_date);

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
          style={{ backgroundImage: `url(${KE_BANNER})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.78)_60%,rgba(14,16,20,1)_100%)]" />
        <div className="ke-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={KE_LOGO}
            alt="Kumandra's Economy logo"
            className="ke-float mx-auto h-16 w-16 rounded-lg object-cover md:h-24 md:w-24 drop-shadow-[0_0_25px_rgba(52,211,153,0.55)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-emerald-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="ke-blink h-2 w-2 bg-emerald-400"></span>
            <span className="pixel-font text-[8px] md:text-[10px] tracking-widest text-emerald-300">
              FREE PLUGIN, NO PREMIUM BUILD
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-emerald-400 md:text-[2.4em] [text-shadow:0_0_24px_rgba(52,211,153,0.55),4px_4px_0_rgba(0,0,0,0.85)]">
            {PluginInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            {PluginInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-teal-300 hover:text-teal-200"
              href={PluginInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {PluginInformation.author}
            </a>
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-emerald-400/70 bg-emerald-500/15 py-3 text-[10px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:bg-emerald-500/30 hover:border-emerald-300 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(PluginInformation.downloadLink)}
            >
              <i className="fa-solid fa-download pr-2"></i>
              DOWNLOAD FREE
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:bg-[rgba(255,255,255,0.08)] md:w-auto md:px-6 md:text-xs"
              onClick={() => setSubcontent("support")}
            >
              <i className="fa-solid fa-heart pr-2"></i>
              SUPPORT DEV
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-coins"
              value="Kd"
              label="Currency"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-helmet-safety"
              value={Jobs.length}
              label="Jobs"
              accent="emerald"
            />
            <StatChip
              icon="fa-solid fa-truck-fast"
              value={PluginInformation.deliveryTierCount}
              label="Speeds"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-terminal"
              value={CommandList.length}
              label="Commands"
              accent="teal"
            />
            <StatChip
              icon="fa-solid fa-download"
              value={formatDownloads(resource.downloads)}
              label="Downloads"
              accent="emerald"
            />
            <StatChip
              icon="fa-solid fa-cube"
              value={PluginInformation.supportedVersions}
              label="Supported"
              accent="amber"
            />
          </div>
        </div>
      </header>

      {/* --------------------------------------------- WHERE THIS BUILD STANDS */}
      <section className="ke-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                    LEGACY BUILD
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    released {PluginInformation.versionReleaseDate}
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                  {PluginInformation.legacy.headline}
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  {PluginInformation.legacy.body}
                </p>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-amber-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 md:w-auto md:text-[10px]"
                  onClick={() => setSubcontent("change logs")}
                >
                  <i className="fa-solid fa-clipboard-list pr-2"></i>
                  READ THE HISTORY
                </button>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ---------------------------------------------------- WHAT IS COMING */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-road"
            title="What is coming"
            subtitle="1.7 is not the end of it. Here is what is being worked on."
            accent="emerald"
          />

          <Panel accent="emerald" className="mt-6 p-5">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                  The headline is version support. Everything else on the list
                  is written down here on purpose, because a plugin that tells
                  you where it is thin is worth more than one that pretends it
                  has no rough edges.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-cube"
                    value={PluginInformation.legacy.plannedSupport}
                    label="Planned"
                    accent="emerald"
                  />
                  <StatChip
                    icon="fa-solid fa-list-check"
                    value={PluginInformation.roadmap.length}
                    label="On the list"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-tag"
                    value="Free"
                    label="Still"
                    accent="teal"
                  />
                </div>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-emerald-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 md:w-auto md:text-[10px]"
                  onClick={() => setShowRoadmap((shown) => !shown)}
                  aria-expanded={showRoadmap}
                  aria-controls="ke-roadmap"
                >
                  <i
                    className={`fa-solid pr-2 ${
                      showRoadmap ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                  {showRoadmap ? "HIDE THE LIST" : "SEE THE LIST"}
                </button>
              </div>
            </div>
          </Panel>

          {showRoadmap && (
            <div id="ke-roadmap">
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {PluginInformation.roadmap.map((item) => (
                  <Panel key={item.title} accent={item.accent} className="p-5">
                    <div className="flex place-items-center gap-3">
                      <IconBadge icon={item.icon} accent={item.accent} />
                      <p className="pixel-font text-[10px] tracking-wide text-slate-200 md:text-xs">
                        {item.title}
                      </p>
                    </div>
                    <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                      {item.body}
                    </p>
                  </Panel>
                ))}
              </div>

              <div className="pt-6">
                <Note accent="amber" icon="fa-solid fa-calendar-xmark">
                  There are no dates on any of this, on purpose. It is a free
                  plugin worked on between other projects, and a roadmap with
                  invented deadlines on it would be worth less than one without.
                </Note>
              </div>

              <div className="flex flex-col place-items-center justify-center gap-3 pt-6 md:flex-row">
                <button
                  className="pixel-font w-full rounded-none border-2 border-emerald-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 md:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("support")}
                >
                  <i className="fa-solid fa-heart pr-2"></i>
                  HELP IT ALONG
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-slate-500/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-300 md:w-auto md:text-[11px]"
                  onClick={() => setShowRoadmap(false)}
                >
                  <i className="fa-solid fa-chevron-up pr-2"></i>
                  MINIMIZE
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section className="w-full py-6">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-book-open"
            title="About the plugin"
            subtitle={PluginInformation.tagline}
            accent="teal"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-emerald-300">
                    FREE, FULLY
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    No premium build, no locked features, no player cap. What
                    you download is all of it.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-amber-300">
                    NO NMS
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Plain Spigot API. No packet work, no reflection into server
                    internals, nothing that breaks on a patch.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-sky-300">
                    ONE DEPENDENCY
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Vault, and that is it. Everything else is optional and
                    detected if it happens to be there.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-teal-300">
                    YOUR CALL
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Main currency or second currency, flat files or MySQL. Both
                    are one line each.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Panel accent="emerald" className="p-5">
                  <p className="pixel-font text-[9px] tracking-widest text-emerald-300">
                    EVERYTHING IN THE JAR
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Features.map((feature) => (
                      <button
                        key={feature.key}
                        className="border border-slate-700/70 bg-[rgba(0,0,0,0.35)] px-2 py-2 text-left text-[10px] text-slate-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-200 md:text-xs"
                        onClick={() => setSubcontent(feature.key)}
                      >
                        <i className={`${feature.icon} pr-2 text-[9px]`}></i>
                        {feature.title}
                      </button>
                    ))}
                  </div>
                </Panel>
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

      {/* -------------------------------------------------------- FEATURES */}
      <section className="ke-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-coins"
            title="Plugin features"
            subtitle="Nine systems, all in the free download. Pick a panel to see what is inside."
            accent="emerald"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in Kumandra's Economy`}
                description={feature.description}
                buttonIcon={feature.icon}
                buttonLabel={feature.button}
                onClick={() => setSubcontent(feature.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ GET STARTED */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-download"
            title="Get it on your server"
            subtitle="Free, and about two minutes of work."
            accent="amber"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ActionCard
              accent="emerald"
              icon="fa-solid fa-download"
              title="DOWNLOAD"
              description="The full plugin, from the Spigot listing. There is no other version to compare it against."
              buttonIcon="fa-solid fa-download"
              buttonLabel="Download"
              hint={`v${PluginInformation.version}, ${formatDownloads(resource.downloads)} downloads`}
              onClick={() => RedirectTo(PluginInformation.downloadLink)}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-comments"
              title="ASK FIRST"
              description="Questions about setup, compatibility or whether it suits your server go on the Spigot discussion page."
              buttonIcon="fa-solid fa-comments"
              buttonLabel="Discussion"
              hint="Spigot"
              onClick={() => RedirectTo(PluginInformation.discussionLink)}
            />
            <ActionCard
              accent="rose"
              icon="fa-solid fa-hand-holding-heart"
              title="SUPPORT DEV"
              description="Nothing to buy here. If the plugin earns your server money, this is how you can send some back."
              buttonIcon="fa-solid fa-heart"
              buttonLabel="Support"
              hint="Thank you"
              onClick={() => setSubcontent("support")}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- REQUIREMENTS */}
      <section className="ke-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-server"
            title="Server requirements"
            subtitle={`Spigot and Paper, ${PluginInformation.supportedVersions}, plus Vault.`}
            accent="sky"
          />
          <Terminal
            title="KumandrasEconomy / server-check.log"
            className="mt-6"
          >
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                <TerminalLabel accent="emerald">
                  [SUPPORTED SERVER SOFTWARE]
                </TerminalLabel>
                {`
- SPIGOT [1.16 - 1.19]
- PAPER  [1.16 - 1.19]

api-version: 1.16
Java 16+ compatible server runtime.

Newer Minecraft versions are not supported by this
build. The port is on the roadmap above.
                `}
                <TerminalLabel accent="emerald">[DEPENDENCIES]</TerminalLabel>
                {`
REQUIRED
- Vault

OPTIONAL, detected if present
- EssentialsX, CraftConomy3, GemsEconomy
- CustomEnchantments

That is the whole list. No database server is
required unless you choose to turn MySQL on.
                `}
              </code>
            </pre>
          </Terminal>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
              Check your server version before you download. This build targets{" "}
              {PluginInformation.supportedVersions}, and on anything newer it
              will not load cleanly.
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
            subtitle={`${CommandList.length} commands, with tab completion. Admin only ones are marked.`}
            accent="emerald"
          />
          {!showCommand ? (
            <div className="pt-6 text-center">
              <button
                className="pixel-font rounded-none border-2 border-emerald-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 md:text-[11px]"
                onClick={() => setShowCommand(true)}
              >
                <i className="fa-solid fa-chevron-down pr-2"></i>
                SHOW COMMANDS
              </button>
            </div>
          ) : (
            <div className="pt-6">
              <Panel accent="emerald" className="overflow-x-auto p-3 md:p-4">
                <KE_CommandTableComponent />
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
            The nodes below are declared in the plugin&apos;s own plugin.yml, so
            any permissions plugin can read them. You only need to touch them if
            you want to hand shop building or balance editing to staff who are
            not opped.
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
      <section className="ke-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release history"
            subtitle="From the first commit in August 2021 to the build on the listing today."
            accent="teal"
          />
          <div className="mt-6 space-y-3">
            {inDevelopment && (
              <Changelog
                key="in-development"
                log={inDevelopment}
                accent="emerald"
              />
            )}
            {latestRelease && (
              <Changelog
                key={latestRelease.update_version}
                log={latestRelease}
                isLatest
                accent="emerald"
              />
            )}
          </div>
          <div className="pt-5 text-center">
            <button
              className="pixel-font rounded-none border-2 border-teal-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-teal-200 transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-500/20 md:text-[11px]"
              onClick={() => setSubcontent("change logs")}
            >
              <i className="fa-solid fa-clock-rotate-left pr-2"></i>
              SEE EVERY RELEASE
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
            subtitle="Something broken, something unclear, or something you want to build on?"
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ActionCard
              accent="rose"
              icon="fa-solid fa-bug"
              title="REPORT BUGS"
              description="The known rough edges are already public. Tell us about the one that is not."
              buttonIcon="fa-solid fa-bug"
              buttonLabel="Report"
              onClick={() => setSubcontent("bug report")}
            />
            <ActionCard
              accent="teal"
              icon="fa-solid fa-clipboard-list"
              title="RELEASE HISTORY"
              description={`Every version back to 2021. Latest is v${PluginInformation.version} from ${PluginInformation.versionReleaseDate}.`}
              buttonIcon="fa-solid fa-clipboard-list"
              buttonLabel="History"
              onClick={() => setSubcontent("change logs")}
            />
            <ActionCard
              accent="emerald"
              icon="fa-solid fa-gears"
              title="SETTINGS"
              description="Every key in config.yml and Database.yml, grouped and explained."
              buttonIcon="fa-solid fa-gears"
              buttonLabel="Settings"
              onClick={() => setSubcontent("settings")}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-code"
              title="DEVELOPER API"
              description="Read and move balances from your own plugin, in about five lines."
              buttonIcon="fa-solid fa-code"
              buttonLabel="API"
              onClick={() => setSubcontent("api")}
            />
          </div>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <PageFooter />
    </div>
  );
}

export default KumandrasEconomyPage;
