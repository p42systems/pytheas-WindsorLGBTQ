import { useTheme } from "@emotion/react";
import { useAtomValue } from "jotai";
import { GeoJSON as LGeoJSON } from "leaflet";
import { Polyline } from "react-leaflet";

import {
  getEnableDirectionsAtom,
  loadableDirectionQueryAtom,
  navigateToMarkerAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
  tourStateAtom,
} from "../../../../../../../atoms";
import {
  buildCardState,
  isLineString,
} from "../../../../../../../services/cards";

function DirectionLine() {
  const directions = useAtomValue(loadableDirectionQueryAtom);
  const theme = useTheme();

  const enableDirections = useAtomValue(getEnableDirectionsAtom);
  const navigateTo = useAtomValue(navigateToMarkerAtom);

  const tourState = useAtomValue(tourStateAtom);
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);
  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  if (directions.state !== "hasData") {
    return null;
  }

  return (
    <>
      {enableDirections &&
      navigateTo &&
      cardState.state !== "welcome" &&
      cardState.state !== "finished" ? (
        <>
          {directions.data.features.length >= 1 &&
          directions.data.features &&
          isLineString(directions.data.features[0]) ? (
            <Polyline
              color={theme.colors.primary}
              dashArray="15 8"
              weight={6}
              positions={LGeoJSON.coordsToLatLngs(
                directions.data.features[0].geometry.coordinates
              )}
            ></Polyline>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default DirectionLine;
