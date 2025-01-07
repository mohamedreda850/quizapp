import { configureStore } from '@reduxjs/toolkit'
import { LoginSlice } from './loginSlice'

export const store = configureStore({
    reducer:{
        loginData:LoginSlice.reducer
    }
})