import { colors } from "@src/resources/color/color";
import { fontFamily } from "@src/resources/fonts/font-family";
import { textType } from "../text/CustomText";

export const useCustomText = () => {
  const getFontFamily = (type: textType) => {
    if (type === "bold") {
      return fontFamily.bold;
    } else if (type === "semi-bold") {
      return fontFamily.semi_bold;
    } else if (type === "light") {
      return fontFamily.light;
    } else if (type === "extra-light") {
      return fontFamily.extra_light;
    } else if (type === "medium") {
      return fontFamily.medium;
    } else if (type === "regular") {
      return fontFamily.regular;
    } else if (type === "variable") {
      return fontFamily.variable;
    }
  };

  const getTextColor = (
    red?: boolean,
    white?: boolean,
    lightBlack?: boolean,
    black?: boolean,
    lightGray?: boolean,
    danger?: boolean
  ) => {
    if (red) {
      return colors?.red;
    } else if (white) {
      return colors.white;
    } else if (lightBlack) {
      return colors.lightBlack;
    } else if (black) {
      return colors.black;
    } else if (lightGray) {
      return colors.lightGray;
    } else if (danger) {
      return colors.danger;
    }
  };

  return {
    getFontFamily,
    getTextColor,
  };
};
