import { RedirectTo } from "../../utils/PageUtility";
import { PluginInformation } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  StatChip,
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackClick } from "../../../lib/analytics";

/**
 * The panel behind the FULL card: three ways to pay the same number.
 *
 * Custom Enchantments 3 prints a percentage off on its PayPal and Wise tiles.
 * This prints the same price on all three, because the pre-release price is
 * the discount and stacking another one on top of it would take the same jar
 * below what it costs to keep supporting.
 */
const ACCENTS = ["ember", "sky", "lime"];
const { payment, price } = PluginInformation;

function EMR_BuyPlugin({ setSubcontent }) {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-cart-shopping"
          title="Get the full build"
          subtitle="One payment, every feature, free updates for life."
          accent="ember"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          <StatChip
            icon="fa-solid fa-tag"
            value={`${price.symbol}${price.amount}`}
            label={price.onSale ? "Pre-release" : "One time"}
            accent="ember"
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

        {price.onSale && (
          <div className="pt-5">
            <Note accent="amber" icon="fa-solid fa-bolt">
              {price.saleNote}
            </Note>
          </div>
        )}

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
                    ? "Instant, the listing hands you the jar"
                    : "Granted by hand once you email the receipt"}
                </p>
                <PixelButton
                  accent={accent}
                  icon="fa-solid fa-cart-shopping"
                  className="w-full"
                  onClick={() => {
                    trackClick(PROJECTS.EPIC_MOBS_REWORK, {
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
            {payment.noDiscountNotice} There are no refunds once the full build
            is bought, which is exactly why the free Lite build exists and why
            it is a complete plugin rather than a demo. Run Lite on your own
            server first.
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

export default EMR_BuyPlugin;
