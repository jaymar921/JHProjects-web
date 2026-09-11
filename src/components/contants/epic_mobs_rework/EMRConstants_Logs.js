/**
 * The release history for Epic Mobs Rework, newest first.
 *
 * Same shape as KumandraConstants_Logs.js, and the Changelog component reads
 * it the same way: an entry with no `release_date` is still in development and
 * renders with the IN DEV badge instead of a date.
 *
 * Two entries, both release candidates. **Neither is 1.0**, and that is the
 * whole reason the version string carries the suffix everywhere it is printed
 * rather than only in the title. A release candidate that reads as a release
 * on a web page is a release candidate nobody treats as one, and the point of
 * publishing it is to be told what breaks.
 *
 * RC2 was coded in the days after RC1 and made public on 11 September 2026,
 * and the date on it is the day it went public, because that is the day a
 * server owner could have had it.
 *
 * When 1.0 proper ships, add an entry above these rather than editing either
 * one's version. What each RC was is part of the record: the three things
 * RC1 asked testers for are the three things RC2 still asks for, and the
 * three things 1.0 will be able to say it has had.
 *
 * The old Epic Mobs releases are not in here. They are on /epic-mobs, which is
 * the record of a plugin that stopped, and folding them into this list would
 * make the rework look like it has fourteen releases behind it.
 *
 * Source of truth for everything below: CHANGELOG.md and
 * releases/1.0-RC1-release.md and releases/1.0-RC2-release.md in the plugin
 * repository.
 */

