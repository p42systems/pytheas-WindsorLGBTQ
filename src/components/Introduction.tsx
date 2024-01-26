import { useLocation } from "wouter";
import { useRef } from "react";
import {
  MainContainer,
  BackButton,
  AboutList,
  AboutAnchorHeader,
} from "./styled_components";
import Header from "./Header";
import Footer from "./Footer";
import TourInstructionsIntro from "./TourInstructionsIntro";
import IntroNav from "./IntroNav";
import { intro } from "../services";
import About from "./About";
import Statement from "./Statement";

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

          <section>
            <AboutAnchorHeader id="references" ref={referencesRef}>
              References
            </AboutAnchorHeader>
            <AboutList>
              <li>
                Voice of the Fugitive (1851, Sandwich-Windsor publication by
                Henry and Mary Bibb)
              </li>
              <li>Cruise Magazine (published by Tony Rome Enterprises)</li>
              <li>Metra Magazine (published by Metra Inc.)</li>
              <li>
                Windsor Star (and various other publications by same publisher)
              </li>
              <li>Detroit Free Press</li>
              <li>Toronto Telegram</li>
              <li>Globe and Mail</li>
              <li>Windsor Gay Unity Newsletter (1974-1979)</li>
              <li>
                International Justice Monthly (1981-1982, published by Jack
                Summer, and edited by E. Leon Bushey)
              </li>
              <li>
                Outspoken (1991-2005, contributions from Barry Adam, Gilles
                Brunet, and Wayne Tennant, and edited by Kenn Stanton)
              </li>
              <li>
                Out and Aging: Our Stories (2010: Windsor Pride Community,
                edited by Barbara Zarzosa)
              </li>
              <li>
                The Body Politic (1971-1987, published by the Toronto-based Pink
                Triangle Press)
              </li>
              <li>
                Information and artifacts were also collected by firsthand
                interviews, collections or correspondences with Jim Monk,
                Lorriane Sayell, Beth Lyster, Harold Desmarias, Robin Sherman,
                Jill Gamble, Julie Fraser, Dr. Kael Sharman, Neil Mens, Paulette
                Kupnicki, Ginny Lundgren, Peter Sonnberg Schmidt, Dennis A.
                Dowker, John Shelhorn, Anna Kovinsky, Jamie Pitts, Caroline
                Carnerie, Dion Carter, Diana Mady Kelly, Diana Flemming Luke
                Maddaford, Joe McParland, Dani Bobb, Julie Leadbetter, Harold
                Desmarais, Wayne Tennant, Barry Adam, Robert Katzman, Colleen
                Gallagher, Nancy Campana, Tom Marchell, Michael Venus, Camil
                Jacques, David M Lyons-Black, Amanda Gellman, Mary Lou Gelissen,
                Marie-France Jean, June Willier, and Steven Lough
              </li>
            </AboutList>
          </section>
        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Introduction;
