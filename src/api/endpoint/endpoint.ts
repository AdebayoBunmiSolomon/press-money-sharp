import {
  ADD_PRODUCT_TO_RECENTLY_VIEWED,
  ADD_PRODUCT_TO_WISHLIST,
  DELETE_USER_RECENTLY_VIEWED,
  DELETE_USER_WISHLIST,
  GET_ALL_SERVICES,
  GET_ALL_USER_CHATS,
  GET_CATEGORIES,
  GET_SETTINGS,
  GET_TERMS_AND_CONDITIONS,
  GET_USER_NOTIFICATIONS,
  GET_USER_PREFERENCES,
  GET_USER_RECENTLY_VIEWED,
  GET_USER_REFERRAL,
  GET_USER_REFERRAL_REWARD_HISTORY,
  GET_USER_SERVICE_MESSAGE,
  GET_USER_WISHLIST,
  LOGIN,
  REFRESH_USER_PROFILE,
  REQUEST_PASSWORD,
  SAVE_USER_PREFERENCES,
  SCHEDULE_CONSULTATION,
  SEND_CHAT_MESSAGE,
  SEND_MESSAGE,
  SIGN_UP,
  UPDATE_PASSWORD,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FORM,
  VERIFY_EMAIL,
  VERIFY_TOKEN,
  VIEW_SERVICE,
} from "@env";

export const endpoint = {
  AUTH: {
    signUp: SIGN_UP, //create new user
    verifyEmail: VERIFY_EMAIL, //verify user email
    login: LOGIN, //login
    requestPassword: REQUEST_PASSWORD,
    verifyToken: VERIFY_TOKEN,
    updatePassword: UPDATE_PASSWORD,
  },
  APP: {
    getCategories: GET_CATEGORIES, //get category
    scheduleConsultation: SCHEDULE_CONSULTATION,
    getAllService: GET_ALL_SERVICES, //&search=&type=&range%5Bfrom%5D=&range%5Bto%5D=
    viewService: VIEW_SERVICE, //pass the service_uuid as query parameter
    sendMessage: SEND_MESSAGE,
    getSettings: GET_SETTINGS,
    getUserNotifications: GET_USER_NOTIFICATIONS, //pass the user uuid
    addProductToWishList: ADD_PRODUCT_TO_WISHLIST,
    getUserWishList: GET_USER_WISHLIST,
    deleteUserWishList: DELETE_USER_WISHLIST, //pass the wishlist uuid -> /wishlist/{uuid}/remove
    addProductToRecentlyViewed: ADD_PRODUCT_TO_RECENTLY_VIEWED,
    getUserRecentlyViewed: GET_USER_RECENTLY_VIEWED,
    deleteUserRecentlyViewed: DELETE_USER_RECENTLY_VIEWED, //pass the wishlist uuid -> /recent-views/{uuid}
    getUserReferral: GET_USER_REFERRAL,
    getUserReferralRewardHistory: GET_USER_REFERRAL_REWARD_HISTORY,
    getAllUserChats: GET_ALL_USER_CHATS,
    getUserServiceMessages: GET_USER_SERVICE_MESSAGE, //pass the service uuid -> /admin/my-chats/{uuid}
    sendChatMessage: SEND_CHAT_MESSAGE,
    updateUserProfile: UPDATE_USER_PROFILE,
    getTermsAndConditions: GET_TERMS_AND_CONDITIONS,
    getUserPreferences: GET_USER_PREFERENCES,
    updateUserProfileForm: UPDATE_USER_PROFILE_FORM,
    saveUserPreferences: SAVE_USER_PREFERENCES,
    refreshUserProfile: REFRESH_USER_PROFILE,
  },
};
