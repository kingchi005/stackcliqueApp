import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ConnectScreen } from "../../screens";
import ChatHeader from "../UI/ChatHeader";
import ChatScreen from "../../screens/ChatScreen";
import CustomHeader from "../UI/CustomHeader";
import ChannelProfileScreen from "../../screens/ChannelProfileScreen";
import CreateChaneelScreen from "../../screens/CreateChaneelScreen";
import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";
import PictureModal from "../UI/PictureModal";

const Stack = createNativeStackNavigator();

export default function ConnectStack() {
	return (
		<Stack.Navigator screenOptions={{ freezeOnBlur: true }}>
			<Stack.Screen
				name="Connect"
				options={{ headerTitle: (props) => <CustomHeader {...props} /> }}
				component={ConnectScreen}
			/>
			<Stack.Screen
				name="chat-screen"
				component={ChatScreen}
				options={{
					// headerTitle: (props) => <ChatHeader {...props} />,
					header: (props) => <ChatHeader {...props} />,
					headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
			<Stack.Screen
				name="channel-profile"
				component={ChannelProfileScreen}
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "Profile",
					// header: (props) => <ChatHeader {...props} />,
					headerLeft: () => null,
					headerBackVisible: false,
				}}
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
				name="create-channel"
				component={CreateChaneelScreen}
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					title: "Create a channel",
					// header: (props) => <ChatHeader {...props} />,
					headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	headerText: {
		textTransform: "uppercase",
		fontWeight: "700",
		marginStart: -10,
		color: theme.colors.primaryColor,
	},
});
