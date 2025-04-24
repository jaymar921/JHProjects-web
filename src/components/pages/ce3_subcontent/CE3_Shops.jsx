import React from "react";
import CE3ShopImg from "../../../assets/custom_enchants_3/ce_shops.png";
import CE3QuestLoadImg from "../../../assets/custom_enchants_3/ce_quest_load.png";
import CE3QuestDoneImg from "../../../assets/custom_enchants_3/ce_quest_done.png";

function CE3_Shops() {
  return (
    <div className="w-full">
      <div className="w-[90%] m-auto">
        <img className="w-full h-[350px] object-cover" src={CE3ShopImg} />
      </div>
      <div className="w-[90%] m-auto text-justify py-4 text-xs md:text-lg">
        <p>
          You can place a shop or quest entity anywhere around the world if you
          want to. The{" "}
          <span className="text-gray-200 px-1 font-mono font-bold bg-gray-700 rounded-sm">
            /ce shop
          </span>{" "}
          command opens the Shop GUI if{" "}
          <span className="text-gray-200 px-1 font-mono font-bold bg-gray-700 rounded-sm">
            EnableShopCommand
          </span>{" "}
          is set to{" "}
          <span className="text-green-400 px-1 font-mono font-bold bg-gray-700 rounded-sm">
            true
          </span>{" "}
          in the config.yml, otherwise it will display all shop coordinates
          within the current world. The{" "}
          <span className="text-gray-200 px-1 font-mono font-bold bg-gray-700 rounded-sm">
            /ce quest
          </span>{" "}
          command shows all quest entities location within the current world. If
          the player is on active quest, it will show the quest details instead.
        </p>
      </div>

      <iframe
        className="w-[90%] lg:w-[50%] m-auto h-[400px] mb-8"
        src="https://www.youtube.com/embed/Me7zZfF8e1s?si=OW_q1mlAPnSL8zxJ"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h1 className="text-center text-xl md:text-3xl text-yellow-400 pt-4 mb-2">
        Create Your Shop
      </h1>
      <div className="text-justify w-[60%] m-auto py-2 text-xs md:text-lg">
        <p>• Move to a place where you want to place your shop</p>
        <p>• Type the command: </p>
        <div className="text-center py-2">
          <span className="text-gray-200 font-mono font-bold bg-gray-700 p-1 px-2 rounded-sm">
            /ce shop add [mobType] [shopType] [shopName]
          </span>
        </div>
        <p>• It will create a shop at your position and pointing direction</p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500 pt-4">
        Mob Types
      </h1>
      <div className="text-justify w-[60%] lg:w-[30%] m-auto py-2 text-xs md:text-lg">
        <p>• HORSE</p>
        <p>• PIGLIN</p>
        <p>• PILLAGER</p>
        <p>• SHEEP</p>
        <p>• VILLAGER</p>
        <p>• WOLF</p>
      </div>

      <h1 className="text-center text-md md:text-xl text-purple-500 pt-4">
        Shop Types
      </h1>
      <div className="text-left w-[60%] lg:w-[30%] m-auto py-2 text-xs md:text-lg">
        <p>• Sword</p>
        <p>• Bow</p>
        <p>
          • Magic{" "}
          <span className="text-yellow-300 font-mono">
            (Includes Generic Enchants)
          </span>
        </p>
        <p>• Tool</p>
        <p>• Armor</p>
        <p>• Shield</p>
        <p>• Trident</p>
        <p>
          • Dummy{" "}
          <span className="text-yellow-300 font-mono">(A punching bag)</span>
        </p>
        <p>
          • Quest{" "}
          <span className="text-yellow-300 font-mono">
            (Make sure that quests exists)
          </span>
        </p>
        <p>• Raco Exchange</p>
        <p>• Raco Shop</p>
        <p>• Disenchant</p>
        <p>• Animal Armor</p>
      </div>

      <h1 className="text-center text-xl md:text-3xl text-yellow-400 mt-8 pt-4 mb-2">
        Create Your QUESTS
      </h1>
      <div className="w-[90%] m-auto text-center py-4 text-xs md:text-lg">
        <p>
          Bring epic fun on your server with customizable quests and rewards!
        </p>
      </div>
      <div className="w-[90%] lg:w-[40%] m-auto">
        <img className="w-full h-auto object-cover" src={CE3QuestLoadImg} />
      </div>
      <div className="w-[90%] lg:w-[40%] m-auto">
        <img className="w-full h-auto object-cover" src={CE3QuestDoneImg} />
      </div>
      <h1 className="text-center text-md md:text-xl text-purple-500 pt-12 mb-8">
        Create Quest Tutorial
      </h1>
      <iframe
        className="w-[90%] lg:w-[50%] m-auto h-[400px] mb-8"
        src="https://www.youtube.com/embed/8Ojqnw-8Mnc?si=yt0FDYUMAaVbQG1e"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default CE3_Shops;
