import { useState } from "react";
import { EMR_Logs } from "../../contants/epic_mobs_rework/EMRConstants_Logs";
import Changelog from "../../page_components/Changelog";

/**
 * The release history, which right now is one entry with no date on it.
 *
 * The search box is here from the start rather than added at the third
 * release, so the panel does not change shape under a returning visitor.
 */
function EMR_ChangeLogs() {
  const [input, setInput] = useState("");

  const filtered = EMR_Logs.filter((log) =>
    JSON.stringify(log).toLowerCase().includes(input.toLowerCase()),
  );

  const released = EMR_Logs.find((log) => log.release_date);

  return (
    <div className="w-full font-mono">
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap place-items-center gap-3">
          <h1 className="pixel-font text-[11px] text-orange-300 md:text-lg">
            Release history
          </h1>
          <span
            className={`pixel-font border px-2 py-1 text-[8px] tracking-widest ${
              released
                ? "border-orange-400/50 bg-orange-500/15 text-orange-300"
                : "border-amber-400/50 bg-amber-500/15 text-amber-300"
            }`}
          >
            {released ? `LATEST v${released.update_version}` : "NOTHING RELEASED YET"}
          </span>
        </div>
        <p className="py-2 text-xs text-slate-400 md:text-sm">
          {released
            ? "Every release from newest to oldest. Click a version to open it."
            : "One entry, and it has no date on it. It says what is finished rather than what is planned, because that is the only half of it that is true yet."}
        </p>

        <div className="relative mt-2">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-slate-500"></i>
          <input
            placeholder="Looking for something in particular?"
            className="w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] py-2 pr-3 pl-9 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-orange-400/60 md:text-sm"
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </div>

        <p className="pt-3 text-[10px] tracking-widest text-slate-500 uppercase">
          {filtered.length} of {EMR_Logs.length} entries shown
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((log) => (
            <Changelog
              key={`${log.release_date ?? "new"}-${log.update_version}`}
              isLatest={log.update_version === released?.update_version}
              log={log}
              accent="ember"
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-xs text-slate-500">
              Nothing here matches &quot;{input}&quot;.
            </p>
          )}
        </div>

        <p className="pt-6 text-[11px] leading-relaxed text-slate-500 md:text-xs">
          The original Epic Mobs had thirteen releases between October 2021 and
          April 2023. They are not in this list, because folding them in would
          make a plugin that has shipped nothing look like it has thirteen
          releases behind it. They are on{" "}
          <a className="text-orange-300 underline" href="/epic-mobs">
            the Epic Mobs page
          </a>
          , which is the record of what that plugin was.
        </p>
      </div>
    </div>
  );
}

export default EMR_ChangeLogs;
