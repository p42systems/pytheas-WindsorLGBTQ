import { divIcon } from "leaflet";
import type { DivIcon, DivIconOptions, IconOptions } from "leaflet";

function createDivMarker(options: DivIconOptions): HTMLElement {
  const div = document.createElement("div");

  if (options.html) {
    if (!(options.html instanceof HTMLElement)) {
      div.innerHTML = options.html;
    } else {
      div.appendChild(options.html);
    }
  }

  return div;
}

export function isDivIconConfig(
  config: IconOptions | DivIconOptions
): config is DivIconOptions {
  return "html" in config;
}

export function divIconFactory(options: DivIconOptions): DivIcon {
  return divIcon({
    ...options,
    html: createDivMarker(options),
  });
}
