import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";

export const Wishlist =
  ({}: RootStackScreenProps<appScreenNames.WISH_LIST>) => {
    return (
      <>
        <StatusBar style='dark' />
        <Screen style={styles.screenContainer} safeArea>
          <CustomText type='regular' size={15} black>
            Wishlist Screen
          </CustomText>
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
});
