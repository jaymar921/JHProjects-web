import React from "react";
import IMG_CE3_BUY_LEVEL from "../../../assets/custom_enchants_3/other_photo_ce/ce3_buy_level.png";
import IMG_CE3_BUY_RACO from "../../../assets/custom_enchants_3/other_photo_ce/ce3_buy_raco.png";
import IMG_CE3_CONFIG from "../../../assets/custom_enchants_3/other_photo_ce/ce3_config_price.png";

function CE3_BuyEnchantment() {
  return (
    <div className="w-full">
      <h1 className="text-center text-sm md:text-md text-purple-500 mb-4">
        Added in v1.3.0+
      </h1>
      {/* <div className="w-[90%] md:w-[60%] xl:w-[40%] m-auto">
        <video
          className="w-full"
          src="https://media.githubusercontent.com/media/jaymar921/JHProjects-web/refs/heads/main/src/assets/custom_enchants_3/video/ce_lootingplot.mp4"
          autoPlay
          loop
          muted
          title="Looting Plot in action"
        ></video>
      </div> */}

      <div className="p-8 text-center text-xs md:text-lg">
        <p>
          Custom Enchantments are now fully customizable in the config! Choose
          whether to buy enchantments with Vanilla Minecraft levels or RACO (the
          plugin's built-in currency). Setup is super easy your adventure, your
          rules!
        </p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500">
        VANILLA MINECRAFT LEVEL
      </h1>

      <img
        className="w-[90%] lg:w-[50%] m-auto h-auto my-8"
        src={IMG_CE3_BUY_LEVEL}
      />

      <h1 className="text-center text-md md:text-xl text-purple-500">
        RACO (Plugin's built-in currency)
      </h1>

      <img
        className="w-[90%] lg:w-[50%] m-auto h-auto my-8"
        src={IMG_CE3_BUY_RACO}
      />

      <h1 className="text-center text-md md:text-xl text-purple-500">Setup</h1>

      <div className="p-8 text-center text-xs md:text-lg">
        <p>
          Custom Enchantments can be bought with Minecraft levels or RACO, and
          you can disable purchases by setting the price to 0.
        </p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500 pt-4">
        Modify config.yml
      </h1>
      <div className="text-left w-[80%] lg:w-[60%] m-auto py-2 text-xs md:text-lg font-mono">
        <p>1. Turn of the server (To avoid Crashing)</p>
        <p>
          2. Locate config.yml, it can be found inside CustomEnchantments3
          folder in the plugin's folder of your server
        </p>
        <p>
          3. Proceed to line number 98, you can see the first Enchantment Listed
          there called LifeSteal with a price of 55 Vanilla Minecraft Level
        </p>
        <p>4. To change the price, just simply enter a number of your choice</p>
        <p>
          5. If you want to set it to RACO, simply add the character ('C')
          beside the price, see example screenshot below
        </p>
        <p>
          6. Get a new copy of the config file{" "}
          <a
            href="https://github.com/JnH-Projects/Custom-Enchantments-3/tree/main/config"
            target="_blank"
          >
            here
          </a>
        </p>
        <p>7. Once done, simply save the file</p>
        <p>8. Start the server (It will load the modified file)</p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500 pt-4">
        Example Screenshot
      </h1>

      <img
        className="w-[90%] lg:w-[50%] m-auto h-auto my-8"
        src={IMG_CE3_CONFIG}
      />
    </div>
  );
}

export default CE3_BuyEnchantment;
