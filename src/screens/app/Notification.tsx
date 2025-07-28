import { appScreenNames } from "@src/navigation";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useState } from "react";
import { Screen } from "../Screen";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@src/resources/color/color";
import { DVH, moderateScale } from "@src/resources/responsiveness";
import { Header } from "@src/components/app/home";
import { CustomText } from "@src/components/shared";
import { useAuthStore } from "@src/api/store/auth";
import { useGetUserNotifications } from "@src/api/hooks/queries/app";
import { Loader } from "@src/common";
import { AntDesign } from "@expo/vector-icons";
import { NotificationCard } from "@src/common/cards";
import { NotificationView } from "@src/components/app/notifications";

type modalContentType = {
  visible: boolean;
  title: string;
  content: string;
  notifiable_type: string;
};

export const Notification = ({
  navigation,
}: RootStackScreenProps<appScreenNames.NOTIFICATION>) => {
  const [modalContent, setModalContent] = useState<modalContentType>({
    visible: false,
    title: "",
    content: "",
    notifiable_type: "",
  });
  const { userData } = useAuthStore();
  const { isFetching, userNotifications } = useGetUserNotifications(
    userData?.uuid,
    userData?.token
  );

  useEffect(() => {
    console.log(
      userNotifications && userNotifications[0]?.notifiable?.created_at
    );
  }, []);

  return (
    <>
      <Screen style={styles.screenContainer}>
        <Header
          title={"Notifications"}
          headerStyle={styles.header}
          color={colors.white}
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={moderateScale(20)}
                color={colors.white}
              />
            </TouchableOpacity>
          }
        />
        {isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Loader size='large' color={colors.red} />
          </View>
        ) : userNotifications ? (
          <FlatList
            data={userNotifications}
            contentContainerStyle={{
              gap: moderateScale(8),
              paddingBottom: DVH(25),
              paddingHorizontal: moderateScale(10),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item, index }) => (
              <NotificationCard
                data={item}
                onView={() =>
                  setModalContent({
                    ...modalContent,
                    visible: !modalContent?.visible,
                    title: item?.title,
                    content: item?.content,
                    notifiable_type: item?.notifiable_type,
                  })
                }
                key={index}
              />
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
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CustomText
              type='medium'
              size={14}
              lightGray
              style={{
                alignSelf: "center",
              }}>
              No notifications found for{" "}
              {userData?.first_name + " " + userData?.last_name}
            </CustomText>
          </View>
        )}
      </Screen>
      <NotificationView
        visible={modalContent?.visible}
        closeModal={() =>
          setModalContent({
            ...modalContent,
            visible: !modalContent?.visible,
            title: "",
            content: "",
            notifiable_type: "",
          })
        }
        data={{
          title: modalContent?.title,
          content: modalContent?.content,
          notifiable_type: modalContent?.notifiable_type,
        }}
      />
    </>
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
});