export const EMR_Logs = [
  {
    update_version: "1.0-RC2",
    release_date: "2026-09-11",
    changes: [
      {
        update: "Read this first",
        sublist: [
          "Second release candidate. If you are on RC1, this is the one to run. Raids can now happen at a time of day and in a dimension, and playing the new Nether raid found four bugs in an evening, one of which had been quietly making the whole feature impossible",
          "Back up plugins/EpicMobsRework before updating. Your config.yml and your raid files are never overwritten, so two of the changes below need a line added by hand on an upgrading server, and both are spelled out under Read this before you update",
          "Tested on Minecraft 26.2 and checked against the 1.16.5 API",
          "The full build has moved to a new Spigot listing. The download button on this page points at it; the Lite listing is unchanged",
        ],
      },
      {
        update: "Raids can wait for dark",
        sublist: [
          "One line in a raid file: time-of-day: NIGHT, or DAY, or ANY, which is the default. It reads the world clock, not your server's",
          "It matters most for a raid built out of spiders, which are hostile at night and passive by day, so the World Infestation ships with it set. A hundred and twenty mobs that will not fight anybody is not a raid",
          "It gates the start and nothing else. A night raid that runs past sunrise keeps running, because a raid you could win by waiting for morning is not a raid",
          "This is a different setting from raids.schedule, which reads the wall clock on the machine and is the one for raids in the evening when your players are online. A raid can want a weekday evening and a dark sky, so the two are independent",
          "A command start ignores it, the same way it ignores the chance roll. Somebody testing a night raid at noon is testing the raid",
        ],
      },
      {
        update: "Raids can happen in the Nether and the End",
        sublist: [
          "dimension: NETHER, or END, OVERWORLD, or ANY, the default. Three things follow from that line",
          "Only players in that dimension are in the raid. Somebody mining in the overworld gets no bar, no kill count and no payout, however close to the portal they are standing",
          "Each dimension raids on its own clock. raids.nether and raids.end carry their own interval, chance, min-players, abandon-after and enabled, each falling back to the server-wide setting. The Nether tries every 10 Minecraft days and the End every 15, against the overworld's 20, because a dimension people visit for twenty minutes at a time has to try more often to happen at all. The three schedulers are independent, so the Nether being under siege never stops the overworld starting a raid",
          "The raid clock pauses while the dimension is empty. Going back through the portal for blocks or food is part of fighting in the Nether and must not cost you the raid, so the time limit stops running whenever nobody is in it. /ep info says clock paused while it is stopped, and abandon-after, 20 minutes there, still ends a raid nobody ever comes back to",
          "A Nether or End raid is always GLOBAL. The dimension is the participation radius, and a fixed point in the Nether is a point nobody is standing at. A file that says otherwise is corrected with a warning rather than skipped",
          "Two new raids and twenty new mobs come with it, full build: The Nether Legion, 70 kills from the Ashvein Skulker up to the Gloomforge Tyrant, and The End Incursion, 100 kills from the Void Mite up to the Voidmaw Sovereign. Same iron-armour ladder as the shipped twenty",
          "/ep raid start routes to the raid's own dimension's manager, /ep raid stop stops every running raid, /ep raid list prints the dimension and the hour, and /ep editor raid has buttons for both new settings on its anchor page. Every raid placeholder answers about the raid the viewing player is actually in, and %epicmobs_raid_dimension% is new",
        ],
      },
      {
        update: "Read this before you update",
        sublist: [
          "Add your Nether and End worlds to general.worlds. Nothing spawns and no raid runs in a world that is not on that list, and your config.yml is never overwritten, so an upgrading server keeps whatever it has. A dimension: NETHER raid on a server that lists only world can never start. The boot summary now says so by name, and names the line to edit",
          "Your existing raid files are not overwritten either, so the World Infestation on a server that already has it will not become a night raid on its own. Add time-of-day: NIGHT to raids/world-infestation.yml by hand, or delete the file and let the plugin write the new one",
          "New built-in content now reaches an existing install. Until this build the shipped set was only ever written on a genuinely fresh start, so an RC1 server would have kept its twenty mobs and never seen these twenty. Each built-in file is now written once, ever, recorded in installed-content.yml. That is what lets new content arrive on an upgrade while a mob you deleted stays deleted. This closes the last known gap RC1 listed",
        ],
      },
      {
        update: "Lite",
        sublist: [
          "Lite ships one raid now, and it is the World Infestation. It loads one raid definition, so being sent two meant carrying a raid it could never run and naming it in the limit summary on every start: content you can see, can edit, and cannot use",
          "The World Infestation is the one because at: GLOBAL has no world name and no radius to get wrong, where the Hollow Siege anchors at world: world and quietly degrades on any server that renamed its overworld. All the commentary moved into it, so the raid format is still documented on disk",
          "An existing Lite install is untouched and keeps the Hollow Siege. Changing the raid a running server fights is not worth a tidier boot summary",
          "dimension: and time-of-day: themselves work in Lite. What Lite does not get is the two new raids and the twenty mobs in them",
          "With one raid file, choosing a dimension is choosing it instead of everything else. A Lite server whose only raid says dimension: NETHER has no overworld raids at all, and nothing is broken: that is the one raid doing exactly what it was told",
        ],
      },
      {
        update: "What playing it found",
        sublist: [
          "Four bugs, and the reason they are worth writing down is that three of them printed the same message, placed 0 of 1 wanted, with no reason attached. Each one looked exactly like the last, which is why it took three passes to get to the bottom of it. The raid debug line now reports what it actually asked for",
          "A mob with no environments: list is overworld only. Correct for natural spawning, wrong for a summoned one, and this was the fault actually stopping the Nether raid. The raid file said the Nether, the raid ran in the Nether, the search found good ground, and every candidate was refused because the mob had not separately been told the Nether exists. Fixed at the rule rather than by adding a line to twenty files, because the next person writing a Nether raid would hit the same trap and the same silence",
          "The Nether has no surface. The location finder reads the heightmap, which in a roofed world answers with the bedrock roof for every column. A roofed world is searched in a band around your own height now. Third time a surface finder has been pointed at something that is not a surface, after natural spawning and arenas",
          "The search geometry was wrong for the terrain. A 90 degree wedge 17 to 35 blocks out is solid rock in a Nether cavern. raids.nether has its own tighter ring and no compass arc, and there is now a minimum placement distance everywhere, because without an arc the inner radius was zero and that put mobs on the player's face",
          "A raid that could place nothing retried forever. The throttle that exists to prevent exactly that measured from the last successful placement, and a raid placing nothing never has one",
          "The Nether Legion is retuned for the fight it turned out to be: mobs from every side at 15 blocks in tunnels with nowhere to back into. Damage came down harder than health, because in a corridor what you feel is how hard each hit lands rather than how long the mob lives. Kill goal 90 to 70, every wave smaller. Judged from the terrain and confirmed by playing it once; it still wants more",
        ],
      },
      {
        update: "Also fixed",
        sublist: [
          "/ep raid start said 0 players online to somebody standing in the game, because a player in an unlisted world is counted as nobody. It now says how many are connected, which worlds Epic Mobs acts in, and what to edit",
          "Opening a GLOBAL raid in /ep editor raid and pressing save quietly turned it into an ordinary local one, whether or not you touched that page. The regression test is a real round trip and was confirmed to fail without the fix",
          "366 tests in the full build and 341 in Lite, up from 332 and 313. Every regression test in this build was confirmed to fail with its fix reverted. The 1.16.5 compatibility check is clean, including every Material and EntityType in the new content",
        ],
      },
      {
        update: "Still what the RC is for",
        sublist: [
          "Nobody has finished an arena, fought a raid with two people, or claimed and levelled a companion. Those need servers other than the author's",
          "The four remaining known gaps are unchanged from RC1: a restart ends a running event, the two CE3 gaps waiting on the 1.0 release, and biome #tags that Spigot gives no way to read",
        ],
      },
    ],
    note: "1.0-RC2, coded in the days after RC1 and made public 11 September 2026. Still a release candidate, still no date for 1.0 and still no guess at one. Bugs and feedback go to the discussions tab on either Spigot listing, or to the form on this page.",
  },
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
