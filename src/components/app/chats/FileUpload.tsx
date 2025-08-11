import { CustomButton, CustomText } from "@src/components/shared";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";

interface IFileUploadModalProps {
  visible: boolean;
  onClose: () => void;
  onClickGallery: () => void;
  onClickCamera: () => void;
}

export const FileUploadModal: React.FC<IFileUploadModalProps> = ({
  visible,
  onClose,
  onClickCamera,
  onClickGallery,
}) => {
  return (
    <View>
      <Modal visible={visible} transparent animationType='slide'>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.modalHeaderContainer}>
              <CustomText
                type='medium'
                size={14}
                lightBlack
                style={{
                  paddingVertical: moderateScale(10),
                }}>
                Select Upload Options
              </CustomText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onClose()}>
                <CustomText type='semi-bold' size={15} lightBlack>
                  X
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.actionBtnContainer}>
              <CustomButton
                title='Gallery'
                red
                textRed
                textType='medium'
                buttonType='Outline'
                onPress={() => onClickGallery()}
                btnStyle={styles.actionBtn}
                leftIcon={
                  <MaterialIcons
                    name='perm-media'
                    size={moderateScale(40)}
                    color={colors.red}
                  />
                }
              />
              <CustomButton
                title='Camera'
                red
                textWhite
                textType='medium'
                buttonType='Solid'
                onPress={() => onClickCamera()}
                btnStyle={styles.actionBtn}
                leftIcon={
                  <AntDesign
                    name='camera'
                    size={moderateScale(40)}
                    color={colors.white}
                  />
                }
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: moderateScale(15),
    paddingHorizontal: moderateScale(5),
  },
  actionBtn: {
    width: "35%",
    paddingVertical: moderateScale(11),
    flexDirection: "column",
    gap: moderateScale(5),
  },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    paddingVertical: moderateScale(5),
    paddingHorizontal:
      Platform.OS === "ios" ? moderateScale(10) : moderateScale(12),
    backgroundColor: colors.lightGray,
    borderRadius: moderateScale(100),
  },
});
