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
} from "../../page_components/PixelUIKit";
import BugReportForm from "../../page_components/BugReportForm";
import { PROJECTS } from "../../../lib/analytics";

const CONTACT_EMAIL = PluginInformation.contactEmail;

/** Economy flavoured examples for the shared form's empty boxes. */
const EXAMPLES = {
  summary: "Delivery parcel vanishes when the courier crosses to the nether",
  expectedBehavior: "The parcel should have arrived, or come back to the sender.",
  steps: `1. Post a parcel from the overworld
2. Have the recipient log in from the nether
3. Open the delivery box`,
  pluginVersion: PluginInformation.version,
  minecraftVersion: "1.21.4",
};

const CONTEXT_HINT =
  "Which system it is (balance, trading, delivery, jobs, quests, shops or storage), YAML or MySQL, whether Vault is installed, and any other economy plugin running alongside.";

/**
 * The report panel.
 *
 * Same shape as the Custom Enchantments 3 one: the form is the main route, and
 * it asks for the things the old email template asked for, one field at a time.
 * The plain email address and the Spigot discussion page stay underneath it,
 * because someone who wants a public thread other server owners can read, or
 * who is here with the API down, should still have a way through.
 */
function KE_BugReport() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-bug"
          title="Found a bug?"
          subtitle={`${PluginInformation.version} covers ${PluginInformation.supportedVersions} from one jar. If your setup is the one it trips over, say so.`}
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          What is already known and already fixed is listed under what is new in{" "}
          {PluginInformation.version} on the main page. What is genuinely useful
          is the thing nobody has hit yet, on your setup, with your plugins.
          Fill in the form below and it lands in the developer&apos;s inbox
          straight away.
        </Body>
      </Section>

      <Section>
        <BugReportForm
          project={PROJECTS.KUMANDRA}
          accent="emerald"
          defaultPluginVersion={PluginInformation.version}
          examples={EXAMPLES}
          contextHint={CONTEXT_HINT}
        />
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">BEFORE YOU SEND</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Check you are on {PluginInformation.version}, the latest build on
              the Spigot listing. A good few reports turn out to be something
              the current jar already fixes.
            </Bullet>
            <Bullet accent="amber">
              Confirm you are inside the supported range,{" "}
              {PluginInformation.supportedVersions}.
            </Bullet>
            <Bullet accent="amber">
              Paste the full stack trace from your server console into the logs
              box. The first few lines are rarely enough.
            </Bullet>
            <Bullet accent="amber">
              Say which system it is: balance, trading, delivery, jobs, quests,
              shops or storage.
            </Bullet>
            <Bullet accent="amber">
              Say whether Vault is installed and which other economy plugin, if
              any, is running alongside it.
            </Bullet>
            <Bullet accent="amber">
              Say whether you are on flat file storage or MySQL. A surprising
              number of reports turn out to be one or the other.
            </Bullet>
            <Bullet accent="amber">
              Leave an email address if you want an answer. Without one the
              report can be read but not replied to.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-comments">
              Not sure it is a bug? Send it anyway. A report that turns out to
              be a config problem usually means the documentation needs work.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">OTHER WAYS TO REACH THE DEVELOPER</SubHeading>
          <Body className="pt-3">
            Prefer a public thread? Post on the plugin&apos;s Spigot discussion
            page, which has the advantage that other server owners see the
            answer too. Or email{" "}
            <a
              className="text-sky-300 underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>{" "}
            directly.
          </Body>
          <div className="pt-5">
            <PixelButton
              as="a"
              href={PluginInformation.discussionLink}
              accent="sky"
              icon="fa-solid fa-comments"
            >
              POST ON SPIGOT
            </PixelButton>
          </div>
          <div className="pt-4">
            <Note accent="rose" icon="fa-solid fa-plug-circle-xmark">
              We do not provide support for third-party plugins. Kumandra&apos;s
              Economy is a standalone plugin and is not responsible for
              compatibility issues caused by another plugin.
            </Note>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default KE_BugReport;
