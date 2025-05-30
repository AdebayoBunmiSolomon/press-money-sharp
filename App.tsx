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
import { useAuthStore } from "@src/hooks/zustand";

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
      <SafeAreaProvider>
        {!isFontLoadingComplete ? (
          <AppLoader />
        ) : (
          <Router isAuthenticated={isAuthenticated} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
