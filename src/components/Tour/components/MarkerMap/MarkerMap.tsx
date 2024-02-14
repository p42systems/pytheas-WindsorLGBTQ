import { useAtomValue } from "jotai";

import {
  tourStateAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
} from "../../../../atoms";
import {
  MapAppicationContainer,
  MapOverlayContainer,
  SectionContentContainer,
  LargeMapContainer,
  TourMainContainer,
} from "../../../styled_components";
import MainMap from "./components/MainMap/MainMap";
import { buildCardState } from "../../../../services/cards";
import CompletedCard from "./components/CompletedCard";
import InProgressCard from "./components/InProgressCard/InProgressCard";

function MarkerMap() {
  const tourState = useAtomValue(tourStateAtom);

  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  return (
    <TourMainContainer>
      <SectionContentContainer>
        <MapAppicationContainer role="application" aria-label="Map of markers">
          <LargeMapContainer>
            <MainMap />
          </LargeMapContainer>
          <MapOverlayContainer>
            {cardState.state === "finished" ? <CompletedCard /> : null}

            {cardState.state !== "finished" ? <InProgressCard /> : null}
          </MapOverlayContainer>
        </MapAppicationContainer>
      </SectionContentContainer>
    </TourMainContainer>
  );
}

export default MarkerMap;
