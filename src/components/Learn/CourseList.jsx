const courses = [
	{
		id: "0ae5dd57-e5eb-457f-bed8-35fbec91e4cc",
		title: "Vaco praesentium caste.",
		about:
			"Deserunt bardus denuncio quam delego bestia utrimque ut explicabo. Sub texo chirographum apparatus consuasor vulticulus color umbra. Cenaculum debeo tumultus capillus toties bis ater vomica cresco volva.",
		profile_photo: "https://avatars.githubusercontent.com/u/32490952",
		cover_photo: "https://loremflickr.com/640/480?lock=2517052992520192",
		instructor: "Israel D'Amore",
		category_id: "e57b8c4a-7cac-4180-987a-fa5d36cd55c7",
		rating: 1,
		required_user_level: 4, // faker.number.int({ max: 25 }),
		created_at: "2023-09-26T16:16:45.828Z",
		updated_at: "2023-09-26T16:16:45.828Z",
		category: {
			name: "tollo annus tumultus",
		},
		module: [
			{
				id: "d2acfaf0-b665-404e-96ba-63260af7cb9b",
				name: "aeger adflicto triduana",
				content: faker.lorem.paragraphs(),
				title:
					"Bestia unus thema theatrum apto tonsor aqua vobis volaticus ab.",
				profile_photo: "https://expert-sentiment.org/",
				cover_photo: "https://loremflickr.com/640/480?lock=4739970113732608",
			},
			{
				id: "5bd68168-4455-418d-bea6-83673d14eb5e",
				name: "ambitus occaecati ulciscor",
				content: faker.lorem.paragraphs(),
				title:
					"Speculum repellendus corporis ara aptus curia amplexus subvenio toties vinitor.",
				profile_photo: "https://knobby-reprocessing.name",
				cover_photo: "https://picsum.photos/seed/1yKoF/640/480",
			},
			{
				id: "48b49827-6c80-4cb2-84c1-bd016a2e1ac6",
				name: "angulus deduco circumvenio",
				content: faker.lorem.paragraphs(),
				title: "Tergo unde vapulus tam totam.",
				profile_photo: "https://trusting-netball.biz/",
				cover_photo: "https://loremflickr.com/640/480?lock=2517052992520192",
			},
		],
		reviews: [],
		_count: {
			enrollement: 0,
			reviews: 0,
			module: 3,
		},
	},
];

import {
	View,
	Text,
	ScrollView,
	useWindowDimensions,
	Alert,
} from "react-native";
import React, { useEffect } from "react";
import AvailableCourseCard from "./AvailableCourseCard";
import { faker } from "@faker-js/faker";
import { useCourseList } from "../../store/courseStore";
import { getCourses } from "../../services/courseService";
import { logoutUser } from "../../services/authService";

const CourseList = () => {
	const { width } = useWindowDimensions();
	const courseList = useCourseList((st) => st.courseList);
	const setCourseList = useCourseList((st) => st.setCourseList);

	useEffect(() => {
		if (!courseList.length) fetchCourses();
	}, []);

	const fetchCourses = async () => {
		const res = await getCourses();
		if (!res.ok) {
			const errMsg = res.error.message;
			if (
				errMsg == "Please provide an API key" ||
				errMsg == "API key has expired" ||
				errMsg == "Invalid API key"
			) {
				let msg = "You have been logged out please login again";
				Alert.alert("Session Expired", msg, [
					{
						text: "Login",
						onPress() {
							logoutUser();
						},
					},
				]);
				return;
			}
			return Alert.alert("Could not fetch courses", errMsg);
		}
		setCourseList(res.data);
	};

	return (
		<ScrollView
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
			{(courseList.length ? courseList : courses).map((course, key) => (
				<AvailableCourseCard
					key={key}
					course={course}
					showButton
					showRequiredLevel
				/>
			))}
		</ScrollView>
	);
};

export default CourseList;
