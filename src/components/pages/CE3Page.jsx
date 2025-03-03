import React, { useEffect } from "react";
import { PluginInformation } from "../contants";

function CE3Page() {
  useEffect(() => {
    document.title = "Custom Enchantments 3";
  }, []);

  return (
    <div className="w-screen">
      <div
        className={`w-full h-[400px] flex justify-center place-items-center bannerImage`}
      >
        <div className="text-center border-2 rounded-xl p-8 bg-[rgba(0,0,0,0.8)] select-none">
          <h1 className="text-[1.5em] md:text-[3.2em] font-bold text-lime-500">
            {PluginInformation.title}
          </h1>
          <h3 className="text-xs md:text-xl text-yellow-700 font-bold select-none">
            {PluginInformation.subtitle}
          </h3>
          <p className="pt-2 select-none font-bold text-xs md:text-xl">
            By{" "}
            <a href={PluginInformation.authorSocial} target="_blank">
              {PluginInformation.author}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CE3Page;
