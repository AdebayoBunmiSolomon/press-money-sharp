import { apiGetUserWishListResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserWishListProps {
  userWishList: apiGetUserWishListResponse[] | undefined;
  setUserWishList: (data: apiGetUserWishListResponse[] | undefined) => void;
}

export const useUserWishListStore = create<IUserWishListProps>((set) => ({
  userWishList: [],
  setUserWishList: (userWishList) => set({ userWishList: userWishList }),
}));
