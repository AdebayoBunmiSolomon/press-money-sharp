import React from "react";
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

type keyboardDismissalProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const KeyboardDismissal: React.FC<keyboardDismissalProps> = ({
  children,
  style,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
