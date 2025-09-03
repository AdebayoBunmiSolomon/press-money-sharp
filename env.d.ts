declare module "@env" {
  export const BASE_URL: string;
  // AUTH Endpoints
  export const SIGN_UP: string;
  export const VERIFY_EMAIL: string;
  export const LOGIN: string;
  export const REQUEST_PASSWORD: string;
  export const VERIFY_TOKEN: string;
  export const UPDATE_PASSWORD: string;
  //USER APP Endpoints
  export const GET_CATEGORIES: string;
  export const SCHEDULE_CONSULTATION: string;
  export const GET_ALL_SERVICES: string;
  export const VIEW_SERVICE: string;
  export const SEND_MESSAGE: string;
  export const GET_SETTINGS: string;
  export const GET_USER_NOTIFICATIONS: string;
  export const ADD_PRODUCT_TO_WISHLIST: string;
  export const GET_USER_WISHLIST: string;
  export const DELETE_USER_WISHLIST: string;
  export const ADD_PRODUCT_TO_RECENTLY_VIEWED: string;
  export const GET_USER_RECENTLY_VIEWED: string;
  export const DELETE_USER_RECENTLY_VIEWED: string;
  export const GET_USER_REFERRAL: string;
  export const GET_USER_REFERRAL_REWARD_HISTORY: string;
  export const GET_ALL_USER_CHATS: string;
  export const GET_USER_SERVICE_MESSAGE: string;
  export const SEND_CHAT_MESSAGE: string;
  export const UPDATE_USER_PROFILE: string;
  export const GET_TERMS_AND_CONDITIONS: string;
  export const GET_USER_PREFERENCES: string;
  export const UPDATE_USER_PROFILE_FORM: string;
  export const SAVE_USER_PREFERENCES: string;
  export const REFRESH_USER_PROFILE: string;
}
