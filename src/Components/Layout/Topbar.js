import "./layout.css"
import { Link } from "react-router-dom"
// import { Theme } from "../../features/theme/Theme"

export const Topbar = () => {
  return (
    <>
      <div className="topbar">
          {/* <Theme /> */}
            <Link to="/" className="header-brand txt-700"> SOCIALMEDIA </Link> <br/>
            <div className="navContainer">
                <Link className="navLink" to="/"> Home </Link>
                <Link className="navLink" to="/signin"> Login </Link>
            </div>
      </div>
    </>
  );
};