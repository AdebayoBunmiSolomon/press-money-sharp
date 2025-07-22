import { useAllServicesStore } from "../store/app";

export const useGetServiceInfoFromAllServiceStore = () => {
  const { allServices } = useAllServicesStore();

  const getServiceInfoFromAllServiceStore = (service_id: number) => {
    const filteredService =
      allServices && allServices.find((i) => i.id === service_id);
    if (filteredService) {
      return {
        title: `${filteredService?.brand} ${filteredService?.model}` || "",
        price: filteredService?.fee || 0,
        location: filteredService?.location || "Anywhere",
        image_url: filteredService?.image_urls || [],
        uuid: filteredService?.uuid || "",
      };
    }
  };

  return {
    getServiceInfoFromAllServiceStore,
  };
};
