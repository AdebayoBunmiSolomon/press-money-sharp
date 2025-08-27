import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@env";

export const PATCH = async (
  endpoint: string,
  payload: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<{ status: number; data?: any }> => {
  try {
    const { status, data } = await axios.patch(
      `${BASE_URL}${endpoint}`,
      payload,
      config
    );

    return { status, data };
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // console.log("Request was canceled due to timeout");
    }

    return {
      status: error.response?.status ?? 0,
      data: error.response?.data ?? null,
    };
  }
};
