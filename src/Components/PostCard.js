import moment from "moment"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { commentPostById, likePostById } from "../features/Posts/postSlice"
import "../styles.css"

export const PostCard = ({post}) => {
    const auth = useSelector(state => state.auth)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const [ likes, setLikes ] = useState(post.likes.length)
    const [ comments, setComments ] = useState(post.comments)
    const [ newComment, setNewComment ] = useState("")
    const [ commentBox, setCommentBox ] = useState(false)

    const commentBoxRef = useRef("")

    const getUserById = (userId) => {
        return users.usersList.find(user => user._id === userId)
    }
    const postOwner = getUserById(post.user)

    const likeHandler = async(postId) => {        
        const form = { postId: postId, userId: auth.user._id}
        const response = await dispatch(likePostById(form))
        console.log(response.payload)
        setLikes(response.payload.currentPost.likes.length)
    }

    const commentHandler = async(postId) => {              
        const form = { postId: postId, userId: auth.user._id, comment: newComment }
        const response = await dispatch(commentPostById(form))
        console.log(response.payload)
        setComments(response.payload.currentPost.comments)
        commentBoxRef.current.value = "" 
    }
    
    return (<>
        <div className="bdr-thin bdr-rad-m bdr-grey mg-1 pd-1 card-w-30">
            <div className="flex flex-items-center">
                <img className="img-50 bdr-rad-round mg-r-1" src={postOwner.image || "https://yt3.ggpht.com/ytc/AKedOLQTOrbuh25vkoon4ROhjjbJXX3jVrEaAYK6BDUB=s900-c-k-c0x00ffffff-no-rj"} alt="user profile" />
                <p className="txt-l txt-700"> {postOwner.username} </p>
            </div>            
            <p className="mg-1"> {post.content} </p>
            <div className="flex">
                <p className="mg-05 pd-r-1"> <span className="csr-point" onClick={() => likeHandler(post._id)}> 💗 </span> {likes} </p>
                <p className="mg-05 pd-r-1"> <span className="csr-point" onClick={() => setCommentBox(commentBox => !commentBox)}> 💬 </span> {post.comments.length} </p>
                <p className="mg-05 pd-r-1"> <span className="csr-point"> ⏳ </span>{moment(post.createdAt).fromNow()} </p>
            </div>
            <div className={commentBox ? "commentsContainer" : "display-none"}>
                <hr className="mg-t-1 mg-b-05" />
                {comments.map(currentComment => (<div className="flex pd-05">
                    <img className="img-xs bdr-rad-round mg-r-1" src={getUserById(currentComment.user).image || "https://yt3.ggpht.com/ytc/AKedOLQTOrbuh25vkoon4ROhjjbJXX3jVrEaAYK6BDUB=s900-c-k-c0x00ffffff-no-rj"} alt="commentor" />
                    <div>
                        <p className="txt-500 mg-b-025"> {getUserById(currentComment.user).username} </p>
                        <p className="mg-t-025"> {currentComment.comment} </p>
                    </div>           
                </div>
                ))}
                <div>
                    <input ref={commentBoxRef} onChange={e => setNewComment(e.target.value)} className="commentInput" type="text" placeholder="Add Comment" />  
                    <button className="pd-tb-05 pd-lr-1" onClick={() => commentHandler(post._id)}> Add </button>     
                </div>
            </div>
        </div>
    </>)    
}