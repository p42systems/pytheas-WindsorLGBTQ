import { HomeSubHeader, HomeParagraph } from "./styled_components";

function ContentWarning() {
  return (
    <>
      <HomeSubHeader id="content-warning">Content Warning</HomeSubHeader>
      <HomeParagraph>
        The following material contains references to sensitive topics including
        homophobic and transphobic violence, racism, sexual assault, murder, and
        outdated language that could be deemed offensive. We acknowledge that
        these subjects can be distressing and triggering for some individuals,
        especially within the queer community. Please exercise caution and
        prioritize your mental well-being while engaging with this content.
      </HomeParagraph>
    </>
  );
}

export default ContentWarning;
