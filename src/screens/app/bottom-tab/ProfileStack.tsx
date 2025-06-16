import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { appScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { Profile } from "../Profile";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const ProfileStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen name={appScreenNames.PROFILE} component={Profile} />
    </ScreenStack.Navigator>
  );
};
