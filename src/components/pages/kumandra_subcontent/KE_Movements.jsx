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
  Step,
  Steps,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

/**
 * The 2.1 panel: the transaction list, and the Custom Enchantments 3 bridge.
 *
 * They are one panel because they shipped together and because the movement
 * list is the answer to the question the bridge raises. Two plugins spending
 * the same wallet is exactly when "the number got smaller and I do not know
 * why" stops being tolerable.
 */
function KE_Movements() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-list-ul"
          title="Movements, and Custom Enchantments 3"
          subtitle="Both new in 2.1. The movement list works on its own; the rest needs CE3 installed."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Money that left an account through the API left it smaller and left
          nothing behind to say why. If another plugin charged your players, you
          could watch the balance drop and that was the whole story.{" "}
          <Cmd accent="amber">/kumandra balance</Cmd> now carries a Recent
          Movements panel: the last six movements, what each was for, and how
          long ago it happened.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.movements}
          alt="The Kumandra's Economy balance screen showing both currencies and recent movements"
          accent="amber"
          caption="Both wallets on one screen, and the last handful of movements underneath"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">WHAT IS IN THE LIST</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Everything through <Cmd accent="emerald">KumandrasAPI</Cmd>.
              </Bullet>
              <Bullet accent="emerald">Everything through Vault.</Bullet>
              <Bullet accent="emerald">
                <Cmd accent="emerald">/kumandra pay</Cmd> and{" "}
                <Cmd accent="emerald">/kumandra economy</Cmd>.
              </Bullet>
            </Bullets>
          </Panel>
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">WHAT IS DELIBERATELY NOT</SubHeading>
            <Body className="pt-3 text-justify">
              Job wages. They land a few coins at a time on every block a player
              breaks, and six of them would push everything worth reading off
              the list before you got back from mining.
            </Body>
          </Panel>
        </div>
        <div className="pt-5">
          <Note accent="sky" icon="fa-solid fa-clock-rotate-left">
            The list holds twenty movements per account, lives in memory, and
            starts empty after a restart. It answers &quot;where did my money
            just go&quot;, which needs the last handful and nothing older. It is
            not an audit log and it is not trying to be one.
          </Note>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">
          CALLERS THAT SAY NOTHING GET NAMED ANYWAY
        </SubHeading>
        <Body className="pt-3 text-justify">
          This is the part worth understanding. Every integration written
          against the 2.0 API calls a two-argument{" "}
          <Cmd accent="amber">withdraw</Cmd> and has no way to pass a reason.
          Custom Enchantments 3 version 1.6.0 is exactly that case, and it is
          the integration this was asked for. So the plugin works out which
          plugin is on the other end of the call and files the movement under
          that plugin&apos;s name. Attribution works today, rather than after
          every integration ships an update.
        </Body>
        <Terminal title="KumandrasEconomy / your plugin" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="java">
              <TerminalLabel accent="emerald">
                [SAYING WHAT IT WAS FOR]
              </TerminalLabel>
              {`
// The two argument form still works and is not
// deprecated. This one fills in the line the player
// reads, instead of your plugin's name.
api.withdraw(player.getUniqueId(), price,
        "Bought a Sharpness V book");

// Read the list back:
List<Transaction> recent =
        api.getRecentTransactions(uuid);
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-right-left"
          title="Two currencies, one balance screen"
          subtitle="Only when Custom Enchantments 3 is installed. Without it, nothing below exists."
          accent="teal"
        />
        <Body className="pt-5 text-justify">
          A player on a server running both plugins has two wallets and has had
          one balance screen. It listed Custom Enchantments as a supported
          plugin by name and left out the number, which is the less useful half.
          The CE3 balance sits directly under the Kumandra one now, with
          CE3&apos;s own configured currency sign, so a renamed currency shows up
          renamed.
        </Body>
        <Panel accent="teal" className="mt-5 p-5">
          <SubHeading accent="teal">/KUMANDRA CONVERT [AMOUNT]</SubHeading>
          <Body className="pt-3 text-justify">
            Buys Custom Enchantments currency with Kumandra currency. The amount
            is named in CE3&apos;s units, the same way CE3&apos;s own exchange
            screen asks for it, so a player always ends up with a whole number of
            coins rather than whatever their Kd happened to divide into.
          </Body>
          <Steps className="pt-4">
            <Step n="1" accent="teal">
              <Cmd accent="teal">/kumandra convert 40</Cmd> buys 40 RACO.
            </Step>
            <Step n="2" accent="teal">
              The command calls the conversion inside Custom Enchantments 3. It
              does not do its own arithmetic.
            </Step>
            <Step n="3" accent="teal">
              The rate, the fee, the supply cap and the refund on a failed
              purchase all live in CE3&apos;s config, so the two cannot drift
              apart the first time you change a number.
            </Step>
            <Step n="4" accent="teal">
              CE3 not installed? The command says so. Conversion switched off in
              CE3&apos;s config? It says that instead of failing silently.
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">CE3 CURRENCY STAYS IN CE3</SubHeading>
            <Body className="pt-3 text-justify">
              It is capped at 1,250,000 with a price curve driven by how much is
              in circulation. This plugin reads that balance for display and
              asks CE3 to move it. It never holds a copy, because a cap that two
              plugins both enforce is a cap that neither enforces.
            </Body>
          </Panel>
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">
              NOTHING HERE BREAKS YOUR STARTUP
            </SubHeading>
            <Body className="pt-3 text-justify">
              Every CE3 lookup resolves by name, once, through CE3&apos;s own
              class loader, and is allowed to fail. A future CE3 that renames
              something costs you a line on the balance screen and a message from
              the command, not an exception on a screen a player just opened.
            </Body>
          </Panel>
        </div>
        <div className="pt-5">
          <Note accent="teal" icon="fa-solid fa-plug">
            Both plugins are still standalone. Neither depends on the other, and
            neither has a type from the other in its jar. That is deliberate on
            both sides.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default KE_Movements;
