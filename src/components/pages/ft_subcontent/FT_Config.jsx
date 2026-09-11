import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/farm_tales/features";
import { FileLayout } from "../../contants/farm_tales/FTConstants";

const ACCENT_TEXT = {
  lime: "text-lime-300",
  sky: "text-sky-300",
  rose: "text-rose-300",
  green: "text-green-300",
  amber: "text-amber-300",
  purple: "text-purple-300",
};

/** The files, the reload, and how to add a crop of your own. */
function FT_Config() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-gears"
          title="Yours to change"
          subtitle="Nothing is hardcoded that a server owner might want to tune."
          accent="lime"
        />
        <Body className="pt-5 text-justify">
          Every number is in config.yml with a comment above it. Every message
          is in language.yml. Every crop is a block of YAML in catalog/, and a
          file you add there is read like the shipped ones, so your own crops
          get seeds, grades, nutrition, a codex page and a texture in the
          generated pack without touching code. None of these files is ever
          overwritten by an update.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.config}
          alt="The plugins/FarmTales folder, an example custom crop, and what /ft reload does"
          accent="lime"
          caption="The folder, a four-line crop of your own, and the reload that picks it up"
        />
      </Section>

      <Section>
        <SubHeading accent="lime">THE FOLDER</SubHeading>
        <div className="mt-4 grid gap-2">
          {FileLayout.map((file) => (
            <div
              key={file.path}
              className="flex flex-wrap gap-3 border border-slate-800 bg-[rgba(0,0,0,0.35)] p-3 md:flex-nowrap"
            >
              <span
                className={`pixel-font w-full shrink-0 text-[8px] tracking-wider md:w-44 md:text-[10px] ${ACCENT_TEXT[file.accent]}`}
              >
                {file.path}
              </span>
              <span className="text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {file.what}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">RELOAD</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="amber">
                <Cmd accent="amber">/ft reload</Cmd> re-reads config.yml,
                language.yml, nutrition-tags.yml and every file in catalog/
                without a restart, and says what changed.
              </Bullet>
              <Bullet accent="amber">
                A reload that fails validation leaves the running configuration
                in place and prints what broke and where. The saved world under
                data/ is never touched.
              </Bullet>
              <Bullet accent="amber">
                Two things a reload cannot change, and both say so in their
                comment: any <Cmd accent="amber">recipe:</Cmd> block, because
                Bukkit cannot replace a registered recipe in place, and{" "}
                <Cmd accent="amber">PlaceholderAPISupport</Cmd>. Those take a
                restart.
              </Bullet>
              <Bullet accent="amber">
                A reload closes any Farm Tales menu somebody has open, so
                nobody is clicking on a page that no longer exists.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">UPDATING</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                Replace the jar and restart. On the first start the console
                compares the <Cmd accent="sky">file-version</Cmd> stamp in each
                of your files against the copy in the new jar and logs one
                line per file that is behind.
              </Bullet>
              <Bullet accent="sky">
                Nothing is merged in for you, on purpose. A key you do not have
                falls back to the documented default, so an old copy keeps
                working, and you add what you want by comparing against the
                copy in the jar.
              </Bullet>
              <Bullet accent="sky">
                catalog/ is the one folder worth deleting on a major update.
                It is regenerated, and an old copy is missing whatever crops
                the update added. Your own custom.yml is untouched, because the
                plugin never writes a file it did not ship.
              </Bullet>
              <Bullet accent="sky">
                Back up plugins/FarmTales/ first, every time.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="green">ADDING A CROP OF YOUR OWN</SubHeading>
        <Terminal title="FarmTales / catalog / custom.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="green">[A NEW FILE, YOURS]</TerminalLabel>
              {`
entries:
  turnip_greens:
    kind: VEGETABLE
    display: "Turnip Greens"
    base-item: KELP
    custom-model-data: 9001
    crop-block: WHEAT
    seed-sources: [GRASS, SHORT_GRASS]
    base-growth-seconds: 540
    seed-model-data: 9501
    nutrition:
      VITAMIN_A: 3
      FIBER: 2
    quality-weights:
      COMMON: 50
      GOOD: 35
      PRIME: 15

/ft reload, and it has a seed, grades, a codex
page, and a texture the next time the pack is
built. Nothing in your file is ever withheld on
Lite, whatever the shipped entries say.
              `}
            </code>
          </pre>
        </Terminal>
        <div className="pt-4">
          <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
            <Cmd accent="rose">custom-model-data</Cmd> and{" "}
            <Cmd accent="rose">seed-model-data</Cmd> must be unique across the
            whole registry, and they are permanent. Two entries sharing one
            silently reskin each other in an existing world, so a duplicate
            fails the load outright rather than warning. Pick numbers well
            away from the shipped ranges (1000 to 5030) and never renumber.
          </Note>
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-shield">
          Every Material, Particle, Sound and EntityType in the plugin is a
          string in a config or catalog file, resolved by name at load. An item
          that does not exist on your server version skips that one entry with
          a line in the console and leaves the rest of the catalog alone. That
          is how one jar covers 1.16.5 to 26.2 with no NMS.
        </Note>
      </Section>
    </div>
  );
}

export default FT_Config;
