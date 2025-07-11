import { CustomText } from "@src/components/shared";
import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
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
import { Image } from "expo-image";
import { useSharedValue } from "react-native-reanimated";
import { ToggleSwitch } from "@src/common";

export const Profile = ({
  navigation,
}: RootStackScreenProps<appScreenNames.PROFILE>) => {
  const isOn = useSharedValue(false);

  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  const screenNavigation = (action: string) => {
    switch (action) {
      case profileList[0].subMenu[0]?.list:
        navigation.navigate(bottomTabScreenNames.WISH_LIST_STACK, {
          screen: appScreenNames.WISH_LIST,
        });
        break;
      case profileList[0].subMenu[1]?.list:
        navigation.navigate(appScreenNames.RECENTLY_VIEWED);
        break;
      case profileList[2].subMenu[0]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.DEALERS_DEAL,
        });
        break;
      case profileList[2].subMenu[4]?.list:
        navigation.navigate(bottomTabScreenNames.PROFILE_STACK, {
          screen: appScreenNames.CONTACT_US,
        });
        break;
      case profileList[2].subMenu[3]?.list:
        navigation.navigate(bottomTabScreenNames.PROFILE_STACK, {
          screen: appScreenNames.REFERRALS,
        });
        break;
      default:
        // Optionally handle unknown action
        break;
    }
  };

  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer}>
        <View style={styles.usernameImgContainer}>
          <View style={styles.userImgContainer}>
            <Image
              source={require("@src/assets/png/category/car-hire.png")}
              contentFit='cover'
              style={styles.userImg}
            />
          </View>
          <View style={styles.usernameContainer}>
            <CustomText type='regular' size={15} lightGray>
              Welcome,
            </CustomText>
            <CustomText type='medium' size={15} black>
              John
            </CustomText>
          </View>
        </View>
        <ScrollContainer>
          {profileList &&
            profileList.map((item, index) => (
              <View key={index} style={styles.profileListContainer}>
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
                    onPress={
                      subItem?.toggle
                        ? undefined
                        : () => {
                            // handle navigation or action
                            screenNavigation(subItem?.list);
                          }
                    }
                    activeOpacity={subItem?.toggle ? 1 : 0.6}>
                    <CustomText type='regular' size={14} lightBlack>
                      {subItem.list}
                    </CustomText>
                    {subItem?.toggle ? (
                      <ToggleSwitch
                        value={isOn}
                        onPress={handlePress}
                        style={styles.switch}
                        trackColors={{ on: colors.red, off: colors.lightGray }}
                      />
                    ) : (
                      <MaterialIcons
                        name='arrow-forward-ios'
                        size={moderateScale(16)}
                        color={colors.lightBlack}
                      />
                    )}
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
  usernameImgContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(20),
    backgroundColor: "#F8D2D2",
    marginBottom: moderateScale(0),
    gap: moderateScale(5),
  },
  userImgContainer: {
    width: DVW(12),
    height: DVH(6),
    overflow: "hidden",
    borderRadius: moderateScale(100),
  },
  userImg: {
    width: "100%",
    height: "100%",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    paddingBottom: moderateScale(5),
  },
  profileListContainer: {
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
  switch: {
    width: DVW(11),
    height: DVH(3),
    padding: moderateScale(4),
  },
});
