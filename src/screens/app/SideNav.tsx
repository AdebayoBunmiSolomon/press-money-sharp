import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Screen } from "../Screen";
import { moderateScale } from "@src/resources/responsiveness";
import { CustomText } from "@src/components/shared";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";

export const SideNav = ({
  navigation,
}: RootStackScreenProps<appScreenNames.SIDE_NAV>) => {
  return (
    <Screen safeArea style={styles.screenContainer}>
      <Header
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name='arrowleft'
              size={moderateScale(20)}
              color={colors.lightBlack}
            />
          </TouchableOpacity>
        }
        color={colors.lightBlack}
      />
      <CustomText type='regular' size={17} lightBlack>
        Side Nav
      </CustomText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    backgroundColor: colors.white,
  },
});
