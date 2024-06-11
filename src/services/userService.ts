import { faker } from "@faker-js/faker";
import { BASE_URL } from ".";
import { useAccessToken, useUserStore } from "../store/userStore";

export const getNotifications = async (): Promise<
	TApiResponse<TNotification[]>
> => {
	const API_KEY = useAccessToken.getState().token;
	const id = useUserStore.getState().id;

	try {
		const res = await (
			await fetch(`${BASE_URL}/user/notifications/${id}`, {
				headers: { Authorization: API_KEY },
			})
		).json();
		return res;
	} catch (error: any) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};

type TCldSig = {
	cloudname: string;
	api_key: string;
	timestamp: number;
	signature: string;
};

export const getCloudinarySignature = async (): Promise<
	TApiResponse<TCldSig>
> => {
	const API_KEY = useAccessToken.getState().token;

	try {
		const res = await (
			await fetch(`${BASE_URL}/user/cld-sig`, {
				headers: { Authorization: API_KEY },
			})
		).json();
		return res;
	} catch (error: any) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};
export const uploadToCloudinary = async ({
	cloudname,
	api_key,
	file,
	signature,
	timestamp,
}: {
	file: string;
} & TCldSig): Promise<TApiResponse<TCloudinaryRes>> => {
	const url = `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`;
	try {
		const res: TCloudinaryRes = await (
			await fetch(url, {
				method: "post",
				body: JSON.stringify({ api_key, file, signature, timestamp }),
				headers: { "Content-Type": "application/json" },
			})
		).json();

		if (!res.secure_url)
			return {
				ok: false,
				error: { message: "Uploaded Unsuccessful", details: res },
			};

		return { ok: true, message: "Uploaded Successfully", data: res };
	} catch (error: any) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};
export const updateProfilePhoto = async (
	profile_photo: string
): Promise<TApiResponse<TUser>> => {
	const API_KEY = useAccessToken.getState().token;
	const id = useUserStore.getState().id;

	try {
		const _res = await fetch(`${BASE_URL}/user/avatar/${id}`, {
			body: JSON.stringify({ profile_photo }),
			method: "put",
			headers: {
				"Content-Type": "application/json",
				authorization: API_KEY,
			},
		});
		const res = await _res.json();
		return res;
	} catch (error: any) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const handleImageUpload = async (
	file: string
): Promise<TApiResponse<TCloudinaryRes | TCloudinaryRes>> => {
	try {
		const sigRes = await getCloudinarySignature();
		if (!sigRes.ok) return sigRes;

		const uploadedRes = await uploadToCloudinary({ file, ...sigRes.data });

		return uploadedRes;

		// if (!uploadedRes.ok || !uploadedRes.data.secure_url) return uploadedRes;

		// const updatedPhotoRes = await updateProfilePhoto(
		// 	uploadedRes.data.secure_url
		// );

		// return updatedPhotoRes;
	} catch (error: any) {
		return { ok: false, error: { message: error.message, details: error } };
	}
};

export const createFakeNotifications = (num: number) =>
	[...Array(num)].map((_) => ({
		id: faker.string.uuid(),
		created_at: faker.date.anytime(),
		message: faker.commerce.productDescription(),
		title: faker.company.name(),
	}));
