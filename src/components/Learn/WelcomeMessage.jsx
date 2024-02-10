import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "react-native-vector-icons";
import { theme } from "../theme/theme";
import { useUserStore } from "../../store/userStore";

export default function WelcomeMessage() {
	const navigation = useNavigation();
	const username = useUserStore((st) => st.username);

	return (
		<View style={styles.MessageContainer}>
			<View style={{ gap: 4 }}>
				<Text style={styles.nameText}>Hi {username}</Text>
				<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
					Learn and grow for free, you only pay with your time.
				</Text>
			</View>
			<TouchableOpacity
				style={styles.searchIcon}
				onPress={() => navigation.navigate("Search")}
			>
				<MaterialIcons name="search" size={24} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	MessageContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: theme.colors.white,
		marginTop: 15,
		padding: 8,
		borderRadius: 4,
	},
	nameText: {
		color: theme.colors.primaryColor,
		fontWeight: 700,
		fontSize: 16,
	},
	searchIcon: {
		marginLeft: "auto",
		backgroundColor: theme.colors.background,
		padding: 4,
		borderRadius: 4,
	},
});
