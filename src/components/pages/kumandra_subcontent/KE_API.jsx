import {
  ApiGroups,
  ApiRoutes,
  MigrationNotes,
  ReturnConventions,
  RuntimeNotes,
  SetupSnippets,
  Troubleshooting,
  VaultChanges,
  WorkedExamples,
} from "../../contants/kumandra/KumandraApiGuide";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  IconBadge,
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
 * The full developer API guide.
 *
 * The plugin repository is closed, so there is nowhere else to send anyone.
 * This panel is the documentation, not a summary that points at the real thing:
 * getting the API, every method, what the return values mean, the Vault route,
 * threading, worked examples, migration and troubleshooting.
 *
 * The content is data in contants/kumandra/KumandraApiGuide.js. Anything that
 * changes when the API changes belongs there, not in the markup below.
 */

/** A code block, framed like the rest of the terminals on the page. */
function Snippet({ title, label, code, accent = "emerald", lang }) {
  return (
    <Terminal title={title} className="mt-3">
      <pre>
        <code className="text-[10px] leading-relaxed md:text-sm" lang={lang}>
          {label && <TerminalLabel accent={accent}>{label}</TerminalLabel>}
          {`\n${code}\n`}
        </code>
      </pre>
    </Terminal>
  );
}

/** One method, its return type and what it does. */
function Method({ method, accent }) {
  return (
    <Panel accent={accent} className="p-4">
      <div className="flex flex-wrap place-items-baseline justify-between gap-2">
        <span className="pixel-font text-[9px] break-all text-slate-200 md:text-[11px]">
          {method.signature}
        </span>
        <span className="flex shrink-0 place-items-center gap-2">
          {method.since && <Chip accent="lime">{method.since}</Chip>}
          <span className="pixel-font text-[8px] text-amber-300 md:text-[10px]">
            {method.returns}
          </span>
        </span>
      </div>
      <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
        {method.note}
      </p>
    </Panel>
  );
}

