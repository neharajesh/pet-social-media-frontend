import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../Api/AuthApi";

export const signinUser = createAsyncThunk("auth/signinUser", async(userDetails) => {
    const response = await loginUser(userDetails)
    if(response?.errMessage) {
        return { message: response.message, errMessage: response.errMessage }
    }
    if(!response.success) {
        return { user: {}, token: "", message: response.message }
    }
    return { user: response.user, token: response.authToken, message: response.message }
})

export const signupUser = createAsyncThunk("auth/signupUser", async(userDetails) => {
    const response = await registerUser(userDetails)
    if(!response.success) {
        return { errMessage: response.errMessage, message: response.message }
    }
    return { message: response.message }
})

let initialUserObj = {
    _id: "",
    isAdmin: false,
    following: [],
    followers: [],
    username: "",
    password: ""
}

let initialUser = localStorage.getItem("snsUser") ? JSON.parse(localStorage.getItem("snsUser")) : initialUserObj
let initialToken = localStorage.getItem("snsToken") ? JSON.parse(localStorage.getItem("snsToken")) : ""

const initialState = {
    user: initialUser,
    token: initialToken,
    error: "",
    loading: false,
    message: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: () => {
            localStorage.removeItem("snsUser")
            localStorage.removeItem("snsToken")
            return {
                user: {},
                token: "",
                error: "",
                loading: false,
                message: ""
            }
        }
    },
    extraReducers: {
        [signinUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.errMessage
            state.message = action.payload.message
        },
        [signinUser.pending]: (state) => {
            state.loading = true
        },
        [signinUser.fulfilled]: (state, action) => {
            localStorage.setItem("snsUser", JSON.stringify(action.payload.user))
            localStorage.setItem("snsToken", JSON.stringify(action.payload.token))
            state.user = action.payload.user
            state.token = action.payload.token
            state.error = ""
            state.loading = false
            state.message = action.payload.message
        },
        [signupUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.errMessage
            state.message = action.payload.message
        },
        [signupUser.pending]: (state) => {
            state.loading = true
        },
        [signupUser.fulfilled]: (state, action) => {
            state.user = {}
            state.token = ""
            state.error = ""
            state.loading = false
            state.message = action.payload.message
        }
    }
})

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer