import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewPost, commentPost, deletePost, getAllPosts, getPostById, likePost, updatePost } from "../../Api/PostApi";

export const fetchAllPosts = createAsyncThunk("post/fetchAllPosts", async() => {
    const response = await getAllPosts()
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { posts: response.sentData, message: response.message }
})

export const addPost = createAsyncThunk("post/addPost", async(postContent) => {
    const response = await addNewPost(postContent)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.receivedData, message: response.message }
})

export const fetchPostById = createAsyncThunk("post/fetchPostById", async(postId) => {
    const response = await getPostById(postId)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.sentData, message: response.message }
})

export const updatePostById = createAsyncThunk("post/updatePostById", async(postId, postUpdates) => {
    const response = await updatePost(postId, postUpdates)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.receivedData, message: response.message }
})

export const deletePostById = createAsyncThunk("post/deletePostById", async(postId) => {
    const response = await deletePost(postId)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.sentData, message: response.message }
})

export const likePostById = createAsyncThunk("post/likePostById", async(postId, userId) => {
    const response = await likePost(postId, userId)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.data, message: response.message }
})

export const commentPostById = createAsyncThunk("post/commentPostById", async(postId, userId, comment) => {
    const response = await commentPost(postId, userId, comment)
    if(response?.errMessage) {
        return { error: response.errMessage, message: response.message }
    }
    return { currentPost: response.data, message: response.message }
})

const initialState = {
    posts: [],
    currentPost: {},
    loading: false,
    error: "",
    message: ""
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => {
            return initialState
        }
    },
    extraReducers: {
        [fetchAllPosts.pending]: (state) => {
            state.loading = true
        },
        [fetchAllPosts.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [fetchAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [addPost.pending]: (state) => {
            state.loading = true
        },
        [addPost.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [addPost.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [fetchPostById.pending]: (state) => {
            state.loading = true
        },
        [fetchPostById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [fetchPostById.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [updatePostById.pending]: (state) => {
            state.loading = true
        },
        [updatePostById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [updatePostById.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [deletePostById.pending]: (state) => {
            state.loading = true
        },
        [deletePostById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [deletePostById.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [likePostById.pending]: (state) => {
            state.loading = true
        },
        [likePostById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [likePostById.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
        [commentPostById.pending]: (state) => {
            state.loading = true
        },
        [commentPostById.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.error
            state.message = action.payload.message
        },
        [commentPostById.fulfilled]: (state, action) => {
            state.currentPost = action.payload.currentPost
            state.message = action.payload.message
            state.loading = false
            state.error = ""
        },
    }
})

export const { reset } = postSlice.actions

export default postSlice.reducer