import React from "react";
import { Screen } from "../Screen";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
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

export const CarDetails = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CAR_DETAILS>) => {
  const { actionModal, setActionModal } = useActionModal();
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
        <View style={styles.contentContainer}>
          <CustomText type='regular' size={20} lightBlack>
            2015 Mercedes-Benz C300 4matic
          </CustomText>
          <ScrollContainer
            style={{
              gap: moderateScale(20),
              paddingTop: moderateScale(10),
            }}>
            <View style={styles.imgContainer}>
              <ImageBackground
                source={require("@src/assets/png/car.png")}
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
            </View>
            {/* price, percentage off, location */}
            <View style={styles.pricePercentLocationContainer}>
              <View style={styles.percentPriceContainer}>
                <CustomText size={17} type='medium' lightBlack>
                  #30,000,000.00
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
                  Challenge, Ibadan
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
                    Mercedes Benz
                  </CustomText>
                  <CustomText size={13} lightGray type='medium'>
                    Make
                  </CustomText>
                </View>
                <View style={styles.subInfoItemContainer}>
                  <CustomText size={16} lightBlack type='medium'>
                    C300 4Matic
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
                    16490 Miles
                  </CustomText>
                  <CustomText size={13} lightGray type='medium'>
                    Millage
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
                    SE 4dr Sedan
                  </CustomText>
                  <CustomText size={13} lightGray type='medium'>
                    Type
                  </CustomText>
                </View>
                <View style={styles.subInfoItemContainer}>
                  <CustomText size={16} lightBlack type='medium'>
                    Excellent Condition
                  </CustomText>
                  <CustomText size={13} lightGray type='medium'>
                    Condition
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
            onPress={() =>
              setActionModal({
                ...actionModal,
                whatsAppVisible: !actionModal.whatsAppVisible,
              })
            }
            btnStyle={styles.actionBtn}
            leftIcon={
              <FontAwesome
                size={moderateScale(15)}
                name='whatsapp'
                color={"#25D366"}
              />
            }
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
      />
      <WhatsAppAction
        visible={actionModal.whatsAppVisible}
        onClose={() =>
          setActionModal({
            ...actionModal,
            whatsAppVisible: !actionModal.whatsAppVisible,
          })
        }
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
    paddingBottom: moderateScale(30),
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
});
