import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { Text } from "react-native";

export const PasswordReset =
  ({}: AuthScreenProps<authScreenNames.PASSWORD_RESET>) => {
    return (
      <Screen style={{}} bgColor=''>
        <Text>Password Reset Screen</Text>
      </Screen>
    );
  };
