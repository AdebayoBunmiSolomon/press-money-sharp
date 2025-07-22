import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { useCategoriesStore } from "@src/api/store/app";
import { ProductCard } from "@src/common/cards";
import { FloatActionButton } from "@src/common";
import { useFilterServices } from "@src/api/hooks";
import { apiGetAllServicesResponse } from "@src/api/types/app";
import { useLikedServicesIdCache } from "@src/cache";
import { useAddProductToWishList } from "@src/api/hooks/mutation/app";

export const CarHire = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CAR_HIRE>) => {
  const flatListRef = useRef<FlatList>(null);
  const { categories } = useCategoriesStore();
  const [pressedCategory, setPressedCategory] = useState<string | undefined>(
    categories && categories[0]
  );
  const { filteredServicesData, getFilteredServices } = useFilterServices();
  const { likedServiceId } = useLikedServicesIdCache();
  const { AddProductToWishList, isPending } = useAddProductToWishList();

  useEffect(() => {
    if (pressedCategory) {
      getFilteredServices(pressedCategory);
    }
  }, [pressedCategory]);
  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer}>
        <Header
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.white}
              />
            </TouchableOpacity>
          }
          title={"Cars for Hire"}
          headerStyle={styles.header}
          color={colors.white}
          showSearchIcon
        />
        <View style={styles.contentContainer}>
          {/* filter categories */}
          <View
            style={{
              paddingBottom: moderateScale(10),
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.filterBtn}>
                <Foundation
                  name='filter'
                  size={moderateScale(17)}
                  color={colors.red}
                />
                <CustomText size={12} type='medium' lightBlack>
                  Filters
                </CustomText>
              </TouchableOpacity>
              {categories &&
                categories.map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styles.filterBtn,
                      {
                        backgroundColor:
                          pressedCategory === item ? "#b0b0b02f" : undefined,
                      },
                    ]}
                    key={index}
                    onPress={() => setPressedCategory(item)}>
                    <CustomText size={12} type='medium' lightBlack>
                      {`Car ` + item}
                    </CustomText>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <FlatList
            ref={flatListRef}
            data={filteredServicesData}
            contentContainerStyle={{
              gap: moderateScale(15),
              paddingBottom: DVH(25),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }: { item: apiGetAllServicesResponse }) => {
              const isLiked =
                likedServiceId && likedServiceId.some((id) => id === item?.id);
              return (
                <ProductCard
                  title={`${item?.brand} ${item?.model}`}
                  price={String(item?.fee)}
                  location={item?.location}
                  onClickCard={() =>
                    navigation.navigate(appScreenNames.CAR_DETAILS, {
                      service_uuid: item?.uuid,
                    })
                  }
                  image={item?.image_urls[0]}
                  onLikeProd={() => {
                    if (!isLiked) {
                      AddProductToWishList({
                        service_id: item?.id,
                      });
                    } else {
                      //write the delete from wishlist functionality
                    }
                  }}
                  liked={isLiked}
                  loading={isPending}
                />
              );
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
          />
          <View
            style={{
              paddingVertical: DVH(10),
            }}
          />
        </View>
        <FloatActionButton
          onPressArrowUp={() =>
            flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
          }
          onPressWhatsApp={() => {}}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  header: {
    backgroundColor: colors.red,
    paddingTop:
      Platform?.OS === "android" ? moderateScale(50) : moderateScale(50),
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(30),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    borderRadius: moderateScale(50),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderWidth: DVW(0.3),
    borderColor: colors.lightGray,
    marginRight: moderateScale(10),
  },
});
