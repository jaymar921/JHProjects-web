import {
  LiteGuarantees,
  PluginInformation,
} from "../../contants/farm_tales/FTConstants";
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
 * It does not block the download. It lays out the eight things Lite leaves
 * out, and what the one payment adds, and then hands over the Spigot link at
 * the bottom. Same shape as the Epic Mobs Rework gate, for the same reason: a
 * limit a server owner only finds after paying is a refund request, and
 * there are no refunds.
 *
 * Every row below is a row of docs/build/editions.md "What Lite restricts"
 * in the plugin repo, which is the authority. Do not soften them here.
 */
const LIMITS = [
  {
    icon: "fa-solid fa-layer-group",
    accent: "green",
    area: "Catalog",
    lite: "34 of 134: 15 vegetables, 15 fruits, 4 meats",
    full: "All 134",
    note: "The other 100 are still in the Lite codex, greyed and marked, so you can see exactly what you would be buying.",
  },
  {
    icon: "fa-solid fa-star",
    accent: "amber",
    area: "Quality grades",
    lite: "Common and Good",
    full: "All six, Spoiled to Exquisite",
    note: "A harvest that would have graded higher is clamped down silently, one that would have graded lower is clamped up. No spam on every harvest, by design.",
  },
  {
    icon: "fa-solid fa-cow",
    accent: "rose",
    area: "Animals",
    lite: "Cow and chicken",
    full: "Cow, pig, sheep, chicken, rabbit",
    note: "A pig, sheep or rabbit on Lite drops vanilla meat. Their entries are greyed in the codex.",
  },
  {
    icon: "fa-solid fa-flask",
    accent: "lime",
    area: "Fertilizer",
    lite: "None, watering only",
    full: "Three tiers",
    note: "/ft give on a fertilizer tier says it is Premium. Water, rain and nearby water all work on Lite.",
  },
  {
    icon: "fa-solid fa-heart-pulse",
    accent: "purple",
    area: "Illness",
    lite: "Tracked and shown, never ill",
    full: "Three stages, configured effects",
    note: "Nutrition still fills and drains on Lite and /ft nutrition still shows it. Nothing makes a player ill.",
  },
  {
    icon: "fa-solid fa-box-open",
    accent: "sky",
    area: "Food storage",
    lite: "Nothing rots or ages",
    full: "Rot, snowball hold, three dry-aging tiers",
    note: "The one limit with no in-game surface, which is why /ft says it on the boot banner.",
  },
  {
    icon: "fa-solid fa-wine-bottle",
    accent: "purple",
    area: "Fermentation",
    lite: "Smoothies only",
    full: "Wine and beer, three tiers",
    note: "A Lite server has no fermenter. The drink entries are greyed in the codex like any other premium entry.",
  },
  {
    icon: "fa-solid fa-sliders",
    accent: "amber",
    area: "Admin menu",
    lite: "Config by hand",
    full: "The chest-menu editor",
    note: "/ft admin on Lite names the feature as Premium and says where the same values are edited by hand.",
  },
];

/** One limit, sized to sit four across without becoming a wall of text. */
function Limit({ limit }) {
  return (
    <Panel accent={limit.accent} className="p-3">
      <div className="flex place-items-center gap-2">
        <i className={`${limit.icon} text-[10px] text-slate-400`}></i>
        <SubHeading accent={limit.accent}>{limit.area.toUpperCase()}</SubHeading>
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
          <span className="pixel-font w-14 shrink-0 text-[7px] tracking-widest text-green-400/80 md:text-[8px]">
            PREMIUM
          </span>
          <span className="text-[10px] leading-snug text-green-200 md:text-[11px]">
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

function FT_TrialGate({ setSubcontent }) {
  const { price, spigot } = PluginInformation;

  return (
    <div className="w-full pb-4">
      <Section>
        <SectionHeading
          icon="fa-solid fa-file-arrow-down"
          title="Before you grab the free build"
          accent="emerald"
        />

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Panel accent="emerald" className="p-4">
            <SubHeading accent="emerald">IT IS THE SAME PLUGIN</SubHeading>
            <p className="pt-2 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Lite is Farm Tales with a smaller catalog. The same growth, the
              same water, the same grading, the same seeds from grass, the same
              trees you harvest by breaking a leaf, dishes, cooking, smoothies,
              the codex, the recipe browser and PlaceholderAPI. Nothing
              expires, nothing phones home and nothing checks a licence,
              because{" "}
              <span className="text-amber-300">
                the split is at compile time and they are two separate jars
              </span>
              .
            </p>
            <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
              Run it on your own server first. That is what it is for, and it
              is why there are no refunds on Premium: you can find out exactly
              how it behaves before you spend anything.
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
              Both jars read the same folder. Swap one for the other and every
              config edit and every planted crop is kept.
            </p>
          </Panel>
        </div>

        <div className="mt-4">
          <SectionHeading
            icon="fa-solid fa-lock"
            title="The eight limits"
            accent="rose"
          />
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {LIMITS.map((limit) => (
              <Limit key={limit.area} limit={limit} />
            ))}
          </div>
        </div>

        <Panel accent="green" className="mt-4 p-4 md:p-5">
          <div className="md:flex md:place-items-center md:gap-5">
            <div className="shrink-0 text-center md:text-left">
              <p className="pixel-font text-[7px] tracking-widest text-slate-500 md:text-[9px]">
                ONE PAYMENT, YOURS FOR LIFE
              </p>
              <p className="pixel-font pt-2 text-[1.2em] text-green-300 md:text-[1.8em] [text-shadow:0_0_20px_rgba(74,222,128,0.5)]">
                {price.symbol}
                {price.amount}
              </p>
            </div>
            <Body className="pt-3 md:pt-0">
              Every limit above lifted: all 134 entries, all six grades, all
              five animals, fertilizer, illness, rot and dry-aging, wine and
              beer, and the admin menu. Updates for life are included, so{" "}
              {PluginInformation.version} today and everything after it costs
              the same: nothing. There is no subscription and there never will
              be.
            </Body>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <PixelButton
              accent="green"
              icon="fa-solid fa-cart-shopping"
              className="w-full md:w-auto"
              onClick={() => setSubcontent("buy plugin")}
            >
              GET PREMIUM
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
              onClick={trackedRedirect(PROJECTS.FARM_TALES, {
                action: CLICK_ACTIONS.DOWNLOAD,
                label: "DOWNLOAD FREE LITE BUILD",
                target: PluginInformation.liteDownloadLink,
              })}
            >
              {spigot.pending ? "LITE, ON SPIGOT SOON" : "DOWNLOAD LITE, FREE"}
            </PixelButton>
          </div>

          <p className="pt-3 text-[9px] leading-relaxed text-slate-500 md:text-[10px]">
            <i className="fa-solid fa-circle-info pr-1 text-sky-300"></i>
            {spigot.pending
              ? "The Lite listing is not up yet and there is no date for it. The button above opens the developer's Spigot profile, where it will appear."
              : "Still want to try first? Do. Run Lite, let your players hit the ceiling, then decide."}{" "}
            It covers {PluginInformation.serverSoftware}{" "}
            {PluginInformation.supportedVersions}, and buying Premium later
            keeps every file and every crop in the ground.
          </p>
        </Panel>
      </Section>
    </div>
  );
}

export default FT_TrialGate;
