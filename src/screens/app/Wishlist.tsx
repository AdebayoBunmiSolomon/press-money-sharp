import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useRef } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { ProductCard } from "@src/common/cards";
import { FloatActionButton, Loader } from "@src/common";
import { useAuthStore } from "@src/api/store/auth";
import { useGetUserWishList } from "@src/api/hooks/queries/app";
import { apiGetUserWishListResponse } from "@src/api/types/app";
import { CustomText } from "@src/components/shared";
import { useGetServiceInfoFromAllServiceStore } from "@src/api/hooks";
import { queryClient } from "@src/helper/utils";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";
import { useLikedServicesIdCache } from "@src/cache";
import {
  useAddProductToWishList,
  useDeleteProductFromWishList,
} from "@src/api/hooks/mutation/app";

export const Wishlist = ({
  navigation,
}: RootStackScreenProps<appScreenNames.WISH_LIST>) => {
  const flatListRef = useRef<FlatList>(null);
  const { userData } = useAuthStore();
  const { userWishList, isFetching } = useGetUserWishList(userData?.token);
  const { getServiceInfoFromAllServiceStore } =
    useGetServiceInfoFromAllServiceStore();
  const { likedServiceId } = useLikedServicesIdCache();
  const { AddProductToWishList, isPending } = useAddProductToWishList();
  const { DeleteProductFromWishList, isPending: isDeleting } =
    useDeleteProductFromWishList();

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
          title='Wish List'
          headerStyle={styles.header}
          color={colors.white}
        />
        <View style={styles.contentContainer}>
          {isFetching ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Loader size='large' color={colors.red} />
            </View>
          ) : userWishList && userWishList.length > 0 ? (
            <FlatList
              refreshing={isFetching}
              onRefresh={() => {
                queryClient.invalidateQueries({
                  queryKey: [appQueryKeys.GET_USER_WISHLIST, userData?.token],
                });
              }}
              ref={flatListRef}
              data={userWishList}
              contentContainerStyle={{
                gap: moderateScale(15),
                paddingBottom: DVH(20),
              }}
              keyExtractor={(__, index) => index.toString()}
              renderItem={({
                item,
                index,
              }: {
                item: apiGetUserWishListResponse;
                index: number;
              }) => {
                const data = getServiceInfoFromAllServiceStore(
                  item?.our_service_id
                );
                const isLiked =
                  likedServiceId &&
                  likedServiceId.some((id) => id === item?.our_service_id);
                return (
                  <ProductCard
                    key={index}
                    title={String(data?.title)}
                    price={String(data?.price)}
                    location={String(data?.location)}
                    onClickCard={() =>
                      navigation.navigate(appScreenNames.CAR_DETAILS, {
                        service_uuid: String(data?.uuid),
                      })
                    }
                    image={data?.image_url}
                    onLikeProd={() => {
                      if (!isLiked) {
                        AddProductToWishList({
                          service_id: item?.id,
                        });
                      } else {
                        DeleteProductFromWishList({
                          wishList_uuid: item?.uuid,
                          service_id: item?.our_service_id,
                        });
                      }
                    }}
                    liked={isLiked}
                    loading={isPending || isDeleting}
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
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CustomText type='medium' size={14} lightGray>
                No wishlist exists for you
              </CustomText>
            </View>
          )}
        </View>
        <FloatActionButton
          onPressArrowUp={() =>
            flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
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
    paddingVertical: moderateScale(0),
    paddingHorizontal: moderateScale(0),
    // paddingHorizontal: moderateScale(15),
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
});
