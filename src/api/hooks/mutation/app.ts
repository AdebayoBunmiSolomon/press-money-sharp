import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APIRequest } from "@src/api/request";
import {
  addProductToRecentlyViewed,
  addProductToWishList,
  deleteProductFromRecentlyViewed,
  deleteProductFromWishList,
  saveUserPreferences,
  scheduleConsultation,
  sendChatMessage,
  sendMessage,
  updateProfileImg,
  updateUserProfileForm,
} from "@src/api/services/app";
import { useAuthStore } from "@src/api/store/auth";
import {
  apiAddProductToRecentlyViewed,
  apiAddProductToWishList,
  apiDeleteFromRecentlyViewed,
  apiDeleteProductFromWishlist,
  apiSaveUserPreferences,
  apiSendChatMessage,
  apiSendMessage,
  apiUpdateUserProfileForm,
  apiUpdateUserProfileImg,
} from "@src/api/types/app";
import { apiScheduleConsultation } from "@src/api/types/auth";
import { formatApiErrorMessage, queryClient } from "@src/helper/utils";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import { useMutation } from "@tanstack/react-query";
import { appQueryKeys } from "../queries/query-key";
import { useLikedServiceId } from "../likedService";
import { useRecentlyViewedServiceId } from "../recentlyServiceViewed";
import { useLogOutUser } from "./auth";

