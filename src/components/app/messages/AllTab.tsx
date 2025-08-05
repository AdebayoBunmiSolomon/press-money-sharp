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

interface IAllTabProps {
  data: apiGetAllUserChatsResponse[];
}

export const AllTab: React.FC<IAllTabProps> = ({ data }) => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();
  return (
    <FlatList
      data={data}
      contentContainerStyle={{
        gap: moderateScale(8),
        paddingBottom: DVH(25),
        paddingHorizontal: moderateScale(10),
      }}
      keyExtractor={(__, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.card}
          key={index}
          activeOpacity={0.6}
          onPress={() => navigation.navigate(appScreenNames.CHAT)}>
          <View
            style={{
              flexDirection: "row",
              gap: moderateScale(20),
            }}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                contentFit='fill'
                source={item?.image}
              />
            </View>
            <View
              style={{
                gap: moderateScale(10),
              }}>
              <CustomText type='medium' size={12} lightBlack>
                {item?.title}
              </CustomText>
              <CustomText type='medium' size={12} lightBlack>
                is the car free?
              </CustomText>
            </View>
          </View>
          <View>
            <CustomText type='regular' size={9} lightBlack>
              7 May
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
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#b0b0b061",
    width: "100%",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(10),
  },
  imgContainer: {
    width: DVW(22),
    height: DVH(7),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
