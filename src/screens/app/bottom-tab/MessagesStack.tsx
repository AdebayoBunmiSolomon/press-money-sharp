import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { appScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import * as MessagesScreen from "../../app";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const MessagesStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen
        name={appScreenNames.MESSAGES}
        component={MessagesScreen.Messages}
      />
    </ScreenStack.Navigator>
  );
};
