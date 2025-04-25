import React from "react";
import { PluginInformation } from "../contants";
import { RedirectTo } from "../utils/PageUtility";

function CE3_Support({ setSubcontent }) {
  return (
    <div>
      <div className="md:grid gap-4 grid-cols-3">
        {PluginInformation.supportLink.map((support) => {
          return (
            <div className="border-2 h-full border-gray-600 rounded-xl w-full bg-[rgba(0,0,0,0.3)] p-4 m-auto mt-4 shadow-xl">
              <h1 className="text-center">{support.title}</h1>
              <div className="text-center p-8">
                {support.icon ? (
                  <i className={`${support.icon} text-[4em] m-auto`}></i>
                ) : (
                  <img
                    src={support.logo ?? ""}
                    className="w-[64px] text-[4em] m-auto"
                  />
                )}
              </div>
              <div className="text-center">
                <button
                  onClick={() =>
                    support.link
                      ? RedirectTo(support.link)
                      : support.onClick?.(setSubcontent)
                  }
                >
                  Donate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CE3_Support;
