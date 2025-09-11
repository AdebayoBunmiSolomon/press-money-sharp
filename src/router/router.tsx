import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthStack } from "./auth-stack";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { AppStack } from "./app-stack";

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
          {isAuthenticated ? <AppStack /> : <AuthStack />}
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
