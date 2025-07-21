import {
  apiGetAllServicesResponse,
  apiGetSettingsResponse,
} from "@src/api/types/app";
import { create } from "zustand";

interface IGetSettingsProps {
  settings: apiGetSettingsResponse[] | undefined;
  setSettings: (data: apiGetSettingsResponse[] | undefined) => void;
}

export const useSettingsStore = create<IGetSettingsProps>((set) => ({
  settings: [],
  setSettings: (settings) => set({ settings: settings }),
}));
