import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerStack } from "./src/components/navigation/DrawerStack";
import { AuthStack } from "./src/components/navigation/AuthStack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import { UIStore, useLauched, useUIStore } from "./src/store/store";
import { ScreenOrientation } from "expo";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function App() {
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.maxFontSizeMultiplier = 1.2;
	TextInput.defaultProps = Text.defaultProps || {};
	TextInput.defaultProps.maxFontSizeMultiplier = 1.2;
	const [isFirstLaunch, setFirstLaunch] = useState(null); // Initialize isFirstLaunch to null
	const _isAuthenticated = UIStore.useState((state) => state.isAuthenticated);

	const hasAlreadyLauched = useLauched((st) => st.alreadyLaunched);
	const confirmLauched = useLauched((st) => st.confirm);
	const isAuthenticated = useUIStore((st) => st.isAuthenticated);

	// useEffect(() => {
	// }, []);

	setTimeout(() => {
		SplashScreen.hideAsync();
	}, 1000);

	// const checkIfFirstLaunch = async () => {
	// 	try {
	// if (hasAlreadyLauched) {
	// 	// If it's the first launch, set alreadyLaunched to true
	// 	// confirmLauched();
	// 	setFirstLaunch(3000); // Set isFirstLaunch to 3 for showing the OnboardingScreen three times
	// } else {
	// 	// If not the first launch, check the login count
	// 	const loginCount = await AsyncStorage.getItem("loginCount");
	// 	if (loginCount === null) {
	// 		// If loginCount is null (first login), set it to 1
	// 		await AsyncStorage.setItem("loginCount", "1");
	// 	} else {
	// 		// Increment the login count and check if it's greater than 3
	// 		const count = parseInt(loginCount, 10) + 1;
	// 		await AsyncStorage.setItem("loginCount", count.toString());
	// 		if (count > 3000) {
	// 			// If login count is greater than 3, mark onboarding as finished
	// 			setFirstLaunch(false);
	// 			// Lock the screen orientation to portrait mode
	// 			await ScreenOrientation.lockAsync(
	// 				ScreenOrientation.OrientationLock.PORTRAIT
	// 			);
	// 			return;
	// 		}
	// 	}
	// 	setFirstLaunch(true);
	// }
	// 	} catch (error) {
	// 		console.error("Error reading from AsyncStorage:", error);
	// 	}
	// };

	const handleOnboardingFinish = async () => {
		// Called when onboarding is finished, decrement the isFirstLaunch count
		confirmLauched();

		// If the count is now 0, mark onboarding as finished and lock the screen orientation
		if (isFirstLaunch === 1) {
			setFirstLaunch(false);
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT
			);
		}
	};

	const handleSkip = async () => {
		setFirstLaunch(false); // Mark onboarding as finished
		// Unlock the screen orientation to allow rotation
		await ScreenOrientation.unlockAsync();
	};

	// if (isFirstLaunch === null) {
	// 	// Return a loading screen or any other component while checking the isFirstLaunch state
	// 	// You can return a loader, splash screen, etc. here
	// 	return null;
	// } else

	if (hasAlreadyLauched) {
		return (
			<TailwindProvider>
				<StatusBar style="auto" />
				<NavigationContainer>
					{isAuthenticated ? <DrawerStack /> : <AuthStack />}
				</NavigationContainer>
			</TailwindProvider>
		);
	}
	return (
		<NavigationContainer>
			<OnboardingScreen onFinish={handleOnboardingFinish} onSkip={handleSkip} />
		</NavigationContainer>
	);
}
