import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import React from "react";
import { appScreen } from "@src/navigation";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

const Screen = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      {appScreen &&
        appScreen.map((screen, index) => (
          <ScreenStack.Screen
            name={screen.screenName}
            key={index}
            component={screen.component}
          />
        ))}
    </ScreenStack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <>
      <Screen />
    </>
  );
};
