import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { faker, it } from "@faker-js/faker";
import { createFakeNotifications } from "../../services/userService";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../components/theme/theme";
import { Button, Dialog, IconButton } from "react-native-paper";
import { format } from "date-fns";
import { getNotifications } from "./../../services/userService";

export default function NotificationScreen() {
	/**@type {[TNotification[],React.Dispatch<React.SetStateAction<TNotification[]>>]} */
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		fetchNotifications();
	}, []);

	async function fetchNotifications() {
		const res = await getNotifications();
		// console.log(res);
		if (!res.ok) {
			Alert.alert("Error", res.error.message, [], { cancelable: true });
			return;
		}
		setNotifications(res.data);

		return;
		const notifi = createFakeNotifications(0);
		setNotifications(notifi);
	}

	const [showDialog, setShowDialog] = useState(false);
	const [dialogTitle, setDialogTitle] = useState("");
	const [dialogMessage, setDialogMessage] = useState("");

	const openDialog = () => setShowDialog(true);
	const closeDialog = () => setShowDialog(false);

	/**@param {Pick<TNotification,"message"|"title">} */
	const showNotification = ({ message, title }) => {
		setDialogTitle(title);
		setDialogMessage(message);
		openDialog();
	};

	if (!notifications.length)
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18, color: theme.colors.grey }}>
					No notifications
				</Text>
			</View>
		);

	return (
		<>
			<View style={{ flex: 1 }}>
				<FlatList
					data={notifications}
					renderItem={({ item, index }) => (
						<NotificationCard
							key={index}
							unread={index == 0 || index == 1 || index == 2 || index == 4}
							{...item}
							showNotification={showNotification}
						/>
					)}
				/>
			</View>
			<Dialog
				style={{
					alignItems: "center",
					paddingHorizontal: "5%",
					position: "relative",
				}}
				visible={showDialog}
				dismissable
				onDismiss={closeDialog}
			>
				<Dialog.Icon
					icon={() => (
						<Ionicons name="notifications" color={"#bebbbb"} size={70} />
					)}
				/>

				<Dialog.Title style={{ textAlign: "center" }}>
					<Text>{dialogTitle}</Text>
				</Dialog.Title>
				<Dialog.Content>
					<Text
						style={{
							textAlign: "center",
							color: theme.colors.grey,
							lineHeight: 18,
						}}
					>
						{dialogMessage}
					</Text>
				</Dialog.Content>
				<Dialog.Actions style={{ marginTop: "4%" }}>
					<View style={{ width: "100%", alignItems: "center" }}>
						<Button
							onPress={closeDialog}
							textColor={theme.colors.background}
							style={{
								width: "90%",
								backgroundColor: theme.colors.primaryColor,
								paddingVertical: "1.5%",
							}}
						>
							Ok
						</Button>
						<Button
							mode="text"
							onPress={closeDialog}
							textColor={theme.colors.primaryColor}
							style={{
								width: "90%",
								paddingVertical: "1.5%",
							}}
						>
							CLOSE
						</Button>
					</View>
				</Dialog.Actions>
			</Dialog>
		</>
	);
}

/**
 *
 * @param {TNotification &{showNotification({}:Pick<TNotification,"message"|"title">):void,unread:boolean}} param0
 */
function NotificationCard({
	title,
	created_at,
	message,
	showNotification,
	unread,
}) {
	return (
		<>
			<TouchableOpacity
				onPress={() => showNotification({ message, title })}
				activeOpacity={0.7}
				style={[
					styles.card,
					{ backgroundColor: unread ? "#fff7fc88" : theme.colors.white },
				]}
			>
				<Ionicons
					name={`mail${unread ? "-unread" : ""}`}
					size={25}
					color={theme.colors.primaryColor + "aa"}
					style={{ paddingRight: "5%", paddingLeft: "3%" }}
				/>
				<View>
					<Text style={styles.titleText}>{title}</Text>
					<Text style={styles.dateText}>
						{format(created_at, "yyyy-MM-dd hh:mm aaa")}
					</Text>
				</View>
				<View style={{ flex: 1 }}></View>
				<Ionicons name="chevron-forward" size={16} style={styles.iconBtn} />
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: "1.5%",
		shadowRadius: 5,
		marginBottom: "1%",
		borderBottomWidth: 1.7,
		borderBottomColor: "#00000026",
		paddingVertical: "2%",
		marginHorizontal: "3%",
	},
	iconBtn: {
		color: theme.colors.primaryColor + "aa",
		backgroundColor: theme.colors.white,
		borderRadius: 30,
		paddingVertical: "1%",
		paddingHorizontal: "1.2%",
		marginEnd: "4%",
	},
	titleText: { fontSize: 16, marginBottom: "2%" },
	dateText: { fontSize: 12, color: theme.colors.grey },
});
