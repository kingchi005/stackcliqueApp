import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeName } from "./store";
// import SecureStorage from "expo-secure-store";
import * as SecureStore from "expo-secure-store";

type TUserStore = TUser & {
	update(user: TUser): void;
	resetUser(): void;
};

// AsyncStorage.clear();

const initialState: TUser = {
	id: "",
	email: "",
	username: "",
	cover_photo: "",
	enrolled_courses: [],
	notifications: [],
	level: 0,
	profile_photo: "",
	first_name: "",
	last_name: "",
	phone_number: "",
	date_of_birth: null,
	address: "",
};

export const useUserStore = create<TUserStore>()(
	persist(
		(set) => ({
			...initialState,
			update(user) {
				set(user);
			},
			resetUser() {
				set(initialState);
			},
		}),
		{ name: "user-db", storage: createJSONStorage(() => AsyncStorage) }
	)
);

export const useAccessToken = create<{
	token: string;
	update: (token: string) => void;
}>()(
	persist((set) => ({ token: "", update: (token) => set({ token }) }), {
		name: storeName.AUTH_KEY,

		// storage: createJSONStorage(() => SecureStore),
		storage: createJSONStorage(() => ({
			async getItem(name) {
				return await SecureStore.getItemAsync(name);
			},
			async setItem(name, value) {
				await SecureStore.setItemAsync(name, value);
			},
			async removeItem(name) {
				await SecureStore.deleteItemAsync(name);
			},
		})),
	})
);
