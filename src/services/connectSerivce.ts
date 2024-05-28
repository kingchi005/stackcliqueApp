import io from "socket.io-client";
import { useAccessToken, useUserStore } from "../store/userStore";
import { BASE_URL, SOCKET_URL } from ".";
import { useSocket } from "./../store/socketStore";

export const getSocket = () => {
	const token = useAccessToken.getState().token;
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
};

export const getChannels = async (): Promise<TApiResponse<TChannel>> => {
	const token = useAccessToken.getState().token;

	try {
		const res = await (
			await fetch(`${BASE_URL}/connect/channels`, {
				headers: { authorization: token },
			})
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};
export const getChannelErolled = async (): Promise<TApiResponse<TChannel>> => {
	const token = useAccessToken.getState().token;

	const user_id = useUserStore.getState().id;

	try {
		const res = await (
			await fetch(`${BASE_URL}/connect/channels/${user_id}`, {
				headers: { authorization: token },
			})
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const postChatMessage = async ({ channel_id, message, sender_id }) => {
	const token = useAccessToken.getState().token;

	try {
		const _res = await fetch(`${BASE_URL}/connect/chat-message`, {
			body: JSON.stringify({ channel_id, message, sender_id }),
			method: "post",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const res = await _res.json();
		return res;
	} catch (error) {
		console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};
type param = {
	fisrtName: string;
	lastName: string;
	dateOfBirth: string;
	address: string;
};
export const updateUserDetails = async (
	data: param
): Promise<TApiResponse<TUser>> => {
	const token = useAccessToken.getState().token;

	const user_id = useUserStore.getState().id;
	try {
		const _res = await fetch(`${BASE_URL}/user/${user_id}`, {
			body: JSON.stringify(data),
			method: "put",
			headers: {
				"Content-Type": "application/json",
				authorization: token,
			},
		});
		const res = await _res.json();
		return res;
	} catch (error) {
		console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};
export const joinChannelRequest = async (
	channel_id: string
): Promise<TApiResponse> => {
	const token = useAccessToken.getState().token;

	const user_id = useUserStore.getState().id;

	try {
		const _res = await fetch(
			`${BASE_URL}/connect/channel/${channel_id}/${user_id}`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
					authorization: token,
				},
			}
		);
		const res = await _res.json();
		return res;
	} catch (error) {
		console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const getChannelDetails = async (
	id: string
): Promise<TApiResponse<TChannel>> => {
	const token = useAccessToken.getState().token;

	try {
		const _res = await fetch(`${BASE_URL}/connect/channel/${id}`, {
			headers: { authorization: token },
		});
		const res = await _res.json();
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

export function formateDate(date) {
	const h = new Date(date).getHours();
	const min = new Date(date).getMinutes();
	const ampm = h >= 12 ? "PM" : "AM";
	return `${h % 12}:${min.toString().padStart(2, "0")} ${ampm}`;
}
