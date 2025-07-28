import { apiGetUserNotificationsResponse } from "@src/api/types/app";
import { CustomText } from "@src/components/shared";
import {
  extractTextFromHtml,
  getDateStringVal,
  truncateText,
} from "@src/helper/utils";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

interface INotificationCardProps {
  data: apiGetUserNotificationsResponse;
  onView: () => void;
}

export const NotificationCard: React.FC<INotificationCardProps> = ({
  data,
  onView,
}) => {
  return (
    <View style={styles.card}>
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
            {data.title}
          </CustomText>
          <CustomText
            type='regular'
            size={12}
            lightBlack
            style={{
              maxWidth: "90%",
            }}>
            {truncateText(extractTextFromHtml(data?.content), 40)}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <CustomText type='regular' size={10} lightBlack>
          {getDateStringVal(data?.notifiable?.created_at)}
        </CustomText>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: moderateScale(2),
          }}
          onPress={() => onView()}>
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
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#b0b0b061",
    width: "100%",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    overflow: "hidden",
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
