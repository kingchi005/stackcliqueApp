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
import { Button as RnButton } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { useCurrentCourse } from "../../store/courseStore";
const course_icon = require("../../../assets/course-icon.jpeg");
const course_cover = require("../../../assets/course-cover-img.png");

export default function CourseModuleCard({
	completed,
	moduleNumber,
	showRequiredLevel,
	showCheckIcon,
	module,
	enrolled,
	index,
}) {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const updateCurrentIndex = useCurrentCourse((st) => st.setIndex);

	const {
		id: module_id,
		name,
		title,
		content,
		cover_photo,
		profile_photo,
	} = module;
	return (
		<View
			style={[
				styles.container,
				{ width: 0.9 * width, paddingBottom: enrolled ? 5 : 90 },
			]}
		>
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
				<Text
					style={{
						textTransform: "uppercase",
						textAlign: "center",
						fontWeight: 700,
						fontSize: 20,
						marginBottom: 5,
					}}
				>
					{title}
				</Text>
				<Text
					style={{
						textAlign: "center",
						lineHeight: 16,
						color: theme.colors.grey,
						lineHeight: 20,
					}}
				>
					{content.length > 110 ? content.slice(0, 100) + "..." : content}
				</Text>
				{/* {showRequiredLevel && (
					<Text
						style={{
							textAlign: "center",
							color: theme.colors.green,
							marginTop: 10,
						}}
					>
						Requirement: Level {required_user_level} and above
					</Text>
				)} */}

				{enrolled && (
					<View style={{ marginVertical: 14.08 }}>
						<Button
							onPress={() => {
								updateCurrentIndex(index - 1);
								navigation.navigate("Learning-screen", { module, index });
							}}
						>
							Learn More
						</Button>
					</View>
				)}

				<Pressable
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginTop: 8,
						paddingVertical: 10,
					}}
				>
					<Text style={{ color: theme.colors.green }}>Module {index}</Text>
				</Pressable>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignSelf: "center",
		borderWidth: 1,
		borderColor: theme.colors.white + "44",
		minHeight: "auto",
		borderRadius: 15.29008,
		overflow: "hidden",
		marginTop: 28,
	},
	image: {
		flex: 1,
		borderRadius: 15.29008,
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
