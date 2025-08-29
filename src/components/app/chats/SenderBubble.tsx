import { apiGetUserServiceMessagesResponse } from "@src/api/types/app";
import { CustomText } from "@src/components/shared";
import { getDateStringVal } from "@src/helper/utils";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

interface ISenderBubbleProps {
  data: apiGetUserServiceMessagesResponse;
}

export const SenderBubble: React.FC<ISenderBubbleProps> = ({ data }) => {
  const time = getDateStringVal(data?.created_at, true);
  return (
    <>
      {data?.attachment ? (
        <View
          style={{
            backgroundColor: "#d60209",
            alignSelf: "flex-end",
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(10),
            width: "80%",
            borderRadius: moderateScale(10),
            overflow: "hidden",
            marginBottom: moderateScale(10),
          }}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{ uri: data?.attachment }}
              cachePolicy={"disk"}
              contentFit='fill'
            />
          </View>
          {data.message !== "image" && (
            <CustomText
              type='regular'
              size={14}
              style={{
                color: colors.white,
              }}>
              {data?.message}
            </CustomText>
          )}

          <View
            style={{
              alignItems: "flex-end",
              paddingVertical: moderateScale(2),
            }}>
            {time === "Invalid date" ? (
              <Ionicons
                name='timer-outline'
                color={colors.white}
                size={moderateScale(14)}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(4),
                }}>
                <CustomText
                  type='regular'
                  size={9}
                  style={{
                    color: colors.white,
                  }}>
                  {time}
                </CustomText>
                <Ionicons
                  name='checkmark-done'
                  color={colors.white}
                  size={moderateScale(14)}
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.bubbleContainer}>
          <CustomText
            type='regular'
            size={14}
            style={{
              color: colors.white,
            }}>
            {data?.message !== "image" ? data?.message : "Image loading..."}
          </CustomText>
          <View
            style={{
              alignItems: "flex-end",
              paddingVertical: moderateScale(2),
            }}>
            {time === "Invalid date" ? (
              <Ionicons
                name='timer-outline'
                color={colors.white}
                size={moderateScale(14)}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: moderateScale(4),
                }}>
                <CustomText
                  type='regular'
                  size={9}
                  style={{
                    color: colors.white,
                  }}>
                  {time}
                </CustomText>
                <Ionicons
                  name='checkmark-done'
                  color={colors.white}
                  size={moderateScale(14)}
                />
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(10), // more bubble-like
    backgroundColor: "#d60209",
    alignSelf: "flex-end",
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
    maxWidth: "80%", // ✅ auto-resize
    minWidth: moderateScale(50), // ✅ optional, prevent very tiny bubble
  },
  imgMainContainer: {},
  imgContainer: {
    width: "100%",
    height: DVH(25),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  img: {
    width: "100%",
    height: "94%",
  },
});
