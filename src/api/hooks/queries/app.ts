import { APIRequest } from "@src/api/request";
import {
  getAllServices,
  getAllUserChats,
  getCategory,
  getSettings,
  getTermsAndConditions,
  getUserNotifications,
  getUserRecentlyViewed,
  getUserReferral,
  getUserReferralRewardHistory,
  getUserServiceMessages,
  getUserWishList,
  viewService,
} from "@src/api/services/app";
import {
  useAllServicesStore,
  useAllUserChatsStore,
  useCategoriesStore,
  useRecentlyViewedStore,
  useSettingsStore,
  useUserServiceMessagesStore,
  useUserNotificationsStore,
  useUserReferralRewardHistoryStore,
  useUserReferralStore,
  useUserWishListStore,
  useTermsAndConditionsStore,
} from "@src/api/store/app";
import {
  apiGetAllServicesResponse,
  apiGetAllUserChatsResponse,
  apiGetSettingsResponse,
  apiGetUserServiceMessagesResponse,
  apiGetUserNotificationsResponse,
  apiGetUserRecentlyViewedResponse,
  apiGetUserReferralResponse,
  apiGetUserReferralRewardHistoryResponse,
  apiGetUserWishListResponse,
  apiViewServicesResponse,
  apiGetTermsAndConditionsStoreResponse,
} from "@src/api/types/app";
import { formatApiErrorMessage } from "@src/helper/utils";
import { useQuery } from "@tanstack/react-query";
import { appQueryKeys } from "./query-key";

