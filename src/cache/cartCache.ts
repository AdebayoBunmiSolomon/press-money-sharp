import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";

export type cartTypes = {
  id: number;
  uuid: string;
  image: ImageSourcePropType;
  price: any;
  title: string;
  number: number;
};

interface ICartCacheProps {
  cart: cartTypes[];
  addOrRemoveFromCart: (data: cartTypes[]) => void;
  clearCart: () => void;
}

export const useCartCache = create<ICartCacheProps>()(
  persist(
    (set) => ({
      cart: [],
      addOrRemoveFromCart: (cartData) => set({ cart: cartData }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-cache",
      storage: createJSONStorage(() => AsyncStorage), // ✅ the correct way
    }
  )
);
