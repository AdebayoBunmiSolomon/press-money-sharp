import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { CategoryList, Header } from "@src/components/app/home";
import { ScrollContainer } from "../ScrollContainer";
import { Image } from "expo-image";
import { useGetCategory } from "@src/api/hooks/queries/app";
import { ProductCard } from "@src/common/cards";

export const Home = ({}: RootStackScreenProps<appScreenNames.HOME>) => {
  const [searchString, setSearchString] = useState<string>("");
  const { isFetching, categories } = useGetCategory();
  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer} safeArea>
        <Header showAppIcon />
        <CustomInput
          value={searchString}
          onChangeText={(enteredValue) => setSearchString(enteredValue)}
          type='custom'
          placeholder='Search here'
          placeHolderTextColor={"#BDBDBD"}
          searchInput
          style={styles.input}
        />
        <ScrollContainer style={styles.scrollContainer}>
          <View style={styles.cta}>
            <View style={styles.leftInnerCta}>
              <CustomText type='semi-bold' size={20} white>
                {`Drive your dream,\nanytime, anywhere`}
              </CustomText>
            </View>
            <View style={styles.imgXploreContainer}>
              <CustomButton
                title='Explore'
                white
                textRed
                buttonType='Solid'
                textSize={16}
                textType='medium'
                onPress={() => {}}
                btnStyle={styles.xPloreBtn}
                isLoading={false}
                loaderColor={colors.white}
              />
              <View style={styles.ctaImgContainer}>
                <Image
                  source={require("@src/assets/png/cta-img.png")}
                  contentFit='fill'
                  style={styles.ctaImg}
                />
              </View>
            </View>
          </View>
          <CategoryList data={categories} isLoading={isFetching} />
          <View>
            <CustomText type='medium' size={16} red>
              Featured
            </CustomText>
            <ProductCard
              title='2021 Lexus Rx350 FSPORT'
              price='300000000'
              location='Challenge, Ibadan'
            />
          </View>
          <View
            style={{
              paddingVertical: DVH(5),
            }}
          />
        </ScrollContainer>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
    borderRadius: moderateScale(20),
  },
  cta: {
    backgroundColor: colors.red,
    paddingTop: moderateScale(20),
    borderRadius: moderateScale(15),
    overflow: "hidden",
  },
  xPloreBtn: {
    width: "30%",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  leftInnerCta: {
    gap: moderateScale(50),
    paddingLeft: moderateScale(15),
  },
  ctaImgContainer: {
    width: DVW(60),
    height: DVH(17),
  },
  ctaImg: {
    width: "100%",
    height: "100%",
  },
  imgXploreContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: moderateScale(15),
  },
  scrollContainer: {
    gap: moderateScale(10),
    paddingTop: moderateScale(10),
  },
});
