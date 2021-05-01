import React from "react";

function UserLikes(props) {
  return (
    <div className="userlikeslist">
      <p>{props.users.length}</p>
      <ul>
        {props.users.map((user) => {
          return (
            <li key={user._id}>
              {user.firstName} {user.lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserLikes;
