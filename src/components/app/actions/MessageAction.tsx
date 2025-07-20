import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { messageActionFormTypes } from "@src/form/schema/types";
import { messageActionFormValidationSchema } from "@src/form/validation/rules";
import { DVW, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { useSendMessage } from "@src/api/hooks/mutation/app";

interface IMessageActionProps {
  visible: boolean;
  onClose: () => void;
  service_uuid: string;
}

export const MessageAction: React.FC<IMessageActionProps> = ({
  visible,
  onClose,
  service_uuid,
}) => {
  const { SendMessage, isPending } = useSendMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<messageActionFormTypes>({
    mode: "onChange",
    resolver: yupResolver(messageActionFormValidationSchema),
  });

  const onSubmit = (data: messageActionFormTypes) => {
    SendMessage({
      message: data?.message,
      service: service_uuid,
    });
  };
  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <View
              style={{
                paddingVertical: moderateScale(5),
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CustomText type='medium' size={16} lightBlack>
                Send Us a Message
              </CustomText>
            </View>
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
                  keyboardType='email-address'
                  showErrorText
                  multiLine
                  style={styles.input}
                />
              )}
              name='message'
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
                isLoading={isPending}
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
    gap: moderateScale(10),
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
