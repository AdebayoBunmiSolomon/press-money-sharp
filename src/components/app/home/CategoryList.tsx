import { Loader } from "@src/common";
import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CategoryCard } from "@src/common/cards";

interface ICategoryListProps {
  isLoading: boolean;
  data?: string[];
}

export const CategoryList: React.FC<ICategoryListProps> = ({
  isLoading,
  data,
}) => {
  const listRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollToIndex = (index: number) => {
    if (!listRef.current || !data?.length) return;
    listRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (!data) return;

    const nextIndex = Math.min(currentIndex + 1, data.length - 1);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <CustomText type='medium' size={16} red>
          Categories
        </CustomText>
        <View style={styles.carouselBtnContainer}>
          <TouchableOpacity
            onPress={() => handlePrev()}
            disabled={currentIndex === 0 ? true : false}>
            <MaterialIcons
              name='keyboard-arrow-left'
              size={moderateScale(30)}
              color={currentIndex === 0 ? colors.lightGray : colors.red}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNext()}
            disabled={data ? currentIndex === data.length - 1 : true}>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={moderateScale(30)}
              color={
                data && currentIndex === data.length - 1
                  ? colors.lightGray
                  : colors.red
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Loader size='small' color={colors.lightGray} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={data}
          contentContainerStyle={{
            gap: moderateScale(15),
          }}
          keyExtractor={(__, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CategoryCard item={item} key={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={2}
          initialNumToRender={2}
          windowSize={2}
          updateCellsBatchingPeriod={100}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef.current}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: moderateScale(10),
  },
  carouselBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
  },
});
