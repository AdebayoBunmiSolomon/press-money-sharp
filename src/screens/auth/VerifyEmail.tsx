import React, { useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import {
  CustomButton,
  CustomOTPInput,
  CustomText,
} from "@src/components/shared";
import { fontFamily } from "@src/resources/fonts/font-family";

export const VerifyEmail = ({
  navigation,
  route,
}: AuthScreenProps<authScreenNames.VERIFY_EMAIL>) => {
  const { email } = route?.params;
  const [otp, setOtp] = useState<string>("");
  return (
    <Screen style={styles.screenContainer} safeArea>
      <View style={styles.iconContainer}>
        <Image
          source={require("@src/assets/png/round-logo.png")}
          contentFit='cover'
          style={styles.icon}
        />
      </View>
      <Screen style={styles.screen} bgColor={"#F4F4F4"}>
        <CustomText type='medium' size={22} black style={styles.formTitle}>
          {`Verify your email`}
        </CustomText>
        <CustomText
          type='medium'
          size={11}
          lightGray
          style={[styles.formTitle, { paddingVertical: moderateScale(10) }]}>
          Enter the 6 digit verification Code
        </CustomText>
        <CustomOTPInput
          numberOfInput={6}
          onComplete={(otp) => setOtp(otp)}
          inputStyle={styles.otpInput}
          containerStyle={styles.otpContainer}
        />
        <CustomButton
          title='Continue'
          red
          textWhite
          buttonType='Solid'
          textSize={16}
          textType='medium'
          onPress={() => {
            if (otp.length >= 6) {
              navigation.navigate(authScreenNames.PASSWORD_UPDATE);
            }
          }}
        />
      </Screen>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.red,
    paddingHorizontal: moderateScale(0),
  },
  iconContainer: {
    width: DVW(23),
    height: DVH(11.5),
    overflow: "hidden",
    alignSelf: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  screen: {
    paddingHorizontal: moderateScale(15),
    height: "90%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    paddingVertical: moderateScale(30),
  },
  formTitle: {
    textAlign: "center",
  },
  otpInput: {
    backgroundColor: "#E6E6E6",
    fontFamily: fontFamily.semi_bold,
    fontSize: moderateScale(17),
  },
  otpContainer: {
    paddingVertical: moderateScale(20),
  },
});
