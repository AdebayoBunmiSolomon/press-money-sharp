import { APIRequest } from "@src/api/request";
import { login, signUp } from "@src/api/services/auth";
import { useAuthStore } from "@src/api/store/auth";
import { loginFormTypes, signUpFormTypes } from "@src/form/schema/types";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { setIsAuthenticated } = useAuthStore();
  const { data, isError, isPending, mutate } = useMutation({
    mutationFn: (payload: loginFormTypes) => login(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.error?.fields?.email[0]
          ? response?.data?.error?.fields?.email[0]
          : response?.data?.error?.message || "Operation Successful",
      });
      if (response?.data?.success) {
        setIsAuthenticated(true);
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
    mutate,
  };
};

//work here when you open your laptop...
export const useSignUp = () => {
  const { data, isError, isPending, mutate } = useMutation({
    mutationFn: (payload: signUpFormTypes) => signUp(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.error?.fields?.email[0]
          ? response?.data?.error?.fields?.email[0]
          : response?.data?.error?.message || "Operation Successful",
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
    mutate,
  };
};
