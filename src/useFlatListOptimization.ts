import { useEffect, useState } from "react";

export type dataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export const useFlatListOptimization = () => {
  const [data, setData] = useState<dataType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  //   const { storeData, getData } = useStore();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const fetchedData = (await response.json()) as dataType[];
      setData(fetchedData);
    } catch (err: any) {
      //   console.log("fetch error", err);
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initiateFetchData = async () => {
      if (data.length === 0) {
        await fetchData();
      }
    };

    initiateFetchData();
  }, [data]);

  return {
    data,
    loading,
    error,
  };
};
