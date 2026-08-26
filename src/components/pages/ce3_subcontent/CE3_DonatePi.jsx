import { useState } from "react";
import PiDonate from "../../../assets/custom_enchants_3/pi_donate.jpeg";
import {
  Body,
  Note,
  Panel,
  PixelButton,
  Section,
  SectionHeading,
  SubHeading,
} from "../../page_components/PixelUIKit";

function CE3_DonatePi({ setSubcontent }) {
  const wallet = import.meta.env.VITE_PI_WALLET_ADDRESS ?? "";
  const [copied, setCopied] = useState(false);

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-hand-holding-heart"
          title="Donate with Pi"
          subtitle="Send to the wallet address below, or scan the code with your Pi app."
          accent="purple"
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-xl">
          <Panel accent="purple" className="p-5">
            <SubHeading accent="purple">WALLET ADDRESS</SubHeading>
            {wallet ? (
              <>
                <p className="mt-3 border border-slate-700 bg-[rgba(0,0,0,0.5)] p-3 text-[11px] break-all text-slate-300 md:text-xs">
                  {wallet}
                </p>
                <div className="pt-4">
                  <PixelButton
                    accent="purple"
                    icon={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}
                    onClick={copyWallet}
                  >
                    {copied ? "COPIED" : "COPY ADDRESS"}
                  </PixelButton>
                </div>
              </>
            ) : (
              <div className="pt-3">
                <Note accent="amber" icon="fa-solid fa-circle-info">
                  No wallet address is configured on this build of the site.
                  Please use one of the other donation options instead.
                </Note>
              </div>
            )}

            <div className="pt-6">
              <img
                className="mx-auto w-full max-w-[280px] border border-slate-700/70"
                src={PiDonate}
                alt="Pi Network donation QR code"
                loading="lazy"
              />
            </div>
          </Panel>

          <Body className="pt-5 text-center text-slate-500">
            Donations are a thank you, not a purchase. They do not unlock the
            premium plugin.
          </Body>

          <div className="pt-5 text-center">
            <PixelButton
              accent="lime"
              icon="fa-solid fa-arrow-left"
              onClick={() => setSubcontent("support")}
            >
              BACK TO SUPPORT
            </PixelButton>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default CE3_DonatePi;
