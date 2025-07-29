import { apiGetUserReferralResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserReferralProps {
  userReferral: apiGetUserReferralResponse | {};
  setUserReferral: (data: apiGetUserReferralResponse | {}) => void;
}

export const useUserReferralStore = create<IUserReferralProps>((set) => ({
  userReferral: {},
  setUserReferral: (userReferral) => set({ userReferral: userReferral }),
}));