export const useScheduleConsultation = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: ScheduleConsultation,
  } = useMutation({
    mutationFn: (payload: apiScheduleConsultation) =>
      scheduleConsultation(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Consultation scheduled successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        navigation.navigate(bottomTabScreenNames.HOME_STACK, {
          screen: appScreenNames.HOME,
        });
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    ScheduleConsultation,
  };
};

export const useSendMessage = () => {
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    isSuccess,
    mutate: SendMessage,
  } = useMutation({
    mutationFn: (payload: apiSendMessage) =>
      sendMessage(payload, userData?.token),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "flash",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Message sent successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    isSuccess,
    SendMessage,
  };
};

export const useAddProductToWishList = () => {
  const { likeUnlikeService } = useLikedServiceId();
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: AddProductToWishList,
  } = useMutation({
    mutationFn: (payload: apiAddProductToWishList) =>
      addProductToWishList(payload, userData?.token),
    onSuccess: (response, variables) => {
      const { service_id } = variables;
      APIRequest.RESPONSE_HANDLER({
        type: "flash",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Product added to wish list successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      // ✅ Refetch the user wishlist query
      if (response?.data?.success) {
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_USER_WISHLIST, userData?.token],
        });
        if (service_id) {
          likeUnlikeService(service_id);
        }
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    AddProductToWishList,
  };
};

export const useDeleteProductFromWishList = () => {
  const { likeUnlikeService } = useLikedServiceId();
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: DeleteProductFromWishList,
  } = useMutation({
    mutationFn: (payload: apiDeleteProductFromWishlist) =>
      deleteProductFromWishList(payload?.wishList_uuid, userData?.token),
    onSuccess: (response, variables) => {
      const { service_id } = variables;
      APIRequest.RESPONSE_HANDLER({
        type: "flash",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Product removed from wish list successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      // ✅ Refetch the user wishlist query
      if (response?.data?.success) {
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_USER_WISHLIST, userData?.token],
        });
        if (service_id) {
          likeUnlikeService(service_id);
        }
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    DeleteProductFromWishList,
  };
};

export const useAddProductToRecentlyViewed = () => {
  const { likeUnlikeRecentlyViewed } = useRecentlyViewedServiceId();
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: AddProductToRecentlyViewed,
  } = useMutation({
    mutationFn: (payload: apiAddProductToRecentlyViewed) =>
      addProductToRecentlyViewed(payload, userData?.token),
    onSuccess: (response, variables) => {
      const { service_id } = variables;
      // ✅ Refetch the user wishlist query
      if (response?.data?.success) {
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_RECENTLY_VIEWED, userData?.token],
        });
        if (service_id) {
          likeUnlikeRecentlyViewed(service_id);
        }
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    AddProductToRecentlyViewed,
  };
};

export const useDeleteRecentlyViewed = () => {
  const { likeUnlikeRecentlyViewed } = useRecentlyViewedServiceId();
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: DeleteFromRecentlyViewed,
  } = useMutation({
    mutationFn: (payload: apiDeleteFromRecentlyViewed) =>
      deleteProductFromRecentlyViewed(
        payload?.recentlyViewed_uuid,
        userData?.token
      ),
    onSuccess: (response, variables) => {
      const { service_id } = variables;
      // APIRequest.RESPONSE_HANDLER({
      //   type: "flash",
      //   status: response?.data?.success ? 200 : 401, //200 | 401 | 500
      //   success: response?.data?.success, //true | false
      //   code: response?.data?.error?.code || "Success",
      //   message: response?.data?.success
      //     ? "Product removed from recently-viewed successfully"
      //     : formatApiErrorMessage(response?.data?.error),
      // });
      // ✅ Refetch the user wishlist query
      if (response?.data?.success) {
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_RECENTLY_VIEWED, userData?.token],
        });
        if (service_id) {
          likeUnlikeRecentlyViewed(service_id);
        }
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    DeleteFromRecentlyViewed,
  };
};

export const useSendChatMessage = () => {
  const { userData } = useAuthStore();
  const {
    data: response,
    isError,
    isPending,
    mutate: SendChatMessage,
  } = useMutation({
    mutationFn: (payload: apiSendChatMessage) =>
      sendChatMessage(
        {
          message: payload?.message,
          service: payload?.service, //service_uuid
          file: payload?.file,
        },
        userData?.token
      ),
    onSuccess: (response, variables) => {
      const { service } = variables;
      const service_uuid = service;
      if (response?.data?.success) {
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_USER_SERVICE_MESSAGES, service_uuid],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [appQueryKeys.GET_USER_NOTIFICATIONS, userData?.uuid],
        // });
        queryClient.invalidateQueries({
          queryKey: [appQueryKeys.GET_ALL_USER_CHATS, userData?.token],
        });
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    response,
    isError,
    isPending,
    SendChatMessage,
  };
};

export const useUpdateUserProfileImg = () => {
  const { logOutUser } = useLogOutUser();
  const { userData } = useAuthStore();
  const {
    data: response,
    isError,
    isPending,
    mutate: UpdateUserProfileImg,
  } = useMutation({
    mutationFn: (payload: apiUpdateUserProfileImg) =>
      updateProfileImg(
        {
          profile_img: payload.profile_img,
        },
        userData?.token,
        userData?.uuid
      ),
    onSuccess: (response) => {
      if (response?.data?.success) {
        APIRequest.RESPONSE_HANDLER({
          type: "flash",
          status: response?.data?.success ? 200 : 401, //200 | 401 | 500
          success: response?.data?.success, //true | false
          code: response?.data?.error?.code || "Success",
          message: response?.data?.success
            ? "Profile Image Updated Successfully"
            : formatApiErrorMessage(response?.data?.error),
        });
        logOutUser();
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    response,
    isError,
    isPending,
    UpdateUserProfileImg,
  };
};

export const useUpdateUserProfileForm = () => {
  const { userData, setIsAuthenticated } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: UpdateUserProfileForm,
  } = useMutation({
    mutationFn: (payload: apiUpdateUserProfileForm) =>
      updateUserProfileForm(payload, userData?.token),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "User profile updated successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        setIsAuthenticated(false);
      }
    },
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    data,
    isError,
    isPending,
    UpdateUserProfileForm,
  };
};

export const useSaveUserPreferences = () => {
  const { userData } = useAuthStore();
  const {
    data: response,
    isError,
    isPending,
    mutate: SaveUserPreference,
  } = useMutation({
    mutationFn: (payload: apiSaveUserPreferences) =>
      saveUserPreferences(payload, userData?.token),
    onError: (error) => {
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          error?.message || "Network error. Please check your connection.",
      });
    },
  });

  return {
    response,
    isError,
    isPending,
    SaveUserPreference,
  };
};
