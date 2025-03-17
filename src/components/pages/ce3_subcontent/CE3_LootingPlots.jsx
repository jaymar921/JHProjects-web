import React from "react";
import lootingPlotVideo from "../../../assets/custom_enchants_3/video/ce_lootingplot.mp4";

function CE3_LootingPlots() {
  return (
    <div className="w-full">
      <h1 className="text-center text-sm md:text-md text-purple-500 mb-4">
        Custom Enchantments 3 v1.0.7
      </h1>
      <div className="w-[90%] md:w-[60%] xl:w-[40%] m-auto">
        <video
          className="w-full"
          src={lootingPlotVideo}
          autoPlay
          loop
          muted
          title="Looting Plot in action"
        ></video>
      </div>

      <div className="p-8 text-center text-xs md:text-lg">
        <p>
          Excite your game experience with built-in custom structures and it's
          fully customizable!
        </p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500">
        Looting Plots Tutorial
      </h1>

      <iframe
        className="w-[90%] lg:w-[50%] m-auto h-[400px] my-8"
        src="https://www.youtube.com/embed/fMuJxkC2Ebc?si=iqve_mUQgclx9n-f"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <h1 className="text-center text-md md:text-xl text-purple-500">
        Loot Items
      </h1>

      <div className="p-8 text-center text-xs md:text-lg">
        <p>
          Add your own weapon with custom damage attributes and it can only be
          obtained in looting plots based on it's rarity chance.
        </p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500 pt-4">
        Modify LootItems.yml
      </h1>
      <div className="text-justify w-[80%] lg:w-[60%] m-auto py-2 text-xs md:text-lg font-mono">
        <p>• Turn of the server (To avoid Crashing)</p>
        <p>
          • Locate LootItems.yml, it can be found inside
          CustomEnchantments3/PluginData in the plugin's folder
        </p>
        <p>
          • Modify the file or download a custom files{" "}
          <a
            href="https://github.com/JnH-Projects/Custom-Enchantments-3/tree/main/loot_items"
            target="_blank"
          >
            here
          </a>
        </p>
        <p>• Start the server (It will load the modified file)</p>
      </div>
    </div>
  );
}

export default CE3_LootingPlots;
