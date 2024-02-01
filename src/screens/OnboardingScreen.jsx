import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";

// Onboarding data
const onboardingData = [
	{
		title: "Endless Possibilities",
		subtitle:
			"Connect, Learn and grow with our vibrant community around the globe",
		image: require("../../assets/board1.png"),
	},
	{
		title: "Community",
		subtitle:
			"Join like-minded individuals, share ideas, and collaborate on projects",
		image: require("../../assets/board22.png"),
	},
	{
		title: "Collaborate and Create",
		subtitle:
			"Expand Your horizons in our inclusive and enriching learning community",
		image: require("../../assets/board3.png"),
	},
];

export default function OnboardingScreen({ onFinish, onSkip }) {
	const scrollViewRef = useRef(null);
	const buttonScale = useSharedValue(1);
	const contentOffsetX = useSharedValue(0); // Shared value for content offset
	const [currentPage, setCurrentPage] = useState(0);
	const [isFontLoaded, setFontLoaded] = useState(false);
	const navigation = useNavigation();

	// Load custom font using Expo Font
	const loadCustomFont = async () => {
		await Font.loadAsync({
			// Replace 'CustomFont' with the actual name of your custom font
			"Aladin-Regular": require("../../assets/fonts/Aladin-Regular.ttf"),
			"Poppins-BlackItalic": require("../../assets/fonts/Poppins-BlackItalic.ttf"),
		});
		setFontLoaded(true);
	};

	useEffect(() => {
		loadCustomFont();
	}, []);

	const handleOnboardingFinish = async () => {
		try {
			await AsyncStorage.setItem("@app:onboarding", "true");
			onFinish();
		} catch (error) {
			// Handle AsyncStorage error
			console.error("Error writing to AsyncStorage:", error);
		}
		console.log("finished.");
	};

	const handleSkip = () => {
		onSkip(); // Call the onSkip function passed as a prop
	};

	const handleNextButton = () => {
		const nextPage = currentPage + 1;
		if (nextPage === onboardingData.length) {
			handleOnboardingFinish();
		} else {
			scrollViewRef.current.scrollTo({ x: nextPage * SCREEN_WIDTH });
			setCurrentPage(nextPage); // Update the current page index
		}
	};

	const handleScroll = (event) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		contentOffsetX.value = offsetX; // Update the shared value with the current offset
		const pageIndex = Math.round(offsetX / SCREEN_WIDTH);
		setCurrentPage(pageIndex);
	};

	const nextButtonAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: buttonScale.value }],
			opacity: currentPage < onboardingData.length - 1 ? 1 : 0, // Hide the button on the last page
		};
	});

	const handleNextButtonPressIn = () => {
		buttonScale.value = withTiming(0.9, {
			duration: 100,
			easing: Easing.inOut(Easing.ease),
		});
	};

	const handleNextButtonPressOut = () => {
		buttonScale.value = withTiming(1, {
			duration: 100,
			easing: Easing.inOut(Easing.ease),
		});
	};

	// IndicatorButton component
	const IndicatorButton = ({ active }) => {
		return (
			<View style={styles.indicatorContainer}>
				<View
					style={[
						styles.indicatorButton,
						{ backgroundColor: active ? "#7E0772" : "#1D1F22" },
					]}
				>
					{active && <View style={styles.outerCircle} />}
				</View>
			</View>
		);
	};

	const renderColoredTitle = (title) => {
		if (title === "Endless Possibilities") {
			return (
				<Text style={styles.title}>
					<Text style={styles.title}>Endless</Text>{" "}
					<Text style={styles.greenTitle}>Possibilities</Text>
				</Text>
			);
		} else if (title === "Collaborate and Create") {
			return (
				<Text style={styles.title}>
					<Text style={styles.title}>Collaborate and</Text>{" "}
					<Text style={styles.greenTitle}>Create</Text>
				</Text>
			);
		}

		return <Text style={styles.title}>{title}</Text>;
	};
	const SCREEN_WIDTH = Dimensions.get("window").width;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#EFEFEF",
		},
		skipButton: {
			position: "absolute",
			top: 50,
			right: 20,
			zIndex: 1,
		},
		skipButtonText: {
			fontSize: 15,
			fontWeight: "bold",
			color: "#242424",
		},
		pageContainer: {
			width: SCREEN_WIDTH,
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		image: {
			width: "85%",
			height: "50%",
			resizeMode: "contain",
		},
		title: {
			fontSize: 25,
			fontWeight: "700",
			marginTop: 40,
			textAlign: "center",
			letterSpacing: 0.3,
			fontFamily: isFontLoaded ? "Poppins-BlackItalic" : "System", // Use the custom font
		},
		subtitle: {
			fontSize: 18,
			textAlign: "center",
			marginHorizontal: 20,
			marginTop: 30,
			fontWeight: "500",
			color: "#242424",
			letterSpacing: 1,
		},
		footer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 300,
		},
		button: {
			backgroundColor: "#7E0772",
			paddingVertical: 15,
			paddingHorizontal: 100,
			borderRadius: 50,
			bottom: 90,
		},
		buttonText: {
			color: "white",
			fontSize: 16,
			fontWeight: "bold",
		},
		box: {
			backgroundColor: "white",
			width: "85%",
			height: "45%",
			borderRadius: 15,
			position: "absolute",
			bottom: 50,
		},
		indicatorContainer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			marginBottom: 20,
		},
		indicatorButton: {
			width: 5,
			height: 5,
			borderRadius: 4,
			marginHorizontal: 5,
		},
		outerCircle: {
			position: "absolute",
			width: 10,
			height: 10,
			borderRadius: 50,
			borderColor: "#7E0772",
			borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
			left: -2.5,
			bottom: -2.5,
		},
		greenTitle: {
			color: "#13B351",
		},
	});

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			{/* Skip button */}
			{currentPage < onboardingData.length - 1 && ( // Conditional rendering for the "Skip" button
				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.skipButton}
					onPress={handleSkip}
				>
					<Text style={styles.skipButtonText}>Skip</Text>
				</TouchableOpacity>
			)}

			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={handleScroll}
				scrollEventThrottle={16}
			>
				{/* Onboarding Pages */}
				{onboardingData.map((item, index) => (
					<View key={index} style={styles.pageContainer}>
						<Image source={item.image} style={styles.image} />
						<View style={styles.box}>
							{/* Use the renderColoredTitle function */}
							{renderColoredTitle(item.title)}
							<Text style={styles.subtitle}>{item.subtitle}</Text>
						</View>
						{/* Next/Get Started button */}
						<View style={styles.footer}>
							{currentPage < onboardingData.length - 1 &&
								index === currentPage && (
									<Animated.View
										style={[styles.buttonContainer, nextButtonAnimatedStyle]}
									>
										<TouchableOpacity
											style={styles.button}
											onPress={handleNextButton}
											onPressIn={handleNextButtonPressIn}
											onPressOut={handleNextButtonPressOut}
											activeOpacity={0.8}
										>
											<Text style={styles.buttonText}>Next</Text>
										</TouchableOpacity>
									</Animated.View>
								)}

							{currentPage === onboardingData.length - 1 &&
								index === currentPage && (
									<View style={styles.buttonContainer}>
										<TouchableOpacity
											style={styles.button}
											onPress={handleOnboardingFinish}
											onPressIn={handleNextButtonPressIn}
											onPressOut={handleNextButtonPressOut}
											activeOpacity={0.8}
										>
											<Text style={styles.buttonText}>Get Startd</Text>
										</TouchableOpacity>
									</View>
								)}
						</View>
					</View>
				))}
			</ScrollView>

			{/* Indicator Buttons */}
			<View style={styles.indicatorContainer}>
				{Array.from({ length: onboardingData.length }, (_, index) => (
					<IndicatorButton key={index} active={index === currentPage} />
				))}
			</View>
		</View>
	);
}
