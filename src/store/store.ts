import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "pullstate";
import { create as createStore } from "zustand";
import type {} from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

export const UIStore = new Store({
	isAuthenticated: false,
	showModules: true,
});

export const useUIStore = createStore<TUIStore>()(
	persist(
		(set, get) => ({
			isAuthenticated: false,
			showModules: true,
			authenticate: () => set((st) => ({ isAuthenticated: true, ...st })),
			toggleShowModules: () =>
				set((st) => ({ showModules: !st.showModules, ...st })),
		}),
		{ name: "ui-store", storage: createJSONStorage(() => AsyncStorage) }
	)
);

export const storeName = {
	ALREADY_LAUNCHED: "already-Launched", // boolean
	LOGIN_COUNT: "login-Count", // number
	ONBOARDING: "@app:onboarding", //boolean
};

export const useLauched = createStore<{
	alreadyLaunched: boolean;
	confirm: () => void;
}>()(
	persist(
		(set) => ({
			alreadyLaunched: false,
			confirm: () => set(({}) => ({ alreadyLaunched: true })),
		}),
		{
			name: storeName.ALREADY_LAUNCHED,
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
export const useLoginCount = createStore<{
	alreadyLaunched: boolean;
	confirm: () => void;
}>()(
	persist(
		(set) => ({
			alreadyLaunched: false,
			confirm: () => set(({}) => ({ alreadyLaunched: true })),
		}),
		{
			name: storeName.ALREADY_LAUNCHED,
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
export const useOnboarding = createStore<{
	alreadyLaunched: boolean;
	confirm: () => void;
}>()(
	persist(
		(set) => ({
			alreadyLaunched: false,
			confirm: () => set(({}) => ({ alreadyLaunched: true })),
		}),
		{
			name: storeName.ALREADY_LAUNCHED,
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
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
