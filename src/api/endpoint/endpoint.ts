export const endpoint = {
  AUTH: {
    signUp: process.env.EXPO_PUBLIC_SIGN_UP, //create new user
    verifyEmail: process.env.EXPO_PUBLIC_VERIFY_EMAIL, //verify user email
    login: process.env.EXPO_PUBLIC_LOGIN, //login
    requestPassword: process.env.EXPO_PUBLIC_REQUEST_PASSWORD,
    verifyToken: process.env.EXPO_PUBLIC_VERIFY_TOKEN,
    updatePassword: process.env.EXPO_PUBLIC_UPDATE_PASSWORD,
  },
  APP: {
    getCategories: process.env.EXPO_PUBLIC_GET_CATEGORIES, //get category
    scheduleConsultation: process.env.EXPO_PUBLIC_SCHEDULE_CONSULTATION,
    getAllService: process.env.EXPO_PUBLIC_GET_ALL_SERVICES, //&search=&type=&range%5Bfrom%5D=&range%5Bto%5D=
    viewService: process.env.EXPO_PUBLIC_VIEW_SERVICE, //pass the service_uuid as query parameter
    sendMessage: process.env.EXPO_PUBLIC_SEND_MESSAGE,
    getSettings: process.env.EXPO_PUBLIC_GET_SETTINGS,
    getUserNotifications: process.env.EXPO_PUBLIC_GET_USER_NOTIFICATIONS, //pass the user uuid
    addProductToWishList: process.env.EXPO_PUBLIC_ADD_PRODUCT_TO_WISHLIST,
    getUserWishList: process.env.EXPO_PUBLIC_GET_USER_WISHLIST,
    deleteUserWishList: process.env.EXPO_PUBLIC_DELETE_USER_WISHLIST, //pass the wishlist uuid -> /wishlist/{uuid}/remove
    addProductToRecentlyViewed:
      process.env.EXPO_PUBLIC_ADD_PRODUCT_TO_RECENTLY_VIEWED,
    getUserRecentlyViewed: process.env.EXPO_PUBLIC_GET_USER_RECENTLY_VIEWED,
    deleteUserRecentlyViewed:
      process.env.EXPO_PUBLIC_DELETE_USER_RECENTLY_VIEWED, //pass the wishlist uuid -> /recent-views/{uuid}
    getUserReferral: process.env.EXPO_PUBLIC_GET_USER_REFERRAL,
    getUserReferralRewardHistory:
      process.env.EXPO_PUBLIC_GET_USER_REFERRAL_REWARD_HISTORY,
    getAllUserChats: process.env.EXPO_PUBLIC_GET_ALL_USER_CHATS,
    getUserServiceMessages: process.env.EXPO_PUBLIC_GET_USER_SERVICE_MESSAGE, //pass the service uuid -> /admin/my-chats/{uuid}
    sendChatMessage: process.env.EXPO_PUBLIC_SEND_CHAT_MESSAGE,
    updateUserProfile: process.env.EXPO_PUBLIC_UPDATE_USER_PROFILE,
    getTermsAndConditions: process.env.EXPO_PUBLIC_GET_TERMS_AND_CONDITIONS,
    getUserPreferences: process.env.EXPO_PUBLIC_GET_USER_PREFERENCES,
    updateUserProfileForm: process.env.EXPO_PUBLIC_UPDATE_USER_PROFILE_FORM,
    saveUserPreferences: process.env.EXPO_PUBLIC_SAVE_USER_PREFERENCES,
    refreshUserProfile: process.env.EXPO_PUBLIC_REFRESH_USER_PROFILE,
    deleteUserAccount: process.env.EXPO_PUBLIC_DELETE_USER_ACCOUNT,
  },
};
