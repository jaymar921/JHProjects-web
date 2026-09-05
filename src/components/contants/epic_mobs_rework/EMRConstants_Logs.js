/**
 * The release history for Epic Mobs Rework, newest first.
 *
 * Same shape as KumandraConstants_Logs.js, and the Changelog component reads
 * it the same way: an entry with no `release_date` is still in development and
 * renders with the IN DEV badge instead of a date.
 *
 * There is one entry and it has a date on it now. **It is 1.0-RC1, not 1.0**,
 * and that is the whole reason the version string carries the suffix
 * everywhere it is printed rather than only in the title. A release candidate
 * that reads as a release on a web page is a release candidate nobody treats
 * as one, and the point of publishing it is to be told what breaks.
 *
 * When 1.0 proper ships, add an entry above this one rather than editing this
 * one's version. What RC1 was is part of the record: the three things it asked
 * testers for are the three things 1.0 will be able to say it has had.
 *
 * The old Epic Mobs releases are not in here. They are on /epic-mobs, which is
 * the record of a plugin that stopped, and folding them into this list would
 * make the rework look like it has fourteen releases behind it.
 *
 * Source of truth for everything below: CHANGELOG.md and
 * releases/1.0-RC1-release.md in the plugin repository.
 */

export const EMR_Logs = [
  {
    update_version: "1.0-RC1",
    release_date: "2026-09-06",
    changes: [
      {
        update: "Read this first",
        sublist: [
          "This is a release candidate, not the 1.0 release. Every feature on the 1.0 list is built and in this build. What it has not had is servers other than the author's, which is the one thing that cannot be done alone and the entire reason it is published",
          "Both editions are up on Spigot. Lite is free and complete within its limits, and if you can only test one, test that one",
          "It is a rework of Epic Mobs, not an update to it. The old plugin stopped at 1.4.13 in April 2023 and is on the shelf at /epic-mobs. Nothing here is a patch on that jar",
          "Coming from the old plugin? Your mob definitions, raids, spawners and loot are converted on the first start. Nothing is deleted: the originals are kept as .migrated files so the migration can be undone by hand. Back up plugins/EpicMobs before updating anyway",
          "Tested on Minecraft 26.2 and 1.21.5, and checked against the 1.16.5 API. Those two versions are the only ones it has actually run on",
        ],
      },
      {
        update: "Why a release candidate rather than 1.0",
        sublist: [
          "Because two rounds of actually playing it found bugs that nothing else was ever going to, and a third round should happen before the version number stops moving",
          "Both rounds found the same kind of fault: a subsystem that reported progress it was not making. A raid drew its boss bar, counted its waves up and ran its timer while spawning nothing. An arena did the same. Neither threw an error, neither logged a word, and both looked like they were working right up until you counted the mobs",
          "Those are fixed, and the plugin now says so in the console when a raid or an arena places nothing three times running, because the fix for the next one of these is being told about it",
        ],
      },
      {
        update: "Raids, which is where most of the work went",
        sublist: [
          "A wave is a share of the kill goal rather than a tick of a clock. The Hollow Siege used to reach wave 4 of 4 about two minutes in with seven of its eighty kills done. Eighty kills over four waves is twenty each now, and wave two does not begin until the first twenty are dead",
          "Raid mobs that had pathed away from the fight used to hold a slot of the concurrent cap forever: alive, in a loaded chunk, and unreachable. Enough of them and the raid stopped spawning entirely. They are swept and replaced now",
          "Mobs arrive in clusters where the fight already is, a kill brings its replacement to where the last one died, and a raid with no fixed anchor spawns around a per-player epicentre rather than around a moving player. One at a time and hundreds of blocks apart meant defending your base involved leaving it",
          "Walk far enough from your epicentre and it follows you, because running away is a real answer and losing a raid by walking is not",
          "Each wave arrives from its own side: west, then east, then north, then south, then the diagonals. A wave from every direction at once is a ring, and a ring reads as ambient spawning with a boss bar over it. The announcement says which way to look. raids.waves.rotate-direction: false gives the ring back",
          "A particle trail points at raid mobs you have never hit, drawn for you alone, so something behind a hill can still be found",
          "Raid mobs no longer spawn inside hills. A cluster used to give every offset the searched point's height, which buries a mob in the slope next to it on anything but flat ground, where it suffocates while still counting against the cap. Every offset finds the ground of its own column",
          "A new anchor mode, GLOBAL: no place, no defender, no participation radius. Everybody on the server is in it wherever they are standing and the waves are dealt out around them in turn, so a server of ten gets ten fights rather than one fight and nine spectators",
          "World Infestation is the shipped raid built on it: 120 kills over four waves, thirty minutes, and a Hive Colossus at the end",
          "All of the pacing is configurable under raids.waves: count, field-share, top-up-at, cluster-size, cluster-spread, per-kill, epicentre-radius, epicentre-flee-distance, stray-distance, trail-interval and rotate-direction",
        ],
      },
      {
        update: "Arenas, which had never worked",
        sublist: [
          "An arena ran its waves with a player standing in it and never spawned a single mob, on any indoor room, always. The location finder answers with the world's surface, an arena is a room with a roof on it, so every candidate was outside the region and every one was discarded. It searches the region's own height band now",
          "There was also no way to create an arena at all. Stand in one corner and run /ep arena pos1, stand in the opposite corner and run /ep arena pos2, then /ep arena create <name>. That writes the file with the region already correct, your position as the entry point, a party size of 1 to 4 and two example waves",
          "/ep arena info <name> now says whether you are currently standing inside the region, which is the line to check first whenever one is not starting",
        ],
      },
      {
        update: "Twenty mobs ship instead of seven, all rebalanced",
        sublist: [
          "The old numbers were brutal: a Frost Wolf had 750 health and hit for 45, which two-shots a player through iron. It has 280 and 16 now",
          "Everything is on an iron-armour baseline. A player in full iron with an iron sword beats a tier one to three mob one on one with effort, and tier four upward wants diamond, potions or a group",
          "The thirteen new ones extend the Hollow siege line and the frost wilds, add a desert line, and add the five infested mobs the World Infestation is made of",
          "On Lite those twenty are built in: they do not count against the ten definitions Lite lets you write, so you get a working server out of the box and still have all ten to spend on your own ideas. The trade is that Lite cannot delete them. Editing them is always allowed and an edited one is never overwritten",
          "The full build may delete them, and a deleted one stays deleted",
        ],
      },
      {
        update: "And the rest of it",
        sublist: [
          "A raid editor. /ep editor raid is the mob editor's design applied to a raid: the goal and wave split, the anchor with a Set to where I am standing button, the waves and the mobs in each, the fallback pool, the boss and the three prize tiers, plus a Test start that saves and runs it",
          "Tab completion handles names with spaces. Type /ep modify delete Crypt, press tab, and you get Warden, Servant and Archer. It used to offer the first word of each name and nothing after it",
          "The plugin checks for its own updates, once, on a background thread, and tells you in the console and when an admin joins. It only ever reads: nothing downloads and nothing replaces the jar",
          "A full command reference ships with the plugin and is the wiki page: every command, every permission, and what a player versus the console may run",
          "332 tests in the full build and 313 in Lite, up from 316 and 297, plus a bytecode check that every Bukkit call the jar makes exists on 1.16.5 as well as on 26.2",
        ],
      },
      {
        update: "What would most help, if you are running it",
        sublist: [
          "A raid fought by more than one person. The call for help, somebody running in from outside and finding they are in the raid, their kills counting, the leaderboard, and the payout at the end. All of that needs two players and has never had them",
          "An arena finished. Build a room, mark it, and see it through to the prizes with a friend. Everything up to the first spawn is known to work and everything after it is still only reasoned about",
          "A companion claimed, levelled up and killed. Riding one and the command wheel have been driven. The rest has not",
          "A boot on a Minecraft version older than 1.21.5, even one that works",
          "/ep info and /ep debug spawn pasted into the report. That is genuinely more useful than a description and it is usually the whole answer",
        ],
      },
      {
        update: "Known gaps, deliberately not fixed for the release candidate",
        sublist: [
          "Pack membership, a running raid and a running arena do not survive a server restart. A raid leaves its mobs standing in the world as ordinary Epic Mobs; an arena takes its own with it. This is a trade against keeping a second persistence format in step with the first",
          "Custom Enchantments 3 enchantments on a mob deal their damage but do not each behave individually yet. Bleed hurts, but it does not bleed. CE3 exposes no entry point for it and Epic Mobs will not reimplement CE3's effects, because two implementations of Bleed drift apart within one release of either plugin. The request is written and sitting in the CE3 repository",
          "Biome #tag spawn conditions parse and are carried, but Spigot exposes no biome tag accessor at all, so the condition is ignored. /ep info reports the capability as unavailable rather than letting you find out from an empty tundra",
          "New built-in content will not reach an existing full-build install, because the shipped files are written only on a genuinely fresh start. It does not bite for RC1, where every install is a first run",
        ],
      },
    ],
    note: "1.0-RC1, published 6 September 2026. There is no date for 1.0 proper and there will not be a guess at one: 1.0 is what this becomes when the reports stop turning things up. Bugs and feedback go to the discussions tab on either Spigot listing, or to the form on this page.",
  },
];
