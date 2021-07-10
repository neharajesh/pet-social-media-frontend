import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles.css";

export const Users = () => {
    const users = useSelector(state => state.users)
  
  return (
    <>
      <div className="mg-2 flex flex-items-center-x">
            <div className="w-75 flex flex-row-wrap">
            {users.usersList.map((user) => (
                <div className="flex flex-items-center bdr-thin bdr-grey bdr-rad-m mg-1 pd-1 card-w-20" key={user._id}>
                    <img className="mg-025 bdr-rad-round img-50" src={user.image || "https://yt3.ggpht.com/ytc/AKedOLQTOrbuh25vkoon4ROhjjbJXX3jVrEaAYK6BDUB=s900-c-k-c0x00ffffff-no-rj"} alt="user profile" />
                    <div className="userdetails mg-l-1">
                        <Link to={`/user/${user._id}`} className="usernameNavlink pd-025"> { user.username } </Link>
                        <p className="pd-025 txt-grey txt-s"> {user.bio} </p>
                    </div>
                </div>
            ))}
            </div>
       </div>
    </>
  );
};
