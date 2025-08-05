import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { AllTab, ButtonLine, UnreadTab } from "@src/components/app/messages";
import { useGetAllUserChats } from "@src/api/hooks/queries/app";
import { useAuthStore } from "@src/api/store/auth";
import { queryClient } from "@src/helper/utils";
import { appQueryKeys } from "@src/api/hooks/queries/query-key";

const msgHeaderNav = ["All", "Unread"];

export const Messages = ({
  navigation,
}: RootStackScreenProps<appScreenNames.MESSAGES>) => {
  const { userData } = useAuthStore();
  const [selectedItem, setSelectedItem] = useState<string>(msgHeaderNav[0]);
  const { allUserChats, isFetching } = useGetAllUserChats(
    userData?.uuid,
    userData?.token
  );

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [
        appQueryKeys.GET_ALL_USER_CHATS,
        userData?.uuid,
        userData?.token,
      ],
    });
  }, []);

  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer}>
        <Header
          title={"Messages"}
          headerStyle={styles.header}
          color={colors.white}
          showSearchIcon
          showBellIcon
          onPressBellIcon={() =>
            navigation.navigate(appScreenNames.NOTIFICATION)
          }
        />
        <ButtonLine
          data={msgHeaderNav}
          onSelectButton={(selectedBtnItem) => setSelectedItem(selectedBtnItem)}
          selectedBtnItem={selectedItem}
        />
        {selectedItem === "All" && (
          <AllTab data={allUserChats && allUserChats} />
        )}
        {selectedItem === "Unread" && <UnreadTab />}
        {/* {selectedItem === "Spam" && <SpamTab />} Spam */}
      </Screen>
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
  },
});
