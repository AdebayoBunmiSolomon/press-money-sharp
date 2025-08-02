import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";
import { showFlashMsg } from "@src/helper/ui-utils";

export type cartItemTypes = {
  id: number;
  uuid: string;
  image: ImageSourcePropType;
  price: number; // keep this as unit price
  title: string;
  quantity: number;
};

interface CartState {
  cart: cartItemTypes[];

  addToCart: (item: cartItemTypes) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartCache = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: cartItemTypes) => {
        const cart = get().cart;
        const exists = cart.find((i) => i.id === item.id);

        if (exists) {
          showFlashMsg({
            title: "Add Error",
            msgType: "ERROR",
            description: "Product already in cart",
          });
          return;
        }

        set({ cart: [...cart, item] });

        showFlashMsg({
          title: "Add Successful",
          msgType: "SUCCESS",
          description: "Product added to cart successfully",
        });
      },

      incrementQuantity: (id: number) => {
        const updatedCart = get().cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({ cart: updatedCart });
      },

      decrementQuantity: (id: number) => {
        const updatedCart = get().cart.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        );
        set({ cart: updatedCart });
      },

      removeFromCart: (id: number) => {
        const newCart = get().cart.filter((item) => item.id !== id);
        set({ cart: newCart });
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
