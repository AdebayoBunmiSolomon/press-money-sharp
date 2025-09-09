import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React, { useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { Header } from "@src/components/app/home";
import { AntDesign } from "@expo/vector-icons";
import { CustomText } from "@src/components/shared";
import { ScrollContainer } from "../ScrollContainer";
import { useGetTermsAndConditions } from "@src/api/hooks/queries/app";
import { deserializeJSON } from "@src/helper/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { FullScreenLoader } from "@src/common";

export const TermsAndConditions = ({
  navigation,
}: RootStackScreenProps<appScreenNames.TERMS_AND_CONDITIONS>) => {
  const { termsAndConditions, isFetching } = useGetTermsAndConditions();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const serializedData = deserializeJSON(
    termsAndConditions && termsAndConditions[0]?.value
  );
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
      {isFetching ? (
        <FullScreenLoader visible={isFetching} />
      ) : (
        // <View
        //   style={{
        //     flex: 1,
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}>
        //   <Loader size='large' color={colors.red} />
        // </View>
        <ScrollContainer
          style={{
            flexGrow: 1,
          }}>
          {serializedData &&
            serializedData.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.dropdownBtn}
                  onPress={() =>
                    setSelectedIdx(selectedIdx === index ? null : index)
                  }>
                  <CustomText type='medium' size={14} lightBlack>
                    {item?.title}
                  </CustomText>
                  <MaterialIcons
                    name={
                      selectedIdx === index
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={moderateScale(25)}
                    color={colors.lightBlack}
                  />
                </TouchableOpacity>
                {selectedIdx === index && (
                  <View
                    style={{
                      width: "100%",
                    }}>
                    <CustomText
                      type='regular'
                      size={13}
                      lightBlack
                      style={{
                        textAlign: "justify",
                      }}>
                      {item?.description as string}
                    </CustomText>
                  </View>
                )}
              </View>
            ))}
          <View
            style={{
              paddingVertical: DVH(5),
            }}
          />
        </ScrollContainer>
      )}
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
  dropdownBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
  },
});
