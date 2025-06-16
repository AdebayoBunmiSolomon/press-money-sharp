import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { Categories } from "../Categories";
import { appScreenNames } from "@src/navigation";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const CategoriesStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen
        name={appScreenNames.CATEGORIES}
        component={Categories}
      />
    </ScreenStack.Navigator>
  );
};
