import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export { screenWidth, screenHeight };

// Design reference size (Figma/Design)
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/**
 * Width percentage
 * Example: DVW(50) => 50% of screen width
 */
export const DVW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

/**
 * Height percentage
 * Example: DVH(50) => 50% of screen height
 */
export const DVH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};

/**
 * Scale based on screen width
 */
export const scaleSize = (size: number) => {
  if (Platform.OS === "ios") {
    return (screenWidth / guidelineBaseWidth) * size;
  } else {
    return (screenWidth / guidelineBaseWidth) * size - 2;
  }
};

/**
 * Scale based on screen height
 */
export const verticalScale = (size: number) => {
  if (Platform.OS === "ios") {
    return (screenHeight / guidelineBaseHeight) * size;
  } else {
    return (screenHeight / guidelineBaseHeight) * size - 2;
  }
};

/**
 * Moderate scaling
 * Prevents elements from scaling too aggressively
 */
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scaleSize(size) - size) * factor;
};

/**
 * Font normalization
 */
export const normalize = (size: number) => {
  const scale = screenWidth / 320;
  const newSize = size * scale;

  return Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
