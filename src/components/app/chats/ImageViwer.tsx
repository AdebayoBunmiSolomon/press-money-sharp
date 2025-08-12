import { CustomButton, CustomInput } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Optional, for better handling of safe areas

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
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // Optional: Get safe area insets (navigation bar height)

  useEffect(() => {
    if (!visible) return;

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        // Adjust moveUpDistance to account for the navigation bar (insets.bottom)
        const moveUpDistance =
          keyboardHeight -
          (Platform.OS === "ios" ? moderateScale(230) : moderateScale(250)) +
          insets.bottom; // Add navigation bar height
        Animated.timing(keyboardOffset, {
          toValue: -moveUpDistance,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Animated.timing(keyboardOffset, {
          toValue: 0, // Reset to original position
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [visible, keyboardOffset, insets.bottom]);

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      style={styles.overlayContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : insets.bottom} // Adjust for navigation bar
    >
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
      <Animated.View
        style={[
          styles.actionContainer,
          {
            transform: [{ translateY: keyboardOffset }],
            paddingBottom:
              Platform.OS === "ios" ? moderateScale(30) : insets.bottom, // Use insets for Android
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
      </Animated.View>
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
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
    position: "absolute",
    bottom: 0,
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
