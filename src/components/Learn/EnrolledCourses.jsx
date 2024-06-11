import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	useWindowDimensions,
	Pressable,
} from "react-native";
import React from "react";
import ProgressIndicator from "../UI/ProgressIndicator";
import { theme } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { formatDate } from "date-fns";
import { faker } from "@faker-js/faker";
import { useUserStore } from "../../store/userStore";

function CoursesEnrolledCard({
	total,
	title,
	enrolled_at,
	completed_modules,
	profile_photo,
}) {
	const { width } = useWindowDimensions();
	return (
		<View style={[styles.courseCardContainer, { width: 0.9 * width }]}>
			<View style={{ gap: 2, flexDirection: "row" }}>
				<Text
					style={{
						color: theme.colors.primaryColor,
						fontWeight: "800",
						fontSize: 10,
						textTransform: "uppercase",
					}}
				>
					Enrolled:
				</Text>
				<Text
					style={{
						color: theme.colors.green,
						fontWeight: "800",
						fontSize: 10,
						textTransform: "uppercase",
					}}
				>
					{formatDate(enrolled_at, "do MMM, y").toUpperCase()}
				</Text>
			</View>

			<View>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
					<Avatar.Image
						source={{ uri: profile_photo }}
						size={40}
						style={{ borderRadius: 10 }}
					/>
					<Text
						style={{
							fontSize: 20,
							color: theme.colors.grey,
							fontWeight: "700",
						}}
					>
						{(() => {
							let _ = title.split(" ");
							return _.length < 5
								? _.join(" ")
								: _.slice(0, 4).join(" ") + "...";
						})()}
					</Text>
				</View>
				<Text style={{ color: theme.colors.grey }}>
					You have {total - completed_modules} more modules to wrap it up!
				</Text>
			</View>
			<ProgressIndicator completed={completed_modules} total={total} />
		</View>
	);
}

export default function EnrolledCourses() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const enrolledCourses = useUserStore((st) => st.enrolled_courses);

	// console.log(enrolledCourses);
	return (
		<ScrollView
			style={styles.scrollContainer}
			horizontal
			snapToAlignment="center"
			decelerationRate={0}
			snapToInterval={0.93 * width}
			contentContainerStyle={{ gap: 10 }}
			showsHorizontalScrollIndicator={false}
		>
			{enrolledCourses.map(
				(
					{
						completed,
						completed_modules,
						enrolled_at,
						course: {
							id: course_id,
							title,
							_count: { module: total },
							profile_photo,
						},
					},
					index
				) => (
					<Pressable
						key={index}
						onPress={() =>
							navigation.navigate("Course-Details", {
								course_id,
								enrolled: true,
								title,
							})
						}
					>
						<CoursesEnrolledCard
							title={title}
							profile_photo={profile_photo}
							enrolled_at={enrolled_at}
							completed_modules={completed_modules}
							total={total}
						/>
					</Pressable>
				)
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		marginTop: 8,
	},
	courseCardContainer: {
		paddingVertical: 10,
		paddingHorizontal: 8,
		backgroundColor: theme.colors.white,
		gap: 6,
		// borderWidth: 1,
		borderRadius: 10,
		borderColor: "",
		// marginHorizontal: 5,
	},
});
