import { useEffect, useState } from "react";
import {
  CommandList,
  Features,
  Jobs,
  Permissions,
  PluginInformation,
} from "../contants/kumandra/KumandraConstants";
import { Kumandra_Logs } from "../contants/kumandra/KumandraConstants_Logs";
import {
  formatDownloads,
  KUMANDRA_FALLBACK,
  useSpigetResource,
} from "../utils/useSpigetDownloads";
import WindowWrap from "../modals/windowWrap";
import PageFooter from "../page_components/PageFooter";
import KE_CommandTableComponent from "../page_components/KE_CommandTableComponent";
import Changelog from "../page_components/Changelog";
import KE_WhatsNew from "./kumandra_subcontent/KE_WhatsNew";
import KE_Movements from "./kumandra_subcontent/KE_Movements";
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
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackedRedirect,
  usePageView,
} from "../../lib/analytics";

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
  usePageView(PROJECTS.KUMANDRA);
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
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
      case "whats new":
        return <KE_WhatsNew />;
      case "movements":
        return <KE_Movements />;
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
              onClick={trackedRedirect(PROJECTS.KUMANDRA, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "DOWNLOAD FREE",
                target: PluginInformation.downloadLink,
              })}
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

      {/* ------------------------------------------------ WHAT IS NEW IN 2.1 */}
      {/*
        2.0 had a release banner and a separate "what is new" section, one after
        the other, saying much the same thing twice. They are one section now:
        the banner is the summary, and the list sits behind the toggle for the
        people who want it.
      */}
      <section className="ke-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="lg:flex lg:place-items-center lg:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-rose-400/60 bg-rose-500/15 px-2 py-1 text-[8px] tracking-widest text-rose-300">
                    JUST RELEASED
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{PluginInformation.version}
                  </span>
                  <span className="text-[10px] text-slate-500 md:text-xs">
                    released {PluginInformation.versionReleaseDate}
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-amber-300 md:text-xs">
                  {PluginInformation.release.headline}
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  {PluginInformation.release.body}
                </p>
                <p className="pt-3 text-[11px] leading-relaxed text-emerald-300/90 md:text-xs">
                  <i className="fa-solid fa-arrow-up-right-dots pr-2"></i>
                  {PluginInformation.release.upgrade}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <StatChip
                    icon="fa-solid fa-wallet"
                    value="2"
                    label="Wallets"
                    accent="amber"
                  />
                  <StatChip
                    icon="fa-solid fa-list-ul"
                    value="6"
                    label="Movements"
                    accent="emerald"
                  />
                  <StatChip
                    icon="fa-solid fa-code"
                    value="v2"
                    label="API"
                    accent="sky"
                  />
                  <StatChip
                    icon="fa-solid fa-gears"
                    value="None"
                    label="Config change"
                    accent="teal"
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 pt-5 lg:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-emerald-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 lg:w-auto lg:text-[10px]"
                  onClick={() => setShowWhatsNew((shown) => !shown)}
                  aria-expanded={showWhatsNew}
                  aria-controls="ke-whats-new"
                >
                  <i
                    className={`fa-solid pr-2 ${
                      showWhatsNew ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  ></i>
                  {showWhatsNew ? "HIDE THE LIST" : "SEE THE LIST"}
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-amber-400/50 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-amber-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/20 lg:w-auto lg:text-[10px]"
                  onClick={() => setSubcontent("whats new")}
                >
                  <i className="fa-solid fa-rocket pr-2"></i>
                  WHAT CHANGED
                </button>
              </div>
            </div>
          </Panel>

          {showWhatsNew && (
            <div id="ke-whats-new">
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {PluginInformation.whatsNew.map((item) => (
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
                <Note accent="amber" icon="fa-solid fa-circle-info">
                  Coming from 1.7 rather than 2.0? 2.0 is the release that
                  matters to you. It fixed a version check that had quietly
                  switched off quests, nether logs and rare catches on every
                  server newer than 1.18, and made Vault optional. The release
                  history has all of it.
                </Note>
              </div>

              <div className="flex flex-col place-items-center justify-center gap-3 pt-6 md:flex-row">
                <button
                  className="pixel-font w-full rounded-none border-2 border-emerald-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 md:w-auto md:text-[11px]"
                  onClick={() => setSubcontent("movements")}
                >
                  <i className="fa-solid fa-list-ul pr-2"></i>
                  SEE THE MOVEMENT LIST
                </button>
                <button
                  className="pixel-font w-full rounded-none border-2 border-slate-500/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-slate-300 transition-all hover:-translate-y-0.5 hover:border-slate-300 md:w-auto md:text-[11px]"
                  onClick={() => setShowWhatsNew(false)}
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
          {/*
            The four traits used to sit in a column beside the prose, with a
            duplicate of the feature grid under them. The duplicate is gone, so
            the column is gone with it: traits across the top, prose underneath.
          */}
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <p className="pixel-font text-[9px] tracking-widest text-emerald-300">
                  FREE, FULLY
                </p>
                <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                  No premium build, no locked features, no player cap. What you
                  download is all of it.
                </p>
              </div>
              <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <p className="pixel-font text-[9px] tracking-widest text-amber-300">
                  NO NMS
                </p>
                <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                  Plain Spigot API. No packet work, no reflection into server
                  internals, which is what makes one jar cover ten years of
                  Minecraft.
                </p>
              </div>
              <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <p className="pixel-font text-[9px] tracking-widest text-sky-300">
                  NO DEPENDENCIES
                </p>
                <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                  Vault became optional in 2.0. Everything else, Custom
                  Enchantments 3 included, is detected if it happens to be there
                  and shrugged off if it is not.
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

            <div className="pt-6 lg:columns-2 lg:gap-8">
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
            subtitle={`${Features.length} panels, all in the free download. Pick one to see what is inside.`}
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
              description="The full plugin, from the Spigot listing. One jar, and it works out which server it landed on by itself."
              buttonIcon="fa-solid fa-download"
              buttonLabel="Download"
              hint={`v${PluginInformation.version}, ${formatDownloads(resource.downloads)} downloads`}
              onClick={trackedRedirect(PROJECTS.KUMANDRA, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "Download",
                target: PluginInformation.downloadLink,
              })}
            />
            <ActionCard
              accent="sky"
              icon="fa-solid fa-comments"
              title="ASK FIRST"
              description="Questions about setup, compatibility or whether it suits your server go on the Spigot discussion page."
              buttonIcon="fa-solid fa-comments"
              buttonLabel="Discussion"
              hint="Spigot"
              onClick={trackedRedirect(PROJECTS.KUMANDRA, {
                action: CLICK_ACTIONS.EXTERNAL,
                label: "Spigot discussion",
                target: PluginInformation.discussionLink,
              })}
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
            subtitle={`Spigot and Paper, ${PluginInformation.supportedVersions}, and nothing else required.`}
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
- SPIGOT [1.16 - 26.2]
- PAPER  [1.16 - 26.2]

api-version: 1.16
Java 8 and up, so a 1.16 server on Java 8 and a
26.2 server on Java 25 both load the same file.

Version detection parses the numbers, so a release
that did not exist when this jar was built is still
read correctly as newer than 1.16.
                `}
                <TerminalLabel accent="emerald">[DEPENDENCIES]</TerminalLabel>
                {`
REQUIRED
- nothing

OPTIONAL, detected if present
- Vault, for cross-economy exchange and for
  registering as the server's Vault economy
- EssentialsX, CraftConomy3, GemsEconomy
- Custom Enchantments 3, which unlocks the
  bundled CE quest pack, puts its balance on
  the balance screen and enables /kumandra
  convert
- MySQL, off by default, driver already bundled

Quests need Minecraft 1.17 or newer. Everything
else runs on the whole supported range.
                `}
              </code>
            </pre>
          </Terminal>
          <div className="pt-5">
            <Note accent="emerald" icon="fa-solid fa-circle-check">
              Tested on Spigot 26.2 in four setups: standalone with no other
              plugins, with Vault and no other economy, with Vault and Kumandra
              registered as the primary economy, and with Custom Enchantments 3
              1.6.0 installed. The same sources are compile-verified against the
              1.16.5 API on every release build, so the bottom of the range
              cannot quietly break either.
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
            subtitle={`From the first commit in August 2021 to ${PluginInformation.version}, on the listing today.`}
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
              description="Fill in the form and it goes straight to the developer's inbox."
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
              description="Read and move balances from your own plugin, in about five lines. Attributed since 2.1."
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
