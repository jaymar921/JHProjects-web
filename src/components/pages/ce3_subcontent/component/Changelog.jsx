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
            <h1 className="text-xl text-red-500 w-50">{log.update_version} </h1>
          </div>
          <div className="text-xs text-blue-300 text-right w-full">
            <p>{getYearsAndMonthsFromDate(log.release_date)}</p>
          </div>
        </div>
      </div>
      {showContent && (
        <div className="w-full">
          <p>
            Release Date:{" "}
            {log.release_date ?? (
              <span className="text-green-400">In Development</span>
            )}
          </p>
          {log.changes.map((change, index) => (
            <div
              key={`${log.update_version}-${log.release_date ?? "new"}-${index}`}
              className="text-sm"
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
