type TUIStore = {
	isAuthenticated: boolean;
	showModules: boolean;
};
type TChannel = {
	id: string;
	name: string;
	profile_photo: string;
	required_user_level: number;
	created_at: Date;
	members: TUser[];
	chatsMessages: TChat[];
	_count: {
		members: number;
	};
};

type TChat = {
	sender: {
		profile_photo: string | null;
		username: string;
	};
	id: string;
	sender_id: string;
	message: string;
	channel_id: string;
	created_at: Date;
};

type TUser = {
	id: string;
	email: string;
	username: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	date_of_birth?: Date;
	address?: string;
	level: 0;
	notifications: any[];
	profile_photo: string;
	cover_photo: string;
	enrolled_courses: TCourseEnrollment[];
};

type TCourseItem = {
	id: string;
	title: string;
	about: string;
	category: Category;
	profile_photo: string;
	cover_photo: string;
	required_user_level: number;
	reviews: any[];
	_count: Count;
};

type TCount = {
	enrollement: number;
	reviews: number;
	module: number;
};

type TCategory = {
	name: string;
};
type TSearchedCourse = Pick<
	TCourse,
	"id" | "title" | "reviews" | "profile_photo" | "_count"
>;
type TEnrolledCourse = {
	course: Pick<
		TCourse,
		| "id"
		| "title"
		| "category"
		| "about"
		| "profile_photo"
		| "cover_photo"
		| "required_user_level"
		| "_count"
	>;
	completed: boolean;
	completed_modules: number;
	enrolled_at: Date;
};
type TCourse = {
	id: string;
	title: string;
	about: string;
	profile_photo: string;
	cover_photo: string;
	instructor: string;
	category_id: string;
	rating: number;
	required_user_level: number;
	created_at: Date;
	updated_at: Date;
	category: Category;
	module: TCourseModule[];
	reviews: any[];
	_count: { enrollement: number; reviews: number; module: number };
};
type TCourseModule = {
	id: string;
	name: string;
	title: string;
	content: string;
	profile_photo: string;
	cover_photo: string;
};
type TCourseEnrollment = {};

type TApiResponse<D = unknown> =
	| {
			ok: false;
			error: { message: string; details: unknown };
	  }
	| { ok: true; message: string; data: D };
