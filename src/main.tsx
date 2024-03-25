import { Global, css, ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "jotai";

import "@csstools/normalize.css/normalize.css";
import "leaflet/dist/leaflet.css";

import { theme } from "./theme";
import App from "./components/App";
import { ORSAPIEndpointAtom, ORSAPIKeyAtom } from "./atoms";
import { ConfigContext } from "./services/configContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ORSAPIKey = import.meta.env.VITE_ORS_API_KEY;
const ORSAPIEndpoint = import.meta.env.VITE_ORS_API_ENDPOINT;

const config = {
  title: "Queer Walk: 2SLGBTQAI+ Windsor Walking Tour",
  logo: {
    src: "/main_logo.png",
    alt: "Queer Walk logo",
  },
};

root.render(
  <React.StrictMode>
    <Global
      styles={[
        "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')",
        "@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab:wght@700&display=swap')",
        css`
          body {
            margin: 0;
            background-color: ${theme.colors.secondary};
            font-family: "Roboto", sans-serif;
            height: 100%;
            overflow-x: hidden;
          }
          h1,
          h2,
          h3,
          h4 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          ,
          a {
            cursor: pointer;
          }
          ,
          #root {
            height: 100vh;
          }
        `,
      ]}
    />
    <Provider
      initialValues={[
        [ORSAPIKeyAtom, ORSAPIKey],
        [ORSAPIEndpointAtom, ORSAPIEndpoint],
      ]}
    >
      <ThemeProvider theme={theme}>
        <ConfigContext.Provider value={config}>
          <App />
        </ConfigContext.Provider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
