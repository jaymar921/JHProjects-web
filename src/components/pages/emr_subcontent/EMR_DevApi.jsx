import { DeveloperApi } from "../../contants/epic_mobs_rework/EMRConstants";
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
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/epic_mobs_rework/features";

/**
 * The developer API panel.
 *
 * This is longer than the equivalent section on an open source plugin's page,
 * and that is the point. Everything a developer would normally learn by
 * opening the source, they have to be told here instead: what is safe to hold
 * across a reload, which thread they may call from, what a Lite server does
 * with a mutating call, and why two obvious things are not exposed at all.
 *
 * Each rule below is one that cannot be discovered any other way, which is the
 * test for whether it belongs in this panel.
 */
function EMR_DevApi() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-code"
          title="The developer API"
          subtitle="Closed source, so the contract is published instead."
          accent="purple"
        />
        {DeveloperApi.premise.map((paragraph) => (
          <Body key={paragraph.slice(0, 40)} className="pt-4 text-justify">
            {paragraph}
          </Body>
        ))}
      </Section>

      <Section>
        <Shot
          src={FeatureArt.api}
          alt="The api artifact, what it exposes, and the rules for using it"
          accent="purple"
          caption="One jar, four views, ten queries, eleven events, and the rules that go with them"
        />
      </Section>

      <Section>
        <SubHeading accent="sky">GETTING IT</SubHeading>
        <Body className="pt-3 text-justify">
          <Cmd accent="sky">{DeveloperApi.artifact}</Cmd> is attached to every
          release. Add it at <Cmd accent="sky">provided</Cmd> scope, the same
          way you add Spigot, or drop the jar in and reference it directly. It
          has no dependencies of its own beyond the Bukkit API you already have.
        </Body>
        <Terminal title="pom.xml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="xml">
              <TerminalLabel accent="sky">[THE DEPENDENCY]</TerminalLabel>
              {`
<dependency>
    <groupId>me.JayMar921</groupId>
    <artifactId>EpicMobsRework</artifactId>
    <version>1.0</version>
    <classifier>api</classifier>
    <scope>provided</scope>
</dependency>
              `}
              <TerminalLabel accent="amber">[AND IN plugin.yml]</TerminalLabel>
              {`
softdepend: [ EpicMobsRework ]

# depend instead, if your plugin genuinely does not
# work without it. Either way you enable after it,
# which is what makes the line below safe.
              `}
              <TerminalLabel accent="purple">[HELLO WORLD]</TerminalLabel>
              {`
@Override
public void onEnable() {
    EpicMobsProvider.find().ifPresent(api ->
        getLogger().info("Epic Mobs " + api.version()
            + ", " + api.getDefinitions().size()
            + " definitions loaded"));
}

// find() gives an Optional and is what you want if
// your plugin works either way. get() throws when
// Epic Mobs is absent, which is the right answer for
// one that requires it: a silent null surfaces a
// hundred lines later as something else.
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="ember">THE FOUR THINGS YOU CAN HOLD</SubHeading>
        <Body className="pt-3 text-justify">
          A handle is a live view rather than a snapshot:{" "}
          <Cmd accent="ember">health()</Cmd> answers what the mob&apos;s health
          is when you ask. The lifetime column is the part worth reading, because
          it is the one thing about this API that will bite you.
        </Body>
        <div className="mt-5 grid gap-3">
          {DeveloperApi.views.map((view) => (
            <Panel key={view.name} accent={view.accent} className="p-4">
              <div className="flex flex-wrap place-items-center gap-3">
                <Chip accent={view.accent}>{view.name}</Chip>
                <span className="grow text-[11px] leading-relaxed text-slate-400 md:text-xs">
                  {view.what}
                </span>
              </div>
              <p className="pt-2 text-[10px] tracking-wide text-slate-500 md:text-[11px]">
                <i className="fa-solid fa-clock pr-2"></i>
                {view.lifetime}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">TEN QUERIES</SubHeading>
        <Body className="pt-3 text-justify">
          Names are case-insensitive everywhere, and a definition key is the
          display name in lower case, so{" "}
          <Cmd accent="amber">&quot;Frost Wolf&quot;</Cmd> and{" "}
          <Cmd accent="amber">&quot;frost wolf&quot;</Cmd> are the same
          argument. <Cmd accent="amber">isEpicMob</Cmd> is one hash lookup, so
          it is safe in a hot listener.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {DeveloperApi.queries.map((group) => (
            <Panel key={group.group} accent={group.accent} className="p-5">
              <SubHeading accent={group.accent}>{group.group}</SubHeading>
              <Bullets className="pt-3">
                {group.calls.map((call) => (
                  <Bullet key={call} accent={group.accent}>
                    <span className="font-mono text-[10px] md:text-[11px]">
                      {call}
                    </span>
                  </Bullet>
                ))}
              </Bullets>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="rose">ELEVEN EVENTS</SubHeading>
        <Body className="pt-3 text-justify">
          All in <Cmd accent="rose">{DeveloperApi.eventPackage}</Cmd>, all fired
          on the main thread. Every spawn path in the plugin funnels through one
          method, which is what makes one pre-spawn event enough: natural
          spawning, the boss schedule, raid and arena waves, packs, summons,
          spawners, triggers, the command and the API itself.
        </Body>
        <Panel accent="rose" className="mt-5 overflow-x-auto p-3 md:p-4">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-rose-300 md:text-[10px]">
                  Event
                </th>
                <th className="pixel-font px-2 py-2 text-center text-[8px] tracking-wider text-rose-300 md:text-[10px]">
                  Cancel
                </th>
                <th className="pixel-font px-2 py-2 text-[8px] tracking-wider text-rose-300 md:text-[10px]">
                  Fired
                </th>
              </tr>
            </thead>
            <tbody>
              {DeveloperApi.events.map((event) => (
                <tr
                  key={event.name}
                  className="border-b border-slate-800 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <td className="px-2 py-3 align-top font-mono text-[10px] whitespace-nowrap text-slate-200 md:text-[11px]">
                    {event.name}
                  </td>
                  <td className="px-2 py-3 text-center align-top">
                    {event.cancellable ? (
                      <i
                        className="fa-solid fa-circle-check text-xs text-rose-400"
                        title="Cancellable"
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-minus text-xs text-slate-600"
                        title="Not cancellable"
                      ></i>
                    )}
                  </td>
                  <td className="px-2 py-3 align-top text-[11px] text-slate-400 md:text-xs">
                    {event.when}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="purple">THREE THINGS WORTH SEEING</SubHeading>
        <Terminal title="YourPlugin.java" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="java">
              <TerminalLabel accent="purple">[MOVE A SPAWN, DO NOT REFUSE IT]</TerminalLabel>
              {`
@EventHandler
public void onPreSpawn(EpicMobPreSpawnEvent event) {
    if (event.getLocation().getBlockY() < 40) {
        event.setCancelled(true);
    }
}

// The location is mutable. Whatever it is when the
// event returns is where the mob appears, spawn
// guard included, so you can move one instead.
              `}
              <TerminalLabel accent="amber">[CHANGE THE DAMAGE]</TerminalLabel>
              {`
@EventHandler
public void onDamage(EpicMobDamageEvent event) {
    Player attacker = event.getAttacker();
    if (attacker != null
            && attacker.hasPermission("mine.slayer")) {
        event.setAmount(event.getAmount() * 1.5);
    }
}

// The amount is the amount that will really be
// dealt. Worth saying, because 1.4.13 zeroed the
// event after applying its own pool and everything
// downstream saw a hit that did nothing.
              `}
              <TerminalLabel accent="emerald">[ADD TO THE DROPS]</TerminalLabel>
              {`
@EventHandler
public void onLoot(EpicMobLootDropEvent event) {
    if (event.getMob().boss()) {
        event.getDrops().add(new ItemStack(Material.NETHER_STAR));
    }
}

// The list is live. Add, remove, clear, or cancel to
// drop nothing. Epic Mobs replaces vanilla drops
// rather than adding to them, so this list is
// everything the mob will drop.
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <SubHeading accent="emerald">FOUR MUTATING CALLS</SubHeading>
        <Body className="pt-3 text-justify">
          All four are full build. On Lite each returns empty or false and logs
          once per session naming the edition: nothing is silent and nothing
          throws. Check <Cmd accent="emerald">api.canMutate()</Cmd> if you would
          rather ask than be refused.
        </Body>
        <Panel accent="emerald" className="mt-5 p-5">
          <Bullets>
            {DeveloperApi.mutation.map((call) => (
              <Bullet key={call} accent="emerald">
                <span className="font-mono text-[10px] md:text-[11px]">
                  {call}
                </span>
              </Bullet>
            ))}
          </Bullets>
        </Panel>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-circle-info">
            Every query and every event works on Lite, so you can develop and
            test against the free build. What you should not be able to do is
            write a plugin that turns Lite into the full build, which is the
            whole of why the line is where it is.
          </Note>
        </div>
      </Section>

      <Section>
        <SubHeading accent="rose">THE RULES</SubHeading>
        <Body className="pt-3 text-justify">
          None of these can be worked out by reading the implementation, because
          the implementation is not published. That is exactly why they are
          written down here rather than left to be discovered.
        </Body>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {DeveloperApi.rules.map((rule) => (
            <Panel key={rule.title} accent={rule.accent} className="p-5">
              <div className="flex place-items-center gap-3">
                <IconBadge
                  icon="fa-solid fa-circle-exclamation"
                  accent={rule.accent}
                />
                <p className="pixel-font text-[9px] tracking-wide text-slate-200 md:text-[10px]">
                  {rule.title}
                </p>
              </div>
              <p className="pt-3 text-xs leading-relaxed text-slate-400 md:text-sm">
                {rule.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">A WORKED EXAMPLE</SubHeading>
        <Body className="pt-3 text-justify">
          A plugin that pays a bounty for boss kills and announces raid results.
          Everything in it is API surface: nothing reaches into the plugin.
        </Body>
        <Terminal title="BountyPlugin.java" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="java">
              <TerminalLabel accent="amber">[THE WHOLE PLUGIN]</TerminalLabel>
              {`
public final class BountyPlugin extends JavaPlugin
        implements Listener {

    private EpicMobsAPI epicMobs;

    @Override
    public void onEnable() {
        EpicMobsProvider.find().ifPresentOrElse(
            api -> {
                epicMobs = api;
                getServer().getPluginManager()
                    .registerEvents(this, this);
                getLogger().info("Hooked Epic Mobs "
                    + api.version());
            },
            () -> getLogger().warning(
                "Epic Mobs is absent, bounties are off."));
    }

    @EventHandler
    public void onDeath(EpicMobDeathEvent event) {
        if (!event.getMob().boss()
                || event.getKiller() == null) return;

        int killed = epicMobs.getKillCount(
            event.getKiller().getUniqueId(),
            event.getMob().definitionKey());

        // First kill of this boss pays double.
        int bounty = event.getMob().tier()
            * (killed <= 1 ? 200 : 100);
        pay(event.getKiller(), bounty);
    }

    @EventHandler
    public void onRaidEnd(RaidEndEvent event) {
        if (!event.isDefeated()) return;

        getServer().broadcastMessage(
            event.getRaid().title() + " fell to "
            + event.getParticipants().size() + " players.");
    }
}
              `}
            </code>
          </pre>
        </Terminal>
      </Section>

      <Section>
        <Note accent="purple" icon="fa-solid fa-book">
          {DeveloperApi.guide} If you are building something against this and a
          shape you need is not exposed, the request is worth sending: widening
          the contract on purpose is a normal thing to do and widening it by
          accident is what the artifact boundary exists to prevent.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_DevApi;
