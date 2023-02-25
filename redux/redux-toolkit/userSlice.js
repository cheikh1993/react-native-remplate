import {
    createSlice
} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState:{
        userInfo:null,
        padding: false,
        error: false
    },
    reducers:{
        addUserStart:(state) => {
            state.padding= true
        },
        adduserSucces: (state, action)=>{
            state.padding = false,
            state.userInfo = action.payload
        },
        addUserFaillure: (state) => {
            state.error = true
            state.padding = false

        },
        

    }

    
})
export const { addUserStart, adduserSucces, addUserFaillure, addUserFaillureMessage } = userSlice.actions
export default userSlice.reducer;