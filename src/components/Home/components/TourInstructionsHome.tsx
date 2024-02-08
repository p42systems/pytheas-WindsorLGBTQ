import { useAtomValue } from "jotai";
import { HomeSubHeader } from "../../styled_components";
import { tourInstructionsCopyQueryAtom } from "../../../atoms";
import BodyParagraphs from "../../General/BodyParagraphs";

function TourInstructionsHome() {
  const { header, body, links } = useAtomValue(tourInstructionsCopyQueryAtom);

  return (
    <>
      <HomeSubHeader id="how-to-take-the-tour">{header}</HomeSubHeader>
      <BodyParagraphs body={body} view={"home"} links={links} />
    </>
  );
}

export default TourInstructionsHome;
