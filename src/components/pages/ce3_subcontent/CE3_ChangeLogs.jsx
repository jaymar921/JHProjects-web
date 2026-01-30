import React, { useState } from "react";
import { CE3_Logs } from "../../contants/custom_enchants_3/CE3Constants_Logs";
import Changelog from "./component/Changelog";

function CE3_ChangeLogs() {
  const [filteredLog, setFilter] = useState(CE3_Logs);
  const [input, setInput] = useState("");

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
      <div className="p-8">
        <h1 className="text-md md:text-xl text-purple-500">Plugin Updates</h1>
        <p className="py-2">
          Here's the list of updates from latest to oldest:
        </p>
        <div>
          <input
            placeholder="Looking for a specific update?"
            className="w-full p-2 shadow-xs shadow-amber-50"
            onChange={doFilter}
            value={input}
          />
        </div>
        <hr className="my-4 border-blue-300" />
        {filteredLog.map((log, index) => (
          <Changelog
            key={`${index}-${log.release_date}-${log.update_version}`}
            className="p-2 my-4 cursor-pointer shadow-amber-50 shadow-xs"
            log={log}
          />
        ))}
      </div>
    </div>
  );
}

export default CE3_ChangeLogs;
