import { useEffect } from "react";
import {
  CanvasApi,
  Features,
  GraphicsUtils_Logs,
  ProjectInformation,
  SpriteTypes,
} from "../contants/projects/GraphicsUtilsConstants";
import { RedirectTo } from "../utils/PageUtility";
import PageFooter from "../page_components/PageFooter";
import {
  ActionCard,
  Body,
  Chip,
  Cmd,
  IconBadge,
  Note,
  Panel,
  SectionHeading,
  Shot,
  StatChip,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../page_components/PixelUIKit";

/**
 * The 2D Graphics Utils page.
 *
 * The two plugin pages run a Minecraft palette because that is what they are.
 * This one is a JavaScript library, so it runs cyan and violet and leans on
 * code blocks and an API table rather than inventory screens. Same kit
 * underneath, different room.
 */
const pageStyles = `
  .gu-scanlines {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0px,
      rgba(0, 0, 0, 0.35) 1px,
      transparent 1px,
      transparent 3px
    );
  }
  .gu-grid {
    background-image:
      linear-gradient(rgba(34, 211, 238, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34, 211, 238, 0.07) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  @keyframes gu-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .gu-float { animation: gu-float 4s ease-in-out infinite; }
  @keyframes gu-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
  .gu-blink { animation: gu-blink 1.4s steps(2, end) infinite; }
`;

function GraphicsUtilsPage() {
  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  useEffect(() => {
    document.title = "2D Graphics Utils | Canvas and sprite library for JS";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = ProjectInformation.icon;
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0b0d11]">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.16)_0%,rgba(0,0,0,0.85)_55%,rgba(11,13,17,1)_100%)]" />
        <div className="gu-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="gu-scanlines pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0d11] to-transparent" />

        <div className="relative z-10 w-[90%] max-w-3xl select-none px-2 py-16 text-center">
          <img
            src={ProjectInformation.icon}
            alt="2D Graphics Utils logo"
            className="gu-float mx-auto h-16 w-16 rounded-lg object-cover drop-shadow-[0_0_25px_rgba(34,211,238,0.55)] md:h-24 md:w-24"
          />

          <div className="mt-6 inline-flex place-items-center gap-2 border border-cyan-400/50 bg-[rgba(0,0,0,0.6)] px-3 py-1">
            <span className="gu-blink h-2 w-2 bg-cyan-400"></span>
            <span className="pixel-font text-[8px] tracking-widest text-cyan-300 md:text-[10px]">
              {ProjectInformation.statusLabel}
            </span>
          </div>

          <h1 className="pixel-font mt-5 text-[1.15em] leading-relaxed font-bold text-cyan-400 [text-shadow:0_0_24px_rgba(34,211,238,0.55),4px_4px_0_rgba(0,0,0,0.85)] md:text-[2.4em]">
            {ProjectInformation.title}
          </h1>
          <p className="pt-3 text-xs font-bold text-violet-300 [text-shadow:2px_2px_0_rgba(0,0,0,0.9)] md:text-lg">
            {ProjectInformation.subtitle}
          </p>
          <p className="pt-2 text-[10px] font-bold text-slate-300 md:text-sm">
            By{" "}
            <a
              className="text-cyan-300 hover:text-cyan-200"
              href={ProjectInformation.authorSocial}
              target="_blank"
              rel="noreferrer"
            >
              {ProjectInformation.author}
            </a>
          </p>

          <div className="mx-auto mt-6 max-w-md border border-slate-700/70 bg-[rgba(0,0,0,0.6)] px-4 py-3">
            <code className="text-[10px] break-all text-cyan-300 md:text-sm">
              {ProjectInformation.installCommand}
            </code>
          </div>

          <div className="mt-7 flex flex-col place-items-center justify-center gap-3 md:flex-row">
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-cyan-400/70 bg-cyan-500/15 py-3 text-[10px] tracking-widest text-cyan-200 transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/30 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(ProjectInformation.demoLink)}
            >
              <i className="fa-solid fa-play pr-2"></i>
              LIVE DEMO
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-violet-400/60 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-violet-200 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-500/20 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(ProjectInformation.repoLink)}
            >
              <i className="fa-brands fa-github pr-2"></i>
              SOURCE
            </button>
            <button
              className="pixel-font w-full max-w-[260px] rounded-none border-2 border-slate-400/50 bg-[rgba(0,0,0,0.6)] py-3 text-[10px] tracking-widest text-slate-200 transition-all hover:-translate-y-0.5 hover:border-slate-200 md:w-auto md:px-6 md:text-xs"
              onClick={() => RedirectTo(ProjectInformation.npmLink)}
            >
              <i className="fa-brands fa-npm pr-2"></i>
              NPM
            </button>
          </div>

          <div className="mt-8 flex flex-wrap place-items-center justify-center gap-2">
            {ProjectInformation.stats.map((stat) => (
              <StatChip
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                accent="cyan"
              />
            ))}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------- STILL LIVE */}
      <section className="gu-grid relative w-full py-10">
        <div className="mx-auto w-[90%] md:w-[70%] lg:w-[60%]">
          <Panel accent="emerald" className="p-5 md:p-6">
            <div className="md:flex md:place-items-center md:gap-6">
              <div className="grow">
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font border border-emerald-400/60 bg-emerald-500/15 px-2 py-1 text-[8px] tracking-widest text-emerald-300">
                    STILL SHIPPING
                  </span>
                  <span className="pixel-font text-xs text-slate-200 md:text-sm">
                    v{ProjectInformation.version}
                  </span>
                </div>
                <p className="pixel-font pt-3 text-[10px] text-emerald-300 md:text-xs">
                  This is the one project here that is still being worked on.
                </p>
                <p className="pt-3 text-xs leading-relaxed text-slate-300 md:text-sm">
                  The two archived plugins on this site are finished. This is
                  not. It is on npm, the source is public, and issues and pull
                  requests are read. The most recent work added Y-sorting for
                  top-down scenes and took the last of the zoom maths bugs out
                  of the hit testing.
                </p>
              </div>
              <div className="shrink-0 pt-5 md:pt-0">
                <button
                  className="pixel-font w-full rounded-none border-2 border-emerald-400/60 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest text-emerald-200 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/20 md:w-auto md:text-[10px]"
                  onClick={() => RedirectTo(ProjectInformation.repoLink)}
                >
                  <i className="fa-brands fa-github pr-2"></i>
                  OPEN AN ISSUE
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
            title="What it is"
            subtitle={ProjectInformation.tagline}
            accent="cyan"
          />
          <div className="mt-6 gap-6 lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-cyan-300">
                    WORLD SPACE
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Sprite positions never need adjusting for pan or zoom. The
                    renderer does that when it draws.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-violet-300">
                    NO DEPENDENCIES
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    One package. No peer dependencies, no build step of its own,
                    no configuration file.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-emerald-300">
                    CULLED AND CAPPED
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Off-screen sprites are skipped, the loop is capped at 60 FPS,
                    and the arrays it uses are reused rather than rebuilt.
                  </p>
                </div>
                <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                  <p className="pixel-font text-[9px] tracking-widest text-amber-300">
                    REACT OPTIONAL
                  </p>
                  <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                    Plain JavaScript works. There is a hook in the README if you
                    would rather have one.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full pt-6 lg:w-1/2 lg:pt-0">
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
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FEATURES */}
      <section className="gu-grid w-full py-12">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-shapes"
            title="What it does"
            subtitle="Five parts, and you will use the first two on day one."
            accent="violet"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Features.map((feature) => (
              <ActionCard
                key={feature.key}
                accent={feature.accent}
                icon={feature.icon}
                title={feature.title}
                image={feature.image}
                imageAlt={`${feature.title} in 2D Graphics Utils`}
                description={feature.description}
                buttonIcon="fa-brands fa-github"
                buttonLabel="Read the docs"
                onClick={() => RedirectTo(ProjectInformation.repoLink)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- QUICK START */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-terminal"
            title="From nothing to a sprite on screen"
            subtitle="Install, import, register. That is the whole first step."
            accent="cyan"
          />
          <Terminal title="app.js" className="mt-6">
            <pre>
              <code className="text-[10px] md:text-sm" lang="js">
                <TerminalLabel accent="cyan">[INSTALL]</TerminalLabel>
                {`
npm install @jaymar921/2dgraphic-utils
                `}
                <TerminalLabel accent="cyan">[DRAW SOMETHING]</TerminalLabel>
                {`
import { CanvasScreen, Sprite, SpriteType }
  from "@jaymar921/2dgraphic-utils";

// assumes <canvas id="my-canvas"></canvas> exists
const canvas = new CanvasScreen("my-canvas", 300, 300, "black");

const player = new Sprite({
  objID: "player-1",
  name: "Player 1",
  posX: 50,          // world space, always
  posY: 50,
  width: 32,
  height: 32,
  imageSource: "player-sprite.png",
  type: SpriteType.PLAYER,
  scale: 1,
});

canvas.registerObject(player);
                `}
                <TerminalLabel accent="violet">[MOVE THE CAMERA]</TerminalLabel>
                {`
canvas.enableScreenDrag(true);
canvas.enableScreenZoom(true);
canvas.setZoomSpeed(0.05);

canvas.handleScreenClickedEvent((e) => {
  // e.mousePosition is world space, compare it
  // straight against sprite.posX and sprite.posY
  console.log(e.objID, e.type, e.mousePosition);
});
                `}
              </code>
            </pre>
          </Terminal>
          <div className="pt-5">
            <Note accent="cyan" icon="fa-solid fa-circle-info">
              Tested image formats are <Cmd accent="cyan">png</Cmd> and{" "}
              <Cmd accent="cyan">jpeg</Cmd>. Others may render oddly. There is a
              React hook in the README that wraps all of the above if you would
              rather not hold the screen object yourself.
            </Note>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Y-SORT */}
      <section className="gu-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-layer-group"
            title="Depth that reads right"
            subtitle="The 1.3.0 headline, and the reason top-down scenes stop looking wrong."
            accent="emerald"
          />
          <div className="mt-6">
            <Shot
              src={Features[2].image}
              alt="Y-sorting in 2D Graphics Utils, with a player behind a tree"
              accent="emerald"
              caption="Sorted by bottom edge every frame, with the object in front fading enough to see through"
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Panel accent="emerald" className="p-5">
              <SubHeading accent="emerald">THE ORDER</SubHeading>
              <Body className="pt-3">
                BACKGROUND first, always. Then every world sprite, sorted by
                <Cmd accent="emerald"> posY + height * scale</Cmd>. Then STATIC,
                which is your HUD and never moves with the camera.
              </Body>
            </Panel>
            <Panel accent="violet" className="p-5">
              <SubHeading accent="violet">THE FADE</SubHeading>
              <Body className="pt-3">
                When something draws on top of the player it drops to{" "}
                <Cmd accent="violet">setBehindOpacity</Cmd>, 0.5 by default, so
                the player is still visible underneath rather than swallowed.
              </Body>
            </Panel>
            <Panel accent="amber" className="p-5">
              <SubHeading accent="amber">THE THRESHOLD</SubHeading>
              <Body className="pt-3">
                <Cmd accent="amber">setOverlapThreshold</Cmd> stops that firing
                on things that are merely nearby. It measures the intersecting
                area against the smaller of the two boxes, and defaults to 10%.
              </Body>
            </Panel>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ API */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-code"
            title="The CanvasScreen API"
            subtitle="Grouped by what you are trying to do, rather than alphabetically."
            accent="cyan"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CanvasApi.map((group) => (
              <Panel key={group.group} accent={group.accent} className="p-5">
                <div className="flex place-items-center gap-3">
                  <IconBadge icon={group.icon} accent={group.accent} />
                  <SubHeading accent={group.accent}>
                    {group.group.toUpperCase()}
                  </SubHeading>
                  {group.since && (
                    <span className="pixel-font border border-emerald-400/50 bg-emerald-500/15 px-2 py-1 text-[7px] tracking-widest text-emerald-300">
                      v{group.since}
                    </span>
                  )}
                </div>
                <div className="mt-4 grid gap-2">
                  {group.methods.map((method) => (
                    <div
                      key={method.signature}
                      className="border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
                    >
                      <p className="pixel-font text-[9px] text-slate-200 md:text-[10px]">
                        {method.signature}
                      </p>
                      <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                        {method.note}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- SPRITE TYPES */}
      <section className="gu-grid w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-tags"
            title="Sprite types"
            subtitle="What a sprite says it is, which decides how it is drawn and what a click reports."
            accent="violet"
          />
          <div className="mt-6 grid gap-2">
            {SpriteTypes.map((type) => (
              <div
                key={type.name}
                className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
              >
                <span className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                  SpriteType.{type.name}
                </span>
                <span className="grow text-[11px] text-slate-400 md:text-xs">
                  {type.note}
                </span>
                <Chip accent={type.accent}>{type.name}</Chip>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Note accent="rose" icon="fa-solid fa-window-maximize">
              <Cmd accent="rose">STATIC</Cmd> is the odd one out. It ignores the
              camera and the zoom completely, always draws last, and is what you
              want for anything that belongs to the interface rather than to the
              world.
            </Note>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CHANGELOG */}
      <section className="w-full py-10">
        <div className="mx-auto w-[90%] md:w-[80%] lg:w-[70%]">
          <SectionHeading
            icon="fa-solid fa-clipboard-list"
            title="Release notes"
            subtitle="What changed in the last two versions, from the package changelog."
            accent="cyan"
          />
          <div className="mt-6 space-y-4">
            {GraphicsUtils_Logs.map((log, index) => (
              <Panel
                key={log.update_version}
                accent={index === 0 ? "cyan" : "slate"}
                className="p-5"
              >
                <div className="flex flex-wrap place-items-center gap-2">
                  <span className="pixel-font text-[11px] text-slate-200 md:text-sm">
                    v{log.update_version}
                  </span>
                  {index === 0 && (
                    <span className="pixel-font border border-cyan-400/50 bg-cyan-500/15 px-2 py-1 text-[7px] tracking-widest text-cyan-300 md:text-[8px]">
                      CURRENT
                    </span>
                  )}
                </div>
                {log.changes.map((change) => (
                  <div key={change.update} className="pt-4">
                    <p className="pixel-font text-[9px] tracking-wide text-amber-400 md:text-[11px]">
                      {change.update}
                    </p>
                    <ul className="mt-2 border-l-2 border-slate-700 pl-3">
                      {change.sublist.map((item) => (
                        <li
                          key={item.slice(0, 40)}
                          className="py-1 text-[11px] leading-relaxed text-slate-300 md:text-sm"
                        >
                          <span className="pr-2 text-cyan-500">&gt;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Panel>
            ))}
          </div>
          <div className="pt-5">
            <Note accent="slate" icon="fa-solid fa-calendar-xmark">
              No release dates here, because the package never tracked them. The
              git history on the repository is the accurate record of when any
              of this landed.
            </Note>
          </div>
          <div className="pt-6 text-center">
            <button
              className="pixel-font rounded-none border-2 border-cyan-400/50 bg-[rgba(0,0,0,0.5)] px-5 py-3 text-[9px] tracking-widest text-cyan-200 transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-500/20 md:text-[11px]"
              onClick={() => RedirectTo(ProjectInformation.repoLink)}
            >
              <i className="fa-brands fa-github pr-2"></i>
              FULL HISTORY ON GITHUB
            </button>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

export default GraphicsUtilsPage;
