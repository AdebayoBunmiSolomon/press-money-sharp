import { useLikedServicesIdCache } from "@src/cache";

/**
 * Hook that performs the liking and un-liking of product from device storage...
 * @returns ids of liked services or products
 */
export const useLikedServiceId = () => {
  //to perform like and unlike functionality
  const { addLikedServiceIdToCache, likedServiceId } =
    useLikedServicesIdCache();
  const likeUnlikeService = (serviceId: number) => {
    const serviceExists =
      likedServiceId && likedServiceId.some((id) => id === serviceId);
    if (!serviceExists) {
      const updatedLikedService = [...likedServiceId, serviceId];
      addLikedServiceIdToCache(updatedLikedService);
    } else {
      const filteredLikedService =
        likedServiceId && likedServiceId.filter((id) => id !== serviceId);
      addLikedServiceIdToCache(filteredLikedService);
    }
  };

  return {
    likeUnlikeService,
  };
};
