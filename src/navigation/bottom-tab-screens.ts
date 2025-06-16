import { bottomTabScreenTypes } from "@src/types/types";
import { bottomTabScreenNames } from "./navigation-names";
import * as Screen from "@src/screens/app/bottom-tab";

export const bottomTabScreens: bottomTabScreenTypes[] = [
  {
    screenName: bottomTabScreenNames.HOME_STACK,
    component: Screen.HomeStack,
  },
  {
    screenName: bottomTabScreenNames.CATEGORIES_STACK,
    component: Screen.CategoriesStack,
  },
  {
    screenName: bottomTabScreenNames.WISH_LIST_STACK,
    component: Screen.WishlistStack,
  },
  {
    screenName: bottomTabScreenNames.MESSAGES_STACK,
    component: Screen.MessagesStack,
  },
  {
    screenName: bottomTabScreenNames.PROFILE_STACK,
    component: Screen.ProfileStack,
  },
];
