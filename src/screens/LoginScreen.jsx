import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../components";
import { UIStore, useUIStore } from "../store/store";
import { getUserDetails, loginUser } from "../services/authService";
import { useAccessToken, useUserStore } from "../store/userStore";
import { shallow } from "zustand/shallow";
const LoginScreen = () => {
	// Initialize the useForm hook from react-hook-form
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ defaultValues: { email: "", password: "" } });

	// Get the navigation object from React Navigation
	const navigation = useNavigation();
	const email = useUserStore((st) => st.email);
	const password = useUserStore((st) => st.password);
	const authenticateUser = useUIStore((st) => st.authenticate);
	const [isLoading, setIsLoading] = useState(false);
	// Function to check if both Email and Password inputs are valid
	const isFormValid = () => {
		const values = getValues();
		return (
			!errors.Email &&
			!errors.Password &&
			values.Email?.trim() !== "" &&
			values.Password?.trim() !== ""
		);
	};
	// Function to handle form submission
	const saveToken = useAccessToken((st) => st.update);
	const updateUserId = useUserStore((st) => st.updateId);
	const updateUserDetails = useUserStore((st) => st.update);
	const onSubmit = async () => {
		setIsLoading(true);
		const data = getValues();
		const res = await loginUser(data);
		if (!res.ok) {
			setIsLoading(false);
			return Alert.alert("Login failed", res.error.message, [], {
				cancelable: true,
			});
		}

		saveToken(res.data.UserAccessToken);
		const _userDetails = await getUserDetails(res.data.id);
		if (!_userDetails.ok) {
			setIsLoading(false);
			return Alert.alert(
				"Could not fetch details",
				_userDetails.error.message,
				[],
				{ cancelable: true }
			);
		}
		updateUserDetails(_userDetails.data);
		setIsLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ paddingTop: 50 }}>
				<Image
					source={require("../../assets/Wordmark.png")}
					style={{ width: "85%", height: 50, alignSelf: "center" }}
				/>
			</View>
			<View style={{ paddingTop: 50 }}>
				<Text style={styles.text}>Login</Text>
				<Text
					style={{
						color: "gray",
						fontSize: 16,
						fontWeight: "500",
						padding: 10,
					}}
				>
					Welcome.
				</Text>
			</View>
			{/* Use KeyboardAvoidingView to adjust layout when the keyboard appears */}
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
			>
				<ScrollView style={{ padding: 10 }}>
					{/* Email Input */}
					<CustomInput
						name={"email"}
						placeholder={"Enter your email"}
						control={control}
						keyboardType={"email-address"}
						rules={{
							required: "* Email address is required!",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "* Invalid email address!",
							},
						}}
						Icon={() => (
							<MaterialIcons name="email" size={25} color="#7E0772" />
						)}
					/>
					{/* Password Input */}
					<CustomInput
						name={"password"}
						placeholder={"Enter your password"}
						control={control}
						rules={{
							required: "* Kindly enter your password!",
							minLength: {
								value: 6,
								message: "* Password should be minimum 6 characters long!",
							},
						}}
						Icon={() => <FontAwesome name="key" size={24} color="#7E0772" />}
						secureTextEntry={true}
					/>
					{/* Forgotten Password text */}
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ alignSelf: "flex-end", marginTop: 10 }}
					>
						<Text style={{ fontSize: 15, fontWeight: "500", color: "#7E0772" }}>
							Forgotten Password?
						</Text>
					</TouchableOpacity>
					<Button
						style={{ marginTop: 40 }}
						// disabled={isLoading}
						textColor="#fefefe"
						contentStyle={{
							backgroundColor: "#7E0772",
							borderRadius: 50,
							paddingVertical: 10,
						}}
						loading={isLoading}
						onPress={handleSubmit(onSubmit)}
					>
						Login
					</Button>

					<View
						style={{
							alignSelf: "center",
							marginTop: 40,
							flexDirection: "row",
						}}
					>
						<Text style={{ fontSize: 15, fontWeight: "700", color: "black" }}>
							Don't have an account?{" "}
						</Text>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{ alignSelf: "center" }}
							onPress={() => {
								navigation.navigate("SignUp");
							}}
						>
							<Text
								style={{ fontSize: 15, fontWeight: "500", color: "#7E0772" }}
							>
								Click here to SignUp
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EFEFEF",
	},
	text: {
		fontSize: 30,
		fontWeight: "800",
		color: "black",
		padding: 10,
	},
});
