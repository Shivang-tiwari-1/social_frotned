
import axios from 'axios'
const BASE_URL = "http://localhost:4000";



const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export { axiosInstance, axiosPrivate };