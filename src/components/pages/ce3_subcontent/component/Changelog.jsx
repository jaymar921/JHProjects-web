import React, { useState } from "react";
import { getYearsAndMonthsFromDate } from "../../../utils/PageUtility";

function Changelog({ log, className }) {
  const [showContent, setShowContent] = useState(false);
  console.log(log);
  return (
    <div
      className={className}
      onClick={() => {
        setShowContent(!showContent);
      }}
    >
      <div>
        <div className="flex place-items-center">
          <div>
            <h1 className="md:text-xl text-xs text-red-500 w-fit">
              {log.update_version}{" "}
            </h1>
          </div>
          <div className="md:text-xs text-[10px] text-blue-300 text-right m-auto mr-0">
            <p>{getYearsAndMonthsFromDate(log.release_date)}</p>
          </div>
        </div>
      </div>
      {showContent && (
        <div className="w-full md:text-xl text-xs">
          <p>
            Release Date:{" "}
            {log.release_date ? (
              <span className="text-purple-400">{log.release_date}</span>
            ) : (
              <span className="text-green-400">In Development</span>
            )}
          </p>
          {log.changes.map((change, index) => (
            <div
              key={`${log.update_version}-${log.release_date ?? "new"}-${index}`}
              className="md:text-sm text-xs"
            >
              {change.sublist ? (
                <>
                  <p className="text-yellow-500">{change.update}</p>
                  {change.sublist.map((item) => (
                    <>
                      <div
                        key={`${change.update} - ${item}`}
                        className="p-1 px-2"
                      >
                        <p>- {item}</p>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <p>{change.update}</p>
                </>
              )}
            </div>
          ))}
          <div>
            <p className="text-orange-300">{log.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Changelog;
