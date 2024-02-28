import { useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import CustomControls from "./CustomControls";
import {
  ZoomButton,
  ZoomControlContainer,
  ZoomIn,
  ZoomOut,
} from "../styled_components";
import { ZoomControlsProps } from "../../types";

function ZoomControls({ maxZoom = 18, minZoom = 16 }: ZoomControlsProps) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState<number>(map.getZoom());

  useMapEvent("zoomend", () => {
    setZoomLevel(map.getZoom());
  });

  return (
    <CustomControls useLeafletStyles={false} position="topleft">
      <ZoomControlContainer>
        <ZoomButton
          aria-disabled={zoomLevel === maxZoom}
          disabled={zoomLevel === maxZoom}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            map.zoomIn();
          }}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn aria-hidden="true"></ZoomIn>
        </ZoomButton>
        <ZoomButton
          aria-disabled={zoomLevel === minZoom}
          disabled={zoomLevel === minZoom}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            map.zoomOut();
          }}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut aria-hidden="true"></ZoomOut>
        </ZoomButton>
      </ZoomControlContainer>
    </CustomControls>
  );
}

export default ZoomControls;
