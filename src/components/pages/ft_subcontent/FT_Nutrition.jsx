import {
  Body,
  Bullet,
  Bullets,
  Chip,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/farm_tales/features";
import * as Screens from "../../../assets/farm_tales/screenshots";
import { NutritionTags } from "../../contants/farm_tales/FTConstants";

/** Nutrition, illness, dishes and cooking: what eating is worth. */
function FT_Nutrition() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-heart-pulse"
          title="Eat well or get ill"
          subtitle="Twelve tags on every item. Eating fills them, time drains them."
          accent="rose"
        />
        <Body className="pt-5 text-justify">
          Every Farm Tales item carries a nutrition profile across twelve tags.
          Eating fills them, time drains them, and a player who lives on one
          thing goes deficient in the others. On Premium, deficiency brings on
          illness in three stages, with effects you choose per stage, and a
          proper meal clears it. On Lite the tags are tracked and shown, and
          nothing makes anybody ill.
        </Body>
        <div className="flex flex-wrap gap-2 pt-4">
          {NutritionTags.map((tag) => (
            <Chip key={tag} accent="rose">
              {tag}
            </Chip>
          ))}
        </div>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.nutrition}
          alt="A player's nutrition readout, the three illness stages, and a dish"
          accent="rose"
          caption="What /ft nutrition prints, the three stages of an illness, and a dish taking the grade of its worst ingredient"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">HOW IT FILLS AND DRAINS</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                Eating a Farm Tales item adds the profile printed on its lore,
                already scaled by the grade it was harvested at. A Spoiled
                carrot is worth a fraction of an Exquisite one.
              </Bullet>
              <Bullet accent="rose">
                Vanilla food pays{" "}
                <Cmd accent="rose">nutrition.vanilla-food-profile</Cmd>, which
                is deliberately not zero. A server where bread counts for
                nothing forces everybody onto the plugin&apos;s food, and that
                should be your decision.
              </Bullet>
              <Bullet accent="rose">
                Decay is a rate, not a timer, charged as elapsed time whenever
                the record is looked at. Time logged out counts too, capped at
                three days by default, so coming back after six months costs
                three days of eating rather than everything.
              </Bullet>
              <Bullet accent="rose">
                A new player starts fed, at{" "}
                <Cmd accent="rose">nutrition.starting-amount</Cmd> on every tag.
                Starting at zero would make the first quarter hour a race
                against an illness they did nothing to earn.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="purple" className="p-5">
            <SubHeading accent="purple">ILLNESS (PREMIUM)</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="purple">
                A nutrient below{" "}
                <Cmd accent="purple">disease.deficiency-threshold</Cmd> for{" "}
                <Cmd accent="purple">disease.onset-seconds</Cmd> starts a
                disease named for that nutrient. Mild, then moderate, then
                severe, on the windows you configure.
              </Bullet>
              <Bullet accent="purple">
                It ends when the nutrient is back above the clear threshold:
                immediately for a mild one, over a taper for a worse one. Only
                one illness runs at a time.
              </Bullet>
              <Bullet accent="purple">
                The debuff is a real vanilla potion effect, and the plugin
                knows which ones are its own. A weakness potion you drank on
                purpose is never touched.
              </Bullet>
              <Bullet accent="purple">
                Only the nutrients in{" "}
                <Cmd accent="purple">disease.tracked-tags</Cmd> can make anybody
                ill. It ships with three of the twelve, and the vanilla food
                profile covers exactly those three, so a player who eats
                nothing but bread never falls ill on default settings.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <Shot
          className="ft-shot"
          src={Screens.proteinDeficiency}
          alt="A nutrition readout with four deficient tags and the illness onset message"
          accent="rose"
          caption="Four tags deficient, and the onset message. The effect shows under a vanilla name in the effect list; the chat line explains it"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="green" className="p-5">
            <SubHeading accent="green">DISHES</SubHeading>
            <Body className="pt-3">
              Two to four Farm Tales ingredients and a bowl in a crafting grid.
              The dish names itself from what went in, sums the nutrition, and
              earns a balance bonus for covering more food groups.
            </Body>
            <Bullets className="pt-3">
              <Bullet accent="green">
                A dish is graded by its worst ingredient. A Prime stew needs
                Prime everything.
              </Bullet>
              <Bullet accent="green">
                A vanilla ingredient refuses the craft rather than shortchanging
                you, and combining never shadows a vanilla recipe.
              </Bullet>
              <Bullet accent="green">
                Smoothies are one fruit, a glass bottle and a snowball. Both
                editions.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">COOKING</SubHeading>
            <Body className="pt-3">
              Cooking keeps a graded item&apos;s identity. A furnace, a smoker
              or a campfire turns graded meat into cooked graded meat at the
              same grade. A furnace refuses to smelt a graded crop into dye
              instead of destroying it.
            </Body>
            <div className="pt-4">
              <Shot
                className="ft-shot"
                src={Screens.craftingDish}
                alt="Eggplant and Good Beef becoming a Good dish"
                accent="amber"
                caption="Eggplant and Good Beef: a Good dish, five food groups, well balanced"
              />
            </div>
          </Panel>
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-terminal">
          <Cmd accent="sky">/ft nutrition &lt;player&gt;</Cmd> prints every
          tag&apos;s level and, on Premium, the illness section.{" "}
          <Cmd accent="sky">feed</Cmd> adds to a tag as eating would,{" "}
          <Cmd accent="sky">set</Cmd> writes a level, <Cmd accent="sky">cure</Cmd>{" "}
          clears every active disease effect. Every one of those numbers is a
          placeholder too: <Cmd accent="sky">%farmtales_nutrition_protein%</Cmd>{" "}
          on a scoreboard works on both editions.
        </Note>
      </Section>
    </div>
  );
}

export default FT_Nutrition;
