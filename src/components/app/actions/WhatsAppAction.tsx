import { CustomButton, CustomText } from "@src/components/shared";
import { showFlashMsg } from "@src/helper/ui-utils";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Linking, Modal, StyleSheet, View } from "react-native";

interface IWhatsAppActionProps {
  visible: boolean;
  onClose: () => void;
  value: string;
}

export const WhatsAppAction: React.FC<IWhatsAppActionProps> = ({
  visible,
  onClose,
  value,
}) => {
  const openWhatsApp = () => {
    const phoneNumber = value.replace(/[^0-9]/g, "");
    const message = "Hello, I'm a customer from AutoMotor";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          showFlashMsg({
            title: "Error",
            description: "Whats-app is not installed on your phone.",
            msgType: "ERROR",
          });
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <CustomText
              type='medium'
              size={14}
              lightBlack
              style={{
                paddingVertical: moderateScale(10),
              }}>
              Start WhatsApp Chat
            </CustomText>
            <View style={styles.actionBtnContainer}>
              <CustomButton
                title='Cancel'
                red
                textRed
                textType='medium'
                buttonType='Outline'
                onPress={() => onClose()}
                btnStyle={styles.actionBtn}
              />
              <CustomButton
                title='Continue'
                red
                textWhite
                textType='medium'
                buttonType='Solid'
                onPress={() => openWhatsApp()}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: moderateScale(15),
  },
  actionBtn: {
    width: "47%",
    paddingVertical: moderateScale(11),
  },
});
