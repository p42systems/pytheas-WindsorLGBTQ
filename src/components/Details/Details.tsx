import { useAtomValue } from "jotai";
import { icon } from "leaflet";
import "pure-react-carousel/dist/react-carousel.es.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Redirect, useLocation } from "wouter";

import {
  MainContainer,
  SectionContentContainer,
  SmallMapContainer,
  Address,
  HeaderDetails,
  HeaderDetailsH2,
  BackButton,
  DetailsContentContainer,
  DetailCheckboxContainer,
  DetailsPageButtonsContainer,
  DetailsPageBackButtonContainer,
} from "../styled_components";
import CompleteCheckBox from "../CompleteCheckbox";
import {
  detailsQueryAtom,
  getAllMarkerProgressAtom,
  markersQueryAtom,
  baseIconConfigAtom,
} from "../../atoms";
import Header from "../Header";
import Footer from "../Footer";
import ZoomControls from "../ZoomControls";
import { back } from "../../services";
import Media from "./components/Media/Media";

const interactionOptions = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: true,
  touchZoom: false,
  scrollWheelZoom: false,
};

function Details() {
  const [, setLocation] = useLocation();
  const baseIconConfig = useAtomValue(baseIconConfigAtom);
  const markerProgressStates = useAtomValue(getAllMarkerProgressAtom);

  const detail = useAtomValue(detailsQueryAtom);
  const { markers } = useAtomValue(markersQueryAtom);

  const marker = markers[detail.id];

  if (!marker) {
    return <Redirect to="/notfound" />;
  }

  return (
    <>
      <Header size="short">
        <DetailsPageButtonsContainer>
          <DetailsPageBackButtonContainer>
            <BackButton
              title="Back"
              aria-label="Back"
              onClick={() => back(setLocation)}
            >
              Back
            </BackButton>
          </DetailsPageBackButtonContainer>
          <CompleteCheckBox
            id={marker.id}
            markerProgress={markerProgressStates[marker.id] ?? false}
          />
        </DetailsPageButtonsContainer>
        <HeaderDetails>
          <HeaderDetailsH2>{marker.name}</HeaderDetailsH2>
          <Address>{marker.address}</Address>
        </HeaderDetails>
      </Header>
      <MainContainer>
        <SectionContentContainer>
          <DetailCheckboxContainer></DetailCheckboxContainer>

          <Media />

          <DetailsContentContainer>
            {typeof detail.description === "string" ? (
              <p>{detail.description}</p>
            ) : (
              detail.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
            {detail.timeline ? (
              <>
                <hr />
                <h3>{detail.timeline.header}:</h3>
                <ul>
                  {detail.timeline.list.map((listItem, index) => (
                    <li key={index}>{listItem}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </DetailsContentContainer>

          <SmallMapContainer>
            <MapContainer
              center={marker.point}
              style={{ width: "100%", height: "100%" }}
              zoom={16}
              zoomControl={false}
              {...interactionOptions}
            >
              <ZoomControls minZoom={14} maxZoom={18} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={14}
                maxZoom={18}
              />

              <Marker
                position={marker.point}
                key={marker.id}
                icon={icon(baseIconConfig)}
                interactive={false}
              ></Marker>
            </MapContainer>
          </SmallMapContainer>
        </SectionContentContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Details;
