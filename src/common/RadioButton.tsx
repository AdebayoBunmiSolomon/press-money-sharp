import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { CustomText } from "@src/components/shared";

interface IRadioButtonProps {
  data: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = ({
  data,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <View>
      {data &&
        data.map((i, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioBtn}
            onPress={() => setSelectedItem(i)}>
            <Fontisto
              name={
                selectedItem === i ? "radio-btn-active" : "radio-btn-passive"
              }
              size={moderateScale(20)}
              color={selectedItem === i ? colors.red : colors.lightGray}
            />
            <CustomText
              size={14}
              type='medium'
              style={{
                color: selectedItem === i ? colors.black : colors.lightGray,
              }}>
              {i}
            </CustomText>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(7),
    paddingVertical: moderateScale(7),
  },
});
