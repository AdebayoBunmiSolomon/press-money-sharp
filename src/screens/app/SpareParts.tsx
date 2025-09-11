import { CustomText, PaginationControls } from "@src/components/shared";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { FilterModal, Header } from "@src/components/app/home";
import { AntDesign, Foundation } from "@expo/vector-icons";
import { useCategoriesStore, useSettingsStore } from "@src/api/store/app";
import { ProductCard } from "@src/common/cards";
import { FloatActionButton } from "@src/common";
import { apiGetAllServicesResponse } from "@src/api/types/app";
import { useFilterServices } from "@src/api/hooks";
import { useAddProductToWishList } from "@src/api/hooks/mutation/app";
import { useLikedServicesIdCache } from "@src/cache";
import { ModalMessageProvider } from "@src/helper/ui-utils";
import { useAuthStore } from "@src/api/store/auth";
import { openWhatsApp } from "@src/helper/utils";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { usePaginationControl } from "@src/components/shared/hooks";

export const SpareParts = ({
  navigation,
  route,
}: RootStackScreenProps<appScreenNames.SPARE_PARTS>) => {
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const flashListRef = useRef<FlashListRef<apiGetAllServicesResponse>>(null);
  const { AddProductToWishList, isPending } = useAddProductToWishList();
  const { likedServiceId } = useLikedServicesIdCache();
  const { categories } = useCategoriesStore();
  const { category_type } = route?.params ?? { category_type: categories?.[5] };
  const [pressedCategory, setPressedCategory] = useState<string | undefined>(
    categories && categories[5]
  );
  const { userData } = useAuthStore();
  const { filteredServicesData, getFilteredServices } = useFilterServices();
  const [selectedProdIndex, setSelectedProdIndex] = useState<number | null>(
    null
  );
  const { settings: settingsData } = useSettingsStore();

  // ✅ Pagination hook - reset when category changes
  const pagination = usePaginationControl({
    data: filteredServicesData || [],
    itemsPerPage: 3,
    resetOnDataChange: true,
  });

  useEffect(() => {
    if (pressedCategory) {
      getFilteredServices(pressedCategory);
    }
  }, [pressedCategory]);

  useEffect(() => {
    if (category_type) {
      setPressedCategory(category_type);
    } else {
      setPressedCategory(categories?.[0]);
    }
  }, [category_type, categories]);

  const likedSet = useMemo(
    () => new Set(likedServiceId || []),
    [likedServiceId]
  );

  // ✅ Scroll to top when changing pages
  const handlePageChange = useCallback(() => {
    flashListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, []);

  // ✅ Enhanced page navigation with scroll
  const handleNextPage = useCallback(() => {
    pagination.goToNextPage();
    handlePageChange();
  }, [pagination.goToNextPage, handlePageChange]);

  const handlePrevPage = useCallback(() => {
    pagination.goToPrevPage();
    handlePageChange();
  }, [pagination.goToPrevPage, handlePageChange]);

  const handleGoToPage = useCallback(
    (page: number) => {
      pagination.goToPage(page);
      handlePageChange();
    },
    [pagination.goToPage, handlePageChange]
  );

  // ✅ Handler for navigating to details
  const handleCardClick = useCallback(
    (uuid: string) => {
      navigation.navigate(appScreenNames.CAR_DETAILS, { service_uuid: uuid });
    },
    [navigation]
  );

  // ✅ Handler for liking products with pagination adjustment
  const handleLike = useCallback(
    (item: apiGetAllServicesResponse, index: number, isLiked: boolean) => {
      // Calculate global index for pagination
      const globalIndex = pagination.startIndex + index;
      setSelectedProdIndex(globalIndex);
      if (!isLiked) {
        AddProductToWishList({ service_id: item?.id });
      } else {
        ModalMessageProvider.showModalMsg({
          title: `Hello ${userData?.first_name?.toUpperCase()}`,
          description: "Go to your wishlist to remove item",
          msgType: "FAILED",
        });
      }
    },
    [
      AddProductToWishList,
      setSelectedProdIndex,
      userData,
      pagination.startIndex,
    ]
  );

  // ✅ Memoized renderItem with React.memo for ProductCard
  const renderItem = useCallback(
    ({ item, index }: { item: apiGetAllServicesResponse; index: number }) => {
      const isLiked = likedSet.has(item?.id);
      const globalIndex = pagination.startIndex + index;

      return (
        <ProductCard
          title={`${item?.brand} ${item?.model}`}
          price={String(item?.fee)}
          location={item?.location}
          onClickCard={() => handleCardClick(item?.uuid)}
          image={item?.image_urls[0]}
          onLikeProd={() => handleLike(item, index, isLiked)}
          loading={selectedProdIndex === globalIndex ? isPending : false}
          liked={isLiked}
          key={item?.uuid || item?.id}
        />
      );
    },
    [
      likedSet,
      handleCardClick,
      handleLike,
      selectedProdIndex,
      isPending,
      pagination.startIndex,
    ]
  );

  // ✅ Better keyExtractor
  const keyExtractor = useCallback(
    (item: apiGetAllServicesResponse, index: number) =>
      item?.uuid || item?.id?.toString() || index.toString(),
    []
  );

  // ✅ Handle category change - reset pagination and scroll to top
  const handleCategoryPress = useCallback(
    (category: string) => {
      setPressedCategory(category);
      // Reset pagination will be handled by the hook's resetOnDataChange
    },
    [setPressedCategory]
  );

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
          title={
            pressedCategory
              ? `Car ${pressedCategory}`
              : String(categories && `Car ${categories[1]}`)
          }
          headerStyle={styles.header}
          color={colors.white}
          onPressBellIcon={() =>
            navigation.navigate(bottomTabScreenNames.MESSAGES_STACK, {
              screen: appScreenNames.NOTIFICATION,
            })
          }
          showBellIcon
        />
        <View style={styles.contentContainer}>
          {/* Filter categories */}
          <View
            style={{
              paddingBottom: moderateScale(10),
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => setShowFilterModal(!showFilterModal)}>
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
                    onPress={() => handleCategoryPress(item)}>
                    <CustomText size={12} type='medium' lightBlack>
                      {`Car ` + item}
                    </CustomText>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          {/* ✅ FlashList with Pagination */}
          {pagination.paginatedData && pagination.paginatedData.length > 0 ? (
            <FlashList
              ref={flashListRef}
              data={pagination.paginatedData}
              contentContainerStyle={{
                paddingBottom: DVH(5),
              }}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: moderateScale(15) }} />
              )}
              getItemType={(item) => {
                return item.type || "default";
              }}
              // ✅ Performance optimizations
              drawDistance={200}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <CustomText type='regular' size={16} lightGray>
                No record found for {`Car ${pressedCategory}`}
              </CustomText>
            </View>
          )}

          <View style={{ paddingVertical: DVH(2) }} />
        </View>

        <FloatActionButton
          onPressArrowUp={() =>
            flashListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
          }
          onPressWhatsApp={() => {
            const whatsAppNumber =
              settingsData &&
              settingsData.find((i) => i.type === "Whatsapp")?.value;
            if (whatsAppNumber) {
              openWhatsApp(whatsAppNumber);
            }
          }}
        />

        {/* ✅ Pagination Controls - Top */}
        {pagination.totalPages > 1 && (
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            currentItems={pagination.currentItems}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onGoToPage={handleGoToPage}
            showPageNumbers={false}
            maxPageNumbers={3}
            primaryColor={colors.red}
            style={styles.pagination}
          />
        )}
      </Screen>
      <FilterModal
        onClose={() => setShowFilterModal(!showFilterModal)}
        visible={showFilterModal}
      />
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
    flex: 1,
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
  emptyContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    marginBottom: moderateScale(10),
    width: "82%",
  },
});
