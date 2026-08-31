import { PluginInformation } from "../../contants";
import { Enchantments } from "../../contants/custom_enchants_3/CE3Constants";
import { formatDownloads } from "../../utils/useSpigetDownloads";
import {
  Body,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  SubHeading,
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackedRedirect } from "../../../lib/analytics";

/**
 * Shown when someone asks for the free lite build. It does not block the
 * download, it just lays out what lite caps before handing over the Spigot
 * link.
 *
 * It has to fit the 80vh window without a long scroll, so every line here is
 * doing work. The six rows below are the lite edition's actual compile time
 * limits, kept in step with releases/_lite-limitations.md in the plugin
 * repository. Do not soften them: a cap a server owner only finds after paying
 * is a refund request.
 */
const LIMITS = [
  {
    icon: "fa-solid fa-gem",
    accent: "rose",
    area: "Treasures",
    lite: "69 of 134",
    premium: "All 134",
    note: "Rare, epic and legendary are cut from the pool, so loot chests, bandit drops and the catalogue all top out at uncommon.",
  },
  {
    icon: "fa-solid fa-hammer",
    accent: "amber",
    area: "Enchants per item",
    lite: "3, unraisable",
    premium: "Your EnchantLimit",
    note: "The anvil reads the same cap, so the deep stacked gear your players chase is a premium only build.",
  },
  {
    icon: "fa-solid fa-tags",
    accent: "purple",
    area: "Shop prices",
    lite: "Baked into the jar",
    premium: "Your config.yml",
    note: "The one owners mind most. In lite you cannot price a single enchantment for your own economy.",
  },
  {
    icon: "fa-solid fa-store",
    accent: "sky",
    area: "Shop stock",
    lite: "First 7 books",
    premium: "Every book, every page",
    note: "Across all 11 selling screens. The rest sit greyed out and marked Unlock premium.",
  },
  {
    icon: "fa-solid fa-right-left",
    accent: "lime",
    area: "Market listings",
    lite: "2 per player",
    premium: "Unlimited",
    note: "Enough to see the market work, not enough for a player economy to form on your server.",
  },
  {
    icon: "fa-solid fa-book",
    accent: "amber",
    area: "Support prompt",
    lite: "Ops, hourly",
    premium: "Never shown",
    note: "Only ops ever see it, never your players, and it goes the moment you upgrade.",
  },
];

/** One cap, sized to sit three across without wrapping into a wall of text. */
function Cap({ limit }) {
  return (
    <Panel accent={limit.accent} className="p-3">
      <div className="flex place-items-center gap-2">
        <i className={`${limit.icon} text-[10px] text-slate-400`}></i>
        <SubHeading accent={limit.accent}>
          {limit.area.toUpperCase()}
        </SubHeading>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex gap-2">
          <span className="pixel-font w-14 shrink-0 text-[7px] tracking-widest text-slate-500 md:text-[8px]">
            FREE
          </span>
          <span className="text-[10px] leading-snug text-slate-400 md:text-[11px]">
            {limit.lite}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="pixel-font w-14 shrink-0 text-[7px] tracking-widest text-lime-400/80 md:text-[8px]">
            PREMIUM
          </span>
          <span className="text-[10px] leading-snug text-lime-200 md:text-[11px]">
            {limit.premium}
          </span>
        </div>
      </div>
      <p className="mt-2 border-t border-slate-700/50 pt-2 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
        {limit.note}
      </p>
    </Panel>
  );
}

