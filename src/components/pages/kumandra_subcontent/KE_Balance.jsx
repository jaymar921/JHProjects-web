import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

function KE_Balance() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-wallet"
          title="Balance and currency"
          subtitle="The part every economy plugin has. This one asks nothing of you to get it running."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          An account is created the first time a player joins. There is no
          register command, no starter kit to configure and nothing for your
          staff to run. They type{" "}
          <Cmd accent="emerald">/kumandra balance</Cmd> and their money is there.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.economy}
          alt="The Kumandra's Economy balance screen, the currency settings and the admin commands"
          accent="emerald"
          caption="The account screen, the two currency keys, and what an admin can do to a balance"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">WHAT PLAYERS CAN DO</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Open their account with <Cmd accent="emerald">/kumandra balance</Cmd>,
                which also carries the currency exchange.
              </Bullet>
              <Bullet accent="emerald">
                Send money to anyone with{" "}
                <Cmd accent="emerald">/kumandra pay [player] [amount]</Cmd>.
              </Bullet>
              <Bullet accent="emerald">
                Use <Cmd accent="emerald">/kd</Cmd> instead of typing the whole
                command, every time.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">WHAT ADMINS CAN DO</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                Top an account up with{" "}
                <Cmd accent="rose">/kumandra economy [player] deposit [amount]</Cmd>.
              </Bullet>
              <Bullet accent="rose">
                Take money back out with{" "}
                <Cmd accent="rose">/kumandra economy [player] deduct [amount]</Cmd>.
              </Bullet>
              <Bullet accent="rose">
                Wipe a balance to zero with{" "}
                <Cmd accent="rose">/kumandra economy [player] reset</Cmd>.
              </Bullet>
            </Bullets>
            <div className="pt-4">
              <Note accent="amber" icon="fa-solid fa-key">
                Those three sit behind{" "}
                <Cmd accent="amber">kumandraseconomy.kumandra.economy</Cmd>,
                which defaults to op. Everything a player needs defaults to
                everyone.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">NAMING THE MONEY</SubHeading>
        <Body className="pt-3 text-justify">
          Two keys decide what a coin is called and what it is worth. The prefix
          is what players see everywhere the money is shown, and the rate is
          what one coin of your main economy buys, which only matters while the
          plugin is running as a second currency.
        </Body>
        <Terminal title="KumandrasEconomy / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="emerald">[CURRENCY]</TerminalLabel>
              {`
# Leave this true to run beside an economy you already
# have. Set it to false to make Kd the server currency.
Separate_Economy: true

# 1 coin of your main economy = 0.12 Kd
Currency: 0.12
Currency_Prefix: 'Kd'
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-floppy-disk">
          Balances are written back on shutdown and reloaded on start, from
          local YAML by default or from MySQL if you have turned it on. Either
          way a restart does not cost anyone their money.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Balance;
