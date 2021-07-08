import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles.css";

export const Users = () => {
    const users = useSelector(state => state.users)
  
  return (
    <>
      <div>
        <h2> Pet Parents </h2>
        <div>
          {users.usersList.map((user) => (
            <div className="flex bdr-thin bdr-rad-m mg-1 pd-1" key={user._id}>
              <Link to={`/user/${user._id}`}> { user.username } </Link>
              {user.bio}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
