import { useEffect } from "react";
import {
  Features,
  ProjectInformation,
} from "../contants/projects/MoreFoodsConstants";
import PageFooter from "../page_components/PageFooter";
import {
  ActionCard,
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  SectionHeading,
  Shot,
  StatChip,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackedRedirect,
  usePageView,
} from "../../lib/analytics";

/**
 * The More Foods & Crops page.
 *
 * Shortest page on the site, on purpose. The addon is unfinished and parked,
 * so there is no feature list to pad out and no download to push. Lime and
 * amber, because it is a farming addon and because that keeps it visually
 * apart from the two Java plugins.
 */
const pageStyles = `
  .mf-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .mf-grid {
    background-image:
      linear-gradient(rgba(163, 230, 53, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(163, 230, 53, 0.07) 1px, transparent 1px);
    background-size: 42px 42px;
  }
  @keyframes mf-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .mf-float { animation: mf-float 4s ease-in-out infinite; }
  @keyframes mf-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .mf-blink { animation: mf-blink 1.4s steps(2, end) infinite; }
`;

function MoreFoodsPage() {
  usePageView(PROJECTS.MORE_FOODS);
  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    document.title = "More Foods & Crops | Unfinished Minecraft Bedrock addon";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = ProjectInformation.icon;
  }, []);

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.14)_0%,rgba(0,0,0,0.85)_55%,rgba(14,16,20,1)_100%)]" />
        <div className="mf-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="mf-scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e1014] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={ProjectInformation.icon}
            alt="More Foods and Crops logo"
            className="mf-float mx-auto h-16 w-16 rounded-lg object-cover drop-shadow-[0_0_25px_rgba(163,230,53,0.5)] md:h-24 md:w-24"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-amber-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="mf-blink h-2 w-2 bg-amber-400"></span>
            <span className="pixel-font text-[8px] tracking-widest text-amber-300 md:text-[10px]">
              {ProjectInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-lime-400 [text-shadow:0_0_24px_rgba(163,230,53,0.5),4px_4px_0_rgba(0,0,0,0.85)] md:text-[2.4em]">
            {ProjectInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-amber-400 [text-shadow:2px_2px_0_rgba(0,0,0,0.9)] md:text-lg">
            {ProjectInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-lime-300 hover:text-lime-200"
              href={ProjectInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {ProjectInformation.author}
            </a>{" "}
            and MikaPiaChu921
          </p>

          <div className="mt-8 flex justify-center">
            <button
              className="pixel-font w-full max-w-[280px] rounded-none border-2 border-lime-400/70 bg-lime-500/15 py-3 text-[10px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/30 md:w-auto md:px-6 md:text-xs"
              onClick={trackedRedirect(PROJECTS.MORE_FOODS, {
                action: CLICK_ACTIONS.SOURCE,
                label: "TAKE THE SOURCE",
                target: ProjectInformation.repoLink,
              })}
            >
              <i className="fa-brands fa-github pr-2"></i>
              TAKE THE SOURCE
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            <StatChip
              icon="fa-solid fa-cube"
              value="Bedrock"
              label="Platform"
              accent="lime"
            />
            <StatChip
              icon="fa-solid fa-code-branch"
              value="1.20.80"
              label="Targets"
              accent="emerald"
            />
            <StatChip
              icon="fa-solid fa-circle-pause"
              value="Parked"
              label="Status"
              accent="amber"
            />
            <StatChip
              icon="fa-solid fa-user-group"
              value="2"
              label="Built by"
              accent="rose"
            />
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------- THE STATUS */}
      <section className="mf-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="amber" className="p-5 md:p-6">
            <div className="flex flex-wrap place-items-center gap-2">
              <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[8px] tracking-widest text-amber-300">
                <i className="fa-solid fa-circle-pause pr-1"></i>
                UNFINISHED
              </span>
              <span className="text-[10px] text-slate-500 md:text-xs">
                {ProjectInformation.kind}
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
            icon="fa-solid fa-seedling"
            title="What it does"
            subtitle={ProjectInformation.tagline}
            accent="lime"
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
              <Terminal title="More Foods & Crops / manifest">
                <pre>
                  <code className="text-[10px] md:text-sm" lang="md">
                    <TerminalLabel accent="lime">[TARGET]</TerminalLabel>
                    {`
platform : Minecraft Bedrock
version  : 1.20.80
type     : behaviour + resource pack
scope    : single player and Bedrock realms
                    `}
                    <TerminalLabel accent="amber">[STATUS]</TerminalLabel>
                    {`
state    : playable, incomplete
plans    : none
source   : public on GitHub
licence  : take it and go
                    `}
                  </code>
                </pre>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section className="mf-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-wheat-awn"
            title="What got built"
            subtitle="Two panels, which is honestly the size of it."
            accent="lime"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in More Foods and Crops`}
                description={feature.description}
                buttonIcon="fa-brands fa-github"
                buttonLabel="Repository"
                onClick={trackedRedirect(PROJECTS.MORE_FOODS, {
                  action: CLICK_ACTIONS.SOURCE,
                  label: "Repository",
                  target: ProjectInformation.repoLink,
                })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- THE TWO OF US */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-user-group"
            title="Who built it"
            subtitle="Two people, which is why the art looks like a set rather than a pile."
            accent="rose"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {ProjectInformation.contributors.map((person) => (
              <Panel key={person.name} accent={person.accent} className="p-5">
                <div className="flex place-items-center gap-4">
                  <img
                    src={person.avatar}
                    alt={`${person.name} avatar`}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-md border border-slate-700/70 object-cover"
                  />
                  <div>
                    <SubHeading accent={person.accent}>
                      {person.name}
                    </SubHeading>
                    <p className="pt-2 text-[11px] text-slate-400 md:text-xs">
                      {person.role}
                    </p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ TAKE IT ON */}
      <section className="mf-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="lime" className="p-6 md:p-8">
            <SectionHeading
              icon="fa-solid fa-code-fork"
              title="Want to take it further?"
              subtitle="Genuinely, go ahead. Nothing here is waiting on permission."
              accent="lime"
            />
            <Body className="pt-4">
              The repository is public and it is not going anywhere. Fork it,
              finish it, rename it, or lift one crop out of it for something
              else you are building. What you will not get is support, a
              roadmap, or a reply to a bug report, because this one is done
              being worked on.
            </Body>
            <Bullets className="pt-4">
              <Bullet accent="lime">
                It is a Bedrock addon, so it goes into a world&apos;s behaviour
                and resource packs, not a plugins folder.
              </Bullet>
              <Bullet accent="lime">
                It targets <Cmd accent="lime">1.20.80</Cmd>. Newer Bedrock
                releases have not been tested against it.
              </Bullet>
              <Bullet accent="lime">
                The art was made for it, so if you fork it, credit
                MikaPiaChu921 for that part.
              </Bullet>
            </Bullets>
            <div className="mt-6">
              <button
                className="pixel-font w-full rounded-none border-2 border-lime-400/70 bg-lime-500/15 py-3 text-[10px] tracking-widest text-lime-200 transition-all hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-500/30 md:w-auto md:px-6 md:text-xs"
                onClick={trackedRedirect(PROJECTS.MORE_FOODS, {
                  action: CLICK_ACTIONS.SOURCE,
                  label: "OPEN THE REPOSITORY",
                  target: ProjectInformation.repoLink,
                })}
              >
                <i className="fa-brands fa-github pr-2"></i>
                OPEN THE REPOSITORY
              </button>
            </div>
          </Panel>
          <div className="pt-5">
            <Shot
              src={Features[1].image}
              alt="Where More Foods and Crops stopped, and what you are free to do with it"
              accent="amber"
              caption="Parked, public, and fine to be taken somewhere else"
            />
          </div>
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-circle-info">
              This page exists so the work is on the record. It is not a
              download page and there is no install guide, because finishing the
              addon is left to whoever wants it.
            </Note>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

export default MoreFoodsPage;
