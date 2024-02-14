import { useAtomValue } from "jotai";
import { useCallback } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

import { CardsContainer } from "../../styled_components";
import MarkerCard from "./MarkerCard";
import { lastViewedMarkerIdAtom, markersQueryAtom } from "../../../atoms";

function MarkerList() {
  const lastViewedMarker = useAtomValue(lastViewedMarkerIdAtom);
  const [scrollableRef, scrollableBounds] = useMeasure({
    scroll: false,
    polyfill: ResizeObserver,
  });

  const shouldScroll = useCallback(
    (top: number, bottom: number) => {
      // Note: scrollableBounds propperties will be all be zero when the component is first mounted.
      return top < scrollableBounds.top || bottom > scrollableBounds.bottom;
    },
    [scrollableBounds]
  );

  const { markers, order } = useAtomValue(markersQueryAtom);

  return (
    <CardsContainer ref={scrollableRef} aria-label="List of markers">
      {order
        .map((makerId) => markers[makerId])
        .map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
            selected={marker.id === lastViewedMarker}
            shouldScroll={shouldScroll}
          />
        ))}
    </CardsContainer>
  );
}

export default MarkerList;
