import {
  Body,
  Bullet,
  Bullets,
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

/** Storage, dry-aging and fermentation. All Premium except smoothies. */
function FT_Storage() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-wine-bottle"
          title="Store it, age it, ferment it"
          subtitle="Time amplifies the grade. It never launders it. Premium."
          accent="purple"
        />
        <Body className="pt-5 text-justify">
          Meat left in an ordinary chest rots on a clock you set. A snowball in
          the chest holds that off. A block of blue ice in the chest turns rot
          into dry-aging, three tiers over twenty days, each worth more than
          the last. Two fruit and a water bottle make a must; two brewing
          grains make a wort. Leave either in a container with sugar and it
          becomes wine or beer, young, then mature, then vintage.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.storage}
          alt="Meat in a chest with nothing, a snowball or blue ice, the dry-aging tiers, and the wine and beer process"
          accent="purple"
          caption="What happens to meat in a chest depending on what is next to it, and how a must or a wort becomes a drink"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="rose" className="p-5">
            <SubHeading accent="rose">MEAT IN A CHEST</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="rose">
                <span className="text-rose-300">Alone</span>, it rots on the
                clock in <Cmd accent="rose">storage:</Cmd>. Rotten meat is a
                different item, and it is not worth eating.
              </Bullet>
              <Bullet accent="rose">
                <span className="text-sky-300">With a snowball</span> in the
                same container, the rot clock is held off.
              </Bullet>
              <Bullet accent="rose">
                <span className="text-sky-300">With a block of blue ice</span>,
                rot becomes dry-aging: 5 days, 10 days, 20 days, each tier
                worth more than the last. The grade stays what the animal
                earned; the age is added to it.
              </Bullet>
              <Bullet accent="rose">
                On Lite nothing rots, nothing is preserved and nothing ages.
                It is the one limit with no in-game surface, which is why{" "}
                <Cmd accent="rose">/ft</Cmd> says it on the boot banner.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="purple" className="p-5">
            <SubHeading accent="purple">WINE AND BEER</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="purple">
                Two fruit and a water bottle make a{" "}
                <span className="text-purple-300">must</span>. Two brewing
                grains make a <span className="text-amber-300">wort</span>.
                Barley, oats, malt and hops are the brewing crops, and{" "}
                <Cmd accent="purple">brewing: true</Cmd> on any catalog entry,
                including your own, makes it brew.
              </Bullet>
              <Bullet accent="purple">
                Leave either in a container with sugar and it ferments through
                three tiers: young, mature, vintage.
              </Bullet>
              <Bullet accent="purple">
                The grade came from the fruit. Time only amplifies it: the
                grade picks which effects you get, the tier picks how strong
                they are. A well-made wine improves with age and a badly made
                one gets worse, and nothing in the config decides which.
              </Bullet>
              <Bullet accent="purple">
                Waiting is not a way to fix bad fruit.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Shot
            className="ft-shot"
            src={Screens.agedBeef}
            alt="Aged 10 Days Good Beef tooltip"
            accent="purple"
            caption="Good Beef, aged ten days with blue ice"
          />
          <Shot
            className="ft-shot"
            src={Screens.rottenBeef}
            alt="Rotten beef tooltip"
            accent="rose"
            caption="The same beef left alone"
          />
          <Shot
            className="ft-shot"
            src={Screens.grillingBeef}
            alt="Graded beef on a campfire"
            accent="amber"
            caption="Cooking keeps the grade"
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Shot
            className="ft-shot"
            src={Screens.wineRecipe}
            alt="The wine process page in the recipe browser"
            accent="purple"
            caption="The wine page in /ft recipes, written from the config"
          />
          <Shot
            className="ft-shot"
            src={Screens.beerRecipe}
            alt="The beer process page in the recipe browser"
            accent="amber"
            caption="The beer page. Two grains, sugar, time"
          />
        </div>
      </Section>

      <Section>
        <Note accent="green" icon="fa-solid fa-blender">
          Smoothies are the one drink in both editions: one fruit, a glass
          bottle and a snowball in a crafting grid. No fermenting, no waiting.
          Every other number on this page lives under{" "}
          <Cmd accent="green">storage:</Cmd> and{" "}
          <Cmd accent="green">fermentation:</Cmd> in config.yml, and the
          release notes say plainly that they are a first guess.
        </Note>
      </Section>
    </div>
  );
}

export default FT_Storage;
