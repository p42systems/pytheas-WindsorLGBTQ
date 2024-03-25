import { useTheme } from "@emotion/react";
import { useAtomValue } from "jotai";
import {
  MapContainer,
  Marker,
  TileLayer,
  Pane,
  Rectangle,
} from "react-leaflet";

import { boundingBoxQueryAtom } from "../../../../atoms";
import { SmallMapContainer } from "../../../styled_components";
import { interactionOptions } from "../../../../services/cards";
import BoundingBoxOrder from "./components/BoundingBoxOrder";

function BoundingBoxMap() {
  const boundingBox = useAtomValue(boundingBoxQueryAtom);

  const theme = useTheme();

  return (
    <SmallMapContainer>
      <MapContainer
        bounds={boundingBox}
        center={boundingBox.getCenter()}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        {...interactionOptions}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Pane name="boundingBox" style={{ zIndex: 499 }}>
          <Rectangle
            bounds={boundingBox}
            interactive={false}
            pathOptions={{ color: theme.colors.primary }}
          />
        </Pane>

        <Pane name="markers" style={{ zIndex: 500 }}>
          <BoundingBoxOrder />
        </Pane>
      </MapContainer>
    </SmallMapContainer>
  );
}

export default BoundingBoxMap;