function KE_API() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-code"
          title="Developer API"
          subtitle="Read and move a player's Kumandra balance from your own plugin."
          accent="emerald"
        />
        <Body className="pt-5 text-justify">
          <Cmd accent="emerald">KumandrasAPI</Cmd> is a small deliberate
          surface. No builders, no events to subscribe to. Grab the plugin from
          the plugin manager, ask it for the API, and you are done. Everything
          below applies to <Cmd accent="emerald">2.0</Cmd> and newer. Every 1.x
          method kept its exact signature, so an integration compiled against
          1.7 links against 2.0 unchanged, and the additions are marked{" "}
          <Chip accent="lime">2.0</Chip>.
        </Body>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-book-open">
            This page is the guide. The plugin source is closed, so there is no
            repository copy to go and read instead.
          </Note>
        </div>
      </Section>

      {/* ------------------------------------------------- TWO WAYS IN */}
      <Section>
        <SubHeading accent="emerald">TWO WAYS IN</SubHeading>
        <Body className="pt-3">
          There are two supported ways to move Kumandra money, and which one you
          want depends on what you are building.
        </Body>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                {ApiRoutes.columns.map((column, index) => (
                  <th
                    key={column || `col-${index}`}
                    className="pixel-font px-2 py-2 text-[8px] tracking-wider text-emerald-300 md:text-[10px]"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ApiRoutes.rows.map((row) => (
                <tr
                  key={row.question}
                  className="border-b border-slate-800 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <td className="px-2 py-3 align-top text-[11px] text-slate-300 md:text-xs">
                    {row.question}
                  </td>
                  <td className="px-2 py-3 align-top text-[11px] text-emerald-200 md:text-xs">
                    {row.direct}
                  </td>
                  <td className="px-2 py-3 align-top text-[11px] text-slate-400 md:text-xs">
                    {row.vault}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-5">
          <Body>
            If your plugin is <em>about</em> Kumandra, a jobs add-on, a Kumandra
            shop, a currency display, use <Cmd accent="emerald">KumandrasAPI</Cmd>.
            If it just needs the server&apos;s money and does not care whose it
            is, use Vault and let the server owner decide.
          </Body>
        </div>

        <div className="pt-4">
          <Note accent="amber" icon="fa-solid fa-circle-info">
            Kumandra registers itself as a Vault economy provider when{" "}
            <Cmd accent="amber">Separate_Economy</Cmd> is{" "}
            <Cmd accent="amber">false</Cmd> in config.yml. When it is true,
            Kumandra runs as a secondary currency alongside whatever economy is
            primary, and Vault will not hand you Kumandra balances. Only
            KumandrasAPI will.
          </Note>
        </div>
      </Section>

      {/* ------------------------------------------------ GETTING THE API */}
      <Section>
        <SubHeading accent="sky">GETTING THE API</SubHeading>
        <Steps className="pt-3">
          <Step n="1" accent="sky">
            Declare the soft dependency in your own plugin.yml.
            <Snippet
              title="plugin.yml"
              accent="sky"
              lang="yaml"
              code={SetupSnippets.softdepend}
            />
            <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              <Cmd accent="sky">softdepend</Cmd>, not{" "}
              <Cmd accent="sky">depend</Cmd>, so your plugin still loads on a
              server without Kumandra installed. The soft dependency guarantees
              Kumandra is enabled before you are, so the API is ready by the
              time your onEnable runs.
            </p>
          </Step>

          <Step n="2" accent="sky">
            Compile against it. There is no Maven artifact, so add the plugin
            jar as a system scoped dependency, or drop it in your project&apos;s
            lib folder.
            <Snippet
              title="pom.xml"
              accent="sky"
              lang="xml"
              code={SetupSnippets.maven}
            />
            <Snippet
              title="build.gradle"
              accent="sky"
              lang="groovy"
              code={SetupSnippets.gradle}
            />
          </Step>

          <Step n="3" accent="sky">
            Fetch the API object in onEnable.
            <Snippet
              title="YourPlugin.java"
              label="[GETTING THE API]"
              accent="sky"
              lang="java"
              code={SetupSnippets.fetch}
            />
            <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              The instanceof check does double duty. It covers not installed,
              and installed but a different plugin happens to use that name, and
              it is what stops a ClassCastException from taking your whole
              plugin down at enable.
            </p>
          </Step>
        </Steps>

        <div className="pt-4">
          <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
            Do not hold <Cmd accent="rose">KumandrasAPI.plugin</Cmd>, the public
            static field. It exists for source compatibility with 1.x
            integrations and is deprecated. Fetch the instance from the plugin
            manager, because a static handle goes stale the moment the server
            reloads.
          </Note>
        </div>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.api}
          alt="The KumandrasAPI class and the methods it exposes"
          accent="emerald"
          caption="The shape of it, with the 2.0 additions marked"
        />
      </Section>

      {/* ----------------------------------------------- METHOD REFERENCE */}
      <Section>
        <SubHeading accent="amber">METHOD REFERENCE</SubHeading>
        {ApiGroups.map((group) => (
          <div key={group.key} className="pt-6">
            <div className="flex place-items-center gap-3">
              <IconBadge icon={group.icon} accent={group.accent} />
              <SubHeading accent={group.accent}>{group.title}</SubHeading>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.methods.map((method) => (
                <Method
                  key={method.signature}
                  method={method}
                  accent={group.accent}
                />
              ))}
            </div>

            {group.note && (
              <div className="pt-4">
                <Note accent={group.accent} icon="fa-solid fa-lightbulb">
                  {group.note}
                </Note>
              </div>
            )}
          </div>
        ))}
      </Section>

      {/* ------------------------------------------ RETURN VALUE MEANINGS */}
      <Section>
        <Panel accent="violet" className="p-5">
          <SubHeading accent="violet">
            WHAT THE RETURN VALUES MEAN
          </SubHeading>
          <Body className="pt-3">
            The API never throws for an expected condition. It reports it.
          </Body>
          <Bullets className="pt-3">
            {ReturnConventions.map((entry) => (
              <Bullet key={entry.value} accent="violet">
                <span className="pixel-font pr-2 text-[9px] text-violet-300 md:text-[10px]">
                  {entry.value}
                </span>
                {entry.meaning}
              </Bullet>
            ))}
          </Bullets>
          <Snippet
            title="Checking before you use it"
            accent="violet"
            lang="java"
            code={SetupSnippets.guard}
          />
        </Panel>
      </Section>

      {/* ------------------------------------------------ THE VAULT ROUTE */}
      <Section>
        <SubHeading accent="teal">USING VAULT INSTEAD</SubHeading>
        <Body className="pt-3">
          When <Cmd accent="teal">Separate_Economy: false</Cmd>, Kumandra
          registers a full Vault Economy provider, so the standard Vault flow
          works.
        </Body>
        <Snippet
          title="The Vault route"
          accent="teal"
          lang="java"
          code={SetupSnippets.vault}
        />

        <div className="pt-5">
          <SubHeading accent="teal">
            WHAT 2.0 FIXED ON THE VAULT SIDE
          </SubHeading>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {VaultChanges.map((change) => (
              <Panel key={change.method} accent="teal" className="p-4">
                <p className="pixel-font text-[9px] break-all text-slate-200 md:text-[11px]">
                  {change.method}
                </p>
                <p className="pt-3 text-[11px] leading-relaxed text-teal-200 md:text-xs">
                  <i className="fa-solid fa-check pr-2"></i>
                  {change.now}
                </p>
                <p className="pt-2 text-[11px] leading-relaxed text-slate-500 md:text-xs">
                  <i className="fa-solid fa-clock-rotate-left pr-2"></i>
                  In 1.x: {change.before}
                </p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      {/* -------------------------------------- THREADING AND PERSISTENCE */}
      <Section>
        <SubHeading accent="rose">PERSISTENCE AND THREADING</SubHeading>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {RuntimeNotes.map((entry) => (
            <Panel key={entry.title} accent={entry.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={entry.icon} accent={entry.accent} />
                <SubHeading accent={entry.accent}>{entry.title}</SubHeading>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {entry.body}
              </p>
            </Panel>
          ))}
        </div>
        <Snippet
          title="Hopping back to the main thread"
          accent="rose"
          lang="java"
          code={SetupSnippets.thread}
        />
      </Section>

      {/* --------------------------------------------------- THE EXAMPLES */}
      <Section>
        <SubHeading accent="emerald">WORKED EXAMPLES</SubHeading>
        <div className="pt-2">
          {WorkedExamples.map((example) => (
            <Snippet
              key={example.key}
              title={example.title}
              accent={example.accent}
              lang="java"
              code={example.code}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------ 1.X MIGRATION */}
      <Section>
        <Panel accent="lime" className="p-5">
          <SubHeading accent="lime">MIGRATING FROM 1.X</SubHeading>
          <Body className="pt-3">
            Nothing to change. Every 1.x method keeps its signature and its
            documented return values, and code compiled against 1.7 links
            against 2.0 unchanged. Two things are worth knowing.
          </Body>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {MigrationNotes.map((entry) => (
              <Panel key={entry.title} accent="lime" className="p-4">
                <SubHeading accent="lime">{entry.title}</SubHeading>
                <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                  {entry.body}
                </p>
              </Panel>
            ))}
          </div>
        </Panel>
      </Section>

      {/* --------------------------------------------------- WHEN STUCK */}
      <Section>
        <SubHeading accent="amber">TROUBLESHOOTING</SubHeading>
        <div className="mt-4 flex flex-col gap-3">
          {Troubleshooting.map((entry) => (
            <Panel key={entry.symptom} accent="amber" className="p-4">
              <p className="flex gap-3 text-[11px] leading-relaxed text-amber-200 md:text-xs">
                <i className="fa-solid fa-circle-question pt-0.5"></i>
                <span>{entry.symptom}</span>
              </p>
              <p className="flex gap-3 pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                <i className="fa-solid fa-arrow-turn-up fa-rotate-90 pt-0.5"></i>
                <span>{entry.cause}</span>
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-envelope">
          The API is small enough that most questions have a one line answer. If
          nothing above covers yours, send it through the bug report form on
          this page, or reach the developer on the SpigotMC resource page.
        </Note>
      </Section>
    </div>
  );
}

export default KE_API;
