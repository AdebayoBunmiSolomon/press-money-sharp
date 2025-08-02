import React, { useState } from "react";
import { Screen } from "../Screen";
import { colors } from "@src/resources/color/color";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { moderateScale } from "@src/resources/responsiveness";
import { useCartCache } from "@src/cache/cartCache";
import { CustomButton, CustomText } from "@src/components/shared";
import { formatAmountWithCommas } from "@src/helper/utils";
import { DeliveryTab, PickupTab, Tab } from "@src/components/app/checkout";

export const CheckOut = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CHECKOUT>) => {
  const [selectedTab, setSelectedTab] = useState<string>("Delivery");
  const { cart, totalItems, totalPrice } = useCartCache();

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
                  Checkout
                </CustomText>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <CustomText type='semi-bold' size={14} red>
                  Modify Cart
                </CustomText>
              </TouchableOpacity>
            </View>
          }
          headerStyle={styles.header}
          extraComponent={
            <Tab
              data={["Delivery", "Pickup"]}
              onSelect={(item) => setSelectedTab(item)}
              selectedItem={selectedTab}
            />
          }
        />
        {selectedTab === "Delivery" && (
          <DeliveryTab
            onPressContact={() => setSelectedTab("Pickup")}
            onPressDelivery={() => setSelectedTab("Pickup")}
            onPressPickUp={() => setSelectedTab("Pickup")}
          />
        )}
        {selectedTab === "Pickup" && <PickupTab />}
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
    marginVertical: moderateScale(5),
  },
});
