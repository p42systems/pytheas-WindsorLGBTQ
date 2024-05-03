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
