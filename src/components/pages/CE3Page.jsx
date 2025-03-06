import React, { useEffect, useState } from "react";
import { PluginInformation } from "../contants";
import { RedirectTo } from "../utils/PageUtility";
import CE3_Classes from "./ce3_subcontent/CE3_Classes";
import WindowWrap from "../modals/windowWrap";
import CE3_Enchants from "./ce3_subcontent/CE3_Enchants";
import CE3_CommandTableComponent from "../page_components/CE3_CommandTableComponent";
import CE3_Support from "../page_components/CE3_Support";
import CE3_Shops from "./ce3_subcontent/CE3_Shops";
import PageFooter from "../page_components/PageFooter";
import CE3_Settings from "./ce3_subcontent/CE3_Settings";
import CE3_LOGO from "../../assets/custom_enchants_3/ce3-logo.png";

function CE3Page() {
  const [subcontent, setSubcontent] = useState("none");
  const [showCommand, setShowCommand] = useState(false);

  useEffect(() => {
    document.title = "Custom Enchantments 3";

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = CE3_LOGO;
  }, []);

  const closeWindow = () => {
    setSubcontent("none");
  };

  const subContent = () => {
    switch (subcontent) {
      case "classes":
        return <CE3_Classes />;
      case "enchants":
        return <CE3_Enchants />;
      case "support":
        return <CE3_Support />;
      case "shops or quests":
        return <CE3_Shops />;
      case "settings":
        return <CE3_Settings />;
      default:
        return (
          <>
            <div className="text-center w-full py-20 text-xs">
              <h3 className="pb-8">... Ongoing development ...</h3>
              <a
                href="https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/"
                target="_blank"
                className="p-2 border-2 text-[10px] md:text-sm"
              >
                View Plugin Info (Old site)
              </a>
            </div>
          </>
        );
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

        <div className="w-[80%] md:w-[50%] pt-8">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            Get your copy now!
          </h3>
        </div>
        <div className="w-[80%] md:w-[50%] md:flex justify-evenly py-8">
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md text-md">
            <p className="p-2 px-2 relative">
              Download premium now!{" "}
              <span
                title="One time payment!"
                className="text-white md:text-sm font-bold px-1 absolute right-[-35px] md:right-[-25px] top-[-10px] bg-yellow-500 rotate-35 select-none"
              >
                ${PluginInformation.price} <i className="fa-solid fa-tag"></i>
              </span>
            </p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.buyLink)}
            >
              <i className="fa-solid fa-cart-shopping"></i> Buy Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Unsure yet? You can try the plugin</p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.trialLink)}
            >
              <i className="fa-solid fa-file-arrow-down"></i> Try Plugin
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Show support by donating</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("support")}
            >
              <i className="fa-solid fa-shield-heart"></i> Support
            </button>
          </div>
        </div>

        <div className="w-[80%] md:w-[50%] pt-8">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            Plugin Commands
          </h3>
          {!showCommand && (
            <div className="text-center pt-4">
              <button
                className="rounded-lg pixel-font"
                onClick={() => setShowCommand(true)}
              >
                Show Commands
              </button>
            </div>
          )}
          {showCommand && (
            <div>
              <CE3_CommandTableComponent />
              <div className="text-center pt-4">
                <button
                  className="rounded-lg pixel-font"
                  onClick={() => setShowCommand(false)}
                >
                  Hide Commands
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

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
              <i className="fa-solid fa-hat-wizard"></i> Classes
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Setup Shops or Quests</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("shops or quests")}
            >
              <i className="fa-solid fa-shop"></i> Shops
            </button>
          </div>
          <div className="col-span-1  p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Enchantment List</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("enchants")}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i> Enchants
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Looting plots</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("plots")}
            >
              <i className="fa-solid fa-city"></i> Plots
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Items List</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("items")}
            >
              <i className="fa-solid fa-cube"></i> Items
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Plugin Default Settings</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("settings")}
            >
              <i className="fa-solid fa-gears"></i> Settings
            </button>
          </div>
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <div className="text-center w-full py-20">
        <h3 className="pb-2">... Ongoing development ...</h3>
        <button
          onClick={() =>
            RedirectTo(
              "https://jaymar921.github.io/jaymar_plugin_wiki/CE3_WIKI/"
            )
          }
        >
          View Plugin Info (Old site)
        </button>
      </div>

      <PageFooter />
    </div>
  );
}

export default CE3Page;
