import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomTab from "../components/Learn/BottomTab";
import { Button } from "../components";
import { Button as RnButton } from "react-native-paper";
import CourseOverview from "../components/course-details/CourseOverview";
import { UIStore, useUIStore } from "../store/store";
import AvailableCourseCard from "../components/Learn/AvailableCourseCard";
import CourseModules from "../components/Learn/CourseModules";
import { theme } from "../components/theme/theme";
import { getCourseDetails } from "../services/courseService";
import { ActivityIndicator } from "react-native-paper";
import { useCurrentCourse } from "../store/courseStore";
import { Ionicons } from "@expo/vector-icons";
import { useCacheStore } from "../store/cacheStore";

export default function CourseDetailsScreen() {
	/**@type {[boolean,React.Dispatch<React.SetStateAction<boolean>>]} */
	const [showModules, setShowModules] = useState(true);
	/**@type {[TCourse,React.Dispatch<React.SetStateAction<TCourse>>]} */
	const [courseDetails, setCourseDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation();
	/**@type {{course:TCourse;course_id:String}} */
	const { course_id, enrolled } = useRoute().params;
	const setCurModules = useCurrentCourse((st) => st.setModule);
	const m = useCurrentCourse((st) => st.modules);

	useEffect(() => {
		fetchCourseDetails();
	}, []);
	const fetchCourseDetails = async () => {
		// get from cache here
		const _data = useCacheStore.getState().getcourse(course_id);
		// console.log(_data);
		if (_data) {
			setIsLoading(false);
			setCourseDetails(_data);
			return;
		}

		setIsLoading(true);
		const res = await getCourseDetails(course_id);
		if (!res.ok) {
			setIsLoading(false);
			return;
			Alert.alert("Failed to get course details", res.error.message);
		}

		// cache here
		useCacheStore.getState().cacheCourse(res.data);
		setCourseDetails(res.data);
		setCurModules(res.data.module);
		setIsLoading(false);
	};

	const handleEnroll = () => {
		Alert.alert("Enrolling", "enrol now");
	};
	return (
		<View style={{ flex: 1, paddingHorizontal: 10.08 }}>
			{isLoading && (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size={35} />
				</View>
			)}
			{!courseDetails && !isLoading && (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Ionicons name="wifi" size={150} color={"#24242433"} />
					<Text style={{ color: theme.colors.grey }}>
						Please check your internet connection and try again
					</Text>
					<RnButton
						style={{ borderRadius: 5 }}
						onPress={() => fetchCourseDetails()}
					>
						Retry
					</RnButton>
				</View>
			)}
			{courseDetails && (
				<>
					<ScrollView style={{ top: 0 }} showsVerticalScrollIndicator={false}>
						<CourseOverview {...courseDetails} />
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								marginTop: 15,
							}}
						>
							<Pressable onPress={() => setShowModules(true)}>
								<Text
									style={[
										styles.modulesText,
										{
											borderBottomWidth: showModules ? 2 : 0,
											color: showModules
												? theme.colors.primaryColor
												: theme.colors.grey,
										},
									]}
								>
									Modules
								</Text>
							</Pressable>
							<Pressable onPress={() => setShowModules(false)}>
								<Text
									style={[
										styles.modulesText,
										{
											borderBottomWidth: !showModules ? 2 : 0,
											color: !showModules
												? theme.colors.primaryColor
												: theme.colors.grey,
										},
									]}
								>
									Reviews
								</Text>
							</Pressable>
						</View>
						{showModules ? (
							<CourseModules
								enrolled={enrolled}
								modules={courseDetails.module}
								course_title={courseDetails.title}
							/>
						) : (
							<View>
								<Text>Reviews screen</Text>
							</View>
						)}
					</ScrollView>
					{!enrolled && (
						<BottomTab>
							<View style={{ width: 250 }}>
								<Button onPress={handleEnroll}>Enroll</Button>
							</View>
						</BottomTab>
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	modulesText: {
		fontWeight: 700,
		fontSize: 17,
		borderBottomColor: theme.colors.primaryColor,
		paddingBottom: 4,
	},
});
