import React from "react";
import { DVH, screenHeight, screenWidth } from "@src/resources/responsiveness";
import { Loader, CommonStatusBar } from "@src/common";
import { colors } from "@src/resources/color/color";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Screen } from "../Screen";
import { AuthScreenProps } from "@src/router/types";
import { authScreenNames } from "@src/navigation";

export const AuthLoader = ({
  navigation: _navigation,
}: AuthScreenProps<authScreenNames.AUTH_LOADER>) => {
  return (
    <>
      <CommonStatusBar style='light' bgColor={colors.black} />
      <Screen
        bgColor={colors.white}
        style={{
          width: screenWidth,
          height: screenHeight,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={loaderStyles.iconContainer}>
          <Image
            source={require("@src/assets/png/app-icon.png")}
            contentFit='cover'
            style={loaderStyles.icon}
          />
        </View>
        <View style={loaderStyles.container}>
          <Loader size='large' color={colors.red} />
        </View>
      </Screen>
    </>
  );
};

const loaderStyles = StyleSheet.create({
  container: {
    height: "10%",
  },
  iconContainer: {
    width: "50%",
    height: DVH(10),
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
