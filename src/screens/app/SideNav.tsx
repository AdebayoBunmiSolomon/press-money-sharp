import { appScreenNames, bottomTabScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Screen } from "../Screen";
import { DVW, moderateScale } from "@src/resources/responsiveness";
import { CustomText } from "@src/components/shared";
import { Header } from "@src/components/app/home";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { sideNav } from "@src/constants/sidenav";
import { ScrollContainer } from "../ScrollContainer";

export const SideNav = ({
  navigation,
}: RootStackScreenProps<appScreenNames.SIDE_NAV>) => {
  const screenNavigation = (action: string) => {
    switch (action) {
      case sideNav[0].subMenu[0]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.CATEGORIES,
        });
        break;
      case sideNav[1].subMenu[0]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.CAR_SALES,
        });
        break;
      case sideNav[1].subMenu[1]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.CAR_HIRE,
        });
        break;
      case sideNav[1].subMenu[2]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.SPARE_PARTS,
        });
        break;
      case sideNav[1].subMenu[3]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.CONSULTATION_SERVICES,
        });
        break;
      case sideNav[1].subMenu[4]?.list:
        navigation.navigate(bottomTabScreenNames.CATEGORIES_STACK, {
          screen: appScreenNames.DEALERS_DEAL,
        });
        break;
      case sideNav[2].subMenu[0]?.list:
        navigation.navigate(bottomTabScreenNames.WISH_LIST_STACK, {
          screen: appScreenNames.WISH_LIST,
        });
        break;
      case sideNav[2].subMenu[1]?.list:
        navigation.navigate(appScreenNames.RECENTLY_VIEWED);
        break;
      default:
        // Optionally handle unknown action
        break;
    }
  };

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
        headerStyle={{
          paddingHorizontal: moderateScale(15),
        }}
      />
      <ScrollContainer>
        {sideNav &&
          sideNav.map((item, index) => (
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
                  onPress={() => screenNavigation(subItem?.list)}>
                  <CustomText type='regular' size={14} lightBlack>
                    {subItem?.list}
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
      </ScrollContainer>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(0),
    backgroundColor: "#f9f9f957",
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
