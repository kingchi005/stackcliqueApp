import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { theme } from "../theme/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const imgArr = [
	require("../../../assets/images-from-figma/vs-code-img.png"),
	require("../../../assets/images-from-figma/html-img.jpg"),
	require("../../../assets/images-from-figma/css-img.jpg"),
];

/**
 *
 * @param {TSearchedCourse} param0
 */
export default function SearchResultCard({ title, profile_photo, _count }) {
	return (
		<View style={styles.container}>
			<View>
				<Avatar
					uri={imgArr[Math.random() < 0.5 ? 0 : 1]}
					size={70}
					borderRadius={10}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={{ fontWeight: 600, fontSize: 18 }}>{title}</Text>
				<View style={{ marginTop: "auto" }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
						>
							<FontAwesome name="star-o" color={"yellow"} size={20} />
							<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
								{4}
							</Text>
							<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
								({_count.reviews}k Reviews)
							</Text>
						</View>

						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 1 }}
						>
							<Ionicons
								name="person-outline"
								size={20}
								color={theme.colors.grey}
							/>
							<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
								{_count.enrollement}k Students Enrolled
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical: 8,
		backgroundColor: theme.colors.white,
		borderRadius: 10,
		marginTop: 16,
		gap: 4,
		paddingHorizontal: 5,
		borderWidth: 1,
		borderColor: "#7e077216",
	},
});
