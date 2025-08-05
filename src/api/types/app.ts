import { settingsType } from "@src/types/types";

export type apiGetAllServicesResponse = {
  id: number;
  uuid: string;
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: number;
  has_online_payment: boolean;
  description: string;
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | any;
  location: string;
};

export type apiViewServicesResponse = {
  id: number;
  uuid: string;
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: number;
  has_online_payment: boolean;
  description: string;
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | any;
  location: string;
};

export type apiSendMessage = {
  message: string;
  service: string; //service_uuid
};

export type apiGetSettingsResponse = {
  id: number;
  uuid: string;
  type: settingsType;
  value: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type apiGetUserNotificationsResponse = {
  id: number;
  uuid: string;
  user_id: number;
  notifiable_type: string;
  notifiable_id: number;
  title: string;
  content: string;
  is_global: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  notifiable: {
    id: number;
    uuid: string;
    user_id: number;
    code: string;
    waiver: string;
    is_used: boolean;
    expired_at: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    referred_by: string | null;
    referral_code: string;
    gender: string;
    profile_img: string;
    email: string;
    phone: string;
    address: string | null;
    dob: string;
    email_verified_at: string;
    login_at: string;
    is_admin: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
};

export type apiAddProductToWishList = {
  service_id: number;
};

export type apiDeleteProductFromWishlist = {
  wishList_uuid: string;
  service_id: number;
};

export type apiGetUserWishListResponse = {
  id: number;
  uuid: string;
  user_id: number;
  our_service_id: number;
  created_at: string;
  updated_at: string;
  service: null;
};

export type apiAddProductToRecentlyViewed = {
  service_id: number;
};

export type apiGetUserRecentlyViewedResponse = {
  id: number;
  uuid: string;
  user_id: number;
  our_service_id: number;
  created_at: string;
  updated_at: string;
  service: null;
};

export type apiDeleteFromRecentlyViewed = {
  recentlyViewed_uuid: string;
  service_id: number;
};

type apiGetUserReferral = {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  referred_by: string | null;
  referral_code: string;
  gender: string;
  profile_img: string;
  email: string;
  phone: string;
  address: string | null;
  dob: string;
  email_verified_at: string;
  login_at: string;
  is_admin: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type apiGetUserReferralResponse = {
  user: apiGetUserReferral | {};
  referral_count: number;
  referrals: [];
};

export type apiGetUserReferralRewardHistoryTypes = {
  sort: "";
  search: "";
  is_claimed: boolean;
  range: {
    from: string;
    to: string;
  };
};

export type apiGetUserReferralRewardHistoryResponse = {};

export type apiGetAllUserChatsResponse = {};
