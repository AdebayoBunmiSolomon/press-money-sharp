import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { appScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { Wishlist } from "../Wishlist";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const WishlistStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen
        name={appScreenNames.WISH_LIST}
        component={Wishlist}
      />
    </ScreenStack.Navigator>
  );
};
