import { PluginInformation as CE3Info } from "../contants/custom_enchants_3/CE3Constants";
import {
  formatDownloads,
  KUMANDRA_FALLBACK,
  KUMANDRA_RESOURCE,
  useSpigetDownloads,
  useSpigetResource,
} from "../utils/useSpigetDownloads";
import PageFooter from "../page_components/PageFooter";
import {
  ActionCard,
  Chip,
  Panel,
  PixelButton,
  SectionHeading,
  StatChip,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";

const pageStyles = `
  .jh-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .jh-grid {
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes jh-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .jh-float { animation: jh-float 4s ease-in-out infinite; }
  @keyframes jh-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .jh-blink { animation: jh-blink 1.4s steps(2, end) infinite; }
`;

/** The two live projects. Downloads are filled in from the Spiget hooks below. */
const PROJECTS = [
  {
    key: "ce3",
    icon: "fa-solid fa-wand-magic-sparkles",
    title: "Custom Enchantments 3",
    badge: `${CE3Info.currency_symbol}${CE3Info.price}`,
    description:
      "134 enchantments, 134 treasures, three classes and a real player-driven economy. One-time payment, updates for life.",
    accent: "lime",
    href: "/customenchantments3",
  },
  {
    key: "ke",
    icon: "fa-solid fa-coins",
    title: "Kumandra's Economy",
    badge: "FREE",
    description:
      "A whole server economy in one free jar. Jobs, trading, delivery, shops and quests, no premium tier.",
    accent: "emerald",
    href: "/kumandras-economy",
  },
];

/** A handful of the public repos behind these projects. Not the full list. */
const OPEN_SOURCE_REPOS = [
  {
    name: "Custom Enchantments 2",
    url: "https://github.com/JnH-Projects/Custom-Enchantments-2",
  },
  {
    name: "2dgraphic-utils",
    url: "https://github.com/JnH-Projects/2dgraphic-utils",
  },
  {
    name: "multiplayer-poc",
    url: "https://github.com/JnH-Projects/multiplayer-poc",
  },
  { name: "PixelGame", url: "https://github.com/JnH-Projects/PixelGame" },
  {
    name: "More Foods & Crops Addon",
    url: "https://github.com/JnH-Projects/More-Foods-Crops-Minecraft-Addon",
  },
  {
    name: "Strawberry Crop Addon",
    url: "https://github.com/JnH-Projects/Strawberry-Crop-Minecraft-Addon",
  },
];

const GITHUB_ORG_URL = "https://github.com/orgs/JnH-Projects/repositories";

function HomePage() {
  const ce3Downloads = useSpigetDownloads();
  const keResource = useSpigetResource(KUMANDRA_RESOURCE, KUMANDRA_FALLBACK);

  const downloadsByProject = {
    ce3: ce3Downloads.premium + ce3Downloads.lite,
    ke: keResource.downloads,
  };
  const totalDownloads = downloadsByProject.ce3 + downloadsByProject.ke;

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0e1014]">
      <style>{pageStyles}</style>

      {/* ---------------------------------------------------------- HERO */}
      <header className="relative flex min-h-[560px] w-full place-items-center justify-center overflow-hidden md:min-h-[640px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(0,0,0,0.85)_55%,rgba(14,16,20,1)_100%)]" />
        <div className="jh-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="jh-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src="/jh-logo.png"
            alt="JHProjects logo"
            className="jh-float mx-auto h-16 w-16 rounded-xl md:h-24 md:w-24 drop-shadow-[0_0_25px_rgba(56,189,248,0.55)]"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-sky-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="jh-blink h-2 w-2 bg-sky-400"></span>
            <span className="pixel-font text-[8px] md:text-[10px] tracking-widest text-sky-300">
              {PROJECTS.length} PROJECTS LIVE, MORE IN THE OVEN
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.5em] leading-relaxed font-bold text-sky-400 md:text-[3em] [text-shadow:0_0_24px_rgba(56,189,248,0.55),4px_4px_0_rgba(0,0,0,0.85)]">
            JHProjects
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 md:text-lg [text-shadow:2px_2px_0_rgba(0,0,0,0.9)]">
            One developer. No committee. Just shipped.
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-purple-300 hover:text-purple-200"
              href="https://jayharronabejar.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              JayMar921
            </a>
          </p>
          <p className="mx-auto max-w-xl pt-5 text-xs leading-relaxed text-slate-400 md:text-sm">
            JHProjects is the studio name behind JayMar921&apos;s side
            projects. Minecraft plugins, tools and games built after hours,
            some free, some paid, always finished.
          </p>

          <div className="mt-8 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <a
              href="#projects"
              className="pixel-font inline-flex w-full max-w-[260px] place-items-center justify-center gap-2 rounded-none border-2 border-sky-400/70 bg-sky-500/15 py-3 text-[10px] tracking-widest text-sky-200 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-500/30 md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-layer-group"></i>
              EXPLORE PROJECTS
            </a>
            <a
              href="/donation"
              className="pixel-font inline-flex w-full max-w-[260px] place-items-center justify-center gap-2 rounded-none border-2 border-rose-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-rose-200 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-[rgba(255,255,255,0.05)] md:w-auto md:px-6 md:text-xs"
            >
              <i className="fa-solid fa-heart"></i>
              SUPPORT THE WORK
            </a>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-cubes"
              value={PROJECTS.length}
              label="Live Projects"
              accent="sky"
            />
            <StatChip
              icon="fa-solid fa-download"
              value={formatDownloads(totalDownloads)}
              label="Downloads"
              accent="lime"
            />
            <StatChip
              icon="fa-solid fa-code-branch"
              value={OPEN_SOURCE_REPOS.length}
              label="Open Source"
              accent="purple"
            />
            <StatChip
              icon="fa-solid fa-user-astronaut"
              value="Solo"
              label="Developer"
              accent="amber"
            />
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- WHOAMI */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Terminal title="JHProjects / whoami">
            <pre>
              <code className="text-[10px] md:text-sm">
                <TerminalLabel accent="sky">$ whoami</TerminalLabel>
                {`
JayMar921 -- indie developer, one-person studio
`}
                <TerminalLabel accent="lime">$ ls ./projects</TerminalLabel>
                {`
customenchantments3/   [PREMIUM]  v${CE3Info.version}
kumandras-economy/     [FREE]     live
`}
                <TerminalLabel accent="amber">$ cat ./mission.txt</TerminalLabel>
                {`
Ship small, ship real, ship solo.
`}
              </code>
            </pre>
          </Terminal>
        </div>
      </section>

      {/* ------------------------------------------------------- PROJECTS */}
      <section id="projects" className="jh-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-layer-group"
            title="Featured Projects"
            subtitle="Two live projects. Pick one to see what it does."
            accent="sky"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ActionCard
                key={project.key}
                accent={project.accent}
                icon={project.icon}
                title={project.title}
                badge={project.badge}
                description={project.description}
                buttonIcon="fa-solid fa-arrow-right"
                buttonLabel="Visit Project"
                hint={`${formatDownloads(downloadsByProject[project.key])} downloads`}
                onClick={() => (window.location.href = project.href)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- OPEN SOURCE */}
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-code-branch"
            title="Open Source"
            subtitle="A handful of the repos behind these projects, out in the open."
            accent="purple"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {OPEN_SOURCE_REPOS.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-75"
              >
                <Chip accent="purple">
                  <i className="fa-brands fa-github pr-2"></i>
                  {repo.name}
                </Chip>
              </a>
            ))}
          </div>
          <div className="pt-6">
            <PixelButton
              as="a"
              href={GITHUB_ORG_URL}
              icon="fa-brands fa-github"
              accent="purple"
            >
              VIEW ALL REPOSITORIES
            </PixelButton>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- SUPPORT */}
      <section className="w-full py-12">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="rose" className="p-6 text-center md:p-8">
            <SectionHeading
              icon="fa-solid fa-heart"
              title="Support the work"
              subtitle="Side projects run on coffee, spare time and the odd donation. It keeps the updates coming."
              accent="rose"
              align="center"
            />
            <div className="mt-6 flex justify-center">
              <PixelButton
                icon="fa-solid fa-mug-hot"
                accent="rose"
                onClick={() => (window.location.href = "/donation")}
              >
                DONATE
              </PixelButton>
            </div>
          </Panel>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

export default HomePage;
