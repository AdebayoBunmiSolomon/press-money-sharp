import { useAllServicesStore, useSettingsStore } from "@src/api/store/app";
import { ProductCard } from "@src/common/cards";
import { CustomInput, CustomText } from "@src/components/shared";
import { useSearchFilter } from "@src/hooks/services";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
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
    () => ["brand", "location", "model", "fee", "type"],
    []
  );
  const flatListRef = useRef<FlatList>(null);
  const { settings: settingsData } = useSettingsStore();

  const { searchValue, setSearchValue, filteredData } = useSearchFilter(
    allServices,
    searchKeys as any
  );
  const [selectedProdIndex, setSelectedProdIndex] = useState<number | null>(
    null
  );
  const { AddProductToWishList, isPending } = useAddProductToWishList();
  const { likedServiceId } = useLikedServicesIdCache();
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
            {filteredData && filteredData.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={filteredData}
                contentContainerStyle={{
                  gap: moderateScale(15),
                  paddingBottom: DVH(10),
                }}
                keyExtractor={(__, index) => index.toString()}
                renderItem={({ item, index }) => {
                  const isLiked =
                    likedServiceId &&
                    likedServiceId.some((id) => id === item?.id);
                  return (
                    <ProductCard
                      title={`${item?.brand} ${item?.model}`}
                      price={String(item?.fee)}
                      location={item?.location}
                      onClickCard={() => {
                        navigation.navigate(appScreenNames.CAR_DETAILS, {
                          service_uuid: item?.uuid,
                        });
                        onClose();
                      }}
                      image={item?.image_urls[0]}
                      onLikeProd={() => {
                        if (!isLiked) {
                          setSelectedProdIndex(index);
                          AddProductToWishList({
                            service_id: item?.id,
                          });
                        } else {
                          setSelectedProdIndex(index);
                          ModalMessageProvider.showModalMsg({
                            title: `Hello ${userData?.first_name.toUpperCase()}`,
                            description: "Go to your wishlist to remove item",
                            msgType: "FAILED",
                          });
                        }
                      }}
                      loading={selectedProdIndex === index ? isPending : false}
                      liked={isLiked}
                    />
                  );
                }}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={2}
                initialNumToRender={2}
                windowSize={2}
              />
            ) : (
              <View
                style={{
                  // flex: 1,
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
          </View>
          <FloatActionButton
            onPressArrowUp={() =>
              flatListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
              })
            }
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
