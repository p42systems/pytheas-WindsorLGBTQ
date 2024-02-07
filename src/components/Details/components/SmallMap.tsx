import { MapContainer, Marker, TileLayer } from "react-leaflet";
import ZoomControls from "../../General/ZoomControls";
import { SmallMapContainer } from "../../styled_components";
import { useAtomValue } from "jotai";
import {
  baseIconConfigAtom,
  detailsQueryAtom,
  markersQueryAtom,
} from "../../../atoms";
import { icon } from "leaflet";
import { interactionOptions } from "../../../services/cards";

function SmallMap() {
  const detail = useAtomValue(detailsQueryAtom);
  const { markers } = useAtomValue(markersQueryAtom);

  const marker = markers[detail.id];

  const baseIconConfig = useAtomValue(baseIconConfigAtom);

  return (
    <SmallMapContainer>
      <MapContainer
        center={marker.point}
        style={{ width: "100%", height: "100%" }}
        zoom={16}
        zoomControl={false}
        {...interactionOptions}
      >
        <ZoomControls minZoom={14} maxZoom={18} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          minZoom={14}
          maxZoom={18}
        />

        <Marker
          position={marker.point}
          key={marker.id}
          icon={icon(baseIconConfig)}
          interactive={false}
        ></Marker>
      </MapContainer>
    </SmallMapContainer>
  );
}

export default SmallMap;
