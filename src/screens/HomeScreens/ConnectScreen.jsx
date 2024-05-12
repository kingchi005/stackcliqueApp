import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useSocket } from "../../store/socketStore";
import {
	getChannel,
	getChannelErolled,
	getSocket,
	socketEvents,
} from "../../services/connectSerivce";
import { useNavigation } from "@react-navigation/native";
import {
	Button,
	Divider,
	FAB,
	Searchbar,
	TouchableRipple,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../components/theme/theme";
import Animated, {
	Easing,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { faker } from "@faker-js/faker";
import { useCacheStore } from "../../store/cacheStore";

export default function ConnectScreen() {
	const navigation = useNavigation();
	const socket = useSocket((st) => st.socket);
	const isConnected = useSocket((st) => st.isConnected);
	// const [socket, setSocket] = useState(null);
	/**@type {[channels:TChannel[], setChannels:()=>void]} */
	const [channels, setChannels] = useState([]);
	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const s = getSocket();
		useSocket.getState().setSocket(s);
		fetchChannels();
	}, []);

	const fetchChannels = async () => {
		setError(null);
		setIsFetching(true);
		const _res = await getChannelErolled();
		// console.log(_res);

		if (!_res.ok) {
			setIsFetching(false);
			setError(_res.error.message);
			return;
		}

		setChannels(_res.data);
		setError(null);
		setIsFetching(false);
	};

	// console.log(isConnected);
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
		// When the component using this hook unmounts or if `socket` or `chats` change:
		return function didUnmount() {
			socket.disconnect();
			socket.removeAllListeners();
		};
	}, []);
	const handleChannelCLick = () => {};

	return (
		<View style={{ flex: 1, paddingHorizontal: 10 }}>
			<Text style={{ fontWeight: "600", fontSize: 18, marginVertical: 5 }}>
				Channels
			</Text>
			<Searchbar style={{ marginTop: 10, marginBottom: 20 }} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Divider />

				{channels.length > 0 &&
					!isFetching &&
					!error &&
					channels.map((channel, i) => (
						<Fragment key={i}>
							<TouchableRipple
								onPress={() =>
									navigation.navigate("chat-screen", {
										title: channel.name,
										channel_id: channel.id,
										channel_avatar: channel.profile_photo,
									})
								}
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
									<Text style={{ fontSize: 16, textTransform: "capitalize" }}>
										{channel.name}
									</Text>
									<Ionicons size={20} name="chevron-forward" />
								</View>
							</TouchableRipple>
							<Divider />
						</Fragment>
					))}

				{!isFetching && channels.length == 0 && error?.length > 0 && (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
	);
}

function mockChannel() {
	/** @type {TChannel[]} */
	const _cachedChannels = [...Array(10)].map((it, i) => ({
		id: faker.string.alphanumeric(),
		name: faker.company.name(),
		profile_photo: faker.image.urlPicsumPhotos(),
	}));

	setError(null);
	setIsFetching(false);

	setChannels(_cachedChannels);
}
