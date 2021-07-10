import "./layout.css"
import { Link } from "react-router-dom"
import { Theme } from "../../features/Theme/Theme"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/Auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { loadAllUsers } from "../../features/Users/userSlice";

export const Topbar = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = async() => {
        await dispatch(logoutUser())
        toast.success("Logged out successfully")
    }

    const loadUsers = async() => {
        await dispatch(loadAllUsers())
    }

  return (
    <>
      <div className="topbar">
          <Toaster />
          <Theme />
            <Link to="/" className="header-brand txt-700"> PETCLUB </Link> <br/>
            {auth.token !== "" && <div className="navContainer">
                <Link to="/" className="navLink mg-tb-05 txt-black"> Home </Link>
                <Link to={`/user/${auth.user._id}`} className="navLink mg-tb-05 txt-black"> Me </Link> 
                <Link onClick={() => loadUsers()} to="/user" className="navLink mg-tb-05 txt-black"> Find Users </Link>
                <Link onClick={() => logoutHandler()} className="navLink" to="/signin"> Logout </Link>
            </div>}
      </div>
    </>
  );
};