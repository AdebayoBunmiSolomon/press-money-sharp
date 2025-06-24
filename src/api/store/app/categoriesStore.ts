import { create } from "zustand";

interface ICategoriesProps {
  categories: string[] | undefined;
  setCategories: (data: string[] | undefined) => void;
}

export const useCategoriesStore = create<ICategoriesProps>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories: categories }),
}));
