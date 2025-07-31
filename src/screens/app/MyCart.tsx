import React, { useRef } from "react";
import { Screen } from "../Screen";
import { colors } from "@src/resources/color/color";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { cartTypes, useCartCache } from "@src/cache/cartCache";
import { FloatActionButton } from "@src/common";
import { Image } from "expo-image";
import { CustomText } from "@src/components/shared";
import { formatAmountWithCommas } from "@src/helper/utils";

export const MyCart = ({
  navigation,
}: RootStackScreenProps<appScreenNames.MY_CART>) => {
  const { cart } = useCartCache();
  const flatListRef = useRef<FlatList>(null);
  return (
    <>
      <Screen bgColor={colors.white} style={styles.screen}>
        <Header
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.black}
              />
            </TouchableOpacity>
          }
          headerStyle={styles.header}
        />
        <FlatList
          ref={flatListRef}
          data={cart}
          contentContainerStyle={{
            gap: moderateScale(15),
            paddingBottom: DVH(25),
            paddingHorizontal: moderateScale(10),
          }}
          keyExtractor={(__, index) => index.toString()}
          renderItem={({ item, index }: { item: cartTypes; index: number }) => {
            return (
              <View key={index} style={styles.cartCard}>
                <View style={styles.imgContainer}>
                  <Image
                    source={item?.image}
                    contentFit='cover'
                    style={styles.img}
                  />
                </View>
                <View>
                  <CustomText size={12} type='medium' lightBlack>
                    {item?.title}
                  </CustomText>
                  <CustomText type='semi-bold' size={20} red>
                    #{formatAmountWithCommas(Number(item?.price))}
                  </CustomText>
                  <View style={styles.actionBtnContainer}>
                    <View style={styles.addSubtractContainer}>
                      <TouchableOpacity style={styles.addSubtractBtn}>
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
                        1
                      </CustomText>
                      <TouchableOpacity style={styles.addSubtractBtn}>
                        <CustomText size={18} lightBlack type='medium'>
                          +
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <AntDesign
                        name='delete'
                        size={moderateScale(20)}
                        color={colors.red}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={2}
          initialNumToRender={2}
          windowSize={2}
        />
        <FloatActionButton
          onPressArrowUp={() =>
            flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
          }
          onPressWhatsApp={() => {}}
        />
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
  imgContainer: {
    width: DVW(25),
    height: DVH(10),
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
    width: "82%",
  },
});
