/**
 * The step by step walkthroughs, one per job an owner actually sits down to do.
 *
 * Epic Mobs Rework is closed source. Nobody can read the plugin to find out
 * what the fourteenth question of the wizard is, which page of the editor holds
 * equipment, what makes a raid fire on its own, or why an arena says
 * "standing: 0" to somebody standing in it. So it is written down here, and it
 * is taken from the plugin itself rather than paraphrased from memory:
 *
 *   - the wizard questions are the CREATE list in wizard/MobWizard.java, in
 *     order, with the hint the plugin prints under each one
 *   - the editor pages are the Page enum in editor/MobEditor.java
 *   - the raid scheduler gates are RaidManager.tickSchedule, in the order it
 *     checks them, which is the order they refuse in
 *   - the arena outcomes are ArenaService.Outcome
 *   - every default number is the one in documents/config/1.0-config-spec.md
 *
 * Anything here that changes in the plugin has to change here too, which is
 * the cost of documenting a closed source plugin and is cheaper than the
 * support thread that gets written instead.
 */

/** Rendered as the small edition tag on a guide's header. */
export const GUIDE_EDITIONS = Object.freeze({
  both: { label: "LITE AND FULL", accent: "emerald" },
  full: { label: "FULL BUILD", accent: "ember" },
});

