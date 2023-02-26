import {
    createSlice
} from "@reduxjs/toolkit"

export const favorieSlice = createSlice({
    name: "favorie",
    initialState: {
        loading: false,
        favorie: {},
        error: false
    },
    reducers: {

        starLoading: (state) => { state.loading = true },
        getFavorie: (state, action) => {
            state.loading = false,
                state.favorie = action.payload

        },
        faillure: (state, action) => {
             state.error = action.payload,
              state.loading = false 
            
            },
    }


})

export const { starLoading, getFavorie, faillure } = favorieSlice.actions
export default favorieSlice.reducer