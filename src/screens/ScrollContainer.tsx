import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";

interface IScrollContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  vertical?: boolean;
}

export const ScrollContainer: React.FC<IScrollContainerProps> = ({
  children,
  style,
  vertical,
}) => {
  return (
    <KeyboardAvoidingView
      style={[{ height: "100%" }, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}>
      <ScrollView
        horizontal={vertical ? true : false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style}>
        {children && children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
