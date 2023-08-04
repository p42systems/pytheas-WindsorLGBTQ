import { useLocation } from "wouter";
import { useRef } from "react";
import {
  MainContainer,
  BackButton,
  AboutParagraph,
  AboutList,
  AboutHeader,
  AboutAnchorHeader,
  StatictourButtonButton,
  StaticcontentButtonButton,
  StaticheaderBackgroundButton,
  GeneralLink,
} from "./styled_components";
import { scrollIntoView } from "../services";
import Header from "./Header";
import Footer from "./Footer";

function Introduction() {
  const [, setLocation] = useLocation();
  const howToRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const referencesRef = useRef<HTMLHeadingElement>(null);
  let relLinkCount = 0;

  return (
    <>
      <Header size="short">
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => {
            if (window.history.length > 0) {
              if (relLinkCount) {
                window.history.go(-relLinkCount - 1);
              } else {
                window.history.back();
              }
            } else {
              setLocation("/");
            }
          }}
        >
          Back
        </BackButton>
      </Header>
      <MainContainer>
        <article>
          <AboutHeader>Information about the Tour</AboutHeader>
          <ul>
            <li>
              <GeneralLink href="#how-to-take-the-tour" onClick={() => {relLinkCount++; scrollIntoView(howToRef)}}>
                How to Take the Tour
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#about" onClick={() => {relLinkCount++; scrollIntoView(aboutRef)}}>
                About the Site
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#statement" onClick={() => {relLinkCount++; scrollIntoView(statementRef)}}>
                A Statement from Walter Cassidy
              </GeneralLink>
            </li>
            <li>
              <GeneralLink href="#references" onClick={() => {relLinkCount++; scrollIntoView(referencesRef)}}>
                References
              </GeneralLink>
            </li>
          </ul>

          <section>
            <AboutAnchorHeader id="how-to-take-the-tour" ref={howToRef}>
              How to Take the Tour
            </AboutAnchorHeader>
            <AboutParagraph>
              If you choose to take the tour, please allow yourself{" "}
              <strong>between 2.5-3 hours</strong> to complete the walking tour
              all in one visit. You can start the tour by pressing the{" "}
              <StaticcontentButtonButton>Take Tour</StaticcontentButtonButton> button. You
              may choose to only do a portion of the tour and come back at a
              later time. The tour will remember which markers you have already
              visited and allow you to begin where you left off.
            </AboutParagraph>
            <AboutParagraph>
              The first stop on the tour is at{" "}
              <strong>
                first marker location 
              </strong>
              . From there the map will prompt you to the next stop with an
              orange marker. You may choose to visit any marker at any time but
              the loop we have curated will help you visit every stop in an
              efficient manner. Completed stops are noted with green pins and
              remaining stops are noted with blue pins. To mark content as
              completed, press the{" "}
              <StaticheaderBackgroundButton>Mark as completed</StaticheaderBackgroundButton>{" "}
              check box on the content page.
            </AboutParagraph>
            <AboutParagraph>
              Not able to walk the tour? All materials are available at any
              time, simply click the{" "}
              <StatictourButtonButton>Content</StatictourButtonButton> button to
              watch at your own pace.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="about" ref={aboutRef}>
              About the Site
            </AboutAnchorHeader>
            <AboutParagraph>
            The historical research and organizing impetus for this tour was provided by Walter Cassidy of the Windsor Essex Rainbow Alliance (WERA). The tour app was built using the Pytheas project. This open-source code was provided to the community by Parallel 42 Systems based on their work with the McDougall Corridor tour app, built in partnership with the Essex County Black Historical Research Society, the Windsor Law Centre for Cities, the School of Creative Arts (SOCA), and Leddy Library, with funding provided by Canada's federal government through the Canadian Urban Institute.<br/><br/>
            The work of implementing Queer Walk was performed by Dana Teagle, Haley Tibbitts, and Zhenia Tomé, with funding and support from Parallel 42 Systems and Windsor Hackforge.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="statement" ref={statementRef}>
              A Statement from Walter Cassidy
            </AboutAnchorHeader>
            <AboutParagraph>
              The key to this walking tour is basic. It is about local visibility of the 2SLGBTQAI community. Unfortunately, much of that visibility has been erased for various reasons. Some of those reasons are as simple as the suppression of our identities, the lack of interest in who we are, overall hate or ignorance, and our own lack of seeing the importance of our stories and struggles.<br/><br/>
              When creating the tour, some of the examples were difficult to prove if they “really” were queer, trans, or gender non-conforming references, especially before the 1960s. I included them anyways because one could argue either way if the experience was queer, trans, or gender non-conforming.<br/><br/>
              I must acknowledge the hard work and dedication of the Windsor Essex Rainbow Alliance (WERA). WERA is a group of individuals whose goals are to institute a method of collecting, preserving, and disseminating the local history of the 2SLGBTQIA+ community and to establish a permanent public monument that will showcase the struggles, achievements, and celebrations of the local 2SLGBTQIA+ community for all in Windsor/Essex and beyond to visit, learn from, and enjoy. There are still so many voices, stories, and places that have not been told and could be lost forever. It is my goal to help change that reality.<br/><br/>
              If you have any materials (newsletters, pictures, posters, buttons, shirts, etc.) you would like to have preserved or if you find any information that is not included in this tour and would like to make a request for an update or something changed, please contact me <a href="mailto:wequeerhistory@mdirect.net">by email</a>.
            </AboutParagraph>
          </section>

          <section>
            <AboutAnchorHeader id="references" ref={referencesRef}>
              References
            </AboutAnchorHeader>
            <AboutList>
                <li>Voice of the Fugitive (1851, Sandwich-Windsor publication by Henry and Mary Bibb)</li>
                <li>Cruise Magazine (published by Tony Rome Enterprises)</li>
                <li>Metra Magazine (published by Metra Inc.)</li>
                <li>Windsor Star (and various other publications by same publisher)</li>
                <li>Detroit Free Press</li>
                <li>Toronto Telegram</li>
                <li>Globe and Mail</li>
                <li>Windsor Gay Unity Newsletter (1974-1979)</li>
                <li>International Justice Monthly (1981-1982, published by Jack Summer, and edited by E. Leon Bushey)</li>
                <li>Outspoken (1991-2005, contributions from Barry Adam, Gilles Brunet, and Wayne Tennant, and edited by Kenn Stanton)</li>
                <li>Out and Aging: Our Stories (2010: Windsor Pride Community, edited by Barbara Zarzosa)</li>
                <li>The Body Politic (1971-1987, published by the Toronto-based Pink Triangle Press)</li>
                <li>Information and artifacts were also collected by firsthand interviews, collections or correspondences with Jim Monk, Lorriane Sayell, Beth Lyster, Harold Desmarias, Robin Sherman, Jill Gamble, Julie Fraser, Dr. Kael Sharman, Neil Mens, Paulette Kupnicki, Ginny Lundgren, Peter Sonnberg Schmidt, Dennis A. Dowker, John Shelhorn, Anna Kovinsky, Jamie Pitts, Caroline Carnerie, Dion Carter, Diana Mady Kelly, Diana Flemming Luke Maddaford, Joe McParland, Dani Bobb, Julie Leadbetter, Harold Desmarais, Wayne Tennant, Barry Adam, Robert Katzman, Colleen Gallagher, Nancy Campana, Tom Marchell, Michael Venus, Camil Jacques, David M Lyons-Black, Amanda Gellman, Mary Lou Gelissen, Marie-France Jean, June Willier, and Steven Lough</li>
            </AboutList>
          </section>

        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Introduction;
