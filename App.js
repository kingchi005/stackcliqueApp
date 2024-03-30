import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerStack } from "./src/components/navigation/DrawerStack";
import { AuthStack } from "./src/components/navigation/AuthStack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import {
	UIStore,
	storeName,
	useOnboarding,
	useUIStore,
} from "./src/store/store";
import { ScreenOrientation } from "expo";
// import * as SplashScreen from "expo-splash-screen";
// to be deleted
import { useAccessToken, useUserStore } from "./src/store/userStore";
import { PaperProvider } from "react-native-paper";
import { SplashScreen } from "./src/screens";
import { getUserDetails } from "./src/services/authService";

export default function App() {
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.maxFontSizeMultiplier = 1.2;
	TextInput.defaultProps = Text.defaultProps || {};
	TextInput.defaultProps.maxFontSizeMultiplier = 1.2;
	// const [onBoarded, setOnBoarded] = useState(false);
	// const [accessToken, setAccessToken] = useState(null);
	const [isInitialising, setIsInitialising] = useState(true);

	const onBoarded = useOnboarding((st) => st.onboarded);
	const accessToken = useAccessToken((st) => st.token);
	const updateUserDetails = useUserStore((st) => st.update);
	const userId = useUserStore((st) => st.id);

	const confirmLauched = useOnboarding((st) => st.confirm);

	useEffect(() => {
		// fetchUserDetails();
	}, []);

	setTimeout(() => {
		setIsInitialising(false);
	}, 2000);

	// console.log("onBoarded:", onBoarded);
	// console.log("accessToken:", accessToken);
	const fetchUserDetails = async () => {
		if (userId) {
			const _userDetails = await getUserDetails(userId);
			if (!_userDetails.ok) {
				setIsLoading(false);
				return Alert.alert(
					"Could not fetch details",
					"check your internet connection"
				);
			}
			updateUserDetails(_userDetails.data);
		}
	};
	const handleOnboardingFinish = async () => {
		confirmLauched();
		// setOnBoarded(true);
	};

	const handleSkip = async () => {
		confirmLauched();
		// setOnBoarded(true);
	};

	if (isInitialising) return null; // <SplashScreen />;
	else
		return !onBoarded ? (
			<NavigationContainer>
				<OnboardingScreen
					onFinish={handleOnboardingFinish}
					onSkip={handleSkip}
				/>
			</NavigationContainer>
		) : (
			<PaperProvider>
				<TailwindProvider>
					<StatusBar style="auto" />
					<NavigationContainer>
						{accessToken ? <DrawerStack /> : <AuthStack />}
					</NavigationContainer>
				</TailwindProvider>
			</PaperProvider>
		);
}
