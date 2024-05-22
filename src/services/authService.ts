import { BASE_URL } from ".";
import { useAccessToken, useUserStore } from "../store/userStore";

type TResgister = { email: string; password: string; username: string };
export const registerUser = async ({
	email,
	password,
	username,
}: TResgister): Promise<
	TApiResponse<{
		id: string;
		username: string;
		email: string;
	}>
> => {
	try {
		const _res = await fetch(`${BASE_URL}/auth/signup-email`, {
			body: JSON.stringify({ email, username, password }),
			method: "post",
			headers: { "Content-Type": "application/json" },
		});
		const res = await _res.json();
		return res;
	} catch (error) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const loginUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<
	TApiResponse<{
		id: string;
		username: string;
		email: string;
		UserAccessToken: string;
	}>
> => {
	try {
		const _res = await fetch(`${BASE_URL}/auth/login`, {
			body: JSON.stringify({ email, password }),
			method: "post",
			headers: { "Content-Type": "application/json" },
		});
		// console.log(JSON.stringify(_res.headers.get("ori"), null, 2));
		const res = await _res.json();
		// console.log(res);
		return res;
	} catch (error) {
		console.log(error);

		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const getUserDetails = async (
	id: string
): Promise<TApiResponse<TUser>> => {
	const API_KEY = useAccessToken.getState().token;
	// console.log(API_KEY);
	try {
		const _res = await fetch(`${BASE_URL}/user/${id}`, {
			headers: { authorization: API_KEY },
		});
		const res = await _res.json();
		return res;
	} catch (error) {
		// console.log("error", error);
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const logoutUser = () => {
	useAccessToken.getState().update("");
	useUserStore.getState().resetUser();
};

export const refreshController = async () => {
	// refetch user details
	const userDetails = getUserDetails;
	// refetch courses
};
