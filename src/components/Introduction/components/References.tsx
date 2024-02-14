import { RefObject } from "react";
import { AboutList, AboutAnchorHeader } from "../../styled_components";
import { useAtomValue } from "jotai";
import { referencesCopyQueryAtom } from "../../../atoms";

function References(props: { referencesRef: RefObject<HTMLHeadingElement> }) {
  const { header, body } = useAtomValue(referencesCopyQueryAtom);

  return (
    <section>
      <AboutAnchorHeader id="references" ref={props.referencesRef}>
        {header}
      </AboutAnchorHeader>
      <AboutList>
        {!body
          ? null
          : body.map((bullet: string, index: number) => {
              return <li key={index}>{bullet}</li>;
            })}
      </AboutList>
    </section>
  );
}

export default References;
