import { cartItemTypes, useCartCache } from "@src/cache/cartCache";
import { CartCard } from "@src/common/cards";
import { CustomButton, CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { formatAmountWithCommas } from "@src/helper/utils";
import { usePickupTabStore } from "@src/form/store";

interface IDeliveryTabProps {
  onPressPickUp: () => void;
  onPressDelivery: () => void;
  onPressContact: () => void;
}

export const DeliveryTab: React.FC<IDeliveryTabProps> = ({
  onPressContact,
  onPressDelivery,
  onPressPickUp,
}) => {
  const { cart, totalItems, totalPrice } = useCartCache();
  const { paymentMode, pickupAddress, deliveryAddress, PMS } =
    usePickupTabStore();
  return (
    <>
      <View
        style={{
          height: "40%",
          overflow: "hidden",
        }}>
        {cart && cart.length > 0 ? (
          <FlatList
            data={cart}
            contentContainerStyle={{
              gap: moderateScale(15),
              paddingBottom: DVH(25),
              paddingHorizontal: moderateScale(10),
              paddingTop: moderateScale(5),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({
              item,
              index,
            }: {
              item: cartItemTypes;
              index: number;
            }) => {
              return <CartCard key={index} item={item} actionBtn={false} />;
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: moderateScale(10),
            }}>
            <CustomText
              type='regular'
              size={16}
              lightGray
              style={{
                textAlign: "center",
              }}>
              Cart is empty. Click button to add product to cart
            </CustomText>
            <CustomButton
              title='Add Products'
              onPress={() => {}}
              buttonType='Solid'
              red
              textWhite
              textType='medium'
            />
          </View>
        )}
      </View>
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          onPress={() => onPressDelivery()}
          style={[
            styles.cartInfoContainer,
            {
              backgroundColor: "#b0b0b08e",
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(5),
            },
          ]}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Payment Mode
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(5),
            }}>
            <CustomText type='regular' size={13} lightBlack>
              {paymentMode || "Online"}
            </CustomText>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={moderateScale(15)}
              color={colors.lightBlack}
            />
          </View>
        </TouchableOpacity>
        {/* pick-up addres */}
        <TouchableOpacity
          onPress={() => onPressPickUp()}
          style={[
            styles.cartInfoContainer,
            {
              backgroundColor: "#b0b0b08e",
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(5),
            },
          ]}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Pick-up Address
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(5),
            }}>
            <CustomText type='regular' size={13} lightBlack>
              {pickupAddress || "NIL"}
            </CustomText>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={moderateScale(15)}
              color={colors.lightBlack}
            />
          </View>
        </TouchableOpacity>
        {/* delivery address */}
        <TouchableOpacity
          onPress={() => onPressDelivery()}
          style={[
            styles.cartInfoContainer,
            {
              backgroundColor: "#b0b0b08e",
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(5),
            },
          ]}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Delivery Address
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(5),
            }}>
            <CustomText type='regular' size={13} lightBlack>
              {deliveryAddress || "NIL"}
            </CustomText>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={moderateScale(15)}
              color={colors.lightBlack}
            />
          </View>
        </TouchableOpacity>
        {/* contact pms  */}
        <TouchableOpacity
          onPress={() => onPressContact()}
          style={[
            styles.cartInfoContainer,
            {
              backgroundColor: "#b0b0b08e",
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(5),
            },
          ]}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Contact PMS
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(5),
            }}>
            <CustomText type='regular' size={13} lightBlack>
              {PMS || "NIL"}
            </CustomText>
            <MaterialIcons
              name='keyboard-arrow-right'
              size={moderateScale(15)}
              color={colors.lightBlack}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.cartInfoContainer}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Total Items
          </CustomText>
          <CustomText type='semi-bold' size={13} lightGray>
            {formatAmountWithCommas(totalItems())}
          </CustomText>
        </View>
        <View style={styles.cartInfoContainer}>
          <CustomText type='semi-bold' size={13} lightBlack>
            Total Price
          </CustomText>
          <CustomText type='semi-bold' size={13} lightGray>
            #{formatAmountWithCommas(totalPrice())}
          </CustomText>
        </View>
        <CustomButton
          title={`Continue to Payment`}
          red
          textWhite
          textType='medium'
          textSize={14}
          onPress={() => {}}
          buttonType='Solid'
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    position: "absolute",
    justifyContent: "center",
    bottom: moderateScale(40),
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: moderateScale(15),
  },
  cartInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
  },
});
