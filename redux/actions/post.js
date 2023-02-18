import axios from "axios"

export const GET_POST = "GET_POST"

export const  getPost = async () => {
    return (dispatch)  => {
        try {
             const res = axios.get('http:3000/api/post');
             dispatch({type: GET_POST, paylaod: res.data});
        } catch (err) {
            console.log(err);
        }
    }
}