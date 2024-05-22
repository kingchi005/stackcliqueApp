import { BASE_URL } from ".";
import { useAccessToken } from "../store/userStore";

export const getCourses = async () => {
	const API_KEY = useAccessToken.getState().token;

	try {
		const res: TApiResponse<TCourseItem> = await (
			await fetch(`${BASE_URL}/courses?p=1`, {
				headers: { Authorization: API_KEY },
			})
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const getCourseDetails = async (id: string) => {
	const API_KEY = useAccessToken.getState().token;

	try {
		const res: TApiResponse<TCourse> = await (
			await fetch(`${BASE_URL}/courses/${id}`, {
				headers: { Authorization: API_KEY },
			})
		).json();
		return res;
	} catch (error) {
		// console.log(error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const searchCourse = async (searchValue: string) => {
	const API_KEY = useAccessToken.getState().token;

	const res: TApiResponse<TSearchedCourse[]> = await (
		await fetch(`${BASE_URL}/courses/search?title=${searchValue}`, {
			headers: { Authorization: API_KEY },
		})
	).json();
	return res;
};

// export const searchCourse
