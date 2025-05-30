import { NavigationContainer } from "@react-navigation/native";
import React from "react";
// import { AppStack } from "./app-stack";
import { AuthStack } from "./auth-stack";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";

interface IRouterProps {
  isAuthenticated: boolean;
}

export const Router = ({ isAuthenticated }: IRouterProps) => {
  return (
    <>
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}>
          {isAuthenticated ? (
            <View>
              <Text>App Stack</Text>
            </View>
          ) : (
            <AuthStack />
          )}
        </KeyboardAvoidingView>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
