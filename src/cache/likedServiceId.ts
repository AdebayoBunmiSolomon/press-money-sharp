import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ILikedServicesCache {
  likedServiceId: number[];
  addLikedServiceIdToCache: (ids: number[]) => void;
  clearLikedServiceIdFromCache: () => void;
}

export const useLikedServicesIdCache = create<ILikedServicesCache>()(
  persist(
    (set) => ({
      likedServiceId: [],
      addLikedServiceIdToCache: (ids) => set({ likedServiceId: ids }),
      clearLikedServiceIdFromCache: () => set({ likedServiceId: [] }),
    }),
    {
      name: "liked-services-id-cache",
      storage: createJSONStorage(() => AsyncStorage), // ✅ the correct way
    }
  )
);
