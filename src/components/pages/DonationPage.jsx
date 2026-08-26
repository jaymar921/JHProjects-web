import { useEffect } from "react";
import { PluginInformation as CE3Info } from "../contants/custom_enchants_3/CE3Constants";
import { RedirectTo } from "../utils/PageUtility";
import PageFooter from "../page_components/PageFooter";
import { Body, Panel, PixelButton, SectionHeading } from "../page_components/PixelUIKit";

const ACCENTS = ["amber", "sky", "lime"];

function DonationPage() {
  useEffect(() => {
    document.title = "Support JHProjects | Donate";
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0e1014]">
      <style>{`.back-btn{position:absolute;top:10px;left:10px;z-index:60} @media (max-width:640px){.back-btn{top:5px;left:5px}}`}</style>

      <button
        className="back-btn pixel-font rounded border border-slate-600 bg-[rgba(0,0,0,0.6)] px-2 py-1 text-xs sm:text-sm text-slate-200 hover:bg-[rgba(255,255,255,0.03)]"
        onClick={() => (window.location.href = "/")}
        aria-label="Back to home"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Back
      </button>

      <div className="w-full px-4 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            icon="fa-solid fa-heart"
            title="Support the work"
            subtitle="Donations keep JHProjects' plugins, tools and games updated. They're separate from buying a plugin and don't unlock premium."
            accent="rose"
            align="center"
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CE3Info.supportLink.map((support, index) => {
              const accent = ACCENTS[index % ACCENTS.length];
              return (
                <Panel
                  key={support.title}
                  accent={accent}
                  className="flex h-full flex-col p-5 text-center"
                >
                  <h4 className="pixel-font text-[10px] tracking-wider text-slate-200 md:text-xs">
                    {support.title}
                  </h4>
                  <div className="grow py-8">
                    {support.icon ? (
                      <i className={`${support.icon} text-[3em]`}></i>
                    ) : (
                      <img
                        src={support.logo ?? ""}
                        alt={support.title}
                        loading="lazy"
                        className="mx-auto w-16"
                      />
                    )}
                  </div>
                  <PixelButton
                    accent={accent}
                    icon="fa-solid fa-arrow-up-right-from-square"
                    className="w-full"
                    onClick={() => RedirectTo(support.link)}
                  >
                    DONATE
                  </PixelButton>
                </Panel>
              );
            })}
          </div>

          <Body className="pt-8 text-center text-slate-500">
            Thank you for keeping the projects going.
          </Body>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

export default DonationPage;
