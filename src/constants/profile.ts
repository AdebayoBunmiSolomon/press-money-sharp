import { lisTypes } from "@src/types/types";
import { Platform } from "react-native";

export const profileList: lisTypes = [
  {
    title: "Your Activity",
    subMenu: [
      {
        list: "Wishlist",
        toggle: false,
      },
      {
        list: "Recently Viewed",
        toggle: false,
      },
      {
        list: "Referrals",
        toggle: false,
      },
      {
        list: "Coupon",
        toggle: false,
      },
    ],
  },
  {
    title: "Preferences",
    subMenu: [
      {
        list: "Push Notification",
        toggle: true,
      },
      {
        list: "Email Notification",
        toggle: true,
      },
      // {
      //   list: "Chat",
      //   toggle: true,
      // },
    ],
  },
  {
    title: "About Us",
    subMenu: [
      // {
      //   list: "Privacy Policy",
      //   toggle: false,
      // },
      {
        list: "Terms and Condition",
        toggle: false,
      },
      {
        list: `Rate us on ${
          Platform.OS === "ios" ? "App Store" : "Play Store"
        }`,
        toggle: true,
      },
      // {
      //   list: "Referrals",
      //   toggle: false,
      // },
      {
        list: "Contact Us",
        toggle: false,
      },
      // {
      //   list: "Coupon",
      //   toggle: false,
      // },
    ],
  },
];
