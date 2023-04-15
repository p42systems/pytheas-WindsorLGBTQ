import { useAtomValue } from "jotai";
import { icon } from "leaflet";
import ReactPlayer from "react-player";
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
} from "./styled_components";
import CompleteCheckBox from "./CompleteCheckbox";
import {
  detailsQueryAtom,
  getAllMarkerProgressAtom,
  markersQueryAtom,
  baseIconConfigAtom,
} from "./../atoms";
import Header from "./Header";
import Footer from "./Footer";
import ZoomControls from "./ZoomControls";

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
              onClick={() => {
                if (window.history.length > 0) {
                  window.history.back();
                } else {
                  setLocation("/list");
                }
              }}
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
          <ReactPlayer
            controls={true}
            height={"400px"}
            width={"100%"}
            url={detail.url}
          />

          <DetailsContentContainer>
            <p>{detail.description}</p>
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
