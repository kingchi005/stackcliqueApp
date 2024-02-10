import { BASE_URL } from ".";

export const getCourses = async () => {
	try {
		const res: TApiResponse<TCourseItem> = await (
			await fetch(`${BASE_URL}/courses?p=1`)
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const getCourseDetails = async (id: string) => {
	try {
		const res: TApiResponse<TCourse> = await (
			await fetch(`${BASE_URL}/courses/${id}`)
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const searchCourse = async (searchValue: string) => {
	const res: TApiResponse<TSearchedCourse[]> = await (
		await fetch(`${BASE_URL}/courses/search?title=${searchValue}`)
	).json();
	return res;
};

// export const searchCourse
