import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
	createDrawerNavigator,
} from "@react-navigation/drawer";
import { HomeStack } from "./HomeStack";
import ConnectStack from "./ConnectStack";
import { ConnectScreen, NotificationScreen } from "../../screens";
import CoursesScreen from "../../screens/CoursesScreen";
import CustomHeader from "../UI/CustomHeader";
import { useAccessToken, useUserStore } from "../../store/userStore";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import ProfileStack from "./ProfileStack";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { logoutUser } from "../../services/authService";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const navigation = useNavigation();

	const saveToken = useAccessToken((st) => st.update);
	const handleLogout = () => {
		navigation.dispatch(DrawerActions.closeDrawer());
		logoutUser();
	};

	const user_avatar = useUserStore.getState().profile_photo;
	return (
		<DrawerContentScrollView {...props}>
			<View style={{ flex: 1, paddingHorizontal: 10 }}>
				<View style={styles.drawerPrepend}>
					{user_avatar ? (
						<Avatar.Image size={100} source={{ uri: user_avatar }} />
					) : (
						<Ionicons
							color={theme.colors.background}
							style={{
								color: theme.colors.grey,
								marginTop: 20,
							}}
							// style={{ backfaceVisibility: theme.colors. }}
							size={100}
							name="person-circle"
						/>
					)}

					<Text style={styles.profileTitle}>
						{useUserStore.getState().username}
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<DrawerItemList {...props} />
				</View>
				<DrawerItem
					icon={({ color, size }) => (
						<Ionicons
							size={size}
							style={{ paddingLeft: 15 }}
							color={"red"}
							name="log-out"
						/>
					)}
					labelStyle={{ color: "red", marginStart: -15 }}
					label={"Logout"}
					onPress={handleLogout}
				/>
			</View>
		</DrawerContentScrollView>
	);
}

export function DrawerStack() {
	console.log(useUserStore.getState().profile_photo);
	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName="Home"
			screenOptions={{
				// drawerHideStatusBarOnOpen: true,
				drawerInactiveTintColor: theme.colors.primaryColor,
				drawerActiveTintColor: theme.colors.primaryColor,
				drawerLabelStyle: { marginStart: -15, marginVertical: -3 },
				// drawerItemStyle: { paddingLeft: 15 },
				drawerStyle: {},
			}}
		>
			<Drawer.Screen
				name="Home"
				options={{
					headerShown: false,
					drawerIcon: ({ size, color, focused }) => (
						<Ionicons
							style={styles.itemIcon}
							name={`home${focused ? "" : "-outline"}`}
							size={size}
							color={color}
						/>
					),
				}}
				component={HomeStack}
			/>
			<Drawer.Screen
				name="Courses"
				component={CoursesScreen}
				options={{
					headerTitleStyle: styles.headerText,
					// headerTitle: ({ props }) => <CustomHeader {...props} />,
					drawerIcon: ({ size, color, focused }) => (
						<Ionicons
							style={styles.itemIcon}
							name={`reader${focused ? "" : "-outline"}`}
							size={size}
							color={color}
						/>
					),
					headerBackVisible: false,
					// headerLeft: () => null,
				}}
			/>
			<Drawer.Screen
				name="Connect-stack"
				component={ConnectStack}
				options={{
					title: "Connect",
					// headerTitleStyle: styles.headerText,
					drawerIcon: ({ size, color, focused }) => (
						<Ionicons
							style={styles.itemIcon}
							name={`chatbox-ellipses${focused ? "" : "-outline"}`}
							size={size}
							color={color}
						/>
					),
					headerBackVisible: false,
					headerShown: false,
					// headerLeft: () => null,
				}}
			/>

			<Drawer.Screen
				name="Notification"
				component={NotificationScreen}
				options={{
					// headerTitle: (props) => <CustomHeader {...props} />,
					headerTitleStyle: styles.headerText,

					drawerIcon: ({ size, color, focused }) => (
						<Ionicons
							style={styles.itemIcon}
							name={`notifications${focused ? "" : "-outline"}`}
							size={size}
							color={color}
						/>
					),
					// headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
			<Drawer.Screen
				name="Profile-stack"
				component={ProfileStack}
				options={{
					title: "Profile",
					headerTitleStyle: styles.headerText,
					drawerIcon: ({ size, color, focused }) => (
						<Ionicons
							style={styles.itemIcon}
							name={`person${focused ? "" : "-outline"}`}
							size={size}
							color={color}
						/>
					),
					headerBackVisible: false,
					headerShown: false,
					// headerLeft: () => null,
				}}
			/>
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
	drawerPrepend: {
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 25,
		marginTop: 40,
	},
	profileTitle: {
		color: theme.colors.primaryColor,
		marginTop: 10,
		fontSize: 15,
	},
	itemIcon: { marginStart: 15 },
	headerText: {
		textTransform: "uppercase",
		fontWeight: 700,
		marginStart: -10,
		color: theme.colors.primaryColor,
	},
});
