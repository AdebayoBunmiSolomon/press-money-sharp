import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { authScreen } from "@src/navigation/auth-screens";

const AuthScreenStack = createNativeStackNavigator<AuthStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const AuthStack = () => {
  return (
    <AuthScreenStack.Navigator screenOptions={headerOptions}>
      {authScreen &&
        authScreen.map((screens, index) => (
          <AuthScreenStack.Screen
            name={screens.screenName}
            key={index}
            component={screens.component}
          />
        ))}
    </AuthScreenStack.Navigator>
  );
};
