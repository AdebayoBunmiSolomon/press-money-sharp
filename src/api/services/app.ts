import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";
import { apiScheduleConsultation } from "../types/auth";
import { apiAddProductToWishList, apiSendMessage } from "../types/app";
import { settingsType } from "@src/types/types";

export const getCategory = async () => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      endpoint.APP.getCategories,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Get-category service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const scheduleConsultation = async (
  payload: apiScheduleConsultation
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.APP.scheduleConsultation,
      payload,
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Schedule-consultation service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getAllServices = async () => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      endpoint.APP.getAllService,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Get-AllService service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const viewService = async (service_uuid: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.viewService}/${service_uuid}`,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("View-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const sendMessage = async (payload: apiSendMessage, token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.APP.sendMessage,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Send-message service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getSettings = async (type: settingsType) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getSettings}/${type}`,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("Settings-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserNotifications = async (
  user_uuid: string,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserNotifications}/${user_uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("GetNotifications-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const addProductToWishList = async (
  payload: apiAddProductToWishList,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.APP.addProductToWishList,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("AddProduct-ToWishList service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserWishList = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserWishList}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    console.log("GetUserWishList-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};
