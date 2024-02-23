import {
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	ImageBackground,
	Pressable,
	Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";
import { Button, Avatar as _Avatar } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
const course_icon = require("../../../assets/course-icon.jpeg");
const course_cover = require("../../../assets/course-cover-img.png");

export default function AvailableCourseCard({
	showButton,
	moduleNumber,
	showRequiredLevel,
	showCheckIcon,
	course,
}) {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const {
		title,
		id: course_id,
		cover_photo,
		profile_photo,
		about,
		module,
		required_user_level,
	} = course;
	return (
		<View style={[styles.container, { width: 0.9 * width }]}>
			<ImageBackground
				source={{ uri: cover_photo }}
				resizeMode="cover"
				style={styles.image}
			/>

			<View style={styles.itemsContainer}>
				<View style={styles.avatarPosition}>
					<View>
						<Avatar.Image
							style={{ borderRadius: 15 }}
							source={{ uri: profile_photo }}
						/>
						{/* <Avatar
							uri={profile_photo}
							size={81.544}
							borderColor={theme.colors.white}
							borderRadius={17.47408}
						/> */}
					</View>
				</View>
				{showCheckIcon && (
					<View
						style={{
							marginTop: -40,
							flexDirection: "row",
							justifyContent: "center",
							marginBottom: 4,
						}}
					>
						<AntDesign
							name="checkcircle"
							color={theme.colors.green}
							size={30}
						/>
					</View>
				)}
				<Text style={styles.title}>
					{(() => {
						let _ = title.split(" ");
						return _.length < 5 ? _.join(" ") : _.slice(0, 3).join(" ") + "...";
					})()}
				</Text>
				<Text
					style={{
						textAlign: "center",
						lineHeight: 16,
						color: theme.colors.grey,
						lineHeight: 20,
					}}
				>
					{about.length > 110 ? about.slice(0, 100) + "..." : about}
				</Text>
				{showRequiredLevel && (
					<Text
						style={{
							textAlign: "center",
							color: theme.colors.green,
							marginTop: 10,
						}}
					>
						Requirement: Level {required_user_level} and above
					</Text>
				)}

				{showButton && (
					<View style={{ marginVertical: 14.08 }}>
						<Button
							onPress={() =>
								navigation.navigate("Course-Details", { course_id, course })
							}
						>
							Learn More
						</Button>
					</View>
				)}
				{moduleNumber && (
					<Pressable
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginTop: 8,
						}}
					>
						<Text style={{ color: theme.colors.green }}>Module 1</Text>
					</Pressable>
				)}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		position: "relative",
		// alignSelf: "center",
		marginTop: 5,
		borderWidth: 1,
		borderColor: theme.colors.white + "44",
		height: "100%",
		borderRadius: 15.29008,
		overflow: "hidden",
		paddingBottom: 30,
	},
	title: {
		textTransform: "uppercase",
		textAlign: "center",
		fontWeight: 700,
		fontSize: 20,
		marginBottom: 5,
		flexWrap: "wrap",
	},
	image: {
		flex: 1,
		borderRadius: 15.29008,
		borderWidth: 1,
		borderColor: theme.colors.white,
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
	itemsContainer: {
		position: "relative",
		backgroundColor: theme.colors.white,
		borderTopRightRadius: 30.57904,
		borderTopLeftRadius: 30.57904,
		marginTop: 80,
		marginBottom: 0,
		paddingHorizontal: 30.08,
		paddingBottom: 8,
	},
	avatarPosition: {
		top: -30,
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
	},
});
