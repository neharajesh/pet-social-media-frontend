import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { loadAllUsers } from "../../features/Users/userSlice"

export const Sidebar = () => {
    const dispatch = useDispatch()

    const loadUsers = async() => {
        await dispatch(loadAllUsers())
    }

    return(<>
        <div className="sidebarContainer">
            <Link to="/" className="navLink mg-tb-05 txt-black"> Home </Link>
            <Link onClick={() => loadUsers()} to="/user" className="navLink mg-tb-05 txt-black"> Find Users </Link>
        </div>
    </>)
}