import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import DrawerStack from "./src/components/navigation/DrawerStack";
import { AuthStack } from "./src/components/navigation/AuthStack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import { useOnboarding } from "./src/store/store";
import { useAccessToken } from "./src/store/userStore";
import { ActivityIndicator, PaperProvider, useTheme } from "react-native-paper";
import { theme as myTheme } from "./src/components/theme/theme"
import { SplashScreen } from "./src/screens";
import ExpoConstants from "expo-constants"
import { Splash } from "./src/screens/SplashScreen";
import * as Updates from "expo-updates"

export default function App() {
  // Text.defaultProps = Text.defaultProps || {};
  // Text.defaultProps.maxFontSizeMultiplier = 1.2;
  // TextInput.defaultProps = Text.defaultProps || {};
  // TextInput.defaultProps.maxFontSizeMultiplier = 1.2;

  const [appIsReady, setAppIsReady] = useState(false);

  const onBoarded = useOnboarding((st) => st.onboarded);
  const accessToken = useAccessToken((st) => st.token);
  const theme = useTheme();


  const confirmLauched = useOnboarding((st) => st.confirm);
  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  setTimeout(() => {
    setAppIsReady(true);
  }, 2000);

  const handleOnboardingFinish = async () => {
    confirmLauched();
  };

  const handleSkip = async () => {
    confirmLauched();
  };

  if (!appIsReady) return <>
    <View style={{ backgroundColor: myTheme.colors.primaryColor, flex: 1 }} />
    <StatusBar style="auto" />
  </>;

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      Alert.alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  if (!onBoarded)
    return (
      <NavigationContainer >
        <OnboardingScreen
          onFinish={handleOnboardingFinish}
          onSkip={handleSkip}
        />
      </NavigationContainer>
    );
  return (
    <PaperProvider theme={theme}>
      <TailwindProvider>
        <NavigationContainer>
          {accessToken ? <DrawerStack /> : <AuthStack />}
          <StatusBar style="auto" />
        </NavigationContainer>
      </TailwindProvider>
    </PaperProvider>
  );
}
