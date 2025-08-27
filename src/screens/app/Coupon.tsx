import React from "react";
import { Screen } from "../Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { ScrollContainer } from "../ScrollContainer";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { CustomButton, CustomText } from "@src/components/shared";

export const Coupon = ({
  navigation,
}: RootStackScreenProps<appScreenNames.COUPON>) => {
  return (
    <>
      <Screen safeArea style={styles.screen}>
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
          onPressMenuIcon={() =>
            navigation.navigate(bottomTabScreenNames.HOME_STACK, {
              screen: appScreenNames.SIDE_NAV,
            })
          }
          headerStyle={{
            paddingHorizontal: moderateScale(10),
          }}
        />
        <ScrollContainer>
          <View style={styles.cta}>
            <CustomText type='semi-bold' size={16} white>
              20% off any Services
            </CustomText>
            <CustomButton
              title='Expire in 3days'
              white
              textBlack
              buttonType='Solid'
              onPress={() => {
                // if(userReferral?.user?.)
              }}
              textType='medium'
              textSize={10}
              btnStyle={styles.earnBtn}
            />
          </View>

          <View
            style={[
              styles.cta,
              {
                backgroundColor: "#F7F7F7",
              },
            ]}></View>
        </ScrollContainer>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.white,
    paddingTop: moderateScale(0),
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
  },
  cta: {
    backgroundColor: colors.red,
    borderRadius: moderateScale(10),
    width: "98%",
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: moderateScale(10),
    paddingVertical: moderateScale(20),
  },
  earnBtn: {
    paddingVertical: moderateScale(2),
    width: "40%",
    marginVertical: moderateScale(10),
  },
});
