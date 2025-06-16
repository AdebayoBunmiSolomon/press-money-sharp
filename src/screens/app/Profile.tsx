import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../Screen";

export const Profile = ({}: RootStackScreenProps<appScreenNames.PROFILE>) => {
  return (
    <Screen style={styles.screenContainer} safeArea>
      <CustomText type='regular' size={15} black>
        Profile Screen
      </CustomText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.red,
    paddingHorizontal: moderateScale(15),
  },
});
