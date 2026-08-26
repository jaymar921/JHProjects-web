import { useState } from "react";
import { getYearsAndMonthsFromDate } from "../utils/PageUtility";

/**
 * One release in a patch note list. Shared by every plugin page, so the accent
 * is passed in rather than baked in: CE3 runs lime, Kumandra's Economy runs
 * emerald. Written out in full below so Tailwind keeps the classes.
 */
const ACCENTS = {
  lime: {
    border: "border-lime-400/60",
    text: "text-lime-300",
    badge: "border-lime-400/50 bg-lime-500/15 text-lime-300",
    marker: "text-lime-500",
  },
  emerald: {
    border: "border-emerald-400/60",
    text: "text-emerald-300",
    badge: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
    marker: "text-emerald-500",
  },
};

function Changelog({ log, className = "", isLatest = false, accent = "lime" }) {
  const [showContent, setShowContent] = useState(isLatest);
  const a = ACCENTS[accent] ?? ACCENTS.lime;

  const border = log.release_date
    ? isLatest
      ? a.border
      : "border-slate-700/70"
    : "border-amber-400/60";

  return (
    <div
      className={`relative border ${border} bg-[rgba(11,13,17,0.6)] transition-colors hover:border-slate-500 ${className}`}
    >
      <button
        className="flex w-full rounded-none place-items-center gap-3 border-0 bg-transparent px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.04)]"
        onClick={() => setShowContent(!showContent)}
      >
        <i
          className={`fa-solid fa-chevron-right text-[10px] text-slate-500 transition-transform duration-200 ${
            showContent ? "rotate-90" : ""
          }`}
        ></i>
        <span
          className={`pixel-font text-[10px] md:text-sm ${
            log.release_date ? a.text : "text-amber-300"
          }`}
        >
          v{log.update_version}
        </span>
        {isLatest && log.release_date && (
          <span
            className={`pixel-font border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${a.badge}`}
          >
            LATEST
          </span>
        )}
        {!log.release_date && (
          <span className="pixel-font border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[7px] tracking-widest text-amber-300 md:text-[8px]">
            IN DEV
          </span>
        )}
        <span className="ml-auto text-right text-[9px] text-slate-500 md:text-xs">
          {getYearsAndMonthsFromDate(log.release_date)}
        </span>
      </button>

      {showContent && (
        <div className="border-t border-slate-800 px-4 py-4">
          <p className="text-[10px] text-slate-500 md:text-xs">
            Release date:{" "}
            {log.release_date ? (
              <span className="text-purple-300">{log.release_date}</span>
            ) : (
              <span className={a.text}>In development</span>
            )}
          </p>

          {log.changes.map((change, index) => (
            <div
              key={`${log.update_version}-${log.release_date ?? "new"}-${index}`}
              className="pt-4"
            >
              <p className="pixel-font text-[9px] tracking-wide text-amber-400 md:text-[11px]">
                {change.update}
              </p>
              {change.sublist && (
                <ul className="mt-2 border-l-2 border-slate-700 pl-3">
                  {change.sublist.map((item, subIndex) => (
                    <li
                      key={`${log.update_version}-${index}-${subIndex}`}
                      className="py-1 text-[11px] leading-relaxed text-slate-300 md:text-sm"
                    >
                      <span className={`pr-2 ${a.marker}`}>&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {log.note && (
            <p className="mt-5 border border-slate-700/70 bg-[rgba(255,255,255,0.03)] p-3 text-[10px] text-orange-300 md:text-xs">
              <i className="fa-solid fa-circle-info pr-2"></i>
              {log.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Changelog;
