type TUIStore = {
	isAuthenticated: boolean;
	showModules: boolean;
};

type TUser = {
	id: string;
	email: string;
	// password: string;
	username: string;
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
