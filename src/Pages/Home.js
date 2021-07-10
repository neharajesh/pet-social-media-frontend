import { useSelector } from "react-redux"
import { useState } from "react"
import { Feed } from "./Feed"
import Modal from "react-modal"

export const Home = () => {
    const auth = useSelector(state => state.auth)
    const [modalOpen, setModalOpen] = useState(false)

    const openAddPostModal = () => {
        setModalOpen(true)
    }
    const closeAddPostModal = () => {
        setModalOpen(false)
    }

    return (<>
        <div className="w-100 flex flex-items-center-x mg-t-2">
            <div>
                <Feed />                
            </div>
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
                    <input className="newPostTextbox" type="textBox" placeholder="Functionality coming soon!" />
                    <div>
                        <button className="addPostButton"> Add Post </button>
                        <button className="modalCloseButton" onClick={closeAddPostModal}> I'll do this later </button>
                    </div>
                    
                </Modal>
            </div>
        </div>        
    </>)
}