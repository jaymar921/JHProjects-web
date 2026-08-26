import { CommandList } from "../contants/kumandra/KumandraConstants";

function KE_CommandTableComponent() {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-slate-700">
          <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
            Command
          </th>
          <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
            Description
          </th>
          <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-emerald-300 md:text-[10px]">
            Admin
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
                  className="fa-solid fa-circle-check text-xs text-emerald-400"
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

export default KE_CommandTableComponent;
