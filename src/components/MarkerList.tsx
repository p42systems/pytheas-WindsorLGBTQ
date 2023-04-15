import { useAtomValue } from "jotai";
import { useCallback } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { useLocation } from "wouter";

import {
  CardsContainer,
  ListParagraph,
  StaticheaderBackgroundButton,
  BackButton,
  ListMainContainer,
} from "./styled_components";
import MarkerCard from "./MarkerCard";
import { lastViewedMarkerIdAtom, markersQueryAtom } from "../atoms";
import Header from "./Header";
import Footer from "./Footer";

function MarkerList() {
  const [, setLocation] = useLocation();
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
    <>
      <Header>
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => {
            if (window.history.length > 0) {
              window.history.back();
            } else {
              setLocation("/");
            }
          }}
        >
          Back
        </BackButton>
      </Header>
      <ListMainContainer>
        <ListParagraph>
          Welcome to the content page. To view the
          content, click the{" "}
          <StaticheaderBackgroundButton>View</StaticheaderBackgroundButton>
          button. If you are near the site and would like to participate in the
          walking tour, click the{" "}
          <StaticheaderBackgroundButton>Take Tour</StaticheaderBackgroundButton>
          button and it will instruct you as to where to start.
        </ListParagraph>
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
      </ListMainContainer>
      <Footer />
    </>
  );
}

export default MarkerList;
