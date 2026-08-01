import axios, { AxiosRequestConfig } from "axios";

export const GET = async (
  endpoint: string,
  config?: AxiosRequestConfig,
  payload?: Record<string, any>,
): Promise<{ status: number; data?: any }> => {
  try {
    const { status, data } = await axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URL}${endpoint}`,
      {
        ...config,
        params: payload,
      },
    );

    return { status, data };
  } catch (error: any) {
    // console.error("Error fetching data:", error);

    if (axios.isCancel(error)) {
      // console.log("Request was canceled due to timeout");
    }
    return {
      status: error.response?.status ?? 0, // ✅ `0` for network errors
      data: error.response?.data ?? null,
    };
  }
};
