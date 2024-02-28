import type {
  LatLngTuple,
  LatLng,
  LatLngBounds,
  ControlOptions,
  IconOptions,
} from "leaflet";
import { ActorRef, ActorRefFrom, EventObject } from "xstate";
import { boundingBoxMachine } from "./machines/boundingBox";

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

export type BoundingBoxContext = {
  watchLocationRef: ActorRef<EventObject, WatchLocationEvents> | null;
  enableHighAccuracy: boolean;
  boundingBox: LatLngBounds | null;
  userLocation: UserLocation | null;
};

export type BoundingBoxEvents =
  | SetLocationEvent
  | ErrorEvent
  | { type: "TOGGLE_HIGH_ACCURACY" }
  | { type: "CHECK_BOUNDS" };

export type TourStates =
  | "suggested"
  | "selected"
  | "completed"
  | "welcome"
  | "finished";

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

export type ControlProps = ControlOptions & { useLeafletStyles?: boolean };

export type ChildrenProp = { children: React.ReactNode } & ControlProps;

export type MarkerPayload = {
  markers: Record<string, IMarker>;
  order: string[];
};

export type MarkerDetailPayload = {
  id: string;
  url: { path: string; type: string; imageAlt: string }[];
  description: string[] | string;
  timeline: { header: string; list: string[] };
  image: string;
  imageAlt: string;
};

export type MarkerProgress = Record<string, boolean>;

export type ParentEvent =
  | { type: "UNKNOWN_LOCATION" }
  | { type: "OUT_OF_BOUNDS" }
  | { type: "INSIDE_OF_BOUNDS" }
  | { type: "NO_BOUNDING_BOX" }
  | { type: "NEW_LOCATION"; userLocation: UserLocation }
  | { type: "INITIAL_LOCATION"; userLocation: UserLocation }
  | { type: "SET_HIGH_ACCURACY"; highAccuracy: boolean }
  | { type: "NO_GEO_SUPPORT" };

export type ViewControllerContext = {
  boundingBoxRef: ActorRefFrom<typeof boundingBoxMachine> | null;
  userLocation: UserLocation | null;
  savedUserLocation: UserLocation | null;
  enableHighAccuracy: boolean;
};

export type NewLocationEvent = {
  type: "NEW_LOCATION";
  userLocation: UserLocation;
};

export type InitialLocationEvent = {
  type: "INITIAL_LOCATION";
  userLocation: UserLocation;
};

export type SetHighAccuracyEvent = {
  type: "SET_HIGH_ACCURACY";
  highAccuracy: boolean;
};

export type ViewControllerEvents =
  | NewLocationEvent
  | InitialLocationEvent
  | SetHighAccuracyEvent
  | { type: "CHECK_BOUNDS" }
  | { type: "NO_GEO_SUPPORT" }
  | { type: "UNKNOWN_LOCATION" }
  | { type: "NO_BOUNDING_BOX" }
  | { type: "INSIDE_OF_BOUNDS" }
  | { type: "TOGGLE_HIGH_ACCURACY" }
  | { type: "SAVE_USER_LOCATION" }
  | { type: "OUT_OF_BOUNDS" };

export type ErrorEvent = { type: "ERROR"; error: string };

export type WatchLocationEvents = SetLocationEvent | ErrorEvent;

export type SetLocationEvent = {
  type: "SET_LOCATION";
  userLocation: UserLocation;
};

export type CopyPayload = {
  header: string | null;
  body: string[] | null;
  links: [key: string] | null;
};

export interface MarkerListItemProps {
  marker: IMarker;
  selected: boolean;
  shouldScroll: (top: number, bottom: number) => boolean;
}

export interface IMapIcons {
  base: IconOptions;
  selected: IconOptions;
  completed: IconOptions;
  suggested: IconOptions;
}

export interface CompleteCheckBoxProps {
  id: string;
  markerProgress: boolean;
}

export interface MediaArrayProps {
  mediaArray: { path: string; type: string; imageAlt: string }[];
}

export interface HeaderProps {
  size?: "short" | "long";
  children?: React.ReactNode | React.ReactNode[];
}

export interface ZoomControlsProps {
  minZoom?: number;
  maxZoom?: number;
}

export interface TourErrorProps {
  size?: "short" | "long";
  children?: React.ReactNode | React.ReactNode[];
}
