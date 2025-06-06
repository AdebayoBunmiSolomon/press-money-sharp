import { authScreenNames } from "@src/navigation";
import { AuthScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { StyleSheet, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { Controller, useForm } from "react-hook-form";
import { passwordResetFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordResetValidationSchema } from "@src/form/validation/rules";
import { Image } from "expo-image";
import { BackArrowBtn } from "@src/common/BackArrowBtn";

export const PasswordReset = ({
  navigation,
}: AuthScreenProps<authScreenNames.PASSWORD_RESET>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordResetFormTypes>({
    mode: "onChange",
    resolver: yupResolver(passwordResetValidationSchema),
  });

  const onSubmit = (data: passwordResetFormTypes) => {
    if (data) {
      navigation.navigate(authScreenNames.VERIFY_EMAIL_FOR_PASSWORD_UPDATE, {
        email: data?.email,
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
        <CustomText type='medium' size={22} black style={styles.formTitle}>
          {`Forgot Password\nand Continue`}
        </CustomText>
        <View style={styles.formContainer}>
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
          <CustomButton
            title='Submit Now'
            red
            textWhite
            buttonType='Solid'
            textSize={16}
            textType='medium'
            onPress={handleSubmit(onSubmit)}
            btnStyle={styles.submitBtn}
          />

          <BackArrowBtn
            title='Back to Login'
            onPressBackArrow={() => navigation.goBack()}
            color={colors.black}
            style={styles.backArrowBtn}
          />
        </View>
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
  formContainer: {
    marginTop: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  submitBtn: {
    paddingVertical: moderateScale(17),
    marginTop: moderateScale(20),
  },
  backArrowBtn: {
    paddingVertical: moderateScale(10),
  },
});
