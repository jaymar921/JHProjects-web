import { RedirectTo } from "../../utils/PageUtility";
import {
  PluginInformation,
  PremiumReasons,
} from "../../contants/farm_tales/FTConstants";
import {
  Body,
  IconBadge,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  StatChip,
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackClick } from "../../../lib/analytics";

/**
 * The panel behind the PREMIUM card: what the money buys, then three ways to
 * pay the same number.
 *
 * The six reasons come first, before the tiles, because somebody who opened
 * this panel from the free-build card has just read what Lite lacks and
 * wants the other half of that sentence. The price is the same on every
 * route for now, so the tiles print one number three times.
 */
const ACCENTS = ["green", "sky", "lime"];
const { payment, price, spigot } = PluginInformation;

function FT_BuyPlugin({ setSubcontent }) {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-cart-shopping"
          title="Get Premium"
          subtitle="One payment, every feature, free updates for life."
          accent="green"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          <StatChip
            icon="fa-solid fa-tag"
            value={`${price.symbol}${price.amount}`}
            label={price.onSale ? "Sale" : "One time"}
            accent="green"
          />
          <StatChip
            icon="fa-solid fa-code-branch"
            value={PluginInformation.version}
            label="Latest"
            accent="amber"
          />
          <StatChip
            icon="fa-solid fa-cube"
            value={PluginInformation.supportedVersions}
            label="Supported"
            accent="sky"
          />
        </div>

        {spigot.pending && (
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-clock">
              The Spigot listing is not up yet and there is no date for it.
              Until then the Spigot tile opens the developer&apos;s profile,
              where the resource will appear. PayPal and Wise work today and
              the resource is granted by hand once it is up.
            </Note>
          </div>
        )}

        {price.onSale && (
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-bolt">
              {price.saleNote}
            </Note>
          </div>
        )}
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-crown"
          title="What the payment unlocks"
          subtitle="Everything Lite greys out in its own codex, and the five systems it does not run."
          accent="amber"
        />
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PremiumReasons.map((reason) => (
            <Panel key={reason.title} accent={reason.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={reason.icon} accent={reason.accent} />
                <p className="pixel-font text-[8px] tracking-wide text-slate-200 md:text-[10px]">
                  {reason.title}
                </p>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {reason.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-money-bill-wave"
          title="Three ways to pay"
          subtitle="Same price on every one. Spigot hands you the jar instantly; the other two are granted by hand."
          accent="green"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PluginInformation.buyLink.map((buyData, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <Panel
                key={buyData.title}
                accent={accent}
                className="flex h-full flex-col p-5 text-center"
              >
                <h4 className="pixel-font text-[10px] tracking-wider text-slate-200 md:text-xs">
                  {buyData.title}
                </h4>
                <div className="grow py-8">
                  {buyData.icon ? (
                    <i className={`${buyData.icon} text-[3em]`}></i>
                  ) : (
                    <img
                      src={buyData.logo ?? ""}
                      alt={buyData.title}
                      loading="lazy"
                      className="mx-auto w-16"
                    />
                  )}
                </div>
                <p className="pb-1 text-xs text-slate-200">
                  {price.symbol}
                  {price.amount} {price.currency}
                </p>
                <p className="pb-4 text-[10px] text-slate-500 md:text-[11px]">
                  {buyData.title === "Spigot"
                    ? spigot.pending
                      ? "Listing is not up yet"
                      : "Instant, the listing hands you the jar"
                    : "Granted by hand once you email the receipt"}
                </p>
                <PixelButton
                  accent={accent}
                  icon="fa-solid fa-cart-shopping"
                  className="w-full"
                  onClick={() => {
                    trackClick(PROJECTS.FARM_TALES, {
                      action: CLICK_ACTIONS.BUY,
                      label: `BUY VIA ${buyData.title}`,
                      target: buyData.link,
                    });

                    // PayPal and Wise open their own step by step panel rather
                    // than a payment page, and that is still a buy click.
                    return buyData.link
                      ? RedirectTo(buyData.link)
                      : buyData.onClick?.(setSubcontent);
                  }}
                >
                  BUY HERE
                </PixelButton>
              </Panel>
            );
          })}
        </div>

        <div className="pt-6">
          <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
            {payment.spigotAccountRequirement} {payment.exactPaymentNotice}{" "}
            {payment.noDiscountNotice} There are no refunds once Premium is
            bought, which is exactly why the free Lite build exists and why it
            is the same plugin rather than a demo. Run Lite on your own server
            first. The plugin is not available on Aternos.
          </Note>
        </div>

        <Body className="pt-5 text-center text-slate-500">
          Having trouble downloading after paying? Send a direct message rather
          than opening a refund. It will get sorted.
        </Body>
      </Section>
    </div>
  );
}

export default FT_BuyPlugin;
