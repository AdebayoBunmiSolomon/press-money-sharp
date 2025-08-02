import { create } from "zustand";

interface IPickupTabStoreProps {
  paymentMode: "Online" | "Others" | string;
  setPaymentMode: (value: "Online" | "Others" | string) => void;
  pickupAddress: string;
  setPickupAddress: (value: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (value: string) => void;
  PMS: string;
  setPMS: (value: string) => void;
}

export const usePickupTabStore = create<IPickupTabStoreProps>((set) => ({
  paymentMode: "Online",
  setPaymentMode: (paymentMode) => set({ paymentMode: paymentMode }),
  pickupAddress: "",
  setPickupAddress: (pickupAddress) => set({ pickupAddress: pickupAddress }),
  deliveryAddress: "",
  setDeliveryAddress: (deliveryAddress) =>
    set({ deliveryAddress: deliveryAddress }),
  PMS: "",
  setPMS: (PMS) => set({ PMS: PMS }),
}));
