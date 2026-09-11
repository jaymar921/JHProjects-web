import {
  CommandList,
  PackBuckets,
  Permissions,
  PluginInformation,
  Troubleshooting,
} from "../../contants/farm_tales/FTConstants";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Step,
  Steps,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";

/**
 * The full setup guide: install, the first boot, the resource pack, the
 * two permission nodes, every command, and what goes wrong.
 *
 * Written from docs/installation.md, docs/commands.md, docs/permissions.md
 * and docs/resource-pack.md in the plugin repository. The plugin is closed
 * source, so anything an owner cannot work out by running it has to be here.
 */
function FT_Setup() {
  const { packsLink } = PluginInformation;
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-screwdriver-wrench"
          title="Setting it up"
          subtitle="Two jars, one plugin. Put one of them in plugins/ and start the server. Nothing else is required."
          accent="green"
        />
        <Body className="pt-5 text-justify">
          No database, no other plugin, no resource pack unless you want one.
          The jar is Java 11 bytecode and runs on Spigot and Paper from 1.16.5
          to 26.2, tested at both ends. Paper and Purpur are built on Spigot
          and should work; they are not on the test servers.
        </Body>
      </Section>

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel accent="green" className="p-5">
            <SubHeading accent="green">INSTALL</SubHeading>
            <Steps className="pt-2">
              <Step n="1" accent="green">
                Pick one jar. <Cmd accent="green">FarmTales.jar</Cmd> is
                Premium, <Cmd accent="green">FarmTales-lite.jar</Cmd> is free.
                Only one of them may be in plugins/ at a time; both register
                the same plugin name and Spigot will refuse the second with
                &quot;Ambiguous plugin name&quot;.
              </Step>
              <Step n="2" accent="green">
                Start the server. The plugin writes config.yml, language.yml,
                nutrition-tags.yml and catalog/ with three files in it under
                plugins/FarmTales/. None of these is ever overwritten by an
                update.
              </Step>
              <Step n="3" accent="green">
                Read the banner. It says which edition booted,{" "}
                <Cmd accent="green">[PREMIUM]</Cmd> or{" "}
                <Cmd accent="green">[LITE]</Cmd>, how many entries loaded, how
                many were skipped for this server version, and what the server
                can and cannot do. <Cmd accent="green">/ft info</Cmd> prints the
                same at any time.
              </Step>
              <Step n="4" accent="green">
                Give yourself something to plant. Ops have{" "}
                <Cmd accent="green">farmtales.admin</Cmd>.{" "}
                <Cmd accent="green">/ft give tomato seed</Cmd>, or break grass
                until a seed drops. <Cmd accent="green">/ft catalog</Cmd> lists
                every id and tab completion offers them.
              </Step>
              <Step n="5" accent="green">
                That is a working install. Everything below is optional.
              </Step>
            </Steps>
          </Panel>

          <div>
            <Terminal title="FarmTales / first-boot.log">
              <pre>
                <code className="text-[10px] md:text-sm" lang="md">
                  <TerminalLabel accent="green">
                    [SPIGOT 26.2, PREMIUM, NOTHING ELSE INSTALLED]
                  </TerminalLabel>
                  {`
[FarmTales] +---------------------------------------------
[FarmTales] | Farm Tales 1.0.0  [PREMIUM]
[FarmTales] | Server: 26.2-R0.1-SNAPSHOT
[FarmTales] | Capability, text display: yes
[FarmTales] | Capability, custom model data component: yes
[FarmTales] | Capability, entity persistent data: yes
[FarmTales] | Capability, entity remove event: yes
[FarmTales] | Capability, potion base type: yes
[FarmTales] | Catalog: 134 entries, 0 skipped, 0 rejected
[FarmTales] | Nutrition tags: 12
[FarmTales] +---------------------------------------------
[FarmTales] PlaceholderAPI: not installed, so no
  expansion was registered. Everything else works
  exactly the same.

The edition line is the one to read. The two jars
look identical in the plugins folder apart from
the file name.
                  `}
                  <TerminalLabel accent="amber">
                    [THE SAME JAR ON SPIGOT 1.16.5]
                  </TerminalLabel>
                  {`
[FarmTales] Skipped 'moonberry' from fruits.yml:
  base-item 'GLOW_BERRIES' does not exist on this
  server version.
[FarmTales] Skipped 'daikon' from vegetables.yml:
  base-item 'HANGING_ROOTS' does not exist ...
[FarmTales] | Catalog: 125 entries, 5 skipped, 0 rejected

A skip is not a mistake. It means this server
version cannot have that entry and nothing is
wrong. A rejection means somebody needs to fix
a file, and it says which line.
                  `}
                  <TerminalLabel accent="emerald">[LITE]</TerminalLabel>
                  {`
[FarmTales] | Farm Tales 1.0.0-lite  [LITE]
[FarmTales] | Catalog: 134 entries, 0 skipped, 0 rejected
[FarmTales] | Catalog: 34 obtainable in this edition,
  100 listed for the codex only

The 100 are in the codex, greyed. They are not
in /ft catalog and /ft give refuses them by name.
                  `}
                </code>
              </pre>
            </Terminal>
            <div className="pt-4">
              <Note accent="amber" icon="fa-brands fa-java">
                A 1.16.5 server on Java 8 refuses the jar with
                UnsupportedClassVersionError at load. Run that server on Java
                11 or 16. Java 17 and newer servers need nothing.
              </Note>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-palette"
          title="The resource pack"
          subtitle="Optional. The plugin never pushes one unless you tell it to."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Farm Tales items ride vanilla items and carry a model number. Without
          a pack an eggplant is a beetroot with the right name, lore and
          behaviour; with one it looks like an eggplant. The packs are built
          from the catalog for every release and published, one zip per
          Minecraft version per edition, at{" "}
          <a
            className="text-amber-300 underline"
            href={packsLink}
            target="_blank"
            rel="noreferrer"
          >
            plugin-resources/FarmTales/ResourcePacks
          </a>
          . Take the <Cmd accent="amber">-lite</Cmd> zip if you run Lite; the
          full pack has textures for 100 items a Lite player can never hold.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">WHICH ZIP</SubHeading>
            <Body className="pt-3">
              Run <Cmd accent="amber">/ft pack</Cmd> on your server. It reads
              the pack format your server declares and names the zip that
              matches. The five zips built for every release:
            </Body>
            <table className="mt-3 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pixel-font py-2 text-[8px] tracking-wider text-slate-300 md:text-[9px]">Zip</th>
                  <th className="pixel-font py-2 text-[8px] tracking-wider text-slate-300 md:text-[9px]">Pack format</th>
                  <th className="pixel-font py-2 text-[8px] tracking-wider text-slate-300 md:text-[9px]">Profile</th>
                </tr>
              </thead>
              <tbody>
                {PackBuckets.map((b) => (
                  <tr key={b.bucket} className="border-b border-slate-800">
                    <td className="py-2 text-[11px] text-amber-300 md:text-xs">{b.bucket}.zip</td>
                    <td className="py-2 text-[11px] text-slate-300 md:text-xs">{b.format}</td>
                    <td className="py-2 text-[11px] text-slate-500 md:text-xs">{b.profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pt-3 text-[10px] leading-relaxed text-slate-500 md:text-xs">
              The profile is only the model format: predicate overrides up to
              1.21.1, item definitions from 1.21.2. A version not in this
              table is not a wall: /ft pack prints your server&apos;s format
              and the exact generator line to build a pack for it.
            </p>
          </Panel>

          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">SERVING IT</SubHeading>
            <Body className="pt-3">
              Either hand the zip to players to install themselves, or let the
              plugin offer it on join:
            </Body>
            <Terminal title="config.yml" className="mt-3">
              <pre>
                <code className="text-[10px] md:text-xs" lang="yaml">
                  {`resource-pack:
  url: "https://github.com/JnH-Projects/plugin-resources/raw/main/FarmTales/ResourcePacks/26.2.zip"
  sha1: ""
  push-on-join: true`}
                </code>
              </pre>
            </Terminal>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                sha1 is optional and worth setting; without it clients
                re-download on every join. A wrong hash makes the client
                refuse the pack outright, so leave it empty rather than guess.
              </Bullet>
              <Bullet accent="sky">
                A player who declines is not kicked and is not asked again.
              </Bullet>
              <Bullet accent="sky">
                An owner with their own catalog/custom.yml builds their own
                pack with the generator in the plugin repo; the docs say how.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-key"
          title="Permissions"
          subtitle="Two nodes. Farm Tales does not gate gameplay behind permissions."
          accent="amber"
        />
        <Body className="pt-5">
          Planting, watering, harvesting, feeding an animal, crafting and
          eating are for everybody, and nothing in the world checks a node.
          What the nodes gate is the command.
        </Body>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Permissions.map((perm) => (
            <Panel key={perm.node} accent="amber" className="p-4">
              <div className="flex flex-wrap place-items-center gap-2">
                <Cmd accent="amber">{perm.node}</Cmd>
                <span className="pixel-font text-[7px] tracking-widest text-slate-500 md:text-[8px]">
                  DEFAULT: {perm.default.toUpperCase()}
                </span>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {perm.grants}
              </p>
            </Panel>
          ))}
        </div>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-circle-info">
            There is no per-subcommand node and no per-crop node, deliberately.
            Every admin subcommand can change or expose the saved world, so an
            operator who should have one of them should have all of them. Which
            edition&apos;s content a player can reach is the edition, not a
            node.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-terminal"
          title="Every command"
          subtitle="One command, /farmtales, alias /ft. /ft help shows only what you may run. Everything tab completes, and completion is edition-aware."
          accent="green"
        />
        <Panel accent="green" className="mt-5 overflow-x-auto p-3 md:p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider whitespace-nowrap text-slate-300 md:text-[10px]">
                  Command
                </th>
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-slate-300 md:text-[10px]">
                  What it does
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider whitespace-nowrap text-slate-300 md:text-[10px]">
                  Who
                </th>
              </tr>
            </thead>
            <tbody>
              {CommandList.map((cmd) => (
                <tr key={cmd.command} className="border-b border-slate-800 align-top">
                  <td className="px-2 py-2.5 whitespace-nowrap">
                    <Cmd accent={cmd.lite === false ? "amber" : "green"}>
                      {cmd.command}
                    </Cmd>
                  </td>
                  <td className="px-2 py-2.5 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                    {cmd.description}
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <div className="flex flex-col place-items-center gap-1">
                      <span
                        className={`pixel-font border px-1.5 py-0.5 text-[6px] tracking-widest md:text-[7px] ${
                          cmd.requireOp
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                            : "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        {cmd.requireOp ? "ADMIN" : "EVERYONE"}
                      </span>
                      {cmd.lite === false && (
                        <span className="pixel-font border border-green-400/40 bg-green-400/10 px-1.5 py-0.5 text-[6px] tracking-widest text-green-300 md:text-[7px]">
                          PREMIUM
                        </span>
                      )}
                      {cmd.liteOnly && (
                        <span className="pixel-font border border-slate-500/40 bg-slate-500/10 px-1.5 py-0.5 text-[6px] tracking-widest text-slate-400 md:text-[7px]">
                          LITE ONLY
                        </span>
                      )}
                      {cmd.playerOnly && (
                        <span className="pixel-font border border-sky-400/40 bg-sky-400/10 px-1.5 py-0.5 text-[6px] tracking-widest text-sky-300 md:text-[7px]">
                          NOT CONSOLE
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-life-ring"
          title="When something is not behaving"
          subtitle="The things that go wrong on the first evening, and the answer to each."
          accent="rose"
        />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {Troubleshooting.map((row) => (
            <Panel key={row.q} accent={row.accent} className="p-4">
              <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                {row.q}
              </p>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {row.a}
              </p>
            </Panel>
          ))}
        </div>
        <div className="pt-5">
          <Note accent="rose" icon="fa-solid fa-bug">
            Still stuck? Paste <Cmd accent="rose">/ft info</Cmd> whole, say
            which edition and Minecraft version, and include the console lines
            from the boot. Uninstalling is removing the jar: planted crops stay
            in the world as ordinary blocks and produce in chests keeps its
            name and lore as ordinary items.
          </Note>
        </div>
        <div className="pt-4">
          <PixelButton
            accent="amber"
            icon="fa-solid fa-arrow-up-right-from-square"
            as="a"
            href={packsLink}
          >
            THE RESOURCE PACKS ON GITHUB
          </PixelButton>
        </div>
      </Section>
    </div>
  );
}

export default FT_Setup;
