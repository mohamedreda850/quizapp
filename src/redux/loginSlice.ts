import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,

    },
    reducers: {
        login: (state, action) => {
            
        },
        logout: (state) => {
            state.user = null;
        }
    }
})