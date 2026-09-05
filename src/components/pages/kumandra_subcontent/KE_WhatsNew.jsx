import { PluginInformation } from "../../contants/kumandra/KumandraConstants";
import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  IconBadge,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

/**
 * The 2.1 panel. This is the one people open first after an update notice, so
 * it leads with how small the release is and who it is for. 2.0 was the one
 * with a bug at the root of everything; this one is additive, and saying so
 * plainly is worth more than dressing it up.
 */
function KE_WhatsNew() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-rocket"
          title="Version 2.1"
          subtitle={`Released ${PluginInformation.versionReleaseDate}. The Custom Enchantments 3 release.`}
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          A smaller one than 2.0. If you run Custom Enchantments 3 as well, CE3
          1.6.0 already talks to Kumandra&apos;s Economy 2.0 and works. Nothing
          in this update is a repair of that. What 2.1 does is finish the job
          from this side: the balance screen shows both of your currencies, you
          can convert between them without leaving the command you already use,
          and money that another plugin takes out of your wallet now says which
          plugin took it.
        </Body>
        <div className="pt-5">
          <Note accent="amber" icon="fa-solid fa-circle-info">
            If you do not run Custom Enchantments 3, none of this affects you,
            except the transaction list, which works on its own.
          </Note>
        </div>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.whatsnew}
          alt="What version 2.1 of Kumandra's Economy added, and what it left untouched"
          accent="rose"
          caption="Everything the release adds, and everything it deliberately does not touch"
        />
      </Section>

      <Section>
        <SubHeading accent="emerald">EVERYTHING THAT CHANGED</SubHeading>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {PluginInformation.whatsNew.map((item) => (
            <Panel key={item.title} accent={item.accent} className="p-4">
              <div className="flex place-items-center gap-3">
                <IconBadge icon={item.icon} accent={item.accent} />
                <SubHeading accent={item.accent}>
                  {item.title.toUpperCase()}
                </SubHeading>
              </div>
              <p className="pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                {item.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <Panel accent="teal" className="p-5">
          <SubHeading accent="teal">UPGRADING</SubHeading>
          <Steps className="pt-3">
            <Step n="1" accent="teal">
              Drop the new jar in. That is the whole procedure: there is no
              config change and no data migration.
            </Step>
            <Step n="2" accent="teal">
              Your <Cmd accent="teal">lang.yml</Cmd> is fine as it is. The new
              lines fall back to English if your file does not have the new
              keys, so nothing renders as the word null. Add them if you
              translate.
            </Step>
            <Step n="3" accent="teal">
              Every method from 1.x and 2.0 keeps its exact signature and return
              values, so code compiled against either links against 2.1
              unchanged.
            </Step>
          </Steps>
        </Panel>
      </Section>

      <Section>
        <SubHeading accent="sky">STILL TRUE FROM 2.0</SubHeading>
        <Body className="pt-3 text-justify">
          2.0 was the release that fixed the version check at the root of
          everything. If you are coming from 1.7 rather than 2.0, that is the
          one that matters to you, and the release history has the whole list.
        </Body>
        <Bullets className="pt-3">
          <Bullet accent="sky">
            One jar for Spigot and Paper, {PluginInformation.supportedVersions},
            on Java 8 and up.
          </Bullet>
          <Bullet accent="sky">
            Vault is optional. Without it everything works except cross-economy
            exchange, which needs a second economy anyway.
          </Bullet>
          <Bullet accent="sky">
            Quests, nether logs for the Lumberjack and the Fisherman&apos;s rare
            catches all came back on for servers newer than 1.18.
          </Bullet>
        </Bullets>
      </Section>
    </div>
  );
}

export default KE_WhatsNew;
