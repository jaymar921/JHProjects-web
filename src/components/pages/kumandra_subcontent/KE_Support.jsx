import { PluginInformation } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackedRedirect } from "../../../lib/analytics";

const ACCENTS = ["amber", "sky", "emerald"];

function KE_Support() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-hand-holding-heart"
          title="Support the developer"
          subtitle="The plugin is free and always has been. This is the part that funds the next version."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          Kumandra&apos;s Economy has no premium build, no paywalled features
          and no licence to buy. If your server makes money off the economy this
          plugin runs, or you just want the port to newer Minecraft versions to
          arrive sooner, a donation is the way to say so.
        </Body>

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
                  onClick={trackedRedirect(PROJECTS.KUMANDRA, {
                    action: CLICK_ACTIONS.DONATE,
                    label: support.title,
                    target: support.link,
                  })}
                >
                  DONATE
                </PixelButton>
              </Panel>
            );
          })}
        </div>
      </Section>

      <Section>
        <Note accent="teal" icon="fa-solid fa-circle-info">
          A donation unlocks nothing, because there is nothing locked. Every
          feature on this page is in the free download, for every server, with
          no player cap and no branding in chat.
        </Note>
      </Section>

      <Section>
        <Panel accent="sky" className="p-6 text-center">
          <Body className="mx-auto max-w-lg">
            Not in a position to donate? Leaving a review on the Spigot listing
            genuinely helps other server owners find it, and costs you nothing
            but a minute.
          </Body>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={PluginInformation.downloadLink}
              accent="amber"
              icon="fa-solid fa-star"
            >
              REVIEW ON SPIGOT
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default KE_Support;
