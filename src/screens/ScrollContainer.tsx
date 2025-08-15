import { colors } from "@src/resources/color/color";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";

interface IScrollContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
  onPullRefresh?: () => void;
  refreshing?: boolean;
}

export const ScrollContainer: React.FC<IScrollContainerProps> = ({
  children,
  style,
  vertical,
  onPullRefresh,
  refreshing,
}) => {
  return (
    <KeyboardAvoidingView
      style={[{ height: "100%" }, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onPullRefresh}
            colors={[colors.red]} // Android spinner color
            tintColor={colors.lightGray} // iOS spinner color
          />
        }
        horizontal={vertical ? true : false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style}>
        {children && children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
