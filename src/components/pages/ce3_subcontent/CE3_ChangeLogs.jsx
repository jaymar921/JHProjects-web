import React from "react";
import { CE3_Logs } from "../../contants/custom_enchants_3/CE3Constants_Logs";
import Changelog from "./component/Changelog";

function CE3_ChangeLogs() {
  return (
    <div className="w-full">
      <div className="p-8">
        <h1 className="text-md md:text-xl text-purple-500">Plugin Updates</h1>
        <p className="py-2">
          Here's the list of updates from latest to oldest:
        </p>
        {CE3_Logs.map((log, index) => (
          <Changelog
            key={`${index}-${log.release_date}-${log.update_version}`}
            className="p-2 border-2 my-1 cursor-pointer"
            log={log}
          />
        ))}
      </div>
    </div>
  );
}

export default CE3_ChangeLogs;
