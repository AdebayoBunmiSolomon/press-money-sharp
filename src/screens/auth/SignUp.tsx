import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { Controller, useForm } from "react-hook-form";
import { signUpFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "@src/form/validation/rules";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { Image } from "expo-image";
import { BackArrowBtn } from "@src/common/BackArrowBtn";

export const SignUp = ({
  navigation,
}: AuthScreenProps<authScreenNames.SIGN_UP>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormTypes>({
    mode: "onChange",
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = (data: signUpFormTypes) => {
    if (data) {
      console.log(data);
    }
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
        <ScrollContainer style={styles.formContainer}>
          <BackArrowBtn
            title='Back to Login'
            onPressBackArrow={() => navigation.goBack()}
            color={colors.black}
          />
          <CustomText type='semi-bold' size={18} red>
            Sign Up
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
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Confirm password'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.password?.message}
                type='password'
                placeholder='Enter your confirm password'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
              />
            )}
            name='password'
            defaultValue=''
          />
          <CustomButton
            title='Sign Up'
            red
            textWhite
            buttonType='Solid'
            textSize={16}
            textType='medium'
            onPress={handleSubmit(onSubmit)}
            btnStyle={styles.signUpBtn}
          />
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
  formContainer: {
    gap: moderateScale(20),
  },
  backBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  backBtn: {
    paddingVertical: moderateScale(5),
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  signUpBtn: {
    paddingVertical: moderateScale(17),
    marginVertical: moderateScale(15),
  },
});
