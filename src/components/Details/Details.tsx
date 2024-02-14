import { useAtomValue } from "jotai";
import { Redirect } from "wouter";

import { MainContainer, SectionContentContainer } from "../styled_components";
import { detailsQueryAtom, markersQueryAtom } from "../../atoms";
import Header from "../General/Header";
import Footer from "../General/Footer";
import Media from "./components/Media/Media";
import DetailDescription from "./components/DetailDescription";
import SmallMap from "./components/SmallMap";
import DetailsSubHeader from "./components/DetailsSubHeader/DetailsSubHeader";

function Details() {
  const detail = useAtomValue(detailsQueryAtom);
  const { markers } = useAtomValue(markersQueryAtom);

  const marker = markers[detail.id];

  if (!marker) {
    return <Redirect to="/notfound" />;
  }

  return (
    <>
      <Header size="short">
        <DetailsSubHeader />
      </Header>
      <MainContainer>
        <SectionContentContainer>
          <Media />

          <DetailDescription />

          <SmallMap />
        </SectionContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Details;
