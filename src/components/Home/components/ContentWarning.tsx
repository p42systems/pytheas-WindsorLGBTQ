import { useAtomValue } from "jotai";
import { contentWarningCopyQueryAtom } from "../../../atoms";
import { HomeSubHeader } from "../../styled_components";
import BodyParagraphs from "../../General/BodyParagraphs";

function ContentWarning() {
  const { header, body, links } = useAtomValue(contentWarningCopyQueryAtom);

  return (
    <>
      <HomeSubHeader id="content-warning">{header}</HomeSubHeader>
      <BodyParagraphs body={body} view={"home"} links={links} />
    </>
  );
}

export default ContentWarning;
