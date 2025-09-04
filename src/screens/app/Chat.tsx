import React, { useEffect, useState, useRef } from "react";
import { Screen } from "../Screen";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
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
import {
  useGroupedMessages,
  useDateFormatter,
  FlatListItem,
  useMedia,
  ImagePickerResult,
} from "@src/hooks/services";
import { ImageViewer } from "@src/components/app/chats/ImageViwer";
import { FileUploadModal } from "@src/common";

// Date Header Component
const DateHeader: React.FC<{ date: string }> = React.memo(({ date }) => {
  const { formatMessageDate } = useDateFormatter();

  return (
    <View style={styles.dateHeader}>
      <Text style={styles.dateHeaderText}>{formatMessageDate(date)}</Text>
    </View>
  );
});

export const Chat = ({
  navigation,
  route,
}: RootStackScreenProps<appScreenNames.CHAT>) => {
  const [fileUploadVisible, setFileUploadVisible] = useState<boolean>(false);
  const [showImgViewer, setShowImgViewer] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility
  const { pickFromCamera, pickFromGallery } = useMedia();
  const isFocused = useIsFocused();
  const { service_uuid } = route?.params ?? {};
  const { userData } = useAuthStore();

  const { isFetching } = useGetUserServiceMessages(
    service_uuid,
    userData?.token
  );

  const {
    userServiceMessages: userServiceMessagesStore,
    setUserServiceMessages: setUserServiceMessagesStore,
  } = useUserServiceMessagesStore();
  const { SendChatMessage, response } = useSendChatMessage();
  const [message, setMessage] = useState<string>("");
  const [imgResult, setImgResult] = useState<ImagePickerResult | null>(null);

  const groupedData = useGroupedMessages(userServiceMessagesStore);

  const flatListRef = useRef<FlatList>(null);
  const prevGroupedLengthRef = useRef<number>(0);

  // Keyboard event listeners - the key to fixing the issue!
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      queryClient.invalidateQueries({
        queryKey: [appQueryKeys.GET_USER_SERVICE_MESSAGES, service_uuid],
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const currentLength = groupedData.length;
    if (currentLength > prevGroupedLengthRef.current && flatListRef.current) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timer);
    }
    prevGroupedLengthRef.current = currentLength;
  }, [groupedData]);

  useEffect(() => {
    if (imgResult?.uri) {
      setShowImgViewer(true);
    }
  }, [imgResult?.uri]);

  const renderItem = React.useCallback(
    ({ item }: { item: FlatListItem }) => {
      if (item.type === "header") {
        return <DateHeader date={item.date!} />;
      }

      const isSender = item.message?.sender_id === userData?.uuid;
      return isSender ? (
        <SenderBubble data={item.message} />
      ) : (
        <ReceiverBubble data={item.message} />
      );
    },
    [userData?.uuid]
  );

  const keyExtractor = React.useCallback((item: FlatListItem) => item.id, []);

  const handleSendMessage = () => {
    if (imgResult?.uri && message) {
      SendChatMessage({
        message: message,
        service: service_uuid,
        file: imgResult,
      });
      const newMessage = {
        attachment: response?.data?.data?.attachment,
        created_at: response?.data?.data?.created_at,
        id: Date.now(),
        message: message,
        our_service_id: response?.data?.data?.our_service_id,
        read_at: response?.data?.data?.created_at,
        receiver_id: response?.data?.data?.receiver_id,
        sender_id: userData?.uuid,
        service: {
          brand: response?.data?.data?.service?.brand,
          category: response?.data?.data?.service?.category,
          created_at: response?.data?.data?.service?.created_at,
          deleted_at: response?.data?.data?.service?.created_at,
          description: response?.data?.data?.service?.description,
          fee: response?.data?.data?.service?.fee,
          has_online_payment: response?.data?.data?.service?.has_online_payment,
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
        uuid: `temp-${Date.now()}`,
      };
      const updatedChat = [...userServiceMessagesStore, newMessage];
      setUserServiceMessagesStore(updatedChat);
      setImgResult(null);
      setShowImgViewer(false);
      setMessage("");
    } else if (message?.trim()) {
      SendChatMessage({
        message: message,
        service: service_uuid,
        file: null,
      });

      const newMessage = {
        attachment: response?.data?.data?.attachment || imgResult?.uri,
        created_at: response?.data?.data?.created_at,
        id: Date.now(),
        message: message,
        our_service_id: response?.data?.data?.our_service_id,
        read_at: response?.data?.data?.created_at,
        receiver_id: response?.data?.data?.receiver_id,
        sender_id: userData?.uuid,
        service: {
          brand: response?.data?.data?.service?.brand,
          category: response?.data?.data?.service?.category,
          created_at: response?.data?.data?.service?.created_at,
          deleted_at: response?.data?.data?.service?.created_at,
          description: response?.data?.data?.service?.description,
          fee: response?.data?.data?.service?.fee,
          has_online_payment: response?.data?.data?.service?.has_online_payment,
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
        uuid: `temp-${Date.now()}`,
      };

      const updatedChat = [...userServiceMessagesStore, newMessage];
      setUserServiceMessagesStore(updatedChat);
      setMessage("");
    }
  };

  return (
    <>
      {/* KeyboardAvoidingView only enabled when keyboard is visible */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={isKeyboardVisible} // This is the key fix!
        keyboardVerticalOffset={
          Platform.OS === "ios" ? moderateScale(0) : moderateScale(0)
        }>
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
            {isFetching && (
              <ActivityIndicator
                size='small'
                color={colors.lightGray}
                style={styles.refreshIndicator}
              />
            )}
            <FlatList
              ref={flatListRef}
              data={groupedData}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListFooterComponent={
                Platform.OS === "ios" ? null : (
                  <View style={{ paddingVertical: DVH(3) }} />
                )
              }
              contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: moderateScale(7),
                paddingBottom:
                  Platform.OS === "ios" ? moderateScale(20) : moderateScale(10), // Add some bottom padding
              }}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              initialNumToRender={15}
              windowSize={10}
              removeClippedSubviews={Platform.OS === "android"}
              updateCellsBatchingPeriod={50}
              decelerationRate='normal'
              scrollEventThrottle={16}
            />
          </View>
        </Screen>
      </KeyboardAvoidingView>

      {/* Input area positioned outside KeyboardAvoidingView for Android */}
      <View
        style={[
          styles.actionContainer,
          {
            paddingBottom:
              Platform.OS === "android"
                ? isKeyboardVisible
                  ? moderateScale(310)
                  : moderateScale(60) // Adjust for nav bar
                : moderateScale(40),
          },
        ]}>
        <View style={{ width: "80%" }}>
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
          white
          rightIcon={
            <AntDesign
              name='paperclip'
              size={moderateScale(25)}
              color={colors.black}
            />
          }
          onPress={() => setFileUploadVisible(!fileUploadVisible)}
          btnStyle={{
            paddingVertical: moderateScale(11),
            width: "9%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: moderateScale(100),
          }}
        />
        <CustomButton
          buttonType='Solid'
          white
          rightIcon={
            <Ionicons
              name='send'
              size={moderateScale(25)}
              color={colors.black}
            />
          }
          onPress={handleSendMessage}
          btnStyle={{
            paddingVertical: moderateScale(11),
            width: "9%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: moderateScale(100),
          }}
        />
      </View>

      <FileUploadModal
        visible={fileUploadVisible}
        onClose={() => setFileUploadVisible(!fileUploadVisible)}
        onClickCamera={async () => {
          const imgRes = await pickFromCamera();
          if (imgRes) {
            setFileUploadVisible(!fileUploadVisible);
            setImgResult(imgRes);
          }
        }}
        onClickGallery={async () => {
          const imgRes = await pickFromGallery();
          if (imgRes) {
            setFileUploadVisible(!fileUploadVisible);
            setImgResult(imgRes);
          }
        }}
      />
      <ImageViewer
        visible={showImgViewer}
        onClose={() => {
          setShowImgViewer(false);
          setImgResult(null);
          setMessage("");
        }}
        imgUri={imgResult?.uri ?? ""}
        onChangeMsgText={(enteredValue) => setMessage(enteredValue)}
        messageText={message}
        handleSendMessage={() => {
          if (!message) {
            setMessage("image");
            handleSendMessage();
          } else {
            handleSendMessage();
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: moderateScale(0),
    paddingVertical: moderateScale(0),
    flex: 1,
  },
  header: {
    backgroundColor: colors.red,
    paddingVertical: moderateScale(70),
    paddingHorizontal: moderateScale(5),
  },
  container: {
    flex: 1,
  },
  // Input area positioned absolutely but with proper spacing
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(5),
    backgroundColor: colors.white,
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    // Add elevation for Android and shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    height: DVH(6),
    borderColor: "#BDBDBD",
  },
  // Chat container with proper bottom margin to account for input
  chatContainer: {
    flex: 1,
    width: "100%",
    marginBottom: moderateScale(90), // Space for input area
  },
  dateHeader: {
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  dateHeaderText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: moderateScale(12),
  },
  refreshIndicator: {
    position: "absolute",
    top: moderateScale(10),
    alignSelf: "center",
    zIndex: 1,
  },
});
