import { appScreenTypes } from "@src/types/types";
import { appScreenNames } from "./navigation-names";
import { BottomTabStack } from "@src/router/bottom-tab-stack";
import { CarDetails, CheckOut, MyCart, RecentlyViewed } from "@src/screens/app";

export const appScreen: appScreenTypes[] = [
  {
    screenName: appScreenNames.BOTTOM_TAB_STACK,
    component: BottomTabStack,
  },
  {
    screenName: appScreenNames.CAR_DETAILS,
    component: CarDetails,
  },
  {
    screenName: appScreenNames.RECENTLY_VIEWED,
    component: RecentlyViewed,
  },
  {
    screenName: appScreenNames.MY_CART,
    component: MyCart,
  },
  {
    screenName: appScreenNames.CHECKOUT,
    component: CheckOut,
  },
];
