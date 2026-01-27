import React from "react";
import { RedirectTo } from "../../utils/PageUtility";
import { PluginInformation } from "../../contants";

function CE3_BUY_PayPal() {
  return (
    <div className="p-8">
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 1: </span>Click the button below
          to open PayPal
        </h1>
        <div className="text-center my-4">
          <button
            className="rounded-xl bg-slate-800!"
            onClick={() => RedirectTo(PluginInformation.paypalPaymentLink)}
          >
            Payment Link
          </button>
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 2: </span>Click on Send button
        </h1>
      </div>
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 3: </span>Set the details
        </h1>
        <p className="mx-4">
          Price: <a className="text-green-500!">{PluginInformation.price}</a>
        </p>
        <p className="mx-4">
          What's this for?{" "}
          <a className="text-green-500!">
            Custom Enchantments 3 Plugin Payment
          </a>
        </p>
        <p className="mx-4 text-red-400">
          (PLEASE REVIEW THROUGHLY! THERE IS NO REFUND!)
        </p>
      </div>
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 4: </span>Pay and Screenshot
          receipt
        </h1>
      </div>
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 5: </span>Create an Email
        </h1>
        <p className="mx-4">
          Recipient: <a className="text-green-500!">marstrip921@gmail.com</a>
        </p>
        <p className="mx-4">
          Subject:{" "}
          <a className="text-green-500!">
            Custom Enchantments 3 Plugin Payment
          </a>
        </p>
        <p className="mx-4">Body:</p>
        <p className="mx-8 text-green-500">PAID BY: {"{ YOUR NAME }"}</p>
        <p className="mx-8 text-green-500">
          TRANSACTION ID: {"{ TRANSACTION_ID }"}
        </p>
        <p className="mx-8 text-green-500">
          PAYMENT DATE: {"{ DATE OF PAYMENT }"}
        </p>
        <p className="mx-8 text-green-500">
          SPIGOT USERNAME: {"{ YOUR_SPIGOT_USERNAME }"}
        </p>
        <p className="mx-8 text-green-500">
          SCREENSHOT: {"{ PROOF OF PAYMENT SCREENSHOT }"}
        </p>
      </div>
      <div className="my-2">
        <h1 className="text-sm">
          <span className="text-amber-200">Step 5: </span>Send and Wait for
          Confirmation
        </h1>
      </div>
    </div>
  );
}

export default CE3_BUY_PayPal;
