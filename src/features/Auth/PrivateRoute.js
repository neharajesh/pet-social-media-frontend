import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom"

export const PrivateRoute = ({path, ...props}) => {
    const auth = useSelector(state => state.auth)
    return (<>
        <div className="flex">
            {auth.token === "" ? <Navigate to="/signin" /> : <Route {...props} path={path} /> }
        </div>        
    </>)
}