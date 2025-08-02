import { cartItemTypes } from "@src/cache/cartCache";
import { CustomText } from "@src/components/shared";
import { formatAmountWithCommas } from "@src/helper/utils";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";

interface ICartCardProps {
  item: cartItemTypes;
  decrementQuantity?: () => void;
  incrementQuantity?: () => void;
  removeFromCart?: () => void;
  actionBtn?: boolean;
}

export const CartCard: React.FC<ICartCardProps> = ({
  item,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  actionBtn = true,
}) => {
  return (
    <View style={styles.cartCard}>
      <View style={styles.imgContainer}>
        <Image source={item?.image} contentFit='cover' style={styles.img} />
      </View>
      <View>
        <CustomText size={12} type='medium' lightBlack>
          {item?.title}
        </CustomText>
        <CustomText type='semi-bold' size={18} red>
          #{formatAmountWithCommas(Number(item?.price))}
        </CustomText>
        {!actionBtn ? null : (
          <View style={styles.actionBtnContainer}>
            <View style={styles.addSubtractContainer}>
              <TouchableOpacity
                style={styles.addSubtractBtn}
                onPress={() => decrementQuantity?.()}>
                <CustomText size={18} lightBlack type='medium'>
                  -
                </CustomText>
              </TouchableOpacity>
              <CustomText
                type='medium'
                size={18}
                lightBlack
                style={{
                  borderLeftWidth: DVW(0.3),
                  borderRightWidth: DVW(0.3),
                  borderColor: colors.lightGray,
                  paddingHorizontal: moderateScale(10),
                }}>
                {item?.quantity}
              </CustomText>
              <TouchableOpacity
                style={styles.addSubtractBtn}
                onPress={() => incrementQuantity?.()}>
                <CustomText size={18} lightBlack type='medium'>
                  +
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Remove Item",
                  `Are you sure you want to remove ${item?.title}`,
                  [
                    {
                      text: "Ok",
                      onPress: () => removeFromCart?.(),
                    },
                    {
                      text: "Cancel",
                      onPress: () => {},
                    },
                  ]
                );
              }}>
              <AntDesign
                name='delete'
                size={moderateScale(20)}
                color={colors.red}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: DVW(20),
    height: DVH(7),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  img: {
    width: "100%",
    height: "100%",
  },
  cartCard: {
    paddingVertical: moderateScale(7),
    paddingHorizontal: moderateScale(7),
    borderWidth: DVW(0.3),
    borderColor: colors.lightGray,
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "flex-start",
    gap: moderateScale(10),
  },
  addSubtractContainer: {
    borderWidth: DVW(0.3),
    borderColor: colors.lightGray,
    borderRadius: moderateScale(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    overflow: "hidden",
  },
  addSubtractBtn: {
    paddingHorizontal: moderateScale(10),
    // backgroundColor: "red",
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "86%",
  },
});
