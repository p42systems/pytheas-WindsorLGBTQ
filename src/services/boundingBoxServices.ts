import { LatLngBounds } from "leaflet";
import fetch from "cross-fetch";
import { sendParent } from "xstate";

import type { UserLocation, ParentEvent } from "../types";

export function checkForGeoLocationAPI(): Promise<void> {
  return new Promise((resolve, reject) => {
    "geolocation" in navigator ? resolve() : reject();
  });
}

export async function fetchBoundingBox(props: any): Promise<LatLngBounds> {
  const tourPreference = typeof props === "string" ? props : "full";
  const boundsUrl = `${window.location.origin}/data/bounds/${tourPreference}.json`;

  const res = await fetch(boundsUrl);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { north, east, south, west } = await res.json();
  console.log(tourPreference);
  return new LatLngBounds([north, east], [south, west]);
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

function createSendParent<TParentEvent extends { type: string }>() {
  return function <TContext, TEvent extends { type: string }>(
    event: Parameters<typeof sendParent<TContext, TEvent, TParentEvent>>[0],
    options?: Parameters<typeof sendParent<TContext, TEvent, TParentEvent>>[1]
  ) {
    return sendParent<TContext, TEvent, TParentEvent>(event, options);
  };
}

export const customSendParent = createSendParent<ParentEvent>();
