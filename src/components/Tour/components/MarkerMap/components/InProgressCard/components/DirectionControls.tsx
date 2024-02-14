import { useAtomValue, useSetAtom } from "jotai";

import {
  sendSaveUserLocationAtom,
  getEnableDirectionsAtom,
  loadableDirectionQueryAtom,
  refetchDirectionQueryAtom,
} from "../../../../../../../atoms";
import {
  DirectionControlsContainer,
  RefreshDirectionButton,
  DirectionParagraph,
} from "../../../../../../styled_components";
import DirectionsToggle from "./DirectionsToggle";

function DirectionControls() {
  const sendSaveUserLocation = useSetAtom(sendSaveUserLocationAtom);
  const enableDirections = useAtomValue(getEnableDirectionsAtom);
  const refetchDirection = useSetAtom(refetchDirectionQueryAtom);
  const directions = useAtomValue(loadableDirectionQueryAtom);

  return (
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
  );
}

export default DirectionControls;
