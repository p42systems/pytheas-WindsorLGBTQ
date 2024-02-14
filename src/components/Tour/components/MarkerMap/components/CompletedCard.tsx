import { useLocation } from "wouter";
import {
  MapOverlay,
  MarkerButton,
  MarkerButtonContainer,
  MarkerCardHeader,
  MarkerCardState,
  MarkerCardText,
  MarkerCardTextContainer,
  MarkerNavigation,
  StaticMakerButton,
} from "../../../../styled_components";
import { buildCardState } from "../../../../../services/cards";
import { useAtomValue } from "jotai";
import {
  selectedMarkerAtom,
  suggestedMarkerAtom,
  tourStateAtom,
} from "../../../../../atoms";

function CompletedCard() {
  const [, setLocation] = useLocation();

  const tourState = useAtomValue(tourStateAtom);

  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  return (
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
            <StaticMakerButton color="completed">Home</StaticMakerButton> button
            to go back to the home page
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
  );
}

export default CompletedCard;
