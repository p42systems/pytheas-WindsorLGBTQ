// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.checkForGeoLocationAPI": {
      type: "done.invoke.checkForGeoLocationAPI";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.checkWithinBounds": {
      type: "done.invoke.checkWithinBounds";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.fetchBoundingBox": {
      type: "done.invoke.fetchBoundingBox";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.checkForGeoLocationAPI": {
      type: "error.platform.checkForGeoLocationAPI";
      data: unknown;
    };
    "error.platform.checkWithinBounds": {
      type: "error.platform.checkWithinBounds";
      data: unknown;
    };
    "error.platform.fetchBoundingBox": {
      type: "error.platform.fetchBoundingBox";
      data: unknown;
    };
    "xstate.after(10000)#BoundingBox.running.waitToSendNewLocation": {
      type: "xstate.after(10000)#BoundingBox.running.waitToSendNewLocation";
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    checkForGeoLocationAPI: "done.invoke.checkForGeoLocationAPI";
    checkWithinBounds: "done.invoke.checkWithinBounds";
    fetchBoundingBox: "done.invoke.fetchBoundingBox";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    checkForGeoLocationAPI: "xstate.init";
    checkWithinBounds: "CHECK_BOUNDS" | "SET_LOCATION";
    fetchBoundingBox: "done.invoke.checkForGeoLocationAPI";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "checkingForGeoLocationAPI"
    | "fetchingBoundingBox"
    | "noBoundingBox"
    | "noGeoSupport"
    | "restartWatchLocation"
    | "running"
    | "running.canSendLocation"
    | "running.checkingBoundingBox"
    | "running.init"
    | "running.inside"
    | "running.outside"
    | "running.waitToSendNewLocation"
    | "unknownLocation"
    | {
        running?:
          | "canSendLocation"
          | "checkingBoundingBox"
          | "init"
          | "inside"
          | "outside"
          | "waitToSendNewLocation";
      };
  tags: never;
}
