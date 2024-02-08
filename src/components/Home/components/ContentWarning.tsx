import { useAtomValue } from "jotai";
import { contentWarningCopyQueryAtom } from "../../../atoms";
import { HomeSubHeader, HomeParagraph } from "../../styled_components";

function ContentWarning() {
  const { header, body } = useAtomValue(contentWarningCopyQueryAtom);

  return (
    <>
      <HomeSubHeader id="content-warning">{header}</HomeSubHeader>
      <HomeParagraph>{body}</HomeParagraph>
    </>
  );
}

export default ContentWarning;
