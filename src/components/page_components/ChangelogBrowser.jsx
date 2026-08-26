import { useState } from "react";
import Changelog from "./Changelog";

/**
 * The searchable release list that opens in a sub content window.
 *
 * CE3 and Kumandra's Economy each have their own copy of this, because each
 * one reads its own constants file and has its own accent baked in. The two
 * archived plugins share this one instead: they differ only by their log list
 * and their colour, and neither will ever gain a release that changes that.
 *
 * `latestLabel` exists because "LATEST" reads like a promise of a next one.
 * For a finished plugin the top entry is the final release, not the latest.
 */
function ChangelogBrowser({
  logs,
  accent = "violet",
  title = "Release history",
  subtitle = "Every release from newest to oldest. Click a version to open it.",
  latestLabel = "FINAL",
  emptyPrefix = "No release matches",
}) {
  const [input, setInput] = useState("");

  const filtered = logs.filter((log) =>
    JSON.stringify(log).toLowerCase().includes(input.toLowerCase()),
  );

  const newest = logs[0];

  const heading = accent === "cyan" ? "text-cyan-300" : "text-violet-300";
  const badge =
    accent === "cyan"
      ? "border-cyan-400/50 bg-cyan-500/15 text-cyan-300"
      : "border-violet-400/50 bg-violet-500/15 text-violet-300";
  const focus =
    accent === "cyan" ? "focus:border-cyan-400/60" : "focus:border-violet-400/60";

  return (
    <div className="w-full font-mono">
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap place-items-center gap-3">
          <h1 className={`pixel-font text-[11px] md:text-lg ${heading}`}>
            {title}
          </h1>
          {newest && (
            <span
              className={`pixel-font border px-2 py-1 text-[8px] tracking-widest ${badge}`}
            >
              {latestLabel} v{newest.update_version}
            </span>
          )}
        </div>
        <p className="py-2 text-xs text-slate-400 md:text-sm">{subtitle}</p>

        <div className="relative mt-2">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-slate-500"></i>
          <input
            placeholder="Looking for a specific update?"
            className={`w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] py-2 pr-3 pl-9 text-xs text-slate-200 outline-none placeholder:text-slate-600 md:text-sm ${focus}`}
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </div>

        <p className="pt-3 text-[10px] tracking-widest text-slate-500 uppercase">
          {filtered.length} of {logs.length} releases shown
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((log) => (
            <Changelog
              key={`${log.release_date ?? "new"}-${log.update_version}`}
              isLatest={log.update_version === newest?.update_version}
              latestLabel={latestLabel}
              log={log}
              accent={accent}
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-xs text-slate-500">
              {emptyPrefix} &quot;{input}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangelogBrowser;
