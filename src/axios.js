import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3001/",
});

instance.defaults.headers.common["Authorization"] = localStorage.getItem(
	"JWT_TOKEN"
);

export default instance;
