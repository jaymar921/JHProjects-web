/**
 * The framed window every sub content panel opens in. Shared by the plugin
 * pages, so the accent is a prop: Custom Enchantments 3 runs lime, Kumandra's
 * Economy emerald, Epic Mobs Rework ember, Custom Warps violet and Fishing
 * Contest cyan. All are written out in full so Tailwind keeps them.
 */
const ACCENTS = {
  ember: {
    border: "border-orange-400/40",
    corner: "border-orange-400/80",
    icon: "text-orange-400",
  },
  lime: {
    border: "border-lime-400/40",
    corner: "border-lime-400/80",
    icon: "text-lime-400",
  },
  emerald: {
    border: "border-emerald-400/40",
    corner: "border-emerald-400/80",
    icon: "text-emerald-400",
  },
  violet: {
    border: "border-violet-400/40",
    corner: "border-violet-400/80",
    icon: "text-violet-400",
  },
  cyan: {
    border: "border-cyan-400/40",
    corner: "border-cyan-400/80",
    icon: "text-cyan-400",
  },
};

function WindowWrap({
  children,
  title = "",
  close = () => {},
  accent = "lime",
  icon = "fa-solid fa-cube",
}) {
  const a = ACCENTS[accent] ?? ACCENTS.lime;

  return (
    <>
      <div className="fixed top-0 z-50 h-full w-full bg-[rgba(0,0,0,0.85)] backdrop-blur-[2px]">
        <div
          className="absolute top-0 z-[-1] h-screen w-screen"
          onClick={close}
        ></div>
        <div
          className={`relative m-auto mt-6 w-[92%] border bg-[rgba(11,13,17,0.96)] shadow-[0_0_45px_rgba(0,0,0,0.8)] md:w-[80%] ${a.border}`}
        >
          <span
            className={`pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 ${a.corner}`}
          />
          <span
            className={`pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 ${a.corner}`}
          />
          <span
            className={`pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 ${a.corner}`}
          />
          <span
            className={`pointer-events-none absolute -right-px -bottom-px h-4 w-4 border-r-2 border-b-2 ${a.corner}`}
          />

          <div className="flex place-items-center gap-3 border-b border-slate-700/70 bg-[rgba(255,255,255,0.03)] px-4 py-3">
            <i className={`${icon} text-xs ${a.icon}`}></i>
            <h1 className="truncate text-[10px] font-bold tracking-widest text-amber-400 md:text-base">
              {title.toUpperCase()}
            </h1>
            <button
              className="ml-auto rounded-none border border-slate-600/60 bg-transparent px-3 py-1 text-xs text-slate-400 transition-colors hover:border-rose-400/70 hover:bg-rose-500/15 hover:text-rose-300"
              onClick={close}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="h-[80vh] overflow-y-scroll p-2">{children}</div>
        </div>
      </div>
    </>
  );
}

export default WindowWrap;
