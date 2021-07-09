import moment from "moment"
import { useSelector } from "react-redux"
import "../styles.css"

export const PostCard = ({post}) => {
    const users = useSelector(state => state.users)
    const postOwner = users.usersList.find(user => user._id === post.user)
    
    return (<>
        <div className="bdr-thin bdr-rad-m bdr-grey mg-1 pd-1 card-w-30">
            <div className="flex flex-items-center">
                <img className="img-50 bdr-rad-round mg-r-1" src={postOwner.image || "https://yt3.ggpht.com/ytc/AKedOLQTOrbuh25vkoon4ROhjjbJXX3jVrEaAYK6BDUB=s900-c-k-c0x00ffffff-no-rj"} alt="user profile picture" />
                <p className="txt-l txt-700"> {postOwner.username} </p>
            </div>            
            <p className="mg-1"> {post.content} </p>
            <div className="flex">
                <p className="mg-05 pd-r-1"> 💗 {post.likes.length} </p>
                <p className="mg-05 pd-r-1"> 💬 {post.comments.length} </p>
                <p className="mg-05 pd-r-1"> ⏳ {moment(post.createdAt).fromNow()} </p>
            </div>
        </div>
    </>)
}