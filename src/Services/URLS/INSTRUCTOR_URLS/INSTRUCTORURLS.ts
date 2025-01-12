import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3005/api/";
export const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("quizToken")}`;
  return config;
});
export const QUESTION_URLS = {
  GET_ALL_QUESTION: "question",
  GET_QUESTION_BY_ID: (id: string) => `question/${id}`,
  CREATE_QUESTION: "question",
  UPDATE_QUESTION: (id: string) => `question/${id}`,
  DELETE_QUESTION: (id: string) => `question/${id}`,
};
export const GROPU_URLS = {
  GET_GRUOP: "group",
  CREATE_GRUOP: "group",
  GET_GRUOP_BY_ID: (id: string) => `group/${id}`,
  UPDATE_GRUOP: (id: string) => `group/${id}`,
  DELETE_GRUOP: (id: string) => `group/${id}`,
};