export const Walkthroughs = [
  /* ------------------------------------------------------------------ MOBS */
  {
    key: "create-mob-chat",
    group: "Mobs",
    title: "CREATE A MOB WITH A COMMAND",
    short: "Create a mob, by command",
    icon: "fa-solid fa-keyboard",
    accent: "purple",
    edition: "both",
    blurb:
      "The chat wizard. Fourteen questions, answered one at a time in chat, and it writes the same file the editor writes. It is slower than the GUI, and it is the one that works on Lite, over RCON, and on a server you are administering from a phone.",
    steps: [
      {
        n: "1",
        title: "START IT",
        cmd: "/ep create mob",
        body: "Run it in game rather than from the console: two of the fourteen questions read your inventory, and the console has not got one. Every prompt is numbered, so the chat says step 3/14 and you always know how much is left. Type cancel at any point and nothing is written.",
      },
      {
        n: "2",
        title: "ANSWER THE FOURTEEN",
        body: "One question per message, in the order below. Each prints a grey hint under it saying what a valid answer looks like. A wrong answer is refused with the reason and asked again rather than moving on, so you cannot reach the end holding a mob that will not load.",
        questions: [
          ["What is the mob called?", "any text, spaces are fine"],
          ["Which entity type?", "e.g. ZOMBIE, WOLF, SKELETON"],
          ["Which tier?", "TIER_1 to TIER_6"],
          ["How much health?", "a number above zero"],
          ["How much damage per hit?", "a number"],
          ["Percent damage reduction?", "0 to 95"],
          [
            "When does it spawn?",
            "SUMMON, BOSS, NORMAL_DAY or NORMAL_NIGHT",
          ],
          ["Which biomes?", "comma separated, or 'any'"],
          [
            "Which abilities?",
            "comma separated names from /ep info, or 'none'",
          ],
          ["Should it have AI?", "yes or no"],
          [
            "How many XP levels for the kill?",
            "a whole number, 0 for none",
          ],
          ["How much money for the kill?", "a number, 0 for none"],
          [
            "Hold the gear it should wear and type 'take', or 'skip'",
            "reads your inventory",
          ],
          [
            "Hold the items it should drop and type 'take', or 'skip'",
            "reads your inventory",
          ],
        ],
      },
      {
        n: "3",
        title: "THE TWO QUESTIONS THAT READ YOUR INVENTORY",
        cmd: "take",
        body: "Questions thirteen and fourteen do not want typing. Put the armour and weapon the mob should wear into your inventory, type take, and it tells you how many items it took. Then empty your inventory, put the drops in, and type take again for the next one. Type skip for either if you do not want one.",
      },
      {
        n: "4",
        title: "IT SAVES AND RELOADS ITSELF",
        body: "The last answer writes mobs/<name>.yml and reloads the plugin, so the mob exists the moment the wizard ends. It names the file it wrote. There is no separate save step and nothing to reload by hand.",
      },
      {
        n: "5",
        title: "LOOK AT WHAT YOU MADE",
        cmd: "/ep summon <name>",
        body: "Summon it and fight it. Summon bypasses the mob's own spawn conditions and its chance roll, so you are testing the mob rather than testing whether the world felt like producing one. Then open the file, change a number, /ep reload, summon again. That loop is the whole job.",
      },
    ],
    watch: [
      "A name that is already taken is refused: the wizard will not quietly overwrite another mob.",
      "The entity has to be a spawnable living type. A non-living one cannot carry health, gear or a name plate, and the wizard says so rather than letting you find out at spawn time.",
      "An ability name that does not exist is refused at question nine. /ep info lists the ones your server has loaded.",
      "Two admins can run the wizard at the same time. Every session is keyed to the player, which the old plugin's edit wizard was not.",
      "/ep modify edit <mob> reopens the wizard on an existing mob, and asks the five numbers worth changing rather than all fourteen.",
    ],
    file: {
      title: "EpicMobsRework / mobs / alpha-frost-wolf.yml",
      lang: "yaml",
      label: "[WHAT THE FOURTEEN ANSWERS WRITE]",
      body: `
name: "Alpha Frost Wolf"
entity: WOLF
tier: TIER_3

health: 120
damage: 9
resistance: 20
ai: true

spawn:
  environment: NORMAL_NIGHT
  biomes: [ SNOWY_TAIGA, GROVE ]

abilities: [ "Frost Bite" ]

rewards:
  xp-levels: 4

# From question 13, into the gear slots.
equipment:
  hand: DIAMOND_SWORD

# From question 14.
drops:
  - { item: BONE, amount: 1-3 }
      `,
    },
    shot: "chatWizard",
    shotAlt: "The chat wizard editing the Alpha Frost Wolf",
    shotCaption:
      "The wizard mid-run. Each prompt is numbered out of fourteen and prints what a valid answer looks like underneath it",
  },

  {
    key: "create-mob-editor",
    group: "Mobs",
    title: "CREATE A MOB IN THE EDITOR",
    short: "Create a mob, in the editor",
    icon: "fa-solid fa-window-restore",
    accent: "ember",
    edition: "full",
    blurb:
      "The GUI. The same job as a set of pages you can leave and come back to, where every value is visible while you change it, and where a typo on step nine does not mean starting again.",
    steps: [
      {
        n: "1",
        title: "OPEN IT",
        cmd: "/ep editor",
        body: "A searchable, paged list of every mob you have. Click one to edit it, or start from a blank definition. Naming one on the command line, /ep editor Frost Wolf, opens straight into that mob.",
      },
      {
        n: "2",
        title: "WORK THROUGH THE PAGES",
        body: "Six pages hang off the main screen, and you can move between them in any order and as often as you like. Nothing is committed until you save.",
        pages: [
          [
            "Stats",
            "Health, damage, resistance and tier. Click to adjust, with the value on screen while you change it.",
          ],
          [
            "State",
            "AI, faction, whether it is a boss, and the rest of the flags a mob carries.",
          ],
          [
            "Equipment",
            "A real inventory. Drag actual items into the gear slots. Anything you drop into a slot the page does not read is handed straight back to you rather than eaten.",
          ],
          [
            "Abilities",
            "Add and remove abilities, from the ones the server has loaded.",
          ],
          [
            "Loot",
            "The drop table: entries, weights, guaranteed drops and roll counts.",
          ],
          [
            "Spawn rules",
            "Environment, biomes, chance and the rest of the conditions that decide where the mob belongs.",
          ],
        ],
      },
      {
        n: "3",
        title: "TEST IT BEFORE YOU SAVE IT",
        cmd: "Test spawn",
        body: "Drops the draft next to you without saving anything. Fight it, change a number, spawn it again. Duplicate copies the whole definition under a new name, which is the fastest way to build a family of mobs that differ by two values.",
      },
      {
        n: "4",
        title: "READ THE WARNINGS WHILE YOU ARE LOOKING AT IT",
        body: "The editor does not build a mob its own way. It edits the definition's YAML, then writes that YAML out and reads it back exactly as a file is read, so what it previews is what the file will do, and every warning the loader would print on boot is shown against the draft while you are standing in front of it.",
      },
      {
        n: "5",
        title: "SAVE",
        cmd: "Save",
        body: "Writes mobs/<name>.yml and reloads. Blocks the editor has no page for, phases:, summons:, rewards: and hand-written codex text, are carried through untouched rather than dropped, so a file you wrote by hand is safe to open in the GUI.",
      },
    ],
    watch: [
      "Full build only. On Lite the command is not there at all, and /ep create mob is the route: it writes exactly the same file.",
      "Each admin gets their own session, so two people can edit two mobs at once without colliding.",
      "Opening a page closes the one before it. That is normal, and leaving the equipment page saves its inventory into the mob's gear rather than losing it.",
      "A mob built in the editor can be reopened in the chat wizard and the other way round. There is one file format and both write it.",
      "Copying a file in mobs/ and reloading is a perfectly good third way to make a mob, and for a family of similar mobs it is the fastest of the three.",
    ],
    shot: "editorMob",
    shotAlt: "A mob open in the admin GUI editor",
    shotCaption:
      "The editor on a mob: the same fields the wizard asks for, laid out as pages, with a test spawn and a live preview of what the file will do",
  },

  {
    key: "delete-mob",
    group: "Mobs",
    title: "DELETE A MOB",
    short: "Delete a mob",
    icon: "fa-solid fa-trash",
    accent: "rose",
    edition: "both",
    blurb:
      "One command, and one rule about the twenty mobs that ship with the plugin that is different on each edition.",
    steps: [
      {
        n: "1",
        title: "CHECK WHAT IT IS CALLED",
        cmd: "/ep list",
        body: "Every defined mob, raid, pack and arena, by name. Names with spaces are fine: tab completion offers them one word at a time, because Minecraft replaces the word your cursor is in and nothing else.",
      },
      {
        n: "2",
        title: "DELETE THE DEFINITION",
        cmd: "/ep modify delete <mob>",
        body: "Deletes mobs/<name>.yml. It removes the definition, not the mobs already standing in your world: anything alive keeps fighting until it dies or is cleared.",
      },
      {
        n: "3",
        title: "CLEAR THE ONES ALREADY OUT THERE",
        cmd: "/ep clear",
        body: "Removes every live Epic Mob from the world. It does not touch vanilla mobs and it deletes no definitions. Run it after a delete if you would rather not meet the ones that are already spawned.",
      },
      {
        n: "4",
        title: "OR DELETE THE FILE BY HAND",
        cmd: "/ep reload",
        body: "The definitions are one readable file per mob under mobs/. Deleting a file and reloading does the same thing as the command, which is the way to remove twenty of them at once.",
      },
    ],
    watch: [
      "On Lite the twenty built-in mobs cannot be deleted. They do not count against the ten definitions Lite lets you write, and the other half of that bargain is that they stay. You can edit them freely, and an edited built-in is never overwritten.",
      "On the full build a built-in can be deleted, and a deleted one stays deleted: the plugin will not write it back on the next boot, because a plugin that restores what its owner removed is a plugin arguing with its owner.",
      "Anything still naming a deleted mob, a raid wave, a pack member or an arena wave, is reported on the next load by name and file rather than failing silently when the wave tries to spawn it.",
    ],
  },

  {
    key: "mob-spawning",
    group: "Mobs",
    title: "HOW A MOB SPAWNS",
    short: "How a mob spawns",
    icon: "fa-solid fa-earth-americas",
    accent: "sky",
    edition: "both",
    blurb:
      "Six ways a mob reaches the world, the conditions each is checked against, and the one command that tells you why the mob you wanted did not turn up.",
    steps: [
      {
        n: "1",
        title: "SAY WHICH WORLDS THE PLUGIN MAY ACT IN",
        cmd: "general.worlds",
        body: "One line in config.yml. Name the worlds, or leave the list empty to run everywhere. Do this before anything spawns rather than after, because a world that is not listed is the single most common reason a perfectly good mob file never produces anything.",
      },
      {
        n: "2",
        title: "GIVE THE MOB ITS CONDITIONS",
        cmd: "spawn:",
        body: "In the mob's own file. environment is SUMMON, BOSS, NORMAL_DAY or NORMAL_NIGHT, and SUMMON means it never arrives on its own: it is placed by a command, an egg, a trigger or a wave. Then biomes, and whatever else you want to hold it to.",
      },
      {
        n: "3",
        title: "TURN NATURAL SPAWNING ON",
        cmd: "spawning.natural",
        body: "Every interval, ninety seconds as shipped, each player rolls chance, a fifth as shipped. A hit searches for a spot between min-range and range of that player, sixteen to fifty blocks, so nothing appears in their face, and places a group of two or three. No more than max-nearby-per-player, twenty, are kept around one player.",
      },
      {
        n: "4",
        title: "OR USE ONE OF THE OTHER FIVE WAYS IN",
        body: "Natural spawning has the most conditions on it, which makes it the worst one to test with. These are the rest.",
        paths: [
          [
            "/ep summon <mob>",
            "One, here or at a point you name. Bypasses the mob's own conditions and its chance roll, because an admin asking for a mob has decided it belongs there. Protection layers still apply.",
          ],
          [
            "/ep spawneggs",
            "A menu with one egg per defined mob. Take one, right click the ground. The eggs work in any game mode and can be handed to anybody.",
          ],
          [
            "/ep spawners",
            "Placed spawner blocks, driven by the plugin's own ticker every twenty seconds while a player is within sixteen blocks. A player-placed one works: it does not need a vanilla spawner under it.",
          ],
          [
            "/ep create trigger <delay> <radius> <mob>",
            "A timed spawn point at your feet. Every delay it places that mob within radius, and only while somebody is close enough to see it happen. Lite allows three.",
          ],
          [
            "Raid and arena waves",
            "Scripted, with a written composition per wave rather than a spawn spree.",
          ],
          [
            "replace-vanilla",
            "Converts a vanilla mob as it spawns. Much the cheapest path, because there is no location search at all, and it respects the vanilla mob cap. Full build.",
          ],
        ],
      },
      {
        n: "5",
        title: "WHEN NOTHING APPEARS, ASK THE PLUGIN",
        cmd: "/ep debug spawn",
        body: "Then wait. It prints the reason every single spawn attempt was refused. This is the answer to almost every spawning question and it is faster than any support thread: the usual causes are a protection layer, the world not being in general.worlds, or a condition that cannot be met where you happen to be standing.",
      },
      {
        n: "6",
        title: "CHECK WHAT IT COSTS",
        cmd: "/ep timings",
        body: "Run it after ten minutes of spawning, not before. It breaks the plugin's tick time down by subsystem. If spawn search is climbing, lower spawn-search-budget-ms rather than turning spawning off: the budget is a ceiling on the search, and it is there so that a bad spawn rule cannot become the reason your server lags.",
      },
    ],
    watch: [
      "A biome name that is not a real biome is named on boot, with the file it is in, and the mob still loads. It just never spawns.",
      "A spawn chance outside 0.0 to 1.0 is refused on load, the default is used, and the console says so.",
      "A condition written as a biome tag, #is_cold, parses but cannot work: Spigot exposes no biome tag accessor. /ep info reports the capability as unavailable rather than letting you find out from an empty tundra.",
      "Natural and boss spawning are suppressed while a raid runs, so during a raid the raid is the only thing arriving.",
    ],
    file: {
      title: "EpicMobsRework / config.yml",
      lang: "yaml",
      label: "[NATURAL SPAWNING, AS SHIPPED]",
      body: `
spawning:
  natural:
    enabled: true
    interval: 90s
    # Rolled per player, each interval.
    chance: 0.2
    range: 50
    # So nothing appears in somebody's face.
    min-range: 16
    max-nearby-per-player: 20
    group-size: 2-3

  spawner-blocks:
    enabled: true
    interval: 20s
    # A player has to be this close, the way a
    # vanilla spawner needs one within 16.
    activation-range: 16
    max-nearby: 6
    spread: 4

  # Per-mob multiplier on the chance above.
  limits:
    Frost Wolf: 0.2
    Crypt Warden: 0.05
      `,
    },
  },

  /* ----------------------------------------------------------------- RAIDS */
  {
    key: "create-raid",
    group: "Raids",
    title: "CREATE A RAID",
    short: "Create a raid",
    icon: "fa-solid fa-tower-observation",
    accent: "rose",
    edition: "both",
    blurb:
      "A raid is a timed server event with a kill goal, an ordered list of waves, a place, and three tiers of prizes. There are three ways to write one and they all produce the same file under raids/.",
    steps: [
      {
        n: "1",
        title: "DECIDE WHERE IT HAPPENS FIRST",
        cmd: "anchor.at",
        body: "The anchor is the single decision that says what kind of event the raid is, so make it before you write a wave. PLAYERS is around whoever is online. GLOBAL is everywhere at once, and everybody on the server is in it. WORLD_SPAWN is at a named world's spawn point. LOCATION is one fixed point, written world,x,y,z. PLAYER pins it to the ground under one player when it starts and does not move after that, which is the whole defend-your-base feature: a raid that follows its defender is one they can walk away from.",
      },
      {
        n: "2",
        title: "WRITE IT WITH A COMMAND",
        cmd: "/ep create raid <name> <goal> <mob,mob>",
        body: "The quickest way to a raid that runs. It writes raids/<name>.yml with the kill goal and the mob pool you named and sensible defaults for the rest, which you then edit in the file.",
      },
      {
        n: "3",
        title: "OR BUILD IT IN THE RAID EDITOR",
        cmd: "/ep editor raid",
        body: "The mob editor's design applied to a raid, deliberately down to the last detail. A list with a New raid button, then pages for the goal and timer, where it happens with a Set to where I am standing button, the waves and the mobs in each, the fallback pool, the final boss and the three prize tiers. Full build.",
      },
      {
        n: "4",
        title: "SPLIT THE GOAL ACROSS THE WAVES",
        cmd: "wave-count: 4",
        body: "A wave is a share of the kill goal, not a tick of a clock. 120 kills over four waves is thirty each, and wave two does not begin until the first thirty are dead. Write wave-count: yourself, or write a waves: block and the goal is split by however many waves you wrote.",
      },
      {
        n: "5",
        title: "WRITE THE WAVES",
        cmd: "delay: after_previous_cleared",
        body: "Each wave names its mobs and how many, and may carry an announce: line sent when it lands. A wave may instead name a pack, which arrives as a pack with its leader and formation, or a boss, which is spawned once and announced. delay: 20s lands it that long after the previous one; delay: after_previous_cleared waits for the field to be empty instead.",
      },
      {
        n: "6",
        title: "GIVE IT A POOL, A BOSS AND PRIZES",
        cmd: "boss:",
        body: "mobs: is what a wave draws from when it tops the field back up beyond what the wave itself names. boss: is the mob the kill goal summons, wherever the most defenders are standing, so reaching the goal does not win the raid: it starts the last fight. rewards: pays three tiers, for top damage, most kills, and participation for everybody who turned up.",
      },
      {
        n: "7",
        title: "RUN IT, THEN READ THE FILE BACK",
        cmd: "/ep raid start <name>",
        body: "Do it on a test server first, the way the next guide describes. Most raids need their goal or their wave count moved once somebody has actually watched one.",
      },
    ],
    watch: [
      "A wave that names a mob you have since deleted is reported by name on load, rather than producing an empty wave at run time.",
      "The full build's boss: block is ignored on Lite, so the kill goal simply ends the raid instead of summoning anything. A wave that names a pack falls back to its own mob list on Lite rather than being skipped, so a Lite server gets a wave rather than a hole where one used to be.",
      "Which tiers a raid may send, and how far into it each one unlocks, is a table in config.yml under raids.tiers. A wave that names a pack uses the pack and ignores the table.",
      "Lite runs one raid definition, and it is a whole raid: anchor, waves, kill goal, boss bar, a time limit it can be lost on, and the three prizes.",
    ],
    file: {
      title: "EpicMobsRework / raids / world-infestation.yml",
      lang: "yaml",
      label: "[A WHOLE RAID]",
      body: `
name: "World Infestation"
title: "&2The World Infestation"
lore: "It is not coming from anywhere. It is already here"
kill-goal: 120

anchor:
  at: GLOBAL

time-limit: 30m

# 120 kills over 4 waves is 30 per wave.
wave-count: 4

# What a wave draws from when it tops the field up
# beyond what the wave itself names.
mobs:
  - "Infested Crawler"
  - "Infested Husk"
  - "Spore Warden"

waves:
  - mobs:
      - { mob: "Infested Crawler", count: 6-9 }
      - { mob: "Infested Husk", count: 3-5 }
    announce: "&2The ground is moving. All of it."

  - mobs:
      - { mob: "Infested Husk", count: 5-8 }
      - { mob: "Spore Warden", count: 1-2 }
    delay: after_previous_cleared
    announce: "&2Wardens. Do not stand in the cloud."

# [Full build] Reaching the kill goal does not win the
# raid, it summons this, wherever the most defenders
# are standing. The raid is won when it dies.
boss: "Hive Colossus"

rewards:
  top-damage:
    xp-levels: 14
    currencies:
      - { type: KUMANDRA, amount: 1100-1700 }
  most-kills:
    xp-levels: 12
  participation:
    xp-levels: 5
      `,
    },
    shot: "editorRaidEdit",
    shotAlt: "Inside the raid editor, with the Test start button",
    shotCaption:
      "The raid editor. Test start saves the draft and runs the raid on the server immediately, so you find out what you actually wrote",
  },

  {
    key: "start-raid-debug",
    group: "Raids",
    title: "START A RAID FOR TESTING",
    short: "Start a raid, for testing",
    icon: "fa-solid fa-flask",
    accent: "amber",
    edition: "both",
    blurb:
      "How to make a raid happen on demand, on an empty development server, without editing the number that stops it happening on your live one.",
    steps: [
      {
        n: "1",
        title: "TURN THE TESTING SWITCH ON",
        cmd: "raids.ignore-min-players: true",
        body: "A raid normally needs raids.min-players online, five as shipped. This starts one with whoever is on. It is a separate switch rather than editing min-players down precisely so that you cannot forget to put it back: /ep info prints min players ignored (testing) the whole time it is on.",
      },
      {
        n: "2",
        title: "RELOAD",
        cmd: "/ep reload",
        body: "Reloads config.yml, Lang.yml, abilities.yml and every mob, raid, pack and arena file, then reports what changed and anything wrong with it. Nothing caches a config value across ticks, so a reload really does take effect everywhere.",
      },
      {
        n: "3",
        title: "START THE ONE YOU WANT, BY NAME",
        cmd: "/ep raid start <name>",
        body: "With more than one raid defined, name it. Running the command bare prints the list rather than picking at random, so you always know which one you started. A command start skips the chance roll, but not the other gates.",
      },
      {
        n: "4",
        title: "WATCH IT WITH THE DEBUG CHANNELS ON",
        cmd: "/ep debug raid",
        body: "Toggles the raid debug category, and /ep debug spawn is the one to pair it with. Between them they print why a raid was skipped, why a wave placed nothing, and the reason for every individual refusal.",
      },
      {
        n: "5",
        title: "STOP IT AND GO AGAIN",
        cmd: "/ep raid stop",
        body: "Ends the running raid and removes its mobs. Nothing is paid out, which is what you want while testing. Change the file, /ep reload, start it again.",
      },
      {
        n: "6",
        title: "PUT IT BACK BEFORE ANYBODY LOGS IN",
        cmd: "raids.ignore-min-players: false",
        body: "Then /ep reload, and check that /ep info no longer says testing. Left on, your live server runs raids for one person.",
      },
    ],
    watch: [
      "Two things refuse a start and neither is overridden by the command: raids.enabled: false in config.yml, and not enough players online.",
      "One player is still needed even with the testing switch on. Every wave path looks for a participant, so a raid started into an empty world would spawn nothing and then call itself off.",
      "If the raid runs but nothing arrives, /ep debug spawn. The plugin also says so in the console by itself after three placements that put nothing down, and names the likely causes. That log line exists because this failure used to be completely silent.",
      "A scheduled raid picks at random. A command start does not. That is the difference between an event and a test.",
    ],
    terminal: {
      title: "EpicMobsRework / console",
      label: "[A RAID STARTED BY HAND]",
      accent: "amber",
      body: `
Raid started: World Infestation, goal 120,
  around the players, limit 30m (by jaymar921)

[RAID] wave 1 of 4, 30 kills owed, from the west
[RAID] placed 9 of 9, cluster at -212, 68, 431

...and when something is wrong:

[RAID] wave 2 placed 0 of 8, third time running.
  Likely: no valid ground inside the participation
  radius, a protection layer, or every tier gated
  out at this progress. /ep debug spawn for the
  per-attempt reason.
      `,
    },
  },

  {
    key: "raid-in-world",
    group: "Raids",
    title: "WHAT A RAID DOES IN A LIVE WORLD",
    short: "A raid, in the world",
    icon: "fa-solid fa-tower-broadcast",
    accent: "purple",
    edition: "both",
    blurb:
      "What your players actually see, from the horn to the payout, and what the plugin is doing underneath while they see it.",
    steps: [
      {
        n: "1",
        title: "IT ANNOUNCES ITSELF",
        body: "Everybody taking part gets the raid's title and its lore, a warning line, a horn, and, for an anchored raid, where it is happening. A boss bar goes up for every participant and stays there for the whole event.",
      },
      {
        n: "2",
        title: "THE REST OF THE SERVER IS TOLD WHERE",
        cmd: "raids.call-for-help: true",
        body: "An anchored raid is broadcast, so people can travel to it and help defend. Anyone who reaches the participation radius joins on equal terms: they get the bar, their kills are counted, and they are paid at the end. A raid with no anchor broadcasts nothing, because there is nowhere to send anybody.",
      },
      {
        n: "3",
        title: "WAVES ARRIVE IN CLUSTERS, FROM ONE SIDE",
        cmd: "rotate-direction: true",
        body: "One point is searched properly and the rest are offset around it, each finding the ground of its own column, so nothing spawns buried in the slope next door. Each wave comes from its own compass direction, west then east then north then south then the diagonals, across a ninety degree arc rather than a line, and the announcement says which way to look. A wave from every direction at once is a ring, and a ring reads as ambient spawning with a boss bar over it.",
      },
      {
        n: "4",
        title: "THE FIELD IS TOPPED UP, NEVER PAST WHAT THE WAVE OWES",
        cmd: "field-share: 0.2",
        body: "A share of the kill goal stands in front of the players at a time, and is refilled as it thins past top-up-at. A kill brings its replacement to where the last one died, so the fight keeps its shape as players cut through it, and it never makes the raid worth more kills than its goal. A GLOBAL raid multiplies the field by the number of people in it, so a server of ten gets ten fights rather than one fight and nine spectators.",
      },
      {
        n: "5",
        title: "STRAYS ARE WRITTEN OFF AND REPLACED",
        cmd: "stray-distance: 1.5",
        body: "Raid mobs hold a slot of the concurrent cap while they are alive, and one that pathed off a cliff and kept walking is alive, in a loaded chunk, and unreachable. Past that multiple of the participation radius it is swept and replaced rather than teleported back: a raid mob that blinks into the middle of the fight is worse than one that quietly did not make it.",
      },
      {
        n: "6",
        title: "THE KILL GOAL SUMMONS THE BOSS",
        body: "On the full build, reaching the goal does not win the raid. It summons the raid's boss, wherever the most defenders are standing, and the raid is won when that dies. A particle trail points at raid mobs you have never hit, drawn for you alone, so something behind a hill can still be found; it stops pointing at anything you have already fought.",
      },
      {
        n: "7",
        title: "IT ENDS ONE OF FOUR WAYS",
        cmd: "abandon-after: 2m",
        body: "Won, by clearing the goal and the boss. Lost, by running out its time-limit. Called off, if nobody is left fighting it for that long. Or stopped by an admin. Only a win pays, and it pays three tiers: top damage, most kills, and participation for everybody who turned up.",
      },
    ],
    watch: [
      "Natural and boss spawning are suppressed while a raid runs, under raids.suppress-other-spawns, so the raid is the only thing arriving.",
      "A running raid does not survive a restart. Its mobs are left standing in the world as ordinary Epic Mobs, and nothing is paid.",
      "/ep info reports what the running raid is doing at any point: which wave it is on, how much of the goal is left, and how long it has.",
      "With PlaceholderAPI installed, the raid's place and its time left are placeholders, so a scoreboard can carry the event without anybody typing a command.",
    ],
    shot: "infestedRaid",
    shotAlt: "A World Infestation wave arriving as a cluster",
    shotCaption:
      "World Infestation in progress: a Broodmother and two Crawlers arriving together, from one side, rather than one at a time across half a world",
  },

  {
    key: "raid-triggers",
    group: "Raids",
    title: "WHAT MAKES A RAID FIRE ON ITS OWN",
    short: "How a raid triggers",
    icon: "fa-solid fa-stopwatch",
    accent: "emerald",
    edition: "both",
    blurb:
      "Nobody types a command on a live server. These are the gates a scheduled raid has to pass, in the order the plugin checks them, which is the order they refuse in.",
    steps: [
      {
        n: "1",
        title: "RAIDS HAVE TO BE ENABLED",
        cmd: "raids.enabled: true",
        body: "The first and cheapest check. With this off nothing is ever scheduled, and /ep raid start is refused too: the command deliberately does not override it, because a switch an admin turned off should stay off.",
      },
      {
        n: "2",
        title: "NOTHING MAY BE RUNNING ALREADY",
        body: "One raid at a time, server wide. Whether one is running is checked before anything else is worked out, and at least one raid has to be defined for there to be anything to pick.",
      },
      {
        n: "3",
        title: "THE INTERVAL HAS TO HAVE ELAPSED",
        cmd: "raids.interval: 20d",
        body: "Counted in Minecraft days, twenty of them as shipped, at twenty-four real minutes each. The clock starts on the first pass after a boot rather than firing immediately, so restarting a server does not summon a raid.",
      },
      {
        n: "4",
        title: "ENOUGH PLAYERS HAVE TO BE ONLINE",
        cmd: "raids.min-players: 5",
        body: "Five as shipped. With raids.ignore-min-players on it is one instead, which is the testing switch and is the only thing that number is for. A skip is printed on the raid debug channel with the count it saw and the count it wanted.",
      },
      {
        n: "5",
        title: "THE CLOCK HAS TO ALLOW IT",
        cmd: "raids.schedule.windows",
        body: "Windows in server local time, written HH:MM-HH:MM, and a window may wrap past midnight. This is what stops a raid firing at four in the morning for the two people still awake. Full build: on Lite the windows are never read, and raids fire on the interval and the chance alone.",
      },
      {
        n: "6",
        title: "AND THEN IT ROLLS",
        cmd: "raids.chance: 0.9",
        body: "The last gate, so the expensive checks are never done for a roll that fails. A pass picks one of your defined raids at random and starts it. That randomness is the difference between an event and a test, which is why /ep raid start names the one you want.",
      },
      {
        n: "7",
        title: "THE OTHER KIND OF TRIGGER",
        cmd: "/ep create trigger <delay> <radius> <mob>",
        body: "Not a raid at all, and worth knowing about because the word collides. A trigger is a timed spawn point at your feet: every delay it places that mob within radius, and only while somebody is close enough to see it happen. No region, no party, no waves. It is the lightweight alternative to an arena, and /ep create remove_trigger <mob> takes it away again. Lite allows three.",
      },
    ],
    watch: [
      "Every refusal above is printed on /ep debug raid with its reason, so a raid that never happens is a question you can answer rather than one you have to guess at.",
      "The interval is a Minecraft day count, not a real hour count. 20d is roughly eight real hours of server uptime.",
      "A scheduled raid picks at random from everything in raids/. If you only want one of them happening on its own, that is a reason to keep the others out of the folder.",
    ],
    file: {
      title: "EpicMobsRework / config.yml",
      lang: "yaml",
      label: "[EVERY GATE, IN ORDER]",
      body: `
raids:
  enabled: true
  min-players: 5
  # Testing switch. Starts a raid with whoever is
  # online. /ep info says "min players ignored
  # (testing)" the whole time it is on.
  ignore-min-players: false

  # Tell the whole server where an anchored raid is,
  # so people can travel to it and help defend.
  call-for-help: true

  # In Minecraft days, at 24 real minutes each.
  interval: 20d
  chance: 0.9

  # Suppress natural and boss spawning while one runs.
  suppress-other-spawns: true

  # End a raid nobody is left fighting. Called off
  # rather than lost.
  abandon-after: 2m

  # Windows a raid may start in, server local time.
  # [Full build]
  schedule:
    enabled: false
    windows: [ "18:00-23:00" ]
      `,
    },
  },

  /* ---------------------------------------------------------------- ARENAS */
  {
    key: "arena-setup",
    group: "Arenas",
    title: "SET UP AN ARENA",
    short: "Set up an arena",
    icon: "fa-solid fa-shield-halved",
    accent: "sky",
    edition: "full",
    blurb:
      "Four commands and about two minutes. The whole reason to do it this way rather than by hand is the one thing everybody gets wrong.",
    steps: [
      {
        n: "1",
        title: "BUILD THE ROOM",
        body: "Anything with a floor and a boundary. It does not have to be enclosed and it does not have to be pretty, but it does have to be somewhere a mob can be placed on ground: an arena searches for standable ground inside its box the same way everything else in the plugin does.",
      },
      {
        n: "2",
        title: "MARK ONE BOTTOM CORNER",
        cmd: "/ep arena pos1",
        body: "Stand in one bottom corner of the room, at floor level, and run it. The corners may be given in any order, so it does not matter which one you pick first.",
      },
      {
        n: "3",
        title: "MARK THE OPPOSITE TOP CORNER",
        cmd: "/ep arena pos2",
        body: "Stand in the diagonally opposite corner, above the room rather than on its floor, and run it. Getting above the ceiling is the point, and the box is inclusive at both ends.",
      },
      {
        n: "4",
        title: "CREATE IT",
        cmd: "/ep arena create <name>",
        body: "Writes arenas/<name>.yml with the region already correct, your current position as the entry point, a party size of one to four, and two example waves, so it is runnable immediately. Then edit the waves in the file it made.",
      },
      {
        n: "5",
        title: "CHECK THAT YOU ARE INSIDE IT",
        cmd: "/ep arena info <name>",
        body: "Prints its region, party size, waves, lockout and prizes, and whether you are currently standing inside it. That last line is the one to check first whenever an arena is not starting.",
      },
      {
        n: "6",
        title: "SET WHERE PEOPLE COME OUT",
        cmd: "/ep arena entry <name>",
        body: "Sets where a finished or wiped party is put, to wherever you are standing. Leave it unset and they stay where they are, which after a wipe means standing among the next run's mobs.",
      },
      {
        n: "7",
        title: "TRY IT",
        cmd: "/ep arena start <name>",
        body: "Starts the arena you are standing in, or the one you name. It skips the minimum party size and clears the lockout for that party, because an admin starting a run has overridden the thing the lockout exists to prevent. /ep arena stop, or reset, ends the run and clears its mobs out of the room.",
      },
    ],
    watch: [
      "Do not write the coordinates by hand. The Y range is what people get wrong: a region whose height does not cover the block players stand on is an arena that reports standing: 0 to somebody standing in the middle of it, never spawns anything, and then calls itself off.",
      "/ep arena delete refuses while that arena is running. Stop it first.",
      "Full build only. The arena commands are not present on Lite at all.",
      "An arena wave is exactly a raid wave, so anything you can write in raids/ you can write in an arena file, packs and a boss included.",
    ],
    file: {
      title: "EpicMobsRework / arenas / frozen-crypt.yml",
      lang: "yaml",
      label: "[WHAT THE FOUR COMMANDS WRITE, THEN EDITED]",
      body: `
name: "Frozen Crypt"
title: "&bThe Frozen Crypt"

# The box, in blocks, inclusive at both ends.
# Written for you by pos1 and pos2.
region:
  world: world
  from: "100,40,200"
  to: "160,70,260"

# Where a finished or wiped party is put.
entry: "world,130,41,205"

# How many it takes and how many it holds.
players: 1-4

waves:
  - mobs:
      - { mob: "Crypt Servant", count: 4-6 }
    delay: 5s
    announce: "&7Something stirs in the dark."

  - mobs:
      - { mob: "Crypt Servant", count: 3-4 }
      - { mob: "Hollow Marauder", count: 2 }
    delay: after_previous_cleared

  # A pack arrives as a pack: a leader, its members,
  # a formation, and something that happens to the
  # rest of them when the leader dies.
  - pack: "Frost Wolf Pack"
    delay: after_previous_cleared

  # Killing this is what finishes the run.
  - boss: "Crypt Warden"
    delay: 5s

time-limit: 10m
cooldown-per-player: 6h
reset-on-wipe: true

broadcast: "&b{players} cleared the Frozen Crypt."

rewards:
  top-damage:
    xp-levels: 8
  most-kills:
    xp-levels: 6
  participation:
    xp-levels: 3
      `,
    },
  },

  {
    key: "arena-works",
    group: "Arenas",
    title: "HOW AN ARENA RUNS",
    short: "How an arena works",
    icon: "fa-solid fa-dungeon",
    accent: "teal",
    edition: "full",
    blurb:
      "It starts on its own when enough people stand in it, so most players never type an arena command. This is the whole life of a run.",
    steps: [
      {
        n: "1",
        title: "A PARTY WALKS IN",
        cmd: "players: 1-4",
        body: "The plugin watches who is inside the box. When the number standing in it is within the party range, the run starts by itself. A party outside that range does not start it, and /ep arena start says which way it was wrong.",
      },
      {
        n: "2",
        title: "THE WAVES COME IN ORDER",
        cmd: "arenas.wave-interval: 20s",
        body: "The list in the file, top to bottom. A wave with delay: 20s lands that long after the one before it. A wave with delay: after_previous_cleared waits for the room to be empty instead, which is the one to use when you care that people finish a wave rather than merely survive it. A wave with no delay line uses the config default.",
      },
      {
        n: "3",
        title: "A SIDEBAR SHOWS WHERE YOU ARE",
        cmd: "arenas.scoreboard: true",
        body: "Which wave, what is left of it, and the time. It is a sidebar rather than a boss bar because an arena is a room you are inside rather than an event happening to the server.",
      },
      {
        n: "4",
        title: "IT ENDS ONE OF FOUR WAYS",
        cmd: "arenas.abandon-after: 2m",
        body: "Cleared, when every wave is down, which is the only outcome that pays. Wiped, when everyone inside has died or left while mobs are still up. Expired, when the time-limit runs out. Or stopped, by an admin or by the definition going away on a reload. A wipe or an abandoned room resets the arena and takes its mobs with it.",
      },
      {
        n: "5",
        title: "AND IT LOCKS YOU OUT FOR A WHILE",
        cmd: "cooldown-per-player: 6h",
        body: "Per player, counted from the end of a run, so a party cannot farm it by walking straight back in. Leave the line out of the file and arenas.default-cooldown applies instead. An admin start clears the lockout for the party it starts.",
      },
      {
        n: "6",
        title: "CLEARING IT PAYS WHAT A RAID PAYS",
        body: "The same three tiers, top damage, most kills and participation, through the same currencies, the same provider order, and the same /ep wallet preference each player set for themselves. A broadcast line tells the server who cleared it.",
      },
    ],
    watch: [
      "An arena that says standing: 0 to somebody standing in it has a region whose Y range does not cover the floor. Re-mark it with pos1 and pos2 rather than editing the numbers by hand.",
      "A run does not survive a restart, exactly as a raid does not. The mobs are removed on shutdown and the room resets.",
      "An empty server pays almost nothing for arenas: the ticker walks the rooms that have a party in them, so a server with none defined costs one empty check per pass.",
      "arenas.max-concurrent, thirty as shipped, caps how many arena mobs may be alive at once across the whole server.",
    ],
  },
];

/** The groups, in the order the picker lists them. */
export const WalkthroughGroups = ["Mobs", "Raids", "Arenas"];