export const useGetCategory = () => {
  const { setCategories } = useCategoriesStore();

  const { data, isFetching, isError } = useQuery<string[]>({
    queryKey: [appQueryKeys.GET_CATEGORY],
    queryFn: async () => {
      const response = await getCategory();

      if (response?.data?.success) {
        const categories = response?.data?.data || [];
        // console.log("Categories", categories);
        setCategories(categories); // ✅ Now setting correctly
        return categories; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    categories: data,
    isFetching,
    isError,
  };
};

export const useGetAllServices = () => {
  const { setAllServices } = useAllServicesStore();

  const { data, isFetching, isError } = useQuery<apiGetAllServicesResponse[]>({
    queryKey: [appQueryKeys.GET_ALL_SERVICES],
    queryFn: async () => {
      const response = await getAllServices();

      if (response?.data?.success) {
        const allServices: apiGetAllServicesResponse[] =
          response?.data?.data || [];
        setAllServices(allServices); // ✅ Now setting correctly
        return allServices; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    retry: true,
    refetchOnReconnect: true,
    refetchInterval: 60000,
  });

  return {
    allServices: data,
    isFetching,
    isError,
  };
};

export const useViewService = (service_uuid: string) => {
  const { data, isFetching, isError } = useQuery<apiViewServicesResponse>({
    queryKey: [appQueryKeys.VIEW_SERVICE, service_uuid],
    queryFn: async () => {
      const response = await viewService(service_uuid);

      if (response?.data?.success) {
        const serviceInfo = response?.data?.data || [];
        return serviceInfo; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          formatApiErrorMessage(response?.data?.error) ||
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!service_uuid,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    serviceInfo: data,
    isFetching,
    isError,
  };
};

export const useGetSettings = () => {
  const { setSettings } = useSettingsStore();
  const { data, isFetching, isError } = useQuery<apiGetSettingsResponse[]>({
    queryKey: [appQueryKeys.GET_SETTINGS],
    queryFn: async () => {
      const response = await getSettings();

      if (response?.data?.success) {
        const settingsResponse: apiGetSettingsResponse[] =
          response?.data?.data || [];
        setSettings(settingsResponse);
        return settingsResponse; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    settingsData: data,
    isFetching,
    isError,
  };
};

export const useGetUserNotifications = (user_uuid: string, token: string) => {
  const { setUserNotifications } = useUserNotificationsStore();
  const { data, isFetching, isError } = useQuery<
    apiGetUserNotificationsResponse[]
  >({
    queryKey: [appQueryKeys.GET_USER_NOTIFICATIONS, user_uuid],
    queryFn: async () => {
      const response = await getUserNotifications(user_uuid, token);
      if (
        response?.data?.success === true ||
        response?.data?.success !== true
      ) {
        const userNotificationsResp: apiGetUserNotificationsResponse[] =
          response?.data?.data || [];
        APIRequest.RESPONSE_HANDLER({
          type: "flash",
          status: response?.data?.success ? 200 : 401, //200 | 401 | 500
          success: response?.data?.success, //true | false
          code: response?.data?.error?.code || "Success",
          message: response?.data?.success
            ? "Notifications fetched successfully"
            : formatApiErrorMessage(response?.data?.error),
        });
        setUserNotifications(userNotificationsResp);
        return userNotificationsResp; // ✅ Return the real data
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!user_uuid,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    userNotifications: data,
    isFetching,
    isError,
  };
};

export const useGetUserWishList = (token: string) => {
  const { setUserWishList } = useUserWishListStore();
  const { data, isFetching, isError } = useQuery<apiGetUserWishListResponse[]>({
    queryKey: [appQueryKeys.GET_USER_WISHLIST, token],
    queryFn: async () => {
      const response = await getUserWishList(token);
      if (
        response?.data?.success === true ||
        response?.data?.success !== true
      ) {
        const userWishListResp: apiGetUserWishListResponse[] =
          response?.data?.data || [];
        // APIRequest.RESPONSE_HANDLER({
        //   type: "flash",
        //   status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        //   success: response?.data?.success, //true | false
        //   code: response?.data?.error?.code || "Success",
        //   message: response?.data?.success
        //     ? "User Wishlist fetched successfully"
        //     : formatApiErrorMessage(response?.data?.error),
        // });
        setUserWishList(userWishListResp);
        return userWishListResp; // ✅ Return the real data
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!token,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 60000,
  });

  return {
    userWishList: data,
    isFetching,
    isError,
  };
};

export const useGetUserRecentlyViewed = (token: string) => {
  const { setUserRecentlyViewed } = useRecentlyViewedStore();
  const { data, isFetching, isError } = useQuery<
    apiGetUserRecentlyViewedResponse[]
  >({
    queryKey: [appQueryKeys.GET_RECENTLY_VIEWED, token],
    queryFn: async () => {
      const response = await getUserRecentlyViewed(token);
      if (
        response?.data?.success === true ||
        response?.data?.success !== true
      ) {
        const userRecentlyViewedResp: apiGetUserRecentlyViewedResponse[] =
          response?.data?.data || [];
        setUserRecentlyViewed(userRecentlyViewedResp);
        return userRecentlyViewedResp; // ✅ Return the real data
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!token,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 60000,
  });

  return {
    userRecentlyViewed: data,
    isFetching,
    isError,
  };
};

export const useGetUserReferral = (token: string) => {
  const { setUserReferral, userReferral: userReferralStore } =
    useUserReferralStore();
  const { data, isFetching, isError } = useQuery<apiGetUserReferralResponse>({
    queryKey: [appQueryKeys.GET_USER_REFERRAL, token],
    queryFn: async () => {
      const response = await getUserReferral(token);
      if (
        response?.data?.success === true ||
        response?.data?.success !== true
      ) {
        const userReferralResp = response?.data?.data;
        setUserReferral({
          ...userReferralStore,
          user: userReferralResp?.user,
          referral_count: userReferralResp?.referral_count,
          referrals: userReferralResp?.referrals,
        });
        return userReferralResp; // ✅ Return the real data
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return {}; // fallback
    },
    enabled: !!token,
    retry: true,
    refetchOnReconnect: true,
  });

  return {
    userReferral: data,
    isFetching,
    isError,
  };
};

export const useGetUserReferralRewardHistory = (token: string) => {
  const { setUserReferralRewardHistory } = useUserReferralRewardHistoryStore();
  const { data, isFetching, isError } =
    useQuery<apiGetUserReferralRewardHistoryResponse>({
      queryKey: [appQueryKeys.GET_USER_REFERRAL_REWARD_HISTORY, token],
      queryFn: async () => {
        const response = await getUserReferralRewardHistory(token);
        if (
          response?.data?.success === true ||
          response?.data?.success !== true
        ) {
          const userReferralRewardHistoryResp: apiGetUserReferralRewardHistoryResponse =
            response?.data?.data;
          setUserReferralRewardHistory(userReferralRewardHistoryResp);
          return userReferralRewardHistoryResp; // ✅ Return the real data
        }
        APIRequest.RESPONSE_HANDLER({
          type: "modal",
          status: 500,
          success: false,
          code: "NETWORK ERROR",
          message:
            response?.error?.message ||
            "Network error. Please check your connection.",
        });

        return []; // fallback
      },
      enabled: !!token,
      retry: true,
      refetchOnReconnect: true,
    });

  return {
    userReferralRewardHistory: data,
    isFetching,
    isError,
  };
};

export const useGetAllUserChats = (token: string) => {
  const { setAllUserChats } = useAllUserChatsStore();
  const { data, isFetching, isError } = useQuery<apiGetAllUserChatsResponse[]>({
    queryKey: [appQueryKeys.GET_ALL_USER_CHATS, token],
    queryFn: async () => {
      const response = await getAllUserChats(token);
      if (
        response?.data?.success === true ||
        response?.data?.success !== true
      ) {
        const allUserChatsResponse: apiGetAllUserChatsResponse[] =
          response?.data?.data || [];
        setAllUserChats(allUserChatsResponse);
        return response?.data?.data; // ✅ Return the real data
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!token,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    allUserChats: data,
    isFetching,
    isError,
  };
};

export const useGetUserServiceMessages = (
  service_uuid: string,
  token: string
) => {
  const { setUserServiceMessages } = useUserServiceMessagesStore();
  const { data, isFetching, isError, isSuccess } = useQuery<
    apiGetUserServiceMessagesResponse[]
  >({
    queryKey: [appQueryKeys.GET_USER_SERVICE_MESSAGES, service_uuid],
    queryFn: async () => {
      const response = await getUserServiceMessages(service_uuid, token);
      if (response && response?.data) {
        const userServiceMessage: apiGetUserServiceMessagesResponse[] =
          response?.data || [];
        // console.log(response?.data);
        setUserServiceMessages(userServiceMessage);
        return response?.data;
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });
      return [];
    },
    enabled: !!service_uuid,
    retry: true,
    refetchOnReconnect: true,
    refetchInterval: 5000,
  });

  return {
    userServiceMessages: data, // Ensure data is always defined
    isFetching,
    isError,
    isSuccess,
  };
};

export const useGetTermsAndConditions = () => {
  const { setTermsAndConditions } = useTermsAndConditionsStore();
  const { data, isFetching, isError, isSuccess } = useQuery<
    apiGetTermsAndConditionsStoreResponse[]
  >({
    queryKey: [appQueryKeys.GET_TERMS_AND_CONDITIONS],
    queryFn: async () => {
      const response = await getTermsAndConditions();
      if (response && response?.data?.success) {
        const termsAndConditionsResp: apiGetTermsAndConditionsStoreResponse[] =
          response?.data?.data || [];
        setTermsAndConditions(termsAndConditionsResp);
        return response?.data?.data;
      }
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });
      return [];
    },
    retry: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });

  return {
    termsAndConditions: data, // Ensure data is always defined
    isFetching,
    isError,
    isSuccess,
  };
};
