import {
	Alert,
	DatePickerIOSBase,
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../components/theme/theme";
import { Button, DataTable, TextInput } from "react-native-paper";
import { useUserStore } from "../../store/userStore";
import { updateUserDetails } from "../../services/connectSerivce";
import ProfileLayout from "./ProfileLayout";

export default function PersonalDataScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const [fisrtName, setFisrtName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		const {} = useUserStore.getState();
		setAddress("");
		setDateOfBirth("");
		setLastName("");
		setFisrtName("");
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		const data = {
			fisrtName,
			lastName,
			dateOfBirth,
			address,
		};

		const res = await updateUserDetails(data);
		if (!res.ok) {
			Alert.alert("Error", res.error.message);
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		ToastAndroid.show(res.message, ToastAndroid.SHORT);
	};

	const useData = useUserStore((st) => st);
	return (
		<View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
			<ProfileLayout>
				<View style={{ flex: 1 }}>
					<Text>First Name</Text>
					<TextInput
						placeholder="Enter First Name"
						style={{ marginBottom: 20 }}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						value={fisrtName}
						onChangeText={setFisrtName}
					/>
					<Text>Last Name</Text>
					<TextInput
						placeholder="Enter Last Name"
						style={{ marginBottom: 20 }}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						value={lastName}
						onChangeText={setLastName}
					/>
					<Text>Date of birth</Text>
					<TextInput
						placeholder="Enter Date of birth"
						style={{ marginBottom: 20 }}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						value={dateOfBirth}
						onChangeText={setDateOfBirth}
					/>
					<Text>Address</Text>
					<TextInput
						placeholder="Enter Address"
						style={{ marginBottom: 20 }}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						value={address}
						onChangeText={setAddress}
					/>
				</View>
				<Button
					textColor="#fefefe"
					loading={isLoading}
					onPress={handleSave}
					contentStyle={{
						backgroundColor: theme.colors.primaryColor,
						marginBottom: 20,
						alignSelf: "center",
						paddingHorizontal: 100,
						paddingVertical: 3,
						borderRadius: 50,
					}}
				>
					Save
				</Button>
			</ProfileLayout>
		</View>
	);
}

const styles = StyleSheet.create({});
