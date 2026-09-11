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
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/farm_tales/features";
import * as Screens from "../../../assets/farm_tales/screenshots";
import { QualityGrades } from "../../contants/farm_tales/FTConstants";

const GRADE_TEXT = {
  slate: "text-slate-400",
  rose: "text-rose-300",
  green: "text-green-300",
  lime: "text-lime-300",
  sky: "text-sky-300",
  amber: "text-amber-300",
};

/**
 * Crops, water, fertilizer and the grade. Everything a player meets in the
 * first hour, in the order they meet it.
 */
function FT_Crops() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-seedling"
          title="Crops that remember how they were treated"
          subtitle="Plant it, water it, feed it, pick it on time. The grade comes from all four."
          accent="green"
        />
        <Body className="pt-5 text-justify">
          Plant a seed on farmland and it grows on real elapsed time, not
          ticks, so a server that lags grows at the speed you configured. It
          needs water, and there is a Water Spray for that. Fertilizer speeds it
          up in three tiers. Let it dry out and it slows; leave it ripe too long
          and it overripens. At harvest the plugin looks at the whole life of
          that plant and rolls a grade. A crop that was kept properly comes out
          Prime or Exquisite. One that was ignored comes out Spoiled.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.crops}
          alt="A crop's life from seed to ripe, the six grades, and the three plant forms"
          accent="green"
          caption="One plant from seed to ripe, what the plugin watched along the way, and the grade it rolled"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">WATER</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                The <span className="text-sky-300">Water Spray</span> is a
                craftable glass bottle with five charges. Right-click a crop to
                fill its water to full, right-click water or a cauldron to
                refill the spray for free. At zero charges it becomes a glass
                bottle again.
              </Bullet>
              <Bullet accent="sky">
                Water decays on real time. At or below{" "}
                <Cmd accent="sky">water.dry-threshold</Cmd> the crop grows at{" "}
                <Cmd accent="sky">water.dry-growth-multiplier</Cmd>, which can
                be zero to stall it completely.
              </Bullet>
              <Bullet accent="sky">
                Rain and nearby water keep a crop watered without a spray, both
                on by default. Turn either off for a server where tending should
                matter.
              </Bullet>
              <Bullet accent="sky">
                Nothing decays while a chunk is unloaded. A field you walked
                away from is exactly as you left it.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="lime" className="p-5">
            <SubHeading accent="lime">FERTILIZER (PREMIUM)</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="lime">
                Three tiers, basic, rich and prime as shipped. Each is a
                craftable item that speeds a crop up by its multiplier for its
                duration, and biases the quality roll upward.
              </Bullet>
              <Bullet accent="lime">
                Reapplying refreshes rather than stacks. A higher tier replaces
                a lower one, the same tier resets its duration, a lower tier
                over a higher one does nothing and says so.
              </Bullet>
              <Bullet accent="lime">
                Fertilizer on a dry crop works, and the dry penalty still
                applies. The terms multiply. It is a bonus on top of watering,
                not a replacement for it.
              </Bullet>
              <Bullet accent="lime">
                Bone meal on a Farm Tales crop is refused, and it says so.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">THE SIX GRADES</SubHeading>
        <Body className="pt-3 text-justify">
          Three things are measured over the crop&apos;s whole fruiting cycle:
          what fraction of it the crop was watered, what fraction it was under
          fertilizer and how strong that fertilizer was, and how promptly it was
          picked once it ripened. Those become one maintenance score, and the
          score biases the crop&apos;s own quality table rather than replacing
          it: a crop with a naturally poor table stays poor when perfectly kept,
          shifting up its own range instead of jumping to the top. The roll is
          still a roll. Two identically tended carrots are not guaranteed the
          same grade, because a farm where they were would be a spreadsheet.
        </Body>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {QualityGrades.map((grade, index) => (
            <Panel key={grade.name} accent={grade.accent} className="p-3">
              <p
                className={`pixel-font text-[9px] tracking-widest md:text-[11px] ${GRADE_TEXT[grade.accent]}`}
              >
                {index + 1}. {grade.name.toUpperCase()}
              </p>
              <p className="pt-2 text-[10px] leading-relaxed text-slate-400 md:text-xs">
                {grade.note}
              </p>
            </Panel>
          ))}
        </div>
        <div className="pt-4">
          <Note accent="amber" icon="fa-solid fa-star">
            The grade is on the item, in its name, its lore and its data, and
            the nutrition written onto it is already scaled by{" "}
            <Cmd accent="amber">quality.nutrition-multiplier</Cmd>. A Prime
            carrot carries more than a Tough one of the same crop, and the lore
            quotes the real numbers. On Lite the ladder stops at Good.
          </Note>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="green" className="p-5">
            <SubHeading accent="green">THREE PLANT FORMS</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="green">
                <span className="text-green-300">CROP</span>: an ordinary crop
                on farmland, riding a vanilla crop block for its growth stages.
                Most of the vegetables.
              </Bullet>
              <Bullet accent="green">
                <span className="text-green-300">POTTED</span>: a bush in a
                flower pot. Six berries. Harvested over and over without being
                replanted.
              </Bullet>
              <Bullet accent="green">
                <span className="text-green-300">TREE</span>: the plugin builds
                it, trunk and canopy, from one seed. Thirty tree fruits. You
                harvest by breaking a leaf, and the leaf grows straight back.
              </Bullet>
              <Bullet accent="green">
                A tree or a potted plant no longer uproots itself when the
                ground under it changes, and a ripe plant looks ripe from across
                the field.
              </Bullet>
            </Bullets>
          </Panel>

          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">WHERE SEEDS COME FROM</SubHeading>
            <Body className="pt-3">
              Seeds drop from breaking grass, ferns and leaves, at a rate you
              set once per block rather than once per crop, so adding crops
              never makes a grass block rain seeds. Each entry says which blocks
              drop it, and the codex page repeats it. An admin can also hand
              them out:
            </Body>
            <p className="pt-3">
              <Cmd accent="amber">/ft give tomato seed 16</Cmd>
            </p>
            <Body className="pt-3">
              Seeds made before 1.0.0&apos;s planting fix do not plant. Give
              fresh ones. Produce does not plant either, only seeds, and only on
              farmland.
            </Body>
          </Panel>
        </div>
      </Section>

      <Section>
        <Shot
          className="ft-shot"
          src={Screens.cropReady}
          alt="Arugula and broccoli growing beside a river with their status labels"
          accent="green"
          caption="A real field. The label above each crop says how far along it is, how long is left, and its water level"
        />
      </Section>

      <Section>
        <SubHeading accent="green">HOW A CROP IS WRITTEN</SubHeading>
        <Terminal title="FarmTales / catalog / vegetables.yml" className="mt-5">
          <pre>
            <code className="text-[10px] md:text-sm" lang="yaml">
              <TerminalLabel accent="green">[ONE ENTRY, AS SHIPPED]</TerminalLabel>
              {`
tomato:
  kind: VEGETABLE
  lite: true
  display: "Tomato"
  base-item: SWEET_BERRIES
  crop-block: BEETROOTS
  seed-sources: [GRASS, SHORT_GRASS, FERN]
  base-growth-seconds: 1160
  nutrition:
    VITAMIN_C: 3
    ANTIOXIDANT: 3
    POTASSIUM: 1
  quality-weights:
    COMMON: 45
    GOOD: 35
    PRIME: 16
    EXQUISITE: 4

The base item is what it rides on with no pack.
quality-weights is the table the maintenance
score biases. A grade with no weight can never
be rolled, however good the care was.
              `}
            </code>
          </pre>
        </Terminal>
        <div className="pt-4">
          <Note accent="sky" icon="fa-solid fa-magnifying-glass">
            <Cmd accent="sky">/ft store show</Cmd> while looking at a planted
            crop prints the maintenance score, each of the three terms
            separately, and the grade it is heading for. It is the only way to
            see whether your water settings or your grace window is the thing
            that wants tuning.
          </Note>
        </div>
      </Section>
    </div>
  );
}

export default FT_Crops;
