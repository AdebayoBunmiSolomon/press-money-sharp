import { useState } from "react";
import * as Fonts from "expo-font";

export const useFontLoading = () => {
  const [isFontLoadingComplete, setIsFontLoadingComplete] =
    useState<boolean>(false);

  const loadResourcesAndDataAsync = async () => {
    setIsFontLoadingComplete(false);
    try {
      await Fonts.loadAsync({
        bold: require("../../../assets/fonts/Poppins-Bold.ttf"),
        semi_bold: require("../../../assets/fonts/Poppins-SemiBold.ttf"),
        light: require("../../../assets/fonts/Poppins-Light.ttf"),
        extra_light: require("../../../assets/fonts/Poppins-Light.ttf"),
        medium: require("../../../assets/fonts/Poppins-Medium.ttf"),
        regular: require("../../../assets/fonts/Poppins-Regular.ttf"),
        variable: require("../../../assets/fonts/Poppins-Bold.ttf"),
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
