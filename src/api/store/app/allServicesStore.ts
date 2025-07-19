import { apiGetAllServicesResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IAllServicesProps {
  allServices: apiGetAllServicesResponse[] | undefined;
  setAllServices: (data: apiGetAllServicesResponse[] | undefined) => void;
}

export const useAllServicesStore = create<IAllServicesProps>((set) => ({
  allServices: [],
  setAllServices: (allServices) => set({ allServices: allServices }),
}));
