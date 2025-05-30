import { screenHeight, screenWidth } from "./Dimensions";

export const DVH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};

export const DVW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};
