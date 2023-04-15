import type { LatLngTuple, LatLng, LatLngBounds } from "leaflet";

export type IMarker = {
  id: string;
  point: LatLngTuple;
  name: string;
  address: string;
  extra: boolean;
  sequence: number;
  image: string;
  imageAlt: string;
};

export type MarkerContext = {
  markers: Record<string, IMarker>;
  order: string[];
};

export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  latlng: LatLng;
  bounds: LatLngBounds;
};

export type TourStates = "suggested" | "selected" | "completed" | "welcome";
