import { DatePickerIOSBase, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../components/theme/theme";
import { Button, DataTable, TextInput } from "react-native-paper";
import { useUserStore } from "../../store/userStore";

export default function ContactInfoScreen() {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		setEmail(useUserStore.getState().email || "");
		setPhone(useUserStore.getState().phone_number || "");
	}, []);

	return (
		<View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
			<View style={{ flex: 1 }}>
				<Text>Email</Text>
				<TextInput
					keyboardType="email-address"
					style={{ marginBottom: 20 }}
					outlineStyle={{
						borderRadius: 10,
						borderColor: theme.colors.black + "22",
						borderWidth: 1,
					}}
					mode="outlined"
					disabled
					value={email}
					onChangeText={setEmail}
				/>
				<Text>Phone</Text>
				<TextInput
					keyboardType="phone-pad"
					style={{ marginBottom: 20 }}
					outlineStyle={{
						borderRadius: 10,
						borderColor: theme.colors.black + "22",
						borderWidth: 1,
					}}
					mode="outlined"
					// value={}
					// onChangeText={setDescription}
				/>
			</View>

			<Button
				textColor="#fefefe"
				style={{
					backgroundColor: theme.colors.primaryColor,
					marginBottom: 20,
					alignSelf: "center",
					paddingHorizontal: 100,
					paddingVertical: 3,
				}}
			>
				Save
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
