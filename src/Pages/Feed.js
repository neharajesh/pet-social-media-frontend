// import moment from "moment"
// import { useEffect } from "react"
import { useSelector } from "react-redux"
import { PostCard } from "../Components/PostCard"

export const Feed = () => {
    const posts = useSelector(state => state.posts)

    return(<>
        <div className="feedContainer">
            {posts.posts.map(post => <PostCard post={post} />)}
        </div>
    </>)
}