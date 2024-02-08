import { RefObject } from "react";
import { AboutAnchorHeader } from "../../styled_components";
import { statementCopyQueryAtom } from "../../../atoms";
import { useAtomValue } from "jotai";
import BodyParagraphs from "../../General/BodyParagraphs";

function Statement(props: { statementRef: RefObject<HTMLHeadingElement> }) {
  const { header, body, links } = useAtomValue(statementCopyQueryAtom);

  return (
    <section>
      <AboutAnchorHeader id="statement" ref={props.statementRef}>
        {header}
      </AboutAnchorHeader>
      <BodyParagraphs body={body} view={"introduction"} links={links} />
    </section>
  );
}

export default Statement;
