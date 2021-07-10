import { useSelector } from "react-redux"
import { Feed } from "./Feed"

export const Home = () => {
    const auth = useSelector(state => state.auth)

    return (<>
        <div className="w-100 flex flex-items-center-x mg-t-2">
            <div>
                <Feed />                
            </div>
            <div> 
                <p className="txt-xl txt-700 mg-1"> Hey, {auth.user.username}! </p>
                <p className="mg-1"> How're you doing today? </p>
                <button className="pd-05 mg-1"> Add a post! </button>
            </div>
        </div>        
    </>)
}