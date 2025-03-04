import React, { useEffect, useState } from "react";
import { PluginInformation } from "../contants";
import { RedirectTo } from "../utils/PageUtility";
import CE3_Classes from "./ce3_subcontent/CE3_Classes";
import WindowWrap from "../modals/windowWrap";

function CE3Page() {
  const [subcontent, setSubcontent] = useState("none");
  useEffect(() => {
    document.title = "Custom Enchantments 3";
  }, []);

  const closeWindow = () => {
    setSubcontent("none");
  };

  const subContent = () => {
    switch (subcontent) {
      case "classes":
        return <CE3_Classes />;
      default:
        return <></>;
    }
  };

  const subContentWindow = () => {
    if (subcontent !== "none")
      return (
        <WindowWrap close={closeWindow} title={subcontent}>
          {subContent()}
        </WindowWrap>
      );
    else <></>;
  };

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
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.buyLink)}
            >
              <i class="fa-solid fa-cart-shopping"></i> Buy Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Unsure yet? You can try the plugin</p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.trialLink)}
            >
              <i class="fa-solid fa-file-arrow-down"></i> Try Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Show support by donating</p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.supportLink)}
            >
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
          Plugin Info
        </button>
      </div>

      <section className="justify-items-center py-4">
        <div className="w-[80%] md:w-[50%]">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            Plugin Features
          </h3>
        </div>

        <div className="w-[80%] md:w-[50%] md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-2 justify-evenly py-8 ">
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md text-md">
            <p className="p-2 px-2">Player roles / class paths</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("classes")}
            >
              <i class="fa-solid fa-hat-wizard"></i> Classes
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Setup Enchantment Shop</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("shops")}
            >
              <i class="fa-solid fa-shop"></i> Shops
            </button>
          </div>
          <div className="col-span-1  p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Enchantment List</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("enchants")}
            >
              <i class="fa-solid fa-wand-magic-sparkles"></i> Enchants
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Looting plots</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("plots")}
            >
              <i class="fa-solid fa-city"></i> Plots
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Items List</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("items")}
            >
              <i class="fa-solid fa-cube"></i> Items
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Plugin Default Settings</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("settings")}
            >
              <i class="fa-solid fa-gears"></i> Settings
            </button>
          </div>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>
    </div>
  );
}

export default CE3Page;
