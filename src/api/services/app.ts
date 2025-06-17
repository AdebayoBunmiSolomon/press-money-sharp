import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";

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
