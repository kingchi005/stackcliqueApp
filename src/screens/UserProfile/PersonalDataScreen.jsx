import {
	Alert,
	DatePickerIOS,
	DatePickerIOSBase,
	DatePickerIOSComponent,
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
import DateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { format, isDate, parse } from "date-fns";

export default function PersonalDataScreen() {
	const updateUser = useUserStore((st) => st.update);
	const [isLoading, setIsLoading] = useState(false);
	const [fisrtName, setFisrtName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [date, setDate] = useState("");

	const [address, setAddress] = useState("");

	useEffect(() => {
		const {} = useUserStore.getState();
		setAddress(useUserStore.getState().address);

		const date = useUserStore.getState().date_of_birth;
		if (date) setDate(date);
		// if (date) setDateOfBirth(new Date(date).toISOString().split("T")[0]);
		setLastName(useUserStore.getState().last_name);
		setFisrtName(useUserStore.getState().first_name);
	}, []);

	const handleSave = async () => {
		setIsLoading(true);
		const data = {
			first_name: fisrtName,
			last_name: lastName,
			date_of_birth: date,
			address: address,
		};
		// console.log(data);

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

	const userData = useUserStore((st) => st);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		2;
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		// console.log(date, "showMode");
		DateTimePickerAndroid.open({
			value: date ? new Date(date) : new Date(),
			onChange,
			mode: currentMode,
			is24Hour: false,
		});
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};
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
						placeholder="Enter your Date of Birth"
						keyboardType="numeric"
						style={{ marginBottom: 20 }}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						onPress={showDatepicker}
						value={date ? new Date(date).toDateString() : ""}
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
