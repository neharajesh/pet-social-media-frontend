import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteUserAccount, fetchAllUsers, fetchUserById, followUserById, unfollowUserById, updateUserDetails } from "../../Api/UsersApi"

export const loadAllUsers = createAsyncThunk("users/loadAllUsers", async() => {
    const response = await fetchAllUsers() 
    if(response?.errMessage) {
        return { message: response.message, error: response.errMessage }
    }
    return { users: response.data, message: response.message }
})

export const getUserById = createAsyncThunk("users/getUserById", async(userId) => {
    const response = await fetchUserById(userId)
    if(response?.errMessage) {
        return { message: response.message, error: response.errMessage }
    }
    return { currentUser: response.data, message: response.message }
})

export const updateUser = createAsyncThunk("users/updateUser", async(userId, userDetails) => {
    const response = await updateUserDetails(userId, userDetails)
    if(response?.errMessage) {
        return { message: response.message, error: response.errMessage }
    }
    return { currentUser: response.data, message: response.message }
})

export const followUser = createAsyncThunk("users/followUser", async(userId, userToFollowId) => {
    const response = await followUserById(userId, userToFollowId)
    console.log(response)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    if(!response.success) {
        return { message: response.message, currentUser: {} }
    }
    return { currentUser: response.data, message: response.message }
})

export const unfollowUser = createAsyncThunk("users/unfollowUser", async(userId, userToUnfollowId) => {
    const response = await unfollowUserById(userId, userToUnfollowId)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    if(!response.success) {
        return { message: response.message, currentUser: {} }
    }
    return { currentUser: response.data, message: response.message }
})

export const deleteUser = createAsyncThunk("users/deleteUser", async(userId) => {
    const response = await deleteUserAccount(userId)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { message: response.message }
})

const initialState = {
    usersList: [],
    currentUser: {},
    loading: false,
    message: "",
    error: ""
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: () => {
            return initialState
        }
    },
    extraReducers: {
        [loadAllUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [loadAllUsers.pending]: (state) => {
            state.loading = true
        },
        [loadAllUsers.fulfilled]: (state, action) => {
            state.usersList = action.payload.users
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [getUserById.rejected]: (state, action) => {
            state.message = action.payload.message
            state.loading = false
            state.error = action.payload.error
        },
        [getUserById.pending]: (state) => {
            state.loading = true
        },
        [getUserById.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
            state.currentUser = action.payload.currentUser
            state.message = action.payload.message
        },
        [updateUser.pending]: (state) => {
            state.loading = true
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentUser = action.payload.currentUser
            state.error = ""
        },
        [followUser.pending]: (state) => {
            state.loading = true
        },
        [followUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [followUser.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
            state.message = action.payload.message
            state.currentUser = action.payload.currentUser
        },
        [unfollowUser.pending]: (state) => {
            state.loading = true
        },
        [unfollowUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [unfollowUser.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
            state.message = action.payload.message
            state.currentUser = action.payload.currentUser
        },
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.error = action.payload.error
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.error = ""
            state.loading = false
            state.message = action.payload.message
            state.currentUser = {}
        }
    }
})

export const { reset } = userSlice.actions

export default userSlice.reducer