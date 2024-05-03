import { MapContainer, Pane, TileLayer } from "react-leaflet";
import { useAtomValue, useSetAtom } from "jotai";
import { LatLngBounds } from "leaflet";
import { useLocation } from "wouter";

import {
  setMapAtom,
  tourStateAtom,
  markersQueryAtom,
  selectedMarkerAtom,
  suggestedMarkerAtom,
  paddedBoundingBoxAtom,
  getSavedUserLocationAtom,
  tourPreferenceAtom,
} from "../../../../../../atoms";
import { HelpLink } from "../../../../../styled_components";
import UserLocation from "./components/UserLocation";
import DirectionLine from "./components/DirectionLine";
import CustomControls from "../../../../../General/CustomControls";
import ZoomControls from "../../../../../General/ZoomControls";
import { buildCardState } from "../../../../../../services/cards";
import TourOrder from "./components/TourOrder";

function MainMap() {
  const [, setLocation] = useLocation();
  const saveUserLocation = useAtomValue(getSavedUserLocationAtom);
  const boundingBox = useAtomValue(paddedBoundingBoxAtom);

  const setMap = useSetAtom(setMapAtom);

  const tourState = useAtomValue(tourStateAtom);

  const { markers, order } = useAtomValue(markersQueryAtom);
  const selectedMarker = useAtomValue(selectedMarkerAtom);
  const suggestedMarker = useAtomValue(suggestedMarkerAtom);

  const cardState = buildCardState(tourState, suggestedMarker, selectedMarker);

  const defaultCenterPoint =
    selectedMarker?.point ??
    suggestedMarker?.point ??
    markers[order[0]]?.point ??
    boundingBox.getCenter();

  const centerBetweenUserAndMarker = saveUserLocation
    ? new LatLngBounds(saveUserLocation.latlng, defaultCenterPoint).pad(0.2)
    : undefined;

  return (
    <MapContainer
      id="map"
      center={
        centerBetweenUserAndMarker
          ? centerBetweenUserAndMarker.getCenter()
          : defaultCenterPoint
      }
      bounds={
        cardState.state === "finished"
          ? boundingBox
          : centerBetweenUserAndMarker
      }
      style={{ height: "100%" }}
      ref={setMap}
      zoomControl={false}
      maxBounds={boundingBox}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        minZoom={15}
        maxZoom={18}
      />

      <UserLocation />

      <DirectionLine />

      <CustomControls useLeafletStyles={false} position="topright">
        <HelpLink
          onClick={() => setLocation("/about")}
          title="More Information"
        />
      </CustomControls>

      <ZoomControls minZoom={15} />

      <Pane name="markers" style={{ zIndex: 499 }}>
        <TourOrder />
      </Pane>
    </MapContainer>
  );
}

export default MainMap;
