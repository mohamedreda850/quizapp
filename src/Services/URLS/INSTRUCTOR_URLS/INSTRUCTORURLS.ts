import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3005/api/";
export const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use((config) => {

  config.headers.Authorization = `bearer ${localStorage.getItem("quizToken")}`
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

export const STUDENT_URLS = {
  GET_ALL_STUDENTS: "student",
  GET_STUDENT_BY_ID: (id: string) => `student/${id}`,
  TOP_FIVE_STUDENT: `/student/top-five`
}

export const QUIZ_URLS={
  GET_ALL_QUIZ:"quiz",
  GET_QUIZ_BY_ID:(id:string)=>`quiz/${id}`,
  CREATE_QUIZ:"quiz",
  UPDATE_QUIZ:(id:string)=>`quiz/${id}`,
  DELETE_QUIZ:(id:string)=>`quiz/${id}`,
  QUIZ_INCOMMING : `/quiz/incomming`
}
export const RESULT_URLS={
  GET_ALL_RESULT:"result",
  FIRST_FIVE_INCOMMING:"quiz/incomming",
  LAST_FIVE_COMPLETED:"quiz/completed",
  REASSIGN:(id:string)=>`result/reassign${id}`,
}

