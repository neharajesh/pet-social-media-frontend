import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import themeReducer from "../features/Theme/themeSlice"
import authReducer from "../features/Auth/authSlice"
import userReducer from "../features/Users/userSlice"
import postReducer from "../features/Posts/postSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    auth: authReducer,
    users: userReducer,
    posts: postReducer
  },
});
