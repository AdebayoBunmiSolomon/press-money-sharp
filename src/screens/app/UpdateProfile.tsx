import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React, { useState } from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/app/home";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { Controller, useForm } from "react-hook-form";
import { updateProfileFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileValidationSchema } from "@src/form/validation/rules";
import { ScrollContainer } from "../ScrollContainer";
import { Image } from "expo-image";

export const UpdateProfile = ({
  navigation,
}: RootStackScreenProps<appScreenNames.UPDATE_PROFILE>) => {
  const [selectedImg, setSelectedImg] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateProfileFormTypes>({
    mode: "onChange",
    resolver: yupResolver(updateProfileValidationSchema),
  });

  const onSubmit = () => {};

  return (
    <Screen style={styles.screen} safeArea>
      <Header
        leftIcon={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(10),
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.black}
              />
            </TouchableOpacity>
            <CustomText type='medium' size={16} lightBlack>
              Update Your Profile
            </CustomText>
          </View>
        }
        headerStyle={styles.header}
      />
      <ScrollContainer style={styles.scrollContainer}>
        <TouchableOpacity
          style={[
            styles.imgBtn,
            {
              borderColor: errors?.profile_img?.message
                ? colors.red
                : colors.white,
            },
          ]}>
          {selectedImg ? (
            <Image
              source={require("@src/assets/png/category/car-hire.png")}
              style={styles.profileImg}
              contentFit='cover'
            />
          ) : (
            <View style={styles.emptyImgContainer}>
              <AntDesign
                name='camera'
                size={moderateScale(20)}
                color={colors.white}
              />
            </View>
          )}
        </TouchableOpacity>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Your Address'
              value={field.value}
              onChangeText={(enteredValue) => field.onChange(enteredValue)}
              error={errors?.address?.message}
              type='custom'
              placeholder='your address'
              placeHolderTextColor={"#BDBDBD"}
              keyboardType='email-address'
              showErrorText
              style={styles.input}
            />
          )}
          name='address'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Your DOB'
              value={field.value}
              onChangeText={(enteredValue) => field.onChange(enteredValue)}
              error={errors?.dob?.message}
              type='date'
              placeholder='your DOB'
              placeHolderTextColor={"#BDBDBD"}
              keyboardType='default'
              showErrorText
              style={styles.input}
            />
          )}
          name='dob'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              title='Referred By'
              value={field.value}
              onChangeText={(enteredValue) => field.onChange(enteredValue)}
              error={errors?.referred_by?.message}
              type='custom'
              placeholder='you were referred by who?'
              placeHolderTextColor={"#BDBDBD"}
              keyboardType='default'
              showErrorText
              style={styles.input}
            />
          )}
          name='referred_by'
          defaultValue=''
        />
        <CustomButton
          title='Update Profile'
          red
          textWhite
          buttonType='Solid'
          textSize={16}
          textType='medium'
          onPress={handleSubmit(onSubmit)}
          btnStyle={styles.loginBtn}
          isLoading={false}
          loaderColor={colors.white}
        />
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  header: {
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(10),
  },
  scrollContainer: {
    paddingHorizontal: moderateScale(7),
    gap: moderateScale(15),
    marginTop: moderateScale(10),
  },
  imgBtn: {
    width: DVW(25),
    height: Platform.OS === "ios" ? DVH(11.5) : DVH(12.5),
    borderRadius: moderateScale(100),
    borderWidth: DVW(0.3),
    overflow: "hidden",
    alignSelf: "center",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  emptyImgContainer: {
    backgroundColor: colors.lightGray,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  loginBtn: {
    paddingVertical: moderateScale(17),
  },
});
