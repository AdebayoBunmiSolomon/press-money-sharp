import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IRecentlyViewedServicesCache {
  recentlyViewedServiceId: number[];
  addRecentlyViewedServiceIdToCache: (ids: number[]) => void;
  clearRecentlyViewedServiceIdFromCache: () => void;
}

export const useRecentlyViewedServicesIdCache =
  create<IRecentlyViewedServicesCache>()(
    persist(
      (set) => ({
        recentlyViewedServiceId: [],
        addRecentlyViewedServiceIdToCache: (ids) =>
          set({ recentlyViewedServiceId: ids }),
        clearRecentlyViewedServiceIdFromCache: () =>
          set({ recentlyViewedServiceId: [] }),
      }),
      {
        name: "recently-viewed-services-id-cache",
        storage: createJSONStorage(() => AsyncStorage), // ✅ the correct way
      }
    )
  );
