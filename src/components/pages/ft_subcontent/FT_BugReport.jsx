import { PluginInformation } from "../../contants/farm_tales/FTConstants";
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

/** Farming flavoured examples for the shared form's empty boxes. */
const EXAMPLES = {
  summary: "Tree fruit stops regrowing after a server restart",
  expectedBehavior:
    "A harvested leaf should grow back on its own after the restart, the way it does while the server is up.",
  steps: `1. Plant a lemon seed and wait for the tree
2. Break one leaf and get a lemon
3. Restart the server and wait the regrow time`,
  pluginVersion: PluginInformation.version,
  minecraftVersion: "26.2",
};

const CONTEXT_HINT =
  "Which edition you are on (paste /ft info whole), which system it is (crops, water, grades, nutrition, animals, dishes, storage, fermentation, codex, pack or the admin menu), and whether the resource pack is installed.";

/**
 * The report panel.
 *
 * The form reaches the developer by email and asks for the things that
 * decide whether a report can be acted on, which a forum post written from
 * a blank box does not. The one line worth more than anything else is
 * /ft info pasted whole: it carries the edition, the server version, how
 * many entries loaded and every capability the server answered at boot.
 */
function FT_BugReport() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-bug"
          title="Reports and requests"
          subtitle="Bugs, and things you wish it did. Both go to the same inbox."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          This is the first release, so a bug in {PluginInformation.version} is
          exactly what this form is for. It goes straight to the
          developer&apos;s inbox. Requests are worth sending too: the crafting
          and fermentation numbers are a first guess, the item art is
          placeholder art, and both are on the list to move.
        </Body>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">WORTH SENDING</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                A crop, fruit or animal you want in the catalog, and roughly
                what it should be worth. Or add it yourself in
                catalog/custom.yml and say how that went.
              </Bullet>
              <Bullet accent="amber">
                A number that feels wrong on your server: a grade that is too
                easy, a wine that ages too fast, a dish that pays too much. Say
                what you changed it to.
              </Bullet>
              <Bullet accent="amber">
                A plugin you run that this ought to know about, and what you
                would want the two of them to do together.
              </Bullet>
              <Bullet accent="amber">
                A Lite limit that is in the wrong place. The reasoning behind
                each one is on this page.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">WHAT MAKES A BUG REPORT USABLE</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                <span className="text-sky-300">/ft info</span> pasted whole. It
                prints the edition, the version, the server, how many entries
                loaded and skipped, and every capability line from the boot
                banner.
              </Bullet>
              <Bullet accent="sky">
                The console lines from the boot, and the full stack trace if
                there is one. The interesting half is usually below the fold.
              </Bullet>
              <Bullet accent="sky">
                Whether it happens on a fresh world or only on yours, and
                whether the resource pack is on.
              </Bullet>
              <Bullet accent="sky">
                For a grade that looks wrong,{" "}
                <span className="text-sky-300">/ft store show</span> while
                looking at the crop. It prints the maintenance score and each
                of its three terms.
              </Bullet>
            </Bullets>
            <div className="pt-4">
              <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
                Back up plugins/FarmTales/ before any update. Your config is
                never overwritten, but data/ is the saved world and deserves
                the same care as the world itself.
              </Note>
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <BugReportForm
          project={PROJECTS.FARM_TALES}
          accent="green"
          defaultPluginVersion={PluginInformation.version}
          examples={EXAMPLES}
          contextHint={CONTEXT_HINT}
        />
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">OTHER WAYS TO REACH THE DEVELOPER</SubHeading>
          <Body className="pt-3">
            The form above is the one to use: it reaches the developer by email
            with the version, the server software and the log already attached
            to it. If you would rather write the mail yourself, it is{" "}
            <a
              className="text-sky-300 underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            , or a direct message on Spigot. Either way, leave an address if
            you want an answer: without one a report can be read but not
            replied to.
          </Body>
        </Panel>
      </Section>
    </div>
  );
}

export default FT_BugReport;
