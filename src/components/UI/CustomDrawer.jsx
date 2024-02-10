import { DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { View, Text } from "react-native";

export default function CustomDrawer(props) {
	return (
		<View>
      <DrawerItem {...props} />
		</View>
	);
}
