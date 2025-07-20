import { APIRequest } from "@src/api/request";
import {
  getAllServices,
  getCategory,
  viewService,
} from "@src/api/services/app";
import { useAllServicesStore, useCategoriesStore } from "@src/api/store/app";
import {
  apiGetAllServicesResponse,
  apiViewServicesResponse,
} from "@src/api/types/app";
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

export const useGetAllServices = () => {
  const { setAllServices } = useAllServicesStore();

  const { data, isFetching, isError } = useQuery<apiGetAllServicesResponse[]>({
    queryKey: ["get-all-services"],
    queryFn: async () => {
      const response = await getAllServices();

      if (response?.data?.success) {
        const allServices = response?.data?.data || [];
        setAllServices(allServices); // ✅ Now setting correctly
        return allServices; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    retry: true,
    refetchOnReconnect: true,
  });

  return {
    allServices: data,
    isFetching,
    isError,
  };
};

export const useViewService = (service_uuid: string) => {
  const { data, isFetching, isError } = useQuery<apiViewServicesResponse>({
    queryKey: ["view-service", service_uuid],
    queryFn: async () => {
      const response = await viewService(service_uuid);

      if (response?.data?.success) {
        const serviceInfo = response?.data?.data || [];
        return serviceInfo; // ✅ Return the real data
      }

      APIRequest.RESPONSE_HANDLER({
        type: "modal",
        status: 500,
        success: false,
        code: "NETWORK ERROR",
        message:
          response?.error?.message ||
          "Network error. Please check your connection.",
      });

      return []; // fallback
    },
    enabled: !!service_uuid,
    retry: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return {
    serviceInfo: data,
    isFetching,
    isError,
  };
};
