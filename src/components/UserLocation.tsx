import { useAtomValue } from "jotai";
import { divIcon } from "leaflet";
import { Marker, Pane } from "react-leaflet";

import { getUserLocationAtom } from "./../atoms";

function headingMarkerFactory() {
  const img = document.createElement("img");
  img.setAttribute("src", "/icons/user_location.svg");

  return divIcon({
    html: img,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function UserLocation() {
  const userLocation = useAtomValue(getUserLocationAtom);

  return (
    <>
      {userLocation ? (
        <Pane name="user-location" style={{ zIndex: 500 }}>
          <Marker
            icon={headingMarkerFactory()}
            position={userLocation.latlng}
            interactive={false}
          />
        </Pane>
      ) : null}
    </>
  );
}

export default UserLocation;
