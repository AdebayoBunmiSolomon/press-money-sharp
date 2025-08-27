import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackParamList } from "@src/router/types";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { apiGetAllUserChatsResponse } from "@src/api/types/app";
import { getDateStringVal, truncateText } from "@src/helper/utils";
// import { Loader } from "@src/common";
// import { colors } from "@src/resources/color/color";
import { useAuthStore } from "@src/api/store/auth";

interface IUnreadTabProps {
  data: apiGetAllUserChatsResponse[];
  loading: boolean;
  onPullDownRefresh?: () => void;
}

export const UnreadTab: React.FC<IUnreadTabProps> = ({
  data,
  // loading,
  // onPullDownRefresh,
}) => {
  const { userData } = useAuthStore();
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();
  const [filteredUnreadMsg, setFilteredUnreadMsg] = useState<
    apiGetAllUserChatsResponse[]
  >([]);

  useEffect(() => {
    const initiateFiltering = () => {
      const unreadMsg =
        data &&
        data.filter(
          (msg) => msg?.receiver_id === userData?.uuid && msg.read_at === null
        );
      if (unreadMsg) {
        setFilteredUnreadMsg(unreadMsg);
      }
    };

    initiateFiltering();
  }, [data]);

  const renderItem = useCallback(
    ({ item }: { item: apiGetAllUserChatsResponse }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate(appScreenNames.CHAT, {
            service_uuid: item?.service?.uuid,
          })
        }>
        <View style={styles.row}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              contentFit='cover'
              source={{ uri: item?.service?.image_urls[0] }}
              cachePolicy='disk'
            />
          </View>
          <View style={styles.textContainer}>
            <CustomText type='semi-bold' size={12} lightBlack>
              {truncateText(
                `${item?.service?.brand} ${item?.service?.model}`,
                15
              )}
            </CustomText>
            <CustomText type='regular' size={12} style={styles.messageText}>
              {truncateText(item?.message, 15)}
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText type='regular' size={9} lightBlack>
            {getDateStringVal(item?.created_at)}
          </CustomText>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const keyExtractor = useCallback(
    (item: apiGetAllUserChatsResponse) =>
      item?.uuid ?? item?.service?.uuid ?? Math.random().toString(),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      {/* {loading ? (
        <View style={styles.loaderContainer}>
          <Loader size='large' color={colors.red} />
        </View>
      ) :  */}
      {filteredUnreadMsg && filteredUnreadMsg.length > 0 ? (
        <FlatList
          data={filteredUnreadMsg}
          contentContainerStyle={styles.listContent}
          // refreshing={loading}
          // onRefresh={onPullDownRefresh}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          getItemLayout={(_, index) => ({
            length: moderateScale(70), // approximate row height
            offset: moderateScale(70) * index,
            index,
          })}
        />
      ) : (
        <View style={styles.emptyContainer}>
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
  row: {
    flexDirection: "row",
    gap: moderateScale(20),
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
  textContainer: {
    gap: moderateScale(10),
  },
  messageText: {
    color: "#696161",
  },
  listContent: {
    gap: moderateScale(8),
    paddingBottom: DVH(25),
    paddingHorizontal: moderateScale(10),
  },
  loaderContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
