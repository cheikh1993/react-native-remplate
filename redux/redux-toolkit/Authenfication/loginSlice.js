import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "login",
    initialState:{
        user:{},
        loading: null,
        error: false,
    message: null,
    },
    reducers:{
        loginStart: (state) => { state.loading = true},
        loginSuccess: (state, action) => {
            state.loading= false,
            state.user = action.payload

        },
        loginFaillure:(state) => {
            state.error = true,
            state.loading= false
        },
        message:(state,actoin) => {
            state.message = actoin.payload
        }
    }
})

export const {loginStart,loginSuccess,loginFaillure, message} = authSlice.actions;
export  default authSlice.reducer;