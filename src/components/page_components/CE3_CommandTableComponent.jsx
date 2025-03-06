import React from "react";
import { CommandList } from "../contants/custom_enchants_3/CE3Constants";

function CE3_CommandTableComponent() {
  return (
    <table className="my-2">
      <thead>
        <tr>
          <th className="text-xs md:text-lg">Command</th>
          <th className="text-xs md:text-lg">Description</th>
          <th className="text-xs md:text-lg">Admin</th>
        </tr>
      </thead>
      <tbody>
        {CommandList.map((command) => {
          return (
            <tr className="border-b-2 border-gray-700">
              <td className="pixel-font text-[0.5em] md:text-xs px-2">
                {command.command}
              </td>
              <td className="text-[0.8em] md:text-xs lg:text-lg">
                {command.description}
              </td>
              <td className="text-center text-[0.7em] md:text-xs ">
                {command.requireOp && (
                  <i class="fa-solid fa-circle-check text-green-500"></i>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CE3_CommandTableComponent;
