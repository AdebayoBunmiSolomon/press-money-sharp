import { apiGetUserNotificationsResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserNotificationsProps {
  userNotifications: apiGetUserNotificationsResponse[] | undefined;
  setUserNotifications: (
    data: apiGetUserNotificationsResponse[] | undefined
  ) => void;
}

export const useUserNotificationsStore = create<IUserNotificationsProps>(
  (set) => ({
    userNotifications: [],
    setUserNotifications: (userNotifications) =>
      set({ userNotifications: userNotifications }),
  })
);
