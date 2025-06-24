import { appScreenTypes } from "@src/types/types";
import { appScreenNames } from "./navigation-names";
import { BottomTabStack } from "@src/router/bottom-tab-stack";
import { CarDetails } from "@src/screens/app";

export const appScreen: appScreenTypes[] = [
  {
    screenName: appScreenNames.BOTTOM_TAB_STACK,
    component: BottomTabStack,
  },
  {
    screenName: appScreenNames.CAR_DETAILS,
    component: CarDetails,
  },
];
