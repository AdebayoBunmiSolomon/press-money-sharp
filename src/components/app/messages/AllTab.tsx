import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { apiGetAllUserChatsResponse } from "@src/api/types/app";
import { getDateStringVal, truncateText } from "@src/helper/utils";
import { Loader } from "@src/common";
import { colors } from "@src/resources/color/color";

interface IAllTabProps {
  data: apiGetAllUserChatsResponse[];
  loading: boolean;
  onPullDownRefresh?: () => void;
}

export const AllTab: React.FC<IAllTabProps> = ({
  data,
  loading,
  onPullDownRefresh,
}) => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();
  return (
    <View>
      {loading ? (
        <View
          style={{
            width: "100%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Loader size='large' color={colors.red} />
        </View>
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          contentContainerStyle={{
            gap: moderateScale(8),
            paddingBottom: DVH(25),
            paddingHorizontal: moderateScale(10),
          }}
          refreshing={loading}
          onRefresh={onPullDownRefresh}
          keyExtractor={(__, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              key={index}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate(appScreenNames.CHAT, {
                  service_uuid: item?.service?.uuid,
                })
              }>
              <View
                style={{
                  flexDirection: "row",
                  gap: moderateScale(20),
                }}>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.img}
                    contentFit='fill'
                    source={item?.service?.image_urls[0]}
                  />
                </View>
                <View
                  style={{
                    gap: moderateScale(10),
                  }}>
                  <CustomText type='semi-bold' size={12} lightBlack>
                    {`${item?.service?.brand} ${item?.service?.model}`}
                  </CustomText>
                  <CustomText
                    type='regular'
                    size={12}
                    style={{
                      color: "#696161",
                    }}>
                    {truncateText(item?.message, 25)}
                  </CustomText>
                </View>
              </View>
              <View>
                <CustomText type='regular' size={9} lightBlack>
                  {getDateStringVal(item?.created_at)}
                </CustomText>
              </View>
            </TouchableOpacity>
          )}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={2}
          initialNumToRender={2}
          windowSize={2}
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CustomText type='medium' size={14} lightGray>
            No Messages Found
          </CustomText>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#b0b0b034",
    width: "100%",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(10),
    overflow: "hidden",
  },
  imgContainer: {
    width: DVW(20),
    height: DVH(6),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
