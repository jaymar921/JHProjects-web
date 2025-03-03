import React, { useEffect } from "react";
import { PluginInformation } from "../contants";
import { RedirectTo } from "../utils/PageUtility";

function CE3Page() {
  useEffect(() => {
    document.title = "Custom Enchantments 3";
  }, []);

  return (
    <div className="w-full">
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
      <section className="justify-items-center py-4">
        <div className="w-[80%] md:w-[50%]">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            About
          </h3>
          <p className="w-full text-justify">{PluginInformation.description}</p>
        </div>

        <div className="w-[80%] md:w-[50%] md:flex justify-evenly py-8">
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md text-md">
            <p className="p-2 px-2">Download premium now!</p>
            <button onClick={() => RedirectTo(PluginInformation.buyLink)}>
              <i class="fa-solid fa-cart-shopping"></i> Buy Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Unsure yet? You can try the plugin</p>
            <button onClick={() => RedirectTo(PluginInformation.trialLink)}>
              <i class="fa-solid fa-file-arrow-down"></i> Try Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Show support by donating</p>
            <button onClick={() => RedirectTo(PluginInformation.supportLink)}>
              <i class="fa-solid fa-shield-heart"></i> Support
            </button>
          </div>
        </div>
      </section>

      <div className="text-center w-full py-20">
        <h3>Ongoing development</h3>
        <button
          onClick={() =>
            RedirectTo(
              "https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/"
            )
          }
        >
          Plugin Wiki
        </button>
      </div>
    </div>
  );
}

export default CE3Page;
