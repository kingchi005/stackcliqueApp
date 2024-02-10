import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "pullstate";
import { create as createStore } from "zustand";
import type {} from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export const UIStore = new Store({
	isAuthenticated: false,
	showModules: true,
});

// AsyncStorage.clear();
export const useIsInitialising = createStore<{
	isInitialising: boolean;
	setIsInitialising: (isInitialising: boolean) => void;
}>((set) => ({
	isInitialising: true,
	setIsInitialising(isInitialising) {
		set({ isInitialising });
	},
}));
export const useUIStore = createStore<
	TUIStore & { authenticate: () => void; toggleShowModules: () => void }
>()(
	persist(
		(set, get) => ({
			isAuthenticated: false,
			showModules: true,
			authenticate: () => set((st) => ({ ...st, isAuthenticated: true })),
			toggleShowModules: () =>
				set((st) => ({ ...st, showModules: !st.showModules })),
		}),
		{ name: "ui-store", storage: createJSONStorage(() => AsyncStorage) }
	)
);
export const storeName = {
	ALREADY_LAUNCHED: "already-Launched", // boolean
	LOGIN_COUNT: "login-Count", // number
	ONBOARDING: "@app:onboarding", //boolean
	AUTH_KEY: "access-token", // string
} as const;

export const useOnboarding = createStore<{
	onboarded: 1 | 0;
	confirm: () => void;
}>()(
	persist(
		(set) => ({
			onboarded: 0,
			confirm: () => set({ onboarded: 1 }),
		}),
		{
			name: storeName.ONBOARDING,
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
// export const useLoginCount = createStore<{
// 	alreadyLaunched: boolean;
// 	confirm: () => void;
// }>()(
// 	persist(
// 		(set) => ({
// 			alreadyLaunched: false,
// 			confirm: () => set({ alreadyLaunched: true }),
// 		}),
// 		{
// 			name: storeName.ALREADY_LAUNCHED,
// 			storage: createJSONStorage(() => AsyncStorage),
// 		}
// 	)
// );
// export const useOnboarding = createStore<{
// 	alreadyLaunched: boolean;
// 	confirm: () => void;
// }>()(
// 	persist(
// 		(set) => ({
// 			alreadyLaunched: false,
// 			confirm: () => set(({}) => ({ alreadyLaunched: true })),
// 		}),
// 		{
// 			name: storeName.ALREADY_LAUNCHED,
// 			storage: createJSONStorage(() => AsyncStorage),
// 		}
// 	)
// );
/* 
export const useLoginCount = (set) => ({
	alreadyLaunched: false,
	confirm: set((st) => ({ alreadyLaunched: true })),
});
export const useOnboarding = (set) => ({
	alreadyLaunched: false,
	confirm: set((st) => ({ alreadyLaunched: true })),
});

*/
