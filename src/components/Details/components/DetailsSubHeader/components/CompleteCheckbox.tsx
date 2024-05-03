import { useSetAtom } from "jotai";
import {
  toggleMarkerProgressAtom,
  updateSelectedMarkerAtom,
} from "../../../../../atoms";
import {
  Checkbox,
  CheckboxLabel,
  CheckboxLabelText,
} from "../../../../styled_components";
import { CompleteCheckBoxProps } from "../../../../../types";

function CompleteCheckBox({ id, markerProgress }: CompleteCheckBoxProps) {
  const toggleMarkerProgress = useSetAtom(toggleMarkerProgressAtom);
  const updateSelectedMarker = useSetAtom(updateSelectedMarkerAtom);

  return (
    <CheckboxLabel>
      <Checkbox
        title={markerProgress ? "Mark as imcomplete" : "Mark as completed"}
        aria-label={markerProgress ? "Mark as imcomplete" : "Mark as completed"}
        type="checkbox"
        checked={markerProgress}
        onChange={() => {
          toggleMarkerProgress(id);
          updateSelectedMarker(markerProgress ? id : null);
        }}
      />
      <CheckboxLabelText>Mark as Completed</CheckboxLabelText>
    </CheckboxLabel>
  );
}

export default CompleteCheckBox;
