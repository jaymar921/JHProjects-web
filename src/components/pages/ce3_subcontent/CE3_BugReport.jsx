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
} from "../../page_components/CE3_UIKit";
import { PluginInformation } from "../../contants";

const NEW_ISSUE =
  "https://github.com/JnH-Projects/Custom-Enchantments-3/issues/new/choose";
const CONTACT_EMAIL = PluginInformation.payment.contactEmail;

function CE3_BugReport() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-bug"
          title="Found a bug?"
          subtitle="Version 1.4.0 shipped 16 fixes that all started as reports like yours."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          If something is broken, the fastest way to get it fixed is to tell the
          developer exactly what happened. A good report usually gets turned
          around in a release or two.
        </Body>
      </Section>

      <Section>
        <Terminal title="What to include in your report" className="mt-2">
          <pre>
            <code className="text-[10px] md:text-sm" lang="md">
              <TerminalLabel>[BUG REPORTING REQUIREMENT]</TerminalLabel>
              {`
> DESCRIPTION
  - A clear and concise description of what the bug is.
> EXPECTED BEHAVIOR
  - What you expected to happen instead.
> SCREENSHOT
  - Anything visual helps. Error messages help the most.
> SERVER VERSION
  - Lets the developer track down a version specific bug.
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
              Check you are on the latest build. Quite a few reports turn out to
              be something already fixed.
            </Bullet>
            <Bullet accent="amber">
              Copy the full stack trace from your server console if there is
              one. The first few lines are rarely enough.
            </Bullet>
            <Bullet accent="amber">
              Mention whether you are on Spigot or Paper, and which Minecraft
              version.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-comments">
              Not sure it is a bug? Open an issue anyway. A question that turns
              out to be a config problem is still useful, since it usually means
              the docs need work.
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
            with the template below when you need to contact the developer
            directly.
          </Body>
          <Note accent="rose" icon="fa-solid fa-plug-circle-xmark">
            We do not provide support for third-party plugins. Custom
            Enchantments 3 is a standalone plugin and is not responsible for
            compatibility issues caused by another plugin.
          </Note>
          <Terminal title="Email template" className="mt-4">
            <pre>
              <code className="text-[10px] leading-relaxed text-slate-300 md:text-sm">
                {`To: ${CONTACT_EMAIL}
Subject: [CE3 BUG] <short description>

Hello,

Plugin version: <version>
Minecraft version: <version>
Server software: <Spigot or Paper>

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
            Reports go through GitHub Issues, where you can follow along and see
            when the fix lands.
          </Body>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={NEW_ISSUE}
              accent="rose"
              icon="fa-brands fa-github"
            >
              OPEN A NEW ISSUE
            </PixelButton>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default CE3_BugReport;
