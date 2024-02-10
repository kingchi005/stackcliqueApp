import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storeName } from "./store";

type TUserStore = TUser & {
	update: (user: TUser) => void;
	updateId: (id: string) => void;
};

// AsyncStorage.clear();

export const useUserStore = create<TUserStore>()(
	persist(
		(set) => ({
			id: "",
			email: "",
			username: "",
			password: "",
			cover_photo: "",
			enrolled_courses: [],
			notifications: [],
			level: 0,
			profile_photo: "",
			update(user) {
				set((prev) => ({ ...user, id: prev.id }));
			},
			updateId(id) {
				set((prev) => ({ ...prev, id }));
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
