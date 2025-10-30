import React, { useEffect, useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { OTPForm } from "@src/components/auth";
import { useVerifyEmail } from "@src/api/hooks/mutation/auth";
import { ModalMessageProvider } from "@src/helper/ui-utils";

export const VerifyEmailForSignUp = ({
  route,
}: AuthScreenProps<authScreenNames.VERIFY_EMAIL_FOR_SIGN_UP>) => {
  const email = route?.params?.email;
  const { VerifyEmail, isPending } = useVerifyEmail();
  const [otp, setOtp] = useState<string>("");

  // Countdown state (5 minutes = 300 seconds)
  const [countdown, setCountdown] = useState<number>(300);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      ModalMessageProvider.showModalMsg({
        msgType: "FAILED",
        title: "Information",
        description: "Please check spam if mail not received on inbox",
      });
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  // Format countdown as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
          isLoading={isPending}
          setOtp={(value) => setOtp(value)}
          onPressActionBtn={() => {
            if (otp.length >= 6) {
              VerifyEmail({ email, otp });
            }
          }}
        />

        {/* Countdown text */}
        {countdown > 0 ? (
          <Text style={styles.countdownText}>
            Time remaining: {formatTime(countdown)}
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setCountdown(300)}>
            <Text style={[styles.countdownText, { color: colors.lightGray }]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
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
  countdownText: {
    textAlign: "center",
    color: colors.red,
    fontSize: moderateScale(14),
    fontWeight: "600",
    marginTop: moderateScale(20),
  },
});
