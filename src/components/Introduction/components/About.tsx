import { RefObject } from "react";
import { AboutParagraph, AboutAnchorHeader } from "../../styled_components";
import { useAtomValue } from "jotai";
import { aboutCopyQueryAtom } from "../../../atoms";
import BodyParagraphs from "../../General/BodyParagraphs";

function About(props: { aboutRef: RefObject<HTMLHeadingElement> }) {
  const { header, body, links } = useAtomValue(aboutCopyQueryAtom);

  return (
    <section>
      <AboutAnchorHeader id="about" ref={props.aboutRef}>
        {header}
      </AboutAnchorHeader>
      <BodyParagraphs body={body} view={"introduction"} links={links} />
    </section>
  );
}

export default About;
