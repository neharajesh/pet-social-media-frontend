import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PostCard } from "../Components/PostCard"

export const dummyFeedData = [{
    id: "post1",
    content: "this is the first post",
    user: "user one"
}, {
    id: "post2",
    content: "this is the secpnd post",
    user: "user two"
}, {
    id: "post3",
    content: "this is the third post",
    user: "user one"
}, {
    id: "post4",
    content: "this is the fourth post",
    user: "user one"
}, {
    id: "post5",
    content: "this is the fifth post",
    user: "user nine"
}]

export const Feed = () => {
    // const { posts } = useSelector(state => state.post.posts)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadAllPosts())
    // }, [])

    return(<>
        <div className="feedContainer">
            {dummyFeedData.map(post => <PostCard post={post} />)}
            {/* {console.log(posts)} */}
        </div>
    </>)
}