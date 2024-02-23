import io from "socket.io-client";
import { useAccessToken, useUserStore } from "../store/userStore";
import { BASE_URL, SOCKET_URL } from ".";
import { useSocket } from "./../store/socketStore";
const user_id = useUserStore.getState().id;

export const getSocket = () => {
	const token = useAccessToken.getState().token; // Retrieve jwt token from local storage or cookie
	let socket;
	try {
		socket = io(SOCKET_URL, {
			withCredentials: true,
			auth: { token },
		});
	} catch (error) {
		console.log(error);
	}

	return socket;

	// useSocket.getState().setSocket(socket);
	// useSocket.getState().setIsConnected(true);
	// console.log("socket initialised", socket);
};

export const getChannel = async (): Promise<TApiResponse<TChannel>> => {
	try {
		const res = await (await fetch(`${BASE_URL}/connect/channels`)).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};
export const getChannelErolled = async (): Promise<TApiResponse<TChannel>> => {
	try {
		const res = await (
			await fetch(`${BASE_URL}/connect/channels/${user_id}`)
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const postChatMessage = async ({ channel_id, message, sender_id }) => {
	try {
		const _res = await fetch(`${BASE_URL}/connect/chat-message`, {
			body: JSON.stringify({ channel_id, message, sender_id }),
			method: "post",
			headers: { "Content-Type": "application/json" },
		});
		// console.log("_res", _res);

		const res = await _res.json();
		// console.log("res", res);
		return res;
	} catch (error) {
		console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const getChannelDetails = async (
	id: string
): Promise<TApiResponse<TChannel>> => {
	try {
		const _res = await fetch(`${BASE_URL}/connect/channel/${id}`);
		// console.log("_res", _res);

		const res = await _res.json();
		// console.log("res", res);
		return res;
	} catch (error) {
		console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const socketEvents = {
	// ? once user is ready to go
	CONNECTED_EVENT: "connected",
	// ? when user gets disconnected
	DISCONNECT_EVENT: "disconnect",
	// ? when user joins a socket channel
	JOIN_CHAT_EVENT: "joinChat",
	// ? when participant gets removed from channel, chat gets deleted or leaves a channel
	LEAVE_CHAT_EVENT: "leaveChat",
	// ? when admin updates creates a new channel
	NEW_CHANNEL_EVENT: "newChannel",
	// ? when admin updates a channel name
	UPDATE_CHANNEL_NAME_EVENT: "updateChannelName",
	// ? when new message is received
	MESSAGE_RECEIVED_EVENT: "messageReceived",
	// ? when there is new one on one chat, new channel chat or user gets added in the channel
	NEW_CHAT_EVENT: "newChat",
	// ? when user gets added in the channel
	USER_ADD_TO_CHANNEL_EVENT: "userAddToChannelEvent",
	// ? when there is an error in socket
	SOCKET_ERROR_EVENT: "socketError",
	// ? when participant stops typing
	STOP_TYPING_EVENT: "stopTyping",
	// ? when participant starts typing
	TYPING_EVENT: "typing",
} as const;
export const socketEventMap = {
	// ? once user is ready to go
	connected: () => {},
	// ? when user gets disconnected
	disconnect: () => {},
	// ? when user joins a socket channel
	joinChat: () => {},
	// ? when participant gets removed from channel, chat gets deleted or leaves a channel
	leaveChat: () => {},
	// ? when admin updates creates a new channel
	newChannel: () => {},
	// ? when admin updates a channel name
	updateChannelName: () => {},
	// ? when new message is received
	messageReceived: () => {},
	// ? when there is new one on one chat, new channel chat or user gets added in the channel
	newChat: (chat: TChat) => {},
	// ? when user gets added in the channel
	userAddToChannelEvent: () => {},
	// ? when there is an error in socket
	socketError: () => {},
	// ? when participant stops typing
	stopTyping: () => {},
	// ? when participant starts typing
	typing: () => {},
} as const;
