import { useFontLoading } from "@src/hooks/services";
import { Router } from "@src/router/router";
import { AppLoader } from "@src/screens/App-Loader";
import { useEffect, useRef, useState } from "react";
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
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { loadResourcesAndDataAsync } = useFontLoading();
  const modalRef = useRef<IGlobalModalMessageRef | null>(null);
  const { Login, isPending } = useLogin();
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  // Expose modalRef globally
  ModalMessageProvider.setRef(modalRef);

  // load font family resources
  useEffect(() => {
    const timer = setTimeout(() => {
      loadResourcesAndDataAsync();
      setFontLoaded(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // check if there is a login credentials
  useEffect(() => {
    const checkCredentials = async () => {
      if (fontLoaded) {
        const { email, password } = await AuthStorage.getUserCredentials();
        if (email && password) {
          Login({ email, password });
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkCredentials();
  }, [fontLoaded]);

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
      {!fontLoaded ? (
        <AppLoader />
      ) : fontLoaded && isPending ? (
        <AppLoader />
      ) : fontLoaded && !isPending ? (
        <Router isAuthenticated={isAuthenticated} />
      ) : (
        <AppLoader />
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
