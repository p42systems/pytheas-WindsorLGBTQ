import { useLocation } from "wouter";

import {
  ListParagraph,
  StaticheaderBackgroundButton,
  BackButton,
  ListMainContainer,
} from "../styled_components";
import Header from "../General/Header";
import Footer from "../General/Footer";
import MarkerList from "./components/MarkerList";
import { back } from "../../services/navigation";

function Content() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Header>
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => back(setLocation)}
        >
          Back
        </BackButton>
      </Header>
      <ListMainContainer>
        <ListParagraph>
          Welcome to the content page. To view the content, click the{" "}
          <StaticheaderBackgroundButton>View</StaticheaderBackgroundButton>
          button. If you are near the site and would like to participate in the
          walking tour, click the{" "}
          <StaticheaderBackgroundButton>Take Tour</StaticheaderBackgroundButton>
          button and it will instruct you as to where to start.
        </ListParagraph>
        <MarkerList />
      </ListMainContainer>
      <Footer />
    </>
  );
}

export default Content;
