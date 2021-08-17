import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Feed } from "./Feed"
import Modal from "react-modal"
import { addPost } from "../features/Posts/postSlice"
import toast, { Toaster } from "react-hot-toast"

export const Home = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [ newPostText, setNewPostText ] = useState("")

    const openAddPostModal = () => {
        setModalOpen(true)
    }
    const closeAddPostModal = () => {
        setModalOpen(false)
    }

    const addNewPostHandler = async() => {
        if(newPostText === "") {
            toast.error("New post content cannot be empty.")
        } else {
            const postContent = { user: auth.user._id, content: newPostText }
            await dispatch(addPost(postContent))
            setModalOpen(false)
            toast.success("New Post Added!")
        }        
    }

    return (<>
        <div className="w-100 flex flex-items-center-x mg-t-2">
            <Toaster />
            <Feed />
            <div> 
                <p className="txt-xl txt-700 mg-1"> Hey, {auth.user.username}! </p>
                <button onClick={openAddPostModal} className="addNewPostButton"> Add a post! </button>
            </div>
            <div className="modalContainer">
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeAddPostModal}
                    className="addNewPostModal"
                    contentLabel="Add new Post"
                >
                    <p className="txt-xl txt-700 mg-1"> Hey, {auth.user.username}! </p>
                    <p className="mg-05"> How're you doing today? </p>
                    <input onChange={e => setNewPostText(e.target.value)} className="newPostTextbox" type="textBox" placeholder="Add New Post" />
                    <div>
                        <button onClick={() => addNewPostHandler()} className="modalButtons"> Add Post </button>
                        <button onClick={closeAddPostModal} className="modalButtons"> I'll do this later </button>
                    </div>
                    
                </Modal>
            </div>
        </div>        
    </>)
}