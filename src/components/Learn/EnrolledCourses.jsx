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
						fontWeight: 800,
						fontSize: 10,
						textTransform: "uppercase",
					}}
				>
					Enrolled:
				</Text>
				<Text
					style={{
						color: theme.colors.green,
						fontWeight: 800,
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
						style={{ fontSize: 20, color: theme.colors.grey, fontWeight: 700 }}
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
	const _enrolledCourses = [
		{
			course: {
				id: "13a6640b-c195-4a14-8454-2ac12514aa6c",
				title:
					"Timor decens vindico ter absque vulticulus strenuus adiuvo synagoga.",
				category: {
					name: "cubitum video compello",
				},
				about:
					"Ascisco velut caveo natus bene timidus tracto comes ambitus vergo. Vulnero subvenio audentia quaerat. Alias canto paulatim solum eum.",
				profile_photo: faker.image.avatarGitHub(),
				cover_photo: faker.image.urlPicsumPhotos(),
				required_user_level: 10,
				_count: {
					module: 10,
				},
			},
			completed: false,
			completed_modules: 9,
			enrolled_at: "2024-02-07T14:16:59.662Z",
		},
		{
			course: {
				id: "1415a0e8-372a-40b5-bf82-db1c22cc31b9",
				title: "Ars canto creber desino amplexus nostrum.",
				category: {
					name: "avaritia ambulo vorago",
				},
				about:
					"Stipes pax sto vulgaris claustrum. Decerno sollers deserunt utilis vomica corrupti thymbra concido. Magnam administratio acidus terreo audax.",
				profile_photo: faker.image.avatarGitHub(),
				cover_photo: faker.image.urlPicsumPhotos(),
				required_user_level: 5,
				_count: {
					module: 5,
				},
			},
			completed: false,
			completed_modules: 2,
			enrolled_at: "2024-02-07T14:17:20.442Z",
		},
		{
			course: {
				id: "f571f005-cb4f-47ec-b4b8-25062b7c50e7",
				title: "Currus commodo color ultio.",
				category: {
					name: "cubitum video compello",
				},
				about:
					"Dedecor cornu spero iste neque ulciscor circumvenio vesco cribro. Reiciendis sopor aeger ciminatio. Stips varietas subseco voluptatum tyrannus maiores abduco ancilla.",
				profile_photo: faker.image.avatarGitHub(),
				cover_photo: faker.image.urlPicsumPhotos(),
				required_user_level: 10,
				_count: {
					module: 14,
				},
			},
			completed: false,
			completed_modules: 8,
			enrolled_at: "2024-02-07T14:17:43.715Z",
		},
	];

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
			{(enrolledCourses.length ? enrolledCourses : _enrolledCourses).map(
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
