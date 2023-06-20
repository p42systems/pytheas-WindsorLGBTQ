import { LatLngBounds } from "leaflet";
import fetch from "cross-fetch";
import { Feature, FeatureCollection, Point } from "geojson";

import type { IMarker, UserLocation } from "./types";

export type MarkerPayload = {
  markers: Record<string, IMarker>;
  order: string[];
};

export type MarkerDetailPayload = {
  id: string;
  url: {path: string, type: string, imageAlt: string}[];
  description: string;
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

  const { north, east, south, west } = await res.json();
  return new LatLngBounds([north, east], [south, west]);
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
