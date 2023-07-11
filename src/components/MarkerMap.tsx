import { MapContainer, Marker, Pane, TileLayer } from "react-leaflet";
import { useAtomValue, useSetAtom } from "jotai";
import { icon, LatLngBounds } from "leaflet";
import { useLocation } from "wouter";
import type { Icon, DivIcon } from "leaflet";

import {
  getAllMarkerProgressAtom,
  baseIconConfigAtom,
  selectedIconConfigAtom,
  completedIconConfigAtom,
  suggestedIconConfigAtom,
  setMapAtom,
  mapValueAtom,
  sendSaveUserLocationAtom,
  tourStateAtom,
  updateSelectedMarkerAtom,
  setTourToStartedAtom,
  setDetailsMarkerIdAtom,
  markersQueryAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
  navigateToMarkerAtom,
  getEnableDirectionsAtom,
  loadableDirectionQueryAtom,
  refetchDirectionQueryAtom,
  paddedBoundingBoxAtom,
  getSavedUserLocationAtom
} from "./../atoms";
import {
  MapAppicationContainer,
  MapOverlayContainer,
  MarkerButton,
  MarkerCardText,
  MarkerCardState,
  SectionContentContainer,
  MapOverlay,
  MarkerCardHeader,
  MarkerCardAddress,
  MarkerNavigation,
  MarkerButtonContainer,
  MarkerCardTextContainer,
  StaticMakerButton,
  LargeMapContainer,
  TourMainContainer,
  HelpLink,
  DirectionControlsContainer,
  RefreshDirectionButton,
  DirectionParagraph,
} from "./styled_components";
import UserLocation from "./UserLocation";
import DirectionLine from "./DirectionLine";
import { IMarker, TourStates } from "../types";
import CustomControls from "./CustomControls";
import DirectionsToggle from "./DirectionsToggle";
import ZoomControls from "./ZoomControls";

type CardStates =
  | {
      state: "suggested";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "selected";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "completed";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "welcome";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "finished";
      stateText: string;
      marker: null;
    };

function buildCardState(
  tourState: TourStates | "finished",
  suggestedMarker: IMarker | null,
  selectedMarker: IMarker | null
): CardStates {
  if (tourState === "welcome" && suggestedMarker != null) {
    return {
      state: "welcome",
      stateText: "SUGGESTED STARTING LOCATION",
      marker: suggestedMarker,
    };
  } else if (tourState === "suggested" && suggestedMarker != null) {
    return {
      state: "suggested",
      stateText: "SUGGESTED NEXT LOCATION",
      marker: suggestedMarker,
    };
  } else if (tourState === "selected" && selectedMarker != null) {
    return {
      state: "selected",
      stateText: "LOCATION",
      marker: selectedMarker,
    };
  } else if (tourState === "completed" && selectedMarker != null) {
    return {
      state: "completed",
      stateText: "COMPLETED",
      marker: selectedMarker,
    };
  } else if (tourState === "suggested" && suggestedMarker == null) {
    return {
      state: "finished",
      stateText: "FINISHED",
      marker: null,
    };
  } else {
    throw Error("State mismatch has occured");
  }
}

