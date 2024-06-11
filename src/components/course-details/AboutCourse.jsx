import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme/theme";
import { EvilIcons } from "@expo/vector-icons";
import { UIStore, useUIStore } from "../../store/store";

export default function AboutCourse({ about }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const showModules = useUIStore((st) => st.showModules);
	const toggleShowModule = useUIStore((st) => st.toggleShowModules);
	const setShowModules = (value) => {
		UIStore.update((state) => {
			state.showModules = value;
		});
	};
	return (
		<View style={styles.container}>
			<Text style={{ fontWeight: "600" }}>About Course</Text>

			<View style={[styles.details]}>
				<Text numberOfLines={isExpanded ? null : 4} style={styles.text}>
					{about}
				</Text>
			</View>
			{/* <Pressable onPress={() => setIsExpanded((prev) => !prev)}>
				{isExpanded ? (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={styles.readMore}>Read Less</Text>
						<EvilIcons name="chevron-up" color={theme.colors.green} size={20} />
					</View>
				) : (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={styles.readMore}>Read More</Text>
						<EvilIcons
							name="chevron-down"
							color={theme.colors.green}
							size={20}
						/>
					</View>
				)}
			</Pressable> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		position: "relative",
	},
	details: {
		marginTop: 10,
		position: "relative",
	},

	text: {
		fontSize: 17,
		color: theme.colors.grey,
		lineHeight: 23,
	},
	readMore: {
		color: theme.colors.green,
	},
});
