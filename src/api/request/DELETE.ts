import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@env";

export const DELETE = async (
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<{ status: number; data?: any }> => {
  try {
    const { status, data } = await axios.delete(
      `${BASE_URL}${endpoint}`,
      config
    );

    return { status, data };
  } catch (error: any) {
    console.error("Error deleting data:", error);

    if (axios.isCancel(error)) {
      console.log("Request was canceled due to timeout");
    }

    return {
      status: error.response?.status ?? 0,
      data: error.response?.data ?? null,
    };
  }
};
