import { RedirectTo } from "../utils/PageUtility";
import { PluginInformation } from "../contants";
import {
  Body,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  StatChip,
} from "./CE3_UIKit";

const ACCENTS = ["lime", "sky"];
const { payment } = PluginInformation;
const paypalPrice =
  Math.round(
    PluginInformation.price * (1 - payment.paypal.discountPercent / 100) * 100,
  ) / 100;
const wisePrice =
  Math.round(
    PluginInformation.price * (1 - payment.wise.discountPercent / 100) * 100,
  ) / 100;

function CE3_BuyPlugin({ setSubcontent }) {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-cart-shopping"
          title="Get the premium plugin"
          subtitle="One payment, every feature, free updates for life."
          accent="lime"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          <StatChip
            icon="fa-solid fa-tag"
            value={`${PluginInformation.currency_symbol}${PluginInformation.price}`}
            label="One time"
            accent="lime"
          />
          <StatChip
            icon="fa-solid fa-code-branch"
            value={`v${PluginInformation.version}`}
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

        <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                {buyData.title === "Spigot" && (
                  <p className="pb-4 text-xs text-lime-300">
                    {PluginInformation.currency_symbol}
                    {PluginInformation.price.toFixed(2)}
                  </p>
                )}
                {buyData.title === "PayPal" && (
                  <p className="pb-4 text-xs text-sky-300">
                    {payment.paypal.currencySymbol}
                    {paypalPrice.toFixed(2)} ({payment.paypal.discountPercent}%
                    off)
                  </p>
                )}
                {buyData.title === "Wise" && (
                  <p className="pb-4 text-xs text-lime-300">
                    {payment.wise.currencySymbol}
                    {wisePrice.toFixed(2)} ({payment.wise.discountPercent}% off)
                  </p>
                )}
                <PixelButton
                  accent={accent}
                  icon="fa-solid fa-cart-shopping"
                  className="w-full"
                  onClick={() =>
                    buyData.link
                      ? RedirectTo(buyData.link)
                      : buyData.onClick?.(setSubcontent)
                  }
                >
                  BUY HERE
                </PixelButton>
              </Panel>
            );
          })}
        </div>

        <div className="pt-6">
          <Note accent="amber" icon="fa-solid fa-triangle-exclamation">
            {payment.spigotAccountRequirement} {payment.exactPaymentNotice}
            There are no refunds once the plugin is bought, so please try the
            free lite build first. Note that the premium version does not run on
            Aternos. You will need a dedicated server to use everything it does.
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

export default CE3_BuyPlugin;
