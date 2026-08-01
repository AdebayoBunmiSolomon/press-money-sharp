import { APILogger } from "@src/helper/utils";
import axios, { AxiosRequestConfig } from "axios";

export const PUT = async (
  endpoint: string,
  payload: Record<string, any>,
  config?: AxiosRequestConfig,
): Promise<{ status: number; data?: any }> => {
  try {
    const { status, data } = await axios.put(
      `${process.env.EXPO_PUBLIC_BASE_URL}${endpoint}`,
      payload,
      config,
    );

    return { status, data };
  } catch (error: any) {
    // console.error("Error updating data:", error);

    if (axios.isCancel(error)) {
      APILogger(
        400,
        false,
        "Axios Error",
        "Request was canceled due to timeout",
      );
      // console.log();
    }

    return {
      status: error.response?.status ?? 0,
      data: error.response?.data ?? null,
    };
  }
};
