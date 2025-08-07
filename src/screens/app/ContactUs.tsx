import React from "react";
import { Screen } from "../Screen";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import { CustomText } from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { useSettingsStore } from "@src/api/store/app";
import { showFlashMsg } from "@src/helper/ui-utils";
import { settingsType } from "@src/types/types";

export const ContactUs = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CONTACT_US>) => {
  const { settings } = useSettingsStore();

  const openSocialMediaLink = (socialMediaType: settingsType) => {
    const url = String(
      settings && settings.find((i) => i.type === socialMediaType)?.value
    );
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          showFlashMsg({
            title: "Error",
            description: `Error opening ${url}`,
            msgType: "ERROR",
          });
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <Screen safeArea style={styles.screen}>
      <ScrollContainer style={styles.scrollContainer}>
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
        <View style={styles.textContainer}>
          <CustomText type='medium' size={17} lightBlack style={styles.text}>
            Get In Touch
          </CustomText>
          <CustomText type='regular' size={14} lightBlack style={styles.text}>
            {`Ready to Purchase or Make Consultation?\nContact Us today!`}
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name='office-building'
              size={moderateScale(20)}
              color={colors.black}
            />
            <CustomText type='medium' size={17} lightBlack>
              Head Office
            </CustomText>
          </View>
          <CustomText type='regular' size={14} lightBlack style={styles.text}>
            Oke Ile-Owo Opic, Abeokuta
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons
              name='email-outline'
              size={moderateScale(20)}
              color={colors.black}
            />
            <CustomText type='medium' size={17} lightBlack>
              Email Us
            </CustomText>
          </View>
          <CustomText type='regular' size={14} lightBlack style={styles.text}>
            Opeyemiolayemi@gmail.com
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.iconTextContainer}>
            <Feather
              name='phone'
              size={moderateScale(20)}
              color={colors.black}
            />
            <CustomText type='medium' size={17} lightBlack>
              Call Us
            </CustomText>
          </View>
          <CustomText type='regular' size={14} lightBlack style={styles.text}>
            0905677890
          </CustomText>
        </View>

        <View style={styles.textContainer}>
          <View style={styles.iconTextContainer}>
            <Ionicons
              name='logo-whatsapp'
              size={moderateScale(25)}
              color={"#25D366"}
            />
            <CustomText type='medium' size={17} lightBlack>
              Whatsapp
            </CustomText>
          </View>
          <CustomText type='regular' size={14} lightBlack style={styles.text}>
            08134567789
          </CustomText>
        </View>

        <View
          style={{
            paddingVertical: moderateScale(20),
            paddingHorizontal: moderateScale(10),
          }}>
          <CustomText type='medium' size={17} lightBlack>
            Follow our Social Media
          </CustomText>
          <View style={styles.socialMediaBtnContainer}>
            <TouchableOpacity
              style={styles.socialMediaBtn}
              onPress={() => openSocialMediaLink("Instagram")}>
              <FontAwesome
                name='facebook'
                size={moderateScale(17)}
                color={"#1877F2"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialMediaBtn}
              onPress={() => openSocialMediaLink("Instagram")}>
              <FontAwesome
                name='whatsapp'
                size={moderateScale(17)}
                color={"#25D366"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialMediaBtn}
              onPress={() => openSocialMediaLink("Instagram")}>
              <FontAwesome6
                name='x-twitter'
                size={moderateScale(17)}
                color={colors.lightBlack}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialMediaBtn}
              onPress={() => openSocialMediaLink("Instagram")}>
              <Entypo
                name='instagram'
                size={moderateScale(17)}
                color={colors.lightBlack}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    // paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(0),
    backgroundColor: "#F9F9F9",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(3),
    paddingHorizontal: moderateScale(10),
  },
  scrollContainer: {
    // gap: moderateScale(15),
  },
  textContainer: {
    gap: moderateScale(2),
    paddingVertical: moderateScale(20),
    borderBottomWidth: DVW(0.2),
    borderBottomColor: colors.lightGray,
  },
  text: {
    paddingHorizontal: moderateScale(10),
  },
  socialMediaBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  socialMediaBtn: {
    backgroundColor: colors.white,
    width: DVW(11),
    height: DVH(5.5),
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
});
