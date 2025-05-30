import { colors } from "@src/resources/color/color";

export const useCustomButton = () => {
  const getButtonColor = (
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
    getButtonColor,
  };
};
