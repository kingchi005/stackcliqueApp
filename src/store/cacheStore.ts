import { create } from "zustand";

type TCacheStore = {
	courses: Map<string, TCourse>;
	cacheCourse(course: TCourse): void;
	getcourse(id: string): TCourse | null;

	channels: Map<string, TChannel>;
	cacheChannel(channel: TChannel): void;
	getChannel(id: string): TChannel | null;

	courseModule?: Map<string, TCourseModule>;
	cacheModule?(module: TCourseModule): void;
	getModule?(id: string): TCourseModule | null;
};

export const useCacheStore = create<TCacheStore>((set, get) => ({
	channels: new Map(),
	courses: new Map(),
	// courseModule: new Map(),
	cacheChannel(channel) {
		set((st) => {
			const cached = get().channels;
			cached.set(channel.id, channel);
			return { ...st, channels: cached };
		});
	},
	cacheCourse(course) {
		set((st) => {
			const cached = get().courses;
			cached.set(course.id, course);
			return { ...st, courses: cached };
		});
	},
	/* cacheModule(module) {
		set((st) => {
			const cached = get().courseModule;
			cached.set(module.id, module);
			return { ...st, courseModule: cached };
		});
	}, */
	getChannel(id) {
		const channels = get().channels;
		return channels.has(id) ? channels.get(id) : null;
	},
	getcourse(id) {
		const courses = get().courses;
		return courses.has(id) ? courses.get(id) : null;
	},
	/* 	getModule(id) {
		const module = get().courseModule;
		return module.has(id) ? module.get(id) : null;
	}, */
}));
