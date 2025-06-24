import { APIRequest } from "@src/api/request";
import { getCategory } from "@src/api/services/app";
import { useCategoriesStore } from "@src/api/store/app";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  const { categories, setCategories } = useCategoriesStore();
  const {
    data: categoryData,
    isFetching,
    isError,
  } = useQuery<string[]>({
    queryKey: ["get-category"],
    queryFn: async () => {
      const response = await getCategory();
      if (response?.data?.success) {
        APIRequest.RESPONSE_HANDLER({
          type: "flash",
          status: response?.data?.success ? 200 : 401, //200 | 401 | 500
          success: response?.data?.success, //true | false
          code: response?.data?.error?.code || "Success",
          message: response?.data?.success
            ? "Category fetched successfully"
            : "Category not fetched successfully",
        });
        setCategories(categoryData);
        return response.data.data;
      }
      APIRequest.RESPONSE_HANDLER({
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return {
    categories,
    isFetching,
    isError,
  };
};
