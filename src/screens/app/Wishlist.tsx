import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useRef } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { products } from "@src/constants/products";
import { ProductCard } from "@src/common/cards";
import { FloatActionButton } from "@src/common";

export const Wishlist = ({
  navigation,
}: RootStackScreenProps<appScreenNames.WISH_LIST>) => {
  const flatListRef = useRef<FlatList>(null);
  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer}>
        <Header
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.white}
              />
            </TouchableOpacity>
          }
          title='Wish List'
          headerStyle={styles.header}
          color={colors.white}
        />
        <View style={styles.contentContainer}>
          <FlatList
            ref={flatListRef}
            data={products}
            contentContainerStyle={{
              gap: moderateScale(15),
              paddingBottom: DVH(20),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ProductCard
                key={index}
                title={item?.title}
                price={item?.price}
                location={item?.location}
                onClickCard={() =>
                  navigation.navigate(appScreenNames.CAR_DETAILS)
                }
              />
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
          />
        </View>
        <FloatActionButton
          onPressArrowUp={() =>
            flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
          }
          onPressWhatsApp={() => {}}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: moderateScale(0),
    paddingHorizontal: moderateScale(0),
    // paddingHorizontal: moderateScale(15),
  },
  header: {
    backgroundColor: colors.red,
    paddingTop:
      Platform?.OS === "android" ? moderateScale(50) : moderateScale(50),
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(30),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
  },
});
