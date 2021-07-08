import { useSelector } from "react-redux"
import { Feed } from "./Feed"

export const Home = () => {
    const auth = useSelector(state => state.auth)

    return (<>
        <div className="homeContainer">
            <Feed />
            <h1> hey {auth.user.username} </h1>
        </div>        
    </>)
}