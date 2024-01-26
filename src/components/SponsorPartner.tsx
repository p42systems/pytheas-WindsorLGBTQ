import {
  HomeSubHeader,
  HomeParagraph,
  SponsorPartnerContainer,
  SponsorPartnerImg,
} from "./styled_components";

function SponsorPartner() {
  return (
    <>
      <HomeSubHeader id="sponsor-partners">
        Sponsors &amp; Partners
      </HomeSubHeader>
      <HomeParagraph>
        Tour content by Walter Cassidy of the Windsor/Essex Rainbow Alliance.
        Code by Parallel 42 Systems. Support for this project was provided by
        Windsor Hackforge.
      </HomeParagraph>
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
