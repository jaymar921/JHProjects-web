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
} from "../../page_components/PixelUIKit";
import { CLICK_ACTIONS, PROJECTS, trackedRedirect } from "../../../lib/analytics";

const { payment } = PluginInformation;
const paypalPrice =
  Math.round(
    PluginInformation.price * (1 - payment.paypal.discountPercent / 100) * 100,
  ) / 100;

function Field({ label, value, accent = "text-lime-300" }) {
  return (
    <div className="flex flex-wrap gap-2 py-1">
      <span className="w-40 shrink-0 text-[11px] text-slate-500 md:text-xs">
        {label}
      </span>
      <span className={`text-[11px] break-all md:text-xs ${accent}`}>
        {value}
      </span>
    </div>
  );
}

function CE3_BUY_PayPal() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-brands fa-paypal"
          title="Paying through PayPal"
          subtitle="Five steps. Read step three carefully before you send anything."
          accent="sky"
        />
        <div className="pt-5">
          <Note accent="rose" icon="fa-solid fa-triangle-exclamation">
            {payment.spigotAccountRequirement} {payment.exactPaymentNotice}
          </Note>
        </div>
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <Steps>
            <Step n="1" accent="sky">
              Open PayPal using the button below.
              <div className="pt-3">
                <PixelButton
                  accent="sky"
                  icon="fa-brands fa-paypal"
                  onClick={trackedRedirect(PROJECTS.CE3, {
                    action: CLICK_ACTIONS.BUY,
                    label: "OPEN PAYPAL PAYMENT LINK",
                    target: payment.paypal.link,
                  })}
                >
                  OPEN PAYMENT LINK
                </PixelButton>
              </div>
            </Step>

            <Step n="2" accent="sky">
              Choose Send on the PayPal page.
            </Step>

            <Step n="3" accent="sky">
              Fill in the payment details exactly as below.
              <div className="mt-3 border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <Field
                  label="Price"
                  value={`${payment.paypal.currencySymbol}${paypalPrice.toFixed(2)} (${payment.paypal.discountPercent}% discount)`}
                />
                <Field
                  label="What is this for?"
                  value={payment.paymentSubject}
                />
              </div>
              <p className="pt-2 text-[11px] text-rose-300 md:text-xs">
                Check every field before you confirm. Payments cannot be
                reversed.
              </p>
            </Step>

            <Step n="4" accent="sky">
              Pay, then take a screenshot of the receipt.
            </Step>

            <Step n="5" accent="sky">
              Email the details below and wait for confirmation.
              <div className="mt-3 border border-slate-700/70 bg-[rgba(0,0,0,0.45)] p-3">
                <Field label="Recipient" value={payment.contactEmail} />
                <Field label="Subject" value={payment.paymentSubject} />
                <div className="pt-3">
                  <SubHeading accent="sky">BODY</SubHeading>
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

export default CE3_BUY_PayPal;
