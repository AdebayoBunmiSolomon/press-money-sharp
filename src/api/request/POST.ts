import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@env";

export const POST = async (
  endpoint: string,
  payload: any,
  config?: AxiosRequestConfig
) => {
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}${endpoint}`,
      payload,
      config
    );
    return { status, data };
  } catch (error: any) {
    // console.error("Post request error:", error);

    if (error.response) {
      //API responded with an error status (e.g., 400, 500)
      return { status: error?.response?.status, data: error?.response?.data };
    } else if (error.request) {
      //No response received (e.g., network error, timeout)
      return { status: 0, data: null }; // `0` indicates network failure
    } else {
      //Other unexpected errors
      return { status: -1, data: null };
    }
  }
};
