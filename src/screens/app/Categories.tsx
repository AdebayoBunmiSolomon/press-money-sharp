import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { AntDesign, Foundation, Ionicons } from "@expo/vector-icons";
import { useCategoriesStore } from "@src/api/store/app";
import { ScrollContainer } from "../ScrollContainer";
import { ProductCard } from "@src/common/cards";

export const Categories = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CATEGORIES>) => {
  const { categories } = useCategoriesStore();
  const [pressedCategory, setPressedCategory] = useState<string>("");
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
          title={
            pressedCategory
              ? pressedCategory
              : String(categories && `Car ${categories[0]}`)
          }
          headerStyle={styles.header}
          color={colors.white}
        />
        <View style={styles.contentContainer}>
          <ScrollContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.filterBtn}>
                <Foundation
                  name='filter'
                  size={moderateScale(17)}
                  color={colors.red}
                />
                <CustomText size={12} type='medium' lightBlack>
                  Filters
                </CustomText>
              </TouchableOpacity>
              {categories &&
                categories.map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styles.filterBtn,
                      {
                        backgroundColor:
                          pressedCategory === `Car ${item}`
                            ? "#b0b0b02f"
                            : undefined,
                      },
                    ]}
                    key={index}
                    onPress={() => setPressedCategory(`Car ${item}`)}>
                    <CustomText size={12} type='medium' lightBlack>
                      {`Car ` + item}
                    </CustomText>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            {Array.from({ length: 5 }, (_, index) => (
              <ProductCard
                key={index}
                title='2022 Lexus Rx350 FSPORT'
                price='30000000'
                location='Challenge, Ibadan'
                onClickCard={() =>
                  navigation.navigate(appScreenNames.CAR_DETAILS)
                }
              />
            ))}
            <View
              style={{
                paddingVertical: DVH(10),
              }}
            />
          </ScrollContainer>
        </View>
        <View style={styles.floatBtnContainer}>
          <TouchableOpacity
            style={[
              styles.floatBtn,
              {
                borderColor: colors.lightGray,
              },
            ]}>
            <AntDesign
              name='arrowup'
              size={moderateScale(25)}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatBtn}>
            <Ionicons
              name='logo-whatsapp'
              size={moderateScale(25)}
              color={"#25D366"}
            />
          </TouchableOpacity>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
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
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    borderRadius: moderateScale(50),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderWidth: DVW(0.3),
    borderColor: colors.lightGray,
    marginRight: moderateScale(10),
  },
  floatBtnContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? moderateScale(15) : moderateScale(10),
    alignSelf: "flex-end",
    marginRight: moderateScale(10),
    gap: moderateScale(10),
  },
  floatBtn: {
    padding: moderateScale(10),
    borderRadius: moderateScale(100),
    borderWidth: DVW(0.4),
    borderColor: "#25D366",
    backgroundColor: colors.white,

    // 💡 iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // 💡 Android shadow (elevation)
    elevation: 5,
  },
});
