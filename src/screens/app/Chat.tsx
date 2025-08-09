import React, { useEffect, useState, useRef } from "react";
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
import { ReceiverBubble, SenderBubble } from "@src/components/app/chats";
import { useIsFocused } from "@react-navigation/native";
import { useSendChatMessage } from "@src/api/hooks/mutation/app";
import { useUserServiceMessagesStore } from "@src/api/store/app";

export const Chat = ({
  navigation,
  route,
}: RootStackScreenProps<appScreenNames.CHAT>) => {
  const isFocused = useIsFocused();
  const { service_uuid } = route?.params;
  const { userData } = useAuthStore();
  const {} = useGetUserServiceMessages(service_uuid, userData?.token);
  const {
    userServiceMessages: userServiceMessagesStore,
    setUserServiceMessages: setUserServiceMessagesStore,
  } = useUserServiceMessagesStore();
  const { SendChatMessage, response } = useSendChatMessage();
  // const [chat, setChat] = useState<apiGetUserServiceMessagesResponse[]>(userServiceMessagesStore);
  const [message, setMessage] = useState<string>("");

  // Add ref for FlatList to enable scrolling
  const flatListRef = useRef<FlatList>(null);

  //on mount, load chat messages first
  useEffect(() => {
    if (isFocused) {
      queryClient.invalidateQueries({
        queryKey: [appQueryKeys.GET_USER_SERVICE_MESSAGES, service_uuid],
      });
    }
  }, [isFocused]);

  // //after mount, load chats
  // useEffect(() => {
  //   if (!isFetching && userServiceMessages) {
  //     setChat(userServiceMessages);
  //   }
  // }, [isFetching, userServiceMessages]);

  // Auto-scroll to bottom when chat array changes (new messages added)
  useEffect(() => {
    if (userServiceMessagesStore.length > 0 && flatListRef.current) {
      // Small delay to ensure the FlatList has rendered the new item
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [userServiceMessagesStore]);

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
        {/* {isFetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Loader size='large' color={colors.red} />
          </View>
        ) : ( */}
        <FlatList
          ref={flatListRef} // Add ref to FlatList
          data={userServiceMessagesStore && userServiceMessagesStore}
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
            const isSender = item?.sender_id === userData?.uuid ? true : false;
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
          // Optional: Maintain scroll position at bottom
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          // Add onLayout to scroll when FlatList is first rendered
          onLayout={() => {
            if (useUserServiceMessagesStore.length > 0) {
              setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
              }, 100);
            }
          }}
        />
        {/* )} */}
      </View>
      <View style={styles.actionContainer}>
        <View
          style={{
            width: "85%",
          }}>
          <CustomInput
            value={message}
            onChangeText={(enteredValue) => {
              setMessage(enteredValue);
            }}
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
          onPress={() => {
            if (message) {
              SendChatMessage({
                message: message,
                service: service_uuid,
                file: null,
              });
              const updatedChat = [
                ...userServiceMessagesStore,
                {
                  attachment: response?.data?.data?.attachment,
                  created_at: response?.data?.data?.created_at,
                  id: response?.data?.data?.id,
                  message: message,
                  our_service_id: response?.data?.data?.our_service_id,
                  read_at: response?.data?.data?.created_at,
                  receiver_id: response?.data?.data?.receiver_id,
                  sender_id: response?.data?.data?.sender_id,
                  service: {
                    brand: response?.data?.data?.service?.brand,
                    category: response?.data?.data?.service?.category,
                    created_at: response?.data?.data?.service?.created_at,
                    deleted_at: response?.data?.data?.service?.created_at,
                    description: response?.data?.data?.service?.description,
                    fee: response?.data?.data?.service?.fee,
                    has_online_payment:
                      response?.data?.data?.service?.has_online_payment,
                    id: response?.data?.data?.service?.id,
                    image_urls: response?.data?.data?.service?.image_urls,
                    location: response?.data?.data?.service?.location,
                    model: response?.data?.data?.service?.model,
                    status: response?.data?.data?.service?.status,
                    type: response?.data?.data?.service?.type,
                    updated_at: response?.data?.data?.service?.updated_at,
                    uuid: response?.data?.data?.service?.uuid,
                  },
                  updated_at: response?.data?.data?.updated_at,
                  uuid: response?.data?.data?.uuid,
                },
              ];
              setUserServiceMessagesStore(updatedChat); // This will trigger the auto-scroll useEffect
            }
            setMessage("");
          }}
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
