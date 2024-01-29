import { useAtomValue, useSetAtom } from "jotai";
import { useLocation } from "wouter";

import {
  sendSaveUserLocationAtom,
  tourStateAtom,
  setTourToStartedAtom,
  setDetailsMarkerIdAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
  getEnableDirectionsAtom,
  loadableDirectionQueryAtom,
  refetchDirectionQueryAtom,
} from "../../../../../atoms";
import {
  MarkerButton,
  MarkerCardText,
  MarkerCardState,
  MapOverlay,
  MarkerCardHeader,
  MarkerCardAddress,
  MarkerNavigation,
  MarkerButtonContainer,
  MarkerCardTextContainer,
  StaticMakerButton,
  DirectionControlsContainer,
  RefreshDirectionButton,
  DirectionParagraph,
} from "../../../../styled_components";
import DirectionsToggle from "../../../../DirectionsToggle";
import { buildCardState } from "../../../../../services";

function InProgressCard() {
  const [, setLocation] = useLocation();
  const setDetailsMarkerId = useSetAtom(setDetailsMarkerIdAtom);

  const tourState = useAtomValue(tourStateAtom);

  const sendSaveUserLocation = useSetAtom(sendSaveUserLocationAtom);
  const setTourToStarted = useSetAtom(setTourToStartedAtom);
  const enableDirections = useAtomValue(getEnableDirectionsAtom);
  const refetchDirection = useSetAtom(refetchDirectionQueryAtom);
  const directions = useAtomValue(loadableDirectionQueryAtom);

  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  return (
    <MapOverlay>
      <MarkerCardState color={cardState.state}>
        {cardState.stateText}
      </MarkerCardState>
      <MarkerCardHeader color={cardState.state} extra={cardState.marker.extra}>
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
              <StaticMakerButton color="welcome">Start Tour</StaticMakerButton>{" "}
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
  );
}

export default InProgressCard;
