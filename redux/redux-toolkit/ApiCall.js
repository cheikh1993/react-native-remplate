import axios from "axios";
import { addUserStart, adduserSucces, addUserFaillure, addUserFaillureMessage } from "./userSlice";
import {
    loginStart,
    loginSuccess,
    loginFaillure,
    message
} from "./Authenfication/loginSlice"

import { starLoading, getFavorie, faillure, addFavoriePost } from "./favoriePostSlice";
const API_URL = 'https://node-sql-faye-api.vercel.app';


// Get USERS
export const getUsers = async (dispatch) => {
    dispatch(addUserStart())
    try {
        const res = await axios.get(`${API_URL}/api/user`)

        dispatch(adduserSucces(res.data))
    } catch (error) {
        dispatch(addUserFaillure(error.response.data))
    }
}

//=============AUTHENTIFICATION=============//

//----------LOGIN----------------//
export const login = async  (user, dispatch) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`${API_URL}/api/user/login`, user)
            dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFaillure(error.response.data))
        dispatch(message(error.response.data));
    }

}

//=======================Favorie Post===================//

//-----------------Get All favorie post---------------//

export const getFavoriePost = async (userId, dispatch) => {
    dispatch(starLoading())
    try {
        const res = await axios.get(`${API_URL}/api/favorie?userId=` + userId)

        dispatch(getFavorie(res.data))
    } catch (error) {
        dispatch(faillure(error.response.data))
    }
}

//----------------Add a favorite post----------------//
export const AddFavorie = async (favorie, dispatch) => {
    dispatch(starLoading())
    try {
        const res = await axios.post(`${API_URL}/api/favorie/add`,favorie)
            dispatch(addFavoriePost(res.data))
    } catch (error) {
        dispatch(faillure(error.response.data))
    }
}
