import { CustomButton, CustomText } from "@src/components/shared";
import { extractTextFromHtml } from "@src/helper/utils";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { ScrollContainer } from "@src/screens/ScrollContainer";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";

interface INotificationViewProps {
  closeModal: () => void;
  visible: boolean;
  data: {
    title: string;
    content: string;
    notifiable_type: string;
  };
}

export const NotificationView: React.FC<INotificationViewProps> = ({
  closeModal,
  visible,
  data,
}) => {
  return (
    <View>
      <Modal
        transparent
        animationType='fade'
        onRequestClose={() => closeModal()}
        visible={visible}>
        <View style={styles.container}>
          <View style={styles.content}>
            <CustomText type='medium' size={18} red>
              {data?.title || "No Data Found"}
            </CustomText>
            <ScrollContainer
              style={{
                paddingTop: moderateScale(5),
              }}>
              <CustomText type='regular' size={16} lightGray>
                {extractTextFromHtml(data?.content || "")}
              </CustomText>
            </ScrollContainer>
            <CustomButton
              title={"Close"}
              red
              textWhite
              buttonType='Solid'
              onPress={() => closeModal()}
              textType='medium'
              textSize={13}
              btnStyle={styles.closeBtn}
            />
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
    padding: moderateScale(20),
    height: DVH(50),
  },
  closeBtn: {
    paddingVertical: moderateScale(9),
    position: "absolute",
    bottom: moderateScale(20),
    alignSelf: "center",
    width: "100%",
  },
});
