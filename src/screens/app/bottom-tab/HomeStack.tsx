import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { Home } from "../Home";
import { appScreenNames } from "@src/navigation";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const HomeStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen name={appScreenNames.HOME} component={Home} />
    </ScreenStack.Navigator>
  );
};
