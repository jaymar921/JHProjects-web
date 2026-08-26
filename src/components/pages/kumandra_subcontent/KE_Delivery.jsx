import { DeliveryTiers } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

function KE_Delivery() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-truck-fast"
          title="Send it by courier"
          subtitle="Four speeds, four prices, and a live entity that actually flies it over."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          A player picks a recipient, drops the parcel into the delivery screen
          and pays for a speed. A courier entity spawns, climbs, crosses the
          distance and comes down on the recipient, who gets a message when it
          lands. It is a money sink that your players will use for fun, which is
          the best kind.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.delivery}
          alt="The four Kumandra's Economy delivery tiers and the path a courier takes"
          accent="sky"
          caption="Cheap through Priority, with the default timers and prices from config.yml"
        />
      </Section>

      <Section>
        <SubHeading accent="sky">THE FOUR SPEEDS</SubHeading>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {DeliveryTiers.map((tier) => (
            <Panel key={tier.name} accent={tier.accent} className="p-4">
              <div className="flex place-items-baseline justify-between gap-2">
                <SubHeading accent={tier.accent}>
                  {tier.name.toUpperCase()}
                </SubHeading>
                <span className="pixel-font text-[9px] text-amber-300 md:text-[11px]">
                  {tier.price}
                </span>
              </div>
              <p className="pixel-font pt-3 text-[10px] text-slate-300 md:text-xs">
                {tier.timer}
              </p>
              <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {tier.note}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">HOW TO SEND ONE</SubHeading>
            <Body className="pt-3">
              <Cmd accent="emerald">/kumandra deliver [player]</Cmd> opens the
              screen for that recipient. Put the items in, pick a speed, pay,
              and the courier leaves.
            </Body>
          </Panel>
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">PRICE IT YOURSELF</SubHeading>
            <Body className="pt-3">
              Every timer and every price is a config key. Make Priority
              genuinely painful on an economy server, or flatten the four tiers
              into something cheap and cheerful on a casual one.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="teal" icon="fa-solid fa-globe">
          The delivery flow is built to cope with the sender and the recipient
          being in different worlds, so a parcel posted from the Nether still
          finds its way.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Delivery;
