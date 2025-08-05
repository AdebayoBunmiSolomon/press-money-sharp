import { lisTypes } from "@src/types/types";

export const sideNav: lisTypes = [
  {
    title: "Home",
    subMenu: [
      {
        list: "Category Listing",
        toggle: false,
      },
    ],
  },
  {
    title: "Services",
    subMenu: [
      {
        list: "Car Sales (Tokunbo and Naija Used)",
        toggle: false,
      },
      {
        list: "Car Hire (Personal, Commercial and Logistics)",
        toggle: false,
      },
      {
        list: "Car/Spare Parts",
        toggle: false,
      },
      {
        list: "Consultation Services",
        toggle: false,
      },
      // {
      //   list: "Dealers Deal",
      //   toggle: false,
      // },
    ],
  },
  {
    title: "Activities",
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
        list: "Cart",
        toggle: false,
      },
    ],
  },
];
