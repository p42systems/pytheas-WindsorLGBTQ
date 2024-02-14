import { useLocation } from "wouter";
import { useRef } from "react";

import Header from "../General/Header";
import Footer from "../General/Footer";
import TourInstructionsIntro from "./components/TourInstructionsIntro";
import IntroNav from "./components/IntroNav";
import About from "./components/About";
import Statement from "./components/Statement";
import References from "./components/References";

import { MainContainer, BackButton } from "../styled_components";

import { intro } from "../../services/navigation";

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
            intro.backCheck(setLocation);
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
