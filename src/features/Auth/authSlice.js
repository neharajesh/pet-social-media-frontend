import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../Api/AuthApi";

export const signinUser = createAsyncThunk("auth/signinUser", async(userDetails) => {
    const response = await loginUser(userDetails)
    console.log(response)
    if(response?.errMessage) {
        console.log("Error occurred while signing in user")
        return { message: response.message, errMessage: response.errMessage }
    }
    return { user: response.user, token: response.authToken, message: response.message }
})

export const signupUser = createAsyncThunk("auth/signupUser", async(userDetails) => {
    const response = await registerUser(userDetails)
    console.log(response)
    if(response?.errMessage) {
        console.log("Error occurred while signing up user")
        return { errMessage: response.errMessage, message: response.message }
    }
    return { message: response.message }
})

const initialState = {
    user: {},
    token: "",
    error: "",
    loading: false,
    message: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: () => {
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