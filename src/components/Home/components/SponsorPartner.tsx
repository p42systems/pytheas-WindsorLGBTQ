import { useAtomValue } from "jotai";
import {
  HomeSubHeader,
  HomeParagraph,
  SponsorPartnerContainer,
  SponsorPartnerImg,
} from "../../styled_components";
import { sponsorsCopyQueryAtom } from "../../../atoms";
import BodyParagraphs from "../../General/BodyParagraphs";

function SponsorPartner() {
  const { header, body } = useAtomValue(sponsorsCopyQueryAtom);

  return (
    <>
      <HomeSubHeader id="sponsor-partners">{header}</HomeSubHeader>
      <BodyParagraphs body={body} />
      <SponsorPartnerContainer>
        <SponsorPartnerImg
          large={false}
          src="/logos/p42_logo.png"
          alt="Parallel 42 Systems"
        />
        <SponsorPartnerImg
          large={false}
          src="/logos/hackforge_logo.png"
          alt="Hackforge"
        />
        <SponsorPartnerImg
          large={false}
          src="/logos/wera_logo.png"
          alt="Windsor/Essex Rainbow Alliance"
        />
      </SponsorPartnerContainer>
    </>
  );
}

export default SponsorPartner;
