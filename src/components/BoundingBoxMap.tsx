import { icon } from "leaflet";
import { useTheme } from "@emotion/react";
import { useAtomValue } from "jotai";
import {
  MapContainer,
  Marker,
  TileLayer,
  Pane,
  Rectangle,
} from "react-leaflet";

import {
  baseIconConfigAtom,
  markersQueryAtom,
  boundingBoxQueryAtom,
  tourPreferenceAtom,
} from "../atoms";
import { SmallMapContainer } from "./styled_components";

const interactionOptions = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
};

function BoundingBoxMap() {
  const { markers, order } = useAtomValue(markersQueryAtom);
  const boundingBox = useAtomValue(boundingBoxQueryAtom);
  const baseIconConfig = useAtomValue(baseIconConfigAtom);
  const tourPreference = useAtomValue(tourPreferenceAtom);

  const theme = useTheme();

  const preferredOrder = tourPreference === "full" ? order : order.slice(30, 39);

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
            pathOptions={{ color: theme.colors.headerBackground }}
          />
        </Pane>

        <Pane name="markers" style={{ zIndex: 500 }}>
          {preferredOrder
            .map((makerId) => markers[makerId])
            .filter((marker) => tourPreference === "walking" ? (marker.sequence >= 31 && marker.sequence <= 39) : marker)
            .map((marker) => (
              <Marker
                position={marker.point}
                key={marker.id}
                interactive={false}
                icon={icon({
                  ...baseIconConfig,
                  iconSize: [18, 25],
                  iconAnchor: [9, 25],
                })}
              ></Marker>
            ))}
        </Pane>
      </MapContainer>
    </SmallMapContainer>
  );
}

export default BoundingBoxMap;
