import { apiGetUserPreferencesResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IUserPreferencesProps {
  userPreferences: apiGetUserPreferencesResponse[] | [];
  setUserPreferences: (_data: apiGetUserPreferencesResponse[] | []) => void;
}

export const useUserPreferencesStore = create<IUserPreferencesProps>((set) => ({
  userPreferences: [],
  setUserPreferences: (userPreferences) =>
    set({ userPreferences: userPreferences }),
}));
