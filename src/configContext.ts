import { createContext } from "react";

interface Config {
  title: string;
  logo: {
    src: string;
    alt: string;
  };
}

export const ConfigContext = createContext<Config>({} as Config);
