import { apiGetAllUserChatsResponse } from "@src/api/types/app";
import { create } from "zustand";

interface IAllUserChatsProps {
  allUserChats: apiGetAllUserChatsResponse[] | [];
  setAllUserChats: (data: apiGetAllUserChatsResponse[] | []) => void;
}

export const useAllUserChatsStore = create<IAllUserChatsProps>((set) => ({
  allUserChats: [],
  setAllUserChats: (allUserChats) => set({ allUserChats: allUserChats }),
}));
