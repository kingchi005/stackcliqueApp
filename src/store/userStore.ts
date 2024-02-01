import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TUserStore = TUser & {
	update: (user: TUser) => void;
};

export const useUserStore = create<TUserStore>()(
	persist(
		(set) => ({
			email: "",
			name: "",
			password: "",
			update(user) {
				set(user);
			},
		}),
		{ name: "user-db", storage: createJSONStorage(() => AsyncStorage) }
	)
);
