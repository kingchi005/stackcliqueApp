import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import { Appbar, TouchableRipple } from "react-native-paper";

export default function CustomHeader({ children }) {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			{/* <TouchableRipple
				activeOpacity={theme.touchOpacity.veryLight}
				style={{ position: "absolute", left: 0, }}
				onPress={() => navigation.goBack()}
			> */}
			<Ionicons
				style={{ position: "absolute", left: 0 }}
				onPress={() => navigation.goBack()}
				name="chevron-back-outline"
				size={24}
				color={theme.colors.grey}
			/>
			{/* </TouchableRipple> */}

			<Text style={styles.headerText}>{children}</Text>
		</SafeAreaView>
	);
}

/**@param {import("@react-navigation/native-stack").NativeStackHeaderProps} param0  */
export function CourseHeader({ route, navigation }) {
	return (
		<Appbar.Header>
			<TouchableRipple
				onPress={() => navigation.goBack()}
				style={{
					padding: 3,
					borderRadius: 20,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Ionicons
					style={{ position: "absolute", left: 5 }}
					name="chevron-back-outline"
					size={24}
					color={theme.colors.grey}
				/>
			</TouchableRipple>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.headerText}>
					{(() => {
						const _ = route.params?.title?.split(" ");
						return _.length > 4 ? _.slice(0, 3).join(" ") + "..." : _.join(" ");
					})()}
				</Text>
			</View>
		</Appbar.Header>
	);
}
const styles = StyleSheet.create({
	container: {
		position: "relative",
		flexDirection: "row",
		minWidth: "100%",

		alignItems: "center",
		justifyContent: "center",

		padding: 8,
	},
	headerText: {
		textTransform: "uppercase",
		fontWeight: 700,
		marginStart: -10,
		color: theme.colors.primaryColor,
	},
});
