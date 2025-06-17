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
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Sign-in service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
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
    console.log("Sign-up service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
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
    console.log("Sign-up service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
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
    console.log("Forgot-password service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
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
    console.log("Verify-otp-to-change-password service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
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
    console.log("Update-password service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};
