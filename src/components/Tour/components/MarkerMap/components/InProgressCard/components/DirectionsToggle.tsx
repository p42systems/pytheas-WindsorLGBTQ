import { useAtomValue, useSetAtom } from "jotai";

import {
  getEnableDirectionsAtom,
  sendSaveUserLocationAtom,
  toggleEnableDirectionsAtom,
} from "../../../../../../../atoms";
import {
  ToggleCheckbox,
  CheckboxLabelText,
  ToggleCheckboxLabel,
} from "../../../../../../styled_components";

function DirectionsToggle() {
  const toggleDirections = useSetAtom(toggleEnableDirectionsAtom);
  const enableDirections = useAtomValue(getEnableDirectionsAtom);
  const sendSaveUserLocation = useSetAtom(sendSaveUserLocationAtom);

  return (
    <ToggleCheckboxLabel>
      <ToggleCheckbox
        title={enableDirections ? "Disable Routing" : "Enable Routing"}
        aria-label={enableDirections ? "Disable Routing" : "Enable Routing"}
        type="checkbox"
        checked={enableDirections}
        onChange={() => {
          toggleDirections();
          sendSaveUserLocation();
        }}
      />
      <CheckboxLabelText>Toggle Routing</CheckboxLabelText>
    </ToggleCheckboxLabel>
  );
}

export default DirectionsToggle;
