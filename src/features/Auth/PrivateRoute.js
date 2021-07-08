import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom"
import { Sidebar } from "../../Components/Layout/Sidebar"

export const PrivateRoute = ({path, ...props}) => {
    const auth = useSelector(state => state.auth)
    return (<>
        <div className="flex">
            <Sidebar />
            {auth.token === "" ? <Navigate to="/signin" /> : <Route {...props} path={path} /> }
        </div>        
    </>)
}