import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useSocket } from "../../store/socketStore";
import {
	getChannels,
	getSocket,
	joinChannelRequest,
} from "../../services/connectSerivce";
import { useNavigation } from "@react-navigation/native";
import {
	Button,
	Dialog,
	Divider,
	FAB,
	Searchbar,
	TouchableRipple,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../components/theme/theme";
import Animated from "react-native-reanimated";
import { useAccessToken, useUserStore } from "../../store/userStore";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProvider,
	useBottomSheet,
} from "@gorhom/bottom-sheet";
import { logoutUser } from "../../services/authService";

export default function ConnectScreen() {
	const navigation = useNavigation();
	const socket = useSocket((st) => st.socket);
	const user = useUserStore.getState();
	const user_id = user.id;
	/**@type {[channels:TChannel[], setChannels:()=>void]} */
	const [channels, setChannels] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const s = getSocket();
		useSocket.getState().setSocket(s);
		fetchChannels();
	}, []);

	const [joinName, setJoinName] = useState("");
	const [channelId, setChannelId] = useState("");
	const [channelDesc, setChannelDesc] = useState("");
	const [errDialog, setErrDialog] = useState({
		show: false,
		channelLevel: 0,
		userLevel: 0,
	});
	/**@type {React.MutableRefObject<BottomSheetModal>} */
	const bottomSheetRef = useRef(null);
	/**@type {React.Ref<TextInput_>} */
	const descInputRef = useRef(null);
	const snapPoints = useMemo(() => ["30%", "45%", "65%", "100%"], []);
	const closeSheet = () => {
		bottomSheetRef.current.close();
	};
	const openSheet = () => {
		bottomSheetRef.current.present();
		// descInputRef.current.focus();
	};

	const fetchChannels = async () => {
		setError(null);
		setIsFetching(true);
		const _res = await getChannels();
		setIsFetching(false);

		if (!_res.ok) {
			const errMsg = _res.error.message;
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
			}

			setError(_res.error.message);
			return;
		}

		setChannels(_res.data);
		setError(null);
	};

	const handleJoinChannel = async () => {
		const res = await joinChannelRequest(channelId);
		if (!res.ok) {
			Alert.alert("Error", res.data.message);
			return;
		}
		closeSheet();
		if (Platform.OS == "android")
			ToastAndroid.show(res.message, ToastAndroid.SHORT);
		else Alert.alert(res.message);
		fetchChannels();
	};

	useEffect(function didMount() {
		// If the socket isn't initialized, we don't set up listeners.
		if (!socket) return;

		// Set up event listeners for various socket events:
		// Listener for when the socket connects.
		socket.on("connection", () => {
			console.log("socket connected");
		});
		socket.on("messageReceived", (message) => {
			console.log(message);
		});
		// When the component using this hook unmounts:
		return function didUnmount() {
			socket.disconnect();
			socket.removeAllListeners();
		};
	}, []);

	const handleChannelCLick = (channel, isMember) => {
		closeSheet();
		if (isMember)
			navigation.navigate("chat-screen", {
				title: channel.name,
				channel_id: channel.id,
				channel_avatar: channel.profile_photo,
			});
		else {
			const channelLevel = channel.required_user_level;
			const userLevel = user.level;
			setChannelId(channel.id);
			setJoinName(channel.name);
			setChannelDesc(channel.description);
			if (channelLevel > userLevel) {
				setErrDialog({ show: true, channelLevel, userLevel });

				return;
			}
			openSheet();
		}
	};

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[]
	);

	return (
		<BottomSheetModalProvider>
			<View style={{ flex: 1, paddingHorizontal: 10 }}>
				<Searchbar style={{ marginTop: 10, marginBottom: 20 }} />

				<ScrollView showsVerticalScrollIndicator={false}>
					<Text
						style={{
							color: theme.colors.primaryColor,
							textTransform: "uppercase",
							paddingVertical: 5,
							paddingBottom: 10,
						}}
					>
						Channels
					</Text>
					<Divider />

					{channels.length > 0 &&
						!isFetching &&
						!error &&
						channels.map((channel, i) => {
							const isMember = channel.members?.find(
								(user) => user.id === user_id
							);
							return (
								<Fragment key={i}>
									<TouchableRipple
										onPress={() => {
											handleChannelCLick(channel, isMember);
										}}
										style={{ paddingVertical: 12.5 }}
									>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
												paddingEnd: 20,
												paddingStart: 10,
											}}
										>
											<Text
												style={{ fontSize: 16, textTransform: "capitalize" }}
											>
												{channel.name}
											</Text>
											<Text> </Text>
											{isMember ? (
												<Ionicons size={20} name="chevron-forward" />
											) : (
												<Text
													style={{
														backgroundColor: `${theme.colors.chatTabBg}`,
														paddingHorizontal: 5,
														borderRadius: 5,
														fontSize: 10,
													}}
												>
													Join
												</Text>
											)}
										</View>
									</TouchableRipple>
									{/* <Divider /> */}
								</Fragment>
							);
						})}

					{!isFetching && channels.length == 0 && error?.length > 0 && (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Failed to fetch</Text>
							<Text>{error}</Text>
							<Button onPress={() => fetchChannels()}>
								<Text>Retry</Text>
							</Button>
						</View>
					)}
					{isFetching &&
						[...Array(7)].map((it, i) => (
							<Fragment key={i}>
								<Animated.View
									style={[
										{
											backgroundColor: "#99999933",
											height: 30,
											marginVertical: 5,
											borderRadius: 10,
										},
									]}
								></Animated.View>
								<Divider />
							</Fragment>
						))}
				</ScrollView>
				<FAB
					onPress={() => navigation.navigate("create-channel")}
					animated
					color="#ccc"
					icon="plus"
					mode="flat"
					size="medium"
					style={[
						{ backgroundColor: theme.colors.primaryColor },
						{
							margin: 16,
							bottom: 20,
							right: 0,
							position: "absolute",
							borderRadius: 50,
						},
					]}
				/>
			</View>
			<Dialog
				visible={errDialog.show}
				dismissable
				onDismiss={() => setErrDialog((prev) => ({ ...prev, show: false }))}
			>
				<Dialog.Title>
					<Text>Not Eligible</Text>
				</Dialog.Title>
				<Dialog.Content>
					<Text>
						You are not Eligible to join this channel channelLevel:{" "}
						{errDialog.channelLevel}
					</Text>
					<Text>userLevel: {errDialog.userLevel}</Text>
					<Text>
						You need {errDialog.channelLevel - errDialog.userLevel} points more
						to be eligible
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button
						onPress={() => setErrDialog((prev) => ({ ...prev, show: false }))}
						mode="text"
					>
						Got it
					</Button>
				</Dialog.Actions>
			</Dialog>
			<BottomSheetModal
				enablePanDownToClose
				ref={bottomSheetRef}
				backdropComponent={renderBackdrop}
				index={0}
				snapPoints={["30%", "45%"]}
				containerStyle={{}}
				backgroundStyle={{
					backgroundColor: theme.colors.chatTabBg,
					borderRadius: 50,
				}}
			>
				<View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
					<Text
						style={{
							color: theme.colors.primaryColor,
							textAlign: "center",
							fontSize: 18,
						}}
					>
						{joinName}
					</Text>
					<Ionicons
						color={theme.colors.background}
						style={{
							color: theme.colors.grey,
							textAlign: "center",
						}}
						size={70}
						name="people-circle-sharp"
					/>
					<Text
						style={{
							color: theme.colors.grey,
							textAlign: "center",
							fontSize: 18,
							marginBottom: 12,
							paddingHorizontal: 3,
						}}
					>
						{channelDesc}
					</Text>

					<Button
						contentStyle={{ paddingHorizontal: 70 }}
						// disabled={!isEligible}
						buttonColor={theme.colors.green}
						textColor="#ddd"
						onPress={handleJoinChannel}
						style={style.bottomSheetActionBtn}
					>
						Join Channel
					</Button>
				</View>
			</BottomSheetModal>
		</BottomSheetModalProvider>
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
	bottomSheetActionBtn: {
		borderRadius: 10,
		alignSelf: "center",
	},
	warningText: { textAlign: "center", color: theme.colors.grey },
});
