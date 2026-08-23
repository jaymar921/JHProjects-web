import { RedirectTo } from "../../utils/PageUtility";
import { PluginInformation } from "../../contants";
import {
  Body,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  Step,
  Steps,
  SubHeading,
} from "../../page_components/CE3_UIKit";

const { payment } = PluginInformation;
const wisePrice =
  Math.round(
    PluginInformation.price * (1 - payment.wise.discountPercent / 100) * 100,
  ) / 100;

function Field({ label, value, accent = "text-lime-300" }) {
  return (
    <div className="flex flex-wrap gap-2 py-1">
      <span className="w-40 shrink-0 text-[11px] text-slate-500 md:text-xs">
        {label}
      </span>
      <span className={`break-all text-[11px] md:text-xs ${accent}`}>
        {value}
      </span>
    </div>
  );
}

function CE3_BUY_Wise() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-qrcode"
          title="Paying through Wise"
          subtitle="Pay in GBP, then email your payment proof for confirmation."
          accent="lime"
        />
        <div className="pt-5">
          <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
            {payment.spigotAccountRequirement} {payment.exactPaymentNotice}
          </Note>
        </div>
      </Section>

      <Section>
        <Panel accent="lime" className="p-5">
          <Steps>
            <Step n="1" accent="lime">
              Open Wise using the link below, or scan the payment QR code.
              <div className="flex flex-col items-start gap-4 pt-3 md:flex-row md:items-center">
                <PixelButton
                  accent="lime"
                  icon="fa-solid fa-arrow-up-right-from-square"
                  onClick={() => RedirectTo(payment.wise.link)}
                >
                  OPEN WISE PAYMENT LINK
                </PixelButton>
                <img
                  src={payment.wise.qr}
                  alt="Wise payment QR code"
                  className="w-40 border border-slate-700 bg-white p-2"
                />
              </div>
            </Step>

            <Step n="2" accent="lime">
              Send the exact amount shown below in GBP.
              <div className="mt-3 border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <Field
                  label="Exact amount"
                  value={`${payment.wise.currencySymbol}${wisePrice.toFixed(2)} (${payment.wise.discountPercent}% discount)`}
                />
                <Field
                  label="What is this for?"
                  value={payment.paymentSubject}
                />
              </div>
            </Step>

            <Step n="3" accent="lime">
              Pay, then take a screenshot of the receipt.
            </Step>

            <Step n="4" accent="lime">
              Email the details below and wait for confirmation.
              <div className="mt-3 border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <Field label="Recipient" value={payment.contactEmail} />
                <Field label="Subject" value={payment.paymentSubject} />
                <div className="pt-3">
                  <SubHeading accent="lime">BODY</SubHeading>
                  <div className="pt-2">
                    <Field label="Paid by" value="{ YOUR NAME }" />
                    <Field label="Transaction ID" value="{ TRANSACTION_ID }" />
                    <Field label="Payment date" value="{ DATE OF PAYMENT }" />
                    <Field
                      label="Spigot username"
                      value="{ YOUR_SPIGOT_USERNAME }"
                    />
                    <Field
                      label="Screenshot"
                      value="{ PROOF OF PAYMENT SCREENSHOT }"
                    />
                  </div>
                </div>
              </div>
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <Body className="text-center text-slate-500">
          Confirmations are handled by hand, so give it a little time. If you do
          not hear back, send a direct message and it will get sorted.
        </Body>
      </Section>
    </div>
  );
}

export default CE3_BUY_Wise;
