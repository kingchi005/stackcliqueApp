import { create } from "zustand";

export const useCourseList = create<{
	courseList: TCourseItem[];
	setCourseList: (courseList: TCourseItem[]) => void;
}>((set) => ({
	courseList: [],
	setCourseList(courseList) {
		set({ courseList });
	},
}));
export const useCurrentCourse = create<{
	modules: TCourseModule[];
	currentIndex: number;
	nextModule: () => void;
	previousModule: () => void;
	setModule: (modules: TCourseModule[]) => void;
	setIndex: (index: number) => void;
}>((set, get) => ({
	modules: [],
	currentIndex: 0,
	nextModule() {
		set((st) => {
			if (get().currentIndex < get().modules.length - 1)
				return {
					...st,
					currentIndex: get().currentIndex + 1,
				};
			else return st;
		});
	},
	previousModule() {
		set((st) => {
			if (get().currentIndex > 0)
				return {
					...st,
					currentIndex: get().currentIndex - 1,
				};
			else return st;
		});
	},
	setIndex(index) {
		set((st) => ({ ...st, currentIndex: index }));
	},
	setModule(modules) {
		set((st) => ({ ...st, modules }));
	},
}));
