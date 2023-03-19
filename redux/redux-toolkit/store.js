import {
    configureStore
} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import authReducer from "./Authenfication/loginSlice"
import favoriReducer from "./favoriePostSlice"
import postReducer from "./postSlice"
export default configureStore({
    reducer:{
        user: userReducer,
        auth: authReducer,
        favorie: favoriReducer,
        post: postReducer
    }
})