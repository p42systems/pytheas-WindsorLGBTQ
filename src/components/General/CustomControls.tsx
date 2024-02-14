import { createPortal } from "react-dom";
import { useEffect, useRef, forwardRef } from "react";
import { createControlComponent } from "@react-leaflet/core";
import { Control } from "leaflet";
import { createControlContainer } from "../../services/cards";
import { ControlProps, ChildrenProp } from "../../types";

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
