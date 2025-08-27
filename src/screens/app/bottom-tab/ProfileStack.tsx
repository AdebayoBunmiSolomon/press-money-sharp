import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { appScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import * as ProfileScreen from "../../app";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const ProfileStack = () => {
  return (
    <ScreenStack.Navigator screenOptions={headerOptions}>
      <ScreenStack.Screen
        name={appScreenNames.PROFILE}
        component={ProfileScreen.Profile}
      />
      <ScreenStack.Screen
        name={appScreenNames.CONTACT_US}
        component={ProfileScreen.ContactUs}
      />
      <ScreenStack.Screen
        name={appScreenNames.REFERRALS}
        component={ProfileScreen.Referrals}
      />
      <ScreenStack.Screen
        name={appScreenNames.UPDATE_PROFILE}
        component={ProfileScreen.UpdateProfile}
      />
      <ScreenStack.Screen
        name={appScreenNames.TERMS_AND_CONDITIONS}
        component={ProfileScreen.TermsAndConditions}
      />
      <ScreenStack.Screen
        name={appScreenNames.COUPON}
        component={ProfileScreen.Coupon}
      />
    </ScreenStack.Navigator>
  );
};
