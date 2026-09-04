import { CommandList } from "../contants/epic_mobs_rework/EMRConstants";

/**
 * The Epic Mobs Rework command table.
 *
 * It carries a third column the other plugins' tables do not: which edition a
 * command exists in. The commands missing from Lite are missing from the Lite
 * command tree entirely rather than refusing when you run them, so an owner
 * reading this table wants to know that before they type one and get "unknown
 * command" back.
 */
function EMR_CommandTableComponent() {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-orange-300 md:text-[10px]">
            Command
          </th>
          <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-orange-300 md:text-[10px]">
            Description
          </th>
          <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-orange-300 md:text-[10px]">
            Admin
          </th>
          <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-orange-300 md:text-[10px]">
            Edition
          </th>
        </tr>
      </thead>
      <tbody>
        {CommandList.map((command) => (
          <tr
            key={command.command}
            className="border-b border-slate-800 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
          >
            <td className="pixel-font px-2 py-3 align-top text-[8px] whitespace-nowrap text-slate-200 md:text-[10px]">
              {command.command}
            </td>
            <td className="px-2 py-3 align-top text-[11px] text-slate-400 md:text-xs">
              {command.description}
            </td>
            <td className="px-2 py-3 text-center align-top">
              {command.requireOp && (
                <i
                  className="fa-solid fa-circle-check text-xs text-orange-400"
                  title="Requires an admin permission node"
                ></i>
              )}
            </td>
            <td className="px-2 py-3 text-center align-top">
              <span
                className={`pixel-font inline-block border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${
                  command.lite
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    : "border-amber-400/40 bg-amber-400/10 text-amber-300"
                }`}
              >
                {command.lite ? "BOTH" : "FULL"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EMR_CommandTableComponent;
