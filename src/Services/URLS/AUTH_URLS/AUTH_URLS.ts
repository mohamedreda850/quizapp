import axios from "axios";

const baseURL ="https://upskilling-egypt.com:3005/api/auth"
export const axiosInstance = axios.create({baseURL})
export const AUTH_URLS = {
REGISTER: '/register',
LOGIN: '/login',
FORGOT_PASSWORD: '/forgot-password',
RESETPASSWORD: '/reset-password',
}