import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { CustomText } from "@src/components/shared";

interface IBackArrowBtnProps {
  onPressBackArrow: () => void;
  title: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const BackArrowBtn: React.FC<IBackArrowBtnProps> = ({
  onPressBackArrow,
  title,
  color,
  style,
}) => {
  return (
    <View style={[styles.backBtnContainer, style]}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => onPressBackArrow()}>
        <AntDesign
          name='arrowleft'
          size={moderateScale(20)}
          color={color || colors.black}
        />
      </TouchableOpacity>
      <CustomText type='regular' size={14} red style={{ color: color }}>
        {title}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  backBtn: {
    paddingVertical: moderateScale(5),
  },
});
