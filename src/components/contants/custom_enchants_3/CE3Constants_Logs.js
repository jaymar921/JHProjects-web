export const CE3_Logs = [
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
