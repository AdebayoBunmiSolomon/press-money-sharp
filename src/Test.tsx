import React, { useCallback } from "react";
import { FlatList, View, Text } from "react-native";
import { dataType, useFlatListOptimization } from "./useFlatListOptimization";

export const FlatListOptimization = () => {
  const { data, loading, error } = useFlatListOptimization();

  const renderItem = useCallback(({ item }: { item: dataType }) => {
    return <Text>{item.title}</Text>;
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        ListEmptyComponent={
          loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error</Text>
          ) : (
            <Text>Empty User</Text>
          )
        }
      />
    </View>
  );
};
