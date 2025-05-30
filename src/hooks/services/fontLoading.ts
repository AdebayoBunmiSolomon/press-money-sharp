import { useState } from "react";
import * as Fonts from "expo-font";

export const useFontLoading = () => {
  const [isFontLoadingComplete, setIsFontLoadingComplete] =
    useState<boolean>(false);

  const loadResourcesAndDataAsync = async () => {
    setIsFontLoadingComplete(false);
    try {
      await Fonts.loadAsync({
        bold: require("../../../assets/fonts/ClashGrotesk-Bold.ttf"),
        semi_bold: require("../../../assets/fonts/ClashGrotesk-Semibold.ttf"),
        light: require("../../../assets/fonts/ClashGrotesk-Light.ttf"),
        extra_light: require("../../../assets/fonts/ClashGrotesk-Extralight.ttf"),
        medium: require("../../../assets/fonts/ClashGrotesk-Medium.ttf"),
        regular: require("../../../assets/fonts/ClashGrotesk-Regular.ttf"),
        variable: require("../../../assets/fonts/ClashGrotesk-Variable.ttf"),
      });
    } catch (error) {
      console.warn(error);
      setIsFontLoadingComplete(false);
    } finally {
      setIsFontLoadingComplete(true);
    }
  };

  return {
    loadResourcesAndDataAsync,
    isFontLoadingComplete,
  };
};
