import { CustomButton, CustomText } from "@src/components/shared";
import { showFlashMsg } from "@src/helper/ui-utils";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Linking, Modal, Platform, StyleSheet, View } from "react-native";

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
    let phoneNumber = value.trim();
    const message = "Hello, I'm a customer from AutoMotor";

    // Ensure phone is in international format
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+${phoneNumber.replace(/[^0-9]/g, "")}`;
    }

    // Use correct URL per platform
    const url =
      Platform.OS === "android"
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
          )}`
        : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      showFlashMsg({
        title: "Error",
        description: "WhatsApp is not installed on your phone.",
        msgType: "ERROR",
      });
    });
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
