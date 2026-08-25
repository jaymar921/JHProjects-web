import React from "react";
import { PluginInformation as CE3Info } from "../contants/custom_enchants_3/CE3Constants";
import { RedirectTo } from "../utils/PageUtility";

function DonationPage() {
  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl font-bold">Support the projects</h1>
        <p className="text-sm text-slate-400 mt-2">
          Choose a donation method to support JayMar921
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border rounded p-6">
            <h3 className="font-semibold">Wise</h3>
            <p className="text-xs text-slate-500 mb-4">
              Fast international transfers
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => RedirectTo(CE3Info.payment.wise.link)}
            >
              Open Wise
            </button>
          </div>

          <div className="border rounded p-6">
            <h3 className="font-semibold">PayPal</h3>
            <p className="text-xs text-slate-500 mb-4">PayPal Me: JayMar921</p>
            <button
              className="px-4 py-2 bg-sky-600 text-white rounded"
              onClick={() => RedirectTo(CE3Info.payment.paypal.link)}
            >
              Open PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
