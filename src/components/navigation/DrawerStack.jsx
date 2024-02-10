import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
	createDrawerNavigator,
} from "@react-navigation/drawer";
import { HomeStack } from "./HomeStack";
import { NotificationScreen } from "../../screens";
import CoursesScreen from "../../screens/CoursesScreen";
import CustomHeader from "../UI/CustomHeader";
import { useAccessToken } from "../../store/userStore";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const saveToken = useAccessToken((st) => st.update);
	const handleLogout = () => {
		saveToken("");
	};
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label={"Logout"} onPress={handleLogout} />
		</DrawerContentScrollView>
	);
}

export function DrawerStack() {
	return (
		<Drawer.Navigator
			drawerContent={CustomDrawerContent}
			initialRouteName="Home"
			screenOptions={{ drawerHideStatusBarOnOpen: true }}
		>
			<Drawer.Screen
				name="Home"
				options={{ headerShown: false }}
				component={HomeStack}
			/>
			<Drawer.Screen
				name="Courses"
				component={CoursesScreen}
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
			{/* <Drawer.Screen name="Personal-details" component={NotificationScreen} /> */}
			<Drawer.Screen
				name="Notification"
				component={NotificationScreen}
				options={{
					headerTitle: (props) => <CustomHeader {...props} />,
					headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
		</Drawer.Navigator>
	);
}
