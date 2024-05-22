import {
	DatePickerIOSBase,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { theme } from "../../components/theme/theme";
import { Button, DataTable, TextInput } from "react-native-paper";
import { useUserStore } from "../../store/userStore";
import ProfileLayout from "./ProfileLayout";

export default function SettingScreen() {
	return (
		<View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
			<ProfileLayout>
				<View style={{ flex: 1 }}>
					<Text style={{ fontSize: 10, marginBottom: 10 }}>
						Set a learning reminder to help you achieve goals quicker. A
						reminder would sent to your email weekly
					</Text>
					<Text style={{ fontSize: 13.5, marginBottom: 30 }}>
						Learning reminders
					</Text>
					<Text>Change Password</Text>
					<TextInput
						keyboardType="ascii-capable"
						style={{ marginBottom: 30, marginTop: 10 }}
						placeholder="Enter Old Password"
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						// value={}
						// onChangeText={setDescription}
					/>
					<TextInput
						keyboardType="ascii-capable"
						style={{ marginBottom: 30, marginTop: 10 }}
						placeholder="Enter New Password"
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.black + "22",
							borderWidth: 1,
						}}
						mode="outlined"
						// value={}
						// onChangeText={setDescription}
					/>
					<TextInput
						placeholder="Re-enter New Password"
						keyboardType="ascii-capable"
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
			</ProfileLayout>
		</View>
	);
}

const styles = StyleSheet.create({});
