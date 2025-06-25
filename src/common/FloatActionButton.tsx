import { colors } from "@src/resources/color/color";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DVW, moderateScale } from "@src/resources/responsiveness";

interface IFloatActionBtnProps {
  onPressArrowUp: () => void;
  onPressWhatsApp: () => void;
}

export const FloatActionButton: React.FC<IFloatActionBtnProps> = ({
  onPressArrowUp,
  onPressWhatsApp,
}) => {
  return (
    <View style={styles.floatBtnContainer}>
      <TouchableOpacity
        style={[
          styles.floatBtn,
          {
            borderColor: colors.lightGray,
          },
        ]}
        onPress={() => onPressArrowUp()}>
        <AntDesign
          name='arrowup'
          size={moderateScale(25)}
          color={colors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => onPressWhatsApp()}>
        <Ionicons
          name='logo-whatsapp'
          size={moderateScale(25)}
          color={"#25D366"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatBtnContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? moderateScale(15) : moderateScale(10),
    alignSelf: "flex-end",
    marginRight: moderateScale(10),
    gap: moderateScale(10),
  },
  floatBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    borderWidth: DVW(0.4),
    borderColor: "#25D366",
    backgroundColor: colors.white,

    // 💡 iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // 💡 Android shadow (elevation)
    elevation: 5,
  },
});
