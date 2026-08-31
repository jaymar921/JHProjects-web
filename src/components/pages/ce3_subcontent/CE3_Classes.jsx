import CE3ClassImg from "../../../assets/custom_enchants_3/ce3_classes.png";
import { classes as CLASS_ART } from "../../../assets/custom_enchants_3/features";
import { SKILL_ICONS } from "../../../assets/custom_enchants_3/textures";
import { PluginInformation } from "../../contants";
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
  StatChip,
  SubHeading,
} from "../../page_components/PixelUIKit";

/** Each class keeps the accent it is drawn with in the feature art. */
const ACCENT_BY_CLASS = ["rose", "lime", "sky"];

function CE3_Classes() {
  const { classes } = PluginInformation;

  return (
    <div className="w-full pb-6">
      <Section>
        <Shot
          src={CLASS_ART}
          alt="The three Custom Enchantments 3 classes and their passive skill paths"
          accent="purple"
          caption="Warrior, Archer and Mage, with the passives each of them unlocks"
        />
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-hat-wizard"
          title="Pick a path"
          accent="purple"
        />
        <div className="mt-6 gap-6 lg:flex">
          <div className="w-full lg:w-1/3">
            <Panel accent="purple" className="p-3">
              <img
                className="mx-auto w-[70%] lg:w-full"
                src={CE3ClassImg}
                alt="Class selection screen inside the skills GUI"
                loading="lazy"
              />
            </Panel>
          </div>
          <div className="w-full pt-6 lg:w-2/3 lg:pt-0">
            <Body className="text-justify">{classes.description}</Body>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatChip
                icon="fa-solid fa-arrow-up-right-dots"
                value="200"
                label="Level cap"
                accent="purple"
              />
              <StatChip
                icon="fa-solid fa-plus"
                value="1 / lvl"
                label="Attribute pt"
                accent="amber"
              />
              <StatChip
                icon="fa-solid fa-star"
                value="1 / 10 lvl"
                label="Passive pt"
                accent="sky"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Panel accent="amber" className="p-5">
          <SubHeading accent="amber">HOW TO ACTIVATE</SubHeading>
          <Bullets className="pt-3">
            <Bullet accent="amber">
              Reach level 10. That is the minimum before the class choice
              appears.
            </Bullet>
            <Bullet accent="amber">
              Open the skills GUI with <Cmd accent="amber">{classes.command}</Cmd> and
              spend your points.
            </Bullet>
            <Bullet accent="amber">
              Your class locks in the moment you spend your first passive point.
            </Bullet>
          </Bullets>
          <div className="pt-4">
            <Note accent="amber" icon="fa-solid fa-flask">
              Changed your mind? The Reset Elixir is sold in the generic shop.
              Drinking it refunds every attribute and passive point while your
              level and XP stay where they are.
            </Note>
          </div>
        </Panel>
      </Section>

      <Section>
        <SectionHeading
          icon="fa-solid fa-people-group"
          title="The three classes"
          subtitle="Every class has one main attribute and three passives, each capped at level 10."
          accent="purple"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {classes.class.map((clazz, index) => {
            const accent = ACCENT_BY_CLASS[index] ?? "purple";
            return (
              <Panel key={clazz.title} accent={accent} className="p-5">
                <div className="flex place-items-center gap-3">
                  {clazz.icon && (
                    <span className="text-lg text-slate-200">
                      <i className={clazz.icon}></i>
                    </span>
                  )}
                  <h4 className="pixel-font text-xs tracking-wider text-slate-200 md:text-sm">
                    {clazz.title.toUpperCase()}
                  </h4>
                </div>

                <Body className="pt-4">{clazz.description}</Body>
                <p className="pt-3 text-[11px] text-slate-500 md:text-xs">
                  {clazz.subdescription}
                </p>

                <div className="pt-5">
                  <SubHeading accent={accent}>MAIN ATTRIBUTE</SubHeading>
                  <div className="flex place-items-center gap-2 pt-2">
                    {SKILL_ICONS[clazz.main_attribute.toUpperCase()] && (
                      <img
                        src={SKILL_ICONS[clazz.main_attribute.toUpperCase()]}
                        alt=""
                        loading="lazy"
                        className="h-5 w-5 [image-rendering:pixelated]"
                      />
                    )}
                    <p className="pixel-font text-[10px] text-slate-200 md:text-xs">
                      {clazz.main_attribute.toUpperCase()}
                    </p>
                  </div>
                  <Bullets className="pt-2">
                    {clazz.attributes.map((attr) => (
                      <Bullet key={attr} accent={accent}>
                        {attr}
                      </Bullet>
                    ))}
                  </Bullets>
                </div>

                <div className="pt-5">
                  <SubHeading accent={accent}>PASSIVE SKILLS</SubHeading>
                  <div className="pt-2">
                    {clazz.skills.map((skill) => (
                      <div
                        key={skill.title}
                        className="flex gap-3 border-l-2 border-slate-700 py-2 pl-3"
                      >
                        {SKILL_ICONS[skill.title] && (
                          <img
                            src={SKILL_ICONS[skill.title]}
                            alt=""
                            loading="lazy"
                            className="mt-0.5 h-6 w-6 shrink-0 [image-rendering:pixelated]"
                          />
                        )}
                        <div>
                          <p className="pixel-font text-[9px] text-slate-200 md:text-[11px]">
                            {skill.title}
                          </p>
                          <p className="pt-1 text-[11px] text-slate-400 md:text-xs">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export default CE3_Classes;
