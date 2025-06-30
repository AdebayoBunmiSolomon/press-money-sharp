import { lisTypes } from "@src/types/types";

export const profileList: lisTypes = [
  {
    title: "Your Activity",
    subMenu: ["Wishlist", "Recently Viewed"],
  },
  {
    title: "Notifications",
    subMenu: ["Push Notification", "Email Notification", "Chat"],
    notification: true,
  },
  {
    title: "About Us",
    subMenu: ["Privacy Policy", "Terms and Condition", "Rate us on App Store"],
  },
];
