import React, { useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { OTPForm } from "@src/components/auth";
import { useVerifyOtpToChangePass } from "@src/api/hooks/mutation/auth";

export const VerifyEmailForPasswordUpdate = ({
  route,
}: AuthScreenProps<authScreenNames.VERIFY_EMAIL_FOR_PASSWORD_UPDATE>) => {
  const { VerifyOtpToChangePass, isPending } = useVerifyOtpToChangePass();
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
        <OTPForm
          setOtp={(value) => setOtp(value)}
          onPressActionBtn={() => {
            if (otp.length >= 6) {
              VerifyOtpToChangePass({
                email: email,
                hash: otp,
              });
            }
          }}
          isLoading={isPending}
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
});
