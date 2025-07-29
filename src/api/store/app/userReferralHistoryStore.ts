import { apiGetUserReferralHistoryResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserReferralHistoryProps {
  userReferralHistory: apiGetUserReferralHistoryResponse | {};
  setUserReferralHistory: (
    data: apiGetUserReferralHistoryResponse | {}
  ) => void;
}

export const useUserReferralHistoryStore = create<IUserReferralHistoryProps>(
  (set) => ({
    userReferralHistory: {},
    setUserReferralHistory: (userReferralHistory) =>
      set({ userReferralHistory: userReferralHistory }),
  })
);
