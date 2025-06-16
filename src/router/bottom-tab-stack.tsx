import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBarStackParamList } from "./types";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { StyleSheet } from "react-native";
import { CustomText } from "@src/components/shared";
import { bottomTabScreenNames } from "@src/navigation";
import { bottomTabScreens } from "@src/navigation/bottom-tab-screens";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@src/resources/color/color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFirstCapitalSegment } from "@src/helper/utils";

const Tab = createBottomTabNavigator<BottomTabBarStackParamList>();

export const BottomTabStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 52 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabel: ({ focused }) =>
          focused ? (
            <CustomText type='regular' size={12} red>
              {getFirstCapitalSegment(route?.name)}
            </CustomText>
          ) : (
            <CustomText type='regular' size={12} lightGray>
              {getFirstCapitalSegment(route?.name)}
            </CustomText>
          ),
        tabBarIcon: ({ focused }) =>
          focused && route.name === bottomTabScreenNames.HOME_STACK ? (
            <AntDesign
              name='home'
              color={colors.red}
              size={moderateScale(20)}
            />
          ) : !focused && route.name === bottomTabScreenNames.HOME_STACK ? (
            <AntDesign
              name='home'
              color={colors.lightGray}
              size={moderateScale(20)}
            />
          ) : focused &&
            route.name === bottomTabScreenNames.CATEGORIES_STACK ? (
            <MaterialIcons
              name='category'
              size={moderateScale(20)}
              color={colors.red}
            />
          ) : !focused &&
            route.name === bottomTabScreenNames.CATEGORIES_STACK ? (
            <MaterialIcons
              name='category'
              size={moderateScale(20)}
              color={colors.lightGray}
            />
          ) : focused && route.name === bottomTabScreenNames.WISH_LIST_STACK ? (
            <AntDesign
              name='hearto'
              size={moderateScale(20)}
              color={colors.red}
            />
          ) : !focused &&
            route.name === bottomTabScreenNames.WISH_LIST_STACK ? (
            <AntDesign
              name='hearto'
              size={moderateScale(20)}
              color={colors.lightGray}
            />
          ) : focused && route.name === bottomTabScreenNames.MESSAGES_STACK ? (
            <AntDesign
              name='message1'
              size={moderateScale(20)}
              color={colors.red}
            />
          ) : !focused && route.name === bottomTabScreenNames.MESSAGES_STACK ? (
            <AntDesign
              name='message1'
              size={moderateScale(20)}
              color={colors.lightGray}
            />
          ) : focused && route.name === bottomTabScreenNames.PROFILE_STACK ? (
            <FontAwesome5
              name='user'
              size={moderateScale(20)}
              color={colors.red}
            />
          ) : !focused && route.name === bottomTabScreenNames.PROFILE_STACK ? (
            <FontAwesome5
              name='user'
              size={moderateScale(20)}
              color={colors.lightGray}
            />
          ) : undefined,
      })}>
      {bottomTabScreens &&
        bottomTabScreens.map((screen, index) => (
          <Tab.Screen
            name={screen.screenName}
            key={index}
            component={screen.component}
          />
        ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: DVW(7),
    height: DVH(3.5),
    overflow: "hidden",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
