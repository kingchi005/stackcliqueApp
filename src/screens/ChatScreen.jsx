import React, { useEffect, useRef, useState } from "react";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import BottomTab from "../components/Learn/BottomTab";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Surface, TextInput } from "react-native-paper";
import { theme } from "../components/theme/theme";
import { faker } from "@faker-js/faker";
import { useSocket } from "../store/socketStore";
import {
	getChannelDetails,
	postChatMessage,
	socketEvents,
} from "../services/connectSerivce";
import { useUserStore } from "../store/userStore";
import { useCacheStore } from "../store/cacheStore";

export default function ChatScreen({ route }) {
	const { title, channel_id } = route.params;
	const [chats, setChats] = useState([]);
	const [message, setMessage] = useState("");
	const [isFetching, setIsFetching] = useState(true);
	const socket = useSocket((st) => st.socket);
	const user_id = useUserStore((st) => st.id);
	const userName = useUserStore((st) => st.username);

	/**@type {React.MutableRefObject<ScrollView>} */
	const chatContainer = useRef(null);

	useEffect(() => {
		// setChats([]);
		fetchChannelChats();
	}, []);
	// console.log(sender_id);
	useEffect(function didMount() {
		// If the socket isn't initialized, we don't set up listeners.
		if (!socket) return;

		socket.emit(socketEvents.JOIN_CHAT_EVENT, channel_id);
		socket.on("newChat", ({ message, sender_id, channel_id: _channel_id }) => {
			console.log({ message, sender_id, channel_id: _channel_id });
			if (sender_id === user_id) return;
			if (_channel_id !== channel_id) return;

			addToChats({ message, byUser: sender_id === user_id });
		});
		return function didUnmount() {
			socket.off("newChat");
			socket.removeAllListeners();
		};
	}, []);
	const fetchChannelChats = async () => {
		const _res = await getChannelDetails(channel_id);
		// console.log(JSON.stringify(_res, null, 2));
		if (!_res.ok) {
			setIsFetching(false);
			return console.log(_res.error);
		}

		// cache here
		useCacheStore.getState().cacheChannel(_res.data);

		setChats(
			_res.data.chatsMessages.map(
				({ message, sender_id, created_at, sender: { username } }, it) => ({
					message,
					byUser: sender_id === user_id,
					created_at,
					username,
				})
			)
		);
		setIsFetching(false);
		setTimeout(() => {
			chatContainer.current.scrollToEnd();
		}, 500);
	};

	/**@param {{ message:string, byUser:boolean,created_at:Date,username:string}} chat  */
	function addToChats(chat) {
		setChats((prev) => [...prev, chat]);
		chatContainer.current.scrollToEnd();
	}
	const handleSendMessage = async () => {
		const chat = message;
		setMessage("");
		addToChats({
			message: chat,
			byUser: true,
			created_at: new Date().toISOString(),
			username: userName,
		});
		const _res = await postChatMessage({
			message: chat,
			channel_id,
			sender_id: user_id,
		});
		// console.log(_res);
	};

	return (
		<View style={{ flex: 1 }}>
			{isFetching ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size={50} />
				</View>
			) : (
				<ScrollView
					ref={chatContainer}
					style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
				>
					<InfoCard text={"Oct 11"} />
					<InfoCard text={`"You Joined ${title}"`} />
					{chats.length > 0 &&
						!isFetching &&
						chats.map((chat, i) => <ChatBoxCard key={i} {...chat} />)}
				</ScrollView>
			)}
			<ChatBottomTab
				handleSendMessage={handleSendMessage}
				message={message}
				onTyping={setMessage}
			/>
		</View>
	);
}

function InfoCard({ text }) {
	return (
		<Surface
			mode="elevated"
			elevation={2}
			style={{
				alignSelf: "center",
				paddingHorizontal: 20,
				marginVertical: 5,
				paddingVertical: 2,
			}}
		>
			<Text style={{ fontSize: 10 }}>{text}</Text>
		</Surface>
	);
}

function ChatBoxCard({ message, byUser, created_at, username }) {
	return (
		<>
			<View
				style={{
					// backgroundColor: theme.colors.primaryColor + "33",
					backgroundColor: "#dfc1dc",
					maxWidth: "60%",
					alignSelf: byUser ? "flex-end" : "flex-start",
					padding: 8,
					borderTopLeftRadius: byUser ? 15 : 0,
					borderTopRightRadius: byUser ? 0 : 15,
					borderBottomLeftRadius: 15,
					borderBottomRightRadius: 15,
					marginVertical: 8,
				}}
			>
				<View>
					<Text
						style={{
							fontSize: 12,
							alignSelf: "flex-start",
							color: theme.colors.primaryColor,
							marginBottom: 5,
							textTransform: "uppercase",
						}}
					>
						{username}
					</Text>
				</View>
				<Text
					style={{
						fontSize: 15,
						color: "#333",
						lineHeight: 15,
						textDecorationStyle: "solid",
					}}
				>
					{message}
				</Text>
				<View>
					<Text
						style={{
							fontSize: 10,
							alignSelf: "flex-end",
							color: theme.colors.grey,
							marginTop: 5,
						}}
					>
						{new Date(created_at).toLocaleTimeString()}
					</Text>
				</View>
			</View>
		</>
	);
}

function ChatBottomTab({ message, onTyping, handleSendMessage }) {
	const { width } = useWindowDimensions();
	return (
		<View
			style={{
				flexDirection: "row",
				bottom: 0,
				paddingBottom: 20,
				paddingTop: 5,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: theme.colors.background,
				width: "100%",
				left: 0,
				right: 0,
			}}
		>
			<Ionicons name="add-circle" size={30} color={"#ccc"} />
			<View
				style={{
					width: width * 0.7,
					marginHorizontal: 10,
				}}
			>
				<TextInput
					value={message}
					onChangeText={onTyping}
					mode="outlined"
					multiline
					outlineColor="#ffffffff"
					outlineStyle={{
						backgroundColor: "#fff",
						borderRadius: 10,
						borderWidth: 0,
					}}
					style={{ position: "relative", paddingEnd: 20, maxHeight: 85 }}
					placeholder="Type here..."
					placeholderTextColor={"#11111133"}
				/>
				<Ionicons
					name="happy-outline"
					style={{ position: "absolute", right: 9, top: 20 }}
					size={20}
				/>
			</View>
			{message ? (
				<Ionicons
					onPress={handleSendMessage}
					size={23}
					style={{
						color: theme.colors.primaryColor,
						padding: 5,
						borderRadius: 20,
						alignSelf: "center",
					}}
					name="md-send"
				/>
			) : (
				<Ionicons
					size={23}
					style={{
						backgroundColor: theme.colors.primaryColor,
						color: "#ccc",
						padding: 5,
						borderRadius: 20,
						alignSelf: "center",
					}}
					name="mic-outline"
				/>
			)}
		</View>
	);
}
