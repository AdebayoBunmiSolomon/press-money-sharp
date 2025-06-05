import React from "react";
import { Screen } from "../Screen";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";
import { StyleSheet, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { passwordUpdateFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordUpdateValidationSchema } from "@src/form/validation/rules";
import { ScrollContainer } from "../ScrollContainer";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";

export const PasswordUpdate = ({
  navigation,
}: AuthScreenProps<authScreenNames.PASSWORD_UPDATE>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordUpdateFormTypes>({
    mode: "onChange",
    resolver: yupResolver(passwordUpdateValidationSchema),
  });

  const onSubmit = (data: passwordUpdateFormTypes) => {
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
          <CustomText type='medium' size={22} black style={styles.formTitle}>
            {`Reset Password`}
          </CustomText>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Password'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.password?.message}
                type='password'
                placeholder='Your password'
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
                title='Confirm Password'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.confirm_password?.message}
                type='password'
                placeholder='Your confirm password'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
              />
            )}
            name='confirm_password'
            defaultValue=''
          />
          <CustomButton
            title='Continue'
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
              paddingVertical: DVH(5),
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
  formTitle: {
    textAlign: "center",
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  signUpBtn: {
    paddingVertical: moderateScale(17),
    marginVertical: moderateScale(10),
  },
});
