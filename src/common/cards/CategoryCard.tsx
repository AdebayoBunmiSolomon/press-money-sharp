import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { CustomText } from "@src/components/shared";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { Feather } from "@expo/vector-icons";

interface ICategoryCardProps {
  item: any;
  onPressItem: () => void;
}

const categoryImages = [
  require("@src/assets/png/category/car-consultation.png"),
  require("@src/assets/png/category/car-sales.png"),
];

export const CategoryCard: React.FC<ICategoryCardProps> = ({
  item,
  onPressItem,
}) => {
  const randomImage =
    categoryImages[Math.floor(Math.random() * categoryImages.length)];
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      <Image source={randomImage} contentFit='fill' style={styles.img} />
      <View style={styles.cardTitleContainer}>
        <CustomText type='medium' size={12} black>
          {`Car ${item}`}
        </CustomText>
        <View style={styles.actionBtn}>
          <Feather
            name='arrow-up-right'
            size={moderateScale(15)}
            color={colors.red}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: DVH(10),
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(7),
  },
  itemContainer: {
    width: DVW(35),
    backgroundColor: "#FAEEEE",
    borderRadius: moderateScale(10),
    gap: moderateScale(20),
    paddingBottom: moderateScale(10),
    overflow: "hidden",
  },
  actionBtn: {
    padding: moderateScale(4),
    borderRadius: moderateScale(100),
    backgroundColor: colors.white,
  },
});
