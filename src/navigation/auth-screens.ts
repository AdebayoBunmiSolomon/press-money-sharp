import { authScreenTypes } from "@src/types/types";
import * as Screen from "@src/screens/auth";
import { authScreenNames } from "./navigation-names";

export const authScreen: authScreenTypes[] = [
  {
    screenName: authScreenNames.AUTH_LOADER,
    component: Screen.AuthLoader,
  },
  // {
  //   screenName: authScreenNames.ONBOARDING,
  //   component: Screen.Onboarding,
  // },
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
    screenName: authScreenNames.VERIFY_EMAIL_FOR_PASSWORD_UPDATE,
    component: Screen.VerifyEmailForPasswordUpdate,
  },
  {
    screenName: authScreenNames.PASSWORD_UPDATE,
    component: Screen.PasswordUpdate,
  },
  {
    screenName: authScreenNames.VERIFY_EMAIL_FOR_SIGN_UP,
    component: Screen.VerifyEmailForSignUp,
  },
];
