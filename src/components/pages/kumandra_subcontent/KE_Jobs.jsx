import { JobFixes, Jobs } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Cmd,
  IconBadge,
  KeyValue,
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

function KE_Jobs() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-helmet-safety"
          title="Seven jobs"
          subtitle="Your players already mine, farm, build and fish. This pays them for it."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          There is no grind command and nothing to AFK. A job pays per action,
          on the actions players were doing anyway, which means the money supply
          on your server grows in step with how much people actually play. The
          job timers were also running seven times over until 2.0, so income
          expired far faster than the config said. That is fixed.
          Joining takes one command and a click.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.jobs}
          alt="The seven Kumandra's Economy jobs and what each one pays per action"
          accent="emerald"
          caption="All seven, with the default pay per action in Kd"
        />
      </Section>

      <Section>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Jobs.map((job) => (
            <Panel key={job.name} accent={job.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={job.icon} accent={job.accent} />
                <SubHeading accent={job.accent}>
                  {job.name.toUpperCase()}
                </SubHeading>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {job.earns}
              </p>
              <div className="mt-3 border-t border-slate-800 pt-3">
                {job.rates.map((rate) => (
                  <KeyValue
                    key={rate.key}
                    label={rate.key}
                    value={rate.value}
                    accent="amber"
                  />
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">JOINING</SubHeading>
            <Body className="pt-3">
              <Cmd accent="emerald">/kumandra jobs</Cmd> opens the screen.
              Click a job to join it, click it again to leave. Players hold two
              at a time by default, which the <Cmd accent="emerald">Jobs</Cmd>{" "}
              key controls. Some jobs show extra detail on a shift click.
            </Body>
          </Panel>
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">TUNING THE PAY</SubHeading>
            <Body className="pt-3">
              Every value above is a decimal in config.yml. Halve them all for a
              tighter economy, or raise one job to push players toward the work
              your server actually needs doing.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">WHICH BLOCKS COUNT</SubHeading>
        <Body className="pt-3 text-justify">
          Miner and Builder both read a block list, so you decide what pays. The
          mining list ships with 1.17 blocks left out on purpose, so the same
          file still works on a 1.16 server. Add whatever you like from the
          Spigot material list. A material name your server does not have is
          named in the log now instead of being dropped silently, which helps
          when you move a config between an old server and a modern one.
        </Body>
        <Terminal title="KumandrasEconomy / config.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="emerald">[JOB BLOCK LISTS]</TerminalLabel>
              {`
ConsideredMiningBlocks:
  - STONE
  - DIORITE
  - ANDESITE
  - GRANITE
  - PRISMARINE

# before 2.0 this list was being filled into the
# block list above, so it started empty and every
# ore paid the plain block rate
ConsideredMiningOres:
  - COAL_ORE
  - IRON_ORE
  - GOLD_ORE
  - DIAMOND_ORE
  - EMERALD_ORE
  - NETHER_GOLD_ORE
  - NETHER_QUARTZ_ORE

# DEFAULT means every block pays a Builder
ConsideredBlocksForBuilding:
  - DEFAULT
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="rose">FIXED IN 2.0</SubHeading>
        <Body className="pt-3 text-justify">
          Three of these settings had been costing you money. If you are
          upgrading from 1.x, these are the numbers that start behaving the way
          your config always said they should.
        </Body>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {JobFixes.map((fix) => (
            <Panel key={fix.key} accent="rose" className="p-4">
              <SubHeading accent="rose">{fix.key}</SubHeading>
              <p className="pt-3 text-[11px] leading-relaxed text-rose-300/80 md:text-xs">
                <i className="fa-solid fa-xmark pr-2"></i>
                {fix.was}
              </p>
              <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                <i className="fa-solid fa-check pr-2 text-emerald-400"></i>
                {fix.now}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Note accent="teal" icon="fa-solid fa-code">
          Your own plugin can read a player&apos;s jobs through{" "}
          <Cmd accent="teal">api.getJobs(player)</Cmd>, which returns the
          JobList entries they currently hold, or ask about one job with{" "}
          <Cmd accent="teal">api.hasJob(player, JobList.MINER)</Cmd>. Neither
          throws for a player with no record any more.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Jobs;
