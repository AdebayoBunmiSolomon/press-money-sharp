import { CustomButton, CustomInput } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import React from "react";
import { Modal, StyleSheet, View, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IImageViewerProps {
  visible: boolean;
  onClose: () => void;
  imgUri: string;
  onChangeMsgText: (value: string) => void;
  messageText: string;
  handleSendMessage: () => void;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  visible,
  onClose,
  imgUri,
  onChangeMsgText,
  messageText,
  handleSendMessage,
}) => {
  return (
    <View>
      <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={onClose}>
        <Pressable
          style={styles.container}
          onPress={() => {
            onClose();
          }}>
          <View style={styles.imgContainer}>
            {imgUri ? (
              <Image
                style={styles.img}
                contentFit='contain'
                source={{ uri: imgUri }}
              />
            ) : null}
          </View>
        </Pressable>
        <View style={styles.actionContainer}>
          <View style={{ width: "90%" }}>
            <CustomInput
              value={messageText}
              onChangeText={(enteredValue) => {
                onChangeMsgText(enteredValue);
              }}
              type='custom'
              placeholder='Type a message'
              placeHolderTextColor={"#BDBDBD"}
              keyboardType='default'
              showErrorText
              style={styles.input}
            />
          </View>
          <CustomButton
            buttonType='Solid'
            white
            rightIcon={
              <Ionicons
                name='send'
                size={moderateScale(25)}
                color={colors.black}
              />
            }
            onPress={handleSendMessage}
            btnStyle={{
              paddingVertical: moderateScale(11),
              width: "9%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: moderateScale(100),
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: "97%",
    height: "90%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: Platform.OS === "ios" ? "50%" : "40%",
  },
  actionContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
    position: "absolute",
    bottom: moderateScale(0),
    paddingBottom:
      Platform.OS === "ios" ? moderateScale(30) : moderateScale(50),
    backgroundColor: colors.white,
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    width: "100%",
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: DVW(0.3),
    height: DVH(6),
    borderColor: "#BDBDBD",
  },
});