function MarkerMap() {
  const [, setLocation] = useLocation();
  const saveUserLocation = useAtomValue(getSavedUserLocationAtom);
  const setDetailsMarkerId = useSetAtom(setDetailsMarkerIdAtom);
  const boundingBox = useAtomValue(paddedBoundingBoxAtom);

  const markerProgressStates = useAtomValue(getAllMarkerProgressAtom);

  const baseIconConfig = useAtomValue(baseIconConfigAtom);
  const selectedIconConfig = useAtomValue(selectedIconConfigAtom);
  const completedIconConfig = useAtomValue(completedIconConfigAtom);
  const suggestedIconConfig = useAtomValue(suggestedIconConfigAtom);

  const setMap = useSetAtom(setMapAtom);

  const tourState = useAtomValue(tourStateAtom);

  const map = useAtomValue(mapValueAtom);

  const sendSaveUserLocation = useSetAtom(sendSaveUserLocationAtom);
  const updateSelectedMarker = useSetAtom(updateSelectedMarkerAtom);
  const setTourToStarted = useSetAtom(setTourToStartedAtom);
  const enableDirections = useAtomValue(getEnableDirectionsAtom);
  const refetchDirection = useSetAtom(refetchDirectionQueryAtom);
  const directions = useAtomValue(loadableDirectionQueryAtom);

  const { markers, order } = useAtomValue(markersQueryAtom);
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);
  const navigateTo = useAtomValue(navigateToMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  const defaultCenterPoint =
    selectedMarker?.point ??
    suggestedMarker?.point ??
    markers[order[0]]?.point ??
    boundingBox.getCenter();

  const centerBetweenUserAndMarker = saveUserLocation
    ? new LatLngBounds(saveUserLocation.latlng, defaultCenterPoint).pad(0.2)
    : undefined;

  const centerOnId = (id: string) => {
    if (map && id in markers) {
      if (saveUserLocation) {
        map.flyToBounds(
          new LatLngBounds(markers[id].point, saveUserLocation.latlng).pad(0.2),
          {
            animate: true,
          }
        );
      } else {
        map.flyTo(markers[id].point, map.getZoom(), {
          animate: true,
        });
      }
    }
  };

  const iconFactory = (id: string): Icon | DivIcon => {
    const completed = markerProgressStates[id] ?? false;
    const selected = selectedMarker ? selectedMarker.id === id : false;
    const suggested = suggestedMarker ? suggestedMarker.id === id : false;

    if (selected) {
      return icon(selectedIconConfig);
    } else if (completed) {
      return icon(completedIconConfig);
    } else if (suggested) {
      return icon(suggestedIconConfig);
    } else {
      return icon(baseIconConfig);
    }
  };

  return (
    <TourMainContainer>
      <SectionContentContainer>
        <MapAppicationContainer role="application" aria-label="Map of markers">
          <LargeMapContainer>
            <MapContainer
              id="map"
              center={
                centerBetweenUserAndMarker
                  ? centerBetweenUserAndMarker.getCenter()
                  : defaultCenterPoint
              }
              bounds={
                cardState.state === "finished"
                  ? boundingBox
                  : centerBetweenUserAndMarker
              }
              style={{ height: "100%" }}
              ref={setMap}
              zoomControl={false}
              maxBounds={boundingBox}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={15}
                maxZoom={18}
              />

              <UserLocation />

              {enableDirections &&
              navigateTo &&
              cardState.state !== "welcome" &&
              cardState.state !== "finished" ? (
                <DirectionLine />
              ) : null}

              <CustomControls useLeafletStyles={false} position="topright">
                <HelpLink
                  onClick={() => setLocation("/about")}
                  title="More Information"
                />
              </CustomControls>

              <ZoomControls minZoom={15} />

              <Pane name="markers" style={{ zIndex: 499 }}>
                {order
                  .map((makerId) => markers[makerId])
                  .map((marker) => (
                    <Marker
                      title={marker.name}
                      position={marker.point}
                      key={marker.id}
                      eventHandlers={{
                        click: () => {
                          if (tourState === "welcome") {
                            setTourToStarted();
                          }
                          centerOnId(marker.id);
                          sendSaveUserLocation();
                          updateSelectedMarker(marker.id);
                        },
                      }}
                      icon={iconFactory(marker.id)}
                    ></Marker>
                  ))}
              </Pane>
            </MapContainer>
          </LargeMapContainer>
          <MapOverlayContainer>
            {cardState.state === "finished" ? (
              <MapOverlay>
                <MarkerCardState color={"completed"}>
                  {cardState.stateText}
                </MarkerCardState>
                <MarkerCardHeader color={"completed"} extra={false}>
                  You&apos;ve completed the tour!
                </MarkerCardHeader>
                <MarkerNavigation>
                  <MarkerCardTextContainer>
                    <MarkerCardText>
                      Press the{" "}
                      <StaticMakerButton color="completed">
                        Home
                      </StaticMakerButton>{" "}
                      button to go back to the home page
                    </MarkerCardText>
                  </MarkerCardTextContainer>
                  <MarkerButtonContainer>
                    <MarkerButton
                      aira-label="Start Tour"
                      title="Start Tour"
                      color="completed"
                      onClick={() => {
                        setLocation("/");
                      }}
                    >
                      Home
                    </MarkerButton>
                  </MarkerButtonContainer>
                </MarkerNavigation>
              </MapOverlay>
            ) : null}

            {cardState.state !== "finished" ? (
              <MapOverlay>
                <MarkerCardState color={cardState.state}>
                  {cardState.stateText}
                </MarkerCardState>
                <MarkerCardHeader
                  color={cardState.state}
                  extra={cardState.marker.extra}
                >
                  {cardState.marker.name}
                </MarkerCardHeader>
                <MarkerCardAddress color={cardState.state}>
                  {cardState.marker.address}
                </MarkerCardAddress>

                {cardState.state === "welcome" ? (
                  <MarkerNavigation>
                    <MarkerCardTextContainer>
                      <MarkerCardText>
                        Press the{" "}
                        <StaticMakerButton color="welcome">
                          Start Tour
                        </StaticMakerButton>{" "}
                        button when you&apos;ve reached the location
                      </MarkerCardText>
                    </MarkerCardTextContainer>
                    <MarkerButtonContainer>
                      <MarkerButton
                        aira-label="Start Tour"
                        title="Start Tour"
                        color="welcome"
                        onClick={() => {
                          setTourToStarted();
                        }}
                      >
                        Start Tour
                      </MarkerButton>
                    </MarkerButtonContainer>
                  </MarkerNavigation>
                ) : (
                  <MarkerNavigation>
                    <MarkerCardTextContainer>
                      <MarkerCardText>
                        Press the{" "}
                        <StaticMakerButton color={cardState.state}>
                          Continue
                        </StaticMakerButton>{" "}
                        button when you&apos;ve reached the location
                      </MarkerCardText>
                    </MarkerCardTextContainer>
                    <MarkerButtonContainer>
                      <MarkerButton
                        aira-label="Continue"
                        title="Continue"
                        color={cardState.state}
                        onClick={() => {
                          setDetailsMarkerId(cardState.marker.id);
                          setLocation(`/tour/details/${cardState.marker.id}`);
                        }}
                      >
                        CONTINUE
                      </MarkerButton>
                    </MarkerButtonContainer>
                  </MarkerNavigation>
                )}
                <DirectionControlsContainer>
                  {enableDirections ? (
                    <RefreshDirectionButton
                      title="Reload route"
                      aria-label="Reload route"
                      onClick={(e) => {
                        e.preventDefault();
                        sendSaveUserLocation();
                        refetchDirection();
                      }}
                    ></RefreshDirectionButton>
                  ) : null}
                  {enableDirections && directions.state === "loading" ? (
                    <DirectionParagraph>Calculating route</DirectionParagraph>
                  ) : null}
                  {enableDirections && directions.state === "hasError" ? (
                    <DirectionParagraph>
                      Routing is unavailable at this time
                    </DirectionParagraph>
                  ) : null}
                  {directions.state === "hasData" || !enableDirections ? (
                    <DirectionsToggle />
                  ) : null}
                </DirectionControlsContainer>
              </MapOverlay>
            ) : null}
          </MapOverlayContainer>
        </MapAppicationContainer>
      </SectionContentContainer>
    </TourMainContainer>
  );
}

export default MarkerMap;
