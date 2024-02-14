import { useAtomValue, useSetAtom } from "jotai";
import { useLocation } from "wouter";

import {
  tourStateAtom,
  setTourToStartedAtom,
  setDetailsMarkerIdAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
} from "../../../../../../atoms";
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
} from "../../../../../styled_components";
import { buildCardState } from "../../../../../../services/cards";
import DirectionControls from "./components/DirectionControls";

function InProgressCard() {
  const [, setLocation] = useLocation();
  const setDetailsMarkerId = useSetAtom(setDetailsMarkerIdAtom);

  const tourState = useAtomValue(tourStateAtom);

  const setTourToStarted = useSetAtom(setTourToStartedAtom);

  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  return (
    <MapOverlay>
      <MarkerCardState color={cardState.state}>
        {cardState.stateText}
      </MarkerCardState>
      <MarkerCardHeader color={cardState.state} extra={cardState.marker?.extra}>
        {cardState.marker?.name}
      </MarkerCardHeader>
      <MarkerCardAddress color={cardState.state}>
        {cardState.marker?.address}
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
                setDetailsMarkerId(cardState.marker!.id);
                setLocation(`/tour/details/${cardState.marker!.id}`);
              }}
            >
              CONTINUE
            </MarkerButton>
          </MarkerButtonContainer>
        </MarkerNavigation>
      )}
      <DirectionControls />
    </MapOverlay>
  );
}

export default InProgressCard;
