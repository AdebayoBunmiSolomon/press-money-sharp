import React from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import { DVH, DVW } from "@src/resources/responsiveness";
import { CustomText } from "@src/components/shared";

interface ILoaderProps {
  color: string;
  size: "small" | "large";
}

export const Loader: React.FC<ILoaderProps> = ({ color, size }) => {
  return (
    <View style={style.container}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface IFullScreenLoaderProps {
  visible: boolean;
}

export const FullScreenLoader: React.FC<IFullScreenLoaderProps> = ({
  visible,
}) => {
  return (
    <View>
      <Modal visible={visible} transparent animationType={"fade"}>
        <View style={fullScreenStyles.container}>
          <View style={fullScreenStyles.content}>
            <View style={fullScreenStyles.iconContainer}>
              <Image
                source={require("@src/assets/png/round-logo.png")}
                contentFit='cover'
                style={fullScreenStyles.icon}
              />
            </View>
            <CustomText type='regular' size={15} white>
              Loading, Please wait...
            </CustomText>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const fullScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: Platform.OS === "ios" ? DVW(19.5) : DVW(18),
    height: DVH(9),
    overflow: "hidden",
    alignSelf: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
