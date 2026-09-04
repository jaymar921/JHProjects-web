/**
 * The release history for Epic Mobs Rework, newest first.
 *
 * Same shape as KumandraConstants_Logs.js, and the Changelog component reads
 * it the same way: an entry with no `release_date` is still in development and
 * renders with the IN DEV badge instead of a date.
 *
 * Right now there is exactly one entry and it has no date, because the plugin
 * has not shipped. That is deliberate. A changelog on an unreleased plugin is
 * still worth having, as long as it says what is done rather than what is
 * planned: an owner deciding whether to wait for this needs to be able to see
 * how much of it exists, and a list of future features would tell them the
 * opposite of that.
 *
 * When 1.0 ships, give this entry a release_date and add the next one above
 * it. Nothing else on the page has to change.
 *
 * The old Epic Mobs releases are not in here. They are on /epic-mobs, which is
 * the record of a plugin that stopped, and folding them into this list would
 * make the rework look like it has thirteen releases behind it.
 */

export const EMR_Logs = [
  {
    update_version: "1.0",
    release_date: null,
    changes: [
      {
        update: "Read this first",
        sublist: [
          "This is a rework of Epic Mobs, not an update to it. The old plugin stopped at 1.4.13 in April 2023 and is on the shelf at /epic-mobs. Nothing here is a patch on that jar",
          "It has not been released. There is no download, no listing and no date, and this page will carry all three the day there is something to carry",
          "It ships as two jars: a free Lite build and a paid full one, split at compile time from one source tree. Nothing in either one expires, checks a licence or phones home",
          "Coming from the old plugin? Your mob definitions, raids, spawners and loot are converted on first start, and nothing is deleted. The old files stay in place renamed",
        ],
      },
      {
        update: "What is finished",
        sublist: [
          "The two-jar build. A premium-only class is absent from the Lite jar rather than disabled in it, and the release workflow fails rather than shipping if one leaks into it",
          "The release pipeline. A pushed tag builds both editions, verifies the Lite jar carries no premium class and neither jar shades an optional plugin's classes, and publishes them together",
          "The configuration specification. Every key the plugin will read, what it replaces, and what it is validated against",
          "The defect backlog. Forty numbered defects in the 1.4.13 source, each with what it breaks and the order to fix them in. That list is what the rework is working through",
          "Both store descriptions and their art, written to be evergreen so a release does not need an edit to either of them",
        ],
      },
      {
        update: "What the rework is fixing",
        sublist: [
          "The old plugin had no spawn budget. It could spend a very long tick searching for somewhere to put a mob, and a raid attempted five spawns per mob per player every cycle with no ceiling on how many were alive. 1.0 has a hard cap per world and per chunk and a millisecond budget for the search itself",
          "The old plugin zeroed the damage event to apply its own health pool, which meant no other plugin could see an Epic Mob being hit. 1.0 scales the entity's own max health instead, so Custom Enchantments 3 weapons work against Epic Mobs like they work against anything else",
          "The old plugin had an AuthPlugin that wrote a trial expiry into the world folder and disabled itself six days after install, on paying customers' servers. It is gone, along with the isLicensed() method whose entire body was 'return true'",
          "A dozen values that should have been settings were constants in the source: the ability radius, the mob density limit, the chunk restore distance, the lag reducer interval, the raid tier rates. All of them are config keys now",
          "Mob definitions were a serialized blob no owner could open, edit or share. They are one readable file per mob",
          "A mob pointing at a biome, entity, ability or summon that did not exist failed silently the first time it tried to spawn. It is caught on boot and named",
        ],
      },
      {
        update: "What is being built now",
        sublist: [
          "The source rework itself. The 1.4.13 tree targets the 1.19 API and does not compile against the current one, so making it build is step one",
          "The ability system: sixteen hard-coded behaviours on one shared timer, replaced by definitions with triggers, per-ability radius and cooldown, telegraphs, effect lists and conditions",
          "The loot system: weighted tables with guaranteed drops, roll counts and damage-share attribution, in place of two flat lists rolled against one global chance",
          "The spawn rule engine, the integrations, and the diagnostics that make everything after them easier",
        ],
      },
      {
        update: "Where to send things",
        sublist: [
          "Feature requests are worth sending now rather than after release, because the design is still moving. Use the bug report form on this page and say what you want it to do",
          "Bug reports against the old Epic Mobs are not being fixed in that plugin, but they are worth sending: the backlog this rework is working through was built out of exactly that",
        ],
      },
    ],
    note: "No release date. When there is one it goes on this page before it goes on Spigot.",
  },
];
