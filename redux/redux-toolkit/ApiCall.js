import axios from "axios";
import { addUserStart, adduserSucces, addUserFaillure, addUserFaillureMessage } from "./userSlice";

const API_URL = 'https://node-sql-faye-api.vercel.app';

export const getUsers = async (dispatch) => {
    dispatch(addUserStart())
    try {
        const res = await axios.get(`${API_URL}/api/user`)

        dispatch(adduserSucces(res.data))
    } catch (error) {
        dispatch(addUserFaillure(error.response.data))
    }
}