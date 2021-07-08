import "./layout.css"
import { Link } from "react-router-dom"
import { Theme } from "../../features/Theme/Theme"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/Auth/authSlice";
import toast, { Toaster } from "react-hot-toast";

export const Topbar = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const logoutHandler = async() => {
        await dispatch(logoutUser())
        toast.success("Logged out successfully")
    }

  return (
    <>
      <div className="topbar">
          <Toaster />
          <Theme />
            <Link to="/" className="header-brand txt-700"> SOCIALMEDIA </Link> <br/>
            <div className="navContainer">
                {auth.token === "" ? <Link className="navLink" to="/signin"> Login </Link> : <Link onClick={() => logoutHandler()} className="navLink" to="/signin"> Logout </Link>}
            </div>
      </div>
    </>
  );
};