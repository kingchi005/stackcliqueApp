import React from "react";
import { View, Text, ScrollView } from "react-native";
import EnrolledCourses from "../../components/Learn/EnrolledCourses";
import WelcomeMessage from "../../components/Learn/WelcomeMessage";
import AvailableCourseCard from "../../components/Learn/AvailableCourseCard";
import BottomTab from "../../components/Learn/BottomTab";
import { theme } from "../../components/theme/theme";
import { faker } from "@faker-js/faker";
import CourseList from "../../components/Learn/CourseList";

export default function LearnScreen() {
	return (
		<View style={{ paddingHorizontal: 4, flex: 1 }}>
			<View style={{ marginBottom: 10 }}>
				<WelcomeMessage />
				<EnrolledCourses />
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
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
