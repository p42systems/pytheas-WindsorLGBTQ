import {
  HomeParagraph,
  MainContainer,
  HomeSubHeader,
  StaticcontentButtonButton,
  StaticheaderBackgroundButton,
  StatictourButtonButton,
} from "./styled_components";
import Header from "./Header";
import Footer from "./Footer";
import NavigationButtons from "./NavigationButtons";
import SponsorPartner from "./SponsorPartner";
import ContentWarning from "./ContentWarning";
import TourInstructionsHome from "./TourInstructionsHome";

function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <NavigationButtons />
        <article>
          <section>
            <ContentWarning />
            <TourInstructionsHome />
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
