import { useTheme } from "@emotion/react";
import { Feature, LineString } from "geojson";
import { useAtomValue } from "jotai";
import { GeoJSON as LGeoJSON } from "leaflet";
import { Polyline } from "react-leaflet";

import { loadableDirectionQueryAtom } from "./../atoms";

function isLineString(lineString: Feature): lineString is Feature<LineString> {
  return (
    lineString != null &&
    lineString.type === "Feature" &&
    lineString.geometry.type === "LineString"
  );
}

function DirectionLine() {
  const directions = useAtomValue(loadableDirectionQueryAtom);
  const theme = useTheme();

  if (directions.state !== "hasData") {
    return null;
  }

  return (
    <>
      {directions.data.features.length >= 1 &&
      directions.data.features &&
      isLineString(directions.data.features[0]) ? (
        <Polyline
          color={theme.colors.headerBackground}
          dashArray="15 8"
          weight={6}
          positions={LGeoJSON.coordsToLatLngs(
            directions.data.features[0].geometry.coordinates
          )}
        ></Polyline>
      ) : null}
    </>
  );
}

export default DirectionLine;
