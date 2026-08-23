import { useState } from "react";
import { CE3_Logs } from "../../contants/custom_enchants_3/CE3Constants_Logs";
import Changelog from "./component/Changelog";

function CE3_ChangeLogs() {
  const [filteredLog, setFilter] = useState(CE3_Logs);
  const [input, setInput] = useState("");

  const latestVersion = CE3_Logs.find((log) => log.release_date);

  const doFilter = (e) => {
    setInput(e.target.value);

    const newList = CE3_Logs.filter((arg) => {
      return JSON.stringify(arg)
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setFilter(newList);
  };

  return (
    <div className="w-full font-mono">
      <div className="p-4 md:p-8">
        <div className="flex flex-wrap place-items-center gap-3">
          <h1 className="pixel-font text-[11px] text-purple-300 md:text-lg">
            Plugin Updates
          </h1>
          {latestVersion && (
            <span className="pixel-font border border-lime-400/50 bg-lime-500/15 px-2 py-1 text-[8px] tracking-widest text-lime-300">
              LATEST v{latestVersion.update_version}
            </span>
          )}
        </div>
        <p className="py-2 text-xs text-slate-400 md:text-sm">
          Every release from newest to oldest. Click a version to open it.
        </p>

        <div className="relative mt-2">
          <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-slate-500"></i>
          <input
            placeholder="Looking for a specific update?"
            className="w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] py-2 pr-3 pl-9 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-lime-400/60 md:text-sm"
            onChange={doFilter}
            value={input}
          />
        </div>

        <p className="pt-3 text-[10px] tracking-widest text-slate-500 uppercase">
          {filteredLog.length} of {CE3_Logs.length} releases shown
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {filteredLog.map((log) => (
            <Changelog
              key={`${log.release_date ?? "new"}-${log.update_version}`}
              isLatest={log.update_version === latestVersion?.update_version}
              log={log}
            />
          ))}
          {filteredLog.length === 0 && (
            <p className="py-10 text-center text-xs text-slate-500">
              No release matches &quot;{input}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CE3_ChangeLogs;
