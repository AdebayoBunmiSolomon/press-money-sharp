import { getNetworkStatus } from "@src/helper/utils";
import { APIRequest } from "../request";
import { endpoint } from "../endpoint/endpoint";
import { loginFormTypes } from "@src/form/schema/types";

export const login = async (payload: loginFormTypes) => {
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
