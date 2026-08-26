import {
  Body,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

function KE_Trading() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-handshake"
          title="Trading, without the trust"
          subtitle="Nobody has to drop their diamonds first and hope."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          The oldest scam on a survival server is the one where somebody drops
          their side of the deal and the other player runs. A trade here happens
          in a window that holds both sides at once. Items go in, a price goes
          on, and nothing moves until both players confirm.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.trading}
          alt="The Kumandra's Economy trading window, with both offers, the price controls and the request timer"
          accent="amber"
          caption="Their goods on the left, your money on the right, and a request that lapses if nobody answers"
        />
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">HOW A TRADE GOES</SubHeading>
          <Steps className="pt-3">
            <Step n="1" accent="amber">
              One player runs{" "}
              <Cmd accent="amber">/kumandra trade [player]</Cmd>. The other gets
              a request in chat.
            </Step>
            <Step n="2" accent="amber">
              They answer with <Cmd accent="amber">/ktrade accept</Cmd> or{" "}
              <Cmd accent="amber">/ktrade deny</Cmd>. Ignore it and it lapses on
              its own.
            </Step>
            <Step n="3" accent="amber">
              The trade window opens for both of them. The seller places items,
              the buyer sees them appear as they go in.
            </Step>
            <Step n="4" accent="amber">
              The price is set inside the window and moves in steps of{" "}
              <Cmd accent="amber">TradingIncreaseValue</Cmd>, so it can be
              haggled without anyone leaving the screen.
            </Step>
            <Step n="5" accent="amber">
              Both sides confirm. The money comes out of the buyer&apos;s
              balance, the items go across, and the window closes.
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">THE REQUEST TIMER</SubHeading>
            <Body className="pt-3">
              A request stands for{" "}
              <Cmd accent="rose">RequestTradingSessionExpiry</Cmd> seconds, 20
              by default. Raise it if your players are the sort to alt-tab, drop
              it if you would rather requests did not pile up.
            </Body>
          </Panel>
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">THE RULES IT ENFORCES</SubHeading>
            <Body className="pt-3">
              The buyer has to actually have the money before the trade will
              complete. The window refuses clicks on slots that are not yours to
              touch. Close it early and the trade ends rather than half
              completing.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-triangle-exclamation">
          Sessions are held in memory in this build, so a server reload during
          an open trade can leave a stale request behind. Making both trade and
          delivery sessions survive a restart is on the list for the next
          version.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Trading;
