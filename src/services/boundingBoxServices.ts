import { LatLngBounds } from "leaflet";
import fetch from "cross-fetch";
import { sendParent } from "xstate";

import type { UserLocation, ParentEvent } from "../types";

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
