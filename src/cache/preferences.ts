import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IEmailNotificationPreferenceCache {
  isEmailSubscribed: boolean;
  setIsEmailSubScribed: (_value: boolean) => void;
}

export const useEmailNotificationPreferenceCache =
  create<IEmailNotificationPreferenceCache>()(
    persist(
      (set) => ({
        isEmailSubscribed: false,
        setIsEmailSubScribed: (value) => set({ isEmailSubscribed: value }),
      }),
      {
        name: "email-notification-cache",
        storage: createJSONStorage(() => AsyncStorage), // ✅ the correct way
      }
    )
  );
