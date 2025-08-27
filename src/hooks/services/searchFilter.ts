import { useEffect, useState } from "react";

export const useSearchFilter = <T extends Record<string, any>>(
  dataArr: T[] = [],
  arrKeys: (keyof T)[] // now we accept an array of keys
) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>(dataArr);

  useEffect(() => {
    if (searchValue) {
      const lookedUpData = dataArr.filter((item) =>
        arrKeys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
      setFilteredData(lookedUpData);
    } else {
      setFilteredData(dataArr);
    }
  }, [searchValue, dataArr, arrKeys]);

  return {
    filteredData,
    setSearchValue,
    searchValue,
  };
};
