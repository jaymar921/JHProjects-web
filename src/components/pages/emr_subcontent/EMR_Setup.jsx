import {
  CommandList,
  Permissions,
  SetupSteps,
  SetupTests,
  Troubleshooting,
} from "../../contants/epic_mobs_rework/EMRConstants";
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
import EMR_CommandTableComponent from "../../page_components/EMR_CommandTableComponent";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";
import * as Screens from "../../../assets/epic_mobs_rework/screenshots";

/**
 * The setup panel: everything an owner needs on the first evening, and the
 * command reference behind it.
 *
 * The page already had a short setup section. This is the long version, and it
 * exists because the plugin is closed source: nobody can read the code to work
 * out why something is not spawning, so the answer has to be written down and
 * it has to name the command that prints the reason. Every "when it does not
 * work" entry here maps to a diagnostic the plugin already has.
 *
 * Ordered the way a first evening actually goes, not the way the feature list
 * is ordered.
 */
function EMR_Setup() {
  const playerOnly = CommandList.filter((entry) => entry.playerOnly);

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-screwdriver-wrench"
          title="Setting it up"
          subtitle="Drop the jar in, check which edition you have, fight something, then turn spawning on."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          There is nothing to install alongside it and nothing to configure
          before it will start. Twenty mobs, two raids, a pack and an arena are
          written on the first boot, so there is something to fight before you
          have built anything. Everything below is the order to do it in, and
          the last section is what to run when something is not behaving.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.setup}
          alt="The first evening in order, and what to run when nothing spawns"
          accent="sky"
          caption="The order it actually happens in, and the one command that answers most of it"
        />
      </Section>

      <Section>
        <SubHeading accent="ember">THE FIRST RUN, IN ORDER</SubHeading>
        <Panel accent="ember" className="mt-4 p-5">
          <Steps>
            {SetupSteps.map((step) => (
              <Step key={step.n} n={step.n} accent="ember">
                <span className="pixel-font block text-[9px] tracking-wider text-slate-200 md:text-[10px]">
                  {step.title}
                </span>
                {step.cmd && (
                  <span className="mt-2 block">
                    <Cmd accent="amber">{step.cmd}</Cmd>
                  </span>
                )}
                <span className="mt-2 block">{step.body}</span>
              </Step>
            ))}
          </Steps>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="amber">WHAT THE FIRST BOOT PRINTS</SubHeading>
        <Body className="pt-3 text-justify">
          The Edition line is the one to read. The two jars look identical in
          the plugins folder apart from the file name, so check it before you
          spend an evening wondering why a command is missing.
        </Body>
        <Terminal title="EpicMobsRework / first-boot.log" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="md">
              <TerminalLabel accent="ember">
                [FRESH SERVER, NOTHING ELSE INSTALLED]
              </TerminalLabel>
              {`
Edition: LITE
Detected server 1.21.4, feature set resolved
No optional integrations found. Running standalone.
Wrote 20 mob definitions, 2 raids, 1 pack, 1 arena
Loaded 20 mob definitions, 2 raids, 0 triggers

On Lite the twenty are built in: they do not count
against the ten definitions you may write, and they
are written back if one goes missing.
              `}
              <TerminalLabel accent="amber">
                [WITH A MOB THAT HAS A TYPO IN IT]
              </TerminalLabel>
              {`
mobs/frost-wolf.yml: biome 'SNOWY_TIAGA' is not a
  known biome. This mob will never spawn.
mobs/frost-wolf.yml: spawn.chance was 1.5, outside
  0.0 to 1.0. Using the default, 0.2.

Both are named on boot rather than failing quietly
the first time the mob tries to spawn, and the mob
still loads.
              `}
              <TerminalLabel accent="lime">
                [WITH THE OPTIONAL PLUGINS INSTALLED]
              </TerminalLabel>
              {`
Custom Enchantments 3 hooked
Kumandra's Economy hooked (2.1, tagged deposits)
WorldGuard hooked, flag 'epicmobs-spawn' registered
PlaceholderAPI hooked, 32 placeholders registered

Anything absent is simply not listed. /ep info
prints the same set at any time.
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Shot
          className="emr-shot"
          src={Screens.helpCommand}
          alt="The /ep help output in chat"
          accent="amber"
          caption="/ep help prints only the lines you may actually run. A player without the admin permission sees five rather than forty"
        />
      </Section>

      <Section>
        <SubHeading accent="lime">TRY EACH SYSTEM ONCE</SubHeading>
        <Body className="pt-3 text-justify">
          Eight things to check, in the order that needs least setup first.
          Work down the list on a fresh server and you will have seen the whole
          plugin in an evening.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {SetupTests.map((test) => (
            <Panel key={test.name} accent={test.accent} className="p-5">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={test.icon} accent={test.accent} />
                <p className="pixel-font text-[10px] tracking-wide text-slate-200 md:text-xs">
                  {test.name}
                </p>
              </div>
              <p className="pt-3">
                <Cmd accent={test.accent}>{test.cmd}</Cmd>
              </p>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {test.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="purple">THE TWO WAYS TO BUILD A MOB</SubHeading>
        <Body className="pt-3 text-justify">
          They write the same file, and copying one out of{" "}
          <Cmd accent="purple">mobs/</Cmd> is a perfectly good third way. The
          wizard is in both builds and works over RCON; the editor is the full
          build and is faster.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Shot
            className="emr-shot"
            src={Screens.chatWizard}
            alt="The chat wizard editing the Alpha Frost Wolf"
            accent="purple"
            caption="/ep create mob and /ep modify edit. Fourteen questions, each saying what a valid answer looks like"
          />
          <Shot
            className="emr-shot"
            src={Screens.editorMob}
            alt="A mob open in the admin GUI editor"
            accent="ember"
            caption="/ep editor. The same fields as pages, with a live preview and a test spawn. Full build"
          />
        </div>
      </Section>

      <Section>
        <SubHeading accent="sky">WHERE A COMMAND CAN BE RUN FROM</SubHeading>
        <Body className="pt-3 text-justify">
          Most of the tree works from the console, including{" "}
          <Cmd accent="sky">/ep reload</Cmd>,{" "}
          <Cmd accent="sky">/ep raid start</Cmd> and{" "}
          <Cmd accent="sky">/ep clear</Cmd>. The {playerOnly.length} below
          cannot, because each needs either a location or an inventory and the
          console has neither. Each says so rather than failing quietly.
        </Body>
        <div className="mt-4 flex flex-wrap gap-2">
          {playerOnly.map((entry) => (
            <Chip key={entry.command} accent="sky">
              {entry.command}
            </Chip>
          ))}
        </div>
        <div className="pt-4">
          <Note accent="amber" icon="fa-solid fa-circle-exclamation">
            One thing to know about raids from the console: a raid needs at
            least one player online to do anything at all. Every wave looks for
            a participant, so <Cmd accent="amber">/ep raid start</Cmd> on an
            empty server is refused rather than starting into nothing.
          </Note>
        </div>
      </Section>

      <Section>
        <SubHeading accent="emerald">TAB COMPLETION</SubHeading>
        <Body className="pt-3 text-justify">
          Every argument completes, including mob names with spaces. Those
          complete one word at a time, because Minecraft replaces the word your
          cursor is in and nothing else. Type{" "}
          <Cmd accent="emerald">/ep modify delete Crypt</Cmd> and press tab, and
          you are offered <Cmd accent="emerald">Warden</Cmd>,{" "}
          <Cmd accent="emerald">Servant</Cmd> and{" "}
          <Cmd accent="emerald">Archer</Cmd>. Press tab on an empty argument and
          you get the first word of everything.
        </Body>
      </Section>

      <Section>
        <SubHeading accent="rose">WHEN SOMETHING DOES NOT WORK</SubHeading>
        <Body className="pt-3 text-justify">
          Four of these five are answered by a command rather than by a support
          thread, and that is deliberate. The plugin is closed source, so a
          symptom you cannot explain has to be one the plugin can explain
          itself.
        </Body>
        <div className="mt-5 grid gap-3">
          {Troubleshooting.map((entry) => (
            <Panel key={entry.symptom} accent={entry.accent} className="p-4">
              <div className="flex flex-wrap place-items-center gap-3">
                <p className="pixel-font text-[9px] tracking-wide text-slate-200 md:text-[11px]">
                  {entry.symptom}
                </p>
                <span className="ml-auto">
                  <Cmd accent={entry.accent}>{entry.cmd}</Cmd>
                </span>
              </div>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {entry.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">PERMISSIONS</SubHeading>
        <Body className="pt-3 text-justify">
          Five nodes, and only the first is an administrative one. The other
          four default to everyone on purpose: a player looking up a mob they
          just fought, or choosing which currency their kills pay out in, is
          not an administrative act. A server that disagrees can negate them in
          its permissions plugin.
        </Body>
        <div className="mt-5 grid gap-2">
          {Permissions.map((permission) => (
            <div
              key={permission.node}
              className="flex flex-wrap place-items-baseline justify-between gap-2 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3"
            >
              <span className="pixel-font text-[8px] text-slate-200 md:text-[10px]">
                {permission.node}
              </span>
              <span className="grow text-[11px] text-slate-400 md:text-xs">
                {permission.grants}
              </span>
              <span
                className={`pixel-font border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${
                  permission.fallback === "op"
                    ? "border-rose-400/40 bg-rose-400/10 text-rose-300"
                    : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                }`}
              >
                {permission.fallback.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="ember">EVERY COMMAND</SubHeading>
        <Body className="pt-3 text-justify">
          The base command is <Cmd accent="ember">/epicmobs</Cmd>, with two
          aliases: <Cmd accent="ember">/ep</Cmd> and{" "}
          <Cmd accent="ember">/emr</Cmd>. Nothing in the plugin cares what game
          mode you are in, including the spawn egg and spawner menus: the items
          those hand you work the same way in creative, survival and adventure.
        </Body>
        <Panel accent="ember" className="mt-5 overflow-x-auto p-3 md:p-4">
          <EMR_CommandTableComponent />
        </Panel>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">BEFORE THE SERVER OPENS</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                <Cmd accent="emerald">/ep clear</Cmd> removes every Epic Mob
                currently in the world. It does not touch vanilla mobs and it
                deletes no definitions.
              </Bullet>
              <Bullet accent="emerald">
                Turn <Cmd accent="emerald">raids.ignore-min-players</Cmd> back
                off. <Cmd accent="emerald">/ep info</Cmd> says{" "}
                <span className="text-emerald-300">
                  min players ignored (testing)
                </span>{" "}
                the whole time it is on, so you can check rather than remember.
              </Bullet>
              <Bullet accent="emerald">
                Turn natural spawning back down to the rate you actually want.
                The rate that is useful for testing is not the rate that is fun
                to play in.
              </Bullet>
              <Bullet accent="emerald">
                Anything you built while testing is a file under{" "}
                <Cmd accent="emerald">mobs/</Cmd> you can delete.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">UPGRADING FROM THE OLD PLUGIN</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                Back up <Cmd accent="sky">plugins/EpicMobs</Cmd> first. This is
                a release candidate.
              </Bullet>
              <Bullet accent="sky">
                A <Cmd accent="sky">plugins/EpicMobs</Cmd> folder is migrated on
                the first start into readable per-mob files. The originals are
                kept as <Cmd accent="sky">*.migrated</Cmd> so the migration can
                be undone by hand.
              </Bullet>
              <Bullet accent="sky">
                Nothing is deleted, and the boot log names every mob whose
                despawn behaviour changed, because the old plugin read that flag
                backwards.
              </Bullet>
              <Bullet accent="sky">
                Grep the first boot for exceptions rather than only for the
                summary line, then run{" "}
                <Cmd accent="sky">/ep reload</Cmd> once and read it again.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-flask">
          Do all of this on a test server, not on the live one. Nothing in the
          list needs a second player, and the three things that do are the three
          things the release candidate is asking for.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Setup;
