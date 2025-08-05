import { apiGetSettingsResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IGetSettingsProps {
  settings: apiGetSettingsResponse[];
  setSettings: (data: apiGetSettingsResponse[]) => void;
}

export const useSettingsStore = create<IGetSettingsProps>((set) => ({
  settings: [],
  setSettings: (settings) => set({ settings: settings }),
}));
