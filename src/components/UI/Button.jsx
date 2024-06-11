import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from "react-native";
import { theme } from "../theme/theme";

export default function Button({ bgColor, children, onPress }) {
	return (
		<TouchableOpacity activeOpacity={theme.touchOpacity.bold} onPress={onPress}>
			<View
				style={[
					styles.ButtonContainer,
					{ backgroundColor: bgColor || theme.colors.primaryColor },
				]}
			>
				<Text style={[styles.buttonText, {}]}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	ButtonContainer: {
		height: 46,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 23,
		color: "#fff",
	},
	buttonText: {
		color: "white",
		fontSize: 15,
		fontWeight: "600",
	},
});
