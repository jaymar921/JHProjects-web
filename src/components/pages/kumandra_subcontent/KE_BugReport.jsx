import { PluginInformation } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Bullet,
  Bullets,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";

const CONTACT_EMAIL = PluginInformation.contactEmail;

function KE_BugReport() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-bug"
          title="Found a bug?"
          subtitle="A 2022 build meeting a 2026 server is exactly the kind of thing worth reporting."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          The rough edges the developer already knows about are listed on the
          roadmap on the main page, and most of them are being worked on. What
          is genuinely useful is the thing nobody has hit yet, on your setup,
          with your plugins.
        </Body>
      </Section>

      <Section>
        <Terminal title="What to include in your report" className="mt-2">
          <pre>
            <code className="text-[10px] md:text-sm" lang="md">
              <TerminalLabel accent="emerald">
                [BUG REPORTING REQUIREMENT]
              </TerminalLabel>
              {`
> DESCRIPTION
  - A clear and concise description of what the bug is.
> EXPECTED BEHAVIOR
  - What you expected to happen instead.
> SCREENSHOT
  - Anything visual helps. Error messages help the most.
> SERVER VERSION
  - Spigot or Paper, and which Minecraft version.
> WHICH SYSTEM
  - Balance, trading, delivery, jobs, quests, shops or storage.
> ADDITIONAL CONTEXT
  - Other plugins, your config, anything unusual.
`}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">BEFORE YOU POST</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Check you are on 1.7, the latest build on the Spigot listing.
            </Bullet>
            <Bullet accent="amber">
              Confirm you are inside the supported range,{" "}
              {PluginInformation.supportedVersions}. A newer Minecraft version
              is a known gap, not a bug, and the port is already on the list.
            </Bullet>
            <Bullet accent="amber">
              Copy the full stack trace from your server console. The first few
              lines are rarely enough.
            </Bullet>
            <Bullet accent="amber">
              Say whether Vault is installed and which other economy plugin, if
              any, is running alongside it.
            </Bullet>
            <Bullet accent="amber">
              Say whether you are on flat file storage or MySQL. A surprising
              number of reports turn out to be one or the other.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-comments">
              Not sure it is a bug? Send it anyway. A report that turns
              out to be a config problem usually means the documentation needs
              work.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">CONTACT BY EMAIL</SubHeading>
          <Body className="pt-3">
            Email{" "}
            <a
              className="text-sky-300 underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>{" "}
            with the template below. It is the most direct way to reach the
            developer.
          </Body>
          <Terminal title="Email template" className="mt-4">
            <pre>
              <code className="text-[10px] leading-relaxed text-slate-300 md:text-sm">
                {`To: ${CONTACT_EMAIL}
Subject: [KUMANDRA BUG] <short description>

Hello,

Plugin version: <version>
Minecraft version: <version>
Server software: <Spigot or Paper>
Storage: <YAML or MySQL>

Description:
<What went wrong>

Expected behavior:
<What should have happened>

Steps to reproduce:
1. <Step one>
2. <Step two>

Other plugins and relevant context:
<Include only details that may affect the issue>

Logs or screenshots:
<Attach the full error or screenshots>

Thank you.`}
              </code>
            </pre>
          </Terminal>
        </Panel>
      </Section>

      <Section>
        <Panel accent="rose" className="p-6 text-center">
          <Body className="mx-auto max-w-lg">
            You can also post on the plugin&apos;s Spigot discussion page, which
            has the advantage that other server owners see the answer too.
          </Body>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={PluginInformation.discussionLink}
              accent="rose"
              icon="fa-solid fa-comments"
            >
              POST ON SPIGOT
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default KE_BugReport;
