import { APIRequest } from "@src/api/request";
import { getCategory } from "@src/api/services/app";
import { useCategoriesStore } from "@src/api/store/app";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  const { setCategories } = useCategoriesStore();

  const { data, isFetching, isError } = useQuery<string[]>({
    queryKey: ["get-category"],
    queryFn: async () => {
      const response = await getCategory();

      if (response?.data?.success) {
        const categories = response?.data?.data || [];
        setCategories(categories); // ✅ Now setting correctly
        return categories; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    categories: data,
    isFetching,
    isError,
  };
};
