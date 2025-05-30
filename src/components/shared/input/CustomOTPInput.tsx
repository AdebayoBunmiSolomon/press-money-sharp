import { fontFamily } from "@src/resources/fonts/font-family";
import { moderateScale } from "@src/resources/responsiveness";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomOTPInputProps {
  onComplete: (otp: string) => void;
  numberOfInput?: number;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const CustomOTPInput = ({
  onComplete,
  numberOfInput = 4,
  containerStyle,
  inputStyle,
}: CustomOTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInput).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  // Reset OTP array when numberOfInput changes
  useEffect(() => {
    setOtp(Array(numberOfInput).fill(""));
  }, [numberOfInput]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < numberOfInput - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      newOtp.every((digit) => digit !== "") &&
      newOtp.join("").length === numberOfInput
    ) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref!)}
          style={[styles.input, inputStyle]}
          maxLength={1}
          keyboardType='numeric'
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          placeholder=''
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: moderateScale(45),
    height: moderateScale(50),
    borderColor: "#e5e7eb", // Gray-200 color
    borderRadius: 8,
    textAlign: "center",
    fontSize: moderateScale(16),
    fontFamily: fontFamily.medium,
    backgroundColor: "#F3F4F7",
  },
});
