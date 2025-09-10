import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthStack } from "./auth-stack";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { AppStack } from "./app-stack";

interface IRouterProps {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
}

export const Router = ({ isAuthenticated, isLoggingIn }: IRouterProps) => {
  return (
    <>
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}>
          {!isLoggingIn && isAuthenticated ? (
            <AppStack />
          ) : isLoggingIn && !isAuthenticated ? (
            <AuthStack isLoggingIn={isLoggingIn} />
          ) : (
            <AuthStack isLoggingIn={isLoggingIn} />
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
