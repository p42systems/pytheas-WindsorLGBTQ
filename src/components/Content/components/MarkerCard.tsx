import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { mergeRefs } from "react-merge-refs";
import { useLayoutEffect, useRef } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useLocation } from "wouter";

import {
  CardContainer,
  CardImage,
  CardContent,
  CardHeader,
  CardAddress,
  ViewCardButton,
  TourCardButton,
  CardState,
} from "../../styled_components";
import {
  updateSelectedMarkerAtom,
  setDetailsMarkerIdAtom,
  getAllMarkerProgressAtom,
} from "../../../atoms";

import { MarkerListItemProps } from "../../../types";

import placeholder from "/stop_placeholder.png";

function MarkerCard({ marker, selected, shouldScroll }: MarkerListItemProps) {
  const [, setLocation] = useLocation();
  const setDetailsMarkerId = useSetAtom(setDetailsMarkerIdAtom);
  const updateSelectedMarker = useSetAtom(updateSelectedMarkerAtom);
  const [markerMeasureRef, markerBounds] = useMeasure({
    scroll: true,
    polyfill: ResizeObserver,
  });
  const markerRef = useRef<HTMLLIElement>(null);
  const markerProgressStates = useAtomValue(getAllMarkerProgressAtom);

  useLayoutEffect(() => {
    // Goals: If the marker isn't in view, scroll it into view but only if it's selected
    // Note: markerBounds propperties will be all be zero when the component is first mounted.

    // If both the top and bottom values are 0, this means the bounds haven't been set yet. This means
    // that the component was just mounted. Therefore, if both the values are 0 and the marker is selected
    // then the view should scroll to the marker. The bahavior should be set to "auto" to avoid the scroll
    // animation scrolling really fast to the marker which is pretty confusing to users and jaring.
    if (markerBounds.top === 0 && markerBounds.bottom === 0 && selected) {
      // WARNING: Block set to "start" or when alignToTop is true, the flex container does some
      // unexpected things. The elements before the scrollable area disappear when the
      // scrollIntoView function is called. Not exactly sure why this happends. So please
      // avoid using those options until the reason for this bahavior is worked out.
      markerRef.current?.scrollIntoView({
        behavior: "auto",
        block: "center", // Reminder: Don't use "start", see the above comment
        inline: "nearest",
      });
    } else if (
      selected &&
      shouldScroll(markerBounds.top, markerBounds.bottom)
    ) {
      markerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // Reminder: Don't use "start", see the above comment
        inline: "nearest",
      });
    }
  }, [selected]);

  return (
    <CardContainer
      aria-label={marker.name}
      aria-selected={selected}
      ref={mergeRefs([markerRef, markerMeasureRef])}
    >
      <CardState>
        <img
          src={
            markerProgressStates[marker.id] ?? false
              ? "/icons/corner_content_viewed.svg"
              : "/icons/corner_content_unviewed.svg"
          }
        />
      </CardState>
      <CardImage
        src={marker.image ? marker.image : placeholder}
        alt={marker.imageAlt}
      />
      <CardContent>
        <CardHeader>{marker.name}</CardHeader>
        <CardAddress>{marker.address}</CardAddress>

        <ViewCardButton
          aria-label={`View ${marker.name} content page`}
          title={`View ${marker.name} content page`}
          tabIndex={0}
          onClick={() => {
            setDetailsMarkerId(marker.id);
            setLocation(`/tour/details/${marker.id}`);
          }}
        >
          View
        </ViewCardButton>
        <TourCardButton
          aria-label={`View ${marker.name} in the tour`}
          title={`View ${marker.name} in the tour`}
          tabIndex={0}
          onClick={() => {
            updateSelectedMarker(marker.id);
            setLocation("/tour");
          }}
        >
          Take Tour
        </TourCardButton>
      </CardContent>
    </CardContainer>
  );
}

export default MarkerCard;
