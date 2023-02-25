import {
    configureStore
} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import authReducer from "./Authenfication/loginSlice"

export default configureStore({
    reducer:{
        user: userReducer,
        auth: authReducer
    }
})