import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.43.168:50",
});

// export const BASE_URL = "http://192.168.43.168:50";
export const BASE_URL = "https://stackclique.cyclic.cloud";

// const api = function createApiClient({ baseUrl }) {
// 	function get(url, config) {
// 		return fetch(url, config);
// 	}
// 	return {};
// };

export default api;
