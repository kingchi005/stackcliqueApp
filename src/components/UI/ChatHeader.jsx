import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import { theme } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar, Avatar, TouchableRipple } from "react-native-paper";

export default function ChatHeader({ back, options, route, navigation }) {
	const _navigation = useNavigation();
	const { top } = useSafeAreaInsets();
	const { channel_avatar, channel_id } = route.params;
	return (
		<Appbar.Header>
			{/* <Appbar.Action
				onPress={() => navigation.goBack()}
				icon={() => (
					<Ionicons
						name="chevron-back-outline"
						size={24}
						color={theme.colors.grey}
					/>
				)}
			/> */}
			<TouchableRipple
				onPress={() => navigation.goBack()}
				style={{ padding: 3, borderRadius: 20 }}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "flex-start",
						marginEnd: 10,
					}}
				>
					<Ionicons
						name="chevron-back-outline"
						size={24}
						color={theme.colors.grey}
					/>
					{channel_avatar ? (
						<Avatar.Image source={{ uri: channel_avatar }} size={25} />
					) : (
						<Avatar.Image
							source={require("../../../assets/avatar-img.jpg")}
							size={25}
						/>
					)}
				</View>
			</TouchableRipple>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					flex: 1,
					marginEnd: 20,
				}}
			>
				<TouchableRipple
					onPress={() =>
						_navigation.navigate("channel-profile", { channel_id })
					}
				>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							marginStart: 10,
						}}
					>
						<Text
							style={{
								fontSize: 13,
								textTransform: "uppercase",
								color: theme.colors.primaryColor,
								fontWeight: "900",
							}}
						>
							{route.params.title.slice(0, 15)}...
						</Text>
						<Text style={{ fontSize: 8 }}>Tap here for details</Text>
					</View>
				</TouchableRipple>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						alignItems: "center",
						gap: 15,
					}}
				>
					<Ionicons
						style={styles.icon}
						name="videocam-outline"
						size={15}
						color={theme.colors.grey}
					/>

					<Ionicons
						style={styles.icon}
						name="call-outline"
						size={15}
						color={theme.colors.grey}
					/>

					<Ionicons
						style={styles.icon}
						name="ellipsis-vertical"
						size={15}
						color={theme.colors.grey}
					/>
				</View>
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
		justifyContent: "space-between",

		padding: 8,
	},
	headerText: {
		textTransform: "uppercase",
		fontWeight: "700",
		marginStart: -10,
	},
	icon: {
		backgroundColor: theme.colors.primaryColor,
		color: "#ccc",
		paddingVertical: 3,
		paddingHorizontal: 5,
		borderRadius: 10,
		alignSelf: "center",
	},
});
