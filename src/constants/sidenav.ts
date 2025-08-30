import { lisTypes } from "@src/types/types";

export const sideNav: lisTypes = [
  {
    title: "Home",
    subMenu: [
      {
        list: "Category Listing",
        toggle: false,
        show: true,
      },
    ],
  },
  {
    title: "Services",
    subMenu: [
      {
        list: "Car Sales (Tokunbo and Naija Used)",
        toggle: false,
        show: true,
      },
      {
        list: "Car Hire (Personal, Commercial and Logistics)",
        toggle: false,
        show: true,
      },
      {
        list: "Car/Spare Parts",
        toggle: false,
        show: true,
      },
      {
        list: "Consultation Services",
        toggle: false,
        show: true,
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
        show: true,
      },
      {
        list: "Recently Viewed",
        toggle: false,
        show: true,
      },
      {
        list: "Cart",
        toggle: false,
        show: false,
      },
    ],
  },
];
