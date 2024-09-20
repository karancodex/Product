import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { TamaguiProvider } from "tamagui";

import AuthProvider from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import appConfig from "@/tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Instantiate a new QueryClient
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutWrapper() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider defaultTheme={colorScheme as string} config={appConfig}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="auth/signin"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="auth/signup"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="dashboard/index"
              options={{
                headerShown: false,
              }}
            />
             <Stack.Screen
              name="product-details/[id]" 
              options={{
                headerShown: true,
                title: "Product Details",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutWrapper />
    </AuthProvider>
  );
}
