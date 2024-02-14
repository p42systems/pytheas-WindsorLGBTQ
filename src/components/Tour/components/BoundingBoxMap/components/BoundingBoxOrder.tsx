import { useAtomValue } from "jotai";
import {
  baseIconConfigAtom,
  markersQueryAtom,
  tourPreferenceAtom,
} from "../../../../../atoms";
import { Marker } from "react-leaflet";
import { icon } from "leaflet";
import { fetchOrder } from "../../../../../services/route";

function BoundingBoxOrder() {
  const { markers, order } = useAtomValue(markersQueryAtom);
  const tourPreference = useAtomValue(tourPreferenceAtom);
  const preferredOrder = fetchOrder(tourPreference, order);
  const baseIconConfig = useAtomValue(baseIconConfigAtom);

  return (
    <>
      {preferredOrder
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
