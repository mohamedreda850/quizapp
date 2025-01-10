import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        user: localStorage.getItem("quizUser"),

    },
    reducers: {
      
        logout: (state) => {
            state.user = null;
        }
    }
})