import { useAtomValue } from "jotai";
import { icon } from "leaflet";
import ReactPlayer from "react-player";
import {
  Slide,
  Slider
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
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
  DetailsImage,
  DetailsCarousel,
  DetailsCarouselImage,
  CarouselDotGroup,
  CarouselButtonFirst,
  CarouselButtonBack,
  CarouselButtonNext,
  CarouselButtonLast,
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

// Conditional detail.url rendering

const isMultipleImages = (urlObject: {path: string, type: string, imageAlt: string}) => urlObject.type === "image";

let mediaType: string;

let urlVideo: {path: string, type: string, imageAlt: string}[];

let urlImages: {path: string, type: string, imageAlt: string}[];

let mediaPlayer;

function checkMedia(urlArray: {path: string, type: string, imageAlt: string}[]){
  if (!urlArray){
    mediaType = "";
  } else if (urlArray.length === 1 && urlArray[0].type === "video"){
    mediaType = "video";
  } else if (urlArray.every(isMultipleImages)){
    mediaType = "images"
  } else if (urlArray.length > 1 && !urlArray.every(isMultipleImages)){
    mediaType = "mixedMedia";
    urlVideo = urlArray.filter(urlObject => urlObject.type === "video");
    urlImages = urlArray.filter(urlObject => urlObject.type === "image");
  };

  function video(mediaArray: {path: string, type: string, imageAlt: string}[]) { 
    return <>
      {mediaArray.map((video) => (
          <ReactPlayer
          controls={true}
          height={"400px"}
          width={"100%"}
          url={video.path}
          />
      ))}
      </>;
  }

  function images(mediaArray: {path: string, type: string, imageAlt: string}[]) {
    if (mediaArray.length === 1) {
      return <DetailsImage src={mediaArray[0].path} alt={mediaArray[0].imageAlt} />
    } else {
      return <DetailsCarousel
      visibleSlides={2}
      totalSlides={mediaArray.length}
      naturalSlideWidth={300}
      naturalSlideHeight={400}
      isIntrinsicHeight
      >
        <Slider>
          {
            mediaArray.map((image, index) => {
              return (
                <Slide tag="a" index={index} key={index}>
                  <DetailsCarouselImage
                    src={image.path}
                    alt={image.imageAlt}
                    hasMasterSpinner={true}
                  />
                </Slide>
              )
            })
          }
        </Slider>
        {
          mediaArray.length > 2
          ? <>
              <CarouselDotGroup/>
              <CarouselButtonFirst>First</CarouselButtonFirst>
              <CarouselButtonBack>Back</CarouselButtonBack>
              <CarouselButtonNext>Next</CarouselButtonNext>
              <CarouselButtonLast>Last</CarouselButtonLast>
            </>
          : null
        }
      </DetailsCarousel>
    }
  }

  switch (mediaType){
    case "video":
      mediaPlayer = video(urlArray);
      break;
    case "images":
      mediaPlayer = images(urlArray);
      break;
    case "mixedMedia":
      mediaPlayer = <>{video(urlVideo)}{images(urlImages)}</>
      break;
    default:
      break;
  }

};

checkMedia(detail.url);

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

          { mediaPlayer }

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