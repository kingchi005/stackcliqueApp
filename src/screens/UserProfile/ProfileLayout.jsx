import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function ProfileLayout({ children }) {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
		>
			<ScrollView>{children}</ScrollView>
		</KeyboardAvoidingView>
	);
}
