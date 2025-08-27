import { CustomButton, CustomText } from "@src/components/shared";
import { openWhatsApp } from "@src/helper/utils";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";

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
                onPress={() => openWhatsApp(value)}
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
