import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	Platform,
	Text,
	TextInput,
	ToastAndroid,
	View,
	useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import { DrawerStack } from "@/src/components/navigation/DrawerStack";
import { AuthStack } from "@/src/components/navigation/AuthStack";
import OnboardingScreen from "@/src/screens/OnboardingScreen";
import { useOnboarding } from "@/src/store/store";
import { useAccessToken } from "@/src/store/userStore";
import { ActivityIndicator, PaperProvider, useTheme } from "react-native-paper";
import { theme as myTheme } from "@/src/components/theme/theme";
import { SplashScreen } from "@/src/screens";
import Constants from "expo-constants";
import { Splash } from "@/src/screens/SplashScreen";
import * as Updates from "expo-updates";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	const onBoarded = useOnboarding((st) => st.onboarded);
	const accessToken = useAccessToken((st) => st.token);
	const theme = useTheme();

	const confirmLauched = useOnboarding((st) => st.confirm);
	useEffect(() => {
		// onFetchUpdateAsync();
	}, []);

	setTimeout(() => {
		setAppIsReady(true);
	}, 2000);

	const handleOnboardingFinish = async () => {
		confirmLauched();
	};

	const handleSkip = async () => {
		confirmLauched();
	};

	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync();

			if (update.isAvailable) {
				if (Platform.OS == "android")
					ToastAndroid.show("Updating application ...", ToastAndroid.SHORT);
				else Alert.alert("Updating application ...");
				await Updates.fetchUpdateAsync();
				await Updates.reloadAsync();
			}
		} catch (error) {
			Alert.alert("Error fetching latest Expo update", error + "");
		}
	}

	if (!appIsReady) return null;

	if (!onBoarded)
		return (
			<NavigationContainer>
				<OnboardingScreen
					onFinish={handleOnboardingFinish}
					onSkip={handleSkip}
				/>
			</NavigationContainer>
		);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PaperProvider theme={theme}>
				<TailwindProvider>
					<NavigationContainer>
						{accessToken ? <DrawerStack /> : <AuthStack />}
						<StatusBar style="auto" />
					</NavigationContainer>
				</TailwindProvider>
			</PaperProvider>
		</GestureHandlerRootView>
	);
}
