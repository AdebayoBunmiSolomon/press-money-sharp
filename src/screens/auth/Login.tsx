import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { Controller, useForm } from "react-hook-form";
import { loginFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@src/form/validation/rules";
import { loginOptions } from "@src/constants/login";
import { Image } from "expo-image";
import { ScrollContainer } from "../ScrollContainer";

export const Login = ({
  navigation,
}: AuthScreenProps<authScreenNames.LOGIN>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormTypes>({
    mode: "onChange",
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: loginFormTypes) => {
    if (data) {
      console.log(data);
    }
  };

  return (
    <Screen style={styles.screenContainer} safeArea>
      <View style={styles.titleContainer}>
        <CustomText type='medium' size={30} white>
          Hello!
        </CustomText>
        <CustomText type='regular' size={18} white>
          Welcome to PressMoneySharp
        </CustomText>
      </View>
      <Screen style={styles.screen} bgColor={"#F4F4F4"}>
        <ScrollContainer style={styles.formContainer}>
          <CustomText type='semi-bold' size={18} red>
            Login
          </CustomText>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Email'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.email?.message}
                type='custom'
                placeholder='Your email'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='email-address'
                showErrorText
                style={styles.input}
              />
            )}
            name='email'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Password'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.password?.message}
                type='password'
                placeholder='Enter your password'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
              />
            )}
            name='password'
            defaultValue=''
          />
          <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={() => navigation.navigate(authScreenNames.PASSWORD_RESET)}>
            <CustomText type='medium' size={14} black>
              Forgot password?
            </CustomText>
          </TouchableOpacity>
          <CustomButton
            title='Login'
            red
            textWhite
            buttonType='Solid'
            textSize={16}
            textType='medium'
            onPress={handleSubmit(onSubmit)}
            btnStyle={styles.loginBtn}
          />
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <CustomText
              type='regular'
              size={14}
              black
              style={styles.overLayText}>
              or login with
            </CustomText>
          </View>
          <View style={styles.optionIconContainer}>
            {loginOptions &&
              loginOptions.map((item, index) => (
                <TouchableOpacity style={styles.optionsIconBtn} key={index}>
                  <Image
                    source={item?.icon}
                    contentFit='contain'
                    style={styles.optionIcon}
                  />
                </TouchableOpacity>
              ))}
          </View>
          <View style={styles.actionTextContainer}>
            <CustomText type='medium' size={13} lightGray>
              Don't have an account?
            </CustomText>
            <TouchableOpacity
              onPress={() => navigation.navigate(authScreenNames.SIGN_UP)}>
              <CustomText type='medium' size={13} red>
                Sign Up
              </CustomText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: DVH(10),
            }}
          />
        </ScrollContainer>
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
  screen: {
    paddingHorizontal: moderateScale(15),
    height: "85%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    paddingVertical: moderateScale(30),
  },
  titleContainer: {
    paddingHorizontal: moderateScale(15),
    gap: moderateScale(8),
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  formContainer: {
    gap: moderateScale(20),
  },
  forgotPasswordBtn: {
    paddingVertical: moderateScale(3),
    alignSelf: "flex-end",
    marginTop: moderateScale(-18),
  },
  loginBtn: {
    paddingVertical: moderateScale(17),
  },
  optionsIconBtn: {
    width: DVW(10),
    height: DVH(5),
    backgroundColor: colors.white,
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  optionIcon: {
    width: "70%",
    height: "70%",
  },
  optionIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(20),
  },
  actionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(5),
  },
  lineContainer: {
    paddingVertical: moderateScale(10),
  },
  line: {
    height: DVH(0.2),
    backgroundColor: "#bdbdbd68",
    width: "100%",
  },
  overLayText: {
    marginTop: moderateScale(-10),
    backgroundColor: "#F4F4F4",
    alignSelf: "center",
  },
});
