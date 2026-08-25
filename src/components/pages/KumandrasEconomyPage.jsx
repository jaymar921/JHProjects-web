import { useEffect } from "react";
import {
  PluginInformation,
  Features,
  Kumandra_Logs,
} from "../contants/kumandra/KumandraConstants";
import { RedirectTo } from "../utils/PageUtility";
import Changelog from "./ce3_subcontent/component/Changelog";
import PageFooter from "../page_components/PageFooter";
import kumIcon from "../../assets/kumandras_economy/kumandra-icon.jpg";

function KumandrasEconomyPage() {
  useEffect(() => {
    document.title = "Kumandra's Economy";
  }, []);

  const isPageOnly =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("page_only") === "true";

  return (
    <div className="w-full">
      <style>{`.back-btn{position:absolute;top:10px;left:10px;z-index:60} @media (max-width:640px){.back-btn{top:5px;left:5px}}`}</style>

      {!isPageOnly && (
        <button
          className="back-btn pixel-font rounded border border-slate-600 bg-[rgba(0,0,0,0.6)] px-2 py-1 text-xs sm:text-sm text-slate-200 hover:bg-[rgba(255,255,255,0.03)]"
          onClick={() => (window.location.href = "/")}
          aria-label="Back to home"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back
        </button>
      )}

      <header className="w-full py-16 bg-gradient-to-b from-[#0b2240] to-[#071425] text-center">
        <img
          src={kumIcon}
          alt="Kumandra logo"
          className="mx-auto h-28 w-28 rounded-lg object-cover shadow-lg"
        />
        <h1 className="text-3xl font-bold text-sky-300 mt-4">
          {PluginInformation.title}
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          {PluginInformation.subtitle}
        </p>
        <div className="mt-4">
          <button
            onClick={() => RedirectTo(PluginInformation.downloadLink)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download v{PluginInformation.version}
          </button>
        </div>
      </header>

      <main className="w-full px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <section>
            <h2 className="text-xl font-semibold text-slate-200">Features</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {Features.map((f) => (
                <div
                  key={f.key}
                  className="rounded border p-3 bg-[rgba(255,255,255,0.02)]"
                >
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h3 className="font-semibold text-slate-100">{f.title}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-200">Changelog</h2>
            <div className="mt-4 space-y-3">
              {Kumandra_Logs.map((log) => (
                <Changelog
                  key={log.update_version}
                  log={log}
                  isLatest={log.update_version === PluginInformation.version}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

export default KumandrasEconomyPage;
