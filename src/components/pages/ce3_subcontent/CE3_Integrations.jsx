import { integrations as INTEGRATIONS_ART } from "../../../assets/custom_enchants_3/features";
import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";

/**
 * The optional plugins Custom Enchantments 3 works with.
 *
 * The rule this whole panel is written to: Custom Enchantments 3, Kumandra's
 * Economy and Epic Mobs Rework are three standalone plugins. Each one runs on
 * its own and needs none of the others. They happen to be compatible, which is
 * worth knowing and is never a requirement, so every section says what the
 * pairing adds and what happens without it.
 */
function CE3_Integrations() {
  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={INTEGRATIONS_ART}
          alt="The three optional plugins Custom Enchantments 3 works with, and the config keys behind them"
          accent="lime"
          caption="Three optional pairings. None of them is required and none of them is bundled."
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-plug"
          title="Standalone first, compatible second"
          accent="lime"
        />
        <Body className="pt-5 text-justify">
          Custom Enchantments 3 requires nothing. No Vault, no permissions
          plugin, no database, and no companion plugin. Kumandra&apos;s Economy
          and Epic Mobs Rework are the same: each one is a standalone plugin
          that runs on its own server perfectly well. They are written by the
          same developer, so they know about each other and fit together when
          you run more than one, but not one of them is a dependency of another.
        </Body>
        <Body className="pt-3 text-justify">
          Nothing here is bundled either. The class that names a Kumandra type
          and the class that names a PlaceholderAPI type are both reached by
          name at runtime, and only after the server confirms the plugin is
          installed, so on a server without them those classes are never
          loaded. If you install one later, a{" "}
          <Cmd accent="lime">/ce reload</Cmd> is enough.
        </Body>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-coins"
          title="Kumandra's Economy"
          subtitle="Optional. Needs 2.0 or newer."
          accent="emerald"
        />
        <Panel accent="emerald" className="mt-6 p-5">
          <div className="flex flex-wrap place-items-center gap-2">
            <SubHeading accent="emerald">TWO CURRENCIES, ONE RULE</SubHeading>
            <Chip accent="emerald">ADDED IN v1.6.0</Chip>
          </div>
          <Body className="pt-3 text-justify">
            RACO has a fixed supply of 1.25 million coins and a price that moves
            on circulation, so the one thing this pairing must never do is turn
            Kumandra money into RACO out of nothing. It does not. A player
            paying a RACO price with Kd has that RACO bought out of the
            circulating supply first, and the seller is paid in the RACO they
            listed for.
          </Body>
          <Bullets className="pt-4">
            <Bullet accent="emerald">
              Kd works in the RACO shop, on books you priced in RACO, on
              Cofferguard&apos;s running cost, and through conversion buttons in
              the exchange screen.
            </Bullet>
            <Bullet accent="emerald">
              A player holding enough RACO always spends the RACO. Kd is the
              fallback, never the default.
            </Bullet>
            <Bullet accent="emerald">
              If the supply has run dry the payment is refused and the Kd handed
              back, rather than inflating the currency.
            </Bullet>
            <Bullet accent="emerald">
              Kumandra 2.1 adds the other half: your CE3 balance on its own
              balance screen, and a convert command.
            </Bullet>
          </Bullets>
          <div className="pt-5">
            <PixelButton
              as="a"
              href="/kumandras-economy"
              accent="emerald"
              icon="fa-solid fa-arrow-up-right-from-square"
            >
              SEE KUMANDRA&apos;S ECONOMY
            </PixelButton>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-skull"
          title="Epic Mobs Rework"
          subtitle="Optional. Nothing to configure on this side."
          accent="rose"
        />
        <Panel accent="rose" className="mt-6 p-5">
          <div className="flex flex-wrap place-items-center gap-2">
            <SubHeading accent="rose">MOBS THAT USE YOUR ENCHANTS</SubHeading>
            <Chip accent="rose">OPENED UP IN v1.7.0</Chip>
          </div>
          <Body className="pt-3 text-justify">
            An Epic Mob could always carry a CE3 enchanted weapon, and Epic Mobs
            read the enchantments on it correctly. What it could not do was make
            them behave like themselves: a mob with a Bleed sword dealt a bit of
            extra magic damage and every enchantment on every mob weapon felt
            the same. 1.7.0 lets Epic Mobs say &quot;run Bleed, from this mob,
            against this player&quot;, and the player bleeds exactly the way
            they would from another player&apos;s Bleed sword, because it is the
            same code rather than a second copy of it.
          </Body>
          <Bullets className="pt-4">
            <Bullet accent="rose">
              A mob&apos;s CE3 enchantments run their real effects, clamped and
              allow-listed from the Epic Mobs side so a mob with a maxed Soul
              Eater is not a fight.
            </Bullet>
            <Bullet accent="rose">
              An Epic Mobs loot table can name a CE3 treasure or a CE3
              enchantment book and get the same item the shop sells, custom
              model data and all.
            </Bullet>
            <Bullet accent="rose">
              Kills can pay out in RACO, drawn out of the capped supply rather
              than minted.
            </Bullet>
            <Bullet accent="rose">
              CE3 protected boundaries keep Epic Mobs out of your spawn and your
              builds, and mob difficulty can scale off player CE3 levels.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="amber" icon="fa-solid fa-hourglass-half">
              The Epic Mobs side of the enchantment triggers and the loot table
              items needs an Epic Mobs release too. Custom Enchantments 3 1.7.0
              has opened the door; Epic Mobs walks through it in its 1.0
              release, and 1.0-RC1 behaves as it does today until then. Nothing
              gets worse in the meantime, and there is nothing for you to
              configure on either side.
            </Note>
          </div>
          <div className="pt-5">
            <PixelButton
              as="a"
              href="/epic-mobs-rework"
              accent="rose"
              icon="fa-solid fa-arrow-up-right-from-square"
            >
              SEE EPIC MOBS REWORK
            </PixelButton>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-gauge-high"
          title="PlaceholderAPI"
          subtitle="Optional, and on both editions."
          accent="sky"
        />
        <Panel accent="sky" className="mt-6 p-5">
          <div className="flex flex-wrap place-items-center gap-2">
            <SubHeading accent="sky">EVERY VALUE, PLUS THE TIMINGS</SubHeading>
            <Chip accent="sky">ADDED IN v1.7.0</Chip>
          </div>
          <Body className="pt-3 text-justify">
            The player values go anywhere PlaceholderAPI works: a scoreboard, a
            hologram, a chat format, the tab list. The timings are the reason it
            exists. A profiler tells you a Custom Enchantments 3 damage listener
            is expensive, which is true and useless, because that listener is
            thirty enchantment handlers and a whole defence pass.
          </Body>
          <Terminal
            title="CustomEnchantments3 / placeholders"
            className="mt-5"
          >
            <pre>
              <code className="text-[10px] md:text-sm" lang="md">
                <TerminalLabel accent="sky">[A FEW OF THEM]</TerminalLabel>
                {`
%ce3_level%             the CE3 level, not the vanilla one
%ce3_class%             WARRIOR, ARCHER, WIZARD or NONE
%ce3_raco%              their RACO balance
%ce3_enchant_bleed%     the level on what they are holding
%ce3_perf_melee_tick%   the share of a tick combat costs
`}
              </code>
            </pre>
          </Terminal>
          <Bullets className="pt-4">
            <Bullet accent="sky">
              Eight repeating paths are measured: melee, projectile, passive,
              treasure, magnetic, status, shop and mining.
            </Bullet>
            <Bullet accent="sky">
              The <span className="pixel-font">_tick</span> share is the number
              to compare. Half a millisecond is free once a second and is your
              whole tick budget a hundred times a second.
            </Bullet>
            <Bullet accent="sky">
              No PlaceholderAPI? <Cmd accent="sky">/ce perf</Cmd> prints the
              same numbers in chat, and <Cmd accent="sky">/ce perf reset</Cmd>{" "}
              clears them.
            </Bullet>
            <Bullet accent="sky">
              Nothing about seeing what the plugin is doing is a premium
              feature. The lite build gets all of it.
            </Bullet>
          </Bullets>
          <Body className="pt-4">
            The full list is in the settings panel, under{" "}
            <span className="text-sky-300">
              Placeholders and what the plugin costs
            </span>
            .
          </Body>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-toggle-on"
          title="The keys behind them"
          accent="purple"
        />
        <Terminal title="CustomEnchantments3 / config.yml" className="mt-6">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="purple">[INTEGRATIONS]</TerminalLabel>
              {`
KumandraEconomySupport: true   # master switch, inert
                               # without Kumandra installed
KumandraExchangeRate: 25.0     # Kd per 1 RACO
KumandraConversionFee: 0.05    # both directions
KumandraShopPayment: true      # the RACO shop
KumandraEnchantPayment: true   # enchantment books
KumandraConversionEnabled: true # the swap buttons

PlaceholderAPISupport: true    # inert without
                               # PlaceholderAPI installed
`}
            </code>
          </pre>
        </Terminal>
        <div className="pt-4">
          <Note accent="lime" icon="fa-solid fa-shield-halved">
            WorldGuard is respected too when it is installed, and it is optional
            in exactly the same way. Set any of the keys above to false and the
            plugin behaves as though the other plugin were not there at all.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default CE3_Integrations;
