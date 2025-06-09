import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Image } from "expo-image";
import { colors } from "@src/resources/color/color";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface IShowMsgOptionsProps {
  msgType: "SUCCESS" | "FAILED" | "ERROR";
  title?: string;
  description?: string;
}

export const showFlashMsg = ({
  msgType,
  title,
  description,
}: IShowMsgOptionsProps) => {
  if (msgType === "SUCCESS") {
    showMessage({
      message: title || "Success",
      description: description || "Successful Operation",
      type: "success",
      icon: () => (
        <View
          style={{
            width: DVW(10),
            height: DVH(5),
            borderRadius: moderateScale(10),
            marginRight: moderateScale(10),
          }}>
          <Image
            source={require("@src/assets/png/success-icon.png")}
            contentFit='contain'
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      ),
      autoHide: true,
      duration: 2500,
      backgroundColor: "#0C8242",
    });
  } else if (msgType === "ERROR") {
    showMessage({
      message: title || "Error",
      description: description || "Error in Operation",
      type: "danger",
      icon: () => (
        <View
          style={{
            width: DVW(10),
            height: DVH(5),
            borderRadius: moderateScale(10),
            marginRight: moderateScale(10),
          }}>
          <Ionicons
            name='close'
            color={colors.white}
            size={moderateScale(30)}
          />
        </View>
      ),
      autoHide: true,
      duration: 2500,
      backgroundColor: colors.danger,
    });
  } else if (msgType === "FAILED") {
    showMessage({
      message: title || "Error",
      description: description || "An error occurred while processing request",
      type: "warning",
      icon: () => (
        <View
          style={{
            width: DVW(10),
            height: DVH(5),
            borderRadius: moderateScale(10),
            marginRight: moderateScale(10),
          }}>
          <AntDesign
            name='questioncircle'
            color={colors.white}
            size={moderateScale(30)}
          />
        </View>
      ),
      autoHide: true,
      duration: 2500,
      backgroundColor: "#CDDC27",
    });
  }
};

import { RefObject } from "react";
import { IGlobalModalMessageRef } from "@src/common";

let modalRef: RefObject<IGlobalModalMessageRef | null> | null = null;

export const ModalMessageProvider = {
  setRef: (ref: RefObject<IGlobalModalMessageRef | null>) => {
    modalRef = ref;
  },
  showModalMsg: (msg: Parameters<IGlobalModalMessageRef["show"]>[0]) => {
    modalRef?.current?.show(msg);
  },
};
