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

const ANIMALS = [
  { name: "Cow", meat: "Beef", lite: true },
  { name: "Chicken", meat: "Chicken", lite: true },
  { name: "Pig", meat: "Porkchop", lite: false },
  { name: "Sheep", meat: "Mutton", lite: false },
  { name: "Rabbit", meat: "Rabbit", lite: false },
];

/** Animal husbandry: five animals, six grades, thirty meat entries. */
function FT_Animals() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-cow"
          title="Animals worth keeping"
          subtitle="Tracked from the moment you feed one. Feed it well and on time and its meat grades up."
          accent="amber"
        />
        <Body className="pt-5 text-justify">
          Cows, pigs, sheep, chickens and rabbits are tracked from the first
          feeding. What they are fed, how often, and how long they go hungry
          decides the grade of the meat they drop. Five animals, six grades,
          thirty meat entries, each with its own sprite, and a Fire Aspect kill
          drops it cooked at the same grade. Wool, leather, feathers and eggs
          are untouched.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.animals}
          alt="The five animals, what decides their grade, and the six grades per animal"
          accent="amber"
          caption="Five animals, three things that move the grade, and the six grades each one can drop"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="amber" className="p-5">
            <SubHeading accent="amber">THE FIVE</SubHeading>
            <table className="mt-3 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pixel-font py-2 text-[8px] tracking-wider text-slate-300 md:text-[9px]">
                    Animal
                  </th>
                  <th className="pixel-font py-2 text-[8px] tracking-wider text-slate-300 md:text-[9px]">
                    Drops
                  </th>
                  <th className="pixel-font py-2 text-center text-[8px] tracking-wider text-emerald-300 md:text-[9px]">
                    Lite
                  </th>
                </tr>
              </thead>
              <tbody>
                {ANIMALS.map((animal) => (
                  <tr key={animal.name} className="border-b border-slate-800">
                    <td className="py-2 text-[11px] text-slate-300 md:text-xs">
                      {animal.name}
                    </td>
                    <td className="py-2 text-[11px] text-slate-400 md:text-xs">
                      {animal.meat}, six grades
                    </td>
                    <td className="py-2 text-center">
                      {animal.lite ? (
                        <i className="fa-solid fa-circle-check text-xs text-emerald-400"></i>
                      ) : (
                        <i className="fa-solid fa-minus text-xs text-slate-600"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pt-3 text-[10px] leading-relaxed text-slate-500 md:text-xs">
              On Lite a pig, sheep or rabbit drops vanilla meat, and cow and
              chicken grade to Common or Good. An untracked wild animal drops
              graded meat too, at Common, on both editions.
            </p>
          </Panel>

          <Panel accent="green" className="p-5">
            <SubHeading accent="green">WHAT DECIDES THE GRADE</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="green">
                <span className="text-green-300">What it was fed.</span> The
                crafted Animal Feed, made from what you grew, counts for more
                than a handful of wheat. The feed quality is on its lore.
              </Bullet>
              <Bullet accent="green">
                <span className="text-green-300">How often.</span> Feeding on
                time keeps the score up. The Herder&apos;s Shears make each
                feeding count for more.
              </Bullet>
              <Bullet accent="green">
                <span className="text-green-300">How long it went hungry.</span>{" "}
                Neglect it and it grades down. The three things measure
                different behaviour and all three are weighted in{" "}
                <Cmd accent="green">config.yml</Cmd> under{" "}
                <Cmd accent="green">meat:</Cmd>.
              </Bullet>
              <Bullet accent="green">
                The grade is a property of the animal, not of who killed it.
                Somebody else&apos;s cow that you slaughter drops what they
                earned.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Shot
            className="ft-shot"
            src={Screens.goodBeef}
            alt="A Good Beef item tooltip"
            accent="amber"
            caption="Good Beef from a tracked cow: grade colour, tier name, and the nutrition the grade scaled"
          />
          <Shot
            className="ft-shot"
            src={Screens.animalFeed}
            alt="The Animal Feed item tooltip"
            accent="lime"
            caption="Animal Feed, crafted from produce, with its feed quality on the lore"
          />
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-terminal">
          <Cmd accent="sky">/ft store animals</Cmd> lists every tracked animal
          in the world: what it is, its feed score, whether the entity is
          present, and the grade it is heading for. A record whose animal
          cannot be found anywhere and whose last sighting is older than{" "}
          <Cmd accent="sky">persistence.entity-record-max-age-hours</Cmd> is
          swept, so a herd that was slaughtered does not haunt the save file.
        </Note>
      </Section>
    </div>
  );
}

export default FT_Animals;
