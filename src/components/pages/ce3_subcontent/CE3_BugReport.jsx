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
import { PluginInformation } from "../../contants";
import { PROJECTS } from "../../../../shared/projects";

const NEW_ISSUE =
  "https://github.com/JnH-Projects/Custom-Enchantments-3/issues/new/choose";
const CONTACT_EMAIL = PluginInformation.payment.contactEmail;

/**
 * The report panel.
 *
 * The form is the main route now. The GitHub issue and the plain email address
 * are still here underneath it, because someone who would rather have a public
 * thread to follow, or who is reading this with the API down, should not be
 * left without a way through.
 *
 * The old "what to include" and "email template" blocks are gone. The form
 * asks for those things directly, one field at a time, which is the whole
 * reason for having it.
 */
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
          developer exactly what happened. Fill in the form below and it lands
          in the developer&apos;s inbox straight away. A good report usually gets
          turned around in a release or two.
        </Body>
      </Section>

      <Section>
        <BugReportForm
          project={PROJECTS.CE3}
          accent="lime"
          defaultPluginVersion={PluginInformation.version}
        />
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">BEFORE YOU SEND</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Check you are on the latest build. Quite a few reports turn out to
              be something already fixed.
            </Bullet>
            <Bullet accent="amber">
              Paste the full stack trace from your server console into the logs
              box. The first few lines are rarely enough.
            </Bullet>
            <Bullet accent="amber">
              Say whether you are on Spigot or Paper, and which Minecraft
              version.
            </Bullet>
            <Bullet accent="amber">
              Leave an email address if you want an answer. Without one the
              report can be read but not replied to.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="sky" icon="fa-solid fa-comments">
              Not sure it is a bug? Send it anyway. A question that turns out to
              be a config problem is still useful, since it usually means the
              docs need work.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">OTHER WAYS TO REACH THE DEVELOPER</SubHeading>
          <Body className="pt-3">
            Prefer a public thread you can follow? Open a GitHub issue instead
            and you will see when the fix lands. Or email{" "}
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
              href={NEW_ISSUE}
              accent="sky"
              icon="fa-brands fa-github"
            >
              OPEN A NEW ISSUE
            </PixelButton>
          </div>
          <div className="pt-4">
            <Note accent="rose" icon="fa-solid fa-plug-circle-xmark">
              We do not provide support for third-party plugins. Custom
              Enchantments 3 is a standalone plugin and is not responsible for
              compatibility issues caused by another plugin.
            </Note>
          </div>
        </Panel>
      </Section>
    </div>
  );
}

export default CE3_BugReport;
