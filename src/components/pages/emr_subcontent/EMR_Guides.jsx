import { useState } from "react";
import {
  GUIDE_EDITIONS,
  Walkthroughs,
  WalkthroughGroups,
} from "../../contants/epic_mobs_rework/EMRConstants_Guides";
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
import * as Screens from "../../../assets/epic_mobs_rework/screenshots";

/**
 * The step by step panel: one walkthrough on screen at a time, with an index
 * beside it.
 *
 * The page used to answer "how do I actually make a mob" with a command table
 * and a paragraph saying there were two ways to do it, which is a reference
 * rather than an instruction. Somebody who has never run the plugin needs the
 * order, the exact command, and what should happen after each one, and a
 * closed source plugin cannot leave them to read the code instead.
 *
 * One guide at a time rather than ten stacked collapsibles: a walkthrough that
 * shares a scrollbar with nine others is one you lose your place in, and these
 * are read while alt-tabbing back to a server.
 */
function EMR_Guides({ initial }) {
  const [openKey, setOpenKey] = useState(
    Walkthroughs.some((guide) => guide.key === initial)
      ? initial
      : Walkthroughs[0].key,
  );

  const guide = Walkthroughs.find((entry) => entry.key === openKey);
  const edition = GUIDE_EDITIONS[guide.edition];

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-list-check"
          title="Step by step"
          subtitle={`${Walkthroughs.length} walkthroughs. Pick the thing you are trying to do.`}
          accent="ember"
        />
        <Body className="pt-5 text-justify">
          Every command below is one the plugin actually has, and every default
          number is the one in your config.yml as it ships. The plugin is closed
          source, so anything you cannot work out by reading it is written down
          here instead: the wizard&apos;s exact questions, the editor&apos;s
          pages, the order the raid scheduler refuses in, and the one thing
          about an arena region that everybody gets wrong.
        </Body>
      </Section>

      {/* ------------------------------------------------------------ INDEX */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {WalkthroughGroups.map((group) => (
            <div key={group}>
              <SubHeading accent="amber">{group.toUpperCase()}</SubHeading>
              <div className="mt-3 grid gap-2">
                {Walkthroughs.filter((entry) => entry.group === group).map(
                  (entry) => {
                    const selected = entry.key === openKey;
                    return (
                      <button
                        key={entry.key}
                        onClick={() => setOpenKey(entry.key)}
                        aria-current={selected ? "true" : undefined}
                        className={`flex w-full place-items-center gap-3 border p-3 text-left transition-colors ${
                          selected
                            ? "border-orange-400/70 bg-orange-500/10"
                            : "border-slate-800 bg-[rgba(0,0,0,0.35)] hover:border-slate-600 hover:bg-[rgba(255,255,255,0.03)]"
                        }`}
                      >
                        <i
                          className={`${entry.icon} shrink-0 text-xs ${
                            selected ? "text-orange-300" : "text-slate-500"
                          }`}
                        ></i>
                        <span
                          className={`grow text-[11px] leading-relaxed md:text-xs ${
                            selected ? "text-orange-200" : "text-slate-300"
                          }`}
                        >
                          {entry.short}
                        </span>
                        {entry.edition === "full" && (
                          <span
                            className="pixel-font shrink-0 border border-orange-400/40 bg-orange-400/10 px-1.5 py-1 text-[6px] tracking-widest text-orange-300"
                            title="Full build only"
                          >
                            FULL
                          </span>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ THE GUIDE */}
      <Section>
        <Panel accent={guide.accent} className="p-5">
          <div className="flex flex-wrap place-items-center gap-3">
            <IconBadge icon={guide.icon} accent={guide.accent} />
            <p className="pixel-font grow text-[10px] tracking-wide text-slate-200 md:text-xs">
              {guide.title}
            </p>
            <span
              className={`pixel-font shrink-0 border px-2 py-1 text-[7px] tracking-widest md:text-[8px] ${
                edition.accent === "ember"
                  ? "border-orange-400/40 bg-orange-400/10 text-orange-300"
                  : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              }`}
            >
              {edition.label}
            </span>
          </div>
          <Body className="pt-4 text-justify">{guide.blurb}</Body>

          <div className="pt-5">
            <Steps>
              {guide.steps.map((step) => (
                <Step key={step.n} n={step.n} accent={guide.accent}>
                  <span className="pixel-font block text-[9px] tracking-wider text-slate-200 md:text-[10px]">
                    {step.title}
                  </span>
                  {step.cmd && (
                    <span className="mt-2 block">
                      <Cmd accent={guide.accent}>{step.cmd}</Cmd>
                    </span>
                  )}
                  <span className="mt-2 block">{step.body}</span>

                  {/*
                    The wizard's fourteen questions, verbatim and in order,
                    with the hint the plugin prints under each. Nobody can
                    read them out of a closed jar, and "fourteen questions"
                    on its own tells an owner nothing about whether they can
                    answer them.
                  */}
                  {step.questions && (
                    <span className="mt-3 block border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3">
                      <ol className="list-none">
                        {step.questions.map(([question, hint], index) => (
                          <li
                            key={question}
                            className="flex gap-3 border-b border-slate-800/70 py-1.5 last:border-b-0"
                          >
                            <span className="pixel-font w-6 shrink-0 text-[8px] text-slate-600 md:text-[9px]">
                              {index + 1}
                            </span>
                            <span className="grow">
                              <span className="block text-[11px] leading-relaxed text-slate-300 md:text-xs">
                                {question}
                              </span>
                              <span className="block pt-0.5 text-[10px] leading-relaxed text-slate-600 md:text-[11px]">
                                {hint}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </span>
                  )}

                  {step.pages && (
                    <span className="mt-3 block border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3">
                      {step.pages.map(([page, note]) => (
                        <span
                          key={page}
                          className="block border-b border-slate-800/70 py-1.5 last:border-b-0"
                        >
                          <span className="pixel-font block text-[8px] tracking-wide text-orange-300 md:text-[9px]">
                            {page}
                          </span>
                          <span className="block pt-1 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                            {note}
                          </span>
                        </span>
                      ))}
                    </span>
                  )}

                  {step.paths && (
                    <span className="mt-3 block border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3">
                      {step.paths.map(([path, note]) => (
                        <span
                          key={path}
                          className="block border-b border-slate-800/70 py-2 last:border-b-0"
                        >
                          <Cmd accent="sky">{path}</Cmd>
                          <span className="block pt-1.5 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                            {note}
                          </span>
                        </span>
                      ))}
                    </span>
                  )}
                </Step>
              ))}
            </Steps>
          </div>
        </Panel>
      </Section>

      {guide.file && (
        <Section>
          <SubHeading accent="lime">WHAT THE FILE LOOKS LIKE</SubHeading>
          <Terminal title={guide.file.title} className="mt-4">
            <pre>
              <code className="text-[10px] md:text-sm" lang={guide.file.lang}>
                <TerminalLabel accent="lime">{guide.file.label}</TerminalLabel>
                {guide.file.body}
              </code>
            </pre>
          </Terminal>
        </Section>
      )}

      {guide.terminal && (
        <Section>
          <SubHeading accent="amber">WHAT THE CONSOLE SAYS</SubHeading>
          <Terminal title={guide.terminal.title} className="mt-4">
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                <TerminalLabel accent={guide.terminal.accent}>
                  {guide.terminal.label}
                </TerminalLabel>
                {guide.terminal.body}
              </code>
            </pre>
          </Terminal>
        </Section>
      )}

      {guide.shot && (
        <Section>
          <Shot
            className="emr-shot"
            src={Screens[guide.shot]}
            alt={guide.shotAlt}
            accent={guide.accent}
            caption={guide.shotCaption}
          />
        </Section>
      )}

      <Section>
        <Panel accent="rose" className="p-5">
          <SubHeading accent="rose">WATCH OUT FOR</SubHeading>
          <Bullets className="pt-3">
            {guide.watch.map((line) => (
              <Bullet key={line} accent="rose">
                {line}
              </Bullet>
            ))}
          </Bullets>
        </Panel>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-flask">
          Do all of this on a test server rather than the live one.{" "}
          <Cmd accent="sky">/ep clear</Cmd> removes every Epic Mob in the world
          when you are finished poking at it, and anything you built while
          testing is a file under <Cmd accent="sky">mobs/</Cmd> you can delete.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Guides;
