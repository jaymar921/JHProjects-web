import { PluginInformation } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Bullet,
  Bullets,
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
 * The 2.0 panel. This is the one people will open first after an update
 * notice, so it leads with the bug that caused the rest rather than with a
 * feature list.
 */
function KE_WhatsNew() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-rocket"
          title="Version 2.0"
          subtitle={`Released ${PluginInformation.versionReleaseDate}. One jar, ${PluginInformation.supportedVersions}.`}
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          Kumandra&apos;s Economy was written for 1.16 and it had been quietly
          falling behind ever since. If you were running it on 1.19 or later,
          you were running a version of the plugin that thought your server was
          older than 1.16 and turned things off because of it. 2.0 fixes that at
          the root, and the rest of this list is what turned up while going
          through the whole plugin to get there.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.whatsnew}
          alt="What version 2.0 of Kumandra's Economy changed, before and after"
          accent="rose"
          caption="The short version, in the order the problems mattered"
        />
      </Section>

      <Section>
        <Panel accent="rose" className="p-5">
          <SubHeading accent="rose">THE BUG THAT STARTED ALL OF IT</SubHeading>
          <Body className="pt-3 text-justify">
            The old version checked your server version by asking whether the
            version text contained <Cmd accent="rose">1.16</Cmd>,{" "}
            <Cmd accent="rose">1.17</Cmd> or <Cmd accent="rose">1.18</Cmd>. A
            1.19 server contains none of those. Neither does 1.20, 1.21 or 26.2.
            So the plugin concluded it was running on something older than 1.16,
            and silently switched off:
          </Body>
          <Bullets className="pt-3">
            <Bullet accent="rose">The entire quest system.</Bullet>
            <Bullet accent="rose">
              Nether logs for the Lumberjack, so warped and crimson stems paid
              nothing.
            </Bullet>
            <Bullet accent="rose">
              The Fisherman&apos;s rare catch effects.
            </Bullet>
          </Bullets>
          <Body className="pt-3 text-justify">
            Nothing in the console said so. 2.0 reads the version as numbers and
            compares them, so a Minecraft release that did not exist when the
            jar was built is still correctly treated as newer than 1.16. That is
            what makes the whole 1.16 to 26.2 range work from one file, and it
            is what keeps it working for the release after this one.
          </Body>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="emerald">EVERYTHING THAT CHANGED</SubHeading>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {PluginInformation.whatsNew.map((item) => (
            <Panel key={item.title} accent={item.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={item.icon} accent={item.accent} />
                <SubHeading accent={item.accent}>
                  {item.title.toUpperCase()}
                </SubHeading>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {item.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">THE THREE WAYS TO RUN IT NOW</SubHeading>
        <Body className="pt-3 text-justify">
          Vault used to be a hard dependency, which meant installing a second
          plugin just to use Kumandra&apos;s own currency on a server that had
          no other economy. That is gone.
        </Body>
        <Terminal title="KumandrasEconomy / startup.log" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="md">
              <TerminalLabel accent="emerald">[VAULT INSTALLED]</TerminalLabel>
              {`
Separate_Economy: false
  Registers as the Vault economy provider.
  Every Vault-aware plugin sees Kd as the money.

Separate_Economy: true
  Reads the primary economy, and the exchange
  screen converts between the two at your rate.
              `}
              <TerminalLabel accent="rose">[NO VAULT AT ALL]</TerminalLabel>
              {`
Everything works except the exchange screen,
which needs a second economy to exchange with
in the first place.
              `}
            </code>
          </pre>
        </Terminal>
        <div className="pt-5">
          <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
            If <Cmd accent="amber">Separate_Economy</Cmd> is true but nothing
            has actually registered a primary economy, the plugin now says so in
            the console and runs as primary for that session, instead of half
            working in silence.
          </Note>
        </div>
      </Section>

      <Section>
        <Panel accent="teal" className="p-5">
          <SubHeading accent="teal">UPGRADING FROM 1.x</SubHeading>
          <Steps className="pt-3">
            <Step n="1" accent="teal">
              Drop the new jar in and restart. That is the whole procedure.
            </Step>
            <Step n="2" accent="teal">
              Your <Cmd accent="teal">config.yml</Cmd> is upgraded in place and
              backed up as <Cmd accent="teal">old_config.yml</Cmd> first, so
              your settings are kept and new settings arrive with their
              defaults.
            </Step>
            <Step n="3" accent="teal">
              <Cmd accent="teal">playerData.yml</Cmd> and shop data are
              unchanged in format, so there is nothing to migrate.
            </Step>
            <Step n="4" accent="teal">
              Vault can stay installed or be removed. Both work.
            </Step>
          </Steps>
          <div className="pt-4">
            <Note accent="emerald" icon="fa-solid fa-wand-magic-sparkles">
              If you were on 1.19 or newer, expect quests to start appearing.
              They were switched off before, and they were in the jar the whole
              time.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-code">
          Nothing breaks for developers. Every 1.x method keeps its signature
          and its return values, and code compiled against 1.7 links against 2.0
          unchanged. The new methods sit alongside the old ones.
        </Note>
      </Section>
    </div>
  );
}

export default KE_WhatsNew;
