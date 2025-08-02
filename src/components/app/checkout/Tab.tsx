import { CustomButton } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ITabProps {
  data: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

export const Tab: React.FC<ITabProps> = ({ data, selectedItem, onSelect }) => {
  return (
    <View style={styles.tabContainer}>
      {data &&
        data.map((i, index) => (
          <CustomButton
            key={index}
            buttonType={i === selectedItem ? "Solid" : "Outline"}
            btnStyle={{
              backgroundColor: i === selectedItem ? colors.red : "transparent",
              paddingVertical: moderateScale(7),
              borderRadius: moderateScale(5),
              width: "49%",
              borderColor: colors.lightGray,
              borderWidth: 0,
            }}
            textStyle={{
              color: i === selectedItem ? colors.white : colors.lightBlack,
            }}
            onPress={() => onSelect(i)}
            title={i}
            textType='medium'
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(7),
    backgroundColor: "#b0b0b08e",
    marginTop: moderateScale(10),
  },
});
