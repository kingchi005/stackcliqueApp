import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import { DrawerStack } from "./src/components/navigation/DrawerStack";
import { AuthStack } from "./src/components/navigation/AuthStack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import { useOnboarding } from "./src/store/store";
import { useAccessToken } from "./src/store/userStore";
import { PaperProvider } from "react-native-paper";

export default function App() {
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.maxFontSizeMultiplier = 1.2;
	TextInput.defaultProps = Text.defaultProps || {};
	TextInput.defaultProps.maxFontSizeMultiplier = 1.2;
	const [isInitialising, setIsInitialising] = useState(true);

	const onBoarded = useOnboarding((st) => st.onboarded);
	const accessToken = useAccessToken((st) => st.token);

	const confirmLauched = useOnboarding((st) => st.confirm);

	setTimeout(() => {
		setIsInitialising(false);
	}, 2000);

	const handleOnboardingFinish = async () => {
		confirmLauched();
	};

	const handleSkip = async () => {
		confirmLauched();
	};

	if (isInitialising) return null;

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
