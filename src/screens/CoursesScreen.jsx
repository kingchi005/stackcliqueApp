import React from "react";
import {
	View,
	Text,
	ScrollView,
	FlatList,
	useWindowDimensions,
	Pressable,
} from "react-native";
import { Button, Card, Chip, IconButton, Searchbar } from "react-native-paper";
import { theme } from "../components/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CoursesScreen() {
	const navigation = useNavigation();
	const { bottom } = useSafeAreaInsets();
	const { width, fontScale } = useWindowDimensions();
	return (
		<View style={{ margin: 10 }}>
			<Searchbar onFocus={() => navigation.navigate("Search")} />
			{/* <ScrollView
				style={{ marginVertical: 20 }}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 5 }}
			> */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexDirection: "row",
					gap: 10,
					flexWrap: "wrap",
					marginTop: 5,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
						marginVertical: 10,
						overflow: "scroll",
						flexWrap: "wrap",
					}}
				>
					{[
						"Design",
						"Development",
						"Data science",
						"Business",
						"Marketing",
					].map((text, i) => (
						<Pressable
							style={{
								backgroundColor: theme.colors.primaryColor,
								borderRadius: 20,
								padding: 5,
								paddingHorizontal: 10,
								color: theme.colors.white,
							}}
							key={i}
						>
							<Text
								style={{
									color: theme.colors.white,
								}}
							>
								{text}
							</Text>
						</Pressable>
					))}
				</View>

				{[1, 2, 3, 4, 5, 443, 53, 4, 35].map((it, i) => (
					<View
						key={i}
						style={{
							width: width * 0.459,
						}}
					>
						<Card
							mode="outlined"
							style={{
								borderColor: "#ccccccff",
								backgroundColor: theme.colors.white,
							}}
						>
							<Card.Cover
								style={{ height: 100 }}
								source={require("../../assets/images-from-figma/css-img.jpg")}
							/>
							<Card.Content style={{ padding: 0, marginTop: 10 }}>
								<Text
									style={{
										color: theme.colors.primaryColor,
										fontSize: 14,
										textAlign: "left",
										fontWeight: "600",
									}}
								>
									Web Development FrontEnd FUll Course
								</Text>
								<Text style={{ color: theme.colors.grey, fontSize: 11.5 }}>
									Instructor: Aguwanmi Ent.
								</Text>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<View>
										<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
											<Ionicons
												name="star-outline"
												color={"yellow"}
												size={10}
											/>
											4.9: (13.5k reviews)
										</Text>
										<Text style={{ color: theme.colors.grey, fontSize: 10 }}>
											<Ionicons name="person-outline" size={10} />
											120k students enrolled
										</Text>
									</View>
									<IconButton
										icon={() => (
											<Ionicons
												size={35}
												style={{ borderRadius: 5 }}
												color={theme.colors.primaryColor}
												name="arrow-forward-circle"
											/>
										)}
									/>
								</View>
							</Card.Content>
						</Card>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
