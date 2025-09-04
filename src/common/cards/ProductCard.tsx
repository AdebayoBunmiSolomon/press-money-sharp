import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { ImageBackground } from "expo-image";
import React, { memo } from "react";
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
  liked?: boolean;
}

// ✅ Memoized component to prevent unnecessary re-renders
export const ProductCard: React.FC<IProductCardProps> = memo(
  ({
    title,
    price,
    location,
    image,
    onClickCard,
    onLikeProd,
    loaderColor,
    loading,
    liked,
  }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={onClickCard}
          activeOpacity={0.6}>
          <View style={styles.imgContainer}>
            <ImageBackground
              source={{ uri: String(image) }}
              contentFit='cover'
              style={styles.img}
              // ✅ Optimized caching and loading
              cachePolicy='memory-disk' // Cache images for better performance
              priority='normal' // Set loading priority
              recyclingKey={String(image)} // Help with memory management
              placeholder={{
                blurhash: "L6PZfSjE.AyE_3t7t7R**0o#DgR4", // Optional blur placeholder
              }}
              transition={200} // Smooth transition when image loads
            >
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={onLikeProd}
                // ✅ Prevent multiple rapid taps
                disabled={loading}>
                {loading ? (
                  <View style={{ flex: 1 }}>
                    <Loader size='small' color={loaderColor || colors.red} />
                  </View>
                ) : (
                  <FontAwesome
                    name={liked ? "heart" : "heart-o"}
                    size={moderateScale(15)}
                    color={colors.red}
                  />
                )}
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            {/* ✅ Limit text to prevent layout shifts */}
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
              <CustomText
                type='regular'
                size={13}
                black // Prevent location text overflow
                style={{
                  marginBottom: moderateScale(-2),
                  flex: 1, // Take available space
                }}>
                {location ? location : "Anywhere"}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // ✅ Custom memo comparison - only re-render if these specific props change
    return (
      prevProps.title === nextProps.title &&
      prevProps.price === nextProps.price &&
      prevProps.location === nextProps.location &&
      prevProps.image === nextProps.image &&
      prevProps.liked === nextProps.liked &&
      prevProps.loading === nextProps.loading
    );
  }
);

// ✅ Add display name for debugging
ProductCard.displayName = "ProductCard";

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
    // ✅ Add these for better performance on Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  heartBtn: {
    backgroundColor: colors.white,
    width: Platform.OS === "ios" ? DVW(11) : DVW(10),
    height: DVH(5),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: moderateScale(100),
    // ✅ Add slight shadow for better visibility
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  infoContainer: {
    paddingHorizontal: moderateScale(10),
    gap: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
});
