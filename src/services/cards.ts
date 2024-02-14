import { Control, DomUtil } from "leaflet";
import { Feature, LineString } from "geojson";
import type { IMarker, TourStates, CardStates, ControlProps } from "../types";

export const interactionOptions = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
};

export function buildCardState(
  tourState: TourStates,
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

export function isLineString(
  lineString: Feature
): lineString is Feature<LineString> {
  return (
    lineString != null &&
    lineString.type === "Feature" &&
    lineString.geometry.type === "LineString"
  );
}

export function createControlContainer({
  useLeafletStyles = true,
  ...props
}: ControlProps): Control {
  // Any here becuase the types for leaflet have not been updated.
  // It's a work around until v1.8 is released
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const CenterMarkerControl = Control.extend<any>({
    onAdd() {
      const container = DomUtil.create("div", "");
      if (useLeafletStyles) {
        DomUtil.addClass(container, "leaflet-bar leaflet-control");
      }
      return container;
    },
  });
  return new CenterMarkerControl({ ...props });
}
