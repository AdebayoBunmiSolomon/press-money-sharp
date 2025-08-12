import { apiGetTermsAndConditionsStoreResponse } from "@src/api/types/app";
import { create } from "zustand";

interface ITermsAndConditionsProps {
  termsAndConditions: apiGetTermsAndConditionsStoreResponse[] | [];
  setTermsAndConditions: (
    data: apiGetTermsAndConditionsStoreResponse[] | []
  ) => void;
}

export const useTermsAndConditionsStore = create<ITermsAndConditionsProps>(
  (set) => ({
    termsAndConditions: [],
    setTermsAndConditions: (termsAndConditions) =>
      set({ termsAndConditions: termsAndConditions }),
  })
);
