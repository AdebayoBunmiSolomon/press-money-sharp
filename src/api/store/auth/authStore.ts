import { create } from "zustand";

type userDataType = {
  uuid: string;
  first_name: string;
  last_name: string;
  referred_by: null | string | any;
  referral_code: string;
  gender: string;
  profile_img: string;
  email: string;
  phone: string;
  address: null | string | any;
  dob: string;
  email_verified_at: string;
  login_at: string;
  is_admin: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  token: string;
};

interface IAuthStoreProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userData: userDataType;
  setUserData: (value: userDataType) => void;
}

export const useAuthStore = create<IAuthStoreProps>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) =>
    set({ isAuthenticated: isAuthenticated }),
  userData: {
    uuid: "",
    first_name: "",
    last_name: "",
    referred_by: null,
    referral_code: "",
    gender: "",
    profile_img: "",
    email: "",
    phone: "",
    address: null,
    dob: "",
    email_verified_at: "",
    login_at: "",
    is_admin: false,
    status: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
    token: "",
  },
  setUserData: (userData) => set({ userData: userData }),
}));
