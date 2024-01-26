import {
  HomeParagraph,
  MainContainer,
  SponsorPartnerContainer,
  SponsorPartnerImg,
  HomeSubHeader,
  StaticcontentButtonButton,
  StaticheaderBackgroundButton,
  StatictourButtonButton,
} from "./styled_components";
import Header from "./Header";
import Footer from "./Footer";
import NavigationButtons from "./NavigationButtons";
import SponsorPartner from "./SponsorPartner";

function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <NavigationButtons />
        <article>
          <section>
            <HomeSubHeader id="content-warning">Content Warning</HomeSubHeader>
            <HomeParagraph>
              The following material contains references to sensitive topics
              including homophobic and transphobic violence, racism, sexual
              assault, murder, and outdated language that could be deemed
              offensive. We acknowledge that these subjects can be distressing
              and triggering for some individuals, especially within the queer
              community. Please exercise caution and prioritize your mental
              well-being while engaging with this content.
            </HomeParagraph>
            <HomeSubHeader id="how-to-take-the-tour">
              How to take the Tour
            </HomeSubHeader>
            <HomeParagraph>
              If you choose to take the tour, please allow yourself{" "}
              <strong>between 2.5-3 hours</strong> to complete the walking tour
              all in one visit. You can start the tour by pressing the{" "}
              <StaticcontentButtonButton>Take Tour</StaticcontentButtonButton>{" "}
              button. You may choose to only do a portion of the tour and come
              back at a later time. The tour will remember which markers you
              have already visited and allow you to begin where you left off.
            </HomeParagraph>
            <HomeParagraph>
              The first stop on the tour is at{" "}
              <strong>first marker location</strong>. From there the map will
              prompt you to the next stop with an orange marker. You may choose
              to visit any marker at any time but the loop we have curated will
              help you visit every stop in an efficient manner. Completed stops
              are noted with green pins and remaining stops are noted with blue
              pins. To mark content as completed, press the{" "}
              <StaticheaderBackgroundButton>
                Mark as completed
              </StaticheaderBackgroundButton>{" "}
              check box on the content page.
            </HomeParagraph>
            <HomeParagraph>
              Not able to walk the tour? All materials are available at any
              time, simply click the{" "}
              <StatictourButtonButton>Content</StatictourButtonButton> button to
              watch at your own pace.
            </HomeParagraph>
          </section>
          <section>
            <SponsorPartner />
          </section>
        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Home;
