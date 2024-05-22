import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl, Alert } from "react-native";
import EnrolledCourses from "../../components/Learn/EnrolledCourses";
import WelcomeMessage from "../../components/Learn/WelcomeMessage";
import AvailableCourseCard from "../../components/Learn/AvailableCourseCard";
import BottomTab from "../../components/Learn/BottomTab";
import { theme } from "../../components/theme/theme";
import { faker } from "@faker-js/faker";
import CourseList from "../../components/Learn/CourseList";
import { getUserDetails } from "../../services/authService";
import { useUserStore } from "../../store/userStore";
import { useCourseList } from "../../store/courseStore";
import { getCourses } from "../../services/courseService";

export default function LearnScreen() {
	const [refreshing, setRefreshing] = useState(false);

	const refreshController = async () => {
		setRefreshing(true);
		// refetch user details
		const userRes = await getUserDetails(useUserStore.getState().id);
		if (!userRes.ok) {
			setRefreshing(false);
			return Alert.alert("Could not refresh", "Check your internet and retry");
		}
		useUserStore.getState().update(userRes.data);

		// refetch courses
		const courseRes = await getCourses();
		if (!courseRes.ok) {
			setRefreshing(false);
			return Alert.alert("Could not refresh", "Check your internet and retry");
		}
		useCourseList.getState().setCourseList(courseRes.data);
		setRefreshing(false);
	};

	return (
		<View
			style={{
				paddingHorizontal: 4,
				flex: 1,
				// borderStartColor: theme.colors.background,
			}}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refreshController}
					/>
				}
			>
				<View style={{ marginBottom: 10 }}>
					<WelcomeMessage />
					<EnrolledCourses />
				</View>

				<CourseList />
			</ScrollView>

			<BottomTab height={40}>
				<Text style={{ color: theme.colors.grey }}>
					How to level up on Stack Clique?
				</Text>
			</BottomTab>
		</View>
	);
}
