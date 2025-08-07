import React, { useEffect, useState } from "react";
import { Screen } from "../Screen";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import { CustomButton, CustomInput } from "@src/components/shared";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useGetUserServiceMessages } from "@src/api/hooks/queries/app";
import { useAuthStore } from "@src/api/store/auth";
import { queryClient } from "@src/helper/utils";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";
import { Loader } from "@src/common";
import { ReceiverBubble, SenderBubble } from "@src/components/app/chats";

export const Chat = ({
  navigation,
  route,
}: RootStackScreenProps<appScreenNames.CHAT>) => {
  const { service_uuid } = route?.params;
  const { userData } = useAuthStore();
  const { userServiceMessages, isFetching } = useGetUserServiceMessages(
    service_uuid,
    userData?.token
  );
  const [chat, setChat] = useState<string>("");

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [appQueryKeys.GET_USER_SERVICE_MESSAGES, service_uuid],
    });
  }, []);

  return (
    <Screen style={styles.screen} bgColor={colors.white}>
      <Header
        title={"Chats"}
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
      <View style={styles.chatContainer}>
        {isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Loader size='large' color={colors.red} />
          </View>
        ) : (
          <FlatList
            data={userServiceMessages}
            ListFooterComponent={
              Platform.OS === "ios" ? null : (
                <View
                  style={{
                    paddingVertical: DVH(10),
                  }}
                />
              )
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: moderateScale(7),
            }}
            keyExtractor={(__, index) => index.toString()}
            renderItem={({ item }) => {
              const isSender = item?.uuid === userData?.uuid ? true : false;
              return isSender ? (
                <SenderBubble data={item} />
              ) : (
                <ReceiverBubble data={item} />
              );
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
            inverted
          />
        )}
      </View>
      <View style={styles.actionContainer}>
        <View
          style={{
            width: "85%",
          }}>
          <CustomInput
            value={chat}
            onChangeText={(enteredValue) => setChat(enteredValue)}
            type='custom'
            placeholder='Type a message'
            placeHolderTextColor={"#BDBDBD"}
            keyboardType='default'
            showErrorText
            style={styles.input}
          />
        </View>
        <CustomButton
          buttonType='Solid'
          red
          rightIcon={
            <Ionicons
              name='send'
              size={moderateScale(20)}
              color={colors.white}
            />
          }
          onPress={() => {}}
          btnStyle={{
            paddingVertical: moderateScale(11),
            width: "15%",
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
  },
  header: {
    backgroundColor: colors.red,
    paddingVertical: moderateScale(70),
    paddingHorizontal: moderateScale(5),
  },
  actionContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
    position: "absolute",
    bottom: moderateScale(0),
    paddingBottom:
      Platform.OS === "ios" ? moderateScale(30) : moderateScale(50),
    backgroundColor: colors.white,
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    width: "100%",
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    height: DVH(6),
    borderColor: "#BDBDBD",
  },
  chatContainer: {
    width: "100%",
    height: "77%",
  },
});
