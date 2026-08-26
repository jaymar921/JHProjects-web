import { ApiMethods } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
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

function KE_API() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-code"
          title="Developer API"
          subtitle="Read and move a player's balance from your own plugin."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          <Cmd accent="emerald">KumandrasAPI</Cmd> is a small deliberate
          surface. No builders, no events to subscribe to. Grab the plugin from
          the plugin manager, ask it for the API, and you are done. 2.0 added
          offline-capable balance methods and an all-or-nothing transfer, and
          every 1.x method kept its exact signature, so an integration compiled
          against 1.7 links against 2.0 unchanged.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.api}
          alt="The KumandrasAPI class and the methods it exposes"
          accent="emerald"
          caption="The shape of it, with the 2.0 additions marked"
        />
      </Section>

      <Section>
        <Terminal title="YourPlugin.java" className="mt-2">
          <pre>
            <code className="text-[10px] md:text-sm" lang="java">
              <TerminalLabel accent="emerald">[GETTING THE API]</TerminalLabel>
              {`
KumandrasEconomy plugin = (KumandrasEconomy) Bukkit
    .getPluginManager()
    .getPlugin("KumandrasEconomy");

KumandrasAPI api = plugin.getApi();
api.RegisterPlugin("YourPlugin");

double balance = api.getBalance(player);
api.deposit(player, 100.0);
api.withdraw(player, 25.0);

if (api.primaryEconomy()) {
    // Kd is this server's main currency
}

JobList[] jobs = api.getJobs(player);

// new in 2.0, and these work for a player
// who is not currently online
api.transfer(fromUuid, toUuid, 50.0);
api.setBalance(uuid, 250.0);

if (api.hasJob(player, JobList.MINER)) {
    // pay a mining bonus
}
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="amber">THE METHODS</SubHeading>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {ApiMethods.map((method) => (
            <Panel key={method.signature} accent="amber" className="p-4">
              <div className="flex flex-wrap place-items-baseline justify-between gap-2">
                <span className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                  {method.signature}
                </span>
                <span className="pixel-font text-[8px] text-amber-300 md:text-[10px]">
                  {method.returns}
                </span>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {method.note}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-plug">
          Add <Cmd accent="sky">softdepend: [KumandrasEconomy]</Cmd> to your own
          plugin.yml so your plugin loads after this one. Call it from the main
          server thread, and check the balance methods&apos; return values: they
          report false, or -1.0, when the player has no account loaded rather
          than throwing. A <Cmd accent="sky">-1.0</Cmd> means no account, not a
          zero balance.
        </Note>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-book">
          There is a full guide in the plugin repository at{" "}
          <Cmd accent="emerald">docs/developer-api-guide.md</Cmd>. It covers
          getting the API, every method, what the return values mean, threading
          and persistence, worked examples and troubleshooting. If that still
          does not answer your question, email the developer and ask.
        </Note>
      </Section>
    </div>
  );
}

export default KE_API;
