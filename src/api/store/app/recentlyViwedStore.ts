import { apiGetUserRecentlyViewedResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserRecentlyViewedProps {
  userRecentlyViewed: apiGetUserRecentlyViewedResponse[] | undefined;
  setUserRecentlyViewed: (
    data: apiGetUserRecentlyViewedResponse[] | undefined
  ) => void;
}

export const useRecentlyViewedStore = create<IUserRecentlyViewedProps>(
  (set) => ({
    userRecentlyViewed: [],
    setUserRecentlyViewed: (recentlyServiceViewed) =>
      set({ userRecentlyViewed: recentlyServiceViewed }),
  })
);
