import React from "react";

function UserLikes(props) {
  return (
    <div className="userlikes">
      <div>
        <h1>User likes:</h1>
        <p onClick={props.hideUserLikes}>X </p>
      </div>
    </div>
  );
}

export default UserLikes;
