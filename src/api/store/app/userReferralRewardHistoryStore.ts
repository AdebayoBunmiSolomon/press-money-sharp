import { apiGetUserReferralRewardHistoryResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserReferralRewardHistoryProps {
  userReferralRewardHistory: apiGetUserReferralRewardHistoryResponse | {};
  setUserReferralRewardHistory: (
    data: apiGetUserReferralRewardHistoryResponse | {}
  ) => void;
}

export const useUserReferralRewardHistoryStore =
  create<IUserReferralRewardHistoryProps>((set) => ({
    userReferralRewardHistory: {},
    setUserReferralRewardHistory: (userReferralRewardHistory) =>
      set({ userReferralRewardHistory: userReferralRewardHistory }),
  }));
