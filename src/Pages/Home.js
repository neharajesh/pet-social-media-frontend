import { Feed } from "./Feed"
import { Users } from "./Users"

export const Home = () => {
    return (<>
        <div className="homeContainer">
            <Users />
            <Feed />
            <h1> Your Profile </h1>
        </div>        
    </>)
}