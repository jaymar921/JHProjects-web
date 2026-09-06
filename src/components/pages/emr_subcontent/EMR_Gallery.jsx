import { Screenshots } from "../../contants/epic_mobs_rework/EMRConstants";
import {
  Body,
  Note,
  Section,
  SectionHeading,
  Shot,
  SubHeading,
} from "../../page_components/PixelUIKit";

/**
 * Every real screenshot, in one window.
 *
 * The page keeps the three wide ones, because a plugin page with no picture of
 * the plugin running is a page nobody believes. The menus are here instead:
 * there are a lot of them, they are small, and a grid of nine inventory
 * windows is a long scroll past the thing somebody actually came for.
 */
function EMR_Gallery() {
  const wide = Screenshots.filter((shot) => shot.wide);
  const menus = Screenshots.filter((shot) => !shot.wide);

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-camera"
          title="What it looks like running"
          subtitle="Photographs, not art. Taken on a server running 1.0-RC1."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          Everything else illustrating this page is drawn, including the
          trailer. These are not. They are copied out of the plugin repository
          at the size they were taken, and the menus are small because a
          Minecraft inventory is small: they are shown at their natural size
          against a dark panel rather than stretched, because upscaling a
          nearest-neighbour texture to fill a card is how a screenshot ends up
          looking like a mistake.
        </Body>
      </Section>

      <Section>
        <SubHeading accent="ember">IN THE WORLD</SubHeading>
        <div className="mt-5 grid gap-6">
          {wide.map((shot) => (
            <div key={shot.key}>
              <p className="pixel-font pb-3 text-[9px] tracking-widest text-slate-300 md:text-[11px]">
                <i className="fa-solid fa-angle-right pr-2 text-orange-400"></i>
                {shot.title}
              </p>
              <Shot
                className="emr-shot"
                src={shot.src}
                alt={shot.caption}
                accent={shot.accent}
                caption={shot.caption}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SubHeading accent="amber">THE MENUS BEHIND THEM</SubHeading>
        <Body className="pt-3 text-justify">
          Every one of these is a real inventory window. Nothing here is a
          mock-up and nothing is scaled up to fill a card.
        </Body>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {menus.map((shot) => (
            <div key={shot.key}>
              <p className="pixel-font pb-2 text-[8px] tracking-widest text-slate-300 md:text-[10px]">
                <i className="fa-solid fa-angle-right pr-2 text-orange-400"></i>
                {shot.title}
              </p>
              <Shot
                className="emr-shot"
                src={shot.src}
                alt={shot.caption}
                accent={shot.accent}
                caption={shot.caption}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-circle-info">
          These are replaced whenever the menus change, from the same folder in
          the plugin repository they are taken in. A screenshot on this page is
          never redrawn to look better than the build it came from.
        </Note>
      </Section>
    </div>
  );
}

export default EMR_Gallery;
