import React from "react";
import { CustomButton, CustomOTPInput, CustomText } from "../shared";
import { StyleSheet } from "react-native";
import { fontFamily } from "@src/resources/fonts/font-family";
import { moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";

interface IOTPFormProps {
  setOtp: (value: string) => void;
  onPressActionBtn: () => void;
  isLoading: boolean;
}

export const OTPForm: React.FC<IOTPFormProps> = ({
  setOtp,
  onPressActionBtn,
  isLoading,
}) => {
  return (
    <>
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
        loaderColor={colors.white}
        isLoading={isLoading}
        onPress={() => {
          onPressActionBtn();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
