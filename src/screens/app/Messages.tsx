import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import {
  AllTab,
  ButtonLine,
  SpamTab,
  UnreadTab,
} from "@src/components/app/messages";
import { products } from "@src/constants/products";

const msgHeaderNav = ["All", "Unread", "Spam"];

export const Messages = ({
  navigation,
}: RootStackScreenProps<appScreenNames.MESSAGES>) => {
  const [selectedItem, setSelectedItem] = useState<string>(msgHeaderNav[0]);
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
        {selectedItem === "All" && <AllTab data={products} />}
        {selectedItem === "Unread" && <UnreadTab />}
        {selectedItem === "Spam" && <SpamTab />}
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
