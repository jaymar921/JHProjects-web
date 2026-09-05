# Epic Mobs Rework trailer, copy for YouTube and Facebook

Paste-ready title and description for the video this folder renders. It lives
next to the storyboard on purpose: the chapter list below is the shot list in
`storyboard.js`, so re-timing a shot invalidates it.

Three rules the copy follows, all inherited from `EMRConstants.js`, which says
why:

- **No release date.** Not a quarter, not "soon". There is not one.
- **Nothing to buy.** The price is stated on the page as the intended one. A
  social post is not the place to attach it to a button.
- **No download link.** Neither listing exists yet, and a link to a 404 is
  worse than no link.

And one that comes from the video itself: the trailer is built out of Creative
Commons Attribution models, and CC-BY asks for credit wherever the work
appears. A description someone reads without watching to 0:49 is such a place,
so the attribution block is part of the copy rather than an extra. It has to
agree with `assets/CREDITS.txt`, the last card of the video, and `ModelCredits`
in `EMRConstants.js`.

## Which file to upload

`scripts/emr-video/upload/epic-mobs-rework-1080p.mp4`, not the one in
`src/assets`. The one in `src/assets` is the page embed, compressed harder
because every visitor downloads it. The upload copy is the clean master and is
git ignored, so if it is not there, run `node scripts/generate-emr-video.mjs`
and it will be.

---

## YouTube

### Title

```
Epic Mobs Rework: Your Server's Mobs Should Be Worth Fighting
```

Alternates, if the search terms need to work harder:

```
Epic Mobs Rework: Custom Minecraft Mobs, Bosses & Loot for Spigot & Paper
```

```
I'm Rebuilding Epic Mobs: Custom Mobs, Bosses and Companions for Spigot
```

### Description

```
Epic Mobs Rework is the rebuild of Epic Mobs. Take any vanilla entity, give it a
name, stats, gear, abilities and a loot table, then tell the plugin where in the
world it belongs. It handles the rest.

IN DEVELOPMENT, NOT RELEASED YET. There is no release date and no download link
in this description, because there is nothing to download yet. This is a look at
what it is, not a launch.

WHAT IT DOES
• Any vanilla entity as the base, bee to warden, across six tiers
• Health, damage and resistance tracked by the plugin, so a zombie can carry ten
  thousand hit points without touching an attribute
• Abilities with a trigger, a radius, a cooldown and a telegraph. The warning
  lands before the damage does
• Bosses with phase thresholds, an entrance, immunity while they transition, and
  a bar the whole server sees
• Companions: any Epic Mob built as a friend instead. It follows you, fights what
  you fight, never hits you, levels up, and takes a saddle to become a mount
• Six ways a mob reaches the world, all on a spawn budget
• Weighted loot tables with guaranteed drops and rolls, shared by damage dealt
  rather than handed to whoever landed the last hit

WHY IT IS BUILT THIS WAY
No NMS anywhere in it, so a Minecraft release does not need a new jar. One jar
covers 1.16.5 and up. One readable file per mob under mobs/, so you can edit it
in a text editor, hand it to someone, or track it in git. Standalone first:
Custom Enchantments 3, Kumandra's Economy, Vault, WorldGuard and PlaceholderAPI
are each detected on their own and each skipped silently when absent.

A free Lite build ships alongside the full one. Same code, limits on how much you
can build, and nothing expires in either, because the split is at compile time.
There is no licence check and nothing that phones home.

Spigot / Paper 1.16.5 and up.
Page: https://jhprojects.vercel.app/epic-mobs-rework

CHAPTERS
0:00 Mobs worth fighting
0:11 Abilities and boss phases
0:22 Companions and where mobs live
0:33 Loot and integrations
0:43 Where to find it

3D MODELS USED, under Creative Commons Attribution. Their authors are not
affiliated with this plugin and have not endorsed it.
minecraft_park by rhoce, https://sketchfab.com/rhoce
minecraft_zombie, minecraft_calico_cat and minecraft_better_spider by JohnElkes,
https://sketchfab.com/JohnElkes
minecraft_warden by BeckBroEYTube, https://sketchfab.com/BeckBroEYTube
Player model from https://nogard.dev/tools/minecraft-skin-renderer

By JayMar921, https://jayharronabejar.vercel.app/

#Minecraft #MinecraftPlugins #Spigot #PaperMC #MinecraftServer #MinecraftBosses
```

---

## Facebook

Facebook cuts the post off at roughly 125 characters behind a "See more", so
the hook carries it and the detail sits below the fold.

```
Your server's mobs should be worth fighting. So I'm rebuilding Epic Mobs from the
ground up. 👇

Take any vanilla entity, give it a name, stats, gear, abilities and a loot table,
then tell the plugin where in the world it belongs. It handles the rest.

⚔️ Abilities with a real telegraph, so the warning lands before the damage does
💀 Bosses that pick up new abilities as they die, with phases and a boss bar
🐺 Any mob can be built as a companion instead: it follows you, fights what you
   fight, never hits you, levels up, and takes a saddle to become a mount
🎁 Weighted loot shared by damage dealt, not handed to the last hit
🔧 No NMS, no dependencies, one readable file per mob you can open in a text
   editor

Free Lite build alongside the full one. Nothing expires in either.

Still in development. No release date yet, and nothing to buy. This is just a
look at where it's going.

Spigot / Paper 1.16.5 and up → https://jhprojects.vercel.app/epic-mobs-rework

3D models used under Creative Commons Attribution, by rhoce, JohnElkes and
BeckBroEYTube on Sketchfab. Player model from nogard.dev/tools/minecraft-skin-renderer.
They are not affiliated with this plugin.

#Minecraft #MinecraftPlugins #Spigot #PaperMC #MinecraftServer
```

---

## Where the chapters come from

`SHOTS` in `storyboard.js`, merged into pairs. YouTube rejects any chapter
shorter than ten seconds and most shots are between five and six, so a chapter
per shot is not an option.

| Chapter | Shots it covers | Seconds |
| --- | --- | --- |
| 0:00 Mobs worth fighting | `title`, `mobs` | 0.0 to 11.0 |
| 0:11 Abilities and boss phases | `abilities`, `boss` | 11.0 to 22.4 |
| 0:22 Companions and where mobs live | `companions`, `world` | 22.4 to 33.4 |
| 0:33 Loot and integrations | `loot`, `integrations` | 33.4 to 43.8 |
| 0:43 Where to find it | `outro`, `credits` | 43.8 to 55.0 |

Change a shot's `len` and these move. The first chapter has to stay at 0:00 or
YouTube ignores the whole list.

## When the plugin ships

Three things in the copy above are written to be replaced on release day, and
none of them can be filled in before the listing exists:

1. The `IN DEVELOPMENT, NOT RELEASED YET` paragraph on YouTube and the
   `Still in development` line on Facebook.
2. The download links, once `downloadLink` and `liteDownloadLink` are set in
   `PluginInformation`. The page turns its buttons on from the same two fields.
3. The price, which is `£17.49` in `PluginInformation.price` and is labelled
   there as the intended one.
