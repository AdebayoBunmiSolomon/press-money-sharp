import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { Header } from "@src/components/app/home";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { AntDesign } from "@expo/vector-icons";
import {
  CustomButton,
  CustomInput,
  CustomPhoneInput,
  CustomText,
} from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { Controller, useForm } from "react-hook-form";
import { consultationFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { consultationFormValidationSchema } from "@src/form/validation/rules";
import { useScheduleConsultation } from "@src/api/hooks/mutation/app";

export const ConsultationServices = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CONSULTATION_SERVICES>) => {
  const { ScheduleConsultation, isPending } = useScheduleConsultation();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<consultationFormTypes>({
    mode: "onChange",
    resolver: yupResolver(consultationFormValidationSchema),
  });

  const onSubmit = async (data: consultationFormTypes) => {
    ScheduleConsultation({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      description: data?.message,
      priority: data?.priority,
      type: data?.type,
    });
    if (!isPending) {
      reset(); //clear form fields
    }
  };

  return (
    <Screen safeArea style={styles.screenContainer}>
      <Header
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name='arrowleft'
              size={moderateScale(20)}
              color={colors.lightBlack}
            />
          </TouchableOpacity>
        }
        color={colors.lightBlack}
      />
      <ScrollContainer>
        <View style={styles.formTitleContainer}>
          <CustomText type='medium' size={18} lightBlack>
            Need a Consultation
          </CustomText>
          <CustomText type='regular' size={18} lightBlack>
            2010 Models and Newer
          </CustomText>
        </View>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Your name'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.name?.message}
                type='custom'
                placeholder='Your name'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='name'
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
                keyboardType='default'
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
              <CustomPhoneInput
                title='Phone'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.phone?.message}
                placeholder='0800 000 0000'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
              />
            )}
            name='phone'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Type'
                value={field.value}
                dropDownItems={["general", "technical", "sales", "other"]}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                  clearErrors("type");
                }}
                error={errors?.type?.message}
                type='dropdown'
                placeholder='select the consultation type'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='type'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Priority'
                value={field.value}
                dropDownItems={["high", "Medium", "low"]}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                  clearErrors("priority");
                }}
                error={errors?.priority?.message}
                type='dropdown'
                placeholder='select the priority'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='priority'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Message'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.message?.message}
                type='custom'
                placeholder='Your message'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
                multiLine
              />
            )}
            name='message'
            defaultValue=''
          />

          <CustomButton
            title='Schedule a Call'
            red
            textWhite
            buttonType='Solid'
            textSize={16}
            textType='medium'
            onPress={handleSubmit(onSubmit)}
            btnStyle={styles.loginBtn}
            loaderColor={colors.white}
            isLoading={isPending}
          />
        </View>
        <View
          style={{
            paddingVertical: DVH(5),
          }}
        />
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  formTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(40),
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  formContainer: {
    gap: moderateScale(15),
  },
  loginBtn: {
    paddingVertical: moderateScale(17),
  },
});
