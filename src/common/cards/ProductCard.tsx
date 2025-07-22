import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { ImageBackground } from "expo-image";
import React from "react";
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { formatAmountWithCommas } from "@src/helper/utils";
import { Loader } from "../Loader";

interface IProductCardProps {
  title: string;
  price: string;
  location: string;
  image?: ImageSourcePropType | string;
  onClickCard?: () => void;
  onLikeProd?: () => void;
  loading?: boolean;
  loaderColor?: string;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  title,
  price,
  location,
  image,
  onClickCard,
  onLikeProd,
  loaderColor,
  loading,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={onClickCard}
        activeOpacity={0.6}>
        <View style={styles.imgContainer}>
          <ImageBackground source={image} contentFit='cover' style={styles.img}>
            <TouchableOpacity style={styles.heartBtn} onPress={onLikeProd}>
              {loading ? (
                <View style={{ flex: 1 }}>
                  <Loader size='small' color={loaderColor || colors.red} />
                </View>
              ) : (
                <FontAwesome
                  name='heart-o'
                  size={moderateScale(15)}
                  color={colors.red}
                />
              )}
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.infoContainer}>
          <CustomText type='medium' size={13} black>
            {title}
          </CustomText>
          <CustomText type='semi-bold' size={20} red>
            #{formatAmountWithCommas(Number(price))}
          </CustomText>
          <View style={styles.locationContainer}>
            <EvilIcons
              name='location'
              size={moderateScale(16)}
              color={colors.black}
            />
            <CustomText type='regular' size={13} black>
              {location ? location : "Anywhere"}
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
    borderWidth: DVW(0.2),
    borderColor: colors.lightGray,
  },
  heartBtn: {
    backgroundColor: colors.white,
    width: Platform.OS === "ios" ? DVW(11) : DVW(10),
    height: DVH(5),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
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
