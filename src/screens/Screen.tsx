import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IScreenProps {
  bgColor?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

export const Screen: React.FC<IScreenProps> = ({
  bgColor,
  children,
  style,
  safeArea,
}) => {
  return (
    <>
      {safeArea ? (
        <SafeAreaView
          style={[styles.container, { backgroundColor: bgColor }, style]}>
          {children && children}
        </SafeAreaView>
      ) : (
        <View style={[styles.container, { backgroundColor: bgColor }, style]}>
          {children && children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5.5),
  },
});
