import { PluginInformation } from "../../contants/epic_mobs_rework/EMRConstants";
import { RedirectTo } from "../../utils/PageUtility";
import {
  Body,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackClick } from "../../../lib/analytics";

/**
 * Donations. Separate from buying the plugin, and it says so at the bottom,
 * because somebody who wants the full build should not be able to leave here
 * thinking they have paid for it.
 */
const ACCENTS = ["amber", "sky", "lime"];

function EMR_Support({ setSubcontent }) {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-heart"
          title="Support the developer"
          subtitle="Already running it? A donation keeps the updates coming."
          accent="rose"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PluginInformation.supportLink.map((support, index) => {
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
                  onClick={() => {
                    trackClick(PROJECTS.EPIC_MOBS_REWORK, {
                      action: CLICK_ACTIONS.DONATE,
                      label: support.title,
                      target: support.link,
                    });

                    return support.link
                      ? RedirectTo(support.link)
                      : support.onClick?.(setSubcontent);
                  }}
                >
                  DONATE
                </PixelButton>
              </Panel>
            );
          })}
        </div>

        <Body className="pt-6 text-center text-slate-500">
          Donations are separate from buying the plugin. They do not unlock the
          full build.
        </Body>
      </Section>
    </div>
  );
}

export default EMR_Support;
