import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useCustomText } from "../hooks";
import { moderateScale } from "@src/resources/responsiveness";

export type textType =
  | "bold"
  | "semi-bold"
  | "light"
  | "extra-light"
  | "medium"
  | "regular"
  | "variable";

interface ICustomTextProps {
  children: React.ReactNode;
  size: number;
  type?: textType;
  red?: boolean;
  white?: boolean;
  lightBlack?: boolean;
  black?: boolean;
  lightGray?: boolean;
  danger?: boolean;
  style?: StyleProp<TextStyle>;
}

export const CustomText: React.FC<ICustomTextProps> = ({
  children,
  size,
  type,
  red,
  white,
  lightBlack,
  black,
  lightGray,
  danger,
  style,
}) => {
  const { getFontFamily, getTextColor } = useCustomText();
  const fontFamily = getFontFamily(type ? type : "regular");
  const textColor = getTextColor(
    red,
    white,
    lightBlack,
    black,
    lightGray,
    danger
  );
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily,
          fontSize: moderateScale(size),
          color: textColor,
        },
        style,
      ]}>
      {children && children}
    </Text>
  );
};
