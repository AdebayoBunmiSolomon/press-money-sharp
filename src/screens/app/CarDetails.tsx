import React, { useCallback, useEffect, useState } from "react";
import { Screen } from "../Screen";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import {
  DVH,
  DVW,
  moderateScale,
  screenWidth,
} from "@src/resources/responsiveness";
import { Header } from "@src/components/app/home";
import { AntDesign, Entypo, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { CustomButton, CustomText } from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { ImageBackground } from "expo-image";
import { useActionModal } from "@src/hooks/services";
import {
  CallAction,
  MessageAction,
  WhatsAppAction,
} from "@src/components/app/actions";
import { useGetSettings, useViewService } from "@src/api/hooks/queries/app";
import { formatAmountWithCommas, queryClient } from "@src/helper/utils";
import { useFocusEffect } from "@react-navigation/native";
import { Loader } from "@src/common";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { settingsType } from "@src/types/types";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";

export const CarDetails = ({
  navigation,
  route,
}: RootStackScreenProps<appScreenNames.CAR_DETAILS>) => {
  const { service_uuid } = route?.params;
  const { serviceInfo, isFetching } = useViewService(service_uuid);
  const { actionModal, setActionModal } = useActionModal();
  const [returnedData, setReturnedData] = useState<any>(null);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [pressedSettings, setPressedSettings] = useState<settingsType | string>(
    ""
  );
  const { isFetching: isFetchingSettings, settingsData } =
    useGetSettings(pressedSettings);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: [appQueryKeys.VIEW_SERVICE, service_uuid], // ✅ Matches the queryKey now
      });
    }, [queryClient, service_uuid])
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [appQueryKeys.GET_SETTINGS, pressedSettings], // ✅ Matches the queryKey now
    });
  }, [queryClient, pressedSettings]);

  useEffect(() => {
    if (pressedSettings === "whatsapp") {
      setActionModal({
        ...actionModal,
        whatsAppVisible: !actionModal?.whatsAppVisible,
      });
    } else if (pressedSettings === "phone") {
      setActionModal({
        ...actionModal,
        callVisible: !actionModal?.callVisible,
      });
    } else if (pressedSettings === "instagram") {
      setActionModal({
        ...actionModal,
        messageVisible: !actionModal?.messageVisible,
      });
    }
  }, [pressedSettings]);

  const extractKeyValuePairs = (data: string) => {
    try {
      const parsed = JSON.parse(data!); // parsed is an object like { body: "long", ... }
      setReturnedData(parsed); // ✅ not Object.entries — just store the object directly
    } catch (e) {
      setReturnedData({}); // fallback
    }
  };

  useEffect(() => {
    extractKeyValuePairs(serviceInfo?.description!);
  }, [isFetching]);

  return (
    <>
      <Screen style={styles.screen}>
        <Header
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.black}
              />
            </TouchableOpacity>
          }
          headerStyle={styles.header}
        />
        {isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Loader size='large' color={colors.danger} />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <CustomText type='regular' size={20} lightBlack>
              {`${serviceInfo?.brand} ${serviceInfo?.model}`}
            </CustomText>
            <ScrollContainer
              style={{
                gap: moderateScale(20),
                paddingTop: moderateScale(10),
              }}>
              <View style={styles.imgContainer}>
                <ReanimatedCarousel
                  data={serviceInfo?.image_urls}
                  renderItem={({ item, index }) => (
                    <ImageBackground
                      key={index}
                      source={{ uri: item }}
                      contentFit='cover'
                      style={styles.img}>
                      <TouchableOpacity style={styles.heartBtn}>
                        <FontAwesome
                          name='heart-o'
                          size={moderateScale(15)}
                          color={colors.red}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  )}
                  onSnapToItem={(index) => setCurrIndex(index)}
                  pagingEnabled={true}
                  width={screenWidth - 30}
                  loop={false}
                  scrollAnimationDuration={500}
                  autoPlay={false}
                  autoPlayInterval={3000}
                />
              </View>
              <View style={styles.carouselContainer}>
                {serviceInfo &&
                  serviceInfo?.image_urls &&
                  serviceInfo?.image_urls.map((__, index) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: moderateScale(100),
                        backgroundColor:
                          currIndex === index ? colors.red : colors.lightGray,
                        marginHorizontal: moderateScale(5),
                        padding:
                          currIndex === index
                            ? moderateScale(7)
                            : moderateScale(4),
                      }}
                    />
                  ))}
              </View>
              {/* price, percentage off, location */}
              <View style={styles.pricePercentLocationContainer}>
                <View style={styles.percentPriceContainer}>
                  <CustomText size={17} type='medium' lightBlack>
                    {formatAmountWithCommas(Number(serviceInfo?.fee))}
                  </CustomText>
                  <CustomText
                    size={7}
                    type='regular'
                    red
                    style={styles.percentText}>
                    20% off
                  </CustomText>
                </View>
                <View style={styles.locationContainer}>
                  <EvilIcons
                    name='location'
                    size={moderateScale(16)}
                    color={colors.black}
                  />
                  <CustomText type='regular' size={13} black>
                    {serviceInfo?.location ? serviceInfo?.location : "Anywhere"}
                  </CustomText>
                </View>
              </View>
              {/* product info card container */}
              <View style={styles.productInfoCardContainer}>
                <CustomText type='medium' size={20} red>
                  Specification Summary
                </CustomText>
                <View style={styles.headerRule} />
                {/* 1 */}
                <View style={styles.subInfoContainer}>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      {serviceInfo?.brand}
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Make
                    </CustomText>
                  </View>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      {serviceInfo?.model}
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Model
                    </CustomText>
                  </View>
                </View>
                {/* 2 */}
                <View style={styles.subInfoContainer}>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      {returnedData?.body}
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Body
                    </CustomText>
                  </View>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      2008
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Year of Manufacture
                    </CustomText>
                  </View>
                </View>
                {/* 3 */}
                <View style={styles.subInfoContainer}>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      {serviceInfo?.type}
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Type
                    </CustomText>
                  </View>
                  <View style={styles.subInfoItemContainer}>
                    <CustomText size={16} lightBlack type='medium'>
                      {returnedData?.condition}
                    </CustomText>
                    <CustomText size={13} lightGray type='medium'>
                      Condition
                    </CustomText>
                  </View>
                </View>
                <View style={styles.subInfoContainer}>
                  <View style={styles.subInfoItemContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: moderateScale(5),
                      }}>
                      {returnedData?.gear &&
                        returnedData?.gear?.map((i: string, index: number) => (
                          <CustomText
                            size={16}
                            lightBlack
                            type='medium'
                            key={index}>
                            {`${i} ${
                              index !== returnedData?.gear?.length - 1
                                ? ","
                                : ""
                            }`}
                          </CustomText>
                        ))}
                    </View>
                    <CustomText size={13} lightGray type='medium'>
                      Gear
                    </CustomText>
                  </View>
                </View>
              </View>

              <View
                style={{
                  paddingVertical: DVH(20),
                }}
              />
            </ScrollContainer>
          </View>
        )}

        <View style={styles.bottomActionContainer}>
          <CustomButton
            title='Call'
            red
            textWhite
            textType='medium'
            buttonType='Solid'
            onPress={() =>
              setActionModal({
                ...actionModal,
                callVisible: !actionModal.callVisible,
              })
            }
            btnStyle={styles.actionBtn}
            leftIcon={
              <FontAwesome
                size={moderateScale(15)}
                name='phone'
                color={colors.white}
              />
            }
          />
          <CustomButton
            title='Message'
            red
            textRed
            textType='medium'
            buttonType='Outline'
            onPress={() =>
              setActionModal({
                ...actionModal,
                messageVisible: !actionModal.messageVisible,
              })
            }
            btnStyle={styles.actionBtn}
            leftIcon={
              <Entypo size={moderateScale(15)} name='chat' color={colors.red} />
            }
          />
          <CustomButton
            title='Whatsapp'
            black
            textBlack
            textSize={13}
            textType='medium'
            buttonType='Outline'
            onPress={() => {
              setPressedSettings("whatsapp");
            }}
            btnStyle={styles.actionBtn}
            leftIcon={
              <FontAwesome
                size={moderateScale(15)}
                name='whatsapp'
                color={"#25D366"}
              />
            }
            isLoading={isFetchingSettings}
          />
        </View>
      </Screen>
      <CallAction
        visible={actionModal.callVisible}
        onClose={() =>
          setActionModal({
            ...actionModal,
            callVisible: !actionModal.callVisible,
          })
        }
      />
      <MessageAction
        visible={actionModal.messageVisible}
        onClose={() =>
          setActionModal({
            ...actionModal,
            messageVisible: !actionModal.messageVisible,
          })
        }
        service_uuid={String(serviceInfo?.uuid)}
      />
      <WhatsAppAction
        visible={actionModal.whatsAppVisible}
        onClose={() => {
          setActionModal({
            ...actionModal,
            whatsAppVisible: !actionModal.whatsAppVisible,
          });
          console.log(actionModal?.whatsAppVisible);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  imgContainer: {
    width: "100%",
    height: DVH(40),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  header: {
    paddingTop:
      Platform?.OS === "android" ? moderateScale(50) : moderateScale(50),
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(10),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(15),
  },
  heartBtn: {
    padding: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(100),
  },
  percentText: {
    backgroundColor: "#FFE5E6",
    padding: moderateScale(10),
    borderRadius: moderateScale(50),
  },
  percentPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: moderateScale(5),
  },
  pricePercentLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productInfoCardContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(10),
  },
  headerRule: {
    borderBottomWidth: DVW(0.2),
    borderColor: colors.lightGray,
    paddingVertical: moderateScale(3),
  },
  subInfoItemContainer: {
    width: "47%",
  },
  subInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    // gap: moderateScale(30),
  },
  bottomActionContainer: {
    position: "absolute",
    bottom: moderateScale(0),
    backgroundColor: colors.white,
    paddingBottom: moderateScale(47),
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
  },
  actionBtn: {
    width: "30%",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
