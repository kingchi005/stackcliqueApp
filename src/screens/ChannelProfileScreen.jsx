import { Ionicons } from "@expo/vector-icons";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput as TextInput_,
	View,
} from "react-native";
import {
	Avatar,
	Button,
	Divider,
	IconButton,
	List,
	Switch,
	TextInput,
	TouchableRipple,
} from "react-native-paper";
import { theme } from "../components/theme/theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCacheStore } from "../store/cacheStore";
import { useUserStore } from "../store/userStore";

export default function ChannelProfileScreen({ route }) {
	const userId = useUserStore((st) => st.id);
	const [recieveNotify, setRecieveNotify] = useState(false);
	const [description, setDescription] = useState("");
	const channel = useCacheStore.getState().getChannel(route.params.channel_id);

	const channelMembers = (function youFirst(id, members) {
		const you = members.find((me) => me.id == id);
		const others = members.filter((me) => me.id != id);
		return [you, ...others];
	})(userId, channel.members);

	useEffect(() => {
		setDescription(channel.description || "");
	}, []);

	/**@type {React.MutableRefObject<BottomSheet>} */
	const bottomSheetRef = useRef(null);
	/**@type {React.Ref<TextInput_>} */
	const descInputRef = useRef(null);

	const snapPoints = useMemo(() => ["60%", "75%"], []);

	const handleSheetChange = useCallback((index) => {
		// console.log("handleSheetChange", index);
	});

	const closeSheet = () => {
		bottomSheetRef.current.close();
	};
	const openSheet = () => {
		bottomSheetRef.current.expand();
		descInputRef.current.focus();
	};
	const handleSaveDescription = () => {
		// save to backend
		console.log(description);
		setDescription("");
		closeSheet();
	};
	return (
		<>
			<ScrollView
				style={{ flex: 1, paddingHorizontal: 10 }}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				<View
					style={{
						flexDirection: "column",
						alignItems: "center",
						marginBottom: 30,
					}}
				>
					{!"channel.profile.photo" ? (
						<Avatar.Image source={{ uri: "" }} />
					) : (
						<Ionicons
							color={theme.colors.background}
							style={{
								color: theme.colors.grey,
								marginTop: 20,
							}}
							// style={{ backfaceVisibility: theme.colors. }}
							size={150}
							name="people-circle-sharp"
						/>
					)}
					<Text
						style={{
							textTransform: "uppercase",
							color: theme.colors.primaryColor,
							fontWeight: "700",
						}}
					>
						Dev Team
					</Text>
					<View
						style={{
							marginTop: 20,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 20,
						}}
					>
						{[
							{ name: "search-outline", onPress: () => {} },
							{ name: "videocam", onPress: () => {} },
							{ name: "person-add", onPress: () => {} },
						].map((icon, i) => (
							<Ionicons
								key={i}
								size={15}
								{...icon}
								color={theme.colors.primaryColor}
							/>
						))}
					</View>
				</View>
				{/* <Text style={{ marginBottom: 10 }}></Text> */}
				<View>
					<Divider />
					<TouchableRipple style={style.listItemContainer} onPress={openSheet}>
						<View style={style.listItem}>
							<Text>Add Channel description</Text>
							{/* <Switch /> */}
						</View>
					</TouchableRipple>
					<Divider />
					<TouchableRipple
						style={style.listItemContainer}
						onPress={() => setRecieveNotify((v) => !v)}
					>
						<View style={style.listItem}>
							<Text>NotificationScreen</Text>
							<Switch
								value={recieveNotify}
								color={theme.colors.primaryColor}
								onValueChange={setRecieveNotify}
							/>
						</View>
					</TouchableRipple>
					<Divider />
					<TouchableRipple style={style.listItemContainer} onPress={() => {}}>
						<View style={style.listItem}>
							<Text>Channel Lock</Text>
						</View>
					</TouchableRipple>
					<Divider />
					<TouchableRipple style={style.listItemContainer} onPress={() => {}}>
						<View style={style.listItem}>
							<Text>Media Visibility</Text>
						</View>
					</TouchableRipple>
					<Divider />
					<TouchableRipple style={style.listItemContainer} onPress={() => {}}>
						<View style={style.listItem}>
							<Text>Mute Channel</Text>
						</View>
					</TouchableRipple>
					<Divider />
				</View>
				<View style={{ marginTop: 10 }}>
					<Text
						style={{
							marginStart: 20,
							color: theme.colors.grey,
							marginBottom: 15,
						}}
					>
						{channelMembers.length} Members
					</Text>
					{channelMembers.map((item, key) => (
						<View
							key={key}
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 10,
								marginBottom: 10,
							}}
						>
							{item.profile_photo ? (
								<Avatar.Image size={35} source={{ uri: item.profile_photo }} />
							) : (
								<Ionicons
									color={theme.colors.background}
									style={{ color: theme.colors.grey }}
									size={35}
									name="person-circle"
								/>
							)}
							<Text style={{ fontWeight: "700" }}>{item.username}</Text>
						</View>
					))}
				</View>
			</ScrollView>
			<BottomSheet
				enablePanDownToClose
				ref={bottomSheetRef}
				keyboardBehavior="interactive"
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChange}
				containerStyle={{ marginHorizontal: 10 }}
				backgroundStyle={{
					backgroundColor: theme.colors.chatTabBg,
				}}
			>
				<View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
					<Text style={{ color: theme.colors.primaryColor }}>
						Add Channel description
					</Text>
					<TextInput
						disabled
						ref={descInputRef}
						outlineStyle={{
							borderRadius: 10,
							borderColor: theme.colors.grey,
							borderWidth: 1,
						}}
						mode="outlined"
						value={description}
						onChangeText={setDescription}
					/>
					<View
						style={{
							marginTop: 20,
							flexDirection: "row",
							justifyContent: "space-between",
							gap: 40,
						}}
					>
						<Button
							buttonColor={"#c00101"}
							textColor="#ddd"
							onPress={closeSheet}
							style={style.bottomSheetActionBtn}
						>
							<Text>Cancel</Text>
						</Button>
						<Button
							disabled={!description}
							buttonColor={theme.colors.green}
							textColor="#ddd"
							onPress={handleSaveDescription}
							style={style.bottomSheetActionBtn}
						>
							<Text>Save</Text>
						</Button>
					</View>
				</View>
			</BottomSheet>
		</>
	);
}

const style = StyleSheet.create({
	listItemContainer: {
		paddingVertical: 15,
		// marginVertical: 1,
		paddingHorizontal: 3,
		// backgroundColor: theme.colors.background ,
		// backgroundColor: "#eee",
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bottomSheetActionBtn: { borderRadius: 10, flex: 1 },
});

function ChannelDesc() {
	<View></View>;
}
