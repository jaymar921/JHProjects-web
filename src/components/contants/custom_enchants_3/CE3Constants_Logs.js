export const CE3_Logs = [
  {
    update_version: "1.5.0",
    release_date: "08/26/2026",
    changes: [
      {
        update: "Read this first",
        sublist: [
          "This is the big content release. 1.4.0 made the plugin fast and deliberately added nothing, this one is the opposite. Enchantments go from 58 to 134 and treasure items go from 34 to 134",
          "There are four new systems in here as well: bandit camps on loot plots, 25 quests that ship ready to hand out, a price chart in the currency screen, and a switch for how the magic wand comes off the crafting bench",
          "Your config carries over. On the first start after updating the plugin rewrites config.yml with the new keys and keeps every value you had set, saving the old file as config.yml.old. Prices, rates and toggles all survive",
          "Two treasure stats start doing something. 'physical_dmg' and 'physical_def' have been written onto treasure items and shown in their lore since the feature shipped, and nothing ever read them back. They reach the damage code now. Set TreasurePhysicalDamageCap: 0 and TreasurePhysicalDefenseScale: 0 if you would rather they stayed decorative",
          "And a third one gets a ceiling. 'magical_dmg' always worked, but it is summed across everything you carry and had no cap, so a stack of one treasure was unlimited magic damage. TreasureMagicalDamageCap defaults to 6.0, set it to 0 for the old uncapped behaviour",
          "Treasure drops are weighted now. Which treasure you get used to be a flat random pick, which was fine at 34 items. At 134 it would make the best item in the game exactly as likely as a Dried Fish, so there are five tiers with weights you control from config",
        ],
      },
      {
        update: "76 New Enchantments [23 tools, 30 weapons, 23 armor]",
        sublist: [
          "Tools: Widebore mines a 3x3 two blocks deep. Quarryjack builds up haste the longer you keep digging. Kilnfire drops ore already smelted. Scytheswing harvests the whole row of crops. Drillseed replants the row behind you. Sifting Hands pulls something worth having out of gravel and sand, very occasionally a treasure. Hairsbreadth stops your tool at one durability instead of letting it break. Ironmonger makes it cheaper at the anvil",
          "Swords, spears and maces: Grudgework stacks bonus damage the longer you stay on one target. Bloodtithe costs you a heart per swing and pays back far more. Ironjaw guarantees a floor of damage that no defence can stop. Ribcracker turns your fall distance into a mace hit. Lancework also strikes whoever is standing behind them. Skullsplit occasionally leaves the head",
          "Bows: Quiverburst fires two extra arrows every few shots. Tetherline ties the target to the spot it was hit. Ashfletch leaves a blinding cloud where it lands. Longdraw rewards holding the shot past full draw. Marrowshot ignores part of their magic defence",
          "Tridents: Tidewrack leaves a whirlpool that pulls everything in. Stormhook drags the target back to you. Skipstone ricochets off a wall into the nearest enemy",
          "Wands: eight new spells. Chainarc is a bolt that jumps between targets, losing strength each jump. Gravewell opens a patch of ground that drains them and heals you, capped so it cannot be farmed. Mirrorstep swaps you with whatever you are looking at. Cindershroud reduces your damage taken and sets melee attackers alight. Hushfall takes away a target's abilities without touching their health. Emberwake, Glasswind and Sundial round it out",
          "Armor: Deadweight refuses knockback, levitation and pulls, and at level 3 it refuses the ones other CE enchantments cause too. Slagplate converts part of the physical damage you take into magic damage. Backdraft throws everything off you when a big hit lands. Wardweave adds maximum mana per piece. Sprintwell refills mana while you run. Ripostewall sends blocked damage back through the shield",
          "Two new item classes came with this, so shovels and fishing rods can carry enchantments now",
          "Every one of them is a config line. Set a price to 0 and it disappears from your server completely, same as always",
        ],
      },
      {
        update: "100 New Treasure Items",
        sublist: [
          "Carrying one is enough, there is nothing to equip. They give mana regen, cooldown reduction, defence, damage, health regen, XP multipliers and RACO on kill",
          "Every one is new art: a 16x16 sprite drawn for this release, its own name, its own flavour line and its own stat block. No two of them share an effect",
          "Five themes so the list does not read as one long pirate joke. Pirate call signs like Bosun Whistle and Marooners Coin. Elemental pieces like Rimefang and Solar Filament. Relics like Oathring and Throne Fragment. Oddities like Backward Compass, Jar of Held Breath and Knot That Unties Itself. Cursed things like Nine Fingered Glove and Heart of the Deep Wreck",
          "Weighted drop table: Common 32 items at about 1 in 1,100 per loot roll, Uncommon 37 at about 1 in 2,500, Rare 44 at about 1 in 6,400, Epic 15 at about 1 in 23,000, Legendary 6 at about 1 in 115,000",
          "TreasureItemChance is unchanged at 5% and still decides whether a chest slot gives a treasure at all. The five TreasureWeight keys control the rest. Set a tier to 0 to take it out of chest loot entirely",
        ],
      },
      {
        update: "Bandits",
        sublist: [
          "Loot plots used to be a chest and a walk home. There is something guarding them now",
          "A camp sits dormant on a generated loot plot until a player comes within 15 blocks, then a crew of 2 to 5 spawns and one of them is the leader. Crews are built from zombies, skeletons, wither skeletons and witches, and everyone is named 'CE3-' plus one of 100 pirate style names shipped in bandits.yml: Blackjaw Morgan, Salt Tom Rourke, Gutter Kate. If notifications are on, the chat line names the leader you are about to meet",
          "They wear helmets, so a camp that generates on the surface is still there when you arrive in daylight. Their gear never drops",
          "They are a fight, not free loot. An ordinary bandit carries 1.6x a vanilla mob's health and an extra point of damage, a leader carries 3x and an extra 3.5. They also put on a show with effects borrowed from the wand spells: Light Spirit, Death Ray, Fireball, Frost and Nebula, on a chance roll every few seconds",
          "A bandit never carries or drops a custom enchantment. The abilities are presentation. What they do drop is RACO, and a treasure item on a 6% roll, 30% from the leader, pulled from the same weighted table chest loot uses so rare stays rare",
          "Everything above is a line in bandits.yml: crew size, spawn and despawn radius, the 900 second camp cooldown, health and damage multipliers, which mobs can appear, which mobs can lead, the ability list and chance, both drop chances, the RACO payouts and the name list. 'Enabled: false' at the top turns the whole thing off",
        ],
      },
      {
        update: "25 Quests, Already Written",
        sublist: [
          "The QUEST shop entity worked, but a fresh server had an empty QuestConfig.yml, so it had nothing to hand out until an admin sat down and authored quests through the chat prompts",
          "25 quests are seeded on first start now. Spawning the entity is enough",
          "They are ordinary quests, identical to what '/ce quest add' produces, so you can list, edit and remove them the usual way. They only get written when the quest list is empty, so a server that already has quests is never touched, and quests you delete stay deleted",
          "Rewards are deliberately modest: vanilla items and a small RACO payout, sitting below what the exchange pays for the same time spent. Nothing in the set awards a custom enchantment, a treasure item, or anything with a stat line on it. They exist to give a new player a reason to go somewhere, not to shortcut progression",
        ],
      },
      {
        update: "The RACO Price Chart",
        sublist: [
          "Every trade has been logged and rolled up into hourly OHLC candles since 1.3.0, and nothing ever showed them to anyone",
          "The currency exchange has a chart item in the middle now. Hover it and the tooltip draws the price history as a candlestick chart in block characters, up to 24 hourly candles over nine rows of price, with the last close, the high, the low and the number of coins in circulation underneath. Green closed up, red closed down",
          "It reads the candles the plugin was already building. No new aggregation, no second set of numbers, and it changes no economy behaviour at all",
        ],
      },
      {
        update: "The Magic Wand Craft Toggle",
        sublist: [
          "New key, MagicWandNoEnchantOnCraft, default false",
          "A freshly crafted magic wand has always come out with Fire Ball already on it as its primary enchantment. Set this to true and it comes out blank, so wand progression starts at the shop like every other item class. The default keeps today's behaviour, so existing servers see no change unless they ask for one",
        ],
      },
      {
        update: "The Resource Pack",
        sublist: [
          "120 new sprites. 100 for the new treasures, and 20 for the original items that never had a texture at all",
          "There is a fix in here worth knowing about. The pack had treasure textures, but nothing pointing at them in the format Minecraft 1.21.4 and later actually reads, so on a modern server every treasure item rendered as its plain vanilla material. All 134 are wired up properly now",
          "The original 34 keep their existing texture ids on purpose. Renumbering them would have blanked the texture on every treasure already sitting in someone's inventory",
        ],
      },
      {
        update: "Shops Look Different",
        sublist: [
          "Shop screens used to fill every slot they were not putting a book in with a glass pane. A shop with six books in a double chest showed six books and twenty two panes",
          "They draw a frame now and leave the unused space empty. Books fill left to right with no gaps",
          "Several shops grew to fit the new books. Armor is the only class that outgrew a double chest, at 29 books against 28 slots, so it has a second page with a Next sign. The magic shop is unchanged, its books sit in three separate groups and the old layout suits it",
        ],
      },
      {
        update: "Also Fixed",
        sublist: [
          "'/ce reload' used to stack a duplicate set of tutorial and crafting screens every single time it ran. The list never got cleared, so it grew for the life of the server and the treasure pages could end up showing stale items",
          "The treasure pool now rebuilds on reload, so a drop weight change takes effect without restarting",
          "A handful of potion, particle and damage constants that Minecraft renamed after 1.16.4 are resolved by name now, so they cannot crash a listener on an older server",
        ],
      },
      {
        update: "Compatibility",
        sublist: [
          "Spigot and Paper, 1.16.4 through to 26.2, unchanged. No other plugins required, and there is still no NMS anywhere in the plugin",
          "Everything from 1.4.0's optimization pass is still in place. A sword swing still costs a handful of reads instead of several hundred, loot plots still read chunk data instead of scanning millions of blocks, and the 16 bugs that release fixed are still fixed",
        ],
      },
    ],
    note: "Tested on Minecraft 26.2. Please back up your plugins/CustomEnchantments3 folder before updating, and let me know if anything acts up in the discussions page.",
  },
  {
    update_version: "1.4.0",
    release_date: "08/22/2026",
    changes: [
      {
        update: "Read this first",
        sublist: [
          "If you use '/ce reload', your players' RACO balances were being wiped every time. The reload code looked in the wrong file for the saved balances, found nothing, and reset everyone to 0. The next save wrote that back to disk. This is fixed, but any balance already lost is gone. Restarting the server was never affected, only '/ce reload'",
          "Seven of the fixes change gameplay, see the Balance Changes below. Nothing else in this update should be noticeable in play",
          "No features were added or removed in this update",
        ],
      },
      {
        update: "Performance",
        sublist: [
          "Enchantment reads no longer allocate a JSON parser, a reflection object and a key on every single call",
          "A single sword hit used to cost several hundred JSON parses because every attack and defence handler built its own player object, reading the main hand, off hand and all four armor pieces twice over. That is down to a handful now",
          "Player data is now loaded when it is actually needed instead of up front",
          "Enchantment name lookups are a map lookup instead of scanning all 58 entries every time",
          "Server version checks are cached instead of re-parsing the version string, this was being called twice per step inside 360-step particle loops",
          "PlayerMoveEvent, the busiest event on any server, no longer reads your boots several times per tick",
          "Block breaking with Deforestation was quadratic on large trees, now it is not",
          "Loot plot generation used to scan around 4.5 million blocks on the main thread, twice. It now reads chunk block entity lists instead",
          "Event handlers (quests, disenchant, shop clicks, crop harvest, consume, anvil) now check cheap conditions first before reading inventories",
          "Scheduled tasks trimmed: auto-repair, companion healing, shop entity checker, magnetic checker and the status handler loops",
        ],
      },
      {
        update: "Memory Leaks Fixed",
        sublist: [
          "A permission object was being stacked on the player on every single '/ce' command and never removed",
          "The currency exchange screen kept refreshing once a second forever, for every player who had ever opened it, even after they logged off",
          "The world list grew forever, and gained another background task on every reload",
          "Decorative particle drops (blood, gold nuggets) were added to a list that was never cleaned up and searched on every item pickup on the map",
          "There was no logout handler at all, so per-player data piled up until restart. A new QuitEvent releases per-player state on logout",
        ],
      },
      {
        update: "Bug Fixes [16 total]",
        sublist: [
          "CE-001 [CRITICAL] '/ce reload' wiped all RACO balances",
          "CE-002 Armor enchantments ignored CustomEnchantsWorld. Tank, Magic Resist, Regain, Freeze, Thorns, Mana Shield, Sturdy, Omni Vamp and Blindness kept working in worlds where the plugin is supposed to be off",
          "CE-003 PENETRATION did nothing at all. The warrior passive was writing the wrong stat, onto an object that got thrown away immediately",
          "CE-004 ContainsEnchantment(ItemStack, String) returned inside its loop, so it only ever tested one entry",
          "CE-005 Protected boundaries were not blocking mob spawns. The check was backwards, it only blocked spawns in worlds where the plugin was disabled",
          "CE-006 Loot plots almost never spawned. The 'is there a bed nearby' check also matched BEDROCK, and the search scanned millions of blocks on the main thread",
          "CE-007 Offline shop sales lost money. If you sold two items while offline you were only paid for the second one",
          "CE-008 LightSpiritManaCost in config.yml did nothing, the Lightning cost was being written over the top of it",
          "CE-009 Several 1.21.x versions (1.21, 1.21.0, 1.21.2, 1.21.3, 1.21.6, 1.21.7, 1.21.9) were treated as unsupported, which quietly turned off anything version-gated. Version checks are numeric now",
          "CE-010 Distance checks against shops in a different world threw an error and aborted the whole handler",
          "CE-011 Empty loot rarity lists crashed chest generation for the whole world once that rarity rolled",
          "CE-012 The last treasure item could never drop. 'Ancient Netherite Scrap' was unobtainable, and 'Lucky Treasure' dropped at double the intended rate",
          "CE-013 There was no PlayerQuitEvent handler, so per-player state accumulated until restart and pinned disconnected players in memory",
          "CE-014 Three background tasks were reading player inventories and writing mana from async threads, which is not safe with the Bukkit API. All moved to the main thread",
          "CE-015 setAttackSpeed fell through to an attribute constant that does not exist on 1.20 and below",
          "CE-016 Dummy shops could be killed. The damage readout worked, but with melee the hit also landed for real. Fire, lava, fall damage, explosions and mobs could kill one too",
        ],
      },
      {
        update: "Balance Changes [your players may notice these]",
        sublist: [
          "PENETRATION now works. Warriors ignore 0.5% of physical defence per level, 5% at level 10",
          "Armor enchantments stop working in worlds not listed in CustomEnchantsWorld. The default empty list means all worlds, so most servers see no change",
          "Hostile mobs no longer spawn inside protected boundaries",
          "Loot plots will actually generate now, including underground. Turn LootPlotSpawnChance down if it is too frequent. Trapped chests also count as player building now",
          "Light Spirit's mana cost drops from 12.5 to 10 with the default config. Lightning is unchanged, but its shop description now shows the right number",
          "'Ancient Netherite Scrap' is obtainable and 'Lucky Treasure' drops at a normal rate",
          "Dummies do not die and no longer get knocked around. They still flash when you hit them and still show the damage number",
        ],
      },
      {
        update: "Worth Testing [please report anything odd]",
        sublist: [
          "Hitting a dummy shop with your strongest weapon, it should survive and still show the damage",
          "Melee combat against players wearing enchanted armor",
          "Mob spawning inside a protected boundary",
          "Light Spirit mana usage",
          "'/ce reload', then check a player's RACO balance is still there",
          "Loot plot generation, if you have GenerateLootPlots: true",
        ],
      },
    ],
    note: "Tested on Minecraft 26.2. Please back up your plugins/CustomEnchantments3 folder before updating.",
  },
  {
    update_version: "1.3.3",
    release_date: "08/21/2026",
    changes: [
      {
        update: "Version Support",
        sublist: [
          "Updated to Minecraft 26.2",
          "The version parser now recognises the new Minecraft versioning scheme (26, 27, 28, 29) alongside the old 1.x series",
        ],
      },
    ],
    note: "Please save a copy of the files inside CustomEnchantments3 before installing the update.",
  },
  {
    update_version: "1.3.2",
    release_date: "03/02/2026",
    changes: [
      {
        update: "Optimization",
        sublist: [
          "PlayerData modification, added caching to reduce lag from being re-created on load",
          "Move/Attacking/Join Event is optimized, implemented data caching for faster load",
        ],
      },
    ],
    note: "Please save a copy of the files inside CustomEnchantments3 before installing the update.",
  },
  {
    update_version: "1.3.1",
    release_date: "02/15/2026",
    changes: [
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed issue where skills were not disabled in other worlds [again]",
          "Fixed TNTError spam in console, this happens when it fails to detect the source entity",
        ],
      },
    ],
    note: "More info at: https://jhprojects.vercel.app/ce3",
  },
  {
    update_version: "1.3.0",
    release_date: "02/03/2026",
    changes: [
      {
        update: "Security Patch",
        sublist: [
          "Removed premium/trial condition from the source code. Updates are now included in the premium version, while trial users can continue using the free version up to 1.2.1-lite",
        ],
      },
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed issue where skills were not disabled in other worlds",
          "Fixed PlaySound:Orb [Not Found] error on versions 1.20 down to 1.16.4",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "Major overhaul of Custom Enchantment price configuration. Custom Enchantments can now be purchased using RACO (built-in currency)",
          "Updated Custom Model Data",
          "Trading System updated for future update, added GraphData for storing transactions",
        ],
      },
      {
        update: "New Features",
        sublist: [
          "Added CustomEnchantments 3 [1.21] resource pack (Enchantment Book only)",
        ],
      },
    ],
    note: "More info at: https://jhprojects.vercel.app/ce3",
  },
  {
    update_version: "1.2.2",
    release_date: "01/28/2026",
    changes: [
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed an issue where CustomEnchantsWorld did not disable skills if the world was not specified in.",
          "The console now issues a warning if a player attacks a dummy entity that is not allowed in the current world",
        ],
      },
      {
        update: "Versioning Notification",
        sublist: [
          "Updated versioning notifications: server owners will now be notified of Major, Minor, and Patch updates.",
        ],
      },
    ],
    note: "More info at: https://jhprojects.vercel.app/ce3",
  },
  {
    update_version: "1.2.1",
    release_date: "01/24/2026",
    changes: [
      {
        update: "Minor Security Patches and Bug Fixes",
      },
      {
        update: "Added Tutorial mode for the ff: (command /ce help)",
        sublist: [
          "Creating Shop",
          "Levelling and Skills",
          "Creating Quests",
          "Doing Quests",
        ],
      },
      {
        update: "Added Enchantment Compatibility for SPEAR:",
        sublist: [
          "Life Steal",
          "Bleed",
          "Critical",
          "Soul Eater",
          "Wind Strike",
          "Dragon Breath",
          "Gooey",
        ],
      },
      {
        update: "Added Enchantment Compatibility for MACE:",
        sublist: ["Bleed", "Critical", "Execute"],
      },
      {
        update: "Added Enchantment Compatibility for TRIDENT:",
        sublist: ["Wind Strike"],
      },
      {
        update: "New Enchantment",
        sublist: [
          "Stealth - Deals an additional 10% damage per level when sneaking, max level 5, applies to [sword, spear]",
        ],
      },
      {
        update: "New Shop UI's",
        sublist: ["Spear Shop", "Mace Shop"],
      },
    ],
    note: "More info at: https://jhprojects.vercel.app/ce3 | FREE VERSION STOPS HERE",
  },
  {
    update_version: "1.2.0-r.6",
    release_date: "01/18/2026",
    changes: [
      {
        update: "Added Support for 1.21.11",
      },
      {
        update: "Minor Security Patches",
      },
      {
        update: "Features",
        sublist: [
          "Added GenerateLootPlots option in config.yml, default value: true",
        ],
      },
      {
        update: "GenerateLootPlots Modifications",
        sublist: [
          "From looping through all players online and giving them 50% chance of spawing a Loot Plot nearby which is inefficient. Now, it should Generate one Loot Plot of a selected player with a chance of 5% per 2 minutes. It should now reduce CPU usage.",
        ],
      },
    ],
  },
  {
    update_version: "1.2.0-r.5",
    release_date: "10/20/2025",
    changes: [
      {
        update: "Added Support for 1.21.10",
      },
      {
        update: "Minor Security Patches",
      },
    ],
  },
  {
    update_version: "1.2.0-r.4",
    release_date: "09/22/2025",
    changes: [
      {
        update: "Added Support for 1.21.8",
      },
      {
        update: "Security Patches",
      },
    ],
  },
  {
    update_version: "1.2.0-r.3",
    release_date: "06/27/2025",
    changes: [
      {
        update: "World Specific Plugin",
        sublist: [
          "Set CustomEnchantsWorld to empty array [], which means that the plugin enables all its effects on all world registered in the server. This should fix the 'This enchant doesn't allow you to use in this world' issue.",
        ],
      },
      {
        update:
          "If you wish to only let the plugin take effect on a specific world, then follow the steps below:",
        sublist: [
          "1. Turn off server",
          "2. Locate the config.yml in plugins/CustomEnchantments3",
          "3. Enter your world in CustomEnchantsWorld section",
          '-- Example: - CustomEnchantsWorld: [ "private_world", "arena_world" ]',
          "4. Save the config file",
          "5. Start the server",
        ],
      },
    ],
  },
  {
    update_version: "1.2.0-r.2",
    release_date: "06/14/2025",
    changes: [
      {
        update: "Security Patch",
      },
      {
        update: "Features",
        sublist: [
          "Added EnableAuthorizationYML in the config.yml with a default value of 'false' to reduce the hassle of users setting up in aternos, but it's highly recommended to set it to true if you want a specific player to access the plugin admin commands. If 'false' then players with OP role can use the plugin admin commands, otherwise if true, then only the players that are listed inside the Authorization.yml can use the plugin admin commands.",
        ],
      },
    ],
    note: "If you have any concerns, please create an issue here.",
  },
  {
    update_version: "1.2.0-r.1",
    release_date: "04/24/2025",
    changes: [
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed plugin not starting on 1.21.4 Issue#1 (tested on paper 1.21.4-150 and 1.21.4-226)",
        ],
      },
      {
        update: "Modifications",
        sublist: ["Refactored version checking logic"],
      },
    ],
  },
  {
    update_version: "1.2.0",
    release_date: "04/21/2025",
    changes: [
      {
        update: "Bug Fixes",
        sublist: [
          "Fix Issue #2 - Paper 1.21.1-132 Start Problem",
          "Fixed Attribute issues on 1.21.1 [Health and PotionEffects]",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "Modified Version Checking Logic",
          "Generic Enchantments can now be applied to MACE",
        ],
      },
    ],
  },
  {
    update_version: "1.2.0-beta-r.3",
    release_date: "04/04/2025",
    changes: [
      {
        update: "Modifications",
        sublist: [
          "Cooldown chat messages can now be disabled through config.yml [EnableCooldownMessage]",
          "When disabled, it will play an EXP ORB sound instead [1.19+]",
          "Companion Healing will now apply to wolf armor",
          "Auto Repair can now be applied to wolf armor",
        ],
      },
      {
        update: "New Enchantment",
        sublist: [
          "Companion Thorns (10 levels) - Applies thorn effect with slowness debuff to enemy",
        ],
      },
    ],
  },
  {
    update_version: "1.2.0-beta-r.2",
    release_date: "03/28/2025",
    changes: [
      {
        update: "Trading Modifications",
        sublist: [
          "Added Market Capitalization and Circulation Supply",
          "Default Max Raco Supply is 1_250_000 (Can be adjusted in config.yml)",
          "Default Price for Raco is 0.1 CLVL (Can be adjusted in TradeData.yml)",
          "Buy/Sell adjustment factor is 0.008%. Selling too much burns a portion of CLVL (to avoid spam buy/sell)",
          "Earning Raco from Mob kill, Give command, P2P Payment, Quest rewards, Buy and Sell Exchanges, Heist Enchant, and Treasure bonus will also adjust the total circulation supply",
        ],
      },
    ],
    note: "This feature is experimental, please report if there's any issue.",
  },
  {
    update_version: "1.2.0-beta-r.1",
    release_date: "03/27/2025",
    changes: [
      {
        update: "Compatibility Update",
        sublist: ["Supports MC version 1.21.5"],
      },
      {
        update: "Modifications",
        sublist: [
          "Major overhaul on Particle Handler, PotionEffect Handler, Attribute identifier, and ItemFlag identifier to support 1.21.5 while maintaining backward support down to 1.16",
          "Increased Treasure Item rarity chance from 2% to 5%, can be modified in config.yml (TreasureItemChance)",
        ],
      },
      {
        update: "Features",
        sublist: [
          "Added Mana Splash Potion - Add Mana to player within the surrounding area",
          "Added Anti Mana Splash Potion - Drains Mana to player within the surrounding area",
          "Added Fire Splash Potion - Inflict flame and removes fire resistance",
          "Added Dynamite - Explodes on target",
        ],
      },
      {
        update: "New Help GUI Treasure Items",
        sublist: ["found on /ce help"],
      },
      {
        update: "New Treasure Items",
        sublist: [
          "Wind Orb [MC-1.21+]",
          "Magical Amethyst [MC-1.17+]",
          "Ancient Chicken BBQ",
          "Ancient Netherite Scrap",
        ],
      },
    ],
    note: "This is still a beta version, expect any issues but please report it at the discussions page.",
  },
  {
    update_version: "1.2.0-beta",
    release_date: "03/04/2025",
    changes: [
      {
        update: "Backward Compatibility",
        sublist: ["Plugin now supports version 1.16.4 - 1.21.4."],
      },
      {
        update: "Bug Fixes",
        sublist: [
          "Sell item in raco on invalid price",
          "Custom Item (BOW) - Removed bow damage on melee [which doesn't make sense], set to 0.8 from custom damage",
          "Custom Item (BOW) - Fixed arrow damage to custom damage (custom damage)",
          "Fixed Bow invalid damage on arrow hit to player/entities",
          "Fixed MagicWand damage: MagicDamage = (WAND_DMG * 3)",
          "Fixed Invalid Magic Damage causing 1 hit on magic wand enchantments",
          "Fixed value pass error on brilliance enchantment",
          "Fixed Regain bug [ not working on sudden hit ]",
        ],
      },
      {
        update: "Features",
        sublist: [
          "Dummy shop type can now absorb damages [shows in subtitle]",
          "Create shop with entity types: [horse, piglin, pillager, sheep, villager, witch, wolf] for fun experience",
          "Open Shop using command '/ce shop' [Must be enabled in config.yml]",
          "Added MagicBonusDamage: (1 + INTELLIGENCE * 0.01)",
        ],
      },
      {
        update: "New Command",
        sublist: [
          "/ce help - shows help GUI and redirect players to the wiki page",
        ],
      },
      {
        update: "New Shop",
        sublist: ["Animal Armor Enchantments shop [Horse Armor]"],
      },
      {
        update: "New Enchantment",
        sublist: [
          "Companion Healing (5 levels) - Applies healing to Animal Armor [0.2hp * LEVEL] per 5 seconds",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "Major overhaul to Custom Enchantments (removed dependency to Minecraft Enchantment.class)",
          "Optimized plugin command handler",
          "Chance of getting a lootItem per chest slot is increased to (10% * rarityChance %) from (5% * rarityChance %)",
          "Custom Item (BOW) critical damage set to [dmg = weaponDmg + (weaponDmg * 1.5)]",
          "Bow/CrossBow velocity changed to [0.8 + ((UNSWERVING_SHOT/5) * 0.3)] which increase the projectile distance on MAX UNSWERVING_SHOT",
          "AUTO_FARM: Set auto farm chance to 10% per level (from 8%)",
          "SUDDEN_BLOW: Added blindness particle effect + lightning (no damage)",
          "Changed sound effect to orb pickup on buying Custom Enchantments in shop",
          "Debuff: Mana regen rate set to (0.05 + (INTELLIGENCE * 0.0495)) from (0.2 + (INTELLIGENCE * 0.1))",
          "ManaCost Adjusted: Making abilities less expensive on higher level: totalCost = (manaCostMultiplier * (ENCHANT_LEVEL - 1) * mana_cost) -> totalCost = totalCost - (totalCost * (10% * INTELLIGENCE))",
          "Fireball damage buffed: bonusDamage = MagicDamage * MagicBonusDamage | Fireball I + INTELLIGENCE 200 = 21dmg",
          "Blackhole damage buffed: TotalDmg = LEVEL * (MagicWand + 0.2) * 3 * MagicBonusDamage * pointBlankRange (0 - 1)",
          "SuperNova damage buffed: TotalDmg = LEVEL * (MagicWand + 0.3) * 3 * MagicBonusDamage * pointBlankRange (0 - 1)",
          "Nebula damage buffed: TotalDmg = LEVEL * (MagicWand + 0.1) * 3 * MagicBonusDamage * pointBlankRange (0 - 1)",
          "Lightning damage buffed: TotalDmg = LEVEL * MagicDamage * MagicBonusDamage",
          "Storm damage buffed: TotalDmg = LEVEL * (MagicWand + 0.5) * 3 * (MagicBonusDamage / 2)",
          "Mana Burn buffed: ManaDrain = LEVEL * (WAND_DMG + 5) * 3 // Increased drain effect to counter high level mages",
          "Falling star damage buffed: TotalDmg = LEVEL * (MagicWand + 2) * 3 * MagicBonusDamage",
          "Magic Resist Enchantment set to max level [5]",
          "Magic Resist Enchantment set to absorb 3% of MagicDamage per level, Maximum that the player can absorb is 60% (complete armor set at max level MR)",
          "Added Basic Magic resist to PLAYERS with INTELLIGENCE attribute, AbsorbDmg = TotalMagicDamage - 25% MAX INTELLIGENCE | Absorb 25% damage on max INTELLIGENCE",
          "Light Spirit buffed: TotalMagicDamage = 1.8 * level * 10% of MagicBonusDamage",
          "LifeSteal buffed: HealthStolen = totalDamage * (8% * level), chance of 10% per level (Max 30%)",
          "Bleed modified: TotalDamage = 2 * level * (level * 3 seconds)",
          "Critical modified: TotalDamage + 50% * level, chance of 5% per level (Max 25%)",
          "Poison modified: TotalDamage = 1.6 * level * (level * 4 seconds)",
          "Mana Steal modified: StolenMana = 3 * level to players, 1 mana to mobs",
          "Execute modified: Damage = (LEVEL * 1.5) * MissingHealth%",
          "Juggernaut buffed: Deals 1.5 critical damage per level",
          "Confusion adjusted: Effect triggers every 4 ticks for 5 seconds",
          "DragonBreath adjusted: gain bonus damage (1.5 * level) and inflict flame within 2 block radius",
          "Tank enchantment set to max level [5]",
          "Tank enchantment to absorb 3% of physical damage per level and 1% of critical damage per level. Max of 60% absorb to physical damage and 20% on critical",
          "Poisonous Thorns: Deals bonus damage of (0.5 per level) + poison for (2 seconds x level) (Max level: 10) chance of 5% per level",
          "Freeze: Deals bonus damage of (0.2 per level) + freeze (2 seconds) (Max level: 10) chance of 5% per level",
          "Omnivamp: get 5% of enemy health, chance of 5% per level",
          "Blindess: apply (1.5s x level) blindness to attacker, 10% chance",
          "Regain modified: Up to 5 levels, cooldown will be deducted by 10s per level",
          "ManaShield: Absorb 100% of damage and convert it to a mana cost, cost is deducted by 5% per level of the 50% damage taken",
          "Sturdy: Absorb physical damage (2% per level)",
        ],
      },
      {
        update: "Skill Modifications",
        sublist: [
          "Berserk: get bonus damage of (0.2) x hpLost x BERSERK_LEVEL",
          "SwordMastery: 1 bonus damage per level (only works on swords)",
          "Penetration: Reduce enemy Damage Resistance by 0.5% (5% on MAX level)",
        ],
      },
    ],
    note: "Hi guys, I decided to publish the beta version 1.2.0[beta] because I need you all to test it, let me know if there's any issues and send it in the discussions page",
  },
  {
    update_version: "1.1.0 / A23",
    release_date: "02/05/2024",
    changes: [
      {
        update: "Features",
        sublist: [
          "Added Version Support to v1.20.4 [No backwards compatibility]",
          "CE3 v1.1.0 does not Support v1.19 and below, if you wish to use the plugin on those unsupported versions, try using CE3 v1.0.18",
          "The Enchantment Implementation on Spigot v1.20.4_R1 has changed, moved the CustomEnchantment data to be stored on item's persistent data containers.",
          "Note: This plugin was developed using the SpigotAPI, there might be issues if you'll use a different Server type.",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "Items with CustomEnchantments will no longer glow.",
          "Disenchant SHOP no longer accepts Vanilla Enchantments.",
        ],
      },
      {
        update: "New Admin Command",
        sublist: [
          "/ce ___itemdata___ - check the itemdata of the item currently in main hand for enchantments, for OP players only [dev command]",
        ],
      },
    ],
    note: "If there are any error messages shown in the console or a server crash caused by this plugin, feel free to DM me, I may not reply but I received your messages.",
  },
  {
    update_version: "1.0.18 / A22",
    release_date: "06/27/2023",
    changes: [
      {
        update: "New Enchantment",
        sublist: [
          "Added Gooey Enchantment [Get a chance (3% * level) to launch the enemy 8 blocks above the ground]",
        ],
      },
      {
        update: "Bug Fixes",
        sublist: ["Fixed Shop Right Click Error [1.20]"],
      },
      {
        update: "Modifications",
        sublist: ["Plugin Optimization, updated to support 1.20."],
      },
      {
        update: "New Admin Commands",
        sublist: [
          "/ce skills add [player] [amount] - increase a player skill point by amount [If you give 10 skill points to a player, it will also receive 1 attribute point]",
          "/ce skills reset [player] - resets a player skill point/s back to 0",
        ],
      },
    ],
    note: "If there are any issues with this update, you can dm me right ahead, I may not reply immediately but I will receive your message.",
  },
  {
    update_version: "1.0.17c / A21c",
    release_date: "03/22/2023",
    changes: [
      {
        update: "Features",
        sublist: [
          "Added permission warning on players adding shops [no permission if not listed in PluginData/Authorization.yml]",
        ],
      },
      {
        update: "Optimized Custom Boundary Checker",
        sublist: [
          "Versions 1.0.17b and below rely on boundary blocks caching which cost a lot of memory, this update no longer cache boundary blocks but instead calculate if LocA is inside LocB and LocC directly.",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "MobSpawning was set to 'false' when inside a protected boundary, allowed mob to spawn [Player|Villager|Animal Entity] (I might add an option to what specific mobs to spawn inside a protected boundary in the future)",
        ],
      },
    ],
  },
  {
    update_version: "1.0.17b / A21b",
    release_date: "02/10/2023",
    changes: [
      {
        update: "Bug Fixes",
        sublist: ["Fixed '/ce skills' not working on 1.16"],
      },
    ],
  },
  {
    update_version: "1.0.17a / A21a",
    release_date: "01/24/2023",
    changes: [
      {
        update: "Bug Fixes",
        sublist: ["Fixed no damage on Weapons without enchantment"],
      },
    ],
  },
  {
    update_version: "1.0.17 / A21",
    release_date: "01/22/2023",
    changes: [
      {
        update: "Features",
        sublist: ["Added warning to players enchanting with offhand items"],
      },
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed basic enchantments not showing in CE_Item",
          "Fixed players one hit bug (Not all server experience this issue)",
          "Fixed Startup error",
          "Fixed creating EpicMob ChatSupport on [EpicMobs]",
        ],
      },
    ],
  },
  {
    update_version: "1.0.16 / A20",
    release_date: "01/18/2023",
    changes: [
      {
        update: "Features",
        sublist: [
          "Added [RELOAD] support to Authorization.yml, changing the contents inside the Authorization.yml will no longer be necessary to do a '/reload' but '/ce reload' can do.",
          "Added ExpConfig.yml, you can now set exp gains to each type of mobs and the plugin now supports earning exp on breaking blocks.",
        ],
      },
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed Error on Tools Event, when placing blocks with Treasure Item data.",
          "Fixed distance error spam in the Console (Thread Handler issue)",
        ],
      },
    ],
    note: "I will be adding new enchantments once there is no error/bugs found. As of now I am going to fix the plugin issues.",
  },
  {
    update_version: "1.0.15 / A19",
    release_date: "01/13/2023",
    changes: [
      {
        update: "Features",
        sublist: [
          "Added Custom Resource Pack (1.16 - 1.19)",
          "Added Authorization, none OPERATOR players can now be inlisted for plugin admin",
        ],
      },
      {
        update: "New Enchantments",
        sublist: [
          "Magnetic - Attracts nearby item to pickup (distance: 4*level blocks)",
          "Brilliance - Grant mana regeneration (0.3*level mana per second)",
          "BERSERK now has a chance of doing critical damage (+1.5 dmg) to enemy [BERSERK level * .03 chance, max of 30%",
        ],
      },
      {
        update: "New Command",
        sublist: [
          "[/ce currency (add|deduct|pay|balance)]",
          "[/ce ___reset___] - reset skill level to 0 [resets all classes/skillpoints]",
          "[/ce ___test___] - set skill level to 200 [resets all classes/skillpoints]",
          "[/ce ___lootplot___] - generate a random lootplot nearby",
          "[/ce ___treasure___] - collect all (30) treasure items for testing",
        ],
      },
      {
        update: "Bug Fixes",
        sublist: [
          "Fixed Anvil Issue (1.16)",
          "Fixed remove boundary command 'not working'",
          "Fixed shop/quest entities killed or captured by boat",
          "Fixed Skill bug on Wizard Class (incorrect saved when server reloaded/restarted)",
          "Fixed Raco balance bug (not saved when server reloaded/restarted)",
        ],
      },
    ],
  },
  {
    update_version: "1.0.14 / A18",
    release_date: "01/01/2023",
    changes: [
      {
        update: "Optimized Loot Plot Generation",
        sublist: [
          "From getting a (1% * LootPlotSpawnChance) chance of generating a loot plot for every single movement of a player (causes a huge lag if more players are in the game), it has been replaced to a (50% * LootPlotSpawnChance) chance of generating a loot plot for every two minutes from a player's location, note that it will not generate in a location if an existing LootPlot or there is a (chest or bed) within 100 blocks.",
        ],
      },
      {
        update: "Fixed RACO Exchange Bug",
        sublist: [
          "Added exception handling in PlayerData, if PlayerData is not found then re-register the player",
        ],
      },
      {
        update:
          "CustomChat can be disabled in config.yml, look for (ShowLevelOnChat)",
      },
      {
        update: "Added 7 new Treasure Items!",
      },
    ],
    note: "I recently got hired by a Software Dev company, I may not be active as before. Thank you for your understanding. Happy New Year Everyone:)",
  },
  {
    update_version: "1.0.13 / A17",
    release_date: "10/16/2022",
    changes: [
      {
        update: "Added Reload Feature [beta]",
      },
      {
        update: "Added Shop info on '/ce Shop Info [shop name]'",
      },
      {
        update:
          "Added Soft-Dependency to WorldGuard [Creating Shops/Quest villagers] will require the flag[mob spawning] to be allowed in world guarded region. [beta]",
      },
    ],
  },
  {
    update_version: "1.0.12 / A16",
    release_date: "10/08/2022",
    changes: [
      {
        update: "Fixed NoSuchMethodError on getPersistentDataContainer (1.16)",
      },
    ],
  },
  {
    update_version: "1.0.11 / A15",
    release_date: "10/01/2022",
    changes: [
      {
        update: "Added compatibility to 1.16.5",
      },
    ],
    note: "Note that this feature is beta, there will be some issues in the plugin but feel free to report the issues on the thread, it would be a great help from you :) please report issues all at once, don't report them one by one.",
  },
  {
    update_version: "1.0.10 / A14",
    release_date: "09/29/2022",
    changes: [
      {
        update: "Bug Fix",
        sublist: [
          "Removed 'FALSE' spam in the console",
          "Fixed '0' value on Exp Multiplier on Treasure Items",
        ],
      },
      {
        update: "Modifications",
        sublist: [
          "Players can now /ce shop nearby a villager shop as an alternative for right-clicking the entity. This solved the invisible villager shop issue",
        ],
      },
      {
        update: "New Loots!",
        sublist: ["Added 7 Treasure Items"],
      },
    ],
  },
  {
    update_version: "1.0.9 / A13",
    release_date: "08/23/2022",
    changes: [
      {
        update: "Bug Fix",
        sublist: ["Fixed CoreLoader issue (causing the crash)"],
      },
      {
        update: "Modifications",
        sublist: [
          "Fireball cooldown was set to 5s instead of 1s due to treasure items",
        ],
      },
      {
        update: "New Feature",
        sublist: [
          "Added 16 Treasure Items (BETA) (Treasure Items are special items with passive abilities that are activated when in the player's inventory. It can be found in custom loot plots, its rarity varies on how the TreasureItemChance value was set in the config.yml.) More info about Treasure Items here.",
        ],
      },
    ],
    note: "Sorry, I updated the plugin late, I am busy with my internship. I hope you guys understand :>",
  },
  {
    update_version: "1.0.8 / A12",
    release_date: "07/09/2022",
    changes: [
      {
        update: "Modifications",
        sublist: [
          "Players on Quest can now place blocks that is not the same as mined/broken blocks (Quest to mine/break)",
        ],
      },
      {
        update: "New Feature (beta)",
        sublist: [
          "Server owners can now allow custom enchants on specific worlds. See config.yml",
        ],
      },
    ],
  },
  {
    update_version: "1.0.7 / A11",
    release_date: "07/03/2022",
    changes: [
      {
        update: "New Enchantments",
        sublist: [
          "Confusion (sword)",
          "Dragon Breath (sword)",
          "Heist (sword) (Using RACO/CEcurrency to be bought)",
          "Anti Heist (chest plate) (Using RACO/CEcurrency to be bought)",
        ],
      },
      {
        update: "Modification",
        sublist: [
          "Increased LootPlot generation chance",
          "Modified Boundary Indicator",
        ],
      },
      {
        update: "Trading System (beta)",
        sublist: [
          "Players can now buy RACO coins by converting level to CLVL(currency level)",
          "Players can now sell items in RACO Shop (to create RACO SHOP)",
          "Trading data are stored in TradeData.yml (modify only when the server is offline)",
        ],
      },
    ],
  },
  {
    update_version: "1.0.6",
    release_date: "06/30/2022",
    changes: [
      {
        update: "Added Custom Loot Generation",
        sublist: ["LootItems can now be found on LootPlot chests"],
      },
      {
        update: "Added LootPlots",
        sublist: [
          "A custom-made structure can be created by the server builders/designers where there will be a chest for players to loot from. It will be generated either on the surface or underground.",
          "Creating/Removing lootplots can be possible by doing '/ce settings lootplots' (see the plugin documentation for tutorial)",
        ],
      },
      {
        update: "Added 5 loot plots, builders/designers can make their own",
      },
      {
        update: "Fixed LootItem critical not properly loading",
      },
      {
        update:
          "Added TradingSystem in plugin file but unused for now (future update)",
      },
    ],
  },
  {
    update_version: "1.0.5",
    release_date: "06/23/2022",
    changes: [
      {
        update: "Added Custom Looting (beta)",
        sublist: ["LootItem can be created in LootItems.yml"],
      },
    ],
    note: "This version is beta, there may be an issue but it wont delete any data, just address me the issue on the discussions page of this plugin",
  },
  {
    update_version: "1.0.4",
    release_date: "06/21/2022",
    changes: [
      {
        update: "New Enchantments/Features",
        sublist: [
          "Added Farmland Enchantment",
          "Added Black Hole Enchantment (Using RACO/CEcurrency to be bought)",
          "Added Falling Star Enchantment (Using RACO/CEcurrency to be bought)",
          "Added Telepathy Enchantment. Fishing Rod can be enchanted with Telepathy which directly get the caught item into the player inventory.",
          "Added Land Protection (Blocks enchantment use)",
          "Added Boundary Indicator (Locates protected areas)",
          "Added MagicWandDamage setting to 'Magic Wand' in config",
          "Added Particle Effect Setting",
          "Particle Effect, allows Server admins to set the percentage of particle effect created by the enchantment, it can be set from 0% (off) to 100% (very high), default is 80% (HIGH). This should help the particle lag issue from the client side (players playing).",
        ],
      },
      {
        update: "Bug Fixes",
        sublist: ["Fixed Player balance is not loaded (1.0.3)"],
      },
      {
        update: "Modifications",
        sublist: [
          "Wand magic damage, this associate with the base damage of fireball 1, it will be multiplied by how much level of fireball does the magic wand has. Default value is 0.5, Most magic enchantments are also affected but setting MagicWandDamage to 0 doesn't remove the magic damage of magic enchantments. Note: Magic damage is 3 times greater than the vanilla physical damage.",
          "Breaking blocks now doesn't drop an item when the block is associated with the current CE Quest (Mining Quest).",
          "Moved Quest Request lists to `/ce quest` from `/ce shop` to avoid confusion",
        ],
      },
    ],
  },
  {
    update_version: "1.0.3",
    release_date: "06/16/2022",
    changes: [
      {
        update: "Added Hide Action Bar",
      },
      {
        update: "Auto Update config.yml (beta)",
      },
      {
        update: "Added Stella (Bow Enchantment)",
      },
      {
        update: "Enabled Quest (beta) (tutorial in youtube may follow soon)",
      },
      {
        update:
          "Added Currency (RACO) NO FUNCTION YET (currency is added for a future update)",
      },
    ],
  },
  {
    update_version: "1.0.2",
    release_date: "06/10/2022",
    changes: [
      {
        update: "Supports 1.19",
      },
      {
        update: "Added 'Disable Enchantment' in GUI",
      },
      {
        update: "Added Version support checker",
      },
      {
        update:
          "Added Setting Configuration on enchantment attribute level requirement.",
      },
      {
        update:
          "Added Setting Configuration allowing players to use Enchantments that don't fit on their current classification",
      },
      {
        update: "Fixed Language issues on skill leveling",
      },
    ],
    note: "As of now, there is no config.yml auto-update, I will work on that in the future updates.",
  },
  {
    update_version: "1.0.1",
    release_date: "06/09/2022",
    changes: [
      {
        update: "Added lang.yml",
      },
      {
        update: "Added Update notification [future updates]",
      },
    ],
  },
  {
    update_version: "1.0.0",
    release_date: "06/05/2022",
    changes: [
      {
        update: "First Release",
      },
    ],
  },
];
