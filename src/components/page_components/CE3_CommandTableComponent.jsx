import React from "react";
import { CommandList } from "../contants/custom_enchants_3/CE3Constants";

function CE3_CommandTableComponent() {
  return (
    <table>
      <thead>
        <tr>
          <th>Command</th>
          <th>Description</th>
          <th>Require OP</th>
        </tr>
      </thead>
      <tbody>
        {CommandList.map((command) => {
          return (
            <tr className="border-b-2 border-gray-700">
              <td className="pixel-font text-xs px-2">{command.command}</td>
              <td>{command.description}</td>
              <td className="text-center">
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
