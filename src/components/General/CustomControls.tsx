import { createPortal } from "react-dom";
import { useEffect, useRef, forwardRef } from "react";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import type { ControlOptions } from "leaflet";

type ControlProps = ControlOptions & { useLeafletStyles?: boolean };

type ChildrenProp = { children: React.ReactNode } & ControlProps;

function createControlContainer({
  useLeafletStyles = true,
  ...props
}: ControlProps): Control {
  // Any here becuase the types for leaflet have not been updated.
  // It's a work around until v1.8 is released
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const CenterMarkerControl = Control.extend<any>({
    onAdd() {
      const container = DomUtil.create("div", "");
      if (useLeafletStyles) {
        DomUtil.addClass(container, "leaflet-bar leaflet-control");
      }
      return container;
    },
  });
  return new CenterMarkerControl({ ...props });
}

const ControlContainer = createControlComponent<Control, ControlProps>(
  createControlContainer
);

const ControlWrapper = forwardRef<Control>((props: ControlProps, ref) => {
  return <ControlContainer ref={ref} {...props} />;
});
ControlWrapper.displayName = "ControlWrapper";

const ControlPortal = ({
  root,
  children,
}: { root: HTMLDivElement } & ChildrenProp) => {
  return createPortal(children, root);
};

function CustomControls({ children, ...props }: ChildrenProp) {
  const centerToRef = useRef<Control | null>(null);
  const controlElementRef = useRef(document.createElement("div"));

  useEffect(() => {
    const container = centerToRef.current?.getContainer();
    if (container) {
      container.appendChild(controlElementRef.current);
    }
    return () => {
      controlElementRef.current.remove();
    };
  }, [centerToRef.current, controlElementRef.current]);

  return (
    <>
      <ControlWrapper ref={centerToRef} {...props} />
      <ControlPortal root={controlElementRef.current}>{children}</ControlPortal>
    </>
  );
}

export default CustomControls;
