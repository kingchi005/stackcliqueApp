import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { Avatar, Button, Divider, TouchableRipple } from "react-native-paper";
import { theme } from "../../components/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../store/userStore";
import { logoutUser } from "../../services/authService";

export default function ProfileScreen() {
	const navigation = useNavigation();
	const userData = useUserStore((st) => st);

	const handleLogout = () => {
		logoutUser();
	};
	return (
		<View style={{ flex: 1, paddingHorizontal: 10 }}>
			<View
				style={{
					flexDirection: "column",
					alignItems: "center",
					marginBottom: 30,
					marginTop: 40,
				}}
			>
				{userData.profile_photo ? (
					<Avatar.Image size={150} source={{ uri: userData.profile_photo }} />
				) : (
					<Ionicons
						color={theme.colors.background}
						style={{
							color: theme.colors.grey,
							marginTop: 20,
						}}
						// style={{ backfaceVisibility: theme.colors. }}
						size={150}
						name="person-circle"
					/>
				)}

				<Button onPress={() => {}} textColor={theme.colors.primaryColor}>
					<Text> Change Profile Photo</Text>
				</Button>
			</View>
			<View style={{ marginTop: 10, flex: 1 }}>
				<Divider />
				{[
					{ title: "Personal data", route: "personal-data" },
					{ title: "COntact information", route: "contact-info" },
					{ title: "Settings", route: "settings" },
					{ title: "Help ans support", route: "help-support" },
				].map(({ title, route }, i) => (
					<Fragment key={i}>
						<TouchableRipple
							onPress={() => navigation.navigate(route)}
							style={{ paddingVertical: 12.5 }}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									paddingEnd: 20,
									paddingStart: 10,
								}}
							>
								<Text style={{ fontSize: 16, textTransform: "capitalize" }}>
									{title}
								</Text>
								<Ionicons size={20} name="chevron-forward" />
							</View>
						</TouchableRipple>
						<Divider />
					</Fragment>
				))}
			</View>

			<Button
				onPress={handleLogout}
				textColor={theme.colors.primaryColor}
				style={{ marginBottom: 30 }}
				labelStyle={{ fontSize: 20 }}
			>
				Log Out
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({});