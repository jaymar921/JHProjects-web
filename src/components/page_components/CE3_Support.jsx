import React from "react";
import { PluginInformation } from "../contants";
import { RedirectTo } from "../utils/PageUtility";

function CE3_Support() {
  return (
    <div>
      <div className="md:flex gap-2">
        {PluginInformation.supportLink.map((support) => {
          return (
            <div className="border-2 border-gray-600 rounded-xl w-full bg-[rgba(0,0,0,0.2)] p-4 m-auto mt-4">
              <h1 className="text-center">{support.title}</h1>
              <div className="text-center p-8">
                <i className={`${support.icon} text-[4em] m-auto`}></i>
              </div>
              <div className="text-center">
                <button onClick={() => RedirectTo(support.link)}>Donate</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CE3_Support;
