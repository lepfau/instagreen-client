import React, { useState } from "react";

function UserLikes(props) {
  const [style, setStyle] = useState("none");

  return (
    <div
      onMouseEnter={() => setStyle("")}
      onMouseLeave={() => setStyle("none")}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        height: "18px",
      }}
    >
      <p className="userlikecount">{props.users.length} people like this</p>
      <div className="userlikesss" style={{ display: style }}>
        <ul className="ululul">
          {props.users.map((user) => {
            return (
              <li key={user._id}>
                {user.firstName} {user.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserLikes;
