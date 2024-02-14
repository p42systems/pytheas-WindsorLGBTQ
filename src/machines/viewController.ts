import { assign, createMachine, send, spawn } from "xstate";
import { stop } from "xstate/lib/actions";
import {
  ViewControllerContext,
  NewLocationEvent,
  InitialLocationEvent,
  SetHighAccuracyEvent,
  ViewControllerEvents,
} from "../types";
import { boundingBoxMachine } from "./boundingBox";

export const viewControllerMachine = createMachine(
  {
    tsTypes: {} as import("./viewController.typegen").Typegen0,
    schema: {
      context: {} as ViewControllerContext,
      events: {} as ViewControllerEvents,
    },
    id: "ViewController",
    initial: "starting",
    context: {
      boundingBoxRef: null,
      userLocation: null,
      savedUserLocation: null,
      enableHighAccuracy: false,
    },
    states: {
      starting: {
        entry: [
          assign((context: ViewControllerContext) => ({
            boundingBoxRef: spawn(
              boundingBoxMachine.withContext({
                watchLocationRef: null,
                enableHighAccuracy: context.enableHighAccuracy,
                boundingBox: null,
                userLocation: null,
              }),
              "boundingBox"
            ),
          })),
        ],
        on: {
          INITIAL_LOCATION: {
            actions: assign((_context, event: InitialLocationEvent) => ({
              userLocation: event.userLocation,
              savedUserLocation: event.userLocation,
            })),
          },
          NO_GEO_SUPPORT: {
            target: "noUserLocation",
          },
          UNKNOWN_LOCATION: {
            target: "noUserLocation",
          },
          NO_BOUNDING_BOX: {
            target: "noBoundingBox",
          },
          INSIDE_OF_BOUNDS: {
            target: "withinBounds",
          },
          OUT_OF_BOUNDS: {
            target: "outsideBounds",
          },
        },
      },
      noBoundingBox: {
        entry: [stop("BoundingBox")],
        type: "final",
      },
      noUserLocation: {
        entry: [stop("BoundingBox")],
        type: "final",
      },
      withinBounds: {
        on: {
          CHECK_BOUNDS: {
            actions: send<ViewControllerContext, { type: "CHECK_BOUNDS" }>(
              { type: "CHECK_BOUNDS" },
              { to: "boundingBox" }
            ),
          },
          TOGGLE_HIGH_ACCURACY: {
            actions: [
              send<ViewControllerContext, { type: "TOGGLE_HIGH_ACCURACY" }>(
                { type: "TOGGLE_HIGH_ACCURACY" },
                { to: "boundingBox" }
              ),
            ],
          },
          SAVE_USER_LOCATION: {
            actions: assign((context: ViewControllerContext) => ({
              savedUserLocation: context.userLocation,
            })),
          },
          SET_HIGH_ACCURACY: {
            actions: assign((_context, event: SetHighAccuracyEvent) => ({
              enableHighAccuracy: event.highAccuracy,
            })),
          },
          NEW_LOCATION: {
            actions: assign((_context, event: NewLocationEvent) => ({
              userLocation: event.userLocation,
            })),
          },
          INSIDE_OF_BOUNDS: {
            target: "withinBounds",
          },
          OUT_OF_BOUNDS: {
            target: "outsideBounds",
          },
        },
      },
      outsideBounds: {
        on: {
          CHECK_BOUNDS: {
            actions: send<ViewControllerContext, { type: "CHECK_BOUNDS" }>(
              { type: "CHECK_BOUNDS" },
              { to: "boundingBox" }
            ),
          },
          NEW_LOCATION: {
            actions: assign((_context, event: NewLocationEvent) => ({
              userLocation: event.userLocation,
              savedUserLocation: event.userLocation,
            })),
          },
          INSIDE_OF_BOUNDS: {
            target: "withinBounds",
          },
          OUT_OF_BOUNDS: {
            target: "outsideBounds",
          },
        },
      },
    },
  },
  {
    services: {},
    actions: {},
    guards: {},
  }
);
