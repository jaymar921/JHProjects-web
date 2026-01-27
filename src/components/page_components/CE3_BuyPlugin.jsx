import React from "react";
import { RedirectTo } from "../utils/PageUtility";
import { PluginInformation } from "../contants";

function CE3_BuyPlugin({ setSubcontent }) {
  return (
    <div>
      <div className="md:grid gap-4 grid-cols-3">
        {PluginInformation.buyLink.map((buyData) => {
          return (
            <div
              key={Math.random() * 9999}
              className="border-2 h-full border-gray-600 rounded-xl w-full bg-[rgba(0,0,0,0.3)] p-4 m-auto mt-4 shadow-xl"
            >
              <h1 className="text-center">{buyData.title}</h1>
              <div className="text-center p-8">
                {buyData.icon ? (
                  <i className={`${buyData.icon} text-[4em] m-auto`}></i>
                ) : (
                  <img
                    src={buyData.logo ?? ""}
                    className="w-[64px] text-[4em] m-auto"
                  />
                )}
              </div>
              <div className="text-center">
                <button
                  onClick={() =>
                    buyData.link
                      ? RedirectTo(buyData.link)
                      : buyData.onClick?.(setSubcontent)
                  }
                >
                  BUY
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CE3_BuyPlugin;
