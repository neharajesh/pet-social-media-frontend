import "../styles.css";

const usersList = [
  {
    userId: 1,
    username: "one",
  },
  {
    userId: 2,
    username: "two",
  },
  {
    userId: 3,
    username: "three",
  },
  {
    userId: 4,
    username: "four",
  },
];

export const Users = () => {
  return (
    <>
      <div>
        <h2> Pet Parents </h2>
        <div>
          {usersList.map((user) => (
            <div className="flex" key={user.userId}>
              {user.username}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
