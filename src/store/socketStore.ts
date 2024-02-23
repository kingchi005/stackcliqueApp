import io, { Socket } from "socket.io-client";
import { create } from "zustand";
import { socketEventMap, socketEvents } from "../services/connectSerivce";

type TSocket = Socket<typeof socketEventMap, any>;

type TSocketStore = {
	socket: TSocket;
	isConnected: boolean;
	setIsConnected: (value: boolean) => void;
	setSocket: (socket: TSocket) => void;
};
export const useSocket = create<TSocketStore>((set) => ({
	socket: null,
	isConnected: false,
	setIsConnected(value) {
		set((st) => ({ ...st, isConnected: value }));
	},
	setSocket(socket) {
		set((st) => ({ ...st, socket }));
	},
}));
