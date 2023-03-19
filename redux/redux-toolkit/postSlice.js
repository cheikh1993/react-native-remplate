import {
    createSlice
} from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        loading: false,
        error: null,
        message: null,
        postCategorie: {},
    },

    reducers: {
        start: (state) => {
            state.loading = true
        },
        getPost: (state, action) => {
            state.loading = false,
                state.posts = action.payload
        },
        error: (state) => {
            state.loading = false,
                state.error = true
        },
        errorMessage: (state, action) => {
            state.loading = false,
                state.message = action.payload
        },

        getPostCategorie: (state, action) => {
            state.loading = false,
                state.postCategorie = action.payload
        }
    }
})

export const { start, getPost, error, errorMessage, getPostCategorie } = postSlice.actions
export default postSlice.reducer