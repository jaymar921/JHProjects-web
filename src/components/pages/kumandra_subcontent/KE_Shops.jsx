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

function KE_Shops() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-shop"
          title="Public shops"
          subtitle="Build the chest you want your shop to be. The plugin turns it into one."
          accent="teal"
        />
        <Body className="pt-5 text-justify">
          There is no shop config to write and no sign format to memorise. You
          lay out a chest exactly as you want the shop window to look, stand
          next to the shop and clone it in. Then you set the prices through chat,
          one item at a time, and it is open for business.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.shops}
          alt="A Kumandra's Economy shop window and the five commands that build one"
          accent="teal"
          caption="The shop your players see, and the five steps that got it there"
        />
      </Section>

      <Section>
        <Panel accent="teal" className="p-5">
          <SubHeading accent="teal">BUILDING ONE</SubHeading>
          <Steps className="pt-3">
            <Step n="1" accent="teal">
              <Cmd accent="teal">/kumandra shops create [name]</Cmd> puts a shop
              where you are standing and spawns its keeper.
            </Step>
            <Step n="2" accent="teal">
              Build a chest or double chest somewhere and fill it with exactly
              the items, in exactly the order, you want the shop to show. This
              is your prototype.
            </Step>
            <Step n="3" accent="teal">
              Stand within two blocks of the shop and run{" "}
              <Cmd accent="teal">/kumandra shops modify ShopUI clone</Cmd>, then
              open the prototype chest. Its contents are copied in. The cloning
              session lasts 20 seconds.
            </Step>
            <Step n="4" accent="teal">
              Run{" "}
              <Cmd accent="teal">/kumandra shops modify ShopUI price</Cmd> and
              set each item&apos;s price through the chat prompts.
            </Step>
            <Step n="5" accent="teal">
              Done. Players click an item to buy it, and the money comes out of
              their balance.
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">IT REMEMBERS</SubHeading>
            <Body className="pt-3">
              Stock and prices are saved with the shop and restored on reload or
              restart. Your staff build a shop once, not once per server start.
            </Body>
          </Panel>
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">TAKING ONE DOWN</SubHeading>
            <Body className="pt-3">
              <Cmd accent="rose">/kumandra shops delete [name]</Cmd> removes the
              shop and its keeper together, so you are not left with a nameless
              villager standing in an empty plot.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">WHO CAN DO WHAT</SubHeading>
            <Body className="pt-3">
              Seeing and buying from shops sits on{" "}
              <Cmd accent="amber">kumandraseconomy.kumandra.shop</Cmd>, which
              everyone has. Creating, cloning, pricing and deleting sit on{" "}
              <Cmd accent="amber">kumandraseconomy.kumandra.shopAdmin</Cmd>,
              which defaults to op.
            </Body>
          </Panel>
          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">FINDING THEM</SubHeading>
            <Body className="pt-3">
              <Cmd accent="sky">/kumandra shops</Cmd> on its own lists the shops
              near a player and where they are in the world, so a new player can
              find the market without asking in chat.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="rose" icon="fa-solid fa-tag">
          Shops are matched by looking for a nearby keeper with the right name,
          so build them a few blocks apart. Giving every shop a real identifier
          is on the list for the next version.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Shops;
