import fetch from "cross-fetch";
import { FeatureCollection } from "geojson";

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
