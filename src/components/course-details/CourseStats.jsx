import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../theme/theme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

/**@param {Pick<TCourse,"instructor"|"rating"|"title"|"_count">} */
export default function CourseStats({
	title,
	instructor,
	rating,
	reviews,
	_count,
}) {
	return (
		<View>
			<Text style={styles.courseTitle}>{title}</Text>
			<Text
				style={{
					fontSize: 12,
					color: theme.colors.primaryColor,
					fontWeight: "600",
					marginTop: 6,
				}}
			>
				Instructor: {instructor}
			</Text>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: 24,
					marginTop: 4,
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
					<FontAwesome name="star-o" color={"yellow"} size={20} />
					<Text style={{ color: theme.colors.grey, fontSize: 12 }}>
						{rating}
					</Text>
					<Text style={{ color: theme.colors.grey, fontSize: 12 }}>
						({_count.reviews} Reviews)
					</Text>
				</View>

				<View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
					<Ionicons name="person-outline" size={20} color={theme.colors.grey} />
					<Text style={{ color: theme.colors.grey, fontSize: 12 }}>
						{_count.enrollement} Students Enrolled
					</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	courseTitle: {
		textTransform: "uppercase",
		fontSize: 16,
		fontWeight: "600",
	},
});
