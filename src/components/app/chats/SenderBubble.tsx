import { apiGetUserServiceMessagesResponse } from "@src/api/types/app";
import { CustomText } from "@src/components/shared";
import { getDateStringVal } from "@src/helper/utils";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { View } from "react-native";

interface ISenderBubbleProps {
  data: apiGetUserServiceMessagesResponse;
}

export const SenderBubble: React.FC<ISenderBubbleProps> = ({ data }) => {
  return (
    <View
      style={{
        paddingVertical: moderateScale(7),
        borderRadius: moderateScale(10), // more bubble-like
        backgroundColor: colors.red,
        alignSelf: "flex-end",
        paddingHorizontal: moderateScale(10),
        marginVertical: moderateScale(5),
        maxWidth: "80%", // ✅ auto-resize
        minWidth: moderateScale(50), // ✅ optional, prevent very tiny bubble
      }}>
      <CustomText
        type='regular'
        size={14}
        style={{
          color: colors.white,
        }}>
        {data?.message}
      </CustomText>
      <View
        style={{
          alignItems: "flex-end",
          paddingVertical: moderateScale(2),
        }}>
        <CustomText
          type='regular'
          size={9}
          style={{
            color: colors.white,
          }}>
          {getDateStringVal(data?.created_at, true)}
        </CustomText>
      </View>
    </View>
  );
};
