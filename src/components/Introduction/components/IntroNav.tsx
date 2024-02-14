import { RefObject } from "react";

import { AboutHeader, GeneralLink } from "../../styled_components";

import { intro } from "../../../services/navigation";

function IntroNav(props: {
  howToRef: RefObject<HTMLHeadingElement>;
  aboutRef: RefObject<HTMLHeadingElement>;
  statementRef: RefObject<HTMLHeadingElement>;
  referencesRef: RefObject<HTMLHeadingElement>;
}) {
  const { howToRef, aboutRef, statementRef, referencesRef } = props;

  return (
    <>
      <AboutHeader>Information about the Tour</AboutHeader>
      <ul>
        <li>
          <GeneralLink
            href="#how-to-take-the-tour"
            onClick={() => {
              intro.clickLink(howToRef);
            }}
          >
            How to Take the Tour
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            href="#about"
            onClick={() => {
              intro.clickLink(aboutRef);
            }}
          >
            About the Site
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            href="#statement"
            onClick={() => {
              intro.clickLink(statementRef);
            }}
          >
            A Statement from Walter Cassidy
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            href="#references"
            onClick={() => {
              intro.clickLink(referencesRef);
            }}
          >
            References
          </GeneralLink>
        </li>
      </ul>
    </>
  );
}

export default IntroNav;
