import { useAtomValue, useSetAtom } from "jotai";
import {
  baseIconConfigAtom,
  completedIconConfigAtom,
  getAllMarkerProgressAtom,
  getSavedUserLocationAtom,
  mapValueAtom,
  markersQueryAtom,
  selectedIconConfigAtom,
  selectedMarkerAtom,
  sendSaveUserLocationAtom,
  setTourToStartedAtom,
  suggestedIconConfigAtom,
  suggestedMarkerAtom,
  tourPreferenceAtom,
  tourStateAtom,
  updateSelectedMarkerAtom,
} from "../../../../../../../atoms";
import { Marker } from "react-leaflet";
import { type Icon, type DivIcon, icon, LatLngBounds } from "leaflet";

function TourOrder() {
  const { markers, order } = useAtomValue(markersQueryAtom);
  const markerProgressStates = useAtomValue(getAllMarkerProgressAtom);
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const baseIconConfig = useAtomValue(baseIconConfigAtom);
  const selectedIconConfig = useAtomValue(selectedIconConfigAtom);
  const completedIconConfig = useAtomValue(completedIconConfigAtom);
  const suggestedIconConfig = useAtomValue(suggestedIconConfigAtom);

  const tourState = useAtomValue(tourStateAtom);
  const setTourToStarted = useSetAtom(setTourToStartedAtom);
  const saveUserLocation = useAtomValue(getSavedUserLocationAtom);
  const sendSaveUserLocation = useSetAtom(sendSaveUserLocationAtom);
  const updateSelectedMarker = useSetAtom(updateSelectedMarkerAtom);

  const map = useAtomValue(mapValueAtom);

  const iconFactory = (id: string): Icon | DivIcon => {
    const completed = markerProgressStates[id] ?? false;
    const selected = selectedMarker ? selectedMarker.id === id : false;
    const suggested = suggestedMarker ? suggestedMarker.id === id : false;

    if (selected) {
      return icon(selectedIconConfig);
    } else if (completed) {
      return icon(completedIconConfig);
    } else if (suggested) {
      return icon(suggestedIconConfig);
    } else {
      return icon(baseIconConfig);
    }
  };

  const centerOnId = (id: string) => {
    if (map && id in markers) {
      if (saveUserLocation) {
        map.flyToBounds(
          new LatLngBounds(markers[id].point, saveUserLocation.latlng).pad(0.2),
          {
            animate: true,
          }
        );
      } else {
        map.flyTo(markers[id].point, map.getZoom(), {
          animate: true,
        });
      }
    }
  };

  return (
    <>
      {order
        .map((makerId) => markers[makerId])
        .map((marker) => (
          <Marker
            title={marker.name}
            position={marker.point}
            key={marker.id}
            eventHandlers={{
              click: () => {
                if (tourState === "welcome") {
                  setTourToStarted();
                }
                centerOnId(marker.id);
                sendSaveUserLocation();
                updateSelectedMarker(marker.id);
              },
            }}
            icon={iconFactory(marker.id)}
          ></Marker>
        ))}
    </>
  );
}

export default TourOrder;
