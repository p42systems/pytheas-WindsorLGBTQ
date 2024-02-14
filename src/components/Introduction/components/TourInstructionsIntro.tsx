import { RefObject } from "react";
import { AboutAnchorHeader } from "../../styled_components";
import { useAtomValue } from "jotai";
import { tourInstructionsCopyQueryAtom } from "../../../atoms";
import BodyParagraphs from "../../General/BodyParagraphs";

function TourInstructionsIntro(props: {
  howToRef: RefObject<HTMLHeadingElement>;
}) {
  const { header, body, links } = useAtomValue(tourInstructionsCopyQueryAtom);

  return (
    <section>
      <AboutAnchorHeader id="how-to-take-the-tour" ref={props.howToRef}>
        {header}
      </AboutAnchorHeader>
      <BodyParagraphs body={body} view={"introduction"} links={links} />
    </section>
  );
}

export default TourInstructionsIntro;
