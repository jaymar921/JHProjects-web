import React from "react";
import CE3_LOGO from "../../../assets/custom_enchants_3/ce3-logo.png";

function CE3_Settings() {
  return (
    <div>
      <div className="w-[20%] m-auto border-2 border-gray-800 p-4 rounded-xl mt-8 select-none">
        <img src={CE3_LOGO} />
      </div>
      <h1 className="text-center text-xl md:text-3xl text-yellow-400 pt-4 mb-2 mt-4 select-none">
        Custom Enchantments Settings
      </h1>
      <div className="w-[70%] m-auto">
        <p className="text-justify select-none">
          You can download the default plugin settings or contribute a custom
          plugin settings for others to use
        </p>

        <div className="text-center p-8">
          <a
            className="border-b-2 p-2 border-white cursor-pointer text-lg"
            href="https://github.com/JnH-Projects/Custom-Enchantments-3"
            target="_blank"
          >
            <i class="fa-brands fa-github text-white"></i> Github Link
          </a>
        </div>
      </div>
    </div>
  );
}

export default CE3_Settings;
