import { createContext } from "react";

const StatisticsContext = createContext({
  aspectRatios: [],
  setAspectRatios: () => console.log("Failed to provide function"),
});

export default StatisticsContext;
