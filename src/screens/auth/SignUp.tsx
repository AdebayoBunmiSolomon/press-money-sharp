import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React, { useEffect } from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { Controller, useForm } from "react-hook-form";
import { signUpFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "@src/form/validation/rules";
import {
  CustomButton,
  CustomInput,
  CustomPhoneInput,
  CustomText,
} from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { Image } from "expo-image";
import { BackArrowBtn } from "@src/common/BackArrowBtn";
import { useSignUp } from "@src/api/hooks/mutation/auth";
import { removePlusSign } from "@src/helper/utils";

export const SignUp = ({
  navigation,
}: AuthScreenProps<authScreenNames.SIGN_UP>) => {
  const { SignUp, isPending } = useSignUp();
  const {
    clearErrors,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormTypes>({
    mode: "onChange",
    resolver: yupResolver(signUpValidationSchema),
  });

  useEffect(() => {
    const { referral_code } = getValues();
    if (!referral_code) {
      setValue("referral_code", "");
    }
  }, [getValues]);

  const onSubmit = (data: signUpFormTypes) => {
    if (data) {
      SignUp({
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.password,
        referral_code: String(data?.referral_code),
        gender: data?.gender,
        phone: removePlusSign(data?.phone),
      });
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
                title='First name'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.first_name?.message}
                type='custom'
                placeholder='Your first name'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='first_name'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Last name'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.last_name?.message}
                type='custom'
                placeholder='Your last name'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='last_name'
            defaultValue=''
          />

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
                title='Gender'
                value={field.value}
                dropDownItems={["male", "female"]}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                  clearErrors("gender");
                }}
                error={errors?.gender?.message}
                type='dropdown'
                placeholder='select your gender'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='gender'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomPhoneInput
                title='Phone Number'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.phone?.message}
                placeholder='800 000 0000'
                showErrorText
                style={styles.input}
                placeHolderTextColor={colors.lightGray}
                maxLength={14}
              />
            )}
            name='phone'
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
                error={errors?.confirm_password?.message}
                type='password'
                placeholder='Enter your confirm password'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
              />
            )}
            name='confirm_password'
            defaultValue=''
          />
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Referral Code(Optional)'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.referral_code?.message}
                type='custom'
                placeholder='Your referral code'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='referral_code'
            defaultValue=''
          />
          <View
            style={{
              paddingVertical: DVH(17),
            }}
          />
        </ScrollContainer>
      </Screen>
      <View style={styles.actionBtnContainer}>
        <CustomButton
          title='Sign Up'
          red
          textWhite
          buttonType='Solid'
          textSize={16}
          textType='medium'
          onPress={handleSubmit(onSubmit)}
          btnStyle={styles.signUpBtn}
          isLoading={isPending}
          loaderColor={colors.white}
        />
      </View>
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
  actionBtnContainer: {
    position: "absolute",
    bottom: moderateScale(0),
    paddingBottom: moderateScale(35),
    width: "100%",
    paddingHorizontal: moderateScale(10),
    alignSelf: "center",
    backgroundColor: "#F4F4F4",
  },
});
