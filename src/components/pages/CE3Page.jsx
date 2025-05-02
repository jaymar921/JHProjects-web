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
import CE3_LootingPlots from "./ce3_subcontent/CE3_LootingPlots";
import CE3_CustomItems from "./ce3_subcontent/CE3_CustomItems";
import CE3_DonatePi from "./ce3_subcontent/CE3_DonatePi";

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
        return <CE3_Support setSubcontent={setSubcontent} />;
      case "donate pi":
        return <CE3_DonatePi setSubcontent={setSubcontent} />;
      case "shops or quests":
        return <CE3_Shops />;
      case "settings":
        return <CE3_Settings />;
      case "looting plots":
        return <CE3_LootingPlots />;
      case "custom items":
        return <CE3_CustomItems />;
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
        <iframe
          className="w-auto md:w-[500px] lg:w-[700px] md:h-[300px] lg:h-[350px] mb-8"
          src="https://www.youtube.com/embed/0A0tKMnEpIA?si=--DmxZQMp0GW-q4J"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
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
                ${PluginInformation.price} <i className="fa-solid fa-tag"></i>{" "}
              </span>
            </p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.buyLink)}
            >
              <i className="fa-solid fa-cart-shopping"></i> Buy Plugin{" "}
              <p className="text-[10px]">One Time Payment!</p>
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Unsure yet? You can try the plugin</p>
            <button
              className="rounded-xl"
              onClick={() => RedirectTo(PluginInformation.trialLink)}
            >
              <i className="fa-solid fa-file-arrow-down"></i> Try Plugin
              <p className="text-[10px]">v1.2.0-lite-r.1</p>
            </button>
          </div>
          <div className="md:w-[200px] p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Show support by donating</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("support")}
            >
              <p className="text-[5px]">&nbsp;</p>
              <i className="fa-solid fa-shield-heart"></i> Support
              <p className="text-[5px]">&nbsp;</p>
            </button>
          </div>
        </div>

        <div className="w-[80%] md:w-[50%] pt-8">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            Server Requirements
          </h3>
          <div className="mx-auto mt-8 bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 overflow-auto">
              <pre>
                <code className="text-sm" lang="md">
                  <p className="mt-5 mb-0 font-bold bg-gray-700 w-fit py-2 px-2 rounded-md">
                    [Minimum Server Requirement]
                  </p>
                  {`
- CPU:     1Ghz | At least 2 Cores
- RAM:     At least 2GB
- STORAGE: At least 1GB
- NETWORK: At least 3mbps

Note: [PREMIUM VERSION] is not available in Aternos.
      You are required to have a dedicated server if
      you want to use the full feature of this plugin.
                    `}
                  <p className="mt-5 mb-0 font-bold bg-gray-700 w-fit py-2 px-2 rounded-md">
                    [Supported Server Softwares]
                  </p>
                  {`
- SPIGOT [1.16 - 1.21+] (Recommended)
- PAPER  [1.16 - 1.21+]
                  `}
                </code>
              </pre>
            </div>
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

        <div className="w-[80%] md:w-[50%] pt-8">
          <h3 className="text-[1.2em] md:text-[1.5em] text-purple-500 font-bold">
            Setup Permissions
          </h3>

          <div className="text-justify pt-4">
            <p>
              Custom Enchantments 3 - RPG plugin is an independent plugin and
              does not rely on a 3rd-party permissions plugin. It has it's own
              built-in permissions file.
              <br />
              <br />
              In order for you to have full access to the plugin commands such
              as create shops or quests, give player levels or currency, and do
              the test plugin commands. You are required to modify the{" "}
              <span className="font-bold">Authorization.yml</span> file, see
              example below.
            </p>
            <div className="mx-auto mt-8 bg-gray-900 rounded-lg overflow-hidden">
              <div className="px-4 overflow-auto">
                <pre>
                  <code className="text-sm" lang="md">
                    <p className="mt-5 mb-0 font-bold bg-gray-700 w-fit py-2 px-2 rounded-md">
                      [CustomEnchantments3/PluginData/Authorization.yml]
                    </p>
                    {`
# Aside from OPed players that has access to
# the plugin's admin commands, you can also list
# players by their 'names' to allow them using the
# command.
plugin_admin_access:
  - JayMar921
  - MikaPiaChu921
  - Sekai47
# For bedrock players [using geyser/floodgate]
  - .JhonoBrine
  - .AxicaCattleya
  - .EliteLeonidas
                    `}
                  </code>
                </pre>
              </div>
            </div>
          </div>
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
              onClick={() => setSubcontent("looting plots")}
            >
              <i className="fa-solid fa-city"></i> Plots
            </button>
          </div>
          <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Custom Items List</p>
            <button
              className="rounded-xl"
              onClick={() => setSubcontent("custom items")}
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
          {/* <div className="col-span-1 p-2 text-center border-2 border-slate-700 shadow-2xl rounded-md mt-4 md:mt-0">
            <p className="p-2 px-2">Changelog</p>
            <button className="rounded-xl" onClick={() => setSubcontent("")}>
              <i className="fa-solid fa-book"></i> Versions
            </button>
          </div> */}
        </div>
      </section>

      <section className="w-full">{subContentWindow()}</section>

      <PageFooter />
    </div>
  );
}

export default CE3Page;
