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

export type CardStates =
  | {
      state: "suggested";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "selected";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "completed";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "welcome";
      stateText: string;
      marker: IMarker;
    }
  | {
      state: "finished";
      stateText: string;
      marker: null;
    };
