import React from "react";
import PiDonate from "../../../assets/custom_enchants_3/pi_donate.jpeg";

function CE3_DonatePi({ setSubcontent }) {
  return (
    <div className="items-center w-[100%]">
      <div className="relative m-auto w-[90%] my-2">
        <p className="text-purple-500">Wallet Address: </p>
        <textarea disabled className="w-[100%] resize-none px-4 text-gray-300">
          {import.meta.env.VITE_PI_WALLET_ADDRESS ?? ""}
        </textarea>
        <img src={PiDonate} />
      </div>
      <div className="text-center py-4">
        <button onClick={() => setSubcontent("support")}>BACK</button>
      </div>
    </div>
  );
}

export default CE3_DonatePi;
