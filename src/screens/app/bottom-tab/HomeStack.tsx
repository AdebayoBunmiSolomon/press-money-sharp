import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { appScreenNames } from "@src/navigation";
import * as HomeScreen from "../../app";
import { Platform } from "react-native";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const HomeStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen
        name={appScreenNames.HOME}
        component={HomeScreen.Home}
      />
      <ScreenStack.Screen
        name={appScreenNames.SIDE_NAV}
        component={HomeScreen.SideNav}
        options={{
          animation:
            Platform.OS === "ios" ? "ios_from_right" : "slide_from_right",
          autoHideHomeIndicator: true,
        }}
      />
    </ScreenStack.Navigator>
  );
};
