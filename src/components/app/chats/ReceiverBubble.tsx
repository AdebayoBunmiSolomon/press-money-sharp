import { apiGetUserServiceMessagesResponse } from "@src/api/types/app";
import { CustomText } from "@src/components/shared";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import React from "react";
import { View } from "react-native";

interface IReceiverBubbleProps {
  data: apiGetUserServiceMessagesResponse;
}

export const ReceiverBubble: React.FC<IReceiverBubbleProps> = ({ data }) => {
  return (
    <View
      style={{
        paddingVertical: moderateScale(5),
        borderRadius: moderateScale(15), // more bubble-like
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
    </View>
  );
};
