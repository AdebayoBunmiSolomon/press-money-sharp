import React from "react";
import { Platform, StatusBar as RNStatusBar, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";

interface ICommonStatusBarProps {
  style: "light" | "dark";
  bgColor: string;
}

export const CommonStatusBar: React.FC<ICommonStatusBarProps> = ({
  style,
  bgColor,
}) => {
  const statusBarHeight =
    Platform.OS === "ios"
      ? Constants.statusBarHeight
      : RNStatusBar.currentHeight || 0;

  return (
    <>
      <View style={{ height: statusBarHeight, backgroundColor: bgColor }} />
      <ExpoStatusBar style={style} translucent />
    </>
  );
};
