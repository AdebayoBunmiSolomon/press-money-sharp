import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVW, moderateScale, screenWidth } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface IButtonLineProps {
  data: string[];
  onSelectButton: (item: string) => void;
  selectedBtnItem: string;
}

export const ButtonLine: React.FC<IButtonLineProps> = ({
  data,
  onSelectButton,
  selectedBtnItem,
}) => {
  return (
    <View style={styles.container}>
      {data &&
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectButton(item)}
            style={{
              borderBottomWidth:
                selectedBtnItem === item ? DVW(0.3) : undefined,
              borderBottomColor:
                selectedBtnItem === item ? colors.red : undefined,
              width: screenWidth / data?.length,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: moderateScale(5),
            }}>
            <CustomText
              type={selectedBtnItem === item ? "medium" : "regular"}
              size={16}
              style={{
                color:
                  selectedBtnItem === item ? colors.black : colors.lightGray,
              }}>
              {item}
            </CustomText>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(15),
    // paddingHorizontal: moderateScale(15),
  },
});
