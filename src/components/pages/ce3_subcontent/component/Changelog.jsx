import React, { useState } from "react";

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
        <h1 className="text-xl text-red-500">{log.update_version}</h1>
      </div>
      {showContent && (
        <div className="w-full">
          {log.changes.map((change, index) => (
            <div
              key={`${log.update_version}-${log.release_date}-${index}`}
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
        </div>
      )}
    </div>
  );
}

export default Changelog;
