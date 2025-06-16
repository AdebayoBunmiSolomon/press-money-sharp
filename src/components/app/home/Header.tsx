import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";

export const Header: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("@src/assets/png/app-icon.png")}
          contentFit='contain'
          style={styles.img}
        />
      </View>
      <View style={styles.actionBtnContainer}>
        <TouchableOpacity>
          <Fontisto name='bell' size={moderateScale(20)} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name='menu' size={moderateScale(20)} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgContainer: {
    width: DVW(20),
    height: DVH(10),
  },
  img: {
    width: "100%",
    height: "100%",
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
