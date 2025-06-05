import { authScreenTypes } from "@src/types/types";
import * as Screen from "@src/screens/auth";
import { authScreenNames } from "./navigation-names";

export const authScreen: authScreenTypes[] = [
  {
    screenName: authScreenNames.ONBOARDING,
    component: Screen.Onboarding,
  },
  {
    screenName: authScreenNames.LOGIN,
    component: Screen.Login,
  },
  {
    screenName: authScreenNames.SIGN_UP,
    component: Screen.SignUp,
  },
  {
    screenName: authScreenNames.PASSWORD_RESET,
    component: Screen.PasswordReset,
  },
  {
    screenName: authScreenNames.VERIFY_EMAIL,
    component: Screen.VerifyEmail,
  },
  {
    screenName: authScreenNames.PASSWORD_UPDATE,
    component: Screen.PasswordUpdate,
  },
];
