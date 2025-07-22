import { APIRequest } from "@src/api/request";
import {
  forgotPasswordAndContinue,
  login,
  signUp,
  updatePassword,
  verifyEmail,
  verifyOtpToChangePassword,
} from "@src/api/services/auth";
import { useAuthStore } from "@src/api/store/auth";
import {
  apiForgotPassAndContinueTypes,
  apiLoginFormTypes,
  apiSignUpFormTypes,
  apiUpdatePasswordTypes,
  apiVerifyEmailFormTypes,
  apiVerifyOtpToChangePassTypes,
} from "@src/api/types/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { AuthStackParamList } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { formatApiErrorMessage } from "@src/helper/utils";

export const useLogin = () => {
  const { setIsAuthenticated, setUserData } = useAuthStore();
  const {
    data,
    isError,
    isPending,
    mutate: Login,
  } = useMutation({
    mutationFn: (payload: apiLoginFormTypes) => login(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Login successful. Welcome to PressMoneySharp"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        setIsAuthenticated(true);
        setUserData({
          uuid: response?.data?.data?.uuid,
          first_name: response?.data?.data?.first_name,
          last_name: response?.data?.data?.last_name,
          referred_by: response?.data?.data?.referred_by,
          referral_code: response?.data?.data?.referral_code,
          gender: response?.data?.data?.gender,
          profile_img: response?.data?.data?.profile_img,
          email: response?.data?.data?.email,
          phone: response?.data?.data?.phone,
          address: response?.data?.data?.address,
          dob: response?.data?.data?.dob,
          email_verified_at: response?.data?.data?.email_verified_at,
          login_at: response?.data?.data?.login_at,
          is_admin: response?.data?.data?.is_admin,
          status: response?.data?.data?.status,
          created_at: response?.data?.data?.created_at,
          updated_at: response?.data?.data?.updated_at,
          deleted_at: response?.data?.data?.deleted_at,
          token: response?.data?.token,
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
    Login,
  };
};

//work here when you open your laptop...
export const useSignUp = () => {
  const navigation: NavigationProp<AuthStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: SignUp,
  } = useMutation({
    mutationFn: (payload: apiSignUpFormTypes) => signUp(payload),
    onSuccess: (response, variables) => {
      const email = variables?.email;
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.success ? 200 : 401, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "User created successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        navigation.navigate(authScreenNames.VERIFY_EMAIL_FOR_SIGN_UP, {
          email,
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
    SignUp,
  };
};

export const useVerifyEmail = () => {
  const navigation: NavigationProp<AuthStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: VerifyEmail,
  } = useMutation({
    mutationFn: (payload: apiVerifyEmailFormTypes) => verifyEmail(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.data?.validity ? 200 : 401, //200 | 401 | 500
        success: response?.data?.data?.validity, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.data?.message,
      });
      if (response?.data?.data?.validity) {
        navigation.navigate(authScreenNames.LOGIN);
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
    VerifyEmail,
  };
};

export const useForgotPassAndContinue = () => {
  const navigation: NavigationProp<AuthStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: ForgotPassAndContinue,
  } = useMutation({
    mutationFn: (payload: apiForgotPassAndContinueTypes) =>
      forgotPasswordAndContinue(payload),
    onSuccess: (response, variables) => {
      const { email } = variables;
      APIRequest.RESPONSE_HANDLER({
        type: "flash",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? `OTP has been sent to ${email}`
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        navigation.navigate(authScreenNames.VERIFY_EMAIL_FOR_PASSWORD_UPDATE, {
          email: email,
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
    ForgotPassAndContinue,
  };
};

export const useVerifyOtpToChangePass = () => {
  const navigation: NavigationProp<AuthStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: VerifyOtpToChangePass,
  } = useMutation({
    mutationFn: (payload: apiVerifyOtpToChangePassTypes) =>
      verifyOtpToChangePassword(payload),
    onSuccess: (response, variables) => {
      const { email, hash } = variables;
      APIRequest.RESPONSE_HANDLER({
        type: "flash",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "OTP verified successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        navigation.navigate(authScreenNames.PASSWORD_UPDATE, {
          email: email,
          hash: hash,
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
    VerifyOtpToChangePass,
  };
};

export const useUpdatePassword = () => {
  const navigation: NavigationProp<AuthStackParamList> = useNavigation();
  const {
    data,
    isError,
    isPending,
    mutate: UpdatePass,
  } = useMutation({
    mutationFn: (payload: apiUpdatePasswordTypes) => updatePassword(payload),
    onSuccess: (response) => {
      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: response?.data?.status, //200 | 401 | 500
        success: response?.data?.success, //true | false
        code: response?.data?.error?.code || "Success",
        message: response?.data?.success
          ? "Password changed successfully"
          : formatApiErrorMessage(response?.data?.error),
      });
      if (response?.data?.success) {
        navigation.navigate(authScreenNames.LOGIN);
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
    UpdatePass,
  };
};
