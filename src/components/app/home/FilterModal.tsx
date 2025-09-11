import { useAllServicesStore, useSettingsStore } from "@src/api/store/app";
import { ProductCard } from "@src/common/cards";
import {
  CustomInput,
  CustomText,
  PaginationControls,
} from "@src/components/shared";
import { useSearchFilter } from "@src/hooks/services";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { useAddProductToWishList } from "@src/api/hooks/mutation/app";
import { useLikedServicesIdCache } from "@src/cache";
import { ModalMessageProvider } from "@src/helper/ui-utils";
import { useAuthStore } from "@src/api/store/auth";
import { FloatActionButton } from "@src/common";
import { openWhatsApp } from "@src/helper/utils";
import { apiGetAllServicesResponse } from "@src/api/types/app";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { usePaginationControl } from "@src/components/shared/hooks";

interface IFilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export const FilterModal: React.FC<IFilterModalProps> = ({
  visible,
  onClose,
}) => {
  const { allServices } = useAllServicesStore();
  const { userData } = useAuthStore();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const searchKeys = useMemo(
    () => ["brand", "location", "model", "fee", "type", "description"],
    []
  );
  const flashListRef = useRef<FlashListRef<apiGetAllServicesResponse>>(null);
  const { settings: settingsData } = useSettingsStore();

  const { searchValue, setSearchValue, filteredData } = useSearchFilter(
    allServices,
    searchKeys as any
  );

  // ✅ Use the pagination hook
  const pagination = usePaginationControl({
    data: filteredData || [],
    itemsPerPage: 10,
    resetOnDataChange: true,
  });

  const [selectedProdIndex, setSelectedProdIndex] = useState<number | null>(
    null
  );
  const { AddProductToWishList, isPending } = useAddProductToWishList();
  const { likedServiceId } = useLikedServicesIdCache();

  // ✅ Memoize liked IDs set for faster lookup
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

  // const handleGoToPage = useCallback(
  //   (page: number) => {
  //     pagination.goToPage(page);
  //     handlePageChange();
  //   },
  //   [pagination.goToPage, handlePageChange]
  // );

  // ✅ Handler for navigating to details
  const handleCardClick = useCallback(
    (uuid: string) => {
      navigation.navigate(appScreenNames.CAR_DETAILS, { service_uuid: uuid });
      onClose();
    },
    [navigation, onClose]
  );

  // ✅ Handler for liking products
  const handleLike = useCallback(
    (item: apiGetAllServicesResponse, index: number, isLiked: boolean) => {
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

  // ✅ Memoized renderItem
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

  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.modalHeaderContainer}>
              <CustomText
                type='medium'
                size={14}
                lightBlack
                style={{
                  paddingVertical: moderateScale(10),
                }}>
                Search for services here
              </CustomText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onClose()}>
                <CustomText type='semi-bold' size={15} lightBlack>
                  X
                </CustomText>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingBottom: moderateScale(10),
              }}>
              <CustomInput
                value={searchValue}
                onChangeText={(enteredText) => {
                  setSearchValue(enteredText);
                }}
                type='custom'
                placeholder='Search by brand,price,model,location or type'
                placeHolderTextColor={"#BDBDBD"}
                searchInput
                style={styles.input}
              />
            </View>
            {pagination.paginatedData && pagination.paginatedData.length > 0 ? (
              <FlashList
                ref={flashListRef}
                data={pagination.paginatedData}
                contentContainerStyle={{
                  paddingBottom: DVH(10),
                }}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsVerticalScrollIndicator={true}
                ItemSeparatorComponent={() => (
                  <View style={{ height: moderateScale(15) }} />
                )}
                getItemType={(item, __) => {
                  return item.type || "default";
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <CustomText type='regular' size={16} lightGray>
                  No record found for {`${searchValue}`}
                </CustomText>
              </View>
            )}

            {/* ✅ Reusable Pagination Controls - Bottom */}
            {pagination.totalPages > 1 && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                currentItems={pagination.currentItems}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                showItemCount={false}
                primaryColor={colors.red}
                previousText='Prev'
                nextText='Next'
                style={{
                  zIndex: 10,
                  width: "85%",
                  marginBottom:
                    Platform.OS === "ios"
                      ? moderateScale(30)
                      : moderateScale(10),
                }}
              />
            )}
          </View>

          <FloatActionButton
            onPressArrowUp={() => {
              flashListRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
              });
            }}
            onPressWhatsApp={() => {
              const whatsAppNumber =
                settingsData &&
                settingsData.find((i) => i.type === "Whatsapp")?.value;
              if (whatsAppNumber) {
                openWhatsApp(whatsAppNumber);
              }
            }}
            showMsgBtn
            containerStyle={{
              paddingBottom: DVH(2.5),
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    height: "90%",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    paddingVertical: moderateScale(5),
    paddingHorizontal:
      Platform.OS === "ios" ? moderateScale(10) : moderateScale(12),
    backgroundColor: colors.lightGray,
    borderRadius: moderateScale(100),
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
    borderRadius: moderateScale(20),
    height: DVH(5),
  },
});
