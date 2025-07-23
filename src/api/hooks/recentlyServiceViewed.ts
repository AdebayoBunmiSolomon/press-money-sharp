import { useRecentlyViewedServicesIdCache } from "@src/cache";

/**
 * Hook that performs the liking and un-liking of recently viewed from device storage...
 * @returns ids of recently viewed services or products
 */
export const useRecentlyViewedServiceId = () => {
  //to perform like and unlike functionality
  const { addRecentlyViewedServiceIdToCache, recentlyViewedServiceId } =
    useRecentlyViewedServicesIdCache();
  const likeUnlikeRecentlyViewed = (serviceId: number) => {
    const recentlyViewedExists =
      recentlyViewedServiceId &&
      recentlyViewedServiceId.some((id) => id === serviceId);
    if (!recentlyViewedExists) {
      const updatedRecentlyViewedService = [
        ...recentlyViewedServiceId,
        serviceId,
      ];
      addRecentlyViewedServiceIdToCache(updatedRecentlyViewedService);
    } else {
      const filteredLikedService =
        recentlyViewedServiceId &&
        recentlyViewedServiceId.filter((id) => id !== serviceId);
      addRecentlyViewedServiceIdToCache(filteredLikedService);
    }
  };

  return {
    likeUnlikeRecentlyViewed,
  };
};
