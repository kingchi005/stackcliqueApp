import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/UserProfile/ProfileScreen";
import CustomHeader from "../UI/CustomHeader";
import PersonalDataScreen from "../../screens/UserProfile/PersonalDataScreen";
import ContactInfoScreen from "../../screens/UserProfile/ContactInfoScreen";
import SettingScreen from "../../screens/UserProfile/SettingScreen";
import PictureModal from "../UI/PictureModal";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createNativeStackNavigator();
// const Stack = createSharedElementStackNavigator();

export default function ProfileStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				options={{ headerTitle: (props) => <CustomHeader {...props} /> }}
				component={ProfileScreen}
			/>
			<Stack.Screen
				name="personal-data"
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "Personal Data",
					headerBackVisible: false,
				}}
				component={PersonalDataScreen}
			/>
			<Stack.Screen
				name="avatar-modal"
				options={{
					headerShown: false,
					headerBackVisible: false,
					presentation: "transparentModal",
					animation: "fade",
				}}
				component={PictureModal}
			/>
			<Stack.Screen
				name="contact-info"
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "COntact Information",
					headerBackVisible: false,
				}}
				component={ContactInfoScreen}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "Settings",
					headerBackVisible: false,
				}}
				component={SettingScreen}
			/>
			<Stack.Screen
				name="help-support"
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "HelpAndSupport",
					headerBackVisible: false,
				}}
				component={HelpAndSupport}
			/>
		</Stack.Navigator>
	);
}

function HelpAndSupport() {
	return (
		<View>
			<Text>Help and Support</Text>
		</View>
	);
}
