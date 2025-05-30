import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { Text } from "react-native";

export const SignUp = ({}: AuthScreenProps<authScreenNames.SIGN_UP>) => {
  return (
    <Screen style={{}} bgColor=''>
      <Text>SignUp screen</Text>
    </Screen>
  );
};
