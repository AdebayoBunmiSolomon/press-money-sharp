import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { formatAmountWithCommas } from "@src/helper/utils";

interface IProductCardProps {
  title: string;
  price: string;
  location: string;
  onClickCard?: () => void;
  onLikeProd?: () => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  title,
  price,
  location,
  onClickCard,
  onLikeProd,
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.featuredCard} onPress={onClickCard}>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={require("@src/assets/png/car.png")}
            contentFit='cover'
            style={styles.img}>
            <TouchableOpacity style={styles.heartBtn} onPress={onLikeProd}>
              <FontAwesome
                name='heart-o'
                size={moderateScale(15)}
                color={colors.red}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.infoContainer}>
          <CustomText type='medium' size={13} black>
            {title}
          </CustomText>
          <CustomText type='semi-bold' size={20} red>
            {formatAmountWithCommas(Number(price))}
          </CustomText>
          <View style={styles.locationContainer}>
            <EvilIcons
              name='location'
              size={moderateScale(16)}
              color={colors.black}
            />
            <CustomText type='regular' size={13} black>
              {location}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: DVH(25),
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  featuredCard: {
    width: "100%",
    backgroundColor: "#FAEEEE",
    borderRadius: moderateScale(10),
    gap: moderateScale(20),
    paddingBottom: moderateScale(10),
    overflow: "hidden",
    marginTop: moderateScale(15),
  },
  heartBtn: {
    padding: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(100),
  },
  infoContainer: {
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: moderateScale(5),
  },
});
