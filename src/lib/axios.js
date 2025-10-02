import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://be-mwg-electronics.onrender.com/api",
    withCredentials: true,
});
