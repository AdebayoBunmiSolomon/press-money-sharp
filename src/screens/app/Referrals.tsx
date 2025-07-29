import React, { useEffect, useState } from "react";
import { Screen } from "../Screen";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { ScrollContainer } from "../ScrollContainer";
import { Header } from "@src/components/app/home";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { CustomButton, CustomText } from "@src/components/shared";
import { Image } from "expo-image";
import { ReferralModal } from "@src/components/app/referrals";
import { useAuthStore } from "@src/api/store/auth";
import * as Clipboard from "expo-clipboard";
import { useGetUserReferralHistory } from "@src/api/hooks/queries/app";
import { queryClient } from "@src/helper/utils";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";

type earningSystemType = {
  image: ImageSourcePropType;
  title: string;
};

const earningSystem: earningSystemType[] = [
  {
    title: "Share invitation link/code with friends",
    image: require("@src/assets/png/share.png"),
  },
  {
    title: "Friends buy more than 2products during the validity period",
    image: require("@src/assets/png/mark.png"),
  },
  {
    title: "You’ll receive in your wallet",
    image: require("@src/assets/png/reward.png"),
  },
];

export const Referrals = ({
  navigation,
}: RootStackScreenProps<appScreenNames.REFERRALS>) => {
  const { userData } = useAuthStore();
  const { userReferralHistory } = useGetUserReferralHistory(userData?.token);
  const [showReferralHistory, setShowReferralHistory] =
    useState<boolean>(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userData?.referral_code);
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [appQueryKeys.GET_USER_REFERRAL_HISTORY, userData?.token],
    });
  }, []);

  return (
    <>
      <Screen safeArea style={styles.screen}>
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
          onPressMenuIcon={() =>
            navigation.navigate(bottomTabScreenNames.HOME_STACK, {
              screen: appScreenNames.SIDE_NAV,
            })
          }
          headerStyle={{
            paddingHorizontal: moderateScale(10),
          }}
        />
        <ScrollContainer>
          <View style={styles.cta}>
            <CustomText
              type='medium'
              size={20}
              white
              style={{
                verticalAlign: "middle",
                paddingLeft: moderateScale(15),
              }}>
              {`Invite friends to\nPressMoneySharp and\nearn rewards`}
            </CustomText>
            <View style={styles.ctaImgContainer}>
              <Image
                style={styles.ctaImg}
                source={require("@src/assets/png/referral-cta.png")}
                contentFit='fill'
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <CustomText type='regular' size={14} lightBlack>
              Invite Friends and earn rewards!!!
            </CustomText>
            <View style={styles.earnContainer}>
              <View style={styles.earningSystemContainer}>
                {earningSystem &&
                  earningSystem.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.earningSystemBtn}
                      activeOpacity={0.6}>
                      <View style={styles.earningSystemImgContainer}>
                        <Image
                          source={item?.image}
                          contentFit='cover'
                          style={styles.earningSystemImg}
                        />
                      </View>
                      <CustomText
                        type='regular'
                        size={10}
                        lightBlack
                        style={{
                          textAlign: "left",
                        }}>
                        {item?.title}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
              </View>
              <CustomButton
                title={`Earn to reward`}
                red
                textWhite
                buttonType='Solid'
                onPress={() => {}}
                textType='medium'
                textSize={13}
                btnStyle={styles.earnBtn}
              />
            </View>
            <View
              style={[
                styles.earnContainer,
                {
                  alignItems: "center",
                },
              ]}>
              <CustomText type='regular' size={14} lightBlack>
                Referral Code
              </CustomText>
              <View
                style={{
                  paddingVertical: moderateScale(25),
                  gap: moderateScale(10),
                  alignItems: "center",
                }}>
                <View style={styles.iconTextContainer}>
                  <CustomText type='medium' size={14} lightBlack>
                    {userData?.referral_code || "N/A"}
                  </CustomText>
                  <TouchableOpacity
                    onPress={async () => await copyToClipboard()}>
                    <Ionicons
                      name='copy-outline'
                      size={moderateScale(15)}
                      color={colors.red}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.iconTextContainer,
                    {
                      backgroundColor: colors.red,
                      paddingVertical: moderateScale(3),
                      paddingHorizontal: moderateScale(10),
                      borderRadius: moderateScale(50),
                    },
                  ]}>
                  <CustomText type='regular' size={11} white>
                    Share invitation code
                  </CustomText>
                  <TouchableOpacity style={{}}>
                    <EvilIcons
                      name='share-google'
                      size={moderateScale(15)}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.earnContainer}>
              <CustomButton
                title='View referral history'
                lightGray
                textLightBlack
                buttonType='Solid'
                onPress={() => setShowReferralHistory(!showReferralHistory)}
                textType='medium'
                textSize={13}
                btnStyle={[
                  styles.earnBtn,
                  {
                    justifyContent: "space-between",
                    paddingHorizontal: moderateScale(10),
                  },
                ]}
                rightIcon={
                  <MaterialIcons
                    name='keyboard-arrow-right'
                    color={colors.lightBlack}
                    size={moderateScale(25)}
                  />
                }
              />
            </View>
          </View>
        </ScrollContainer>
      </Screen>
      <ReferralModal
        visible={showReferralHistory}
        onClose={() => setShowReferralHistory(!showReferralHistory)}
        data={userReferralHistory ? userReferralHistory : []}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
    paddingTop: moderateScale(0),
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
  },
  cta: {
    backgroundColor: colors.red,
    borderRadius: moderateScale(10),
    width: "98%",
    overflow: "hidden",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: moderateScale(10),
  },
  ctaImgContainer: {
    width: DVW(30),
    height: DVH(17),
    overflow: "hidden",
  },
  ctaImg: {
    width: "100%",
    height: "100%",
  },
  earnContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    width: "100%",
    marginVertical: moderateScale(20),
  },
  earnBtn: {
    paddingVertical: moderateScale(9),
  },
  earningSystemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: moderateScale(20),
  },
  earningSystemBtn: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(5),
    width: "32%",
    gap: moderateScale(5),
  },
  earningSystemImgContainer: {
    width: "100%",
    height: DVH(10),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  earningSystemImg: {
    width: "100%",
    height: "100%",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
});
