import React from "react";

function Comments(comment) {
  return (
    <div className="commentpart">
      <div className="usercommenting">
        <div className="ppusercontainercomment">
          <img className="ppwall" src={comment.userImg} alt="userpic" />
        </div>
      </div>
      <div className="commentinside">
        <div className="commetuser">
          <p className="commentuserinfo">
            <b>
              {comment.userFirst} {comment.userLast}
            </b>{" "}
          </p>
          <p className="commenttext">{comment.text}</p>

          <pre>
            {comment.date.slice(0, 10)} {comment.date.slice(11, 16)}
          </pre>
        </div>
        <div className="commentbtndelete">
          {comment.userEmail === comment.userLogged ? (
            <div className="posttopbtns">
              <i
                className="fa fa-trash"
                onClick={() => comment.deleteComment(comment.id)}
              ></i>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Comments;
