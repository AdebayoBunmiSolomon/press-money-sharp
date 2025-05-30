import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { Text } from "react-native";

export const Login = ({}: AuthScreenProps<authScreenNames.LOGIN>) => {
  return (
    <Screen style={{}} bgColor=''>
      <Text>Login screen</Text>
    </Screen>
  );
};
