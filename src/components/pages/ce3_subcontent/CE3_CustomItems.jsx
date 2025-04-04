import React from "react";
import CE3CustomItemImg from "../../../assets/custom_enchants_3/ce3-custom-items.png";

function CE3_CustomItems() {
  return (
    <div className="w-full">
      <div className="w-[90%] m-auto">
        <img
          className="w-[60%] lg:w-[40%] h-auto object-cover m-auto"
          src={CE3CustomItemImg}
        />
      </div>
      <div className="w-[90%] m-auto text-justify py-4 text-xs md:text-lg">
        <h1 className="text-center text-xl md:text-3xl text-yellow-400 pt-4 mb-2 mt-4 select-none">
          Custom Items
        </h1>
        <div className="w-[70%] m-auto">
          <p className="text-justify select-none">
            Custom Items can be modified in the{" "}
            <a
              href="https://github.com/JnH-Projects/Custom-Enchantments-3/blob/main/loot_items/default/LootItems.yml"
              target="_blank"
            >
              LootItems.yml
            </a>
            . Depending on the rarity chance specified in the Plugin Settings.
            You can find it in a chest at a custom loot plots, villages,
            mineshaft and mob spawner.
          </p>
        </div>

        <h1 className="text-center text-xl md:text-3xl text-yellow-400 pt-4 mb-2 mt-4 select-none">
          Treasure Artifacts and abilities
        </h1>
        <div className="w-[70%] m-auto">
          <p className="text-justify select-none">
            Treasure Items cannot be crafted and modified since it's already
            built-in to the plugin. You can find it in a chest at a custom loot
            plots, villages, mineshaft and mob spawner.
          </p>

          <p className="text-justify select-none mt-4">
            You can use the help command for more information about the treasure
            item passive abilities.
          </p>
          <div className="text-center py-2">
            <span className="text-gray-200 font-mono font-bold bg-gray-700 p-1 px-2 rounded-sm">
              /ce help
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CE3_CustomItems;
