import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomButton,
  CustomInput,
  CustomPhoneInput,
} from "@src/components/shared";
import { messageActionFormTypes } from "@src/form/schema/types";
import { messageActionFormValidationSchema } from "@src/form/validation/rules";
import { DVW, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";

interface IMessageActionProps {
  visible: boolean;
  onClose: () => void;
}

export const MessageAction: React.FC<IMessageActionProps> = ({
  visible,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<messageActionFormTypes>({
    mode: "onChange",
    resolver: yupResolver(messageActionFormValidationSchema),
  });

  const onSubmit = (data: messageActionFormTypes) => {
    if (data) {
      console.log(data);
      onClose();
    }
  };
  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <Controller
              control={control}
              render={({ field }) => (
                <CustomInput
                  title='Name'
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
                <CustomPhoneInput
                  title='Phone'
                  value={field.value}
                  onChangeText={(enteredValue) => field.onChange(enteredValue)}
                  error={errors?.phone?.message}
                  placeholder='0800 000 0000'
                  showErrorText
                  style={styles.input}
                />
              )}
              name='phone'
              defaultValue=''
            />
            <View style={styles.actionBtnContainer}>
              <CustomButton
                title='Message'
                red
                textWhite
                textType='medium'
                buttonType='Solid'
                onPress={handleSubmit(onSubmit)}
                btnStyle={styles.actionBtn}
                leftIcon={
                  <Entypo
                    size={moderateScale(20)}
                    color={colors.white}
                    name='message'
                  />
                }
              />
              <CustomButton
                title='Cancel'
                red
                textBlack
                textType='medium'
                buttonType='Outline'
                onPress={() => onClose()}
                btnStyle={styles.actionBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  actionBtnContainer: {
    flexDirection: "column",
    gap: moderateScale(5),
    marginVertical: moderateScale(15),
  },
  actionBtn: {
    width: "100%",
    paddingVertical: moderateScale(11),
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
});
