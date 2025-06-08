import { useFontLoading } from "@src/hooks/services";
import { Router } from "@src/router/router";
import { AppLoader } from "@src/screens/App-Loader";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@src/hooks/zustand";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "@src/helper/utils";
import { Platform, StyleSheet, View } from "react-native";
import { verticalScale } from "@src/resources/responsiveness";
import FlashMessage from "react-native-flash-message";

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
  const { isAuthenticated } = useAuthStore();
  const { isFontLoadingComplete, loadResourcesAndDataAsync } = useFontLoading();
  //load font family resources
  useEffect(() => {
    const timer = setTimeout(() => {
      loadResourcesAndDataAsync();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <PersistQueryClientProvider
        persistOptions={{ persister }}
        onSuccess={() =>
          queryClient
            .resumePausedMutations()
            .then(() => queryClient.invalidateQueries())
        }
        client={queryClient}>
        <SafeAreaProvider>
          <View style={styles.flashMsgContainer}>
            <FlashMessage
              position='top'
              style={{
                paddingTop:
                  Platform.OS === "ios" ? verticalScale(10) : verticalScale(40),
                zIndex: 300,
              }}
            />
          </View>
          {!isFontLoadingComplete ? (
            <AppLoader />
          ) : (
            <Router isAuthenticated={isAuthenticated} />
          )}
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flashMsgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    width: "100%",
  },
});
