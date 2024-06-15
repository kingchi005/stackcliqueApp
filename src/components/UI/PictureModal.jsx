import { View, Text, Dimensions, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { theme } from "../theme/theme";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SharedTransition } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
function clamp(val, min, max) {
	return Math.min(Math.max(val, min), max);
}

export default function PictureModal() {
	const { top, bottom } = useSafeAreaInsets();

	const { imageUrl } = useRoute().params;
	const navigation = useNavigation();

	const translationX = useSharedValue(0);
	const translationY = useSharedValue(0);
	const prevTranslationX = useSharedValue(0);
	const prevTranslationY = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{ translateX: translationX.value },
			{ translateY: translationY.value },
		],
	}));

	const pan = Gesture.Pan()
		.minDistance(1)
		.onStart(() => {
			prevTranslationX.value = translationX.value;
			prevTranslationY.value = translationY.value;
		})
		.onUpdate((event) => {
			const maxTranslateX = width / 2 - 50;
			const maxTranslateY = height / 2 - 50;

			translationX.value = clamp(
				prevTranslationX.value + event.translationX,
				-maxTranslateX,
				maxTranslateX
			);
			translationY.value = clamp(
				prevTranslationY.value + event.translationY,
				-maxTranslateY,
				maxTranslateY
			);
		})
		.onEnd(() => {
			if (
				Math.abs(translationY.value) >= height / 4 ||
				Math.abs(translationX.value) >= width / 3
			) {
				return navigation.goBack();
			}

			translationX.value = clamp(0, 0, 0);
			translationY.value = clamp(0, 0, 0);
		})
		.runOnJS(true);

	return (
		<BlurView
			intensity={100}
			style={{
				paddingTop: top,
				paddingBottom: bottom,
				flex: 1,
				justifyContent: "center",
			}}
			tint="dark"
		>
			<GestureDetector gesture={pan}>
				<Animated.Image
					style={animatedStyles}
					source={{ uri: imageUrl }}
					// sharedTransitionTag="tag"
					width={"100%"}
					height={"100%"}
					resizeMethod={"auto"}
					resizeMode={"contain"}
				/>
			</GestureDetector>
		</BlurView>
	);
}

/* 
<View>
			
		</View>
		 */
