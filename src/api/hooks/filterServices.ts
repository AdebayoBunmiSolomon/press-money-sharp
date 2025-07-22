import { useState } from "react";
import { useAllServicesStore } from "../store/app";
import { apiViewServicesResponse } from "../types/app";

/**
 * this helps to filter products based on the services pressed.
 * @returns products based on the categories of services pressed e.g. Hire, Sales, Consultation e.t.c.
 */
export const useFilterServices = () => {
  const { allServices } = useAllServicesStore();
  const [filteredServicesData, setFilteredServicesData] = useState<
    apiViewServicesResponse[]
  >([]);

  const getFilteredServices = (pressedCategory: string) => {
    const filteredData =
      allServices &&
      allServices.filter(
        (item) =>
          item?.category.toLowerCase() === pressedCategory?.toLowerCase()
      );
    if (filteredData) {
      setFilteredServicesData(filteredData);
    } else {
      setFilteredServicesData([]);
    }
  };

  return {
    filteredServicesData,
    setFilteredServicesData,
    getFilteredServices,
  };
};
