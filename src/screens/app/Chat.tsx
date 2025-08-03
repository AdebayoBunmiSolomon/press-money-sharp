import React, { useState } from "react";
import { Screen } from "../Screen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { colors } from "@src/resources/color/color";
import { RootStackScreenProps } from "@src/router/types";
import { appScreenNames } from "@src/navigation";
import { Header } from "@src/components/app/home";
import { CustomButton, CustomInput } from "@src/components/shared";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export const Chat = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CHAT>) => {
  const [chat, setChat] = useState<string>("");
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
            paddingVertical: moderateScale(12),
            width: "14%",
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
    gap: moderateScale(10),
    position: "absolute",
    bottom: moderateScale(0),
    paddingBottom: moderateScale(30),
    backgroundColor: colors.white,
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    width: "100%",
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    height: DVH(6),
    borderColor: "#BDBDBD",
  },
});
