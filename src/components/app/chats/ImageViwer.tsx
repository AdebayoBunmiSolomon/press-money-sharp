import { CustomButton, CustomInput } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility
  // const keyboardOffset = useRef(new Animated.Value(0)).current;
  // const insets = useSafeAreaInsets(); // Optional: Get safe area insets (navigation bar height)

  // Keyboard event listeners - the key to fixing the issue!
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      style={[styles.overlayContainer, { flex: 1 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={isKeyboardVisible} // This is the key fix!
      keyboardVerticalOffset={
        Platform.OS === "ios" ? moderateScale(0) : moderateScale(0)
      }>
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
      <View
        style={[
          styles.actionContainer,
          {
            paddingBottom:
              Platform.OS === "android"
                ? isKeyboardVisible
                  ? moderateScale(30)
                  : moderateScale(60) // Adjust for nav bar
                : moderateScale(40),
          },
        ]}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
    elevation: 1000, // For Android
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
    backgroundColor: colors.white,
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    // Add elevation for Android and shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: DVW(0.3),
    height: DVH(6),
    borderColor: "#BDBDBD",
  },
});
