import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

type keyboardDismissalProps = {
  children: React.ReactNode;
};

export const KeyboardDismissal: React.FC<keyboardDismissalProps> = ({
  children,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
