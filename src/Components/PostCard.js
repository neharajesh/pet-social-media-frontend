export const PostCard = ({post}) => {
    return (<>
        <div className="bdr-thin bdr-grey mg-1 pd-05 card-w-20">
            <p> {post.user} </p>
            <p> {post.content} </p>
        </div>
    </>)
}