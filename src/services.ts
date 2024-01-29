import { LatLngBounds } from "leaflet";
import fetch from "cross-fetch";
import { Feature, FeatureCollection, Point } from "geojson";

import type { IMarker, UserLocation, TourStates, CardStates } from "./types";

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

export function checkForGeoLocationAPI(): Promise<void> {
  return new Promise((resolve, reject) => {
    "geolocation" in navigator ? resolve() : reject();
  });
}

export async function fetchBoundingBox(): Promise<LatLngBounds> {
  const boundsUrl = `${window.location.origin}/data/bounds.json`;

  const res = await fetch(boundsUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { full } = await res.json();
  return new LatLngBounds([full.north, full.east], [full.south, full.west]);
}

export async function fetchWalkingBoundingBox(): Promise<LatLngBounds> {
  const boundsUrl = `${window.location.origin}/data/bounds.json`;

  const res = await fetch(boundsUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { full, walking } = await res.json();
  return new LatLngBounds(
    [walking.north, walking.east],
    [walking.south, walking.west]
  );
}

export async function fetchBusBoundingBox(): Promise<LatLngBounds> {
  const boundsUrl = `${window.location.origin}/data/bounds.json`;

  const res = await fetch(boundsUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { full, walking, bus } = await res.json();
  return new LatLngBounds([bus.north, bus.east], [bus.south, bus.west]);
}

const requiredKeys = [
  "id",
  "name",
  "address",
  "extra",
  "sequence",
  "image",
  "imageAlt",
];
function isMarkerPoint(point: Feature): point is Feature<Point, IMarker> {
  const properties = point.properties ? point.properties : null;
  return (
    point != null &&
    properties != null &&
    point.type === "Feature" &&
    point.geometry.type === "Point" &&
    requiredKeys.every((k) => k in properties)
  );
}

export async function fetchMarkers(): Promise<MarkerPayload> {
  const markersUrl = `${window.location.origin}/data/markers.geojson`;

  const res = await fetch(markersUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data: FeatureCollection = await res.json();
  const markers: MarkerPayload = {
    order: [],
    markers: {},
  };

  const pre_order: { sequence: number; id: string }[] = [];
  for (const feature of data.features) {
    if (isMarkerPoint(feature)) {
      const [lng, lat] = feature.geometry.coordinates;
      markers.markers[feature.properties.id] = {
        ...feature.properties,
        point: [lat, lng],
      };
      pre_order.push({
        sequence: feature.properties.sequence,
        id: feature.properties.id,
      });
    } else {
      console.warn(
        `Feature has been ignored because it does not contain the required properties: ${JSON.stringify(
          feature
        )}`
      );
    }
  }

  markers.order = Array.from(
    pre_order.sort((a, b) => a.sequence - b.sequence).map((value) => value.id)
  );

  return markers;
}

export async function fetchMarkerDetails(
  id: string
): Promise<MarkerDetailPayload> {
  const markersUrl = `${window.location.origin}/data/markers/${id}.json`;

  const res = await fetch(markersUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}

export function checkWithinBounds(
  userLocation: UserLocation | null,
  boxBounds: LatLngBounds | null
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!userLocation || !boxBounds) {
      reject();
    } else {
      resolve(userLocation.bounds.intersects(boxBounds));
    }
  });
}

export async function fetchRoute(
  coordinates: [number, number][],
  ORSAPIKey: string,
  ORSAPIEndpoint: string
): Promise<FeatureCollection> {
  const routeUrl = `${ORSAPIEndpoint}/v2/directions/foot-walking/geojson`;

  const res = await fetch(routeUrl, {
    method: "POST",
    headers: {
      ...(ORSAPIKey ? { Authorization: ORSAPIKey } : {}),
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates,
      elevation: false,
      instructions: false,
      preference: "shortest",
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}

export function fetchOrder(tourPreference: string, order: string[]): string[] {
  const busStops: number[] = [8, 2, 3, 32, 30, 42, 44, 47];

  switch (tourPreference) {
    case "walking":
      order = order.slice(30, 39);
      break;
    case "bus":
      order = busStops.map((stopNum) => order[stopNum - 1]);
      break;
  }

  return order;
}

class IntroServices {
  relLinkCount = 0;

  scrollIntoView(props: React.RefObject<HTMLHeadingElement>) {
    props.current?.scrollIntoView({ behavior: "smooth" });
  }

  clickLink(ref: React.RefObject<HTMLHeadingElement>) {
    this.relLinkCount++;
    this.scrollIntoView(ref);
  }

  backCheck(setLocation: any) {
    if (this.relLinkCount && window.history.length > 0) {
      window.history.go(-this.relLinkCount - 1);
    } else {
      back(setLocation);
    }
  }
}

export const intro = new IntroServices();

export const loadTour = (
  preference: string,
  setTourPreference: any,
  setLocation: any
) => {
  setTourPreference(preference);
  setLocation("/tour");
};

export const back = (setLocation: any) => {
  if (window.history.length > 0) {
    window.history.back();
  } else {
    setLocation("/");
  }
};

export const interactionOptions = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
};

export function buildCardState(
  tourState: TourStates | "finished",
  suggestedMarker: IMarker | null,
  selectedMarker: IMarker | null
): CardStates {
  if (tourState === "welcome" && suggestedMarker != null) {
    return {
      state: "welcome",
      stateText: "SUGGESTED STARTING LOCATION",
      marker: suggestedMarker,
    };
  } else if (tourState === "suggested" && suggestedMarker != null) {
    return {
      state: "suggested",
      stateText: "SUGGESTED NEXT LOCATION",
      marker: suggestedMarker,
    };
  } else if (tourState === "selected" && selectedMarker != null) {
    return {
      state: "selected",
      stateText: "LOCATION",
      marker: selectedMarker,
    };
  } else if (tourState === "completed" && selectedMarker != null) {
    return {
      state: "completed",
      stateText: "COMPLETED",
      marker: selectedMarker,
    };
  } else if (tourState === "suggested" && suggestedMarker == null) {
    return {
      state: "finished",
      stateText: "FINISHED",
      marker: null,
    };
  } else {
    throw Error("State mismatch has occured");
  }
}
