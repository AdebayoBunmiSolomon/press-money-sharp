import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APIRequest } from "@src/api/request";
import {
  addProductToWishList,
  scheduleConsultation,
  sendMessage,
} from "@src/api/services/app";
import { useAuthStore } from "@src/api/store/auth";
import { apiAddProductToWishList, apiSendMessage } from "@src/api/types/app";
import { apiScheduleConsultation } from "@src/api/types/auth";
import { formatApiErrorMessage, queryClient } from "@src/helper/utils";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { RootStackParamList } from "@src/router/types";
import { useMutation } from "@tanstack/react-query";
import { appQueryKeys } from "../queries/query-key";

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
    SendMessage,
  };
};

export const useAddProductToWishList = () => {
  const { userData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: AddProductToWishList,
  } = useMutation({
    mutationFn: (payload: apiAddProductToWishList) =>
      addProductToWishList(payload, userData?.token),
    onSuccess: (response) => {
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
