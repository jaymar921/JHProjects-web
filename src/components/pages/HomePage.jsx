import { PluginInformation as CE3Info } from "../contants/custom_enchants_3/CE3Constants";
import { PluginInformation as WarpsInfo } from "../contants/legacy/CustomWarpsConstants";
import { PluginInformation as FishingInfo } from "../contants/legacy/FishingContestConstants";
import { ProjectInformation as GraphicsInfo } from "../contants/projects/GraphicsUtilsConstants";
import { ProjectInformation as CE2Info } from "../contants/projects/CustomEnchants2Constants";
import { ProjectInformation as FoodsInfo } from "../contants/projects/MoreFoodsConstants";
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
  .jh-shelf {
    background-image: radial-gradient(
      ellipse at 50% 0%,
      rgba(251, 191, 36, 0.09) 0%,
      transparent 60%
    );
  }
  @keyframes jh-shine {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.85; }
  }
  .jh-shine { animation: jh-shine 3.6s ease-in-out infinite; }
`;

/**
 * The live projects. The two plugins carry a download count from the Spiget
 * hooks below; the library is on npm instead, so it carries its version.
 */
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
      "A whole server economy in one free jar. Jobs, trading, delivery, shops and quests, no premium tier. Version 2.0 covers 1.16 through 26.2.",
    accent: "emerald",
    href: "/kumandras-economy",
  },
  {
    key: "gfx",
    icon: "fa-solid fa-display",
    title: GraphicsInfo.title,
    badge: "NPM",
    description:
      "A canvas, sprites and a render loop you do not have to write. Pan, zoom, animation and Y-sort depth, in one package.",
    accent: "cyan",
    href: "/2dgraphic-utils",
    hint: `v${GraphicsInfo.version} on npm`,
  },
];

/**
 * Finished, or stopped, and kept on the shelf rather than taken down. Each one
 * gets a page that records what it did, why it is not moving any more, and
 * where the source is if there is any.
 */
const ARCHIVE = [
  {
    key: "warps",
    icon: "fa-solid fa-compass",
    title: WarpsInfo.title,
    tagline: WarpsInfo.subtitle,
    years: "Jul - Aug 2021",
    releases: `${WarpsInfo.releaseCount} releases`,
    versions: WarpsInfo.supportedVersions,
    accent: "violet",
    href: "/custom-warps",
    logo: WarpsInfo.icon,
  },
  {
    key: "fishing",
    icon: "fa-solid fa-fish",
    title: FishingInfo.title,
    tagline: FishingInfo.subtitle,
    years: "Apr - Aug 2021",
    releases: `${FishingInfo.releaseCount} releases`,
    versions: FishingInfo.supportedVersions,
    accent: "cyan",
    href: "/fishing-contest",
    logo: FishingInfo.icon,
  },
  {
    key: "ce2",
    icon: "fa-solid fa-wand-sparkles",
    title: CE2Info.title,
    tagline: CE2Info.subtitle,
    years: "2020 - Jul 2022",
    releases: `${CE2Info.enchantCount} enchantments`,
    versions: CE2Info.supportedVersions,
    accent: "purple",
    href: "/custom-enchantments-2",
    logo: CE2Info.icon,
    label: "OPEN SOURCE",
  },
  {
    key: "foods",
    icon: "fa-solid fa-seedling",
    title: FoodsInfo.title,
    tagline: FoodsInfo.subtitle,
    years: "Bedrock addon",
    releases: "Never finished",
    versions: FoodsInfo.supportedVersions,
    accent: "lime",
    href: "/more-foods-and-crops",
    logo: FoodsInfo.icon,
    label: "UNFINISHED",
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
              {PROJECTS.length} LIVE, {ARCHIVE.length} IN THE ARCHIVE
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
            projects. Minecraft plugins, a JavaScript graphics library, addons
            and games, built after hours. Some free, some paid, some finished
            and honest about the ones that are not.
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
              icon="fa-solid fa-trophy"
              value={ARCHIVE.length}
              label="Archived"
              accent="amber"
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
JayMar921, indie developer, one-person studio
`}
                <TerminalLabel accent="lime">$ ls ./projects</TerminalLabel>
                {`
customenchantments3/   [PREMIUM]  v${CE3Info.version}
kumandras-economy/     [FREE]     v2.0, live
2dgraphic-utils/       [NPM]      v${GraphicsInfo.version}, live
custom-enchantments-2/ [FREE]     open source, ended 2022
custom-warps/          [FREE]     archived 2021
fishing-contest/       [FREE]     archived 2021
more-foods-and-crops/  [FREE]     unfinished
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
            subtitle="Still being worked on. Pick one to see what it does."
            accent="sky"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                hint={
                  project.hint ??
                  `${formatDownloads(downloadsByProject[project.key])} downloads`
                }
                onClick={() => (window.location.href = project.href)}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------- ARCHIVE */}
      <section id="archive" className="jh-shelf w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-trophy"
            title="The Archive"
            subtitle="Projects that shipped, or stopped. Kept on the shelf rather than taken down."
            accent="amber"
          />

          <p className="pt-5 text-xs leading-relaxed text-slate-400 md:text-sm">
            Custom Warps and Fishing Contest went out in 2021 and are still
            downloadable on Spigot, though the source for both is gone. Custom
            Enchantments 2 was discontinued while CE3 was being written, and its
            source is public. More Foods &amp; Crops never got finished at all.
            None of the four is maintained, and rather than quietly deleting
            them they each get a page: what they did, where they stopped, and
            where the code is if any of it survived.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {ARCHIVE.map((entry) => (
              <a
                key={entry.key}
                href={entry.href}
                className="group block no-underline"
              >
                <Panel
                  accent={entry.accent}
                  className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-500"
                >
                  <div className="flex place-items-start gap-4">
                    <img
                      src={entry.logo}
                      alt={`${entry.title} icon`}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-md border border-slate-700/70 object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="grow">
                      <div className="flex flex-wrap place-items-center gap-2">
                        <span className="jh-shine pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[7px] tracking-widest text-amber-300 md:text-[8px]">
                          <i className="fa-solid fa-trophy pr-1"></i>
                          {entry.label ?? "ARCHIVED"}
                        </span>
                        <span className="text-[10px] tracking-widest text-slate-500 uppercase">
                          {entry.years}
                        </span>
                      </div>
                      <h4 className="pixel-font pt-3 text-[11px] tracking-wide text-slate-200 md:text-xs">
                        {entry.title}
                      </h4>
                      <p className="pt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                        {entry.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip accent={entry.accent}>
                      <i className="fa-solid fa-clipboard-list pr-2"></i>
                      {entry.releases}
                    </Chip>
                    <Chip accent={entry.accent}>
                      <i className="fa-solid fa-cube pr-2"></i>
                      {entry.versions}
                    </Chip>
                    <Chip accent={entry.accent}>
                      <i className="fa-solid fa-tag pr-2"></i>
                      Free
                    </Chip>
                  </div>

                  <p className="pixel-font pt-5 text-[9px] tracking-widest text-slate-500 transition-colors group-hover:text-slate-300 md:text-[10px]">
                    OPEN THE CASE
                    <i className="fa-solid fa-arrow-right pl-2"></i>
                  </p>
                </Panel>
              </a>
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
