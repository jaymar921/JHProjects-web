import {
  Permissions,
  PluginInformation,
} from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Note,
  Panel,
  Section,
  SectionHeading,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";

/**
 * What the plugin needs from a server, and what it hands to a permissions
 * plugin.
 *
 * Both of these used to be full sections on the page. They are reference
 * material: an owner reads them once while deciding whether the plugin will
 * run at all, and then never again. That is exactly the shape of thing that
 * belongs behind a button rather than in front of somebody who is trying to
 * get to the setup guide.
 */
function EMR_Requirements() {
  const admin = Permissions.filter((node) => node.fallback === "op");

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-server"
          title="Requirements and permissions"
          subtitle={`${PluginInformation.serverSoftware}, ${PluginInformation.supportedVersions}, and nothing else required.`}
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          There is nothing to install alongside it. Every integration below is
          optional, none of them is compiled against, none is shaded into the
          jar, and any that is absent is simply not listed rather than warned
          about. <span className="text-sky-300">/ep info</span> says which ones
          hooked, at any time.
        </Body>
      </Section>

      <Section>
        <Terminal title="EpicMobsRework / server-check.log">
          <pre>
            <code className="text-[10px] md:text-sm" lang="md">
              <TerminalLabel accent="ember">
                [SUPPORTED SERVER SOFTWARE]
              </TerminalLabel>
              {`
- SPIGOT [1.16.5 and upward]
- PAPER  [1.16.5 and upward]

api-version: 1.21

There is no NMS anywhere in the plugin and no
version-locked build. One jar covers every
supported version, and a Minecraft release that
did not exist when the jar was built is handled
by feature detection rather than by parsing a
version string.

Not available on Aternos.
              `}
              <TerminalLabel accent="ember">[DEPENDENCIES]</TerminalLabel>
              {`
REQUIRED
- nothing

OPTIONAL, detected if present
- Custom Enchantments 3, for mob enchantments,
  CE3 loot, RACO rewards and protected boundaries
- Kumandra's Economy, for Kd rewards tagged into
  the player's own transaction history
- Vault, with whatever economy sits behind it
- WorldGuard, for region protection. Without it
  the plugin has its own regions
- PlaceholderAPI, for live counts on a scoreboard

None of these is compiled against and none is
shaded into the jar. /ep info says which ones
hooked, and any that are absent are simply not
listed rather than warned about.
              `}
            </code>
          </pre>
        </Terminal>
        <div className="pt-5">
          <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
            Java 21 is what the plugin is built with, because that is what
            current Spigot needs. The jar itself still runs on the older servers
            in the supported range, on whatever Java they are on.
          </Note>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">PERMISSIONS</SubHeading>
        <Body className="pt-3 text-justify">
          {Permissions.length} nodes, and only {admin.length} of them is an
          administrative one. Every node is declared in the plugin&apos;s own
          plugin.yml, so any permissions plugin can read them. The player nodes
          default to everyone on purpose: a player looking up a mob they just
          fought, or choosing which currency their kills pay out in, is not an
          administrative act, and a server that disagrees can negate them. You
          only need to touch the first one if you want to hand mob building to
          staff who are not opped.
        </Body>
        <Panel accent="amber" className="mt-5 p-4">
          <div className="grid gap-2">
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
        </Panel>
      </Section>
    </div>
  );
}

export default EMR_Requirements;
