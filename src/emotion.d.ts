import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      headerBackground: string;
      background: string;
      contentButton: string;
      tourButton: string;
      accent: string;
      suggestedMarker: string;
      darkAccent: string;
    };
  }
}
