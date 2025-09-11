import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Image } from "expo-image";
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

// ✅ Optimized component with Image instead of ImageBackground
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
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={onClickCard}
        activeOpacity={0.7}>
        {/* ✅ Image Container with Relative Positioning */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: String(image) }}
            style={styles.cardImage}
            contentFit='cover'
            // ✅ Performance optimizations
            cachePolicy='memory-disk'
            priority='normal'
            recyclingKey={String(image)}
            placeholder={{
              blurhash: "L6PZfSjE.AyE_3t7t7R**0o#DgR4",
            }}
            transition={200}
          />

          {/* ✅ Heart Button - Positioned Absolutely */}
          <TouchableOpacity
            style={styles.heartButton}
            onPress={onLikeProd}
            disabled={loading}
            activeOpacity={0.8}>
            {loading ? (
              <Loader size='small' color={loaderColor || colors.red} />
            ) : (
              <FontAwesome
                name={liked ? "heart" : "heart-o"}
                size={moderateScale(15)}
                color={colors.red}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* ✅ Content Section */}
        <View style={styles.contentContainer}>
          <CustomText type='medium' size={13} black style={styles.titleText}>
            {title}
          </CustomText>

          <CustomText type='semi-bold' size={20} red style={styles.priceText}>
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
              black
              style={styles.locationText}>
              {location || "Anywhere"}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // ✅ Optimized memo comparison
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

// ✅ Display name for debugging
ProductCard.displayName = "ProductCard";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FAEEEE",
    borderRadius: moderateScale(12),
    overflow: "hidden",
    borderWidth: DVW(0.2),
    borderColor: colors.lightGray,
    // ✅ Improved shadows
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: DVH(25),
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  heartButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    backgroundColor: colors.white,
    width: Platform.OS === "ios" ? DVW(11) : DVW(10),
    height: DVH(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
    // ✅ Button shadow for better visibility
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  contentContainer: {
    padding: moderateScale(12),
    gap: moderateScale(8),
  },
  titleText: {
    lineHeight: moderateScale(16),
  },
  priceText: {
    marginVertical: moderateScale(2),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  locationText: {
    flex: 1,
    marginBottom: moderateScale(-2),
  },
});

// ✅ Alternative version with even better performance for large lists
// export const ProductCard: React.FC<IProductCardProps> = memo(
//   ({
//     title,
//     price,
//     location,
//     image,
//     onClickCard,
//     onLikeProd,
//     loaderColor,
//     loading,
//     liked,
//   }) => {
//     return (
//       <TouchableOpacity
//         style={optimizedStyles.card}
//         onPress={onClickCard}
//         activeOpacity={0.7}>
//         <View style={optimizedStyles.imageWrapper}>
//           <Image
//             source={{ uri: String(image) }}
//             style={optimizedStyles.image}
//             contentFit='cover'
//             cachePolicy='memory-disk'
//             // ✅ Reduce quality for better performance in lists
//             allowDownscaling={true}
//             // decodeFormat="webp" // Use WebP format when available
//           />

//           <View style={optimizedStyles.heartWrapper}>
//             <TouchableOpacity
//               style={optimizedStyles.heart}
//               onPress={onLikeProd}
//               disabled={loading}>
//               {loading ? (
//                 <Loader size='small' color={loaderColor || colors.red} />
//               ) : (
//                 <FontAwesome
//                   name={liked ? "heart" : "heart-o"}
//                   size={moderateScale(14)}
//                   color={colors.red}
//                 />
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={optimizedStyles.content}>
//           <CustomText type='medium' size={13} black>
//             {title}
//           </CustomText>

//           <CustomText type='semi-bold' size={18} red>
//             #{formatAmountWithCommas(Number(price))}
//           </CustomText>

//           <View style={optimizedStyles.location}>
//             <EvilIcons
//               name='location'
//               size={moderateScale(14)}
//               color={colors.black}
//             />
//             <CustomText type='regular' size={12} black style={{ flex: 1 }}>
//               {location || "Anywhere"}
//             </CustomText>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   }
// );

// ProductCard.displayName = "ProductCardUltraOptimized";

// const optimizedStyles = StyleSheet.create({
//   card: {
//     backgroundColor: "#FAEEEE",
//     borderRadius: moderateScale(10),
//     overflow: "hidden",
//     borderWidth: 0.5,
//     borderColor: colors.lightGray,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 1,
//   },
//   imageWrapper: {
//     height: DVH(22), // Slightly smaller for better performance
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   heartWrapper: {
//     position: "absolute",
//     top: moderateScale(8),
//     right: moderateScale(8),
//   },
//   heart: {
//     backgroundColor: colors.white,
//     width: moderateScale(32),
//     height: moderateScale(32),
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: moderateScale(16),
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.15,
//     shadowRadius: 1,
//   },
//   content: {
//     padding: moderateScale(10),
//     gap: moderateScale(6),
//   },
//   location: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: moderateScale(3),
//   },
// });
