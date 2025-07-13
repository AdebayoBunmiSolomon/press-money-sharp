import { CustomText } from "@src/components/shared";
import React from "react";
import { StyleSheet, View } from "react-native";

export const SpamTab: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <CustomText
        type='regular'
        size={16}
        lightBlack
        style={{
          textAlign: "center",
        }}>
        If you mark messages as spam, they {"\n"}will show here
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
