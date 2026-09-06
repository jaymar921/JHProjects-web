import {
  LiteGuarantees,
  PluginInformation,
} from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  SubHeading,
} from "../../page_components/PixelUIKit";
import {
  CLICK_ACTIONS,
  PROJECTS,
  trackedRedirect,
} from "../../../lib/analytics";

/**
 * Shown when somebody asks for the free Lite build.
 *
 * It does not block the download. It lays out what Lite caps, and what the one
 * payment lifts, and then hands over the Spigot link at the bottom. The same
 * shape as CE3_TrialGate, and for the same reason: a cap a server owner only
 * finds after paying is a refund request, and there are no refunds.
 *
 * Every row below is a row of EditionMatrix, so the two cannot drift. That
 * matrix in turn has to match documents/lite-features/1.0-limitations.md in
 * the plugin repo and the constants in EditionPolicy.java. Do not soften them
 * here.
 */
const CAPS = [
  {
    icon: "fa-solid fa-skull",
    accent: "ember",
    area: "Mob definitions",
    lite: "20 built in, plus 10 of your own",
    full: "Unlimited",
    note: "The twenty it ships with do not count against your ten, and Lite cannot delete them. Full lifts the ceiling and lets you clear the shelf.",
  },
  {
    icon: "fa-solid fa-wand-sparkles",
    accent: "amber",
    area: "Abilities per mob",
    lite: "2, built in only",
    full: "Unlimited, and your own",
    note: "Lite picks from the built-in list. Custom ability authoring, with your own triggers and telegraphs, is a full build feature.",
  },
  {
    icon: "fa-solid fa-dragon",
    accent: "rose",
    area: "Bosses and groups",
    lite: "Boss bars only",
    full: "Phases, packs, arenas, companions",
    note: "The fight that changes at half health, the pack that holds formation, the arena, the pet that follows you. None of it is in Lite.",
  },
  {
    icon: "fa-solid fa-sack-xmark",
    accent: "purple",
    area: "Loot per mob",
    lite: "5 entries",
    full: "Unlimited",
    note: "Enough for a drop table, not enough for a rarity ladder. CE3 treasure and enchantment book drops are full build only.",
  },
  {
    icon: "fa-solid fa-tower-observation",
    accent: "sky",
    area: "Raids",
    lite: "1 definition",
    full: "Unlimited",
    note: "Lite runs one raid, on demand. Boss waves, waves that spawn a pack and scheduling windows all need the full build.",
  },
  {
    icon: "fa-solid fa-table-columns",
    accent: "lime",
    area: "Editors and codex",
    lite: "Chat wizard and commands",
    full: "Plus both admin GUIs",
    note: "Everything is reachable in Lite, just typed rather than clicked. The mob editor, the raid editor and the player-facing codex are full build.",
  },
];

/** One cap, sized to sit three across without becoming a wall of text. */
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
            LITE
          </span>
          <span className="text-[10px] leading-snug text-slate-400 md:text-[11px]">
            {limit.lite}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="pixel-font w-14 shrink-0 text-[7px] tracking-widest text-orange-400/80 md:text-[8px]">
            FULL
          </span>
          <span className="text-[10px] leading-snug text-orange-200 md:text-[11px]">
            {limit.full}
          </span>
        </div>
      </div>
      <p className="mt-2 border-t border-slate-700/50 pt-2 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
        {limit.note}
      </p>
    </Panel>
  );
}

