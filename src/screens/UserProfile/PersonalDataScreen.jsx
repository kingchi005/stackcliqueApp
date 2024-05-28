import {
	Alert,
	DatePickerIOS,
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
	const updateUser = useUserStore((st) => st.update);
	const [isLoading, setIsLoading] = useState(false);
	const [fisrtName, setFisrtName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		const {} = useUserStore.getState();
		setAddress(useUserStore.getState().address);

		const date = useUserStore.getState().date_of_birth;
		if (date) setDateOfBirth(new Date(date).toLocaleDateString());
		setLastName(useUserStore.getState().last_name);
		setFisrtName(useUserStore.getState().first_name);
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		const data = {
			first_name: fisrtName || "",
			last_name: lastName || "",
			// date_of_birth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
			address: address || "",
		};

		const res = await updateUserDetails(data);
		if (!res.ok) {
			Alert.alert("Error", res.error.message);
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		ToastAndroid.show(res.message, ToastAndroid.SHORT);
		updateUser(res.data);
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
						placeholder="MM/DD/YYYY"
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
						marginHorizontal: 0,
						paddingVertical: 3,
						borderRadius: 50,
					}}
					style={{ marginHorizontal: 50 }}
				>
					Save
				</Button>
			</ProfileLayout>
		</View>
	);
}

const styles = StyleSheet.create({});
