import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { CustomText } from "@src/components/shared";

interface IBackArrowBtnProps {
  onPressBackArrow: () => void;
  title: string;
}

export const BackArrowBtn: React.FC<IBackArrowBtnProps> = ({
  onPressBackArrow,
  title,
}) => {
  return (
    <View style={styles.backBtnContainer}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => onPressBackArrow()}>
        <AntDesign
          name='arrowleft'
          size={moderateScale(20)}
          color={colors.black}
        />
      </TouchableOpacity>
      <CustomText type='regular' size={14} red>
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
