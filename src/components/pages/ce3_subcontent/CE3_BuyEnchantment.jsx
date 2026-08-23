import IMG_CE3_BUY_LEVEL from "../../../assets/custom_enchants_3/other_photo_ce/ce3_buy_level.png";
import IMG_CE3_BUY_RACO from "../../../assets/custom_enchants_3/other_photo_ce/ce3_buy_raco.png";
import IMG_CE3_CONFIG from "../../../assets/custom_enchants_3/other_photo_ce/ce3_config_price.png";
import { racoEconomy as RACO_ART } from "../../../assets/custom_enchants_3/features";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/CE3_UIKit";

const CONFIG_REPO =
  "https://github.com/JnH-Projects/Custom-Enchantments-3/tree/main/config";

function CE3_BuyEnchantment() {
  return (
    <div className="w-full pb-6">
      <Section>
        <div className="flex justify-center pb-4">
          <Chip accent="amber">ADDED IN v1.3.0</Chip>
        </div>
        <Shot
          src={RACO_ART}
          alt="The RACO currency exchange and its market chart"
          accent="amber"
          caption="RACO is the plugin's own currency, with a price players move themselves"
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-coins"
          title="Two ways to pay"
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Every enchantment carries a price you set. Players can pay in vanilla
          Minecraft levels, or in RACO, the currency the plugin runs itself. Set
          a price to <Cmd accent="rose">0</Cmd> and that enchantment stops being
          sold at all.
        </Body>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Shot
            src={IMG_CE3_BUY_LEVEL}
            alt="Buying an enchantment with vanilla Minecraft levels"
            accent="sky"
            caption="Paying with vanilla Minecraft levels"
          />
          <Shot
            src={IMG_CE3_BUY_RACO}
            alt="Buying an enchantment with RACO currency"
            accent="amber"
            caption="Paying with RACO"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-arrow-right-arrow-left"
          title="Where RACO comes from"
          accent="lime"
        />
        <Panel accent="lime" className="mt-6 p-5">
          <Bullets>
            <Bullet accent="lime">
              XP levels convert to CLVL one for one at a Raco Exchange shop.
            </Bullet>
            <Bullet accent="lime">
              CLVL buys RACO at whatever the market price is right now. Buying
              pushes the price up, selling pushes it back down.
            </Bullet>
            <Bullet accent="lime">
              Supply is capped, 1,250,000 coins by default, so the currency
              cannot be inflated away.
            </Bullet>
            <Bullet accent="lime">
              Players can list the item in their hand on a Raco Shop. If a sale
              lands while they are offline, the coins are waiting at their next
              login.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-chart-line">
              Every trade is logged, and every 30 minutes those trades are rolled
              up into hourly candles. The market has a real history you can look
              back on.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-sliders"
          title="Set your prices"
          accent="sky"
        />
        <Panel accent="sky" className="mt-6 p-5">
          <Steps>
            <Step n="1" accent="sky">
              Stop the server first, so nothing overwrites your edit.
            </Step>
            <Step n="2" accent="sky">
              Open <Cmd accent="sky">config.yml</Cmd> inside the
              CustomEnchantments3 folder.
            </Step>
            <Step n="3" accent="sky">
              Find the enchantment list. Life Steal is the first one, priced in
              vanilla levels out of the box.
            </Step>
            <Step n="4" accent="sky">
              Type any number you like to change the price.
            </Step>
            <Step n="5" accent="sky">
              Add a <Cmd accent="amber">C</Cmd> after the number to charge RACO
              instead of levels.
            </Step>
            <Step n="6" accent="sky">
              Save the file and start the server. The new prices load on boot.
            </Step>
          </Steps>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={CONFIG_REPO}
              accent="sky"
              icon="fa-brands fa-github"
            >
              GET A FRESH CONFIG FILE
            </PixelButton>
          </div>
        </Panel>

        <Terminal title="CustomEnchantments3 / config.yml" className="mt-6">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel>[Reading a price]</TerminalLabel>
              {`
life_steal: 55    # costs 55 vanilla Minecraft levels
critical: 25C     # the C suffix means 25 RACO instead
poison: 0         # a price of 0 disables the enchantment
`}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="purple">WHAT IT LOOKS LIKE IN THE FILE</SubHeading>
        <Shot
          className="mt-4"
          src={IMG_CE3_CONFIG}
          alt="An enchantment price line inside config.yml"
          accent="purple"
          caption="A price line in config.yml"
        />
      </Section>
    </div>
  );
}

export default CE3_BuyEnchantment;
