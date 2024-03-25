import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      quinary: string;
      senary: string;
      septenary: string;
      octonary: string;
    };
  }
}
