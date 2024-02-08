import { useAtomValue } from "jotai";
import { contentWarningCopyQueryAtom } from "../../../atoms";
import { HomeSubHeader } from "../../styled_components";
import BodyParagraphs from "../../General/BodyParagraphs";

function ContentWarning() {
  const { header, body } = useAtomValue(contentWarningCopyQueryAtom);

  return (
    <>
      <HomeSubHeader id="content-warning">{header}</HomeSubHeader>
      <BodyParagraphs body={body} />
    </>
  );
}

export default ContentWarning;
