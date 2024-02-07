import { LatLng } from "leaflet";
import { Sender } from "xstate";
import { WatchLocationEvents } from "../types";

function watchLocation<TEvents extends WatchLocationEvents>(
  enableHighAccuracy: boolean,
  callback: Sender<TEvents>
) {
  const id = navigator.geolocation.watchPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const latlng = new LatLng(latitude, longitude);
      const bounds = latlng.toBounds(position.coords.accuracy * 2);

      const userLocation = {
        latitude,
        longitude,
        accuracy: position.coords.accuracy,
        latlng,
        bounds,
      };

      callback({ type: "SET_LOCATION", userLocation } as TEvents);
    },
    (err) => {
      console.error(err);
      callback({
        type: "ERROR",
        error: `ERROR(${err.code}): ${err.message}`,
      } as TEvents);
    },
    {
      enableHighAccuracy,
    }
  );
  return () => {
    navigator.geolocation.clearWatch(id);
  };
}

export function watchLocationFactory(enableHighAccuracy: boolean) {
  return watchLocation.bind({}, enableHighAccuracy);
}
