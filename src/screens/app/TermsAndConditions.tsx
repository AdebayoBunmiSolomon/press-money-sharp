import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { CustomText } from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { useGetTermsAndConditions } from "@src/api/hooks/queries/app";

export const TermsAndConditions = ({
  navigation,
}: RootStackScreenProps<appScreenNames.TERMS_AND_CONDITIONS>) => {
  const { isFetching, termsAndConditions } = useGetTermsAndConditions();
  return (
    <Screen style={styles.screenContainer} safeArea>
      <Header
        leftIcon={
          <View style={styles.headerLeftIconContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.lightBlack}
              />
            </TouchableOpacity>
            <CustomText
              type='medium'
              size={16}
              style={{
                color: colors.lightBlack,
              }}>
              Terms & Conditions
            </CustomText>
          </View>
        }
        color={colors.lightBlack}
      />
      <ScrollContainer
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        {termsAndConditions && termsAndConditions.length > 0 ? (
          <CustomText type='medium' size={14} lightBlack>
            Data Fetched Successfully
          </CustomText>
        ) : (
          <CustomText type='medium' size={14} lightGray>
            No Terms and Conditions
          </CustomText>
        )}
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  headerLeftIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
