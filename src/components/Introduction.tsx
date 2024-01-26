import { useLocation } from "wouter";
import { useRef } from "react";
import { MainContainer, BackButton } from "./styled_components";
import Header from "./Header";
import Footer from "./Footer";
import TourInstructionsIntro from "./TourInstructionsIntro";
import IntroNav from "./IntroNav";
import { intro } from "../services";
import About from "./About";
import Statement from "./Statement";
import References from "./References";

function Introduction() {
  const [, setLocation] = useLocation();
  const howToRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const referencesRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <Header size="short">
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => {
            intro.back(setLocation);
          }}
        >
          Back
        </BackButton>
      </Header>
      <MainContainer>
        <article>
          <IntroNav
            howToRef={howToRef}
            aboutRef={aboutRef}
            statementRef={statementRef}
            referencesRef={referencesRef}
          />

          <TourInstructionsIntro howToRef={howToRef} />

          <About aboutRef={aboutRef} />

          <Statement statementRef={statementRef} />

          <References referencesRef={referencesRef} />
        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Introduction;