function CE3_TrialGate({ setSubcontent, downloads }) {
  const lite = formatDownloads(downloads?.lite ?? 0);
  const premium = formatDownloads(downloads?.premium ?? 0);
  const liteVersion = downloads?.liteVersion ?? PluginInformation.version;

  return (
    <div className="w-full pb-4">
      <Section>
        <SectionHeading
          icon="fa-solid fa-file-arrow-down"
          title="Before you grab the free build"
          accent="sky"
        />

        {/* The counts and the pitch share one row, so neither costs a screen. */}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Panel accent="amber" className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3 text-center">
                <p className="pixel-font text-[0.95em] text-slate-300 md:text-[1.3em]">
                  {lite}
                </p>
                <p className="pixel-font pt-2 text-[7px] leading-relaxed tracking-widest text-slate-500 md:text-[9px]">
                  PLAY IT FREE
                </p>
              </div>
              <div className="border border-lime-400/50 bg-lime-500/10 p-3 text-center">
                <p className="pixel-font text-[0.95em] text-lime-300 md:text-[1.3em] [text-shadow:0_0_14px_rgba(163,230,53,0.45)]">
                  {premium}
                </p>
                <p className="pixel-font pt-2 text-[7px] leading-relaxed tracking-widest text-lime-400/80 md:text-[9px]">
                  OWN THE PREMIUM
                </p>
              </div>
            </div>
            <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Plenty of servers play it free. Only{" "}
              <span className="text-lime-300">{premium}</span> owners have
              bought the premium build, and{" "}
              <span className="text-amber-300">
                they paid once, {PluginInformation.currency_symbol}
                {PluginInformation.price}, and never again
              </span>
              . Be one of them.
            </p>
          </Panel>

          <Panel accent="lime" className="p-4">
            <SubHeading accent="lime">IT IS NOT A CUT DOWN DEMO</SubHeading>
            <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              All {Enchantments.length} enchantments are in the free build at
              full ability behaviour, and so are the 25 quests, bandit camps,
              RACO and its price chart. Nothing is missing. What lite does is
              cap six of them, with{" "}
              <span className="text-amber-300">
                compile time constants no config key turns off
              </span>
              .
            </p>
          </Panel>
        </div>

        {/* Six short facts, sized like six short facts. */}
        <div className="mt-4">
          <SectionHeading
            icon="fa-solid fa-lock"
            title="The six caps"
            accent="rose"
          />
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {LIMITS.map((limit) => (
              <Cap key={limit.area} limit={limit} />
            ))}
          </div>
        </div>

        {/* Price, both calls to action and the download, in one closing panel. */}
        <Panel accent="lime" className="mt-4 p-4 md:p-5">
          <div className="md:flex md:place-items-center md:gap-5">
            <div className="shrink-0 text-center md:text-left">
              <p className="pixel-font text-[7px] tracking-widest text-slate-500 md:text-[9px]">
                ONE PAYMENT, YOURS FOR LIFE
              </p>
              <p className="pixel-font pt-2 text-[1.2em] text-lime-300 md:text-[1.8em] [text-shadow:0_0_20px_rgba(163,230,53,0.5)]">
                {PluginInformation.currency_symbol}
                {PluginInformation.price}
              </p>
            </div>
            <Body className="pt-3 md:pt-0">
              65 more treasure items, your own shop prices, a market your
              players can trade on, and gear that stacks past three
              enchantments. Updates for life are included, so v
              {PluginInformation.version} today and everything after it costs
              the same: nothing.
            </Body>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <PixelButton
              accent="lime"
              icon="fa-solid fa-cart-shopping"
              className="w-full md:w-auto"
              onClick={() => setSubcontent("buy plugin")}
            >
              GET PREMIUM
            </PixelButton>
            <PixelButton
              accent="amber"
              icon="fa-solid fa-wand-magic-sparkles"
              className="w-full md:w-auto"
              onClick={() => setSubcontent("enchants")}
            >
              SEE ALL {Enchantments.length} ENCHANTS
            </PixelButton>
            <PixelButton
              accent="sky"
              icon="fa-solid fa-file-arrow-down"
              className="w-full md:ml-auto md:w-auto"
              onClick={trackedRedirect(PROJECTS.CE3, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "DOWNLOAD FREE LITE BUILD",
                target: PluginInformation.trialLink,
              })}
            >
              DOWNLOAD FREE ({liteVersion})
            </PixelButton>
          </div>

          <p className="pt-3 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
            <i className="fa-solid fa-circle-info pr-1 text-sky-300"></i>
            Still want to try first? Run the free build, let your players hit
            the caps, then decide. It covers Spigot and Paper{" "}
            {PluginInformation.supportedVersions}. Premium needs a dedicated
            server, so it will not run on Aternos.
          </p>
        </Panel>
      </Section>
    </div>
  );
}

export default CE3_TrialGate;
