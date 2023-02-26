import { whichEnv } from "../utils/env-helper";
const currentEnvironment = whichEnv();

const PATHS = {
  DOMAIN:
    currentEnvironment === "development"
      ? "http://localhost:3008/"
      : "https://spot-finder.vercel.app/",
  home: "/",
  NEW_SPOT: "spots/newSpot",
};

export default PATHS;
