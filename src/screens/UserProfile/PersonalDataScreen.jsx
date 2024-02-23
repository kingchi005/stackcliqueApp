import { DatePickerIOSBase, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../components/theme/theme";
import { Button, DataTable, TextInput } from "react-native-paper";
import { useUserStore } from "../../store/userStore";

export default function PersonalDataScreen() {
	// const [PDFormData, setPDFormData] = useState(second)
	const useData = useUserStore((st) => st);
	return (
		<View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
			<View style={{ flex: 1 }}>
				<Text>First Name</Text>
				<TextInput
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
				<Text>Last Name</Text>
				<TextInput
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
				<Text>Date of birth</Text>

				<TextInput
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
				<Text>Location</Text>
				<TextInput
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
