import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import { Layout } from "./Components/Layout/Layout"
import { Login } from "./features/Auth/Login"
import { Register } from "./features/Auth/Register"
import { Home } from "./Pages/Home"
import { UserProfile } from "./Pages/UserProfile"
import { Feed } from "./Pages/Feed"
import { PrivateRoute } from './features/Auth/PrivateRoute';
import { Users } from './Pages/Users';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from './features/Posts/postSlice';
import { loadAllUsers } from './features/Users/userSlice';

function App() {
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllPosts())
        dispatch(loadAllUsers())
        // eslint-disable-next-line
    }, [posts.posts])

    return (<>
        <Routes>
            <Route path="/signin"> <Layout> <Login /> </Layout> </Route>
            <Route path="/signup"> <Layout> <Register /> </Layout> </Route>
            <Route path="/"> <Layout> <PrivateRoute path="/" element={<Home />}/> </Layout> </Route>
            <Route path="/feed"> <Layout> <PrivateRoute path="/feed" element={<Feed />}/> </Layout> </Route>
            <Route path="/user"> <Layout> <PrivateRoute path="/user" element={<Users />}/> </Layout> </Route>
            <Route path="/user/:userId"> <Layout> <PrivateRoute path="/user/:userId" element={<UserProfile />}/> </Layout> </Route>
        </Routes>
	</>);
}

export default App;