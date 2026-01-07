import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataType } from "./useFlatListOptimization";

export const useStore = () => {
  const storeData = async () => {
    const data: dataType[] = [];
    await AsyncStorage.setItem("@userData", JSON.stringify(data!));
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("@userData");
    const stringifiedData = JSON.stringify(data);
    return stringifiedData;
  };

  return {
    storeData,
    getData,
  };
};
