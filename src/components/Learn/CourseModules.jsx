import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import AvailableCourseCard from "./AvailableCourseCard";
import CourseModuleCard from "../course-details/CourseModuleCard";

/**
 *
 * @param {{modules:TCourseModule}} param0
 * @returns
 */
const CourseModules = ({ modules, enrolled, course_title }) => {
	const { width } = useWindowDimensions();
	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			horizontal
			decelerationRate={"fast"}
			snapToAlignment="center"
			snapToInterval={width * 0.931}
			contentContainerStyle={{
				justifyContent: "space-evenly",
				gap: 10,
				paddingHorizontal: 10,
			}}
		>
			{modules.map((module, key) => (
				<CourseModuleCard
					course_title={course_title}
					enrolled={enrolled}
					module={module}
					index={key + 1}
					key={key}
					moduleNumber
					completed
				/>
			))}
		</ScrollView>
	);
};

export default CourseModules;
