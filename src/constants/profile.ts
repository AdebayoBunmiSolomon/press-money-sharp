import { lisTypes } from "@src/types/types";
import { Platform } from "react-native";

export const profileList: lisTypes = [
  {
    title: "Your Activity",
    subMenu: [
      {
        list: "Wishlist",
        toggle: false,
        show: true,
      },
      {
        list: "Recently Viewed",
        toggle: false,
        show: true,
      },
      {
        list: "Referrals",
        toggle: false,
        show: true,
      },
      {
        list: "Coupon",
        toggle: false,
        show: true,
      },
      {
        list: "Delete Account",
        toggle: false,
        show: false,
      },
    ],
  },
  {
    title: "Preferences",
    subMenu: [
      {
        list: "Push Notification",
        toggle: true,
        show: false,
      },
      {
        list: "Email Notification",
        toggle: true,
        show: true,
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
        show: true,
      },
      {
        list: `Rate us on ${
          Platform.OS === "ios" ? "App Store" : "Play Store"
        }`,
        toggle: false,
        show: false,
      },
      // {
      //   list: "Referrals",
      //   toggle: false,
      // },
      {
        list: "Contact Us",
        toggle: false,
        show: true,
      },
      // {
      //   list: "Coupon",
      //   toggle: false,
      // },
    ],
  },
];
