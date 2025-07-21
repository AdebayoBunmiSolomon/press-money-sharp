import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { Screen } from "../Screen";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { Header } from "@src/components/app/home";
import { CustomText } from "@src/components/shared";
import { Image } from "expo-image";
import { products } from "@src/constants/products";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthStore } from "@src/api/store/auth";
import { useGetUserNotifications } from "@src/api/hooks/queries/app";

export const Notification = ({
  navigation,
}: RootStackScreenProps<appScreenNames.NOTIFICATION>) => {
  const { userData } = useAuthStore();
  const { isFetching, userNotifications } = useGetUserNotifications(
    userData?.uuid,
    userData?.token
  );

  return (
    <Screen style={styles.screenContainer}>
      <Header
        title={"Notifications"}
        headerStyle={styles.header}
        color={colors.white}
      />
      <FlatList
        data={products}
        contentContainerStyle={{
          gap: moderateScale(8),
          paddingBottom: DVH(25),
          paddingHorizontal: moderateScale(10),
        }}
        keyExtractor={(__, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card} key={index}>
            <View
              style={{
                flexDirection: "row",
                gap: moderateScale(20),
                borderBottomWidth: DVW(0.2),
                borderBottomColor: colors.lightGray,
                paddingBottom: moderateScale(10),
              }}>
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  contentFit='fill'
                  source={require("@src/assets/png/app-icon.png")}
                />
              </View>
              <View
                style={{
                  gap: moderateScale(5),
                }}>
                <CustomText type='medium' size={12} lightBlack>
                  Blow-out Sale! Up to 20% off!
                </CustomText>
                <CustomText type='regular' size={12} lightBlack>
                  Get up to 20% off all cars
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <CustomText type='regular' size={10} lightBlack>
                Today, 9:30am
              </CustomText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: moderateScale(2),
                }}
                onPress={() =>
                  navigation.navigate(appScreenNames.CAR_DETAILS, {
                    service_uuid: "test",
                  })
                }>
                <CustomText type='regular' size={10} red>
                  View
                </CustomText>
                <MaterialIcons
                  name='keyboard-arrow-right'
                  color={colors.red}
                  size={moderateScale(15)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        windowSize={2}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(0),
    paddingTop: moderateScale(0),
  },
  header: {
    backgroundColor: colors.red,
    paddingVertical: moderateScale(70),
    paddingHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  card: {
    backgroundColor: "#b0b0b061",
    width: "100%",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: "column",
    gap: moderateScale(10),
  },
  imgContainer: {
    width: DVW(12),
    height: DVH(4),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
