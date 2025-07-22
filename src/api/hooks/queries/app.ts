import { APIRequest } from "@src/api/request";
import {
  getAllServices,
  getCategory,
  getSettings,
  getUserNotifications,
  getUserWishList,
  viewService,
} from "@src/api/services/app";
import {
  useAllServicesStore,
  useCategoriesStore,
  useUserNotificationsStore,
  useUserWishListStore,
} from "@src/api/store/app";
import {
  apiGetAllServicesResponse,
  apiGetSettingsResponse,
  apiGetUserNotificationsResponse,
  apiGetUserWishListResponse,
  apiViewServicesResponse,
} from "@src/api/types/app";
import { formatApiErrorMessage } from "@src/helper/utils";
import { settingsType } from "@src/types/types";
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

export const useGetSettings = (type: settingsType) => {
  const { data, isFetching, isError } = useQuery<apiGetSettingsResponse[]>({
    queryKey: [appQueryKeys.GET_SETTINGS, type],
    queryFn: async () => {
      const response = await getSettings(type);

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
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!type,
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
        APIRequest.RESPONSE_HANDLER({
          type: "flash",
          status: response?.data?.success ? 200 : 401, //200 | 401 | 500
          success: response?.data?.success, //true | false
          code: response?.data?.error?.code || "Success",
          message: response?.data?.success
            ? "User Wishlist fetched successfully"
            : formatApiErrorMessage(response?.data?.error),
        });
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
  });

  return {
    userWishList: data,
    isFetching,
    isError,
  };
};
