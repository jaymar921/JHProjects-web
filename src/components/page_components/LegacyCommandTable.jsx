/**
 * The command reference for the two archived plugins.
 *
 * CE3 and Kumandra's Economy have a table each, hard wired to their own
 * constants and colour. These two only ever differ by the list and the accent,
 * so they share this one instead of carrying a copy apiece.
 */
function LegacyCommandTable({ commands, accent = "violet", opLabel = "Admin" }) {
  const head = accent === "cyan" ? "text-cyan-300" : "text-violet-300";
  const tick = accent === "cyan" ? "text-cyan-400" : "text-violet-400";

  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-slate-700">
          <th
            className={`pixel-font px-2 py-2 text-[8px] tracking-wider md:text-[10px] ${head}`}
          >
            Command
          </th>
          <th
            className={`pixel-font px-2 py-2 text-[8px] tracking-wider md:text-[10px] ${head}`}
          >
            Description
          </th>
          <th
            className={`pixel-font px-2 py-2 text-center text-[8px] tracking-wider md:text-[10px] ${head}`}
          >
            {opLabel}
          </th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
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
                  className={`fa-solid fa-circle-check text-xs ${tick}`}
                  title="Requires an admin permission node"
                ></i>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LegacyCommandTable;
