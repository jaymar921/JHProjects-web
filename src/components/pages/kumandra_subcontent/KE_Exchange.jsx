import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

const KNOWN_ECONOMIES = [
  "EssentialsX",
  "CraftConomy3",
  "GemsEconomy",
  "iConomy",
  "BOSEconomy",
  "MultiCurrency",
  "MineConomy",
  "eWallet",
  "CurrencyCore",
  "Gringotts",
];

function KE_Exchange() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-right-left"
          title="Primary or secondary"
          subtitle="You do not have to throw away the economy you already run."
          accent="teal"
        />
        <Body className="pt-5 text-justify">
          Most economy plugins want to be the only one on the server. This one
          does not care. It can sit beside whatever you already have and
          exchange into it at a rate you pick, it can drop the middleman and
          become the server currency itself, or it can run on a server with no
          Vault installed at all. The first two are a single line in{" "}
          <Cmd accent="teal">config.yml</Cmd>. The third is new in 2.0.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.exchange}
          alt="How Kumandra's Economy bridges through Vault into an existing economy plugin"
          accent="teal"
          caption="Kd goes through Vault at your rate, replaces the middle of that diagram, or skips it"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="teal" className="p-5">
            <SubHeading accent="teal">SECONDARY, THE DEFAULT</SubHeading>
            <Body className="pt-3">
              <Cmd accent="teal">Separate_Economy: true</Cmd>
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="teal">
                Kd becomes a second currency your players earn through jobs,
                quests, shops and trading.
              </Bullet>
              <Bullet accent="teal">
                The exchange screen converts between Kd and your main currency
                at the <Cmd accent="teal">Currency</Cmd> rate.
              </Bullet>
              <Bullet accent="teal">
                Nothing about your existing economy changes. Its balances, its
                shops and its commands all carry on.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">PRIMARY</SubHeading>
            <Body className="pt-3">
              <Cmd accent="emerald">Separate_Economy: false</Cmd>
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Kd becomes the server currency, and the exchange rate stops
                being used.
              </Bullet>
              <Bullet accent="emerald">
                Everything the plugin ships with, jobs through shops, feeds that
                one balance.
              </Bullet>
              <Bullet accent="emerald">
                Other plugins can ask which mode you are in through{" "}
                <Cmd accent="emerald">api.primaryEconomy()</Cmd>.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">WHAT IT KNOWS HOW TO TALK TO</SubHeading>
        <Body className="pt-3 text-justify">
          Vault does the translating, so anything Vault supports works. These
          are the ones named in the plugin&apos;s own configuration notes and
          soft dependencies:
        </Body>
        <div className="flex flex-wrap gap-2 pt-4">
          {KNOWN_ECONOMIES.map((name) => (
            <Chip key={name} accent="amber">
              {name}
            </Chip>
          ))}
        </div>
        <div className="pt-5">
          <Note accent="emerald" icon="fa-solid fa-plug">
            Vault is optional as of 2.0. It moved out of{" "}
            <Cmd accent="emerald">depend</Cmd>, so a server with no economy
            plugin at all can run this on its own. With Vault installed nothing
            changes; without it, everything works except the exchange screen,
            which needs a second economy to exchange with anyway.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default KE_Exchange;
