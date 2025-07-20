import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";
import { apiScheduleConsultation } from "../types/auth";
import { apiSendMessage } from "../types/app";

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
