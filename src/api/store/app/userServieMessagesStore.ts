import { apiGetUserServiceMessagesResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserServiceMessagesProps {
  userServiceMessages: apiGetUserServiceMessagesResponse[] | [];
  setUserServiceMessages: (
    data: apiGetUserServiceMessagesResponse[] | []
  ) => void;
}

export const useUserServiceMessagesStore = create<IUserServiceMessagesProps>(
  (set) => ({
    userServiceMessages: [],
    setUserServiceMessages: (userServiceMessages) =>
      set({ userServiceMessages: userServiceMessages }),
  })
);
