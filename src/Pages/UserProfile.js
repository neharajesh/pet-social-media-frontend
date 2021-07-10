import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../Components/PostCard";
import { followUser, unfollowUser } from "../features/Users/userSlice";

export const UserProfile = () => {
    const { userId } = useParams()
    const [buttonText, setButtonText] = useState("Follow")

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const posts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)

    const followHandler = async() => {
        if(buttonText === "Follow") {
            const response = await dispatch(followUser(auth.user._id, userId))
            console.log("followed", response)
            setButtonText("Unfollow")
            toast.success("Following User")
        } else {
            const response = await dispatch(unfollowUser(auth.user._id, userId))
            console.log("unfollowed", response)
            setButtonText("Follow")
            toast.success("Unfollowed User")
        }
    }

    const currentUser = users.usersList.find(user => user._id === userId)

    const currentUserPosts = posts.posts.filter(post => post.user === userId)

    return (<div className="w-100 flex flex-items-center-x pd-t-2">
        <Toaster />
        <div className="flex flex-space-between card-w-30 mg-tb-1 mg-r-2">
                {currentUserPosts.length === 0 && <p> Nothing to see here yet! </p>}
                <div> {currentUserPosts.map(post => <PostCard post={post} />)} </div>
        </div>
        <div className="w-25 flex-col flex-items-center-y mg-l-2">
            <div className="flex flex-col mg-05 mg-r-2 pd-1 flex-items-center-x flex-space-evenly card-w-20">
                <img className="bdr-rad-round mg-1" src="https://picsum.photos/200" alt="profile" />
                <div className="flex-col flex-items-center-y">
                    <p className="txt-xl txt-700 "> {currentUser.username} </p>
                    <div className="mg-tb-05 txt-m txt-grey">
                        <p className="pd-025"> { currentUser.bio || "user bio goes here lorem ipsum"} </p>
                        <p className="pd-025"> 📍 Location </p>
                        <p className="pd-025"> 🎂 26 July </p>
                        <div className="flex flex-items-center-x">
                            <div className="flex-col flex-items-center-y mg-1">
                                <p> {currentUser.following.length} </p>
                                <p> Follows </p>
                            </div>  
                            <div className="flex-col flex-items-center-y mg-1">
                                <p> {currentUser.followers.length} </p>
                                <p> Followers </p>
                            </div>
                        </div>                  
                    </div>
                    <button onClick={() => followHandler()} className="followButton"> { buttonText } </button>
                </div>
            </div>
        </div>   
    </div>)
}