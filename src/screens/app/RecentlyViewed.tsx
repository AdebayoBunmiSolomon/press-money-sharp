import React, { useRef, useState } from "react";
import { Screen } from "../Screen";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { CustomButton, CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { AntDesign } from "@expo/vector-icons";
import { Header } from "@src/components/app/home";
import { ProductCard } from "@src/common/cards";
import { FloatActionButton, Loader } from "@src/common";
import { useGetUserRecentlyViewed } from "@src/api/hooks/queries/app";
import { useAuthStore } from "@src/api/store/auth";
import { useGetServiceInfoFromAllServiceStore } from "@src/api/hooks";
import { queryClient } from "@src/helper/utils";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";
import { apiGetUserRecentlyViewedResponse } from "@src/api/types/app";
import { useRecentlyViewedServicesIdCache } from "@src/cache";
import {
  useAddProductToRecentlyViewed,
  useDeleteRecentlyViewed,
} from "@src/api/hooks/mutation/app";

export const RecentlyViewed = ({
  navigation,
}: RootStackScreenProps<appScreenNames.RECENTLY_VIEWED>) => {
  const flatListRef = useRef<FlatList>(null);
  const { userData } = useAuthStore();
  const { userRecentlyViewed, isFetching } = useGetUserRecentlyViewed(
    userData?.token
  );
  const { DeleteFromRecentlyViewed, isPending: isDeleting } =
    useDeleteRecentlyViewed();
  const { getServiceInfoFromAllServiceStore } =
    useGetServiceInfoFromAllServiceStore();
  const { recentlyViewedServiceId, clearRecentlyViewedServiceIdFromCache } =
    useRecentlyViewedServicesIdCache();
  const { AddProductToRecentlyViewed, isPending } =
    useAddProductToRecentlyViewed();
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const clearAllRecentlyViewed = async () => {
    setIsClearing(true);
    try {
      if (userRecentlyViewed && userRecentlyViewed.length > 0) {
        for (const item of userRecentlyViewed) {
          DeleteFromRecentlyViewed({
            service_id: item?.our_service_id,
            recentlyViewed_uuid: item?.uuid,
          });
        }
        clearRecentlyViewedServiceIdFromCache();
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <Screen style={styles.screenContainer} bgColor={colors.white}>
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
        title={"Recently Viewed"}
        headerStyle={styles.header}
        color={colors.white}
        showSearchIcon
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
        ) : userRecentlyViewed && userRecentlyViewed.length > 0 ? (
          <FlatList
            ListFooterComponent={
              <View
                style={{
                  paddingVertical: DVH(5),
                }}
              />
            }
            refreshing={isFetching}
            onRefresh={() => {
              queryClient.invalidateQueries({
                queryKey: [appQueryKeys.GET_RECENTLY_VIEWED, userData?.token],
              });
            }}
            ref={flatListRef}
            data={userRecentlyViewed}
            contentContainerStyle={{
              gap: moderateScale(15),
              paddingBottom: DVH(20),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({
              item,
              index,
            }: {
              item: apiGetUserRecentlyViewedResponse;
              index: number;
            }) => {
              const data = getServiceInfoFromAllServiceStore(
                item?.our_service_id
              );
              const isLiked =
                recentlyViewedServiceId &&
                recentlyViewedServiceId.some(
                  (id) => id === item?.our_service_id
                );
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
                      AddProductToRecentlyViewed({
                        service_id: item?.id,
                      });
                    } else {
                      DeleteFromRecentlyViewed({
                        service_id: item?.our_service_id,
                        recentlyViewed_uuid: item?.uuid,
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
            <CustomText
              type='medium'
              size={14}
              lightGray
              style={{
                textAlign: "center",
              }}>
              No recently viewed service{"\n"}available for you
            </CustomText>
          </View>
        )}
      </View>
      <View style={styles.floatActionContainer}>
        <FloatActionButton
          containerStyle={{
            paddingBottom: moderateScale(100),
          }}
          onPressArrowUp={() =>
            flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
          }
          onPressWhatsApp={() => {}}
        />
        <CustomButton
          title='Clear All'
          white
          textRed
          buttonType='Solid'
          textSize={16}
          textType='medium'
          onPress={async () => await clearAllRecentlyViewed()}
          btnStyle={styles.clearBtn}
          loaderColor={colors.red}
          isLoading={isClearing}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
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
  floatActionContainer: {
    position: "absolute",
    width: "100%",
    bottom: moderateScale(0),
    paddingBottom: moderateScale(40),
    backgroundColor: colors.white,
  },
  clearBtn: {
    width: "100%",
  },
});
