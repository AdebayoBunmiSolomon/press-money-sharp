import React from "react";
import { Screen } from "../Screen";
import { colors } from "@src/resources/color/color";
import {
  BottomTabBarStackParamList,
  RootStackParamList,
  RootStackScreenProps,
} from "@src/router/types";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { cartItemTypes, useCartCache } from "@src/cache/cartCache";
import { CustomButton, CustomText } from "@src/components/shared";
import { formatAmountWithCommas } from "@src/helper/utils";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CartCard } from "@src/common/cards";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabBarStackParamList, "CategoriesStack">,
  NativeStackNavigationProp<RootStackParamList>
>;

export const MyCart = ({
  navigation,
}: RootStackScreenProps<appScreenNames.MY_CART>) => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCartCache();
  const bottomNavigation = useNavigation<NavigationProp>();

  const navigateToAddProductToCart = () => {
    bottomNavigation.navigate(appScreenNames.BOTTOM_TAB_STACK, {
      screen: bottomTabScreenNames.CATEGORIES_STACK,
      params: {
        screen: appScreenNames.CATEGORIES,
      },
    });
  };

  return (
    <>
      <Screen bgColor={colors.white} style={styles.screen}>
        <Header
          leftIcon={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(10),
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign
                    name='arrowleft'
                    size={moderateScale(20)}
                    color={colors.black}
                  />
                </TouchableOpacity>
                <CustomText type='medium' size={16} lightBlack>
                  My Cart {`(${cart.length > 0 ? cart.length : ""})`}
                </CustomText>
              </View>
              <TouchableOpacity onPress={() => navigateToAddProductToCart()}>
                <CustomText type='semi-bold' size={14} red>
                  Add More
                </CustomText>
              </TouchableOpacity>
            </View>
          }
          headerStyle={styles.header}
        />
        {cart && cart.length > 0 ? (
          <FlatList
            data={cart}
            contentContainerStyle={{
              gap: moderateScale(15),
              paddingBottom: DVH(25),
              paddingHorizontal: moderateScale(10),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({
              item,
              index,
            }: {
              item: cartItemTypes;
              index: number;
            }) => {
              return (
                <CartCard
                  key={index}
                  item={item}
                  removeFromCart={() => removeFromCart(item?.id)}
                  decrementQuantity={() => decrementQuantity(item?.id)}
                  incrementQuantity={() => incrementQuantity(item?.id)}
                />
              );
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
              onPress={() => navigateToAddProductToCart()}
              buttonType='Solid'
              red
              textWhite
              textType='medium'
            />
          </View>
        )}
        {cart && cart.length > 0 && (
          <View style={styles.checkoutContainer}>
            <View style={styles.cartInfoContainer}>
              <CustomText type='semi-bold' size={16} lightBlack>
                Total Items
              </CustomText>
              <CustomText type='semi-bold' size={16} lightGray>
                {formatAmountWithCommas(totalItems())}
              </CustomText>
            </View>
            <View style={styles.cartInfoContainer}>
              <CustomText type='semi-bold' size={16} lightBlack>
                Total Price
              </CustomText>
              <CustomText type='semi-bold' size={16} lightGray>
                #{formatAmountWithCommas(totalPrice())}
              </CustomText>
            </View>
            <CustomButton
              title={`Checkout`}
              red
              textWhite
              textType='medium'
              textSize={14}
              onPress={() => navigation.navigate(appScreenNames.CHECKOUT)}
              buttonType='Solid'
            />
          </View>
        )}
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  header: {
    paddingTop:
      Platform?.OS === "android" ? moderateScale(50) : moderateScale(60),
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(20),
  },

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
    marginVertical: moderateScale(10),
  },
});
