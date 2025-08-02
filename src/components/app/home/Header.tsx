import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { CustomText } from "@src/components/shared";

interface IHeaderProps {
  showAppIcon?: boolean;
  leftIcon?: React.ReactNode;
  title?: string;
  color?: string;
  onPressBellIcon?: () => void;
  showBellIcon?: boolean;
  showMenuIcon?: boolean;
  onPressMenuIcon?: () => void;
  headerStyle?: StyleProp<ViewStyle>;
  showSearchIcon?: boolean;
  onPressSearchIcon?: () => void;
  extraComponent?: React.ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({
  showAppIcon = false,
  leftIcon,
  title,
  color,
  onPressBellIcon,
  showBellIcon = false,
  showMenuIcon = false,
  onPressMenuIcon,
  headerStyle,
  showSearchIcon = false,
  onPressSearchIcon,
  extraComponent,
}) => {
  return (
    <View
      style={[
        styles.container,
        headerStyle,
        {
          flexDirection: extraComponent ? "column" : "row",
          alignItems: extraComponent ? undefined : "center",
          justifyContent: extraComponent ? undefined : "space-between",
        },
      ]}>
      {showAppIcon ? (
        <View style={styles.imgContainer}>
          <Image
            source={require("@src/assets/png/app-icon.png")}
            contentFit='contain'
            style={styles.img}
          />
        </View>
      ) : !showAppIcon && leftIcon ? (
        <>{leftIcon}</>
      ) : (
        <View />
      )}
      {title ? (
        <CustomText
          type='medium'
          size={16}
          style={{
            color: color || colors.black,
          }}>
          {title}
        </CustomText>
      ) : (
        <View />
      )}
      <View style={styles.actionBtnContainer}>
        {showSearchIcon ? (
          <TouchableOpacity onPress={onPressSearchIcon}>
            <Feather
              name='search'
              size={moderateScale(20)}
              color={color || colors.black}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {showBellIcon ? (
          <TouchableOpacity onPress={onPressBellIcon}>
            <Fontisto
              name='bell'
              size={moderateScale(20)}
              color={color || colors.black}
            />
          </TouchableOpacity>
        ) : null}
        {showMenuIcon ? (
          <TouchableOpacity onPress={onPressMenuIcon}>
            <Feather
              name='menu'
              size={moderateScale(20)}
              color={color || colors.black}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {extraComponent && extraComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(10),
  },
  imgContainer: {
    width: DVW(20),
    height: DVH(6),
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
