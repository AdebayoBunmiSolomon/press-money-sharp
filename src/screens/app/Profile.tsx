import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { ScrollContainer } from "../ScrollContainer";
import { profileList } from "@src/constants/profile";
import { MaterialIcons } from "@expo/vector-icons";

export const Profile = ({}: RootStackScreenProps<appScreenNames.PROFILE>) => {
  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer}>
        <View style={styles.usernameContainer}>
          <CustomText type='regular' size={15} lightGray>
            Welcome,
          </CustomText>
          <CustomText type='medium' size={15} black>
            John
          </CustomText>
        </View>
        <ScrollContainer>
          {profileList &&
            profileList.map((item, index) => (
              <View key={index} style={styles.sideNavContainer}>
                <CustomText
                  type='medium'
                  size={16}
                  lightBlack
                  style={{
                    paddingLeft: moderateScale(15),
                    paddingBottom: moderateScale(5),
                  }}>
                  {item?.title}
                </CustomText>
                {item?.subMenu?.map((subItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    style={styles.actionListBtn}
                    onPress={() => {}}>
                    <CustomText type='regular' size={14} lightBlack>
                      {subItem}
                    </CustomText>
                    <MaterialIcons
                      name='arrow-forward-ios'
                      size={moderateScale(16)}
                      color={colors.lightBlack}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          <View
            style={{
              paddingVertical: DVH(10),
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
    backgroundColor: "#f9f9f91e",
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(100),
    paddingBottom: moderateScale(20),
    backgroundColor: "#F8D2D2",
    marginBottom: moderateScale(0),
  },
  sideNavContainer: {
    paddingVertical: moderateScale(15),
  },
  actionListBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: moderateScale(20),
    borderBottomWidth: DVW(0.3),
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
