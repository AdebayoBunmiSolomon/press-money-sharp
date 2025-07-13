import { CustomText } from "@src/components/shared";
import React from "react";
import { StyleSheet, View } from "react-native";

export const UnreadTab: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <CustomText type='regular' size={16} lightBlack>
        Unread Messages
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
