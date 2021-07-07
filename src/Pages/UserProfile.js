import { useParams } from "react-router-dom"
import { dummyFeedData } from "./Feed";

export const UserProfile = () => {
    const { userId } = useParams();
    return (<div className="homeContainer">
        <div className="w-50 flex-col flex-items-center-y">
            <div className="flex mg-05 pd-1 flex-items-center-y flex-space-evenly card-w-40">
                <img src="https://picsum.photos/200" alt="profile picture" />
                <div className="mg-l-2 flex-col flex-items-center-y">
                    <p className="txt-xl txt-700 "> User Name </p>
                    <div className="mg-tb-05 txt-m txt-grey">
                        <p> user bio goes here lorem ipsum </p>
                        <p> 📍 Location </p>
                        <p> 🎂 26 July </p>
                    </div>
                    <button className="followButton"> Follow </button>
                </div>
            </div>
            <div className="flex flex-space-between card-w-40 mg-tb-1">
                <div> Following </div>
                {/* use postcard below */}
                <div> {dummyFeedData.map(post => <div className="pd-05 bdr-thin bdr-rad-m mg-tb-05 card-w-30" key={post.id}>
                    <p> {post.content} </p>
                </div>)} </div>
            </div>
        </div>
    </div>)
}