import React, { useState, useRef, useEffect } from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import BottomTab from "../../components/Learn/BottomTab";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../components/theme/theme";
import VideoPlayer from "../../components/UI/VideoPlayer";
import { useRoute } from "@react-navigation/native";
import { useCurrentCourse } from "../../store/courseStore";

export default function LearningScreen() {
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [firstTimeLoading, setFirstTimeLoading] = useState(true); // New state variable
	const [module, setModule] = useState(null);
	const videoRef = useRef(null);
	// /**@type {{module:TCourseModule}} */
	// const { module, _index} = useRoute().params;
	const modules = useCurrentCourse((st) => st.modules);
	const currentIndex = useCurrentCourse((st) => st.currentIndex);
	const next = useCurrentCourse((st) => st.nextModule);
	const previous = useCurrentCourse((st) => st.previousModule);

	useEffect(() => {
		updateModule();
	}, [currentIndex]);

	const updateModule = () => {
		setModule(modules[currentIndex]);
	};

	// Function to handle the refresh action
	const handleRefresh = () => {
		setRefreshing(true); // Start the pull to refresh animation

		// Simulate a 2-second loading delay for the video to refresh
		setTimeout(() => {
			setRefreshing(false); // End the pull to refresh animation
		}, 1000);
	};

	// Callback function to handle video loading state
	const handleVideoLoading = (isLoading) => {
		if (isLoading && firstTimeLoading) {
			// Show the initial loading indicator only on first time loading
			return;
		}

		if (!isLoading && firstTimeLoading) {
			// Video is loaded for the first time, set firstTimeLoading to false
			setFirstTimeLoading(false);
		}

		if (!isLoading) {
			// Video is loaded, automatically trigger the refresh
			handleRefresh();
		}
	};

	return (
		<View style={{ flex: 1, paddingHorizontal: 10.08 }}>
			{module && (
				<ScrollView
					style={{ flex: 1 }}
					refreshControl={
						firstTimeLoading ? null : ( // Conditionally render RefreshControl
							<RefreshControl
								refreshing={refreshing}
								onRefresh={handleRefresh}
								colors={[theme.colors.primaryColor]}
							/>
						)
					}
					showsVerticalScrollIndicator={false}
				>
					<View style={{ marginTop: 5 }}></View>
					{/* Pass the ref to VideoPlayer */}
					<VideoPlayer
						refreshing={refreshing}
						onVideoLoad={handleVideoLoading}
						ref={videoRef}
					/>
					<Text style={{ marginTop: 0, fontWeight: "700", fontSize: 16 }}>
						{module.title}
					</Text>
					<View style={{ flex: 1 }}>
						<ScrollView
							style={{ paddingBottom: 0 }}
							showsVerticalScrollIndicator={false}
						>
							<Text
								style={{
									fontSize: 15,
									lineHeight: 30,
									letterSpacing: 0.5,
									color: "grey",
									marginBottom: 80, // Add marginBottom to allow space for the bottom tab
								}}
							>
								{/* Your long text here */}
								{module.content}
								{/* ... */}
							</Text>
						</ScrollView>
					</View>
				</ScrollView>
			)}
			<BottomTab>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						width: "100%",
					}}
				>
					<TouchableOpacity
						onPress={() => previous()}
						style={[
							styles.arrowButtons,
							{
								backgroundColor:
									currentIndex === 0
										? theme.colors.grey
										: theme.colors.primaryColor,
							},
						]}
						disabled={currentIndex === 0}
					>
						<AntDesign name="left" size={24} color={theme.colors.white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.arrowButtons,
							{
								backgroundColor:
									currentIndex === modules.length - 1
										? theme.colors.grey
										: theme.colors.primaryColor,
							},
						]}
						disabled={currentIndex === modules.length - 1}
						onPress={() => next()}
					>
						<AntDesign name="right" size={24} color={theme.colors.white} />
					</TouchableOpacity>
				</View>
			</BottomTab>
		</View>
	);
}

const styles = StyleSheet.create({
	arrowButtons: {
		backgroundColor: theme.colors.primaryColor,
		color: theme.colors.white,
		paddingVertical: 10,
		paddingHorizontal: 30,
		alignItems: "center",
		borderRadius: 23,
	},
});
