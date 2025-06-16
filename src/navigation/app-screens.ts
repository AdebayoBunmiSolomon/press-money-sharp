import { appScreenTypes } from "@src/types/types";
import { appScreenNames } from "./navigation-names";
import { BottomTabStack } from "@src/router/bottom-tab-stack";

export const appScreen: appScreenTypes[] = [
  {
    screenName: appScreenNames.BOTTOM_TAB_STACK,
    component: BottomTabStack,
  },
];
