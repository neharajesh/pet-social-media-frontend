import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostCard } from "../Components/PostCard";
import Modal from "react-modal"
import { followUser, unfollowUser, updateUser } from "../features/Users/userSlice";
import moment from "moment";

export const UserProfile = () => {
    const { userId } = useParams()
    const [buttonText, setButtonText] = useState("Follow")
    const [ editedPassword, setEditedPassword ] = useState("")
    const [ editedBio, setEditedBio ] = useState("")
    const [ editedLocation, setEditedLocation ] = useState("")
    const [ editedDate, setEditedDate ] = useState("")

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const posts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)

    const removeEmptyStrings = (obj) => {
        let updatedObj = {}
        Object.keys(obj).forEach((prop) => {
            if(obj[prop]) {
                updatedObj[prop] = obj[prop]
            }
        })
        updatedObj.dob === "Invalid date" && delete updatedObj.dob
        return updatedObj
    }

    const [modalOpen, setModalOpen] = useState(false)
    const openProfileEditModal = () => {
        setModalOpen(true)
    }
    const closeProfileEditModal = () => {
        setModalOpen(false)
    }
    const profileEditHandler = async() => {
        let userDetails = {
            password: editedPassword,
            bio: editedBio,
            location: editedLocation,
            dob: moment(editedDate).format()
        }
        userDetails = removeEmptyStrings(userDetails)
        console.log(userDetails)
        const form = {userId: auth.user._id, userDetails: userDetails} 
        console.log(form)
        setModalOpen(false)
        await dispatch(updateUser(form))
    }

    const followHandler = async() => {
        if(buttonText === "Follow") {
            const form = {userId: auth.user._id, userToFollowId: userId}
            await dispatch(followUser(form))
            setFollowers(followers => followers + 1)
            setButtonText("Unfollow")
            toast.success("Following User")
        } else {
            const form = {userId: auth.user._id, userToUnfollowId: userId}
            await dispatch(unfollowUser(form))
            setFollowers(followers => followers - 1)
            setButtonText("Follow")
            toast.success("Unfollowed User")
        }
    }

    const currentUser = users.usersList.find(user => user._id === userId)

    const [ followers, setFollowers ] = useState(currentUser.followers.length)

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
                        <p className="pd-025"> 📍 { currentUser.location || "Location" }  </p>
                        <p className="pd-025"> 🎂 { moment(currentUser.dob).format("D MMMM")  || "26 July"} </p>
                        <div className="flex flex-items-center-x">
                            <div className="flex-col flex-items-center-y mg-1">
                                <p> {currentUser.following.length} </p>
                                <p> Follows </p>
                            </div>  
                            <div className="flex-col flex-items-center-y mg-1">
                                <p> {followers} </p>
                                <p> Followers </p>
                            </div>
                        </div>                  
                    </div>
                    {userId === auth.user._id 
                        ? <button onClick={openProfileEditModal} className="followButton"> Edit Profile </button>
                        : <button onClick={() => followHandler()} className="followButton"> { buttonText } </button>
                    }
                </div>
            </div>
        </div> 
        <div className="modalContainer">
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeProfileEditModal}
                className="editDetailsModal"
                contentLabel="Edit Profile"
            >
                <p className="txt-xl txt-700 mg-1"> Hey, {auth.user.username}! </p>
                <p className="mg-05"> Edit your details below! </p>
                <div className="editInputContainer">
                    <div> Password </div>
                    <input className="editInputElement" type="text" placeholder="Set new Password" onChange={e => setEditedPassword(e.target.value)} />
                </div>
                <div className="editInputContainer">
                    <div> Bio </div>
                    <input className="editInputElement" type="text" placeholder="Add a bio!" onChange={e => setEditedBio(e.target.value)} />
                </div>
                <div className="editInputContainer">
                    <div> Location </div>                    
                    <input className="editInputElement" type="text" placeholder="Your Location" onChange={e => setEditedLocation(e.target.value)} />
                </div>
                <div className="editInputContainer">
                    <div> DOB </div>                
                    <input className="editInputElement" type="date" onChange={e => setEditedDate(e.target.value)} />
                </div>
                <div>
                    <button className="modalButtons" onClick={() => profileEditHandler()}> Save Details </button>
                    <button className="modalButtons" onClick={closeProfileEditModal}> I'll do this later </button>
                </div>                
            </Modal>
        </div> 
    </div>)
}