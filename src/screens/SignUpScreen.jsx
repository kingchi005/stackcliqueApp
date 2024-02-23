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
import { useForm } from "react-hook-form";
import {
	MaterialIcons,
	MaterialCommunityIcons,
	FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../components";
import { UIStore } from "../store/store";
import { registerUser } from "../services/authService";
import { useUserStore } from "../store/userStore";
import { Button } from "react-native-paper";

const SignUpScreen = () => {
	// Initialize the useForm hook from react-hook-form
	const {
		control,
		handleSubmit,
		formState: errors,
		getValues,
	} = useForm({ defaultValues: { email: "", username: "", password: "" } });
	// Get the navigation object from React Navigation
	const navigation = useNavigation();
	const updateUserData = useUserStore((st) => st.update);
	const [isLoading, setIsLoading] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	// Function to handle checkbox click
	const handleCheckboxClick = () => {
		setIsChecked(!isChecked);
	};

	// Function to handle form submission
	const onSubmit = async (e) => {
		setIsLoading(true);
		const data = getValues();

		const res = await registerUser(data);
		if (!res.ok) {
			setIsLoading(false);
			return Alert.alert("Login failed", res.error.message);
		}
		setIsLoading(false);
		navigation.navigate("LogIn");
	};

	// Function to check if all fields are valid
	const isFormValid = () => {
		return Object.keys(errors).every((field) => !errors[field]);
	};

	// Function to handle input change
	const handleInputChange = () => {
		setIsChecked(false); // Reset isChecked when there's an input change
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ paddingTop: 50 }}>
				<Image
					source={require("../../assets/Wordmark.png")}
					style={{ width: "85%", height: 50, alignSelf: "center" }}
				/>
			</View>
			<View style={{ paddingTop: 20 }}>
				<Text style={styles.text}>Create an account</Text>
				<Text
					style={{
						color: "gray",
						fontSize: 16,
						fontWeight: "500",
						padding: 10,
					}}
				>
					You have zero regrets joining the best community in the world,
					tailored for your personal growth.
				</Text>
			</View>
			{/* Use KeyboardAvoidingView to adjust layout when the keyboard appears */}
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
			>
				<ScrollView style={{ padding: 10 }}>
					{/* Username Input */}
					<CustomInput
						name="username"
						placeholder={"Enter your username"}
						keyboardType="name-phone-pad"
						control={control}
						rules={{
							required: "* Username is required!",
							minLength: {
								value: 4,
								message: "* Username should be minimum 4 characters long!",
							},
							maxLength: {
								value: 12,
								message: "* Username should be maximum 12 characters long!",
							},
						}}
						Icon={() => (
							<MaterialCommunityIcons
								name="account"
								size={25}
								color="#7E0772"
							/>
						)}
						onChange={handleInputChange} // Call handleInputChange on input change
					/>
					{/* Email Input */}
					<CustomInput
						name="email"
						placeholder={"Enter your email address"}
						keyboardType="email-address"
						control={control}
						rules={{
							required: "* Email address is required!",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "* Invalid email address!",
							},
						}}
						Icon={() => (
							<MaterialIcons name="email" size={25} color="#7E0772" />
						)}
						onChange={handleInputChange} // Call handleInputChange on input change
					/>
					{/* Password Input */}
					<CustomInput
						name="password"
						placeholder={"Enter your password"}
						control={control}
						secureTextEntry={true}
						rules={{
							required: "* Kindly enter your password!",
							minLength: {
								value: 8,
								message: "* Password should be minimum 8 characters long!",
							},
						}}
						Icon={() => <FontAwesome name="key" size={24} color="#7E0772" />}
						onChange={handleInputChange} // Call handleInputChange on input change
					/>

					{/* Checkbox for Terms & Conditions */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<TouchableOpacity onPress={handleCheckboxClick}>
							<View
								style={{
									width: 20,
									height: 20,
									borderRadius: 5,
									borderWidth: 2,
									borderColor: "#7E0772",
									justifyContent: "center",
									alignItems: "center",
									marginRight: 10,
									marginLeft: 5,
									bottom: 5,
									backgroundColor: isChecked ? "#7E0772" : "transparent",
								}}
							>
								{isChecked && (
									<MaterialIcons name="check" size={16} color="#FFFFFF" />
								)}
							</View>
						</TouchableOpacity>
						<Text
							style={{
								fontSize: 15,
								fontWeight: "700",
								color: "black",
								bottom: 5,
							}}
						>
							I agree to the
						</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate("Terms & Conditions")}
							style={{ bottom: 5 }}
							activeOpacity={0.5}
						>
							<Text style={{ color: "#7E0772", marginStart: 5 }}>
								Terms & Conditions
							</Text>
						</TouchableOpacity>
					</View>

					{/* Sign Up button */}
					<Button
						style={{ marginTop: 20 }}
						disabled={isLoading}
						textColor="#ccc"
						contentStyle={{
							backgroundColor: "#7E0772",
							borderRadius: 50,
							paddingVertical: 10,
						}}
						loading={isLoading}
						onPress={handleSubmit(onSubmit)}
					>
						<Text
							style={{
								textTransform: "capitalize",
								fontSize: 15,
								fontWeight: "500",
								color: "#FFFFFF",
							}}
						>
							Sign Up
						</Text>
					</Button>

					<View
						style={{ alignSelf: "center", marginTop: 20, flexDirection: "row" }}
					>
						<Text style={{ fontSize: 15, fontWeight: "700", color: "black" }}>
							Already have an account?
						</Text>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{ alignSelf: "center" }}
							onPress={() => {
								navigation.navigate("LogIn");
							}}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: "#7E0772",
									marginStart: 5,
								}}
							>
								Click here to LogIn
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUpScreen;

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
