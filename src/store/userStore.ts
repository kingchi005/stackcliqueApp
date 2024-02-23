import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeName } from "./store";

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
		storage: createJSONStorage(() => AsyncStorage),
	})
);
