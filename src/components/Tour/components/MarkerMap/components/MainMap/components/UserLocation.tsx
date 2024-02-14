import { useAtomValue } from "jotai";
import { Marker, Pane } from "react-leaflet";

import { getUserLocationAtom } from "../../../../../../../atoms";
import { headingMarkerFactory } from "../../../../../../../services/markers";

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
