import React, { useEffect, useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import { authScreen } from "@src/navigation/auth-screens";
import { AuthStorage } from "@src/helper/utils";
import { authScreenNames } from "@src/navigation";

const AuthScreenStack = createNativeStackNavigator<AuthStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const AuthStack = ({ isLoggingIn }: { isLoggingIn: boolean }) => {
  const authScreenLength = authScreen && authScreen.length;
  const [isUserLoggedInToDevice, setIsUserLoggedInToDevice] =
    useState<boolean>(false);
  useEffect(() => {
    const checkIfUserLoggedInToDevice = async () => {
      const { email, password } = await AuthStorage.getUserCredentials();
      if (email && password) {
        setIsUserLoggedInToDevice(true);
      } else {
        setIsUserLoggedInToDevice(false);
      }
    };
    checkIfUserLoggedInToDevice();
  }, []);

  return (
    <AuthScreenStack.Navigator screenOptions={headerOptions}>
      {isLoggingIn ? (
        <AuthScreenStack.Screen
          name={authScreenNames.AUTH_LOADER}
          component={authScreen[0].component}
        />
      ) : isUserLoggedInToDevice && isLoggingIn ? (
        <AuthScreenStack.Screen
          name={authScreenNames.AUTH_LOADER}
          component={authScreen[0].component}
        />
      ) : !isUserLoggedInToDevice && !isLoggingIn ? (
        authScreen &&
        authScreen
          .slice(1, authScreenLength)
          .map((screens, index) => (
            <AuthScreenStack.Screen
              name={screens.screenName}
              key={index}
              component={screens.component}
            />
          ))
      ) : (
        <AuthScreenStack.Screen
          name={authScreenNames.AUTH_LOADER}
          component={authScreen[0].component}
        />
      )}
    </AuthScreenStack.Navigator>
  );
};
