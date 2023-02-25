import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "login",
    initialState:{
        user:{},
        padding: false,
        error: false
    },
    reducers:{
        loginStart: (state) => {
                state.padding= true
        },
        loginSuccess: (state, action) => {
            state.padding= false,
            state.user = action.payload

        },
        loginFaillure:(state) => {
            state.error = true,
            state.padding= false
        }
    }
})

export const {loginStart,loginSuccess,loginFaillure} = authSlice.actions;
export  default authSlice.reducer;