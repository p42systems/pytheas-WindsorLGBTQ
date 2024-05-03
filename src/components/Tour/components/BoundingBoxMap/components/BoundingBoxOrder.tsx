import { useAtomValue } from "jotai";
import { baseIconConfigAtom, markersQueryAtom } from "../../../../../atoms";
import { Marker } from "react-leaflet";
import { icon } from "leaflet";

function BoundingBoxOrder() {
  const { markers, order } = useAtomValue(markersQueryAtom);
  const baseIconConfig = useAtomValue(baseIconConfigAtom);

  return (
    <>
      {order
        .map((makerId) => markers[makerId])
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
    </>
  );
}

export default BoundingBoxOrder;
