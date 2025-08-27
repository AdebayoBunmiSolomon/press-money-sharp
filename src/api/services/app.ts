import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";
import { apiScheduleConsultation } from "../types/auth";
import {
  apiAddProductToRecentlyViewed,
  apiAddProductToWishList,
  apiSaveUserPreferences,
  apiSendChatMessage,
  apiSendMessage,
  apiUpdateUserProfileForm,
  apiUpdateUserProfileImg,
} from "../types/app";

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
    // console.log("Schedule-consultation service error:", err);
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
    // console.log("Get-AllService service error:", err);
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
    // console.log("View-Service service error:", err);
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
    // console.log("Send-message service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getSettings = async () => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getSettings}`,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("Settings-Service service error:", err);
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
    // console.log("GetNotifications-Service service error:", err);
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
    // console.log("AddProduct-ToWishList service error:", err);
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
    // console.log("GetUserWishList-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const deleteProductFromWishList = async (
  wishListUuId: string,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.DELETE(
      `${endpoint.APP.deleteUserWishList}/${wishListUuId}/remove`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("DeleteUserWishList-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const addProductToRecentlyViewed = async (
  payload: apiAddProductToRecentlyViewed,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.APP.addProductToRecentlyViewed,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("AddProduct-ToRecentlyViewed service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserRecentlyViewed = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserRecentlyViewed}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("GetRecentlyViewed service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const deleteProductFromRecentlyViewed = async (
  recentlyViewedUuId: string,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.DELETE(
      `${endpoint.APP.deleteUserRecentlyViewed}/${recentlyViewedUuId}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("DeleteUserRecentlyViewed-Service service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserReferral = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserReferral}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("GetReferralHistory service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserReferralRewardHistory = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserReferralRewardHistory}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("GetUserReferralRewardHistory service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getAllUserChats = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getAllUserChats}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("GetAllUserChats service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserServiceMessages = async (
  service_uuid: string,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      `${endpoint.APP.getUserServiceMessages}/${service_uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("GetUserServiceMessages service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

//working for android, not working for ios...
// export const sendChatMessage = async (
//   payload: apiSendChatMessage,
//   token: string
// ) => {
//   const { isNetworkConnectedAndReachable } = await getNetworkStatus();
//   if (!isNetworkConnectedAndReachable) {
//     throw new Error("No internet connection. Please try again later.");
//   }

//   try {
//     if (payload.file) {
//       console.log("Uploading file:", payload.file);

//       const ext = payload.file.name?.split(".").pop()?.toLowerCase() || "jpg";
//       const mimeType = ext === "png" ? "image/png" : "image/jpeg";

//       const formData = new FormData();
//       formData.append("message", payload.message?.trim() || " ");
//       formData.append("service", payload.service);
//       formData.append("file", {
//         uri: payload.file.uri,
//         name: payload.file.name || `chat_${Date.now()}.${ext}`,
//         type: mimeType,
//       } as any);

//       const res = await fetch(`${BASE_URL}${endpoint.APP.sendChatMessage}`, {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token.trim()}`,
//           "Content-Type": "multipart/form-data", // explicitly set
//         },
//       });

//       const json = await res.json();
//       console.log("Response JSON:", json);
//       return { status: res.status, data: json };
//     }

//     const { data, status } = await APIRequest.POST(
//       `${endpoint.APP.sendChatMessage}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token.trim()}`,
//         },
//       }
//     );
//     return { data, status };
//   } catch (err: any) {
//     console.log("SendChat-message service error:", err);
//     return { error: err.message || "An error occurred" };
//   }
// };

export const sendChatMessage = async (
  payload: apiSendChatMessage,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }

  try {
    if (payload.file) {
      const ext = payload.file.name?.split(".").pop()?.toLowerCase() || "jpg";
      const mimeType = ext === "png" ? "image/png" : "image/jpeg";

      const formData = new FormData();
      formData.append("message", payload.message?.trim() || " ");
      formData.append("service", payload.service);
      formData.append("file", {
        uri: payload.file.uri,
        name: payload.file.name || `chat_${Date.now()}.${ext}`,
        type: mimeType,
      } as any);

      const { status, data } = await APIRequest.FETCH({
        endpoint: endpoint.APP.sendChatMessage,
        method: "POST",
        body: formData, // FormData here
        token: token, // Adds Authorization automatically
      });
      return { status, data };
    }
    const { data, status } = await APIRequest.POST(
      `${endpoint.APP.sendChatMessage}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status };
  } catch (err: any) {
    // console.log("SendChat-message service error:", err);
    return { error: err.message || "An error occurred" };
  }
};

export const updateProfileImg = async (
  payload: apiUpdateUserProfileImg,
  token: string,
  user_uuid: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    if (payload?.profile_img) {
      const ext =
        payload.profile_img.name?.split(".").pop()?.toLowerCase() || "jpg";
      const mimeType = ext === "png" ? "image/png" : "image/jpeg";

      const formData = new FormData();
      formData.append("profile_img", {
        uri: payload.profile_img.uri,
        name: payload.profile_img.name || `user_${Date.now()}.${ext}`,
        type: mimeType,
      } as any);

      const { status, data } = await APIRequest.FETCH({
        endpoint: `${endpoint.APP.updateUserProfile}/${user_uuid}`,
        method: "POST",
        body: formData, // FormData here
        token: token, // Adds Authorization automatically
      });
      return { status, data };
    }
  } catch (err: any) {
    // console.log("UpdateUser-Profile service error:", err);
    return { error: err.message || "An error occurred" };
  }
};

export const getTermsAndConditions = async () => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      endpoint.APP.getTermsAndConditions,
      {},
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("Get-Terms&Conditions service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const updateUserProfileForm = async (
  payload: apiUpdateUserProfileForm,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.PATCH(
      endpoint.APP.updateUserProfileForm,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("Update-UserProfileForm service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const getUserPreferences = async (token: string) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.GET(
      endpoint.APP.getUserPreferences,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      },
      {}
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("Get-UserPreferences service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};

export const saveUserPreferences = async (
  payload: apiSaveUserPreferences,
  token: string
) => {
  const { isNetworkConnectedAndReachable } = await getNetworkStatus();
  if (!isNetworkConnectedAndReachable) {
    throw new Error("No internet connection. Please try again later.");
  }
  try {
    const { data, status } = await APIRequest.POST(
      endpoint.APP.saveUserPreferences,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );
    return { data, status }; // Return response instead of throwing an error
  } catch (err: any) {
    // console.log("Save-UserPreferences service error:", err);
    return { error: err.message || "An error occurred" }; // Return error as part of response
  }
};