function EMR_TrialGate({ setSubcontent }) {
  const { price } = PluginInformation;

  return (
    <div className="w-full pb-4">
      <Section>
        <SectionHeading
          icon="fa-solid fa-file-arrow-down"
          title="Before you grab the free build"
          accent="emerald"
        />

        {/* What Lite is, and the promises it makes, in one row. */}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Panel accent="emerald" className="p-4">
            <SubHeading accent="emerald">IT IS NOT A CUT DOWN DEMO</SubHeading>
            <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Lite is a complete monster plugin. The same twenty mobs, the same
              spawn system, the same raid, and every integration works in it.
              Nothing expires, nothing phones home and nothing checks a licence,
              because{" "}
              <span className="text-amber-300">
                the split is at compile time and they are two separate jars
              </span>
              . What Lite does is cap how much of your own you build on top.
            </p>
            <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Run it on your own server first. That is what it is for, and it is
              why there are no refunds on the full build: you can find out
              exactly how it behaves before you spend anything.
            </p>
          </Panel>

          <Panel accent="amber" className="p-4">
            <SubHeading accent="amber">WHAT IT PROMISES</SubHeading>
            <ul className="list-none pt-2">
              {LiteGuarantees.map((guarantee) => (
                <li
                  key={guarantee.title}
                  className="flex gap-2 border-b border-slate-800/80 py-1.5 last:border-b-0"
                >
                  <i
                    className={`${guarantee.icon} pt-0.5 text-[10px] text-slate-500`}
                  ></i>
                  <span className="pixel-font text-[7px] leading-relaxed tracking-widest text-slate-300 md:text-[9px]">
                    {guarantee.title}
                  </span>
                </li>
              ))}
            </ul>
            <p className="pt-2 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
              Go over a limit and the extra entries are skipped with a warning
              naming each one. Your files are never rewritten, and moving
              between the two builds keeps everything, kill counts included.
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
            {CAPS.map((limit) => (
              <Cap key={limit.area} limit={limit} />
            ))}
          </div>
        </div>

        {/* Price, both calls to action and the download, in one closing panel. */}
        <Panel accent="ember" className="mt-4 p-4 md:p-5">
          <div className="md:flex md:place-items-center md:gap-5">
            <div className="shrink-0 text-center md:text-left">
              <p className="pixel-font text-[7px] tracking-widest text-slate-500 md:text-[9px]">
                ONE PAYMENT, YOURS FOR LIFE
              </p>
              <p className="pixel-font pt-2 text-[1.2em] text-orange-300 md:text-[1.8em] [text-shadow:0_0_20px_rgba(251,146,60,0.5)]">
                {price.symbol}
                {price.amount}
              </p>
              {price.onSale && (
                <p className="pixel-font pt-2 text-[7px] tracking-widest text-amber-300 md:text-[9px]">
                  {price.saleLabel}, {price.symbol}
                  {price.regularAmount} AT 1.0
                </p>
              )}
            </div>
            <Body className="pt-3 md:pt-0">
              Every limit above lifted, plus companions, boss phases, packs,
              arenas, custom ability authoring, the codex and both admin
              editors. Updates for life are included, so {PluginInformation.version}{" "}
              today and everything after it costs the same: nothing. There is no
              subscription and there never will be.
            </Body>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <PixelButton
              accent="ember"
              icon="fa-solid fa-cart-shopping"
              className="w-full md:w-auto"
              onClick={() => setSubcontent("buy plugin")}
            >
              GET THE FULL BUILD
            </PixelButton>
            <PixelButton
              accent="amber"
              icon="fa-solid fa-scale-balanced"
              className="w-full md:w-auto"
              onClick={() => setSubcontent("editions")}
            >
              EVERY DIFFERENCE, IN FULL
            </PixelButton>
            <PixelButton
              accent="emerald"
              icon="fa-solid fa-file-arrow-down"
              className="w-full md:ml-auto md:w-auto"
              onClick={trackedRedirect(PROJECTS.EPIC_MOBS_REWORK, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "DOWNLOAD FREE LITE BUILD",
                target: PluginInformation.liteDownloadLink,
              })}
            >
              DOWNLOAD LITE, FREE
            </PixelButton>
          </div>

          <p className="pt-3 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
            <i className="fa-solid fa-circle-info pr-1 text-sky-300"></i>
            Still want to try first? Do. Run Lite, let your players hit the
            caps, then decide. It covers {PluginInformation.serverSoftware}{" "}
            {PluginInformation.supportedVersions}, and buying the full build
            later keeps every file you wrote in the meantime.
          </p>
        </Panel>
      </Section>
    </div>
  );
}

export default EMR_TrialGate;
