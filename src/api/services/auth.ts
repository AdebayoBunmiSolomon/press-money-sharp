import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";
import {
  apiForgotPassAndContinueTypes,
  apiLoginFormTypes,
  apiSignUpFormTypes,
  apiUpdatePasswordTypes,
  apiVerifyEmailFormTypes,
  apiVerifyOtpToChangePassTypes,
} from "../types/auth";

export const login = async (payload: apiLoginFormTypes) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }

  try {
    const { data, status } = await APIRequest.POST(
      endpoint.AUTH.login,
      payload,
      {}
    );
    return { data, status };
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during login");
  }
};

export const signUp = async (payload: apiSignUpFormTypes) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.AUTH.signUp,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during sign-up");
  }
};

export const verifyEmail = async (payload: apiVerifyEmailFormTypes) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.AUTH.verifyEmail,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred during email verification"
    );
  }
};

export const forgotPasswordAndContinue = async (
  payload: apiForgotPassAndContinueTypes
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.AUTH.requestPassword,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred during password reset request"
    );
  }
};

export const verifyOtpToChangePassword = async (
  payload: apiVerifyOtpToChangePassTypes
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.AUTH.verifyToken,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during OTP verification");
  }
};

export const updatePassword = async (payload: apiUpdatePasswordTypes) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.PUT(
      endpoint.AUTH.updatePassword,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during password update");
  }
};

export const refreshUserProfile = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      endpoint.APP.refreshUserProfile,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during profile refresh");
  }
};
