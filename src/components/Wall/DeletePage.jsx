import React from "react";

function DeletePage(props) {
  return (
    <div className="deletescreen">
      <h2>Are you sure you want to delete this post ?</h2>
      <div className="yesnobtns">
        <button onClick={() => props.deletePost(props.id)}>Yes</button>
        <button onClick={props.hideDelete}>No</button>
      </div>
    </div>
  );
}

export default DeletePage;
