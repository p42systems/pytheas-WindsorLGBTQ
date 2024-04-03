import { divIcon } from "leaflet";
import fetch from "cross-fetch";
import { Feature, FeatureCollection, Point } from "geojson";

import type { IMarker, MarkerPayload, MarkerDetailPayload } from "../types";

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

export async function fetchMarkers(
  tourPreference: string
): Promise<MarkerPayload> {
  const markersUrl = `${window.location.origin}/data/tours/${tourPreference}.geojson`;

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

export function headingMarkerFactory() {
  const img = document.createElement("img");
  img.setAttribute("src", "/icons/user_location.svg");

  return divIcon({
    html: img,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
