import { useFontLoading } from "@src/hooks/services";
import { Router } from "@src/router/router";
import { AppLoader } from "@src/screens/App-Loader";
import { useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { AuthStorage, queryClient } from "@src/helper/utils";
import { Platform, StyleSheet, View } from "react-native";
import { verticalScale } from "@src/resources/responsiveness";
import FlashMessage from "react-native-flash-message";
import { IGlobalModalMessageRef, ModalMessage } from "@src/common";
import { ModalMessageProvider } from "@src/helper/ui-utils";
import { useAuthStore } from "@src/api/store/auth";
import { useLogin } from "@src/api/hooks/mutation/auth";

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() =>
        queryClient
          .resumePausedMutations()
          .then(() => queryClient.invalidateQueries())
      }>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <MainApp />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}

// main app content
function MainApp() {
  const { isAuthenticated } = useAuthStore();
  const { isFontLoadingComplete, loadResourcesAndDataAsync } = useFontLoading();
  const modalRef = useRef<IGlobalModalMessageRef | null>(null);
  const { Login, isPending } = useLogin(); // ✅ now inside provider

  // Expose modalRef globally
  ModalMessageProvider.setRef(modalRef);

  // load font family resources
  useEffect(() => {
    const timer = setTimeout(() => {
      loadResourcesAndDataAsync();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // check if there is a login credentials
  useEffect(() => {
    const checkCredentials = async () => {
      if (isFontLoadingComplete) {
        const { email, password } = await AuthStorage.getUserCredentials();
        if (email && password) {
          Login({ email, password });
        }
      }
    };

    checkCredentials();
  }, [isFontLoadingComplete]);

  return (
    <>
      <ModalMessage ref={modalRef} />
      <View style={styles.flashMsgContainer}>
        <FlashMessage
          position='top'
          style={{
            paddingTop:
              Platform.OS === "ios" ? verticalScale(10) : verticalScale(40),
            zIndex: 500,
          }}
        />
      </View>
      {!isFontLoadingComplete ? (
        <AppLoader />
      ) : (
        <Router isAuthenticated={isAuthenticated} isLoggingIn={isPending} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flashMsgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 500,
    width: "100%",
  },
});
