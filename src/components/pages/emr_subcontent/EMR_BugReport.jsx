import { PluginInformation } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Bullet,
  Bullets,
  Note,
  Panel,
  Section,
  SectionHeading,
  SubHeading,
} from "../../page_components/PixelUIKit";
import BugReportForm from "../../page_components/BugReportForm";
import { PROJECTS } from "../../../lib/analytics";

const CONTACT_EMAIL = PluginInformation.contactEmail;

/** Mob-plugin flavoured examples for the shared form's empty boxes. */
const EXAMPLES = {
  summary: "Boss bar stays on screen after the boss is killed by a second party",
  expectedBehavior:
    "The bar should clear for everyone once the boss dies, not just for the killer.",
  steps: `1. Spawn a tier 6 mob with a boss bar
2. Have two players fight it from opposite sides
3. Let one of them land the killing blow`,
  pluginVersion: `${PluginInformation.version} (unreleased)`,
  minecraftVersion: "1.21.4",
};

const CONTEXT_HINT =
  "Which system it is (mobs, abilities, bosses, spawning, raids, loot, rewards or an integration), which edition you are on, and which of Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard or PlaceholderAPI you have installed.";

/**
 * The report panel for a plugin that has not shipped.
 *
 * That changes what is worth sending, so this panel says so rather than
 * copying the Kumandra one word for word. Nobody can have a bug in a jar they
 * do not have. What they can have is a feature request while the design is
 * still moving, and a bug in the old Epic Mobs that this rework should not
 * repeat, and both of those are genuinely useful right now.
 */
function EMR_BugReport() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-bug"
          title="Reports and requests"
          subtitle="It has not shipped yet, so the useful thing to send is different."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          There is no jar to find a bug in yet. What is worth sending, and
          worth sending now rather than after release, is what you want it to
          do and what the old Epic Mobs did to your server. The design is still
          moving, so a request today is cheap to act on and a request after
          release is not.
        </Body>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">WORTH SENDING NOW</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                A feature you need. Say what you want it to do on your server
                rather than how you think it should be built.
              </Bullet>
              <Bullet accent="amber">
                Something the old Epic Mobs did that hurt: a lag pattern, a mob
                that would not despawn, a raid that never ended. The backlog
                this rework is working through was built out of exactly that.
              </Bullet>
              <Bullet accent="amber">
                A plugin you run that this ought to know about, and what you
                would want the two of them to do together.
              </Bullet>
              <Bullet accent="amber">
                A Lite limit that is in the wrong place. Those numbers are not
                final and the reasoning behind them is on this page.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">WORTH SENDING LATER</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                An actual bug, once there is a build to hit it in. Include the
                full stack trace from your console, not the first few lines.
              </Bullet>
              <Bullet accent="sky">
                Which edition you are on. <span className="text-sky-300">/ep info</span>{" "}
                prints it, along with every active limit and which integrations
                hooked.
              </Bullet>
              <Bullet accent="sky">
                Your server software and Minecraft version, and whether it
                happens on a fresh world or only on yours.
              </Bullet>
              <Bullet accent="sky">
                What <span className="text-sky-300">/ep timings</span> says, if
                it is a performance report. That one line saves more time than
                anything else in a report.
              </Bullet>
            </Bullets>
            <div className="pt-4">
              <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
                Reports against the original Epic Mobs will not be fixed in that
                plugin. It is archived and not supported. They are still read,
                because they shape this one.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <BugReportForm
          project={PROJECTS.EPIC_MOBS_REWORK}
          accent="ember"
          defaultPluginVersion={`${PluginInformation.version} (unreleased)`}
          examples={EXAMPLES}
          contextHint={CONTEXT_HINT}
        />
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">OTHER WAYS TO REACH THE DEVELOPER</SubHeading>
          <Body className="pt-3">
            There is no Spigot discussion page yet, because there is no listing
            yet. Until there is, email{" "}
            <a
              className="text-sky-300 underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>{" "}
            directly. Leave an address on the form if you want an answer:
            without one the report can be read but not replied to.
          </Body>
        </Panel>
      </Section>
    </div>
  );
}

export default EMR_BugReport;
